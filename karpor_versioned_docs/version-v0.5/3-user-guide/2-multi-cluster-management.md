---
title: Multi-Cluster Management
---
Multi-cluster management is the entrance to register clusters into Karpor, enabling search and insight capabilities across a large number of clusters.

## Register Cluster

1. Click the <kbd>Cluster Management</kbd> Tab.
2. Click the <kbd>Register Cluster</kbd> button.
   ![](/karpor/assets/cluster-mng/cluster-mng-empty.png)
3. Add the cluster name. The cluster name must be unique and CANNOT be altered once created.
4. Upload the cluster's KubeConfig file. One with read permission is sufficient.
5. Click the <kbd>Verify and Submit</kbd> button.
   ![](/karpor/assets/cluster-mng/cluster-mng-register-new-cluster.png)
6. Once verified, the cluster will be added under the <kbd>Cluster Management</kbd> page
   ![](/karpor/assets/cluster-mng/cluster-mng-register-success.png)

**Note**: Please ensure network connectivity between the server address (target cluster address) in the uploaded cluster certificate and Karpor. For example, if you have deployed Karpor in a local cluster and want to register that local cluster, you need to modify the server address in the cluster certificate to the internal cluster address `https://kubernetes.default.svc.cluster.local:443` to ensure that Karpor can directly access the target cluster.

### Register EKS Cluster

If you want to register an EKS cluster, you need to perform some additional operations on the KubeConfig:

1. Export the KubeConfig for the EKS cluster. For example, you can obtain the KubeConfig for the specified cluster using the following AWS command:

```shell
aws eks --region <YOUR REGION> update-kubeconfig  --name <YOUR CLUSTER NAME> --kubeconfig=<OUTPUT FILENAME>
```

2. Add the fields `env`, `interactiveMode`, and `provideClusterInfo` to the `users/exec` section of the exported KubeConfig file. You can refer to the following KubeConfig structure:

```yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: CA
    server: SERVER
  name: CLUSTER
contexts:
- context:
    cluster: CLUSTER
    user: USER
  name: CONTEXT
current-context: CONTEXT
kind: Config
preferences: {}
users:
- name: USER
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1beta1
      args:
      - --region
      - ap-southeast-1
      - eks
      - get-token
      - --cluster-name
      - mycluster3
      - --output
      - json
      command: aws
      ### The following fields need to be added to the KubeConfig.
      env:
      - name: AWS_ACCESS_KEY_ID
        value: <YOUR AWS_ACCESS_KEY_ID>
      - name: AWS_SECRET_ACCESS_KEY
        value: <YOUR AWS_SECRET_ACCESS_KEY>
      - name: AWS_DEFAULT_REGION
        value: <AWS_DEFAULT_REGION>
      - name: AWS_DEFAULT_OUTPUT
        value: json
      interactiveMode: IfAvailable
      provideClusterInfo: false
```

3. Use the modified kubeconfig in [Register Cluster](#register-cluster).

## Edit Cluster

The <kbd>Edit</kbd> button allows for modifications to the <kbd>Display Name</kbd> and <kbd>Description</kbd>, thus altering how the cluster's name and description appear on the Dashboard.
![](/karpor/assets/cluster-mng/cluster-mng-edit-cluster.png)

## Rotate Certificate

When the kubeconfig expires, you can update the certificate by clicking <kbd>Rotate Certificate</kbd>.
![](/karpor/assets/cluster-mng/cluster-mng-rotate-cluster-1.png)
![](/karpor/assets/cluster-mng/cluster-mng-rotate-cluster-2.png)
![](/karpor/assets/cluster-mng/cluster-mng-rotate-cluster-3.png)

## Remove Cluster

The <kbd>delete</kbd> button facilitates the removal of a registered cluster.
![](/karpor/assets/cluster-mng/cluster-mng-delete-cluster.png)
