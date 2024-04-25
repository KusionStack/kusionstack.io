---
title: Multi-Cluster Management
---

Multi-cluster management allows for the registration of clusters into Karpor, enabling the search and insight across a large number of clusters.

## Register Cluster

1. Click the `Cluster Management` Tab.
2. Click the `Register Cluster` button.
   ![](./assets/1-multi-cluster-management/register-cluster-1.png)
3. Input the cluster name. The cluster name must be unique and cannot be altered once created.
4. Upload the cluster's kubeconfig file. One with read permission is sufficient.
5. Click the `verify And Submit` button.
   ![](./assets/1-multi-cluster-management/register-cluster-2.png)
6. Once verified, the cluster will be added under the `Cluster Management` page
   ![](./assets/1-multi-cluster-management/register-cluster-3.png)

## Edit Cluster

The `Edit` button allows for modifications to the `Display Name` and `Description`, thus altering how the cluster's name and description appear on the frontend.
![](./assets/1-multi-cluster-management/edit-cluster.png)

## Rotate Certificate

When the kubeconfig expires, you can update the certificate by clicking `Rotate Certificate`.
![](./assets/1-multi-cluster-management/rotate-certificate-1.png)
![](./assets/1-multi-cluster-management/rotate-certificate-2.png)

## Remove Cluster

The `delete` button facilitates the removal of a registered cluster.
![](./assets/1-multi-cluster-management/delete-cluster.png)
