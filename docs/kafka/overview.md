---
sidebar_position: 0
description: 📌 Overview of Kafka Chapter
---

# 0. Overview

이번 챕터에서는 Model Deployment 챕터에서 설명한 Stream Serving 을 구현하기 위해서는 우선 실시간으로 데이터를 전달할 수 있는 데이터 파이프라인을 구축해야 합니다.

실습에서는 이러한 데이터 파이프라인을 Kafka 를 이용해 구현하며 전체 아키텍처는 [그림7-1]과 같습니다.

<div style={{textAlign: 'center'}}>

![FastAPI workflow](./img/kafka-1.png)
[그림7-1] 실습 아키텍쳐

</div>

실습에 앞서 다음과 같은 가정을 합니다.

1. Source: 외부에서 데이터가 계속해서 쌓이고 있는 DB 서버 
2. Sink: 외부에서 가져온 데이터를 처리한 뒤 쌓이는 내부 DB 서버

여기서 Source 로 사용하는 데이터는 Database 챕터에서 작성한 Postgres 서버를 사용합니다. Kafka 를 이용하여 Postgres 서버에 있는 데이터를 내부 DB 로 전달하는 시스템을 구축해보겠습니다.
