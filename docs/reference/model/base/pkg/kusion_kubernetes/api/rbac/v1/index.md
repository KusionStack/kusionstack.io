# Package v1

## Index

- [AggregationRule](#schema-aggregationrule)
- [ClusterRole](#schema-clusterrole)
- [ClusterRoleBinding](#schema-clusterrolebinding)
- [PolicyRule](#schema-policyrule)
- [Role](#schema-role)
- [RoleBinding](#schema-rolebinding)
- [RoleRef](#schema-roleref)
- [Subject](#schema-subject)


## Schemas

### Schema AggregationRule

AggregationRule describes how to locate ClusterRoles to aggregate into the ClusterRole

#### Attributes

**clusterRoleSelectors**

`[LabelSelector]`

ClusterRoleSelectors holds a list of selectors which will be used to find ClusterRoles and create the rules. If any of the selectors match, then the ClusterRole&#39;s permissions will be added

### Schema ClusterRole

ClusterRole is a cluster level, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding or ClusterRoleBinding.

#### Attributes

**aggregationRule**

`AggregationRule`

AggregationRule is an optional field that describes how to build the Rules for this ClusterRole. If AggregationRule is set, then the Rules are controller managed and direct changes to Rules will be stomped by the controller.

**apiVersion** *required* *readOnly*

`"rbac.authorization.k8s.io/v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"ClusterRole"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

Standard object&#39;s metadata.

**rules**

`[PolicyRule]`

Rules holds all the PolicyRules for this ClusterRole

### Schema ClusterRoleBinding

ClusterRoleBinding references a ClusterRole, but not contain it.  It can reference a ClusterRole in the global namespace, and adds who information via Subject.

#### Attributes

**apiVersion** *required* *readOnly*

`"rbac.authorization.k8s.io/v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"ClusterRoleBinding"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

Standard object&#39;s metadata.

**roleRef** *required*

`RoleRef`

RoleRef can only reference a ClusterRole in the global namespace. If the RoleRef cannot be resolved, the Authorizer must return an error.

**subjects**

`[Subject]`

Subjects holds references to the objects the role applies to.

### Schema PolicyRule

PolicyRule holds information that describes a policy rule, but does not contain information about who the rule applies to or which namespace the rule applies to.

#### Attributes

**apiGroups**

`[str]`

APIGroups is the name of the APIGroup that contains the resources.  If multiple API groups are specified, any action requested against one of the enumerated resources in any API group will be allowed.

**nonResourceURLs**

`[str]`

NonResourceURLs is a set of partial urls that a user should have access to.  *s are allowed, but only as the full, final step in the path Since non-resource URLs are not namespaced, this field is only applicable for ClusterRoles referenced from a ClusterRoleBinding. Rules can either apply to API resources (such as &#34;pods&#34; or &#34;secrets&#34;) or non-resource URL paths (such as &#34;/api&#34;),  but not both.

**resourceNames**

`[str]`

ResourceNames is an optional white list of names that the rule applies to.  An empty set means that everything is allowed.

**resources**

`[str]`

Resources is a list of resources this rule applies to. &#39;*&#39; represents all resources.

**verbs** *required*

`[str]`

Verbs is a list of Verbs that apply to ALL the ResourceKinds and AttributeRestrictions contained in this rule. &#39;*&#39; represents all verbs.

### Schema Role

Role is a namespaced, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding.

#### Attributes

**apiVersion** *required* *readOnly*

`"rbac.authorization.k8s.io/v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"Role"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

Standard object&#39;s metadata.

**rules**

`[PolicyRule]`

Rules holds all the PolicyRules for this Role

### Schema RoleBinding

RoleBinding references a role, but does not contain it.  It can reference a Role in the same namespace or a ClusterRole in the global namespace. It adds who information via Subjects and namespace information by which namespace it exists in.  RoleBindings in a given namespace only have effect in that namespace.

#### Attributes

**apiVersion** *required* *readOnly*

`"rbac.authorization.k8s.io/v1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"RoleBinding"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

Standard object&#39;s metadata.

**roleRef** *required*

`RoleRef`

RoleRef can reference a Role in the current namespace or a ClusterRole in the global namespace. If the RoleRef cannot be resolved, the Authorizer must return an error.

**subjects**

`[Subject]`

Subjects holds references to the objects the role applies to.

### Schema RoleRef

RoleRef contains information that points to the role being used

#### Attributes

**apiGroup** *required*

`str`

APIGroup is the group for the resource being referenced

**kind** *required*

`str`

Kind is the type of resource being referenced

**name** *required*

`str`

Name is the name of resource being referenced

### Schema Subject

Subject contains a reference to the object or user identities a role binding applies to.  This can either hold a direct API object reference, or a value for non-objects such as user and group names.

#### Attributes

**apiGroup**

`str`

APIGroup holds the API group of the referenced subject. Defaults to &#34;&#34; for ServiceAccount subjects. Defaults to &#34;rbac.authorization.k8s.io&#34; for User and Group subjects.

**kind** *required*

`str`

Kind of object being referenced. Values defined by this API group are &#34;User&#34;, &#34;Group&#34;, and &#34;ServiceAccount&#34;. If the Authorizer does not recognized the kind value, the Authorizer should report an error.

**name** *required*

`str`

Name of the object being referenced.

**namespace**

`str`

Namespace of the referenced object.  If the object kind is non-namespace, such as &#34;User&#34; or &#34;Group&#34;, and this value is not empty the Authorizer should report an error.

<!-- Auto generated by kcl-doc tool, please do not edit. -->
