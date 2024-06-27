# service

## Schemas
- [Service](#schema-service)
    - [Container](#schema-container)
        - [Filespec](#schema-filespec)
        - [LifeCycle](#schema-lifecycle)
        - [Probe](#schema-probe)
            - [Exec](#schema-exec)
            - [Http](#schema-http)
            - [Tcp](#schema-tcp)
    - [Secret](#schema-secret)

## Schema Service

Service is a kind of workload profile that describes how to run your application code. This<br />is typically used for long-running web applications that should "never" go down, and handle<br />short-lived latency-sensitive web requests, or events.

### Attributes

| name | type | description | default value |
| --- | --- | --- | --- |
|**annotations**|{str:str}|Annotations are key/value pairs that attach arbitrary non-identifying metadata to the workload.||
|**containers** `required`|{str:}|Containers defines the templates of containers to be ran.<br />More info: https://kubernetes.io/docs/concepts/containers||
|**labels**|{str:str}|Labels are key/value pairs that are attached to the workload.||
|**replicas**|int|Number of container replicas based on this configuration that should be ran.||
|**secrets**|{str:[Secret](../internal/secret/secret.md#schema-secret)}|Secrets can be used to store small amount of sensitive data e.g. password, token.||

### Examples
```python
# Instantiate a long-running service and its image is "nginx:v1"

import kam.workload as wl
import kam.workload.container as c

nginxSvc : service.Service {
    containers: {
        "nginx": c.Container {
            image: "nginx:v1"
        }
    }
}
```

### Base Schema
[WorkloadBase](../internal/common#schema-workloadbase)

## Schema Container

Container describes how the Application's tasks are expected to be run. Depending on<br />the replicas parameter 1 or more containers can be created from each template.

### Attributes

| name | type | description | default value |
| --- | --- | --- | --- |
|**args**|[str]|Arguments to the entrypoint.<br />Args will overwrite the CMD value set in the Dockfile, otherwise the Docker<br />image's CMD is used if this is not provided.||
|**command**|[str]|Entrypoint array. Not executed within a shell.<br />Command will overwrite the ENTRYPOINT value set in the Dockfile, otherwise the Docker<br />image's ENTRYPOINT is used if this is not provided.||
|**dirs**|{str:str}|Collection of volumes mount into the container's filesystem.<br />The dirs parameter is a dict with the key being the folder name in the container and the value<br />being the referenced volume.||
|**env**|{str:str}|List of environment variables to set in the container.<br />The value of the environment variable may be static text or a value from a secret.||
|**files**|{str:[FileSpec](#filespec)}|List of files to create in the container.<br />The files parameter is a dict with the key being the file name in the container and the value<br />being the target file specification.||
|**image** `required`|str|Image refers to the Docker image name to run for this container.<br />More info: https://kubernetes.io/docs/concepts/containers/images||
|**lifecycle**|[lc.Lifecycle](../internal/container/lifecycle/lifecycle.md#schema-lifecycle)|Lifecycle refers to actions that the management system should take in response to container lifecycle events.||
|**livenessProbe**|[p.Probe](../internal/container/probe/probe.md#schema-probe)|LivenessProbe indicates if a running process is healthy.<br />Container will be restarted if the probe fails.||
|**readinessProbe**|[p.Probe](../internal/container/probe/probe.md#schema-probe)|ReadinessProbe indicates whether an application is available to handle requests.||
|**resources**|{str:str}|Map of resource requirements the container should run with.<br />The resources parameter is a dict with the key being the resource name and the value being<br />the resource value.||
|**startupProbe**|[p.Probe](../internal/container/probe/probe.md#schema-probe)|StartupProbe indicates that the container has started for the first time.<br />Container will be restarted if the probe fails.||
|**workingDir**|str|The working directory of the running process defined in entrypoint.<br />Default container runtime will be used if this is not specified.||

### Examples
```python
import kam.workload.container as c

web = c.Container {
    image:   "nginx:latest"
    command: ["/bin/sh", "-c", "echo hi"]
    env: {
        "name": "value"
    }
    resources: {
        "cpu": "2"
        "memory": "4Gi"
    }
}
```

## Schema FileSpec

FileSpec defines the target file in a Container.

### Attributes

| name | type | description | default value |
| --- | --- | --- | --- |
|**content**|str|File content in plain text.||
|**contentFrom**|str|Source for the file content, reference to a secret of configmap value.||
|**mode** `required`|str|Mode bits used to set permissions on this file, must be an octal value<br />between 0000 and 0777 or a decimal value between 0 and 511|"0644"|

### Examples
```python
import kam.workload.container as c

tmpFile = c.FileSpec {
    content: "some file contents"
    mode: "0777"
}
```

### Schema Lifecycle

Lifecycle describes actions that the management system should take in response to container lifecycle events.

#### Attributes

| name | type | description | default value |
| --- | --- | --- | --- |
|**postStart**| | |The action to be taken after a container is created.<br />More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks||
|**preStop**| | |The action to be taken before a container is terminated due to an API request or<br />management event such as liveness/startup probe failure, preemption, resource contention, etc.<br />More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks||
#### Examples

```
import kam.workload.container.probe as p
import kam.workload.container.lifecycle as lc

lifecycleHook = lc.Lifecycle {
    preStop: p.Exec {
        command: ["preStop.sh"]
    }
    postStart: p.Http {
        url: "http://localhost:80"
    }
}
```

### Schema Exec

Exec describes a "run in container" action.

#### Attributes

| name | type | description | default value |
| --- | --- | --- | --- |
|**command** `required`|[str]|The command line to execute inside the container.||
#### Examples

```
import kam.workload.container.probe as p

execProbe = p.Exec {
    command: ["probe.sh"]
}
```

### Schema Http

Http describes an action based on HTTP Get requests.

#### Attributes

| name | type | description | default value |
| --- | --- | --- | --- |
|**headers**|{str:str}|Collection of custom headers to set in the request||
|**url** `required`|str|The full qualified url to send HTTP requests.||
#### Examples

```
import kam.workload.container.probe as p

httpProbe = p.Http {
    url: "http://localhost:80"
    headers: {
        "X-HEADER": "VALUE"
    }
}
```

### Schema Probe

Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic. There are three probe types: readiness, liveness, and startup.

#### Attributes

| name | type | description | default value |
| --- | --- | --- | --- |
|**failureThreshold**|int|Minimum consecutive failures for the probe to be considered failed after having succeeded.||
|**initialDelaySeconds**|int|The number of seconds before health checking is activated.<br />More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes||
|**periodSeconds**|int|How often (in seconds) to perform the probe.||
|**probeHandler** `required`|[Exec](#exec) | [Http](#http) | [Tcp](#tcp)|The action taken to determine the alive or health of a container||
|**successThreshold**|int|Minimum consecutive successes for the probe to be considered successful after having failed.||
|**terminationGracePeriod**|int|Duration in seconds before terminate gracefully upon probe failure.||
|**timeoutSeconds**|int|The number of seconds after which the probe times out.<br />More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes||
#### Examples

```
import kam.workload.container.probe as p

probe = p.Probe {
    probeHandler: p.Http {
        path: "/healthz"
    }
    initialDelaySeconds: 10
}
```

### Schema Tcp

Tcp describes an action based on opening a socket.

#### Attributes

| name | type | description | default value |
| --- | --- | --- | --- |
|**url** `required`|str|The full qualified url to open a socket.||
#### Examples

```
import kam.workload.container.probe as p

tcpProbe = p.Tcp {
    url: "tcp://localhost:1234"
}
```

## Schema Secret

Secret can be used to store sensitive data.

### Attributes

| name | type | description | default value |
| --- | --- | --- | --- |
|**data**|{str:str}|Data contains the non-binary secret data in string form.||
|**immutable**|bool|Immutable, if set to true, ensures that data stored in the Secret cannot be updated.||
|**params**|{str:str}|Collection of parameters used to facilitate programmatic handling of secret data.||
|**type** `required`|"basic" | "token" | "opaque" | "certificate" | "external"|Type of secret, used to facilitate programmatic handling of secret data.||

### Examples
```python
import kam.workload.secret as sec

basicAuth = sec.Secret {
    type: "basic"
    data: {
        "username": ""
        "password": ""
    }
}
```

<!-- Auto generated by kcl-doc tool, please do not edit. -->
