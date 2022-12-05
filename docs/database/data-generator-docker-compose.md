---
sidebar_position: 6
---

# 6) Data Generator on Docker Compose

## 목표

1. Docker 위에서 데이터를 생성하기 위한 준비로써 `Dockerfile` 을 작성합니다.
2. DB container 와 data generator container 를 함께 띄우기 위한 `docker-compose` 파일을 작성합니다.
3. DB 안에 데이터가 계속해서 삽입되고 있는지 확인합니다.

## 스펙 명세서

1. 이전 장에서 작성한 script 를 build 할 수 있는 `Dockerfile` 을 작성합니다.
    - Base image는 `amd64/python:3.9-slim` 을 사용합니다.
    - Container 에서 psql 을 이용하여 DB에 접근할 수 있도록 `postgresql-client` 를 설치합니다.
2. `docker-compose.yaml` 파일을 작성합니다.
    - Postgres server
        - Service name : `db`
        - Image : `postgres:14.0`
        - Container name : `postgres-server`
        - Environment
            - `POSTGRES_USER` : `myuser`
            - `POSTGRES_PASSWORD` : `mypassword`
            - `POSTGRES_DB` : `mydatabase`
            - `TZ` : `Asia/Seoul`
        - Port : `5432:5432`
    - Data generator server
        - Service name : `data-generator`
        - Image : `Dockerfile`
        - Container name : `data-generator-server`
        - Environment
            - TZ : `Asia/Seoul`
        - Command
            - `create_table.py` 실행
            - `generate_data.py` 실행
    - (**중요**) Postgres server 와 data generator server를 띄울 때 어떤 service 가 먼저 띄워져야하는지 생각해보고, 그 기능을 yaml 파일에 추가합니다.
3. `docker-compose.yaml` 을 실행합니다.
4. `psql` 을 이용하여 DB에 데이터가 계속해서 쌓이고 있는지 확인합니다.
    - Local 에서 확인합니다.
    - Data generator server 에서 확인합니다.

---

## 0. 환경 설정

이번 장에서는 Docker Compose 를 이용해 컨테이너를 띄우는 법에 대해서 실습합니다. 이를 위해서 앞서 1장과 5장에서 시작한 컨테이너를 종료해야 합니다. 

다음 명령어를 통해 종료시킵니다.

```bash
$ docker rm --force postgres-server data-generator
```

## 1. Dockerfile 작성

### 1.1 Dockerfile

`Dockerfile` 은 앞선 장에서 작성한 내용을 사용하겠습니다.

```docker
FROM amd64/python:3.9-slim

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /usr/app

RUN pip install -U pip &&\
    pip install scikit-learn pandas psycopg2-binary

COPY generate_data.py generate_data.py

ENTRYPOINT ["python", "data_generator.py", "--db-host"]
# Change CMD to solve host finding error
CMD ["localhost"]
```

## 2. Docker-compose

DB service 와 data generator service 를 띄우는 `docker-compose` 파일을 작성해보도록 하겠습니다.

`docker-compose` 은 다음과 같이 형태로 구성되어 있습니다.

구성요소는 다음과 같습니다.

```yaml
version: "3"
services:
  
```

