---
sidebar_position: 0
description: 📌 Overview of FastAPI Chapter
---

# 0) Overview
이번 챕터에서는 모델을 서빙하기에 앞서 이에 필요한 API 의 개념에 대해 학습합니다.
실습을 위해서는 Python 언어를 이용해서 API 를 만들 수 있는 웹 프레임워크 FastAPI 를 사용합니다.

이번 챕터에서 구현할 workflow 는 다음과 같습니다.

<div style={{textAlign: 'center'}}>

![FastAPI workflow](./img/fastapi-1.png)
[그림 5-1] FastAPI Workflow

</div>

FastAPI 로 만든 API 서버를 도커를 이용하여 실행하고 client 가 서버에 request 를 보냅니다.
Request 를 받은 API 서버에서는 다시 client 에게 response 를 주게 됩니다.
