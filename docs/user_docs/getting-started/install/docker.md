---
sidebar_position: 2
---

# Docker

If the environment do not supported, you can choose the Docker version of KusionStack. First install the [Docker](https://www.docker.com/) environment and start the Docker service. Then use the `docker info` command to verify that the Docker service has been started succeed.

KusionStack image: https://hub.docker.com/r/kusionstack/kusion

## 1. Latest Version

Pull the latest version with the following command:

```shell
$ docker pull kusionstack/kusion
Using default tag: latest
latest: Pulling from kusion/kusion
...
kusionstack/kusion:latest
$
```

Then use the following command to check the KCL version:

```shell
$ docker run --rm -it kusionstack/kusion kcl --version
kclvm version is 0.4.1; checksum: ***
$
```

## 2. Custom Version

Check the list of image [versions](https://hub.docker.com/r/kusionstack/kusion/tags) at first, pull the latest image of kusion with the following command (the Kusion image include the KCL command tools):

```shell
$ docker pull kusionstack/kusion
...
```

Then use the following command to check the KCL version:

```shell
$ docker run --rm -it kusionstack/kusion:v0.4.1 kcl --version
kclvm version is 0.4.1
$
```

## 3. Run KCL

If you want to verify the execution of the KCL program, you can first create a `hello.k` file with the following content:

```python
hello = "world"
```

Then execute the `hello.k` file with the following command:

```shell
$ docker run --rm -it -v `pwd`:/root/hello.k kusionstack/kusion kcl /root/hello.k
hello: world
$
```

The output this the YAML format data, content is `hello: world`.
