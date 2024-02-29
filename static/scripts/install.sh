#!/bin/sh

# ------------------------------------------------------------
# Copyright 2024 The KusionStack Authors
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

set -o errexit
set -o nounset

# Sudo is required to copy binary to KUSION_HOME_DIR
USE_SUDO=${USE_SUDO:-"false"}

# Specified profile
PROFILE=${PROFILE:-""}

# SHELL
SHELL=${SHELL:-""}

# specifed Kusion version to install
KUSION_VERSION=${1:-""}

# Kusion location
KUSION_HOME_DIR=${KUSION_HOME_DIR:-"$HOME/.kusion"}

# If set "true", then will not source kusion env in detected profile
SKIP_SOURCE_KUSION_ENV=${SKIP_SOURCE_KUSION_ENV:-"false"}

# Http request CLI
KUSION_HTTP_REQUEST_CLI="curl"

# Kusion binary file name
KUSION_CLI="kusion"

# Kusion env file name
KUSION_ENV_FILE=".env"

# Kusion binary path
KUSION_CLI_FILE_PATH="${KUSION_HOME_DIR}/bin/${KUSION_CLI}"

# Kusion github basic information
GITHUB_ORG=KusionStack
GITHUB_REPO=kusion

# Download path of Kusion installation package
DOWNLOAD_BASE="https://github.com/${GITHUB_ORG}/${GITHUB_REPO}/releases/download"

# Kusion release URL
RELEASE_URL="https://api.github.com/repos/${GITHUB_ORG}/${GITHUB_REPO}/releases"

info() {
	command printf '\033[1;32mInfo\033[0m: %s\n' "$1" 1>&2
}

warn() {
	command printf '\033[1;33mWarn\033[0m: %s\n' "$1" 1>&2
}

error() {
	command printf '\033[1;31mError\033[0m: %s\n' "$1" 1>&2
}

runAsRoot() {
  local CMD="$*"

  if [ $USE_SUDO = "true" ]; then
    CMD="sudo $CMD"
  fi

  $CMD
}

echoFexists() {
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
}

verifySupported() {
	local current_os_arch="${OS}-${ARCH}"

  if [ "${current_os_arch}" = "darwin-amd64" ]; then
    info "Your system is ${current_os_arch}."
  elif [ "${current_os_arch}" = "darwin-arm64" ]; then
    info "Your system is ${current_os_arch}."
  elif [ "${current_os_arch}" = "linux-amd64" ]; then
    info "Your system is ${current_os_arch}."
  else
    error "No prebuilt installation package for ${current_os_arch}"
    exit 1
  fi
}

checkHttpRequestCLI() {
	if type "curl" >/dev/null; then
		KUSION_HTTP_REQUEST_CLI=curl
	elif type "wget" >/dev/null; then
		KUSION_HTTP_REQUEST_CLI=wget
	else
		error "Either curl or wget is required to download installation package."
		exit 1
	fi
}

toInstallVersion() {
  if [ -z "$KUSION_VERSION" ]; then
    info "Getting the latest Kusion version..."
    getLatestReleaseVersion
  else
    echo "$KUSION_VERSION"
  fi
}

