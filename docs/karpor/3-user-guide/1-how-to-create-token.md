---
title: How to create token
---
In this document, you will learn how to use a token to access the Karpor dashboard.

[Hub cluster](../2-concepts/3-glossary.md#hub-cluster) adopts the same role-based access control (RBAC) mechanism as Kubernetes. This means that in order to access the hub cluster, users need to create a ClusterRole, ServiceAccount, and the corresponding ClusterRoleBinding in the hub cluster to bind the two. To enhance user experience, we have preset two ClusterRoles: karpor-admin and karpor-guest. The karpor-admin role has permissions to perform all actions on the dashboard, including but not limited to adding or deleting clusters, creating resource groups, etc., while the karpor-guest role is limited to view-only actions on the dashboard. As users gain a deeper understanding of Karpor, they can create additional ClusterRoles based on their needs to achieve more granular permission management.

## Exporting the Kubeconfig for the Hub Cluster

Since the hub cluster requires a kubeconfig for authentication, you can export the kubeconfig to access the hub cluster using the following command.
```shell
# The following operation is performed in the Kubernetes cluster where Karpor is installed
kubectl get configmap karpor-kubeconfig -n karpor -o go-template='{{.data.config}}'
```

**Note**: Please ensure that the server address in the hub cluster's kubeconfig is accessible from your local machine. If you deployed karpor in a local cluster, you need to forward the karpor-server service to local port 7443 and change the server address to `https://127.0.0.1:7443`.

## Forward the services of the hub cluster to the local machine

In this section, we assume that you have deployed karpor in a local cluster.

As mentioned in the previous section, to access the hub cluster locally, you need to forward the karpor-server service to your local machine. If you have used other methods for forwarding, you can skip this step. Here, we will use a simple port-forwarding method. Open another terminal and run:

```shell
# The following operation is performed in the Kubernetes cluster where Karpor is installed
kubectl -n karpor port-forward svc/karpor-server 7443:7443
```

## Create ServiceAccount and ClusterRoleBinding for your users

You can use the following commands to create karpor-admin and karpor-guest along with the corresponding clusterrolebinding in the hub cluster:

```shell
# The following commands run in the hub cluster
# Create ServiceAccount karpor-admin and bind to clusterrole
export KUBECONFIG=<Hub Cluster KUBECONFIG>
kubectl create serviceaccount karpor-admin
kubectl create clusterrolebinding karpor-admin --clusterrole=karpor-admin --serviceaccount=default:karpor-admin
# Create ServiceAccount karpor-guest and bind to clusterrole
kubectl create serviceaccount karpor-guest
kubectl create clusterrolebinding karpor-guest --clusterrole=karpor-guest --serviceaccount=default:karpor-guest
```

## Create tokens for your users

By default, the validity period of a token is 1 hour. If you need a long-term token, you can specify the expiration time when generating the token. For example:

```shell
# The following commands run in the hub cluster
export KUBECONFIG=<Hub cluster KUBECONFIG>
kubectl create token karpor-admin --duration=1000h
```

By default, the maximum validity period of the token is 8760 hours (1 year). If you need to modify this maximum validity period, you can add `--service-account-max-token-expiration={MAX_EXPIRATION:h/m/s}` to the startup parameters of the karpor-server.

## Start Using Karpor Safely

Copy the token you just generated and paste it into the token input box on the Karpor dashboard, then click login.

Start your Karpor journey in a secure environment!

