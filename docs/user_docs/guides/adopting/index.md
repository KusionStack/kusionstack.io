# Start Kusion

If you start using kusion in a brand new project, what you only need to do is to write and manage your infrastructure configuration from scratch, and we provide user guide documents for infra running on different runtimes to guide you through this process. 

However, for infrastructure which has already been managed by kubernetes, you may have some inventory of configuration models and data. In this case kusion provides automated tools to help you migrate from kubernetes quickly:

- For Kubernetes users, Kusion provides kcl-openapi tool to translate kubernetes OpenAPI to KCL model code, so that the existing Kubernetes core models can be directly included to KCL models scope.
- For Kuberenetes CRD users such as istio, the kcl-openapi tool can also convert CRDs into KCL model code.