- `version` : `docker-compose` 의 버전을 의미합니다. 최신 버전은 [공식 홈페이지](https://docs.docker.com/compose/compose-file/compose-versioning/)에서 확인하실 수 있습니다.
- `services` : `docker-compose` 에 묶일 서비스들을 의미합니다.

### 2.1 DB service 작성

먼저, DB service 를 아래와 같이 yaml 형태로 작성합니다.

```yaml
version: "3"

services:
  postgres-server:
    image: postgres:14.0
    container_name: postgres-server
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
      TZ: Asia/Seoul
    ports:
      - 5432:5432
    restart: unless-stopped
```

- `db` : DB service 의 이름을 지정합니다. 지정한 이름은 띄울 container 의 host 이름이 됩니다.
- `version` : docker-compose 파일에 대한 버전을 지정합니다. 여기서는 `3` 으로 지정하겠습니다.
- `image` : container 에서 사용할 image 를 지정합니다. 여기서는 `postgres:14.0` 을 사용하도록 하겠습니다.
- `environment` : container 에서 사용할 환경 변수를 지정합니다. 여기서는 `POSTGRES_USER` , `POSTGRES_PASSWORD` , `POSTGRES_DB` , `TZ` 을 각각 `myuser` , `mypassword` , `mydatabase` , `Asia/Seoul` 으로 지정하겠습니다.
    - 여기서 `TZ` 은 Time Zone 을 뜻합니다.
- `ports` : host 와 container 의 port 를 설정합니다. 형식은  `host:container` 으로 사용되며, 여기서는 `5432:5432` 로 설정하겠습니다.
- `restart` : container 의 restart policy 를 설정합니다. 자세한 내용은 아래의 링크를 참고해주세요.  
    [Start containers automatically](https://docs.docker.com/config/containers/start-containers-automatically/)
    

### 2.2 Data generator service 작성

다음으로, data generator service 를 아래와 같이 yaml 형태로 작성합니다.

```yaml
  data-generator:
    build:
      context: .
      dockerfile: ./Dockerfile
    container_name: data-generator
    environment:
      TZ: Asia/Seoul
    command: ["postgres-server"]
    depends_on: 
      - postgres-server
```

- `build` : `Dockerfile` 을 build 하기 위해 `Dockerfile` 이 있는 경로를 설정합니다.
    - `context` : `Dockerfile` 이 있는 절대경로 또는 상대경로를 설정합니다.
    - `dockerfile` : `context` 에서 설정한 경로에 있는 `Dockerfile` 의 파일명을 입력합니다.
- `command` : Dockerfile에 작성되어 있는 `CMD` 를 덮어씁니다. 앞선 장에서 DB 의 host 는 컨테이너의 이름으로 주어야 한다는 것을 설명했습니다. 이를 위해서 여기서는 `["postgres-server"]` 로 덮어씁니다.
- `depends_on` : `docker-compose` 로 띄워지는 service 간의 종속성 순서대로 service 를 시작할 때 사용합니다. 여기서는 postgres server 가 먼저 실행되고 난 뒤에 data generator server 를 실행 해야하기 때문에 postgres server 의 service 이름인 `db` 를 입력합니다.

### 2.3 Docker-compose healthcheck 설정

앞서 작성한 docker-compose 파일을 함께 나열하면 아래와 같습니다.

```yaml
version: "3"

services:
  postgres-server:
    image: postgres:14.0
    container_name: postgres-server
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
      TZ: Asia/Seoul
    ports:
      - 5432:5432
    restart: unless-stopped

  data-generator:
    build:
      context: .
      dockerfile: ./Dockerfile
    container_name: data-generator
    environment:
      TZ: Asia/Seoul
    command: ["postgres-server"]
    depends_on: 
      - postgres-server
```

`docker compose up` 명령어를 이용하여 service 들을 띄워보겠습니다.

```bash
$ docker compose up -d
```

하지만 `docker ps` 를 입력해보면 postgres server 만 띄워져있습니다.

```bash
$ docker ps
CONTAINER ID   IMAGE           COMMAND                  CREATED              STATUS              PORTS                    NAMES
8a4a16837f28   postgres:14.0   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:5432->5432/tcp   postgres-server
```

Docker desktop 으로 봐도 동일한 현상입니다.

<div style={{textAlign: 'center'}}>

![Container Networking Connetected](./img/db-5.png)  
[그림 1-5] Docker Desktop
</div>

왜 이럴까요?

이유는 앞서 `depends_on` 으로 service 간의 종속성은 정했지만, 실제로 postgres server 가 띄워진 뒤에 곧바로 data generator server 가 띄워집니다. **postgres server 는 아직 준비가 되어있지 않은데 data generator server 가 띄워져서 DB connection 을 하려다보니 data generator server 가 Exited 되는 문제가 발생한 것입니다.**

따라서 해결방안은 postgres server 가 사용 가능한 상태가 되어있는지 체크를 한 뒤에 data generator server 를 띄워야 합니다.  
이를 해결하기 위한 방법으로 [docker compose healthcheck](https://github.com/peter-evans/docker-compose-healthcheck) 이 있습니다.

간단하게 아래와 같이 yaml 파일에 `healthcheck` 부분과 `condition` 을 추가하면 됩니다.

```yaml
version: "3"

services:
  postgres-server:
    image: postgres:14.0
    container_name: postgres-server
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
      TZ: Asia/Seoul
    ports:
      - 5432:5432
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "pg_isready", "-q", "-U", "myuser", "-d", "mydatabase"]
      interval: 10s
      timeout: 5s
      retries: 5

  data-generator:
    build:
      context: .
      dockerfile: ./Dockerfile
    container_name: data-generator
    environment:
      TZ: Asia/Seoul
    command: ["postgres-server"]
    depends_on:
      postgres-server:
        condition: service_healthy
```

- `test` : test 할 command 를 설정합니다. 여기서는 `pg_isready` 를 이용하여 `["CMD", "pg_isready", "-q", "-U", "myuser", "-d", "mydatabase"]` 를 입력합니다.
- `interval` : health check 간격을 설정합니다. 여기서는 10초로 설정합니다.
- `timeout` : health check 의 timeout 을 설정합니다. 여기서는 5초로 설정합니다.
- `retries` : timeout 의 횟수를 설정합니다. 여기서는 5번으로 설정합니다.
- `condition` : healthcheck 기능을 사용하기 위해 `depends_on` 의 parameter 로 `condition: service_healthy` 를 넣어줍니다. postgres server 의 healthcheck 를 data generator server 에서 적용시키기 위해 `db` 밑에 condition 을 추가하였습니다.

이렇게 설정된 것을 정리해보면, 10초마다 test 를 실행했을 때 5초 이내에 DB 가 ready 상태가 되었는지를 체크할 것이며, 실패 시 5번 재시도한다는 뜻이 됩니다.

이외에 더 자세한 내용은 [Dockerfile reference](https://docs.docker.com/engine/reference/builder/#healthcheck) 을 참고해주시기 바랍니다.

이제 모두 완성된 전체 `docker-compose` 파일을 `docker compose up` 명령어를 이용하여 service 들을 띄웁니다.

```bash
$ docker compose up -d
```

## 3. 데이터 확인

### 3.1 Local 에서 확인

`psql` 을 이용하여 DB 에 접근하고, 계속해서 data 가 삽입되고 있는지 확인합니다.

```bash
$ psql -h localhost -p 5432 -U myuser -d mydatabase
Password for user myuser: 
psql (14.3, server 14.0 (Debian 14.0-1.pgdg110+1))
Type "help" for help.

mydatabase=# select * from iris_data;
 id | sepal_length | sepal_width | petal_length | petal_width | target 
----+--------------+-------------+--------------+-------------+--------
  1 |            6 |         2.9 |          4.5 |         1.5 |      1
  2 |          6.9 |         3.1 |          5.4 |         2.1 |      2
  3 |          5.1 |         3.7 |          1.5 |         0.4 |      0
  4 |          6.3 |         2.7 |          4.9 |         1.8 |      2
  5 |          4.4 |         2.9 |          1.4 |         0.2 |      0
  6 |          4.7 |         3.2 |          1.3 |         0.2 |      0
```

### 3.2 Data generator container 에서 확인

`docker exec` 를 이용하여 data generator container 안으로 접속하고, `psql` 을 이용하여 DB 로 접속합니다. 이 때 local 이 아닌 data generator container 에서 접속해야 하기 때문에 host 를 `localhost` 에서 `db` 로 변경합니다.

```bash
$ docker exec -it data-generator /bin/bash

$ psql -h db -p 5432 -U myuser -d mydatabase
Password for user myuser: 
psql (13.8 (Debian 13.8-0+deb11u1), server 14.0 (Debian 14.0-1.pgdg110+1))
WARNING: psql major version 13, server major version 14.
         Some psql features might not work.
Type "help" for help.

mydatabase=# select * from iris_data;
 id | sepal_length | sepal_width | petal_length | petal_width | target 
----+--------------+-------------+--------------+-------------+--------
  1 |            6 |         2.9 |          4.5 |         1.5 |      1
  2 |          6.9 |         3.1 |          5.4 |         2.1 |      2
  3 |          5.1 |         3.7 |          1.5 |         0.4 |      0
  4 |          6.3 |         2.7 |          4.9 |         1.8 |      2
  5 |          4.4 |         2.9 |          1.4 |         0.2 |      0
  6 |          4.7 |         3.2 |          1.3 |         0.2 |      0
```

### 3.3 docker-compose 종료

Docker compose 를 종료시키기 위해서는 `docker-compose.yaml` 이 있는 폴더에서 `docker compose down` 를 통해 할 수 있습니다.  
다만 다음 챕터들의 원할한 진행을 위해서 종료 후 다시 실행시켜놔야 합니다.
