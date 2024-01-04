---
sidebar_position: 3
---

# How Kusion Works

Kusion is the platform engineering engine of [KusionStack](https://github.com/KusionStack). It delivers intentions described with Kusion Models defined in [Catalog](https://github.com/KusionStack/catalog) to Kubernetes, Clouds and On-Prem infrastructures.

<p align="center">
<img src="https://raw.githubusercontent.com/KusionStack/kusion/main/docs/arch.png" width="50%" height="50%"/>
</p>

 It consists of 3 parts: `Operation Engine`, `Runtimes` and `State`, we will describe each of these components below.


## Operation Engine

Operation Engine is the entry point of the Kusion Engine and is responsible for Kusion basic operations like `preview`, `apply`, `destroy`, etc. The main workflow of this part is to parse resources described in the operation intention (Spec), figure out which resource should be modified according to the specified operation, and execute this operation to the real infra resources. During this workflow, Runtimes and State will be involved.

## Runtimes

Runtime is an interface between the actual infrastructure and Kusion. All operations attempting to manipulate an infra resource should be delegated to one Runtime to make this operation affect the actual infrastructure. On the other hand, any infrastructure that implements the Runtime interfaces can be managed by Kusion.

## State
State is a record of an operation's result. It is a mapping between resources managed by Kusion and the actual infra resources. State is often used as a data source for 3-way merge/diff in operations like `apply` and `preview`.

State can be stored in many storage mediums like filesystems, OSS, databases, HTTP servers, etc.

## How Kusion works
Let's get operation `Preview` as an example to demonstrate how the three parts cooperate in an actual operation.

 1. `Operation Engine` parses resources in operation intentions(Spec) and converts them into a DAG
 2. Walk this DAG:
    1. Get the latest `State` from the actual infra by the `Runtime`
    2. Get the last operation `State` from the `State` storage medium
 3. Merge/Diff three states: desired state described in Spec, live state from `Runtime` and prior state from `State` storage medium, and return the diff result to the console.
