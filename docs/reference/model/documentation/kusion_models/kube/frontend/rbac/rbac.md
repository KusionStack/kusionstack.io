# rbac

## Index

- [ClusterRole](#clusterrole)
- [ClusterRoleBinding](#clusterrolebinding)
- [Role](#role)
- [RoleBinding](#rolebinding)


## Schemas

### ClusterRole

rules: [PolicyRule], default is Undefined, optional Rules holds all the PolicyRules for this ClusterRole aggregationRule: AggregationRule, default is Undefined, optional AggregationRule is an optional field that describes how to build the Rules for this ClusterRole. If AggregationRule is set, then the Rules are controller managed and direct changes to Rules will be stomped by the controller.

#### Attributes

**aggregationRule**

`AggregationRule`

**annotations**

`{str:str}`

Annotations is an unstructured key value map stored with a
resource that may be set by external tools to store and retrieve
arbitrary metadata. They are not queryable and should be preserved
when modifying objects.
More info: http://kubernetes.io/docs/user-guide/annotations

**kubernetes** *required*

`ClusterRole`

**labels**

`{str:str}`

Labels is a map of string keys and values that can be used to
organize and categorize (scope and select) objects.
May match selectors of replication controllers and services.
More info: http://kubernetes.io/docs/user-guide/labels

**metadata**

`{str:}`

**name**

`str`

The name of the resource.
Name must be unique within a namespace. It&#39;s required when creating
resources, although some resources may allow a client to request the
generation of an appropriate name automatically.
Name is primarily intended for creation idempotence and configuration
definition. Cannot be updated. More info:
http://kubernetes.io/docs/user-guide/identifiers#names

**namespace**

`str`

Namespaces are intended for use in environments with many users spread
across multiple teams, or projects.
For clusters with a few to tens of users, you should not need to create
or think about namespaces at all. Start using namespaces when you need the features they provide.
More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/

**rules**

`[PolicyRule]`

### ClusterRoleBinding

subjects: [Subject], default is Undefined, optional Subjects holds references to the objects the role applies to. roleRef: ClusterRole, default is Undefined, required RoleRef can only reference a ClusterRole in the global namespace. If the RoleRef cannot be resolved, the Authorizer must return an error.

#### Attributes

**annotations**

`{str:str}`

Annotations is an unstructured key value map stored with a
resource that may be set by external tools to store and retrieve
arbitrary metadata. They are not queryable and should be preserved
when modifying objects.
More info: http://kubernetes.io/docs/user-guide/annotations

**kubernetes** *required*

`ClusterRoleBinding`

**labels**

`{str:str}`

Labels is a map of string keys and values that can be used to
organize and categorize (scope and select) objects.
May match selectors of replication controllers and services.
More info: http://kubernetes.io/docs/user-guide/labels

**metadata**

`{str:}`

**name**

`str`

The name of the resource.
Name must be unique within a namespace. It&#39;s required when creating
resources, although some resources may allow a client to request the
generation of an appropriate name automatically.
Name is primarily intended for creation idempotence and configuration
definition. Cannot be updated. More info:
http://kubernetes.io/docs/user-guide/identifiers#names

**namespace**

`str`

Namespaces are intended for use in environments with many users spread
across multiple teams, or projects.
For clusters with a few to tens of users, you should not need to create
or think about namespaces at all. Start using namespaces when you need the features they provide.
More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/

**roleRef** *required*

`RoleRef`

**subjects**

`[Subject]`

### Role

rules: [PolicyRule], default is Undefined, optional Rules holds all the PolicyRules for this ClusterRole

#### Attributes

**annotations**

`{str:str}`

Annotations is an unstructured key value map stored with a
resource that may be set by external tools to store and retrieve
arbitrary metadata. They are not queryable and should be preserved
when modifying objects.
More info: http://kubernetes.io/docs/user-guide/annotations

**kubernetes** *required*

`Role`

**labels**

`{str:str}`

Labels is a map of string keys and values that can be used to
organize and categorize (scope and select) objects.
May match selectors of replication controllers and services.
More info: http://kubernetes.io/docs/user-guide/labels

**metadata**

`{str:}`

**name**

`str`

The name of the resource.
Name must be unique within a namespace. It&#39;s required when creating
resources, although some resources may allow a client to request the
generation of an appropriate name automatically.
Name is primarily intended for creation idempotence and configuration
definition. Cannot be updated. More info:
http://kubernetes.io/docs/user-guide/identifiers#names

**namespace**

`str`

Namespaces are intended for use in environments with many users spread
across multiple teams, or projects.
For clusters with a few to tens of users, you should not need to create
or think about namespaces at all. Start using namespaces when you need the features they provide.
More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/

**rules**

`[PolicyRule]`

### RoleBinding

subjects: [Subject], default is Undefined, optional Subjects holds references to the objects the role applies to. roleRef: RoleRef, default is Undefined, required RoleRef can only reference a ClusterRole in the global namespace. If the RoleRef cannot be resolved, the Authorizer must return an error.

#### Attributes

**annotations**

`{str:str}`

Annotations is an unstructured key value map stored with a
resource that may be set by external tools to store and retrieve
arbitrary metadata. They are not queryable and should be preserved
when modifying objects.
More info: http://kubernetes.io/docs/user-guide/annotations

**kubernetes** *required*

`RoleBinding`

**labels**

`{str:str}`

Labels is a map of string keys and values that can be used to
organize and categorize (scope and select) objects.
May match selectors of replication controllers and services.
More info: http://kubernetes.io/docs/user-guide/labels

**metadata**

`{str:}`

**name**

`str`

The name of the resource.
Name must be unique within a namespace. It&#39;s required when creating
resources, although some resources may allow a client to request the
generation of an appropriate name automatically.
Name is primarily intended for creation idempotence and configuration
definition. Cannot be updated. More info:
http://kubernetes.io/docs/user-guide/identifiers#names

**namespace**

`str`

Namespaces are intended for use in environments with many users spread
across multiple teams, or projects.
For clusters with a few to tens of users, you should not need to create
or think about namespaces at all. Start using namespaces when you need the features they provide.
More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/

**roleRef** *required*

`RoleRef`

**subjects**

`[Subject]`

<!-- Auto generated by kcl-doc tool, please do not edit. -->
