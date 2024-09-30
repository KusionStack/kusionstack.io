---
id: health-policy
---

# Customized Health Check with KCL

Kusion now offers advanced customized health checks leveraging the power of `KCL`. This robust feature empowers users to define complex and tailored health policies for their Kubernetes resources. By implementing these custom policies, you can ensure that your resources not only meet specific criteria but also satisfy complex conditions before being deemed healthy. This capability is particularly valuable when assessing the health status of Kubernetes Custom Resources (CRs), providing a flexible and precise mechanism to validate the state of your entire `project`.

## Prerequisites

Please refer to the [prerequisites](deploy-application#prerequisites) in the guide for deploying an application.

The example below also requires you to have [initialized the project](deploy-application#initializing) using the `kusion workspace create` and `kusion init` command, which will create a workspace and also generate a [`kcl.mod` file](deploy-application#kclmod) under the stack directory.

## Defining a Health Policy

You can define a health policy in the `Workspace` configuration via the `healthPolicy` field. The `healthPolicy` should contain a KCL script that defines the health check logic and can be used to assert healthy conditions on your `Kubernetes` resources.

Firstly, you need to initialize the workspace configuration:

```shell
~/$ touch ~/dev.yaml
~/$ kusion workspace create dev -f ~/dev.yaml
create workspace dev successfully
```

### Example Health Policy

Here is an example of how to define a health policy for a Kubernetes Deployment. This policy checks multiple aspects of the Deployment's health status. Update ~/dev.yaml with this example:

```yaml
modules:
    service:
        configs:
            default:
                healthPolicy:
                    health.kcl: |
                        assert res.metadata.generation == res.status.observedGeneration
                        assert res.status.replicas == 1
```

In this example, the custom health check ensures that:

1. The Deployment has 1 replicas
2. The observed generation matches the current generation (indicating that the latest changes have been processed)

:::note
`res` represents the Kubernetes resource being evaluated. It's a fixed expression in this feature that provides access to all fields and properties of the resource. You can use dot notation (e.g., `res.metadata.name`) to access nested fields within the resource. This allows you to create complex health checks based on various aspects of your Kubernetes resources.
:::

## How It Works

When you apply your configuration, `kusion` will patch the provided `KCL` script into the `extension` field of the specified resource in the `Spec` and use the provided KCL script to evaluate the health of this resource. The health check will be performed repeatedly until it passes or a timeout is reached.

The KCL script has access to the full Kubernetes resource object through the `res` variable. You can use any fields or properties of the resource in your health check logic.

Besides configuring the workspace, platform engineers can also utilize the useful `PatchHealthPolicyToExtension` function in SDK to perform this feature while constructing the `module`. This function allows for a more programmatic and flexible approach to applying health policies while it's multiple resources case for a module.

Here's a code snippet of how to use the `PatchHealthPolicyToExtension` function:

```golang
// Generate Kusion resource ID and wrap the Kubernetes Service into Kusion resource
// with the SDK provided by kusion module framework.
resourceID := module.KubernetesResourceID(svc.TypeMeta, svc.ObjectMeta)
resource, err := module.WrapK8sResourceToKusionResource(resourceID, svc)
if err != nil {
    return nil, err
}
module.PatchHealthPolicyToExtension(resource, "assert res.metadata.generation == res.status.observedGeneration")
```

## Applying the Health Policy

To apply the health policy, update your workspace configuration:

```shell
~/$ kusion workspace update dev -f ~/dev.yaml
update workspace dev successfully
```

After updating the workspace configuration, apply your new configuration with the customized health check with the following commands:

```shell
~/$ cd quickstart/default
~/quickstart/default/$ kusion apply
 ✔︎  Generating Spec in the Stack default...                                         
                                                                                                      
Stack: default                                               
ID                                                           Action
v1:Namespace:quickstart                                      Create
v1:Service:quickstart:quickstart-default-quickstart-private  Create
apps/v1:Deployment:quickstart:quickstart-default-quickstart  Create


Do you want to apply these diffs?: 
  > yes

Start applying diffs ...
 ✔︎  Succeeded v1:Namespace:quickstart
 ⣽  Creating v1:Service:quickstart:quickstart-default-quickstart-private (0s)
 ✔︎  Succeeded v1:Namespace:quickstart
 ⢿  Creating v1:Service:quickstart:quickstart-default-quickstart-private (0s)
 ⢿  Creating apps/v1:Deployment:quickstart:quickstart-default-quickstart (0s)
 ......
 ✔︎  Succeeded v1:Namespace:quickstart
 ✔︎  Succeeded v1:Service:quickstart:quickstart-default-quickstart-private
 ✔︎  Succeeded apps/v1:Deployment:quickstart:quickstart-default-quickstart
Apply complete! Resources: 3 created, 0 updated, 0 deleted.

[v1:Namespace:quickstart]
Type   Kind            Name        Detail
READY  Namespace       quickstart  Phase: Active
READY  ServiceAccount  default     Secrets: 0, Age: 0s
[v1:Service:quickstart:quickstart-default-quickstart-private]
Type   Kind           Name                                         Detail
READY  Service        quickstart-default-quickstart-private        Type: ClusterIP, InternalIP: 10.96.196.38, ExternalIP: <none>, Port(s): 8080/TCP
READY  EndpointSlice  quickstart-default-quickstart-private-v42zc  AddressType: IPv4, Ports: 8080, Endpoints: 10.244.1.99
[apps/v1:Deployment:quickstart:quickstart-default-quickstart]
Type   Kind        Name                                            Detail
READY  Deployment  quickstart-default-quickstart                   Reconciled
READY  ReplicaSet  quickstart-default-quickstart-67459cd68d        Desired: 1, Current: 1, Ready: 1
READY  Pod         quickstart-default-quickstart-67459cd68d-jqtt7  Ready: 1/1, Status: Running, Restart: 0, Age: 4s
```

## Explanation

The `Detail` column for the Deployment `quickstart-default-quickstart` provides crucial information about the resource's reconciliation status:

- If it shows "Reconciled", it means the resource has successfully met the conditions defined in the health policy.

```shell
Type   Kind        Name                                 Detail
READY  Deployment  quickstart-default-quickstart        Reconciled
```

- If it displays "Reconciling...", it indicates that the resource is still in the process of reaching the desired state as per the health policy.

```shell
Type   Kind        Name                                 Detail
MODIFIED  Deployment  quickstart-default-quickstart     Reconciling...
```

- In case of any errors or unsupported configurations, appropriate messages will be shown, and customized health check will be skipped.

```shell
Type   Kind        Name                                 Detail
READY  Deployment  quickstart-default-quickstart        health policy err: invalid syntax error, skip
```

This `Detail` helps you quickly assess whether your Kubernetes resources have reached their intended state after applying changes. It's an essential feedback mechanism for ensuring the reliability and correctness of your deployments.

:::note
`Detail` showing as `Unsupported kind, skip` indicates that the health policy is not configured for this resource's health check. This can occur due to several reasons:

1. There's a mismatch between the resource kind in your Kubernetes manifests and the kinds specified in your health policy.
2. The health policy in your workspace configuration might be missing or incorrectly defined for this particular resource.
3. You might forgot to updated your workspace with the new configuration.

To resolve this:

1. Review your workspace configuration to ensure the health policy is correctly defined for all intended resource kinds.
2. Check that the resource kind in your Kubernetes manifests matches the kinds specified in your health policy.

If the issue persists, you may need to update your workspace configuration or adjust your health policy to include the specific resource kind.
:::

## Best Practices

- Keep your health check logic simple and focused on key indicators of health for your specific resource.
- Use assertions to clearly define what conditions must be true for the resource to be considered healthy.
- Consider both the desired state (e.g., number of replicas) and the current state (e.g., available replicas) in your health checks.
- For complex resources, you may want to check multiple conditions to ensure full health and readiness.

## Limitations

- The customized health check feature is currently only available for Kubernetes resources.
- The KCL script must complete execution within a reasonable time to avoid timeouts during the apply process.
- Errors in the KCL script syntax will cause the health check to be skipped, so be sure to test your scripts thoroughly.

## Validation

To verify the health policy, you can check the status of your Kubernetes resources:

```bash
kubectl get -n quickstart deployment quickstart-default-quickstart -o yaml
```

Ensure that the resource meets the conditions defined in your health policy.

## Conclusion

Customized health checks provides a powerful way to ensure your Kubernetes resources are in the desired state before considering an `apply` operation complete. By defining health policies, you can automate the validation of your resources and ensure they meet specific criteria before being considered healthy. By leveraging KCL, you can create sophisticated health check logic tailored to your specific `project` needs.

For more details on KCL and its syntax, refer to the [KCL documentation](../../4-configuration-walkthrough/2-kcl-basics.md).
