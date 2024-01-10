---
sidebar_position: 2
---

# KCL Basics

## Table of Content
- [Variable assignments](#variable-assignments)
- [Common built-in types](#common-built-in-types)
- [Lists and maps](#lists-and-maps)
- [Conditional statements](#conditional-statements)
- [The : and = operator](#the--and--operator)
- [Advanced KCL capabilities](#advanced-kcl-capabilities)

[KCL](https://kcl-lang.io/) is the choice of configuration language consumed by Kusion. KCL is an open source constraint-based record and functional language. KCL works well with a large number of complex configurations via modern programming language technology and practice, and is committed to provide better modularity, scalability, stability and extensibility.

## Variable assignments

There are two ways to initialize a variable in KCL. You can either use the `:` operator or the `=` operator. We will discuss the difference between them in [this section later](#the--and--operator).

Here are the two ways to create a variable and initialize it:
```
foo = "Foo"  # Declare a variable named `foo` and its value is a string literal "Foo"
bar: "Bar"  # Declare a variable named `bar` and its value is a string literal "Bar"
```

You will be able to override a variable assignment via the `=` operator. We will discuss this in depth in the [`:` and `=` operator section](#the--and--operator).

## Common built-in types

KCL supports `int`, `float`, `bool` and `string` as the built-in types.

Other types are defined in the packages that are imported into the application configuration files. One such example would be the `AppConfiguration` object (or `Container`, `Probe`, `Port` object, etc) that are defined in the `catalog` repository.

## Lists and maps

Lists are represented using the `[]` notation.
An example of lists:
```
list0 = [1, 2, 3]
list1 = [4, 5, 6]
joined_list = list0 + list1  # [1, 2, 3, 4, 5, 6]
```

Maps are represented using the `{}` notation.
An example of maps:
```
a = {"one" = 1, "two" = 2, "three" = 3}
b = {'one' = 1, 'two' = 2, 'three' = 3}
assert a == b # True
assert len(a) == 3 # True
```

## Conditional statements
You can also use basic control flow statements when writing the configuration file.

An example that sets the value of `replicas` conditionally based on the value of `containers.myapp.resources.cpu`:
```
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c

myapp: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "myapp": c.Container {
                image: "<no value>"
                resources: {
                    "cpu": "500m"
                    "memory": "512Mi"
                }
            }
        }
        replicas: 1 if containers.myapp.resources.cpu == "500m" else 2
    }
}
```

For more details on KCL's control flow statements, please refer to the [KCL documentation](https://kcl-lang.io/docs/reference/lang/tour#control-flow-statements).

## The `:` and `=` operator

You might have noticed there is a mixed usage of the `:` and `=` in the samples above.

:::info

**TLDR: The recommendation is to use `:` in the common configurations, and `=` for override in the environment-specific configurations.**
:::

In KCL:
- `:` represents a union-ed value assignment. In the pattern `identifier: E` or `identifier: T E`, the value of the expression `E` with optional type annotation `T` will be merged and union-ed into the element value.
- `=` represents a value override. In the pattern `identifier = E` or `identifier = T E`, The value of the expression `E` with optional type annotation `T` will override the `identifier` attribute value.

Let's take a look at an example:
```
# This is one configuration that will be merged.
config: Config {
    data.d1 = 1
}
# This is another configuration that will be merged.
config: Config {
    data.d2 = 2
}
```

The above is equivalent to the snippet below since the two expressions for `config` get merged/union-ed into one:
```
config: Config {
    data.d1 = 1
    data.d2 = 1
}
```

whereas using the `=` operators will result in a different outcome:
```
# This is first configuration.
config = Config {
    data.d1 = 1
}
# This is second configuration that will override the prior one.
config = Config {
    data.d2 = 2
}
```

The config above results in:
```
config: Config {
    data.d2 = 2
}
```

Please note that the `:` attribute operator represents an idempotent merge operation, and an error will be thrown when the values that need to be merged conflict with each other.

```
data0 = {id: 1} | {id: 2}  # Error：conflicting values between {'id': 2} and {'id': 1}
data1 = {id: 1} | {id = 2}  # Ok, the value of `data` is {"id": 2}
```

More about `:` and `=` operator can be found in the [KCL documentation](https://kcl-lang.io/docs/reference/lang/tour#config-operations).

## Advanced KCL capabilities

For more advanced KCL capabilities, please visit the [KCL website](https://kcl-lang.io/docs/user_docs/support/faq-kcl).