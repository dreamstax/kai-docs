---
title: Getting Started
description: A Kai quickstart.
---
You’ll need a Kubernetes cluster to run against. You can use [KIND](https://sigs.k8s.io/kind) to get a local cluster for testing, or use an existing remote cluster.

## Local installation [WIP]
Clone the repository
```sh 
git clone https://github.com/dreamstax/kai && cd kai
```

Download dependencies, create cluster, install CRDs, and deploy controller
```sh
make quickstart
```

This is an exhaustive build and install of all required dependencies and assumes nothing exists. This is mostly useful for initial repo pulls or starting from scratch.

After completion of the make command, ensure the controller is running in the cluster by checking the pods within the namespace.
```sh
kubectl get pods -n kai-system
```

Deploy example application
```sh
kubectl apply -f examples/simple-pipeline/
```

Wait until resources become ready then port-forward kai-gateway service
```sh
TODO: command
```

In a separate terminal curl the example application

```sh
curl http://localhost:8888/simple-pipeline
```

Clean up
```sh
make clean
```