getLatestReleaseVersion() {
  local KusionReleaseURL="${RELEASE_URL}"
  local latest_release=""

  if [ "$KUSION_HTTP_REQUEST_CLI" = "curl" ]; then
      latest_release=$(runAsRoot curl -s $KusionReleaseURL | grep \"tag_name\" | awk '{print $2}' | sed -n 's/\"\(.*\)\",/\1/p' | awk '/^v[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}$/{print $0}' | head -1)
  else
      latest_release=$(runAsRoot wget -q --header="Accept: application/json" -O - $KusionReleaseURL | grep \"tag_name\" | awk '{print $2}' | sed -n 's/\"\(.*\)\",/\1/p' | awk '/^v[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}$/{print $0}' | head -1)
  fi

  echo "$latest_release" | cut -c2-
}

download() {
  local kusion_version="$1"
	local kusion_tag="v${kusion_version}"
	KUSION_CLI_ARTIFACT="${KUSION_CLI}_${kusion_version}_${OS}_${ARCH}.tar.gz"
	DOWNLOAD_URL="${DOWNLOAD_BASE}/${kusion_tag}/${KUSION_CLI_ARTIFACT}"

	# Create the temp directory
	KUSION_TMP_ROOT=$(mktemp -dt kusion-install-XXXXXX)
	ARTIFACT_TMP_FILE="$KUSION_TMP_ROOT/$KUSION_CLI_ARTIFACT"

	info "Downloading installation package from $DOWNLOAD_URL..."
	if [ "$KUSION_HTTP_REQUEST_CLI" = "curl" ]; then
		runAsRoot curl -SL "$DOWNLOAD_URL" -o "$ARTIFACT_TMP_FILE"
	else
		runAsRoot wget -O "$ARTIFACT_TMP_FILE" "$DOWNLOAD_URL"
	fi

	if [ ! -f "$ARTIFACT_TMP_FILE" ]; then
		error "Failed to download installation package."
		return 1
	fi
}

checkExistingKusion() {
	if [ -f "$KUSION_CLI_FILE_PATH" ]; then
		info "Existing kusion is detected:"
		$KUSION_CLI_FILE_PATH version
		info "Reinstalling kusion into $KUSION_HOME_DIR..."
	else
		info "Installing kusion into $KUSION_HOME_DIR..."
	fi
}

install() {
	# decompress
	info "Decompressing installation package $KUSION_CLI_ARTIFACT..."
	tar xf "$ARTIFACT_TMP_FILE" -C "$KUSION_TMP_ROOT"
	rm -f "$ARTIFACT_TMP_FILE"
	kusion_tmp_cli_path="$KUSION_TMP_ROOT/$KUSION_CLI"
	if [ ! -f "$kusion_tmp_cli_path" ]; then
		error "Failed to decompress installation package."
		return 1
	fi

	# move kusion binary under /bin
	kusion_tmp_bin_dir="$KUSION_TMP_ROOT/bin"
	runAsRoot mkdir "$kusion_tmp_bin_dir"
	kusion_tmp_bin_cli_path="$kusion_tmp_bin_dir/$KUSION_CLI"
	runAsRoot mv "$kusion_tmp_cli_path" "$kusion_tmp_bin_cli_path"
	if [ ! -f "$kusion_tmp_bin_cli_path" ]; then
		error "Failed to move kusion cli binary to /bin."
		return 1
	fi

	# detect profile
	local shell_name=""
	if [ "$SHELL" ]; then
	  shell_name=$(basename $SHELL)
	fi
	detected_profile=$(detectProfile "$shell_name" "$(uname -s)")
	if [ -z "${detected_profile-}" ]; then
		error "No supported user profile found. Already tried \$PROFILE, ~/.bashrc, ~/.bash_profile, ~/.zshrc, ~/.profile, and ~/.config/fish/config.fish."
		return 1
	fi

	# build env file
	info "Building kusion env file..."
	install_dir=$(echo "$KUSION_HOME_DIR" | sed "s:^$HOME:\$HOME:")
	kusion_tmp_env_path="$KUSION_TMP_ROOT/$KUSION_ENV_FILE"
	buildEnvFile "$detected_profile" "$install_dir" "$kusion_tmp_env_path"

	# clean kusion home
	runAsRoot rm -rf "$KUSION_HOME_DIR"
	if [ -d "$KUSION_HOME_DIR" ]; then
		error "Failed to remove existing kusion in $KUSION_HOME_DIR."
		return 1
	fi

	# move from tmp dir to kusion home
	runAsRoot mv "$KUSION_TMP_ROOT" "$KUSION_HOME_DIR"
	if [ ! -f "$KUSION_CLI_FILE_PATH" ]; then
		error "Failed to move binary from tmp folder, $KUSION_CLI_FILE_PATH does not exist."
		return 1
	fi

	# update profile
	if [ $SKIP_SOURCE_KUSION_ENV = "true" ]; then
		info "Skip editing user profile ($detected_profile), cause SKIP_SOURCE_KUSION_ENV is true. Please write source $install_dir/.env in user profile ($detected_profile) manually."
	else
		env_file_path="$install_dir/$KUSION_ENV_FILE"
		updateProfile "$detected_profile" "$env_file_path"
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
			echoFexists "$HOME/.bash_profile" || echoFexists "$HOME/.bashrc"
			;;
		*)
			echoFexists "$HOME/.bashrc" || echoFexists "$HOME/.bash_profile"
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
		case $uname in
		Darwin)
			if [ -f "$HOME/.profile" ]; then
  		  echo "$HOME/.profile"
  		elif [ -f "$HOME/.bash_profile" ]; then
  		  echo "$HOME/.bash_profile"
  		elif [ -f "$HOME/.bashrc" ]; then
  		  echo "$HOME/.bashrc"
  		elif [ -f "$HOME/.zshrc" ]; then
  		  echo "$HOME/.zshrc"
  		elif [ -f "$HOME/.config/fish/config.fish" ]; then
  		  echo "$HOME/.config/fish/config.fish"
  		fi
			;;
		*)
      if [ -f "$HOME/.profile" ]; then
        echo "$HOME/.profile"
      elif [ -f "$HOME/.bashrc" ]; then
        echo "$HOME/.bashrc"
      elif [ -f "$HOME/.bash_profile" ]; then
        echo "$HOME/.bash_profile"
      elif [ -f "$HOME/.zshrc" ]; then
        echo "$HOME/.zshrc"
      elif [ -f "$HOME/.config/fish/config.fish" ]; then
        echo "$HOME/.config/fish/config.fish"
      fi
			;;
		esac
		;;
	esac
}

