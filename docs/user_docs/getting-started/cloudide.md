---
sidebar_position: 2
---

# KusionStack Quick Start Trial with CloudIDE

KusionStack now supports a quick start free trial on cloud IDE without any installation or configuration! Try configuring and deploying an application with KusionStack, and all you need is a browser connected to the internet.

## Quick Start with Kusion X GitHub Codespaces

With [GitHub Codespaces](https://github.com/features/codespaces), you can create a workspace of the [Konfig repo](https://github.com/KusionStack/konfig) on the cloud, with the KusionStack develop environment preset and the VS Code extensions installed.

### Step1: Create a Workspace of Konfig

You can click the [Open in GitHub Codespaces link](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=488867056&machine=standardLinux32gb&devcontainer_path=.devcontainer.json), or click on the `Open in GitHub Codespaces` badge at the home page of [the Konfig repo](https://github.com/KusionStack/konfig), and then confirm to `Create codespace` at the create page. And a 4-core • 8GB RAM • 32GB storage workspace of Konfig main branch will be created.

![create codespace](/static/img/docs/user_docs/getting-started/install/codespaces/create-codespace.gif)

It takes about 30s to wait for the codespace to prepare the environment. Then in the workspace and you'll see a progress notification indicating that the minikube is starting, which provides the cluster for the quick start application to deploy to. The minikube starting costs about 1 minute, and during that please take your time and you could glance over the KCL configurations of the application we are going to deploy. 

![minikube start](/static/img/docs/user_docs/getting-started/install/codespaces/minikube-start.gif)

The two configuration files `appops/guestbook-frontend/base/base.k` and `appops/guestbook-frontend/dev/main.k` will be open automatically by the codespace. Together the two files declare the infra configuration of the guestbook-frontend application. For example, the `dev/main.k` declares that a `gcr.io/google-samples/gb-frontend:v5` image will be deployed to the dev environment, and the `base/base.k` file contains the common and basic configurations among the environments -- for example, a service named `frontend` that expose the application through port 80.

![view code](/static/img/docs/user_docs/getting-started/install/codespaces/gotodef.gif)

### Step2: Deploy with Kusion

With minikube started, we now can deploy the `guestbook-frontend` to the dev environment: preview the live-diff with the running resources in the cluster, confirm the change, and continue monitoring the deployment process and verify that the service serves as expected.

- right click the `Kusion: Preview Live Diff and Apply` button on the `main.k` file in the editor.

- in the interactive console shown later, toggle with the keyboard up/down key to select your next move. For example, for `Do you want to apply these diffs?` select `details` to preview a list of resources that will be changed, and for `Which diff detail do you want to see?` select `all` to view the change detail of all the resources. Since the application does not exist in the cluster before we deploy it, we can see that all three kinds of resources(Service, Deployment and Namespace) are displayed with an intended action `Create`.

- after selecting 'yes' to confirm the change, we can continue to watch the resources status and trace scrolling through the console, until a `Watch Finish! All resources have been reconciled` message indicating that all relevant resources have been reconciled.

- then the service changes in the cluster will be detected and a `Port forwarding` notification prompts to hint that we can forward a local port to the guestbook-frontend service port within the cluster so that we can further verify that the service serves properly. We can click the button and select `Open in Browser` in the following notification and access the service through the browser.

![apply to cloud](/static/img/docs/user_docs/getting-started/install/codespaces/apply.gif)


## Review and Summary

Now we've completed the quick start trial of KusionStack: preview, deploy and verify an application in the dev environment.

After the trial, you can stop the codespace in the [GitHub Codespaces Management Page](https://github.com/codespaces) and it can be restored for later use. Or you can just delete it and everything will return to the beginning.

![delete codespace](/static/img/docs/user_docs/getting-started/install/codespaces/delete-codespace.gif)
