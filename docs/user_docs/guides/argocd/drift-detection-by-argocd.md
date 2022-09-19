# Drift Detection by ArgoCD

## 1. Config ArgoCD Plugin with Kusion

ArgoCD has already had some common built-in plugins, including helm, jsonnet, and kustomize. 
For KCL, as a brand-new configuration language, if you want to use ArgoCD to complete drift detection, 
you need to follow its plugin mechanism and configure Kusion as a third-party plugin.
The specific operations are as follows:

1. Download [patch](https://github.com/KusionStack/examples/blob/main/kusion/argo-cd/patch-argocd-cm.yaml) file:

```shell
wget -q https://raw.githubusercontent.com/KusionStack/examples/main/kusion/argo-cd/patch-argocd-cm.yaml
```

2. Update configuration

```shell
kubectl -n argocd patch cm/argocd-cm -p "$(cat patch-argocd-cm.yaml)"
```

## 2. Update ArgoCD Deployment

After completing the first step, ArgoCD will recognize the Kusion plugin, 
but the Kusion plugin has not been loaded into the ArgoCD image. 
To implement configuration drift detection, we have to tune the Deployment of argocd-repo-server.

1. Download [patch](https://github.com/KusionStack/examples/blob/main/kusion/argo-cd/patch-argocd-repo-server.yaml) file

```shell
wget -q https://raw.githubusercontent.com/KusionStack/examples/main/kusion/argo-cd/patch-argocd-repo-server.yaml
```

2. Update configuration

```shell
kubectl -n argocd patch deploy/argocd-repo-server -p "$(cat patch-argocd-repo-server.yaml)"
```

3. Update complete

```shell
kubectl get pod -n argocd -l app.kubernetes.io/name=argocd-repo-server
```

## 3. Create KCL Project

At this point, the preparation work has been completed, and now the verification process is started. 
Here we use example projects from the open-source [Konfig](https://github.com/KusionStack/konfig) library.

1. Enable local port forwarding

```shell
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

2. Login to ArgoCD

```shell
argocd login localhost:8080
```

3. Create ArgoCD Application

```shell
argocd app create guestbook-test \
--repo https://github.com/KusionStack/konfig.git \
--path appops/guestbook-frontend/prod \
--dest-namespace default \
--dest-server https://kubernetes.default.svc \
--config-management-plugin kusion
```

> Note：If you are using a private repository, you need to configure the private repository access with private key credentials before executing the create command. 
> Please refer [Private Repositories](https://argo-cd.readthedocs.io/en/stable/user-guide/private-repositories/#ssh-private-key-credential) for more details.

After successfully creating, you can see the following output:

```
application 'guestbook-test' created
```

Through the ArgoCD UI, you can see that the created applications have not been synchronized yet. 
Here, you can manually synchronize or set automatic synchronization.

![](/img/docs/user_docs/guides/argocd/out-of-sync.jpg)

4. Set synchronization policy (only `unsynced` resources):

```shell
argocd app set guestbook-test --sync-option ApplyOutOfSyncOnly=true
```

> For more information on synchronization strategies, see [Sync Options](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/)

Sync succeeded:

![](/img/docs/user_docs/guides/argocd/synced.jpg)

## 4. Config Drift Detection

At this point, the ArgoCD monitoring KCL project has been completed, implement configuration drift detection and achieve result consistency.
Let's modify the mirror version of `guestbook-test` to implement configuration changes.

1. Update image

```diff
 appConfiguration: frontend.Server {
-    image = "gcr.io/google-samples/gb-frontend:v4"
+    image = "gcr.io/google-samples/gb-frontend:v5"
     schedulingStrategy.resource = res_tpl.tiny
 }
```

2. Compile Again

```shell
kusion compile -w appops/guestbook-frontend/prod
```

3. Git commit and push

```shell
git add .
git commit -m "mannual drifted config for appops/guestbook-frontend/prod"
git push origin main
```

4. Drift configuration auto-convergence

![](/img/docs/user_docs/guides/argocd/reconcile-drifted-config.jpg)