buildEnvFile() {
  local profile="$1"
	local install_dir="$2"
	local env_file_path="$3"

	env_content="$(buildEnvContent "$detected_profile" "$install_dir")"
	command printf "$env_content" >>"$env_file_path"
	chmod a-wx "$env_file_path"
}

buildEnvContent() {
	local profile="$1"
	local install_dir="$2"

	if [ $profile = "$HOME/.config/fish/config.fish" ]; then
		# fish uses a little different syntax to modify the PATH
		cat <<END_FISH_SCRIPT
set -gx KUSION_HOME "$install_dir"
set -gx PATH "\$KUSION_HOME/bin" \$PATH

END_FISH_SCRIPT
	else
		# bash and zsh
		cat <<END_BASH_SCRIPT
export KUSION_HOME="$install_dir"
export PATH="\$KUSION_HOME/bin:\$PATH"

END_BASH_SCRIPT
	fi
}

updateProfile() {
  local profile="$1"
	local env_file_path="$2"
	local source_line_pattern="^source $env_file_path$"

	if grep -q "$source_line_pattern" "$profile"; then
		info "Skip editing user profile ($profile), cause already source $env_file_path."
	else
		info "Editing user profile ($profile)..."
		source_env_content="$(buildSourceEnvContent $env_file_path)"
		command printf "$source_env_content" >>"$profile"
	fi
}

buildSourceEnvContent() {
	local env_file_path="$1"
	cat <<END_SOURCE_SCRIPT

# Source kusion env file
source $env_file_path

END_SOURCE_SCRIPT
}

exit_trap() {
	result=$?
	if [ "$result" != "0" ]; then
		error "Failed to install kusion. Please go to https://kusionstack.io for more support."
	else
		info "Install kusion into $KUSION_HOME_DIR succeeded:"
		$KUSION_CLI_FILE_PATH version
		info "Open a new terminal, and start using kusion! For more information on how to start, please visit https://kusionstack.io."
	fi

	cleanup
	exit $result
}

cleanup() {
	if [ -d "${KUSION_TMP_ROOT:-}" ]; then
		rm -rf "$KUSION_TMP_ROOT"
	fi
}

# -----------------------------------------------------------------------------
# main
# -----------------------------------------------------------------------------
trap "exit_trap" EXIT

getSystemInfo
verifySupported
checkHttpRequestCLI
download "$(toInstallVersion)"
checkExistingKusion
install
