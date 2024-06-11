---
id: spec
sidebar_label: Spec
---

# Spec

The Spec represents the operational intentions that you aim to deliver using Kusion. These intentions are expected to contain all components throughout the DevOps lifecycle, including resources (workload, database, load balancer, etc.), dependencies, and policies. The Kusion module generators are responsible for converting all AppConfigurations and environment configurations into the Spec. Once the Spec is generated, the Kusion Engine takes charge of updating the actual infrastructures to match the Spec.

## Purpose

### Single Source of Truth

In Kusion's workflow, the platform engineer builds Kusion modules and provides environment configurations, application developers choose Kusion modules they need and deploy operational intentions to an environment with related environment configurations. They can also input dynamic parameters like the container image when executing the `kusion generate` command. So the final operational intentions include configurations written by application developers, environment configurations and dynamic inputs. Due to this reason, we introduce **Spec** to represent the SSoT(Single Source of Truth) of Kusion. It is the result of `kusion generate` which contains all operational intentions from different sources.

### Consistency

Delivering an application to different environments with identical configurations is a common practice, especially for applications that require scalable distribution. In such cases, an immutable configuration package is helpful. By utilizing the Spec, all configurations and changes are stored in a single file. As the Spec is the input of Kusion, it ensures consistency across different environments whenever you execute Kusion with the same Spec file.

### Rollback and Disaster Recovery

The ability to roll back is crucial in reducing incident duration. Rolling back the system to a previously validated version is much faster compared to attempting to fix it during an outage. We regard a validated Spec as a snapshot of the system and recommend storing the Spec in a version control system like Git. This enables better change management practices and makes it simpler to roll back to previous versions if needed. In case of a failure or outage, having a validated Spec simplifies the rollback process, ensuring that the system can be quickly recovered.
