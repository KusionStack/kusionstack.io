# monitoring

`monitoring` can be used to define workspace-level monitoring configurations.

## Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**operatorMode**<br />Whether the Prometheus instance installed in the cluster runs as a Kubernetes operator or not. This determines the different kinds of resources Kusion manages.|true \| false|false|optional|
|**monitorType**<br />The kind of monitor to create. It only applies when operatorMode is set to True.|"Service" \| "Pod"|"Service"|optional|
|**interval**<br />The time interval which Prometheus scrapes metrics data. Only applicable when operator mode is set to true.<br />When operator mode is set to false, the scraping interval can only be set in the scraping job configuration, which kusion does not have permission to manage directly.|str|30s|optional|
|**timeout**<br />The timeout when Prometheus scrapes metrics data. Only applicable when operator mode is set to true.<br />When operator mode is set to false, the scraping timeout can only be set in the scraping job configuration, which kusion does not have permission to manage directly.|str|15s|optional|
|**scheme**<br />The scheme to scrape metrics from. Possible values are http and https.|"http" \| "https"|http|optional|

### Examples
```yaml
modules:
  monitoring:
    default:
      operatorMode: True
      monitorType: Pod
      scheme: http
      interval: 30s
      timeout: 15s
    low_frequency:
      operatorMode: False
      interval: 2m
      timeout: 1m
      projectSelector:
      - foo
      - bar
    high_frequency:
      monitorType: Service
      interval: 10s
      timeout: 5s
      projectSelector:
      - helloworld
      - wordpress
      - prometheus-sample-app
```