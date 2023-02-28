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

# KCLVM installaltion script
$INSTALL_KCLVM_SCRIPT_URL = "https://kcl-lang.io/script/install.ps1"

# kusion installaltion script
$INSTALL_KUSION_SCRIPT_URL = "https://kusionstack.io/scripts/install-kusion.ps1"

# insall KCVLM
powershell -Command "iwr -useb $INSTALL_KCLVM_SCRIPT_URL | iex"

# install kusion
powershell -Command "iwr -useb $INSTALL_KUSION_SCRIPT_URL | iex"