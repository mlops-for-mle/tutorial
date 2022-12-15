---
sidebar_position: 0
description: 📌 Overview of API Serving Chapter
---

# 0. Overview
import { Chapter, Part } from '@site/src/components/Highlight';


:::caution

📌  해당 파트는 <Part>01. Database</Part> 파트의 DB 와 <Part>03. Model Registry</Part> 파트의 모델을 이용합니다.  
📌  DB를 띄우지 않은 경우 <Part>01. Database</Part> 파트를 완료하고 DB 가 띄워진 상태에서 진행해주세요.  
📌  학습된 모델을 불러올 Model Registry 를 띄우지 않은 경우 <Part>03. Model Registry</Part> 파트를 완료한 상태에서 진행해주세요.

:::

이번 파트에서는 학습한 모델을 <Part>04. Model Deployment</Part> 파트에서 소개한 Request Driven 방식을 통해 사용하는 방법을 구현해보겠습니다. <Part>05. FastAPI</Part> 파트에서 학습한 FastAPI 를 이용해 데이터를 입력받아 모델의 예측값을 반환하는 REST API 를 구현합니다.

이번 파트를 통해 완성되는 workflow 를 그림으로 나타내면 다음과 같습니다.

<div style={{textAlign: 'center'}}>

![basic workflow](./img/api-serving-1.png)
[그림 6-1] Workflow
</div>
