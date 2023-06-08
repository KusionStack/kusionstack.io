---
sidebar_position: 1
---


# Installation

## 1. Could not find `libintl.dylib`

This problem is that some tools depends on the `Gettext` library, but macOS does not have this library by default. You can try to solve it in the following ways:

1. (Skip this step for non-macOS m1) For macOS m1 operating system, make sure you have a homebrew arm64e-version installed in /opt/homebrew, otherwise install the arm version of brew with the following command

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# add to path
export PATH=/opt/homebrew/bin:$PATH
```

2. `brew install gettext`
3. Make sure `libintl.8.dylib` exists in `/usr/local/opt/gettext/lib` directory
4. If brew is installed in another directory, the library can be created by copying it to the corresponding directory

## 2. macOS system SSL related errors

Openssl dylib library not found or SSL module is not available problem

1. (Skip this step for non-macOS m1) For macOS m1 operating system, make sure you have a homebrew arm64e-version installed in /opt/homebrew, otherwise install the arm version of brew with the following command

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# add to path
export PATH=/opt/homebrew/bin:$PATH
```

2. Install openssl (version 1.1) via brew

```
brew install openssl@1.1
```
