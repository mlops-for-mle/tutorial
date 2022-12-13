---
sidebar_position: 0
description: 📌 Overview of Model Registry Chapter
---

# 0) Overview
:::caution

📌  해당 챕터는 `01. Database` 의 DB를 이용합니다.  
📌  DB를 띄우지 않은 경우 `01. Database` 을 완료하고 DB가 띄워진 상태에서 진행해주세요.

:::
 



`03. Model Registry` 에서는 `02. Model development` 를 통해 만들어진 모델을 저장, 관리 하는 방법을 학습합니다.

우선 Mlflow 서버를 구축을 한 뒤, 이어서 [그림 3-2] 와 같이 구축된 mlflow 서버에 저장하는 과정을 진행합니다. 이 때 코드는 앞선 챕터에서 작성한 코드 중에서 `# 3. save model` 부분을 변경합니다.

이렇게 작성된 전체 workflow는 [그림 3-1]과 같습니다.

<div style={{textAlign: 'center'}}>

![Model registry Workflow](./img/model-registry-1.png)
[그림 3-1] Model Registry Workflow
</div>
