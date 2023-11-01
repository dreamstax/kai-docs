---
title: Getting Started
description: A Kai quickstart.
sidebar:
  order: 0
---
## Requirements
- Go >= 1.20
- Docker

## Installation
When starting from scratch (you don't have a kubernetes cluster) the quickest way to get up and running with Kai is to clone the repo and run the quickstart using make. This will create a cluster using [kind](https://sigs.k8s.io/kind), build and deploy the controller, and deploy an example pipeline.

Clone the repo and run the quickstart.
```bash
git clone https://github.com/dreamstax/kai && cd kai
make quickstart
```
## Existing Clusters
*note: this section is wip as we do not yet have a first release*

Use `kubectl` to install the CRDs and deploy the controller to your cluster.
```bash
kubectl apply -f {github-release-url}
```
## Usage
Create a new pipeline by defining a Pipeline resource.
```yaml
# pipeline.yaml
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

Then apply this pipeline resource to the cluster.
```bash
kubectl apply -f pipeline.yaml
```
## Executing a Pipeline
*note: this section is wip as we build out [kai-piper](https://github.com/dreamstax/kai-piper)*

Potential steps...
- retrieve pipeline ID (pipeline resource could expose this, also available via kai-piper)
- port-forward kai-piper server (could also be registered on an ingress gateway)
- call `/v1alpha1/pipelineJobs/{job_id}:run`

