---
sidebar_position: 1
---
# 1) MLflow Setup
## 목표

1. docker compose 를 이용해 실제 서비스 환경과 비슷한 형태로 mlflow 서버를 띄워봅니다.
2. 서비스 상황을 가정하여 mlflow 의 구성 요소 각각을 이해합니다.

## 스펙 명세서

1. MLflow 의 운영 정보, 모델 결과 등을 저장 할 물리적인 데이터베이스 Postgres 서버 스펙을 정의합니다.
    - `POSTGRES_USER` : `myuser`
    - `POSTGRES_PASSWORD` : `mypassword`
    - `POSTGRES_DB` : `mydatabase`
2. 학습된 모델을 저장 할 물리적인 저장 공간인 MinIO 스펙을 정의 합니다.
    - `MINIO_ROOT_USER` : `mystorage`
    - `MINO_ROOT_PASSWORD` : `mystoragepw`
    - `Port forwarding`
        - api: 9000:9000
        - console: 9001:9001
3. 모델과 모델의 결과등의 정보를 관리할 MLFlow server 를 정의 합니다.
    - 앞서 띄워둔 `Postgres` , `MinIO` 두 가지 서버를 연결 합니다.
    - Dockerfile
        - MLflow 에 관련된 패키지가 설치된 이미지를 생성하기위한 Dockerfile 을 정의합니다.
        - Artifact-store 인 `MinIO` 에 초기 버켓을 생성 하기 위해 `MinIO` Client 도 함께 설치되도록 합니다.
    - docker-compose
        - `MinIO` 의 접속 정보를 `AWS_ACCESS_KEY_ID` , `AWS_SECRET_ACCESS_KEY` 변수를 통해 적절하게 설정합니다.
        - `MinIO` client 를 설치하고, MinIO 의 초기 버켓을 생성하도록 command 를 작성합니다.
        - MLflow server를 띄우는 command 를 작성합니다.
        - `Port forwarding` : 5001:5000
          - `MLflow` 에서는 default 로 5000 포트를 사용합니다.
          - 하지만 **MacOS** 의 경우 5000번 포트로 "AirPlay" 기능을 사용하기 때문에 여기서는 보편적인 적용을 위해 5001번 포트를 사용합니다.
4. 정의된 스펙에 따라 `docker compose` 를 활용해 서비스를 띄웁니다.
    - `localhost:9001` 에 접속하여 MinIO login 페이지가 잘 동작하는지 확인 합니다.
    - `localhost:5000` 에 접속하여 MLflow 페이지가 잘 동작하는지 확인 합니다.
---
<div style={{textAlign: 'center'}}>

![MLflow setup diagram](./img/model-registry-2.png)  
[그림 3-2] MLflow setup diagram
</div>

## 1. Mlflow Backend Store

### 1.1 Backend Store

수치 데이터와 mlflow 서버의 정보들을 체계적으로 관리하기위해 데이터 베이스를 사용합니다. 이를 **Backend store** 라고 합니다. **Backend store** 에는 모델의 학습 결과인 accuracy, f1-score 모델이 학습되면서 생기는 loss, 모델 자체의 정보인 hyperparmameters 등의 수치 데이터들과 run_id, run_name, experiment_name 등의 MLflow 의 meta data 가 저장 됩니다.

이번 챕터에서는 Backend Store 로 `01. Database` 챕터에서 사용한 Postgres를 사용합니다.

### 1.2 Postgres Server docker-compose

Postgres의 스펙을 `docker-compose` 의 `services` 탭 밑에 정의합니다.

- 서비스 이름, 사용자, 비밀번호, 데이터베이스 이름, 시간대를 환경변수를 활용해 설정합니다.

**`docker-compose.yaml`**

```yaml
mlflow-backend-store:
  image: postgres:14.0
  container_name: mlflow-backend-store
  environment:
    POSTGRES_USER: mlflowuser
    POSTGRES_PASSWORD: mlflowpassword
    POSTGRES_DB: mlflow
    TZ: Asia/Seoul
  healthcheck:
    test: ["CMD", "pg_isready", "-q", "-U", "mlflowuser", "-d", "mlflow"]
    interval: 10s
    timeout: 5s
    retries: 5
```

