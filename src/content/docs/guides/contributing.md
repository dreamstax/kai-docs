---
title: Contributing
description: How to contribute to Kai.
---

For people interested in contributing to Kai please check out our open issues on GitHub. For bug reports or feature requests please add the appropriate tag to your issue so it can be triaged appropriately. We also strongly encourage members of the community to join the [kai-discord](https://discord.gg/qX4umFFkza) server, where you'll be able to communicate with maintainers and other members about Kai.

## Prerequisites
In order to develop for Kai you'll need the following dependencies
- Go >= 1.20

## Getting Started
The easiest way to get started is by cloning this repo and running make to install and setup all other dependencies

```sh 
git clone https://github.com/dreamstax/kai && cd kai
make quickstart
```
This is an exhaustive build and install of all required dependencies and assumes nothing exists. This is mostly useful for initial repo pulls or starting from scratch. You can see a list of commands that are run within the makefile and perform the ones necessary during development.

After completion of the make command, ensure the controller is running in the cluster by checking the pods within the namespace.
```sh
kubectl get pods -n kai-system
```

## Running locally
Oftentimes when making changes to the controller it's nice to just run the controller locally and not in the cluster. To achieve this run the following command.

```sh
make dev
```
This will build the manifests and install the CRDs into the cluster then run the controller in your current terminal window. For a tighter iteration loop, familiarize yourself with the make targets and just run what you need.


