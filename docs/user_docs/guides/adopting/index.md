# Adopting KusionStack

If you’ve fallen in love with KusionStack, it might not be obvious how to adopt it. For brand new projects, it’s easy: start writing your infrastructure using the KusionStack from the start. But what if you already have infrastructure stood up? For this, Kusion also provides some automated tools to help you quickly migrate.

For kubernetes users, Kusion provides a conversion tool from OpenAPI to KCL model code to directly reuse hundreds of existing core models in Kubernetes. For istio users, and for situations that Kubernetes built-in models cannot support, Kusion also supports automatic CRD generation as KCL model code.

