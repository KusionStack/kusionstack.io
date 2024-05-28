# Using KusionStack Operating to operate Pods gracefully

Applications always provide its service along with traffic routing.
On Kubernetes, they should be a set of Pods and a corresponding Kubernetes Service resource to expose the service.

However, during operations such as updating Pod revisions,
there is a risk that client request traffic may be lost. This can lead to a poor user experience for developers.

This tutorial will demonstrate how to operate Pods gracefully in a KusionStack Operating way on Aliyun ACK
with SLB as a Service backend provider.

> You can also get the same point from [this video](https://www.bilibili.com/video/BV1n8411q7sP/?t=15.7),
> which shows the same case using both KusionStack Kusion and Operating.
> The sample used in this video can be found from [KusionStack Catalog](https://github.com/KusionStack/catalog/tree/main/models/samples/wordpress).

## Preparing

First, ensure that you have an Aliyun ACK Kubernetes cluster set up in order to provision an Aliyun SLB.

Next, install KusionStack Operating on this Kubernetes cluster
following [installation doc](https://kusionstack.io/docs/operating/started/install).

## Get started

### Create a new namespace

To begin, create a new namespace for this tutorial:

```shell
$ kubectl create ns operating-tutorial
```

### Provision Pods and Services

You can create a set of Pods to run up a demo application service
by creating CollaSet resource using following command:

``` shell
echo '
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: server
  template:
    metadata:
      labels:
        app: server
    spec:
      containers:
      - image: wu8685/echo:1.3
        name: server
        command:
        - /server
        resources:
          limits:
            cpu: "0.1"
            ephemeral-storage: 100Mi
            memory: 100Mi
          requests:
            cpu: "0.1"
            ephemeral-storage: 100Mi
            memory: 100Mi
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 3
' | kubectl -n operating-tutorial apply -f -
```

There should be 3 Pods created.

```shell
$ kubectl -n operating-tutorial get pod
NAME           READY   STATUS    RESTARTS   AGE
server-c5lsr   1/1     Running   0          2m23s
server-p6wrx   1/1     Running   0          2m23s
server-zn62c   1/1     Running   0          2m23s
```

Then create a Kubernetes Service by running following command,
which will provision Aliyun SLB to expose service.

```shell
echo '
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/alibaba-cloud-loadbalancer-spec: slb.s1.small
    service.beta.kubernetes.io/backend-type: eni
  labels:
    kusionstack.io/control: "true"  # this label is required
  name: server
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 8080
  selector:
    app: server
  type: LoadBalancer
' | kubectl -n operating-tutorial apply -f -
```

A service with external IP should be provisioned.

```shell
$ kubectl -n operating-tutorial get svc server
NAME     TYPE           CLUSTER-IP       EXTERNAL-IP     PORT(S)        AGE
server   LoadBalancer   192.168.225.55   47.101.49.182   80:30146/TCP   51s
```

The label `kusionstack.io/control: "true"` on Service is very important.
It means this service resource will be recognized by ResourceConsist framework, and then participate in PodOpsLifecycle
to control the Aliyun SLB to switch off traffic before updating each Pod and switch on traffic after it finished,
in order to protect the service.

### Provision a client

Then we will provision a client to access the service we created before.
Please replace `<EXTERNAL_IP>` in the following CollaSet yaml with the external IP from Kubernetes Service created above, and apply again.

```shell
echo '
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: client
spec:
  replicas: 1
  selector:
    matchLabels:
      app: client
  template:
    metadata:
      labels:
        app: client
    spec:
      containers:
      - image: wu8685/echo:1.3
        name: nginx
        command:
        - /client
        args:
        - -url
        - http://<EXTERNAL_IP>/echo   # EXTERNAL_IP should be replaced
        - -m
        - POST
        - d
        - operating-tutorial
        - -qps
        - "10"
        - -worker
        - "10"
        - -timeout
        - "10000"
        resources:
          limits:
            cpu: "0.1"
            ephemeral-storage: 1Gi
            memory: 100Mi
          requests:
            cpu: "0.1"
            ephemeral-storage: 1Gi
            memory: 100Mi
' | kubectl -n operating-tutorial apply -f -
```

A client Pod should be created.

```shell
$ kubectl -n operating-tutorial get pod
NAME           READY   STATUS    RESTARTS   AGE
client-nc426   1/1     Running   0          30s
server-c5lsr   1/1     Running   0          19m
server-p6wrx   1/1     Running   0          19m
server-zn62c   1/1     Running   0          19m
```

This client will continuously access the service using the configuration provided in the command.
You can monitor the response codes from its logs:

```shell
kubectl -n operating-tutorial logs -f client-nc426
worker-0 another loop, request: 50, failed: 0
worker-1 another loop, request: 50, failed: 0
worker-0 another loop, request: 50, failed: 0
worker-1 another loop, request: 50, failed: 0
worker-0 another loop, request: 50, failed: 0
worker-1 another loop, request: 50, failed: 0
worker-0 another loop, request: 50, failed: 0
worker-1 another loop, request: 50, failed: 0
```

The accesses are all successful.

### Update Pod revision

To trigger a Pod revision update, run the following command
to edit the container image and command in the PodTemplate of CollaSet:

```shell
echo '
apiVersion: apps.kusionstack.io/v1alpha1
kind: CollaSet
metadata:
  name: server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: server
  template:
    metadata:
      labels:
        app: server
    spec:
      containers:
      - image: wu8685/echo:1.2
        name: server
        command:
        - /app/echo
        resources:
          limits:
            cpu: "0.1"
            ephemeral-storage: 100Mi
            memory: 100Mi
          requests:
            cpu: "0.1"
            ephemeral-storage: 100Mi
            memory: 100Mi
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 3
' | kubectl -n operating-tutorial apply -f -
```

It will trigger all Pods updated simultaneously. So the application `server` has no Pod to serve.
We can observe the error from client logs.

```shell
worker-1 fails to request POST http://47.101.49.182/echo : Post "http://47.101.49.182/echo": read tcp 10.244.1.11:54040->47.101.49.182:80: read: connection reset by peer
worker-0 fails to request POST http://47.101.49.182/echo : Post "http://47.101.49.182/echo": read tcp 10.244.1.11:34438->47.101.49.182:80: read: connection reset by peer
worker-1 fails to request POST http://47.101.49.182/echo : Post "http://47.101.49.182/echo": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
worker-0 fails to request POST http://47.101.49.182/echo : Post "http://47.101.49.182/echo": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
worker-1 fails to request POST http://47.101.49.182/echo : Post "http://47.101.49.182/echo": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
worker-1 another loop, request: 20, failed: 3
worker-0 fails to request POST http://47.101.49.182/echo : Post "http://47.101.49.182/echo": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
worker-0 another loop, request: 20, failed: 3
worker-1 fails to request POST http://47.101.49.182/echo : Post "http://47.101.49.182/echo": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
```

### Provision PodTransistionRule

To avoid this problem, provision a PodTransitionRule with a maxUnavailable 50% rule by running the following command:

```shell
echo '
apiVersion: apps.kusionstack.io/v1alpha1
kind: PodTransitionRule
metadata:
  labels:
  name: server
spec:
  rules:
  - availablePolicy:
      maxUnavailableValue: 50%
    name: maxUnavailable
  selector:
    matchLabels:
      app: server
' | kubectl -n operating-tutorial apply -f -
```

After updating the CollaSet of the server to trigger an update, you will see the Pods rolling update one by one,
ensuring that at least one Pod is always available to serve.

```shell
kubectl -n operating-tutorial get pod
NAME           READY   STATUS    RESTARTS   AGE
client-rrfbj   1/1     Running   0          25s
server-457sn   0/1     Running   0          5s
server-bd5sz   0/1     Running   0          5s
server-l842s   1/1     Running   0          2m4s
```

You can see from the client logs that no access requests fail during this update.

```shell
worker-0 another loop, request: 50, failed: 0
worker-1 another loop, request: 50, failed: 0
worker-0 another loop, request: 50, failed: 0
worker-1 another loop, request: 50, failed: 0
worker-0 another loop, request: 50, failed: 0
worker-1 another loop, request: 50, failed: 0
worker-0 another loop, request: 50, failed: 0
worker-0 another loop, request: 50, failed: 0
worker-1 another loop, request: 50, failed: 0
worker-1 another loop, request: 50, failed: 0
worker-0 another loop, request: 50, failed: 0
```

### Clean tutorial namespace

At the end of this tutorial, you can clean up the resources by deleting the namespace:

```shell
$ kubectl delete ns operating-tutorial
```

## Comparison with the Native Approach

Kubernetes provides `preStop` and `postStart` hook in each container, by which users can also interact with service outside
Kubernetes like Aliyun SLB service. However, KusionStack Operating offers several advantages:

* Pod level vs Container level

Operating offers a Pod level hooks which have more complete information than one container,
especially there are several containers in one Pod.

* Plugin-able

Through KusionStack Operating, you can decouple operations executed before or after Pods actually change.
For example, traffic control can be added or removed without modifying the Pod's preStop configuration.

* Rollback option

In case of issues, rollback becomes a viable option when using the Operating approach to update Pods.
Since Operating does not modify the Pods or their containers during the update,
if the traffic service experiences problems, there is an opportunity to cancel the update.