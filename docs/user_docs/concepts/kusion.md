---
sidebar_position: 4
---

# Kusion 

Kusion engine is to compile and deliver intents in Konfig to hybrid runtime on multi-cloud with less complexity and a consistent experience.

![](/img/docs/user_docs/intro/kusion-engine.png)

 It consists of 3 parts: `Operation Engine`, `Runtimes` and `State`, we will describe each of these components below.


## Operation Engine

Operation Engine is the entry point of the whole Kusion Engine and is responsible for Kusion basic operations like Preview, Apply, Destroy, etc. The main workflow of this part is to parse resources described in Konfig, figure out which resource should be modified according to the specified operation type, and execute this operation to the real infra resources. During this workflow, Runtimes and State will be involved.

## Runtimes

Runtime is an interface between the actual infrastructure and Kusion. All operations attempting to manipulate an infra resource should be delegated to one Runtime to make this operation affect the actual infrastructure. On the other hand, any runtime that implements this interface can be manipulated by Kusion.

## State
State is a record of an operation's result. It is a mapping between resources in Konfig and the actual infra resource. State is often used as a data source for 3-way merge/diff in operations like Apply or Preview.

State can be stored in many storage mediums like filesystems, OSS, HTTP servers, etc.

## How Kusion works
Let's get operation `Preview` as an example to demonstrate how the three parts cooperate in an actual operation.

 1. `Operation Engine` parses resources in Konfig and converts them into a DAG
 2. Walk this DAG:
    1. Get the latest `State` from the actual infra by the `Runtime`
    2. Get the last operation `State` from the `State` storage medium
 3. Merge/Diff three states: desired state described in Konfig, live state from `Runtime` and prior state from `State` storage medium, and return the diff result to the console