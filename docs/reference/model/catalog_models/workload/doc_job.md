# Job

## Schemas
- [Job](#schema-job)
    - [Container](#schema-container)
        - [Filespec](#schema-filespec)
        - [LifeCycle](#schema-lifecycle)
        - [Probe](#schema-probe)
            - [Exec](#schema-exec)
            - [Http](#schema-http)
            - [Tcp](#schema-tcp)
    - [Secret](#schema-secret)

## Schema Job

Job is a kind of workload profile that describes how to run your application code. This<br />is typically used for tasks that take from a few seconds to a few days to complete.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**containers**<br />Containers defines the templates of containers to be ran.<br />More info: https://kubernetes.io/docs/concepts/containers|{str: [container.Container](#schema-container)}|Undefined|**required**|
|**schedule**|str|Undefined|**required**|
|**replicas**<br />Number of container replicas based on this configuration that should be ran.|int|2|**required**|
|**secrets**|{str: [secret.Secret](#schema-secret)}|Undefined|optional|
|**labels**<br />Labels are key/value pairs that are attached to the workload.|{str: str}|Undefined|optional|
|**annotations**<br />Annotations are key/value pairs that attach arbitrary non-identifying metadata to the workload.|{str: str}|Undefined|optional|
### Examples
```python
Instantiate a job with busybox image and runs every hour

import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c

job: wl.Job {
    containers: {
        "busybox": c.Container{
            image:   "busybox:1.28"
            command: ["/bin/sh", "-c", "echo hello"]
        }
    }
    schedule: "0 * * * *"
}
```

### Base Schema
[WorkloadBase](../internal/doc_common.md#schema-workloadbase)

## Schema Container

Container describes how the Application's tasks are expected to be run. Depending on<br />the replicas parameter 1 or more containers can be created from each template.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**image**<br />Image refers to the Docker image name to run for this container.<br />More info: https://kubernetes.io/docs/concepts/containers/images|str|Undefined|**required**|
|**command**<br />Entrypoint array. Not executed within a shell.<br />Command will overwrite the ENTRYPOINT value set in the Dockfile, otherwise the Docker<br />image's ENTRYPOINT is used if this is not provided.|[str]|Undefined|optional|
|**args**<br />Arguments to the entrypoint.<br />Args will overwrite the CMD value set in the Dockfile, otherwise the Docker<br />image's CMD is used if this is not provided.|[str]|Undefined|optional|
|**env**<br />List of environment variables to set in the container.<br />The value of the environment variable may be static text or a value from a secret.|{str: str}|Undefined|optional|
|**workingDir**<br />The working directory of the running process defined in entrypoint.<br />Default container runtime will be used if this is not specified.|str|Undefined|optional|
|**resources**<br />Map of resource requirements the container should run with.<br />The resources parameter is a dict with the key being the resource name and the value being<br />the resource value.|{str: str}|Undefined|optional|
|**files**<br />List of files to create in the container.<br />The files parameter is a dict with the key being the file name in the container and the value<br />being the target file specification.|{str: [container.FileSpec](#schema-filespec)}|Undefined|optional|
|**dirs**<br />Collection of volumes mount into the container's filesystem.<br />The dirs parameter is a dict with the key being the folder name in the container and the value<br />being the referenced volume.|{str: str}|Undefined|optional|
|**livenessProbe**<br />LivenessProbe indicates if a running process is healthy.<br />Container will be restarted if the probe fails.|[p.Probe](#schema-probe)|Undefined|optional|
|**readinessProbe**<br />ReadinessProbe indicates whether an application is available to handle requests.|[p.Probe](#schema-probe)|Undefined|optional|
|**startupProbe**<br />StartupProbe indicates that the container has started for the first time.<br />Container will be restarted if the probe fails.|[p.Probe](#schema-probe)|Undefined|optional|
|**lifecycle**<br />Lifecycle refers to actions that the management system should take in response to container lifecycle events.|[lc.Lifecycle](#schema-lifecycle)|Undefined|optional|
### Examples
```python
import catalog.models.schema.v1.workload.container as c

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

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**content**<br />File content in plain text.|str|Undefined|optional|
|**contentFrom**<br />Source for the file content, reference to a secret of configmap value.|str|Undefined|optional|
|**mode**<br />Mode bits used to set permissions on this file, must be an octal value<br />between 0000 and 0777 or a decimal value between 0 and 511|str|Undefined|**required**|
### Examples
```python
import catalog.models.schema.v1.workload.container as c

tmpFile = c.FileSpec {
    content: "some file contents"
    mode: "0777"
}
```

## Schema Probe

Probe describes a health check to be performed against a container to determine whether it is<br />alive or ready to receive traffic. There are three probe types: readiness, liveness, and startup.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**probeHandler**<br />The action taken to determine the alive or health of a container|[probe.Exec](#schema-exec) \| [probe.Http](#schema-http) \| [probe.Tcp](#schema-tcp)|Undefined|**required**|
|**initialDelaySeconds**<br />The number of seconds before health checking is activated.<br />More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle\#container-probes|int|Undefined|optional|
|**timeoutSeconds**<br />The number of seconds after which the probe times out.<br />More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle\#container-probes|int|Undefined|optional|
|**periodSeconds**<br />How often (in seconds) to perform the probe.|int|Undefined|optional|
|**successThreshold**<br />Minimum consecutive successes for the probe to be considered successful after having failed.|int|Undefined|optional|
|**failureThreshold**<br />Minimum consecutive failures for the probe to be considered failed after having succeeded.|int|Undefined|optional|
|**terminationGracePeriod**|int|Undefined|optional|
### Examples
```python
import catalog.models.schema.v1.workload.container.probe as p

probe = p.Probe {
    probeHandler: p.Http {
        path: "/healthz"
    }
    initialDelaySeconds: 10
}
```

## Schema Exec

Exec describes a "run in container" action.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**command**<br />The command line to execute inside the container.|[str]|Undefined|**required**|
### Examples
```python
import catalog.models.schema.v1.workload.container.probe as p

execProbe = p.Exec {
    command: ["probe.sh"]
}
```

## Schema Http

Http describes an action based on HTTP Get requests.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**url**<br />The full qualified url to send HTTP requests.|str|Undefined|**required**|
|**headers**<br />Collection of custom headers to set in the request|{str: str}|Undefined|optional|
### Examples
```python
import catalog.models.schema.v1.workload.container.probe as p

httpProbe = p.Http {
    url: "http://localhost:80"
    headers: {
        "X-HEADER": "VALUE"
    }
}
```

## Schema Tcp

Tcp describes an action based on opening a socket.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**url**<br />The full qualified url to open a socket.|str|Undefined|**required**|
### Examples
```python
import catalog.models.schema.v1.workload.container.probe as p

tcpProbe = p.Tcp {
    url: "tcp://localhost:1234"
}
```

## Schema Lifecycle

Lifecycle describes actions that the management system should take in response<br />to container lifecycle events.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**preStop**<br />The action to be taken before a container is terminated due to an API request or<br />management event such as liveness/startup probe failure, preemption, resource contention, etc.<br />More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/\#container-hooks|[probe.Exec](#schema-exec) \| [probe.Http](#schema-http)|Undefined|optional|
|**postStart**<br />The action to be taken after a container is created.<br />More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/\#container-hooks|[probe.Exec](#schema-exec) \| [probe.Http](#schema-http)|Undefined|optional|
### Examples
```python
import catalog.models.schema.v1.workload.container.probe as p
import catalog.models.schema.v1.workload.container.lifecycle as lc

lifecycleHook = lc.Lifecycle {
    preStop: p.Exec {
        command: ["preStop.sh"]
    }
    postStart: p.Http {
        url: "http://localhost:80"
    }
}
```

## Schema Secret

Secret can be used to store sensitive data.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**type**<br />Type of secret, used to facilitate programmatic handling of secret data.<br />More info: https://kubernetes.io/docs/concepts/configuration/secret/\#secret-types|"basic" \| "opaque"|opaque|**required**|
|**data**<br />Data contains the non-binary secret data in string form.|{str: str}|Undefined|optional|
|**immutable**<br />Immutable, if set to true, ensures that data stored in the Secret cannot be updated.|bool|Undefined|optional|
### Examples
```python
import catalog.models.schema.v1.workload.secret as sec

basicAuth = sec.Secret {
    type: "basic"
    data: {
        "username": ""
        "password": ""
    }
}
```

<!-- Auto generated by kcl-doc tool, please do not edit. -->
