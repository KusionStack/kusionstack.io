# KusionStack VS Community Tools

## 1. Terraform

[Terraform](https://learn.hashicorp.com/terraform) 是基础设施代码化领域最成功的案例之一，技术产品简单易用，推广度非常好，拥有庞大的社区生态。Terraform 用户常通过 HCL 编写 IaaS 资源规格，通过 provider 框架接入不同的云厂商，并以此种方式完成对 Kubernetes 的接入支持。Terraform 通过 Terraform Enterprise 提供满足企业级需求的 SaaS 服务。​

首先，Kusion 自身定位与 Terraform 的关键差异在于 Kusion 核心定位解决规模化云原生运维（PaaS 领域）场景的问题，PaaS 场景下**业务逻辑更复杂更易出错**，更多的**自动化场景**，参与**编写人员更多**，对**多租多环境多集群**支持的需求更强烈，这些特点导致 Kusion 在语言设计、工程结构设计、框架设计上与 Terraform 有较大的差异。

<table>
  <tbody>
    <tr>
      <th></th>
      <th align="center">Kusion</th>
      <th align="center">Terraform</th>
    </tr>
    <tr>
      <td>领域语言</td>
      <td align="left">
        <ul>
          <li>静态类型、强校验规则、可测试</li>
          <li>外置类型结构定义，支持继承</li>
          <li>声明式同名配置数据自动合并机制</li>
          <li>代码自动化修改、查询机制</li>
        </ul>
      </td>
      <td align="left">
        <ul>
          <li>HCL 重点为 JSON 动态化、语言化，无类型、无校验能力</li>
          <li>缺少代码复用及团队协同编写支持</li>
          <li>缺少语言级自动化能力支持</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>工程结构</td>
      <td align="left">
        <ul>
          <li>支持面向 PaaS 领域多项目、多环境、多集群的工程结构支持</li>
        </ul>
      </td>
      <td align="center">无</td>
    </tr>
    <tr>
      <td>Kubernetes 支持</td>
      <td align="left">
        <ul>
          <li>根据Kubernetes Declarative,Event,Reconcile的特点构建Workflow，而不是简单的CRUD（开发中）</li>
          <li>100%兼容Kubernetes原生API，包括Patch、Watch等（开发中）</li>
          <li>支持Kubernetes CRD</li>
          <li>支持资源发布顺序声明、变量动态引用</li>
          <li>提供专用的 kusion Kubernetes clients, kube2kcl 等工具</li>
        </ul>
      </td>
      <td align="left">
        <ul>
          <li>通过经典 provider 机制对接，限制了Kubernetes原生接口的能力</li>
          <li>支持多资源顺序声明</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>策略支持</td>
      <td align="left">
        <ul>
          <li>Kusion 原生支持策略定义</li>
        </ul>
      </td>
      <td align="left">
        <ul>
          <li>策略通过 <a href="https://www.hashicorp.com/resources/writing-and-testing-sentinel-policies-for-terraform">sentinel</a> 语言支持，不开源</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

以下示例为 KCL 编写的 Kubernetes Deployment 示例，其中数据定义将在编译时被 v1.Deployment 结构及校验规则校验：

```py
deployment = v1.Deployment {
    metadata.name = "nginx−deployment"
    labels.app = "nginx"
    spec = {
        replicas = 3
        selector.matchLabels.app = "nginx"
        template = {
            metadata.labels.app = "nginx"
            spec.containers = [{
                name = "nginx"
                image = "nginx:1.14.2"
                ports = [{ containerPort = 80 }]
            }]
        }
    }
}
```

相对应的 TF 表示无直接校验能力，代码示例如下：

```Terraform
resource "kubernetes_deployment" "deployment" {
  metadata {
    name = "nginx-deployment"
    labels = {
      "app" = "ngnix"
    }
  }
  spec {
    replicas = 3
    selector {
      match_labels = {
        app = "nginx"
      }
    }
    template {
      metadata {
        labels = {
          app = "nginx"
        }
      }
      spec {
        container {
          image = "nginx:1.14.2"
          name  = "nginx"
          port {
            container_port = 80
          }
        }
      }
    }
  }
}
```

​ Kusion 针对非 Kubernetes 的三方场景（以 IaaS 为主）提供了 provider 框架支持，并兼容 Terraform 格式的存量 providers。通过这样的技术手段，Terraform 用户可以比较简单的使用 Kusion。 ​

最后，Kusion 同时可以使用在云原生策略（Policy as Code）场景，Terraform 并未在开源版做策略支持，在 Terraform Cloud，Terraform Enterprise 中进行了支持。

## 2. Pulumi

[Pulumi](https://www.pulumi.com/) 是近几年快速发展基础设施即代码平台，通过通用编程语言的 SDK 方式配置、描述基础设施，提供了一种便利的调配、更新和管理方式。Pulumi 通过 Pulumi Team，Pulumi Enterprise 提供差异化的企业级 SaaS 服务。 ​

Pulumi 相比 Terraform 最大的区别和特点在于 Pulumi 采用了基于高级编程语言提供专用 SDK 的方式来描述技术设施，支持的语言包括 TypeScript，JavaScript，Python，Go 和 .NET 等，用户可以选择他们熟悉的语言进行配置描述，这降低了上手门槛，同时也让配置编写有了极大的灵活性。配置描述的场景与 Terraform 类似，以单一资源描述为主，在简单的、小规模的场景有快速启动优势。在对接多种云服务方面，Pulumi 兼容 Terraform 的 Provider 生态，支持对 Terraform 存量 providers 的无缝接入。 ​

Pulumi 与 Kusion 的主要差异在于语言选择和云原生支持方面。 ​

通用编程语言通常是多编程范式复合能力的，对于配置编写来说语言表达过强、噪音过大、随意性难以**约束**，对于有一定用户规模的编写场景难以做到统一的、长期的编写范式约束和代码**治理**，其次通用编程语言在编写**稳定**性（类型安全约束、内存管理、校验能力完全依赖通用语言能力）、**安全**性（无法限制系统调用、网络访问等）等方面缺少保障，同时难以支持语言级的**自动化**（修改、查询）以满足企业内大量的自动化功能场景。此外，Pulumi 在策略支持方面较为单薄，这也受限于通用编程语言的选型。 ​

其次，Pulumi 对 Kubernetes 的支持方式与 Terraform 相同，将 Kubernetes 作为一种 IaaS 云服务商，不同与 Kusion 将 Kubernetes 作为一等公民的设计思路。 ​

这两个主要区别导致了 Kusion 在语言设计、工程结构设计、框架设计上与 Pulumi 有较大的差异。 ​

<table>
  <tbody>
    <tr>
      <th></th>
      <th align="center">Kusion</th>
      <th align="center">Pulumi</th>
    </tr>
    <tr>
      <td>领域语言</td>
      <td align="left">
        <ul>
          <li>静态类型、强校验规则、可测试</li>
          <li>外置类型结构定义，支持继承</li>
          <li>声明式同名配置数据自动合并机制</li>
          <li>代码自动化修改、查询机制</li>
          <li>策略定义支持</li>
        </ul>
      </td>
      <td align="left">
        <ul>
          <li>多种高级编程语言</li>
          <li>无语言级别的编程范式约束</li>
          <li>编写能力过强，噪音过大</li>
          <li>稳定性、安全性没有保障</li>
          <li>缺少语言级自动化能力支持</li>
          <li>缺少策略能力支持</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>工程结构</td>
      <td align="left">
        <ul>
          <li>支持面向 PaaS 领域多项目、多环境、多集群的工程结构支持</li>
        </ul>
      </td>
      <td align="center">
        <ul>
          <li>有项目、环境的考虑，但无明确的工程架构设计</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Kubernetes 支持</td>
      <td align="left">
        <ul>
          <li>根据Kubernetes Declarative,Event,Reconcile的特点构建Workflow，而不是简单的CRUD（开发中）</li>
          <li>100%兼容Kubernetes原生API，包括Patch、Watch等（开发中）</li>
          <li>支持Kubernetes CRD</li>
          <li>支持资源发布顺序声明、变量动态引用</li>
          <li>提供专用的 kusion Kubernetes clients, kube2kcl 等工具</li>
        </ul>
      </td>
      <td align="left">
        <ul>
          <li>通过经典 provider 机制对接，限制了Kubernetes原生接口的能力</li>
          <li>支持多资源顺序声明</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
​

## 3. KCL 与其他配置语言的对比

在大规模高度可配置场景下，如何让每个人能**编写**、**测试**、**组织**配置代码成为一个新的问题，从配置系统的发展来看，起初是零散在各业务代码中的 key-value 对配置，随后通过模板语言进行增强，之后把点状的业务系统性的提炼形成完整的可扩展抽象体系，最终发展成高度可配置的语言系统及对应的技术工具生态。但是面对云原生基础设施运维等大规模配置策略场景，多数系统都是围绕 JSON 或 YAML 语言设计或者多种语言、脚本、领域语言的技术拼盘，协同研发、自动化管理与治理困难，容易出错且效率不高。

KCL 旨在通过语言化的技术与统一的编程界面管理大规模配置与策略，通过版本化、可移植、可复制的代码适配多云、多基础设施、多运行时、多环境的运维诉求，提升大规模配置策略场景下的协同运维效率；同时通过语言层机制约束编写范式、防止编写出错，提升稳定性。因此相比于其他配置语言，KCL 针对大规模的配置策略场景进行了增强，下表显示了 KCL 特性与其他配置语言特性的比较结果：

|        | KCL    | GCL   | CUE | Jsonnet | HCL  | Dhall |
| ------ | ------ | ----- | --- | ------- | ---- | ----- |
| 变量     | ✅      | ✅     | ✅   | ✅       | ✅    | ✅     |
| 引用     | ✅      | ✅     | ✅   | ✅       | ✅    | ✅     |
| 数据类型   | ✅      | ✅     | ✅   | ✅       | ✅    | ✅     |
| 算术&逻辑  | ✅      | ✅     | ✅   | ✅       | ✅    | ✅     |
| 循环     | 推导式    | 推导式   | 推导式 | 推导式     | 推导式  | 生成式   |
| 条件     | ✅      | ✅     | ✅   | ✅       | ✅    | ✅     |
| 内置函数   | ✅      | ✅     | ✅   | ✅       | ✅    | ✅     |
| 函数定义   | ✅      | ❌     | ❌   | ✅       | ❌    | ✅     |
| 模块/包导入 | ✅      | ✅     | ✅   | ✅       | ✅    | ✅     |
| 类型检查   | ✅      | ✅     | ✅   | ❌       | ❌    | ✅     |
| 测试     | ✅      | ❌     | ❌   | ✅       | ❌    | ✅     |
| 结构定义   | ✅      | ✅     | ✅   | ✅       | ❌    | ✅     |
| 继承     | schema | tuple | ❌   | object  | data | data  |
| 数据集成   | ✅      | ❌     | ❌   | ✅       | ❌    | ❌     |
| 配置合并   | ✅      | ❌     | ✅   | ✅       | ✅    | ❌     |
| 动态配置   | ✅      | ❌     | ❌   | ✅       | ❌    | ❌     |
| 策略编写   | ✅      | ❌     | ❌   | ❌       | ❌    | ❌     |

可以看出几乎所有配置语言都支持变量、引用、数据类型、算术、逻辑、条件、内置函数和导入等特性，遵循声明性原则。这些语言对函数定义和循环提供最少的支持或不提供支持。 例如，大多数语言只提供一个推导表达式来构造一个列表和一个字典，而不是一个 for/while 语句。 KCL 和其他一些语言一样提供了用于定义抽象配置的数据类型 schema。不同之处在于 KCL 支持 schema 继承，而大多数配置语言是直接基于结构化数据进行继承或合并的。此外，KCL 在**强约束**、**协同编写**、**自动化**、**高性能**和**策略编写**等方面也进行了增强，以更好地方便开发者使用更多的**工程特性**进行**高效稳定的协作**。

* **强约束**：KCL 代码基于用户角色划分并保证语义简单，配置类型和配置数据是分离定义的，允许为变量/属性定义类型。 KCL 常用的基本数据类型包括`bool`、`int`、`float`、`string`、`list` 和 `dict`，KCL 还提供了结构类型、联合类型、字面值类型等。KCL 支持静态编译时类型分析、检查和推断，有助于提高配置代码的健壮性。同时 KCL 支持变量的默认不可变性与声明式校验，满足不同条件的约束。此外 KCL 还支持使用测试工具完成对自身代码的测试，能够很好地检测不同代码片段的运行情况，进行输入输出结果比对，保证了代码的稳定性；
* **协同编写**：在 KCL 中提供了模块化的能力，KCL 的代码文件以包（目录）和模块（文件）的形式进行管理。此外在 KCL 中分别提供了配置定义、配置代换和配置自动合并的能力。通过这样的方式，能够很好地检测处出不同开发人员对同一份配置操作冲突的问题，并且能够极大地实现配置复用，在保证稳定性的情况下能够很好地提升协同效率；
* **自动化**：在 KCL 中提供了很多自动化相关的能力，主要包括工具和多语言 API。 通过统一的模式支持对任意配置键值的索引，从而完成对任意键值的增删改查，方便上层自动化系统集成，提升配置自动处理的效率；
* **高性能**：配合 LLVM 优化器，KCL 支持编译到本地代码和 WASM 代码并高效执行；
* **策略编写**：在 KCL 中支持通过 rule 关键字定义相应的规则，并且支持规则的复用与自由组装，通过编写策略代码，能够帮助开发人员快速实现数据查询过滤等功能。
