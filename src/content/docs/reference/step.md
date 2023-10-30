---
title: Step
description: Kai Step reference
---
When a pipeline is created each of the steps in the pipeline are treated as individual deployments.

```yaml
apiVersion: core.kai.io/v1alpha1
kind: Step
metadata:
  name: http-echo
spec:
  containers:
  - name: http-echo
    image: "hashicorp/http-echo"
    args: ["-listen=:9001", "-text=hello from step 1"]
    ports:
    - containerPort: 9001
```
For example the previous step results in the following deployment spec

```yaml
spec:
  progressDeadlineSeconds: 60
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      core.kai.io/stepUID: d8f6ed0a-44dd-4353-8243-e5a199e190da
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
    type: RollingUpdate
  template:
    metadata:
      annotations:
        kubectl.kubernetes.io/last-applied-configuration: |
          {"apiVersion":"core.kai.io/v1alpha1","kind":"Step","metadata":{"annotations":{},"name":"http-echo","namespace":"default"},"spec":{"containers":[{"args":["-listen=:9001","-text=hello from version 1"],"image":"hashicorp/http-echo","name":"http-echo","ports":[{"containerPort":9001}]}]}}
      creationTimestamp: null
      labels:
        core.kai.io/step: http-echo
        core.kai.io/stepUID: d8f6ed0a-44dd-4353-8243-e5a199e190da
    spec:
      containers:
      - args:
        - -listen=:9001
        - -text=hello from version 1
        image: hashicorp/http-echo
        imagePullPolicy: Always
        name: http-echo
        ports:
        - containerPort: 9001
          protocol: TCP
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
      dnsPolicy: ClusterFirst
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
```
This means you have access to all of the fields and configuration avaialbe to regular Kubernetes Deployments when configuring your pipline. You can set replicas, resource requests, as you see fit.

Additionally Kai wraps each step with an Autoscaling resource which also enables you to configure autoscaling for each of your steps if you wish. We didn't provide any specific HPA configuration in the example but Kai still creates a default HPA in this case. Here's an example of the HPA spec produced for the http-echo step

```yaml
spec:
  behavior:
    scaleDown:
      policies:
      - periodSeconds: 15
        type: Percent
        value: 100
      selectPolicy: Max
    scaleUp:
      policies:
      - periodSeconds: 15
        type: Pods
        value: 4
      - periodSeconds: 15
        type: Percent
        value: 100
      selectPolicy: Max
      stabilizationWindowSeconds: 0
  maxReplicas: 1
  metrics:
  - resource:
      name: cpu
      target:
        averageUtilization: 80
        type: Utilization
    type: Resource
  minReplicas: 1
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: http-echo-deployment
```
Since Kai allows you to configure steps just as you would ordinary Kubernetes Deployments you can manage the scale and resources of your steps individually and outside the orchestration of your pipeline. Leveraging kai-piper as the orchestrator of your pipeline allows you to focus on deploying and scaling out steps in your pipeline and not on the overall orchestration of it. 
