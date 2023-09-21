# Roadmap

For a finer-grained view into our roadmap and what is being worked on for a release, please refer to the [GitHub Issue Tracker](https://github.com/KusionStack/kusion/issues)

## Resource Ecosystem
We plan to expand the range of resource types that our platform can handle. This includes not only traditional cloud IaaS resources, but also popular cloud-native products such as Prometheus, istio and Argo. By supporting a wider variety of resources, we aim to address the heterogeneous needs of modern applications and allow users to harness the full power of the cloud-native technologies.

## App Progressive Rollout
One of the key challenges in delivering applications at scale is to balance the need for speed with the need for reliability. To help our users achieve this balance, we will introduce progressive rollout strategies, such as canary release, rolling release, and percentage release. These techniques enable users to test new features or versions on a small subset of their users or infrastructure before rolling them out to the entire system. By doing so, users can minimize the risk of downtime or errors caused by untested changes.

## Custom Pipelines
Thie current workflow of KusionStack is `write`,`preview` and `apply`, but to handle more complex deployments we need to empower users to customize the deployment pipelines to fit their specific workflows and requirements. This includes the ability to define custom stages, add or remove steps, and integrate with third-party tools. With customizable pipelines, users can streamline their deployment process, automate repetitive tasks, and satisfy their own needs by themself.

## Runtime Plugin
We have already supported IaaS cloud resources and Kubernetes resources, but we need a more flexible mechanism to support a broader range of on-premise infrastructure. By supporting a diverse set of infrastructures, we can help users avoid vendor lock-in, optimize their resource usage, and scale their applications across different regions and geographies.
