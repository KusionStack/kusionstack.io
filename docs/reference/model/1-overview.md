---
id: overview
sidebar_label: Overview
---
# 总览

KusionStack 预置了使用 KCL 描述的应用配置模型，这些模型被称为 **Kusion 模型**，而用于存储这些模型的仓库是 [KusionStack/catalog](https://github.com/KusionStack/catalog)，又被称为 **Kusion 模型库**。

Kusion 模型设计的初衷是提升和改善 YAML 用户的效率和体验。通过代码将繁杂的配置项抽象、封装到统一的模型中，省略重复的、可推导的配置，暴露必要的属性，并辅以必要的校验逻辑；提供给用户开箱即用、易于理解的配置界面，降低用户配置的难度，提高配置的可靠性。

Kusion 模型库目前提供了 AppConfiguration 这一 Kusion 模型。AppConfiguration 模型的设计以开发者为中心，基于蚂蚁集团数十年搭建、管理超大规模 IDP（内部开发者平台）的经验，并结合社区最佳实践；对应用的全生命周期进行了描述。

使用 AppConfiguration 描述应用配置的一个简单示例如下：

```bash
wordpress: ac.AppConfiguration {
    workload: wl.Service {
        containers: {
            "wordpress": c.Container {
                image: "wordpress:latest"
                env: {
                    "WORDPRESS_DB_HOST": "secret://wordpress-db/hostAddress"
                    "WORDPRESS_DB_PASSWORD": "secret://wordpress-db/password"
                }
                resources: {
                    "cpu": "1"
                    "memory": "2Gi"
                }
            }
        }
        replicas: 2
        ports: [
            n.Port {
                port: 80
                public: True
            }
        ]
    }
    
    database: db.Database {
        type: "alicloud"
        engine: "MySQL"
        version: "5.7"
        size: 20
        instanceType: "mysql.n2.serverless.1c"
        category: "serverless_basic"
    }
}

```
