#!/usr/bin/env bash

# ------------------------------------------------------------
# Copyright 2022 The KusionStack Authors
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#     http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Reference: https://github.com/dapr/cli/tree/master/install
# ------------------------------------------------------------

# Kusion location
: ${KUSION_HOME_DIR:="$HOME/.kusion"}

# sudo is required to copy binary to KUSION_HOME_DIR for linux
: ${USE_SUDO:="false"}

# Http request CLI
KUSION_HTTP_REQUEST_CLI=curl

# Kusion filename
KUSION_CLI=kusion

KUSION_CLI_FILE_PATH="${KUSION_HOME_DIR}/${KUSION_CLI}"

DOWNLOAD_BASE="https://github.com/KusionStack/kusion/releases/download"

# --- helper functions for logs ---
info() {
	command printf '\033[1;32mInfo\033[0m: %s\n' "$1" 1>&2
}

warn() {
	command printf '\033[1;33mWarn\033[0m: %s\n' "$1" 1>&2
}

error() {
	command printf '\033[1;31mError\033[0m: %s\n' "$1" 1>&2
}

echo_fexists() {
  [ -f "$1" ] && echo "$1"
}

getSystemInfo() {
	ARCH=$(uname -m)
	case $ARCH in
	armv7*) ARCH="arm" ;;
	aarch64) ARCH="arm64" ;;
	x86_64) ARCH="amd64" ;;
	esac

	OS=$(echo "$(uname)" | tr '[:upper:]' '[:lower:]')

	# Most linux distro needs root permission to copy the file to /usr/local/bin
	if [ "$OS" == "linux" ] || [ "$OS" == "darwin" ]; then
		if [ "$KUSION_HOME_DIR" == "/usr/local/bin" ]; then
			USE_SUDO="true"
		fi
	fi
}

verifySupported() {
	local supported=(darwin-amd64 linux-amd64 darwin-arm64)
	local current_os_arch="${OS}-${ARCH}"

	for osarch in "${supported[@]}"; do
		if [ "$osarch" == "$current_os_arch" ]; then
			info "Your system is ${OS}_${ARCH}"
			return
		fi
	done

	info "No prebuilt binary for ${current_os_arch}"
	exit 1
}

runAsRoot() {
	local CMD="$*"

	if [ $EUID -ne 0 ] && [ $USE_SUDO = "true" ]; then
		CMD="sudo $CMD"
	fi

	$CMD
}

checkHttpRequestCLI() {
	if type "curl" >/dev/null; then
		KUSION_HTTP_REQUEST_CLI=curl
	elif type "wget" >/dev/null; then
		KUSION_HTTP_REQUEST_CLI=wget
	else
		warn "Either curl or wget is required"
		exit 1
	fi
}

checkExistingKusion() {
	if [ -f "$KUSION_CLI_FILE_PATH" ]; then
		info "Kusion is detected:"
		$KUSION_CLI_FILE_PATH version
		info "Reinstalling kusion to ${KUSION_HOME_DIR}..."
	else
		info "Installing kusion ..."
	fi
}

