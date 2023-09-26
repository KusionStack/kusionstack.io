---
sidebar_position: 2
---
## Summary

Kubernetes provides a set of default controllers for workload management, like StatefulSet, Deployment, DaemonSet for instances. While user services outside Kubernetes have difficulty to participate in the operation lifecycle of a pod.

PodOpsLifecycle attempts to provide Kubernetes administrators and developers with finer-grained control the entire lifecycle of a pod. For example, we can develop a controller to do some necessary things in both the PreCheck and PostCheck phases to avoid traffic loss.

## Goals

1. Provides extensibility that allows users to control the whole lifecycle of pods using the PodOpsLifecycle mechanism.
2. Provide some concurrency, multi controllers can operate the pod in the same time. For example, when a pod is going to be updated, other controllers may want to delete it.
3. All the lifecycle phases of a pod can be traced.

## Proposal

### User Stories

#### Story 1

As a developer that focuses on pod traffic, I should remove the endpoint once the readiness gate `pod.kusionstack.io/service-ready` set to false which means traffic to the pod should be turned off, and I should add the endpoint once the readiness gate `pod.kusionstack.io/service-ready` set to false and pod is ready which means traffic to the pod should be turned on.

![](https://mermaid.ink/svg/pako:eNqtksFqwzAMhl9F-Jy29zACgx43GO1t-KLaSmuaWJ6tZJTSd5-SbRkb9DafbPmX_P2WrsaxJ1ObQm8DRUfbgMeMvY1W0Aln2NJIHSfKUyhhluBCwijwwt5G0LUoYNU0U7iGp1AEMHp4R3EnSN9SvZxFS0oNO0IfIpUCRxSapOvzUALHogDndeBNoTwGR6usygsUEhCGFrtCd9_f9TwSyImAok8cFLfN3EPH6OGAHarT_G9IoYDkgaqHQ940s21NAcfRB9Gsud6iusv86P1vYnX5h9dUpqfcY_DasetUyRpN6cmaWreeWhw6scbGm0pxEN5fojP1TGeG5NXOV4NNPf9gZbSXr8w_Z1Jozs-fUzEPx-0DO3m-sA)

The finalizer can be added and removed automatically if we implement interface ReconcileAdapter provided by resourceconsist controller.

#### Story 2

1. As a developer that maintain a system that provide pod operations like update and scale, I should add the label `operating.podopslifecycle.kusionstack.io/<id>=<time>` and `operation-type.podopslifecycle.kusionstack.io/<id>=<type>` at the same time when I want to operate a pod.
2. If the operation is completed I should remove the label `operating.podopslifecycle.kusionstack.io/<id>=<time>` and `operation-type.podopslifecycle.kusionstack.io/<id>=<type>` at the same time when.
3. If I want to cancel the operation, I need to add the label `undo-operation-type.podopslifecycle.kusionstack.io/<id>=<type>`.

The sequence diagram below describes how to update a pod.

![](https://mermaid.ink/svg/pako:eNqtUk1LAzEU_CuPnLfb-1IXhB4VRPEiubwmr21ovkzeVpbS_26ylSpi1UNzSoZhZjLMQaigSXQi0-tAXtHS4Cahk14yKg4JlrQnGyKlCkVMbJSJ6BkegpYeyjkzYNb3Fe7gzmQG9BrekNX2Iu1Wa7C4IgsVRzZ-08agQ8zWrEmNylK7G7IJPpc0u9aE-cLo_mbBxlHfwGKV5n21we9Cwc94jPRPtcLsARl4S5DREVT99hS7BJ0Cn-OX331x-suiRqPLRT1HXTQm4_hLn4_kwp6u01X6QesadYlGOEoOjS5zOtSvSFEYjqToylXTGgfLUkh_LFQcODyNXomO00CNGKYiPtYnujXaXNAytJcQPt-kTdnk_Wmy03KP7zEC-QI)

#### Story 3

As a developer that cares about pod operation observability, I can use the `<id>=<time>` and `<id>=<type>` in the labels to tracing a pod. The `<time>` is a unix nano time, and the `<type>` is a string that describe the operation type, and the `<id>` is a string that used in the whole operation lifecycle.

## Design Details

1. Podopslifecycle mechanism is provided by a mutating webhook server and a controller. The mutating webhook server will chage the labels at the right time, and the controller will set the readinessgate `pod.kusionstack.io/service-ready` to true or false if necessary. The controller will also chage the label at some time.
2. The label `operating.podopslifecycle.kusionstack.io/<id>=<time>` and `operation-type.podopslifecycle.kusionstack.io/<id>=<type>` will be validated by a validating webhook server, they must be added or removed at the same time by the operation controller.
3. Traffic controller should turn the traffic on or off based on the readiness gate `pod.kusionstack.io/service-ready` and pod condition `Ready`.
4. Protection finalizer names must have prefix `prot.podopslifecycle.kusionstack.io`. They are used to determine whether the traffic has been completely removed or is fully prepared.
5. The special label `podopslifecycle.kusionstack.io/service-available` indicate a pod is available to serve.
6. We can use the message `<id>=<time>` and `<id>=<type>` in the labels to tracing a pod. The `<time>` is a unix time.

Below we use a sequence diagram to show how to use podopslifecycle mechanism to avoid traffic loss. You can also use this podopslifecycle mechanism to do others things, for example, to prevent tasks to be interrupted when they are need to run for a long time.

![](https://mermaid.ink/svg/pako:eNrNWF2O0zAQvoqVF0BqC1sWAdVSCcELErAIkJBQH3DtSWutYwfb2VVB3IAjcSeuwDhOmqQJbZMuEk-brsfj8fd985N8j5jmEM0iC18zUAxeCroyNFmohaOZ0ypLlmD8r5QaJ5hIqXLkMgVDndCKvNDKGS1l2-ad5h3_ukztaxED2zAJHcsfDVVWeM_vs7YBrsaxYM1D0cYAc8SslvTu2fn5aPrwycj_fTA5v-dXF64rXDKez_2JM_Kcc6KDhVpNUs11amUZ4-Qqs7jROsquJkLfvxB8_uzCiQTmI3KxNPfntNqu1dhtUjjSB1rOCXXErYFYmgDxXich4rfaATFitXZExyHMT0AYVSSz0O844jRZQTjGm3uH6Efw4qgdUipcPq1BDQKGICTAf__6ucUnNTBma0DL471U4TVFUQV4iXId5LoZYAkO08aATbXieN0A1ZJaQHZVvi54wbhAAKUkBoOx5Ea4NW7FTT7AktaUWvsXCIAP0JjipKkzfEiE9dsOessjaoLaklcT4lktwXGdizgGA5iA3pXNZbhE5MHE2iQIEF6fZcZbyM32zhjyzRoQOEOE278ngFjlgYc-IG0JB-evqnDLcuPVb-7YCgfvpkjo_Gqg-G5JmD56NJpOp6Ozxw9rJWG_6o8nK0ipoMn5vQXZWLdgANHSamJRkAYoyhCsJSuKXKGj3c2IxLVgMPaWG0ItiXFzWT_alXLnhn39IxM-rPyMEeEYpEamFDB0Qc0GycOksSX5LhyR6GvoSK1YKCrFN4wpf5KbfdSdPZ2Opg-Op85nZmpQ3yzXx_YsS9YUo1nCNjLeiLZKL-hfpKh04eFQr6nVVDhKWWWMiLgHshK-FFeYwpBKyjym6AtpAQmu-FXPwzodp3Q6L86mm_4dr0AMUEf7Idti9iouNLRdu_HDALY1LCoMZBOY8t5Yc-xaZzIUzkxxPT455lKhDcIPy7EWX78-KunSt5j9wi0IGdIHa91l18vQLtWSx8BG1RlaXlO3-zsi2M3kE1ot1wpOVsyhQa7_IYemuXpetZTZlOZpOdFufCX1ectH6WIoO40do8zNX8W7eYFndA0BlfJDqlfSvy2dNVL7FsaHfCZtXq6XCptVvxootHX_YIIOw84Q3236jx-jGyLoOUVvY-2F6t8GjO7XxePIHRhK--WI6STFvn0r0-J_NSw6kyFcyrPGK3LJ-9LGr9deonNQOya3yW2Nfe3UalSRPtWv3Z5O6xcd7W5IVu5zc2JHH6DSkOfF_GbAU6506Awh4f0btWf-ywGfpbroNRX5TPSlTOhoFCVY-Kng0Sz6vlCELCI8LIFFNMNHDjHNcFSLFuoHmvoPWh82ikWzXHpRlnKkvfjiFc3Cy02UUvVZ6-o3oG61eRM-k-Vfy378AVORFAs)