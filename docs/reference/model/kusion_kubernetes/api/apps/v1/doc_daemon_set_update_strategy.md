# daemon_set_update_strategy

Source: [base/pkg/kusion_kubernetes/api/apps/v1/daemon_set_update_strategy.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/apps/v1/daemon_set_update_strategy.k)

This is the daemon\_set\_update\_strategy module in kusion\_kubernetes.api.apps.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema DaemonSetUpdateStrategy

DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**type**<br />Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is RollingUpdate.|str|Undefined|optional|
|**rollingUpdate**<br />Rolling update config params. Present only if type = "RollingUpdate".|[RollingUpdateDaemonSet](doc_rolling_update_daemon_set#schema-rollingupdatedaemonset)|Undefined|optional|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
