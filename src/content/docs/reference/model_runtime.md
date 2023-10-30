---
title: ModelRuntime
description: Kai ModelRuntime reference
---
Similar to KServe, Kai adds support for inference workloads via a ModelRuntime resource. This resource defines the container runtime for a particular model format. You can then leverage this within your Pipeline resources by simply specifying a model format and uri to the model. Kai will handle pulling and mounting the model and exposing the proper endpoint.

Below is an example of a ModelRuntime resource for the Pytorch model format using torchserve.

```yaml
apiVersion: core.kai.io/v1alpha1
kind: ModelRuntime
metadata:
  name: pytorch-runtime
spec:
  supportedModelFormats:
  - pytorch
  containers:
  - name: kai-container
    image: "pytorch/torchserve-kfs:0.7.0"
    args: ["torchserve", "--start", "--model-store=/mnt/models/model-store", "--ts-config=/mnt/models/config/config.properties"]
    ports:
    - containerPort: 8085
```

By applying this resource to the cluster Kai will leverage this runtime definiton for any models that specify the `pytorch` modelFormat.

Below is an exmaple of adding a model as part of an inference step within a pipeline.

```yaml
apiVersion: core.kai.io/v1alpha1
kind: Pipeline
metadata:
  name: image-classifier
spec:
  steps:
  - spec:
      model:
        modelFormat: pytorch
        uri: gs://kfserving-examples/models/torchserve/image_classifier/v1
```
Kai will handle pulling and mounting the model in the container as well as exposing the service to be leveraged within the pipeline as specified by the ModelRuntime