getLatestRelease() {
    local KusionReleaseURL="https://api.github.com/repos/KusionStack/kusion/releases"
    local latest_release=""

    if [ "$KUSION_HTTP_REQUEST_CLI" == "curl" ]; then
        latest_release=$(curl -s $KusionReleaseURL | grep \"tag_name\" | grep -v rc | awk 'NR==1{print $2}' |  sed -n 's/\"\(.*\)\",/\1/p')
    else
        latest_release=$(wget -q --header="Accept: application/json" -O - $KusionReleaseURL | grep \"tag_name\" | grep -v rc | awk 'NR==1{print $2}' |  sed -n 's/\"\(.*\)\",/\1/p')
    fi

    version=$latest_release
}

download() {
	LATEST_RELEASE_TAG=$1

	# kusion_0.7.3_darwin_amd64.tar.gz
	KUSION_CLI_ARTIFACT="${KUSION_CLI}_${LATEST_RELEASE_TAG:1}_${OS}_${ARCH}.tar.gz"

	DOWNLOAD_URL="${DOWNLOAD_BASE}/${LATEST_RELEASE_TAG}/${KUSION_CLI_ARTIFACT}"

	# Create the temp directory
	KUSION_TMP_ROOT=$(mktemp -dt kusion-install-XXXXXX)
	ARTIFACT_TMP_FILE="$KUSION_TMP_ROOT/$KUSION_CLI_ARTIFACT"
	echo $ARTIFACT_TMP_FILE

	info "Downloading $DOWNLOAD_URL ..."
	if [ "$KUSION_HTTP_REQUEST_CLI" == "curl" ]; then
		curl -SL "$DOWNLOAD_URL" -o "$ARTIFACT_TMP_FILE"
	else
		wget -O "$ARTIFACT_TMP_FILE" "$DOWNLOAD_URL"
	fi

	if [ ! -f "$ARTIFACT_TMP_FILE" ]; then
		error "failed to download $DOWNLOAD_URL ..."
	fi
}

install() {
	# Decompress
	tar xf "$ARTIFACT_TMP_FILE" -C $KUSION_TMP_ROOT

	# Clean kusion home
	rm -rf "$KUSION_HOME_DIR"

	runAsRoot mv "$KUSION_TMP_ROOT" "$KUSION_HOME_DIR"

	if [ $? -eq 0 ] && [ -f "$KUSION_CLI_FILE_PATH" ]; then
		updateProfile "$KUSION_HOME_DIR"
		info "Kusion installed into $KUSION_HOME_DIR/$KUSION_CLI successfully."
		$KUSION_CLI_FILE_PATH version
	else
		error "$KUSION_CLI_FILE_PATH not exists"
	fi
}

updateProfile() {
	install_dir="$1"
	profile_install_dir=$(echo "$install_dir" | sed "s:^$HOME:\$HOME:")
	detected_profile=$(detectProfile "$(basename $SHELL)" "$(uname -s)")
	path_str="$(buildPathStr "$detected_profile" "$profile_install_dir")"

	info "Editing user profile ($detected_profile)"

	if [ -z "${detected_profile-}" ]; then
		warn "No user profile found."
		warn "Tried \$PROFILE ($PROFILE), ~/.bashrc, ~/.bash_profile, ~/.zshrc, ~/.profile, and ~/.config/fish/config.fish."
		warn "You can either create one of these and try again or add this to the appropriate file:"
		warn "$path_str"
		return 1
	else
		if ! command grep -qc 'KUSION_HOME' "$detected_profile"; then
			command printf "$path_str" >>"$detected_profile"
		else
			warn "Your profile ($detected_profile) already mentions kusion and has not been changed."
		fi
	fi
}

detectProfile() {
	local shell_name="$1"
	local uname="$2"

	if [ -f "$PROFILE" ]; then
		info "Current profile: $PROFILE"
		return
	fi

	# try to detect the current shell
	case "$shell_name" in
	bash)
		# Shells on macOS default to opening with a login shell, while Linuxes
		# default to a *non*-login shell, so if this is macOS we look for
		# `.bash_profile` first; if it's Linux, we look for `.bashrc` first. The
		# `*` fallthrough covers more than just Linux: it's everything that is not
		# macOS (Darwin). It can be made narrower later if need be.
		case $uname in
		Darwin)
			echo_fexists "$HOME/.bash_profile" || echo_fexists "$HOME/.bashrc"
			;;
		*)
			echo_fexists "$HOME/.bashrc" || echo_fexists "$HOME/.bash_profile"
			;;
		esac
		;;
	zsh)
		echo "$HOME/.zshrc"
		;;
	fish)
		echo "$HOME/.config/fish/config.fish"
		;;
	*)
		# Fall back to checking for profile file existence. Once again, the order
		# differs between macOS and everything else.
		local profiles
		case $uname in
		Darwin)
			profiles=(.profile .bash_profile .bashrc .zshrc .config/fish/config.fish)
			;;
		*)
			profiles=(.profile .bashrc .bash_profile .zshrc .config/fish/config.fish)
			;;
		esac

		for profile in "${profiles[@]}"; do
			echo_fexists "$HOME/$profile" && break
		done
		;;
	esac
}

# generate shell code to source the loading script and modify the path for the input profile
buildPathStr() {
	local profile="$1"
	local profile_install_dir="$2"

	if [[ $profile =~ \.fish$ ]]; then
		# fish uses a little different syntax to modify the PATH
		cat <<END_FISH_SCRIPT

set -gx KUSION_HOME "$profile_install_dir"

string match -r ".kusion" "\$PATH" > /dev/null; or set -gx PATH "\$KUSION_HOME/bin" \$PATH
END_FISH_SCRIPT
	else
		# bash and zsh
		cat <<END_BASH_SCRIPT

export KUSION_HOME="$profile_install_dir"
export PATH="\$KUSION_HOME:\$PATH"

END_BASH_SCRIPT
	fi
}

fail_trap() {
	result=$?
	if [ "$result" != "0" ]; then
		error "Failed to install kusion, go to https://kusionstack.io for more support."
	fi
	cleanup
	exit $result
}

cleanup() {
	if [[ -d "${KUSION_TMP_ROOT:-}" ]]; then
		rm -rf "$KUSION_TMP_ROOT"
	fi
}

installCompleted() {
	info "For more information on how to started, please visit: https://kusionstack.io"
}

# -----------------------------------------------------------------------------
# main
# -----------------------------------------------------------------------------
trap "fail_trap" EXIT

getSystemInfo
verifySupported
checkExistingKusion
checkHttpRequestCLI

if [ -z "$1" ]; then
	info "Getting the latest kusion ..."
	getLatestRelease
elif [[ $1 == v* ]]; then
	version=$1
else
	version=v$1
fi

download $version
install
cleanup

installCompleted
