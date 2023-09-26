
# Controller Mesh

KusionStack Controller Mesh is a solution that helps developers manage their controllers/operators better.

## Key Features

1. **Sharding**: Through relevant configurations, Kubernetes single-point deployed operator applications can be flexibly shard deployed.
2. **Canary upgrade**: Depends on sharding, the controllers can be updated in canary progress instead of one time replace.
3. **Circuit breaker and rate limiter**: Not only Kubernetes operation requests, but also other external operation requests.
4. **Multicluster routing and sharding**
5. **And more**: Fault injection and Observability (Todo).


## Architecture
<p align="center">
<img width="800" src={require("./../images/mesh-arch-2.png").default}
/></p>

Visit [Installation](./../started/install.md) or [Quick Start](./../started/try.md).

