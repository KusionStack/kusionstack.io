---
sidebar_position: 3
---

# Konfig 

Konfig is a monorepo that stores configurations about operation intentions mainly described by KCL. It provides users with out-of-the-box, highly abstract configuration models. The original starting point of the model library is to improve the efficiency and experience of YAML users.
We hope to simplify the writing of user-side configuration code by abstracting
and encapsulating the model with more complex code into a unified model.

For more details, please refer to [Model Overview](https://KusionStack.io/docs/reference/model/overview)

## Konfig Structure

The overall structure of the configuration library is as follows:

```bash
.
├── Makefile            # use Makefile to encapsulate common commands
├── README.md           # configuration library instructions
├── appops              # application operation and maintenance directory
│   ├── guestbook-frontend
│   ├── http-echo
│   └── nginx-example
├── base                # Kusion Model repository
│   ├── examples        # Kusion Model example code
│   │   ├── monitoring  # monitoring configuration example
│   │   ├── k8s         # Kubernetes resource configuration example
│   │   └── infra       # infrastructure configuration example
│   └── pkg
│       ├── kusion_kubernetes   # Kubernetes low-level model library
│       ├── kusion_models       # core model library
│       ├── kusion_prometheus   # Prometheus low-level model library
│       └── kusion_provider     # infrastructure low-level model library
├── hack                # python scripts
└── kcl.mod             # core library configuration file
```

## Project & Stack
![](/img/docs/user_docs/concepts/project-stack.png)

Project and Stack are logical isolation concepts used to orginize the Konfig.
### Project

Any folder that contains the file `project.yaml` will be regarded as a Project, and the `project.yaml` is used to describe the metadata of this Project like `name` and `tenant`. Projects must have clear business semantics and must belong to a tenant. Users can map an application or an operation scenario to a Project.

### Stack

Like Project, any folder that contains the file `stack.yaml` will be regarded as a Stack and `stack.yaml` is used to describe the metadata of this Stack. Stack is a set of `.k` files that represents the smallest operation unit that can be configured and deployed individually. It tends to represent different stages in the CI/CD process, such as dev, gray, prod, etc.

### Relationship between Project and Stack

A Project contains one or more Stacks, and a Stack must belong to and can only belong to one Project. Users can interpret the meaning of Project and Stack according to their own needs and flexibly organize the Konfig structure. We provide the following example as a best practice according to our experiences:

```bash
appops/nginx-example
├── README.md       # Project readme
├── base            # common configurations for all stacks
│   └── base.k      
├── dev             # dev stack 
│   ├── ci-test     # CI test configs
│   │   ├── settings.yaml       # test data 
│   │   └── stdout.golden.yaml  # expected test result
│   ├── kcl.yaml    # kcl config
│   ├── main.k      
│   └── stack.yaml  # Stack metadata
└── project.yaml    # Project metadata
```

The Project represents an application and Stack represents different environments of this application, such as dev, pre and prod, etc. Common configurations can be stored in a `base` directory under this Project.


