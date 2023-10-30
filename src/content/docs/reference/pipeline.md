---
title: Pipeline
description: Kai Pipeline reference
---

The highest level resource defined by the kai controller is the Pipeline. The pipeline spec defines one or more steps to be executed within a pipeline. A step is just an extension of the Kubernetes PodSpec and accepts nearly all the same values. If you're familiar with writing Kubernetes Deployments then you'll feel right at home writing Kai pipelines.

Here's an example of an extremely simple pipeline that defines a single step.

```yaml
apiVersion: core.kai.io/v1alpha1
kind: Pipeline
metadata:
  name: http-echo
spec:
  steps:
  - spec:
      containers:
      - name: http-echo
        image: "hashicorp/http-echo"
        args: ["-listen=:9001", "-text=hello from step 1"]
        ports:
        - containerPort: 9001
```
When applying this resource to the cluster the controller will reconcile each of the steps and register the pipeline within kai-piper.

You can then call kai-piper with the name (or id) of the pipeline to execute it.

For more information on how the individual steps are reconciled see the [step reference](/reference/step)
