
# Controller Mesh

KusionStack Controller Mesh is a solution that helps developers managing their controllers/operators better.

## Key Features

1. **Sharding**: Through relevant configurations, Kubernetes single-point deployed operator applications can be flexibly shard deployed.
2. **Canary upgrade**: Depends on sharding, the controller instances can be updated in canary progress instead of updated in one time.
3. **Circuit breaker and rate limiter**: Not only Kubernetes operation requests, but also other external operation requests.
4. **Multicluster routing and sharding**
5. **And more**: Fault injection and Observability (Todo).


## Architecture
<p align="center">
<img width="800" src={require("./../images/mesh-arch-2.png").default}
/></p>

Visit [Installation](./../started/install.md) or [Quick Start](./../started/try.md).

