---
sidebar_position: 3
---

# PodTransitionRule
In normal pod lifecycle,  some phases are defined. For example, K8s Pods follow a defined lifecycle，starting in the `Pending` phase, moving through `Running` if at least one of its primary containers starts `OK`, and then through either the `Succeeded` or `Failed` phases depending on whether any container in the Pod terminated in failure.

These phase definitions can fulfill basic Pod change scenarios, but it are ambiguous. 
Actually, before pod upgrade or ready, it is necessary to have some check mechanisms in place to ensure the safety of pod changes. Fortunately, [PodOpsLifecycle](../concepts/podopslifecycle.md) extends and supports some check stages: `PreCheck` before pod upgrade and `PostCheck` before pod ready.

To ensure a more fine-grained and controlled change process for Pods, we introduce custom rules or perform additional tasks as prerequisites for state transitions before the desired state of a Pod is achieved. Similar to the Pod `readinessGates`, where certain conditions must be met for a Pod to be considered readiness. For example, we consider a Pod ready for the `PostCheck` phase only if it has specific labels. For this purpose, we introduce the `PodTransitionRule` as a prerequisite for the state transition of a Pod.

## Rule Definition

You can use `PodTransitionRule` to define a set of transition rules for your workload pods.
Each rule will be executed at the corresponding stage, and it will be blocked if the conditions are not met.

Here is an example:
```yaml
apiVersion: apps.kusionstack.io/v1alpha1
kind: PodTransitionRule
metadata:
  name: podtransitionrule-sample
spec:
  rules:
  - availablePolicy:
      maxUnavailableValue: 50%
    name: maxUnavailable
  - stage: PreCheck  # stages are supported by PodOpsLifecycle
    labelCheck:
      requires:
        matchLabels:
          app.custom/ready: 'true' 
    name: labelCheck
  - stage: PostCheck 
    webhook:
      clientConfig:
        url: https://...
        caBundle: Cg==
      failurePolicy: Fail
      parameters:
      - key: podIP
        valueFrom:
          fieldRef: 
            fieldPath: status.podIP
    name: webhookCheck
  selector:        # select pods in effect
    matchLabels:
      app: foo
```


### Available Policy
An `availablePolicy` rule defines the availability strategy during the Pod update process.

#### maxUnavailable
```yaml
availablePolicy:
  maxUnavailable: 
    value: 50%  # int or string 
```

`maxUnavailableValue` is the maximum number of pods that can be unavailable during the update.
Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%).
Absolute number is calculated from percentage by rounding down.
This can not be 0.

#### minAvailable
```yaml
availablePolicy:
  minAvailable:
    value: 5  # int or string 
```
`minAvailableValue` is the minimum number of pods that should be available during the update.

### Label Check

A `labelCheck` rule is used to check if labels are satisfied.
You can define your own labels as change check conditions and modify the labels according to your needs.
```yaml
labelCheck:
  requirs:
    matchLabels:
      app.custom/ready: 'true' 
    matchExpressions:
    - key: app.custom/forbidden 
      operator: DoesNotExist
```

### Webhook
A `webhook` is an HTTP callback: an HTTP POST that occurs when pods on configured stage.
A web application can determine whether the pod can pass this check based on the request.

```yaml
webhook:
  clientConfig: # custom server config
    url: https://...
    caBundle: Cg==
    intervalSeconds: 30
  failurePolicy: Fail
  parameters:
  - key: podIP
    valueFrom:
      fieldRef: 
        fieldPath: status.podIP
```
**Protocol**

Request:
```json
{ 
  "traceId": "<trace-id>",
  "retryByTrace": false,
  "stage": "PreTrafficOff",
  "ruleName": "webhookCheck",
    "resources": [
  	{
      "apiVersion": "v1",
      "kind": "Pod",
      "name": "pod-a",
      "parameters": {
      	"podIP": "1.0.0.1"
      }
    },
    {
      "apiVersion": "v1",
      "kind": "Pod",
      "name": "pod-b",
      "parameters": {
      	"podIP": "1.0.0.2"
      }
    }
  ]
}
```
Response:
```json
{
  "success": false,
  "message": "msg",	
  "passed": ["pod-a", "pod-b"], 
  "retryByTrace": false
}
```
Response `success` indicate all pods approved or not. If it's `false`, the `passed` field can be used to allow partial pods.
if response `retryByTrace=true`, the next retry request will reuse the previous `traceId`.