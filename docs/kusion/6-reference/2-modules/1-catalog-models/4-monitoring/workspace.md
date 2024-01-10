# monitoring

## Schema Prometheus

`monitoring` can be used to define workspace-level monitoring configurations

### Attributes

|Name and Description|Type|Default Value|Required|
|--------------------|----|-------------|--------|
|**interval**<br />The time interval which Prometheus scrapes metrics data. Only applicable when operator mode is set to true.<br />When operator mode is set to false, the scraping interval can only be set in the scraping job configuration, which kusion does not have permission to manage directly.|str|Prometheus global scraping interval, which should be 1m if not explicitly set|optional|
|**timeout**<br />The timeout when Prometheus scrapes metrics data. Only applicable when operator mode is set to true.<br />When operator mode is set to false, the scraping timeout can only be set in the scraping job configuration, which kusion does not have permission to manage directly.|str|Prometheus global scraping timeout, which should be 10s if not explicitly set|optional|
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