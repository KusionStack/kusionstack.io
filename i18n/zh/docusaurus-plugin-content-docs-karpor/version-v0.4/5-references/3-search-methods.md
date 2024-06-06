---
title: Search Methods
---

Karpor is an open-source project that offers robust capabilities for searching resources across multiple clusters. This document outlines the two main search methods supported by Karpor: DSL (Domain Specific Language) and SQL (Structured Query Language), and explains how to utilize them for resource searches.

## Keywords

Karpor facilitates resource searches using two methods: DSL and SQL. Both methodologies leverage the following keywords for resource discovery:

- cluster
- apiVersion
- kind
- namespace
- name
- creationTimestamp
- deletionTimestamp
- ownerReferences
- resourceVersion
- labels.`key`
- annotations.`key`
- content

## SQL

Karpor offers a SQL-like approach for querying Kubernetes resources, enabling users to employ SQL syntax for their searches. Below are examples illustrating the use of SQL syntax for various search scenarios:

**Query resources of the Namespace kind**

```sql
select * from resources where kind='Namespace'
```

**Query resources where the labels contain the key 'key1' with value 'value1'**

```sql
select * from resources where labels.key1='value1'
```

**Query resources where the annotations contain the key 'key1' with value 'value1'**

```sql
select * from resources where annotations.key1='value1'
```

**Query resources that are not of the Pod kind**

```sql
select * from resources where kind!='Pod'
```

**Query resources of the Pod kind within a specific cluster**

```sql
select * from resources where cluster='demo' and kind='Pod'
```

**Query resources of kind within a specified list**

```sql
select * from resources where kind in ('pod','service')
```

**Query resources of kinds not within a specified list**

```sql
select * from resources where kind not in ('pod','service')
```

**Query resources where the namespace starts with appl (where % represents any number of characters)**

```sql
select * from resources where namespace like 'appl%'
```

**Query resources where the namespace contains banan (where \_ represents any single character)**

```sql
select * from resources where namespace like 'banan_'
```

**Query resources where the namespace does not start with appl**

```sql
select * from resources where namespace not like 'appl%'
```

**Query resources where the namespace does not contain banan**

```sql
select * from resources where namespace notlike 'banan_'
```

**Query resources of kind Deployment and created before January 1, 2024, at 18:00:00**

```sql
select * from resources where kind='Deployment' and creationTimestamp < '2024-01-01T18:00:00Z'
```

**Query resources of kind Service and order by creation timestamp in descending order**

```sql
select * from resources where kind='Service' order by creationTimestamp desc
```

**Query resources whose content contains apple**

```sql
select * from resources where contains(content, 'apple')
```
