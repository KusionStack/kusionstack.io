---
id: overview
sidebar_label: Overview
---
# Overview

KusionStack presets application configuration models described by KCL, where the model is called **Kusion Model**. The GitHub repository [KusionStack/catalog](https://github.com/KusionStack/catalog) is used to store these models, which is known as **Kusion Model Library**.

The original intention of designing Kusion Model is to enhance the efficiency and improve the experience of YAML users. Through the unified application model defined by code, abstract and encapsulate complex configuration items, omit repetitive and derivable configurations, and supplement with necessary verification logic. Only the necessary attributes get exposed, users get an out-of-the-box, easy-to-understand configuration interface, which reduces the difficulty and improves the reliability of the configuration work.

Kusion Model Library currently provides the Kusion Model `AppConfiguration`. The design of `AppConfiguration` is developer-centric, based on Ant Group's decades of practice in building and managing hyperscale IDP (Internal Developer Platform), and the best practice of community. `AppConfiguration` describes the full lifecycle of an application.

A simple example of using `AppConfiguration` to describe an application is as follows:

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