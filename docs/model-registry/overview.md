---
sidebar_position: 0
---

# 0) Overview
> **📌  해당 챕터는 `01. Database` 의 DB를 이용합니다.**  
**📌  DB를 띄우지 않은 경우 `01. Database` 을 완료하고 DB가 띄워진 상태에서 진행해주세요.**
 
**`03. Model Registry`** 에서는 **`02. Model development`** 를 통해 만들어진 모델을 저장, 관리 하는 방법을 학습합니다.
앞선 챕터에서 작성한 코드 중에서 `# 3. save model` 부분을 변경하게 되며, 가장 대중적인 오픈소스 중 하나인 MLflow 를 이용합니다.

이번 챕터를 끝내고 나면, 아래의 그림과 같은 모습의 workflow 를 경험하실 수 있습니다.

아래 **그림 3-1**은, [MLflow의 공식 Tracking scenario 4](https://www.mlflow.org/docs/latest/tracking.html#scenario-4-mlflow-with-remote-tracking-server-backend-and-artifact-stores)를 기반으로 작성 되었습니다.

<div style={{textAlign: 'center'}}>

![Model registry Workflow](./img/model-registry-1.png)
[그림 3-1] Model registry Workflow
</div>