- `image` : Postgres 서버에서 사용할 이미지는 `postgres:14.0` 입니다.
- `environment` :
    - `POSTGRES_USER` : postgresDB 에 접근하기 위한 사용자 이름입니다.
    - `POSTGRES_PASSWORD` : postgresDB 에 접근하기 위한 비밀번호입니다.
    - `POSTGRES_DB` : postgresDB 에 생성 할 기본 데이터베이스 이름입니다.
    - `TZ` : postgresDB 의 시간대를 설정합니다.
- `healthcheck` : postgres 서버가 잘 띄워졌는지 상태를 확인하기 위해 상태를 체크하는 구문을 추가합니다.

## 2. Mlflow Artifact Store

### 2.1 Artifact Store

MLflow 에서는 학습된 모델을 저장하는 Model registry 로 이용하기 위해 스토리지 서버를 사용 할 수 있는데 이를 **Artifact store** 라고 합니다. **Artifact Store** 를 이용하면 기본적인 파일 시스템 보다, 체계적으로 관리 할 수 있으며 외부에 있는 스토리지 서버도 사용 할 수 있다는 장점이 있습니다. 

### 2.2 Why MinIO?
이번 챕터에서는 **Artifact Store** 로 MinIO 서버를 사용하는데 그 이유는 다음과 같습니다.

