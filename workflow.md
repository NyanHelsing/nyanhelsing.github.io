# Feature Lifecycle

## Change Lifecycle

On a high level this is how our change process works. There are details intentionally omitted in order to simplify the overview.

```mermaid
stateDiagram-v2
    Triage --> Dev: Start Development
    Development --> Triage: Needs Elaboration
    Development --> Test: Implemented
    Test --> Dev: QA Fail
    Test --> Deploment: QA Pass
    Deployment --> Rollout: Deployed
    Rollout --> Rolled Out: Prod
```
