# Feature Lifecycle

## Change Lifecycle

On a high level this is how our change process works. There are details intentionally omitted in order to simplify the overview.

```mermaid
graph LR;
    Tri(Triage)
    Dev(Development)
    Test(Testing)
    Deploy(Deployment)
    Roll(Rollout)
    Prod(Productization)
    Tri-->|Start Development|Dev
    Dev-->|Needs Elaboration|Tri
    Dev-->|Implemented|Test
    Test-->|QA Fail|Dev
    Test-->|QA Pass|Deploy
    Deploy-->|Deployed|Roll
    Roll-->|Rolled Out|Prod|
```

```mermaid
graph TD;
    New(New)
    NeedsElaboration(Needs Elaboration)
    Cancelled(Cancelled)
    New-->|Cancel|Cancelled
    New-->|Needs Elaboration|NeedsElaboration
    NeedsElaboration-->|Ready for Dev|
    DevReady-->|Begin Development|
```