- [MinIO](https://en.wikipedia.org/wiki/MinIO) 는 S3 를 대체 할 수 있는 오픈 소스 고성능 개체 스토리지 입니다.
- AWS S3 의 API 와도 호환되어 sdk 도 동일하게 사용 할 수 있습니다.
- MLflow 에서는 AWS S3 를 모델을 저장하기 위한 스토리지로 사용하도록 권장하고 있어 이를 대체하기 위해 사용합니다.
- 실습에서 AWS credential 을 통해 MinIO 대신 AWS S3 를 사용하셔도 같은 결과를 얻을 수 있습니다.

### 2.3 MinIO Server docker-compose

MinIO의 스펙을 `docker-compose` 의 `services` 탭 밑에 정의합니다.

- 서비스 이름, 사용자, 비밀번호를 환경변수를 활용해 설정합니다.
- host 와 연결되는 포트를 정의합니다.

**`docker-compose.yaml`**

```yaml
mlflow-artifact-store:
  image: minio/minio
  container_name: mlflow-artifact-store
  ports:
    - 9000:9000
    - 9001:9001
  environment:
    MINIO_ROOT_USER: minio
    MINIO_ROOT_PASSWORD: miniostorage
  command: server /data/minio --console-address :9001
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
    interval: 30s
    timeout: 20s
    retries: 3
```

- `image` : MinIO 서버에서 사용할 이미지는 `minio/minio` 입니다.
- `ports` : host 와 container 의 포트를 설정합니다.
    - MinIO의 API 포트를 9000으로 forwarding 합니다.
    - MinIO의 Console 포트를 9001으로 forwarding 합니다.
- `environment` :
    - `MINIO_ROOT_USER` : MinIO 에 접근하기 위한 사용자 이름입니다.
    - `MINIO_ROOT_PASSWORD` : MinIO 에 접근하기 위한 비밀번호입니다.
- `command` : MinIO 서버를 실행시키는 명령어를 추가합니다. `--console-address` 를 통해 컨테이너의 9001 포트로 MinIO 에 접근 할 수 있도록 주소를 열어줍니다.
- `healthcheck` : MinIO 서버가 잘 띄워졌는지 상태를 확인하기 위해 상태를 체크하는 구문을 추가합니다.

## 3. MLflow server

앞서 만든 **Backend-store** 와 **Artifact-store** 에 연결된 **MLflow-server**를 띄웁니다.  

### 3.1 Dockerfile

MLflow 서버에 필요한 패키지가 설치된 이미지를 build 할 Dockerfile 을 작성합니다.  
서버를 띄울때, MinIO 에 초기 bucket 을 생성하기 위해 MinIO Client 도 함께 설치합니다.

**`Dockerfile`**

```docker
FROM amd64/python:3.9-slim

RUN apt-get update && apt-get install -y \
    git \
    wget \
    && rm -rf /var/lib/apt/lists/*

RUN pip install -U pip &&\
    pip install mlflow psycopg2-binary boto3

RUN cd /tmp && \
    wget https://dl.min.io/client/mc/release/linux-amd64/mc && \
    chmod +x mc && \
    mv mc /usr/bin/mc
```

- `FROM amd64/python:3.9-slim` : Base 이미지를 python 3.9가 포함된 이미지로 설정합니다.
- `RUN apt-get update && apt-get install -y` ~ : `git` , `wget` 을 설치합니다. `git` 은 mlflow server의 내부 동작에, `wget` 은 `MinIO` client를 설치하기 위해 사용됩니다.
- `RUN pip install -U pip &&` ~ : `mlflow` 를 비롯해 postgres, AWS S3 에 관련된 python 패키지를 설치합니다.
- `RUN cd /tmp &&` ~ : 앞서 설치한 `wget` 을 활용하여 `MinIO` client 를 설치합니다.

### 3.2 MLflow Server docker-compose
작성된 `Dockerfile`을 빌드하도록 `docker-compose` 의 `services` 탭 밑에 정의합니다. 
  1. `MinIO` 에 연결하기위한 계정 정보를 환경변수를 활용해 설정합니다.
  2. 모델을 저장할 때 사용 할 `MinIO` 초기 버켓을 생성합니다.
  3. mlflow server를 띄우는 명령어를 작성합니다.
      - `PostgresDB` 에 연결하기 위한 keyword argument 를 추가합니다.
      - `MinIO` 에 연결하기 위한 keyword argument 를 추가합니다.

**`docker-compose.yaml`**
```yaml
mlflow-server:
  build:
    context: .
    dockerfile: ./Dockerfile
  container_name: mlflow-server
  ports:
    - 5001:5000
  environment:
    AWS_ACCESS_KEY_ID: minio
    AWS_SECRET_ACCESS_KEY: miniostorage
    MLFLOW_S3_ENDPOINT_URL: http://mlflow-artifact-store:9000
  command:
    - /bin/sh
    - -c
    - |
      mc config host add mlflowminio http://mlflow-artifact-store:9000 minio miniostorage &&
      mc mb --ignore-existing mlflowminio/mlflow
      mlflow server \
      --backend-store-uri postgresql://mlflowuser:mlflowpassword@mlflow-backend-store/mlflow \
      --default-artifact-root s3://mlflow/ \
      --host 0.0.0.0
  depends_on:
    mlflow-backend-store:
      condition: service_healthy
    mlflow-artifact-store:
      condition: service_healthy
```

- `build` : 앞서 작성한 `Dockerfile` 을 사용하여 이미지를 빌드 하여 사용 합니다.
- `ports` : host 와 container 의 포트를 설정합니다. 
    - 5001:5000 포트를 설정합니다.
- `environment`
    - `AWS_ACCESS_KEY_ID` : AWS S3 의 credential 정보입니다. 이번 경우에는 `MinIO` 의 `MINIO_ROOT_USER` 와 동일합니다.
    - `AWS_SECRET_ACCESS_KEY` : AWS S3 의 credential 정보입니다. 이번 경우에는 `MinIO` 의 `MINIO_ROOT_PASSWORD` 와 동일합니다.
    - `MLFLOW_S3_ENDPOINT_URL` : AWS S3 의 주소를 설정합니다. 이번 경우에는 `MinIO` 의 주소와 같습니다.
- `command` : `MinIO` 초기 버켓을 생성 하고, `mlflow` 서버 실행 명령어를 입력합니다.
    - `mc config` ~ : MinIO client 를 활용해 MinIO 서버에 호스트를 등록합니다.
    - `mc mb` ~ : 등록된 호스트를 통해 초기 버켓을 생성합니다.
    - `mlflow server` : `mlflow` 서버를 동작시킵니다.
    - `--backend-store-uri` 에 명시된 정보를 통해 `PostgresDB` 와 연결합니다.
    - `--default-artifact-root` 에 명시된 버켓을 통해 `MinIO` 의 초기 버켓과 연결합니다.
- `depends_on` : `mlflow` 서버가 띄워지기 전에, `PostgresDB` , `MinIO` 서버를 먼저 띄우도록 합니다.
    - `condition` : 앞선 2가지 서비스의 동작 상태가 체크되면 `mlflow` 서버를 띄웁니다.

## 4. docker compose를 활용해 서비스 띄우기

완성된 `Dockerfile` , `docker-compose.yaml` 을 확인 합니다.

### 4.1 `Dockerfile`

```docker
FROM amd64/python:3.9-slim

RUN apt-get update && apt-get install -y \
    git \
    wget \
    && rm -rf /var/lib/apt/lists/*

RUN pip install -U pip &&\
    pip install boto3==1.26.8 mlflow==1.30.0 psycopg2-binary

RUN cd /tmp && \
    wget https://dl.min.io/client/mc/release/linux-amd64/mc && \
    chmod +x mc && \
    mv mc /usr/bin/mc
```

### 4.2 `docker-compose.yaml`

```yaml
version: "3"

services:
  mlflow-backend-store:
    image: postgres:14.0
    container_name: mlflow-backend-store
    environment:
      POSTGRES_USER: mlflowuser
      POSTGRES_PASSWORD: mlflowpassword
      POSTGRES_DB: mlflow
      TZ: Asia/Seoul
    healthcheck:
      test: ["CMD", "pg_isready", "-q", "-U", "mlflowuser", "-d", "mlflow"]
      interval: 10s
      timeout: 5s
      retries: 5

  mlflow-artifact-store:
    image: minio/minio
    container_name: mlflow-artifact-store
    ports:
      - 9000:9000
      - 9001:9001
    environment:
      MINIO_ROOT_USER: minio
      MINIO_ROOT_PASSWORD: miniostorage
    command: server /data/minio --console-address :9001
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3

  mlflow-server:
    build:
      context: .
      dockerfile: ./Dockerfile
    container_name: mlflow-server
    ports:
      - 5001:5000
    environment:
      AWS_ACCESS_KEY_ID: minio
      AWS_SECRET_ACCESS_KEY: miniostorage
      MLFLOW_S3_ENDPOINT_URL: http://mlflow-artifact-store:9000
    command:
      - /bin/sh
      - -c
      - |
        mc config host add mlflowminio http://mlflow-artifact-store:9000 minio miniostorage &&
        mc mb --ignore-existing mlflowminio/mlflow
        mlflow server \
        --backend-store-uri postgresql://mlflowuser:mlflowpassword@mlflow-backend-store/mlflow \
        --default-artifact-root s3://mlflow/ \
        --host 0.0.0.0
    depends_on:
      mlflow-backend-store:
        condition: service_healthy
      mlflow-artifact-store:
        condition: service_healthy
```
### 4.3 실행

`Dockerfile` , `docker-compose.yaml` 두 파일이 있는 경로에서 아래 명령어를 활용해 정의된 서비스를 백그라운드 프로세스로 띄웁니다.

```bash
$ docker compose up -d
```

- [localhost:5000](http://localhost:5000) 에 접속하여 `MLflow` 서버 동작을 확인합니다.
  <div style={{textAlign: 'center'}}>
  
    ![MLflow ui](./img/model-registry-3.png)
    [그림 3-3] MLflow UI
  </div>
- [localhost:9001](http://localhost:9001) 에 접속하여 `MinIO` 서버 동작을 확인합니다.
  <div style={{textAlign: 'center'}}>

    ![MinIO ui](./img/model-registry-4.png)
    [그림 3-4] MinIO Login 화면
  </div>
  
  `MinIO` 에 로그인할 수 있는 아이디는 위에서 설정한 minio / miniostorage 입니다.    
  해당 정보로 로그인하면 아래의 [그림 3-5] 와 같은 화면이 보입니다.
  <div style={{textAlign: 'center'}}>

    ![MinIO ui](./img/model-registry-5.png)
    [그림 3-5] MinIO 접속 화면
  </div>
