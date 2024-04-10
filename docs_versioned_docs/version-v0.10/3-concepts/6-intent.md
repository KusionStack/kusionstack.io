---
id: intent
sidebar_label: Intent
---

# Intent

The Intent represents the operational intentions that you aim to deliver using Kusion. These intentions are expected to contain all components throughout the software development lifecycle (SDLC), including resources (workload, database, load balancer, etc.), dependencies, and policies. The Kusion module generators are responsible for converting all AppConfigurations and environment configurations into the Intent. Once the Intent is generated, the Kusion Engine takes charge of updating the actual infrastructures to match the Intent.

## Purpose

### Single Source of Truth

In Kusion's workflow, the platform engineer builds Kusion modules and provides environment configurations, application developers choose Kusion modules they need and deploy operational intentions to an environment with related environment configurations. They can also input dynamic parameters like the container image when executing the `kusion build` command. So the final operational intentions include configurations written by application developers, environment configurations and dynamic inputs. Due to this reason, we introduce **Intent** to represent the SSoT(Single Source of Truth) of Kusion. It is the result of `kusion build` which contains all operational intentions from different sources.

### Consistency

Delivering an application to different environments with identical configurations is a common practice, especially for applications that require scalable distribution. In such cases, an immutable configuration package is helpful. By utilizing the Intent, all configurations and changes are stored in a single file. As the Intent is the input of Kusion, it ensures consistency across different environments whenever you execute Kusion with the same Intent file.

### Rollback and Disaster Recovery

The ability to roll back is crucial in reducing incident duration. Rolling back the system to a previously validated version is much faster compared to attempting to fix it during an outage. We regard a validated Intent as a snapshot of the system and recommend storing the Intent in a version control system like Git. This enables better change management practices and makes it simpler to roll back to previous versions if needed. In case of a failure or outage, having a validated Intent simplifies the rollback process, ensuring that the system can be quickly recovered.