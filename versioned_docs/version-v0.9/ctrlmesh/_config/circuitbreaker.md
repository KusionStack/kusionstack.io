---
sidebar_position: 3
---
# CircuitBreaker

```yaml
apiVersion: ctrlmesh.kusionstack.io/v1alpha1 
kind: CircuitBreaker
metadata:
  name: demo
  namespace: default
spec:
  rateLimitings:
  - bucket:          
      burst: 500
      interval: 1s
      limit: 20
    name: deletePod
    properties:
      sleepingWindowSize: 15m
    recoverPolicy: SleepingWindow
    resourceRules:
    - apiGroups:
      - ""
      namespaces:
      - '*'
      resources:
      - pods
      verbs:
      - delete
    triggerPolicy: Normal
  - bucket:	         	     
      burst: 200
      interval: 1s
      limit: 20
    name: trafficOffLimit
    restRules:
    - method: POST
      url: https://*.com/*/trafficOff
    triggerPolicy: LimiterOnly
  trafficInterceptRules:     
  - contents:
    - .*(127.0.0.1).*
    interceptType: White
    methods:
    - POST
    - GET
    - PUT
    name: internalOnly

```