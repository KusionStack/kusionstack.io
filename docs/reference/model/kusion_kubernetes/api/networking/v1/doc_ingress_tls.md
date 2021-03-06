# ingress_tls

Source: [base/pkg/kusion_kubernetes/api/networking/v1/ingress_tls.k](https://github.com/KusionStack/konfig/blob/main/base/pkg/kusion_kubernetes/api/networking/v1/ingress_tls.k)

This is the ingress\_tls module in kusion\_kubernetes.api.networking.v1 package.<br />This file was generated by the KCL auto-gen tool. DO NOT EDIT.<br />Editing this file might prove futile when you re-run the KCL auto-gen generate command.

## Schema IngressTLS

IngressTLS describes the transport layer security associated with an Ingress.

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**hosts**<br />Hosts are a list of hosts included in the TLS certificate. The values in this list must match the name/s used in the tlsSecret. Defaults to the wildcard host setting for the loadbalancer controller fulfilling this Ingress, if left unspecified.|[str]|Undefined|optional|
|**secretName**<br />SecretName is the name of the secret used to terminate TLS traffic on port 443. Field is left optional to allow TLS routing based on SNI hostname alone. If the SNI host in a listener conflicts with the "Host" header field used by an IngressRule, the SNI host is used for termination and value of the Host header is used for routing.|str|Undefined|optional|
<!-- Auto generated by kcl-doc tool, please do not edit. -->
