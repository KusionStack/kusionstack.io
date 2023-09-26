## Summary

Kubernetes provides a set of default controllers for workload management, like StatefulSet, Deployment, DaemonSet for instances. While user services around pods have difficulty to participate in the operation lifecycle of a pod.

PodOpsLifecycle attempts to provide Kubernetes administrators and developers with finer-grained control the entire lifecycle of a pod. For example, we can develop a controller to do some necessary things in both the pre traffic off and pre traffic on phases to avoid traffic loss.

## Goals

1. Provides extensibility that allows users to control the whole lifecycle of pods using the PodOpsLifecycle mechanism.
2. Provide some concurrency, multi controllers can operate the pod in the same time. For example, when a pod is going to be replaced, other controllers may want to delete it.
3. All the lifecycle phases of a pod can be tracing.

## Proposal

### User Stories

#### Story 1

As a developer that focus on pod traffic, I should remove the endpoint once the label `prepare.podopslifecycle.kusionstack.io/<id>=<time>` added which means traffic to the pod should be turned off, and I should add the endpoint once the label `complete.podopslifecycle.kusionstack.io/<id>=<time>` added which means traffic to the pod should be turned on.

![](https://mermaid.ink/svg/pako:eNqtUkFOAzEM_IqVc1nuq7ISUo9FQnBDe3ETh0ZN4pD1FpWqf8dboJxKJSCnZDIZe5zZG8uOTGsGehkpW1oEfK6Y-twLWuEKC9pS5EJ1ggpWCTYUzAL37PoMuk4MuOq6CW5hGQYBzA5eUewayhdVL4-k05P2CNlKKHRe7tY58CFjDG8Kl8rSqCSXIQZPdmcjNZtxCJwHbXrTBL6Wit4He7bqElcUVYnUEV0SmwfX3cwlJOoAnfuh0YfEWwJZE1B2hYOOyVdOEBkdrDCiTrjOJkKGSifyr7w1F8xZTiWS_KO7P3yDmZlENWFwmrX9VKE36jxRb1rdOvI4RulNnw9KxVH4cZetaaWONDNjcZqPz2ia1mMcFNUUPjF_n8kFDezdR56PsT68A3W7A2Y)

The finalizer can be added and removed automatically if we implement interface ReconcileAdapter provided by resourceconsist controller.

#### Story 2

As a developer that maintain a system that provide pod operations like replace, delete, scale out, and so on, I should add the label `operating.podopslifecycle.kusionstack.io/<id>=<time>` and `operation-type.podopslifecycle.kusionstack.io/<id>=<type>` at the same time when I want to operate a pod, and I should remove the label `operating.podopslifecycle.kusionstack.io/<id>=<time>` and `operation-type.podopslifecycle.kusionstack.io/<id>=<type>` at the same time when the operation is completed. If I want to cancel the operation, I should add the label `undo-operation-type.podopslifecycle.kusionstack.io/<id>=<type>`.

The sequence diagram below describe how to offline a pod.

![](https://mermaid.ink/svg/pako:eNqtUk1LAzEU_CuPnNvtfakLQo-KojfJ5TV524bmy-RtZSn97yZbqSJWPTSnZBhmJsMchAqaRCsyvQ7kFa0MbhI66SWj4pBgRXuyIVKqUMTERpmInuExaOmhnDMD5l1X4RbuTGZAr-ENWW0v0m61BotrslBxZOM3TQw6xGxNT2pUlprdkE3wuaTZNSYslkZ3N0s2jroZLNdp0VUb_C4U_JzHSP9UK8wOkIG3BBkdQdVvTrFL0CnwOX753RenvyxqNLpc1EPfW-Npco6_FPpELuzpOmWlH7Su0ZeYCUfJodFlT4f6FSkKw5EUbblq6nGwLIX0x0LFgcPz6JVoOQ00E0PUpc2P-Ym2R5sLWpb2EsLnm7Qpo7w_bXaa7vEdMZH5Yg)

#### Story 3

As a developer that focus on pod operation observability, I can use the `<id>=<time>` and `<id>=<type>` in the labels to tracing a pod. The `<time>` is a unix nano time, and the `<type>` is a string that describe the operation type, and the `<id>` is a string that used in the whole operation lifecycle.

## Design Details

1. Podopslifecycle mechanism is provided by a mutating webhook server and a controller. The mutating webhook server will chage the labels at the right time, and the controller will set the readinessgate `pod.kusionstack.io/service-ready` to true or false if necessary. The controller will also chage the label at some time.
2. The label `operating.podopslifecycle.kusionstack.io/<id>=<time>` and `operation-type.podopslifecycle.kusionstack.io/<id>=<type>` will be validated by a validating webhook server, they must be added or removed at the same time by the operation controller.
3. Traffic controller should turn the traffic on or off based on label `prepare.podopslifecycle.kusionstack.io/<id>=<time>` and `complete.podopslifecycle.kusionstack.io/<id>=<time>`.
4. Protection finalizer names must have prefix `prot.podopslifecycle.kusionstack.io`. They are used to determine whether the traffic has been completely removed or is fully prepared.
5. The special label `podopslifecycle.kusionstack.io/service-available` indicate a pod is available to serve.
6. We can use the message `<id>=<time>` and `<id>=<type>` in the labels to tracing a pod. The `<time>` is a unix time.

Below we use a sequence diagram to show how to use podopslifecycle mechanism to avoid traffic loss. You can also use this podopslifecycle mechanism to do others things, for example, to prevent tasks to be interrupted when they are need to run for a long time.

![](https://mermaid.ink/svg/pako:eNrNWNuO2zYQ_RVCL20B2cl6N2hqbAwE7csCRbdoCgQI_BCaHNnEUqRKUrtwF_sH-aT8U34hQ1EXy1JsS94AebIu5PDMmTMX-TFimkM0jyz8l4Ni8Iega0PTpVo6mjut8nQFxt9l1DjBREaVI7cZGOqEVuR3rZzRUnbX_K15z6PbzP4pEmBbJqHn9b-GKiu85X_y7gJ8mySCtQ_FNQaYI2a9oj9fXF3Fs8vXsf99Ob36xb9duj64ZLJY-BPn5C3nRIcVaj3NNNeZlRXG6V1ucaN1lN1NhX5xLfjizbUTKSxicr0yLxa02a7VxG0zONEGrlwQ6ojbALE0BeKtTgPiv7QDYsR644hOAsz3QBhVJLcw7DjiNFlDOMYv9wbRjuDlUXtBaXh5vwE1ihiClAD_8vlTzU9mYMI2gCtPt9LAa4uiAXiLch1lug2wIodpY8BmWnF0N1C1ohYwuqp4L3gZcYEESkkMgrHkQbgNbsVNHmAV1oxa-w0KgI_QmOKkrTO8SIX1245aKxC1Se3Iq03xfCfB8T0XSQIGMAG9KVvIcIXMg0m0SZEgdJ_lxq-Q29pnhPywASTOEOEO7wkkNnngqQ9MW8LBeVcVblltvfrNT7bhwZspE7pwDRTfLwmzV6_i2WwWX_x6uVMSDqv-9GAFKZVhcn5vGWysWzAi0NJqYlGQBijKEKxdUwwV2tnfi0TcCwYTv3BLqCUJ7q3KR7dQdh08AWDlXOEXR2Aao6OAISxqtvgYE8VWATeQ6nvoyaREKCrF_4ihuJLbQ5G6-G0Wz16eHimfiJlBObNCDvVZlmwoolkBrgnI6mysoxRUBMNrEpUuXBxrLTsl9DSuK4xItiey0bkUd5ixkEnKPKdoK8bUkODKu920Kxwsw3FOY_NabJsZ3uBKxgC1eZiymrObpNRQ_e7B937sYlhDGMg2MZXfWGLsRucy1MlccT05G3Ol0FbAj8txB9-wtinpyneUw8ItAzKm7e00k30rY5tSRx4j-1IvtKJC1ft7EOxn8hmdlWsFZyvm2Nw2_JBjw9tuXnWU2ZbmeTnR7XNV6IsOj9JFKHt9HFEWy2-S_bzAM_p6fqP8kOqN9J9LZ63UfoZpoRhB284NUmG76jfzg7buOwzMofWPsd0N_-lTc0sEA4fmGusgVr81YPR_HZ4W3JFQut9CTKcZ9u0feDgcgbClD-9lQVnPXDZ9rqGumzitGjGktnWbz3ndoKeZjcm5Q2bO7NcjIhyyuJzODOa1JUqHuh_S2X8e-8h_PGKz0ia9p6KYeD5W6RrFUYplnQoezaPHpSJkGeFhKSyjOV5ySGiOg1i0VE-41P879W6rWDR3Joc4yjOOYS__vqoeZlR90BpviwR4-gr5Y_s5)