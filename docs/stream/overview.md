---
sidebar_position: 0
description: 📌 Overview of Stream Chapter
---

# 0) Overview

import { Chapter, Part } from '@site/src/components/Highlight';

:::caution

📌  해당 파트는 <Part>01. Database</Part> 의 DB와 <Part>06. API Serving</Part> 의 API, <Part>07. Kafka</Part> 의 target DB 를 이용합니다.
📌  앞선 3가지 과정을 수행한 결과들을 가지고 해당 파트를 진행해 주세요.  

:::

이번 파트에서는 `**04. Model Deployment**` 에서 소개한 Event-Response 방식을 구현하기 합니다.  
`**07. Kafka**` 에서 띄워진 target DB 와 `**postgres-source-iris_data**` 토픽을 활용해 `**06. API Serving**` 을 통해 추론 결과를 전달 받도록 kafka consumer를 커스터마이징 하여 target DB에 값을 저장합니다.  
또한, 원본 데이터와 예측 결과 값을 실시간 시각화 대시보드인 grafana 를 통해서 Stream serving 이 잘 되고 있는지 모니터링 할 수 있도록 합니다.  
  
이번 장을 통해 완성되는 workflow 는 다음과 같습니다.
