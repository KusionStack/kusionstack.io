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

## Edit Cluster

The <kbd>Edit</kbd> button allows for modifications to the <kbd>Display Name</kbd> and <kbd>Description</kbd>, thus altering how the cluster's name and description appear on the Dashboard.
![](/karpor/assets/cluster-mng/cluster-mng-edit-cluster.png)

## Rotate Certificate

When the KubeConfig expires, you can update the certificate by clicking <kbd>Rotate Certificate</kbd>.
![](/karpor/assets/cluster-mng/cluster-mng-rotate-cluster-1.png)
![](/karpor/assets/cluster-mng/cluster-mng-rotate-cluster-2.png)
![](/karpor/assets/cluster-mng/cluster-mng-rotate-cluster-3.png)

## Remove Cluster

The <kbd>delete</kbd> button facilitates the removal of a registered cluster.
![](/karpor/assets/cluster-mng/cluster-mng-delete-cluster.png)
