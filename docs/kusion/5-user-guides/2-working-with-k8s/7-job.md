# Schedule a Job

The guides above provide examples on how to configure workloads of the type `wl.Service`, which is typically used for long-running web applications that should "never" go down. Alternatively, you could also schedule another kind of workload profile, namely `wl.Job` which corresponds to a one-off or recurring execution of tasks that run to completion and then stop.

## Prerequisites

Please refer to the [prerequisites](deploy-application#prerequisites) in the guide for scheduling a job.

The example below also requires you to have [initialized the project](deploy-application#initializing) using the `kusion workspace create` and `kusion init` command, which will create a workspace and also generate a [`kcl.mod` file](deploy-application#kclmod) under the stack directory.

## Managing Workspace Configuration

In the first guide in this series, we introduced a step to [initialize a workspace](deploy-application#initializing-workspace-configuration) with an empty configuration. The same empty configuration will still work in this guide, no changes are required there. Alternatively, if you have updated your workspace config in the previous guides, no changes need to be made either.

However, if you (or the platform team) would like to set default values for the workloads to standardize the behavior of applications in the `dev` workspace, you can do so by updating the `~/dev.yaml`:
```yaml
modules:
  service:
    default:
      replicas: 3
      labels:
        label-key: label-value
      annotations:
        annotation-key: annotation-value
```

Please note that the `replicas` in the workspace configuration only works as a default value and will be overridden by the value set in the application configuration.

The workspace configuration need to be updated with the command:
```bash
kusion workspace update dev -f ~/dev.yaml
```

For a full reference of what can be configured in the workspace level, please see the [workspace reference](../../reference/modules/workspace-configs/workload/job).

## Example

To schedule a job with cron expression, update `simple-service/dev/main.k` to the following:

`simple-service/dev/main.k`:
```py
import catalog.models.schema.v1 as ac
import catalog.models.schema.v1.workload as wl
import catalog.models.schema.v1.workload.container as c

helloworld: ac.AppConfiguration {
    workload: wl.Job {
        containers: {
            "busybox": c.Container {
                # The target image
                image: "busybox:1.28"
                # Run the following command as defined
                command: ["/bin/sh", "-c", "echo hello"]
            }
        }
        # Run every minute.
        schedule: "* * * * *"
    }
}
```

The KCL snippet above schedules a job. Alternatively, if you want a one-time job without cron, simply remove the `schedule` from the configuration.

You can find the full example in here in the [konfig repo](https://github.com/KusionStack/konfig/tree/main/example/simple-job).

## Applying

Re-run steps in [Applying](deploy-application#applying) and schedule the job. Your output might look like one of the following:

If you are starting from scratch, all resources are created on the spot:
```
$ kusion apply
 ✔︎  Generating Intent in the Stack dev...                                                                                                                                                                                                     
Stack: dev  ID                                                    Action
* ├─     v1:Namespace:simple-service                               Create
* └─     batch/v1:CronJob:simple-service:simple-service-dev-helloworld  Create


? Do you want to apply these diffs? yes
Start applying diffs ...
 SUCCESS  Create v1:Namespace:simple-service success                                                                                                                                                                                              
 SUCCESS  Create batch/v1:CronJob:simple-service:helloworld-dev-helloworld success                                                                                                                                                                 
Create batch/v1:CronJob:simple-service:simple-service-dev-helloworld success [2/2] ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 100% | 0s
Apply complete! Resources: 2 created, 0 updated, 0 deleted.
```

If you are starting from the last guide which configures an `opsRule`, the output looks like the following which destroys the `Deployment` and `Service` and replace it with a `CronJob`:
```
$ kusion apply
 ✔︎  Generating Intent in the Stack dev...                                                                                                                                                                                                     
Stack: dev  ID                                                               Action
* ├─     v1:Namespace:simple-service                                      UnChanged
* ├─     batch/v1:CronJob:simple-service:simple-service-dev-helloworld     Create
* ├─     apps/v1:Deployment:simple-service:simple-service-dev-helloworld  Delete
* └─     v1:Service:simple-service:simple-service-dev-helloworld-private  Delete


? Do you want to apply these diffs? yes
Start applying diffs ...
 SUCCESS  UnChanged v1:Namespace:simple-service, skip                                                                                                                                                                                         
 SUCCESS  Delete apps/v1:Deployment:simple-service:simple-service-dev-helloworld success                                                                                                                                                      
 SUCCESS  Create batch/v1:CronJob:simple-service:simple-service-dev-helloworld success                                                                                                                                                         
 SUCCESS  Delete v1:Service:simple-service:simple-service-dev-helloworld-private success                                                                                                                                                      
Delete v1:Service:simple-service:simple-service-dev-helloworld-private success [4/4] ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 100% | 0s
Apply complete! Resources: 1 created, 0 updated, 2 deleted.
```

## Validation

We can verify the job has now been scheduled:

```shell
$ kubectl get cronjob -n simple-service
NAME                       SCHEDULE    SUSPEND   ACTIVE   LAST SCHEDULE   AGE
simple-service-dev-helloworld   * * * * *   False     0        <none>          2m18s
```

Verify the job has been triggered after the minute mark since we scheduled it to run every minute:
```shell
$ kubectl get job -n simple-service
NAME                                COMPLETIONS   DURATION   AGE
simple-service-dev-helloworld-28415748   1/1           5s         11s
```
