---
sidebar_position: 5
---

# 5) Data Generator on Docker

## 목표

1. Docker 위에서 데이터를 생성하기 위한 준비로써 `Dockerfile` 을 작성합니다.
2. DB 안에 데이터가 계속해서 삽입되고 있는지 확인합니다.

## 스펙 명세서

1. 이전 장에서 작성한 script 를 build 할 수 있는 `Dockerfile` 을 작성합니다.
    - Base image 는 `amd64/python:3.9-slim` 을 사용합니다.
    - Container 에서 psql 을 이용하여 DB 에 접근할 수 있도록 `postgresql-client` 를 설치합니다.
2. `psql` 을 이용하여 DB 에 데이터가 계속해서 쌓이고 있는지 확인합니다.
    - Local 에서 확인합니다.
    - Data generator server 에서 확인합니다.

---

## 1. Data Generator

### 1.1 `data_generator.py`

앞선 장에서 작성한 코드들을 모아서 데이터를 생성하는 `data_generator.py` 를 작성합니다.

```python
# data_generator.py
import time
from argparse import ArgumentParser

import pandas as pd
import psycopg2
from sklearn.datasets import load_iris


def get_data():
    X, y = load_iris(return_X_y=True, as_frame=True)
    df = pd.concat([X, y], axis="columns")
    rename_rule = {
        "sepal length (cm)": "sepal_length",
        "sepal width (cm)": "sepal_width",
        "petal length (cm)": "petal_length",
        "petal width (cm)": "petal_width",
    }
    df = df.rename(columns=rename_rule)
    return df


def create_table(db_connect):
    create_table_query = """
    CREATE TABLE IF NOT EXISTS iris_data (
        id SERIAL PRIMARY KEY,
        sepal_length float8,
        sepal_width float8,
        petal_length float8,
        petal_width float8,
        target int
    );"""
    print(create_table_query)
    with db_connect.cursor() as cur:
        cur.execute(create_table_query)
        db_connect.commit()


def insert_data(db_connect, data):
    insert_row_query = f"""
    INSERT INTO iris_data
        (sepal_length, sepal_width, petal_length, petal_width, target)
        VALUES (
            {data.sepal_length},
            {data.sepal_width},
            {data.petal_length},
            {data.petal_width},
            {data.target}
        );
    """
    print(insert_row_query)
    with db_connect.cursor() as cur:
        cur.execute(insert_row_query)
        db_connect.commit()


def generate_data(db_connect, df):
    while True:
        insert_data(db_connect, df.sample(1).squeeze())
        time.sleep(5)


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("--db-host", dest="db_host", type=str, default="localhost")
    args = parser.parse_args()

    db_connect = psycopg2.connect(
        user="myuser",
        password="mypassword",
        host=args.db_host,
        port=5432,
        database="mydatabase",
    )
    create_table(db_connect)
    df = get_data()
    generate_data(db_connect, df)
```

스크립트를 실행하면 다음과 같은 순서로 실행됩니다.

1. DB 에 연결하는 connector 생성  
    이 때 connector 를 생성할 때 위에서 작성한 내용과 다른점은 `host` 를 받는 부분을 `ArgumentParser` 로 변경했습니다.  
    ```python
    parser = ArgumentParser()
    parser.add_argument("--db-host", dest="db_host", type=str, default="localhost")
    args = parser.parse_args()
    ```  
    이 내용과 관련된 설명은 이후에 하도록 하겠습니다.
2. 연결된 DB 에 `iris_data` 테이블을 생성
3. iris 데이터를 불러옴
4. 불러온 데이터 중 하나를 DB 에 삽입

### 1.2 Dockerfile 작성

#### 1.2.1 Dockerfile

`Dockerfile` 을 이용하여 위에서 작성한 스크립트를 실행할 수 있는 이미지를 만들어보겠습니다. 

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

- `FROM` : Image 를 만들 때 base 가 되는 이미지를 지정합니다. 여기서는 `amd64/python:3.9-slim` 을 사용하도록 하겠습니다.
- `RUN` : Image 를 만들 때 실행할 코드를 지정합니다. 첫번째 `RUN` 에서는 해당 Dockerfile 을 이용하여 data generator server 를 띄울 때, 컨테이너 안에 접근하여 `psql`을 사용하기 위해 `postgresql-client` 을 설치합니다. 두번째 `RUN` 에서는 컨테이너에서 python 스크립트를 실행할 때 필요한 `scikit-learn`, `pandas`, `psycopg2-binary`를 설치합니다.
- `WORKDIR` : 작업 directory 를 지정합니다. 해당 directory 가 없으면 새로 생성합니다. 작업 directory 를 지정하면 그 이후 명령어는 해당 directory 를 기준으로 동작합니다.
- `COPY` : 파일이나 폴더를 이미지에 복사합니다. 상대 경로를 사용할 경우, `WORKDIR`로 지정한 directory 를 기준으로 복사합니다. 여기서는 컨테이너에서 실행시키기 위해 앞서 작성한 `generate_data.py`를 복사합니다.
- `ENTRYPOINT` : 컨테이너가 실행될 때 시작할 프로세스를 입력합니다.
- `CMD` : 컨테이너가 실행될 때 `ENTRYPOINT` 에 전달할 argument를 입력합니다.

#### 1.2.2 Build

이제 위에서 작성한 `Dockerfile` 을 이용해 이미지를 build 해보겠습니다.

이미지를 build 하기 위해서는 아래 규칙을 따르면 됩니다. 관련해 자세한 내용은 [공식 홈페이지](https://docs.docker.com/engine/reference/commandline/build/)를 참고해주세요.

```bash
$ docker build [OPTIONS] PATH | URL | -
```

이미지 이름은 `ch-1-data-generator` 로 하겠습니다.

```bash
$ docker build . -t ch-1-data-generator
```

이미지가 생성되었는지 확인해 보겠습니다.

```bash
$ docker image ls
```

위 명령어를 실행하면 아래와 같이 `ch-1-data-generator` 가 있음을 확인할 수 있습니다.

```bash
$ docker image ls
REPOSITORY                  TAG       IMAGE ID       CREATED         SIZE
ch-1-data-generator         latest    96d8fa213c74   5 hours ago     635MB
```

#### 1.2.3 Run

이제 build 한 이미지를 실행해 보겠습니다.

```bash
$ docker run ch-1-data-generator
```

실행할 경우 아래와 같이 에러 메세지와 함께 컨테이너가 종료됩니다.

```bash
$ docker run ch-1-data-generator
Traceback (most recent call last):
  File "/usr/app/create_table.py", line 26, in <module>
    db_connect = psycopg2.connect(
  File "/usr/local/lib/python3.9/site-packages/psycopg2/__init__.py", line 122, in connect
    conn = _connect(dsn, connection_factory=connection_factory, **kwasync)
psycopg2.OperationalError: connection to server at "localhost" (127.0.0.1), port 5432 failed: Connection refused
        Is the server running on that host and accepting TCP/IP connections?
connection to server at "localhost" (::1), port 5432 failed: Cannot assign requested address
        Is the server running on that host and accepting TCP/IP connections?
```

해당 에러는 `localhost:5432` 가 응답하지 않고 있다는 에러입니다.

해당 메세지를 읽고 나면 제일 처음 확인해 볼 부분은 DB 컨테이너가 실행되지 않고 있는지 확인합니다.

```bash
$ docker ps
```

명령어를 실행해보면 현재 DB 컨테이너가 실행중임을 확인할 수 있습니다.

```bash
$ docker ps
CONTAINER ID   IMAGE           COMMAND                  CREATED         STATUS         PORTS                    NAMES
26eeee50afc6   postgres:14.0   "docker-entrypoint.s…"   3 seconds ago   Up 2 seconds   0.0.0.0:5432->5432/tcp   postres-server
```

로컬 파이썬 스크립트를 실행시키면 정상적으로 실행이됩니다.

그럼 왜 `ch-1-data-generator` 를 실행시키는 컨테이너에서는 접근할 수 없다고 나올까요? 이를 위해서는 Docker 의 네트워크에 대해서 이해할 필요가 있습니다.

## 2. Docker Network

### 2.1 Localhost

로컬에서는 어떻게 DB 컨테이너에 접근이 가능했을까요?

<div style={{textAlign: 'center'}}>

![Localhost Networking](./img/db-2.png)  
[그림 1-2] Localhost Networking
</div>

[그림 1-2] 는 컨테이너를 띄운 데스크탑과 컨테이너의 관계입니다. 앞선 장에서 DB 컨테이너를 띄울 때 사용한 명령어는 다음과 같습니다.

```bash
$ docker run -d \
	...
  -p 5432:5432 \
  postgres:14.0
```

이 때 `-p` 옵션은 포트 포워딩을 의미합니다. 위의 5432:5432 를 해석하면 localhost 의 5432 포트를 DB container 의 5432 로 연결하라는 뜻입니다. 이러한 연결이 있었기 때문에 로컬에서는 DB에 접근이 가능했습니다.

<div style={{textAlign: 'center'}}>

![Container Networking Disconneted](./img/db-3.png)  
[그림 1-3] Container Networking Disconneted
</div>

[그림 1-3] 는 `ch-1-data-generator` 의 컨테이너를 실행시켰을 때의 도식입니다. 이 때 `ch-1-data-generator` 컨테이너에게 `localhost:5432` 는 자기 자신의 컨테이너 내부입니다. 그렇기 때문에 DB 를 찾지 못하게 됩니다.

<div style={{textAlign: 'center'}}>

![Container Networking Connetected](./img/db-4.png)  
[그림 1-4] Container Networking Connetected
</div>

이를 해결하기 위해서는 [그림 1-4] 처럼 두 컨테이너 간에 통신할 수 있도록 연결해 주어야 합니다.

### 2.2 Connect Network

1. 컨테이너간 통신할 수 있는 네트워크를 생성합니다.
    
    ```bash
    $ docker network create my-network
    ```
    
2. 실행 중인 DB 컨테이너를 생성한 도커 네트워크에 연결합니다.
    
    ```bash
    $ docker network connect my-network postgres-server
    ```
    
3. 이제 다시 `ch-1-data-generator` 를 실행합니다.
    
    ```bash
    $ docker run --name data-generator --network "my-network" ch-1-data-generator "postgres-server"
    ```
    
    - `--network` 옵션에 위에서 생성한 네트워크 이름을 입력합니다.
    - 컨테이너늘 시작할 때 이미지 이름의 뒤에 입력된 값은 Dockerfile 의 `ENTRYPOINT` 를 수정합니다.
        - 앞선 장에서 connector 를 생성할 때 host 를 받는 부분을 수정 했었는데 바로 이 경우를 위해서 입니다. 이제 컨테이너 끼리의 통신은 `localhost` 가 아닌 각 컨테이너의 이름이 host 가 됩니다. 우리가 띄운 DB 컨테이너의 이름은 `postgres-server` 이기 때문에 argument 로 `postgres-server` 를 입력합니다.

### 2.3 Data 확인

`psql` 을 이용하여 DB 에 접근하고, 계속해서 데이터가 삽입되고 있는지 확인해 보겠습니다.

1. psql 에 접속합니다.
    
    ```bash
    $ psql -h localhost -p 5432 -U myuser -d mydatabase
    Password for user myuser: 
    psql (14.3, server 14.0 (Debian 14.0-1.pgdg110+1))
    Type "help" for help.
    
    mydatabase=#
    ```
    
2. 앞선 장에서 작성한 `iris_data` 테이블에 있는 데이터 전체를 확인하기 위한 query 를 실행합니다.
    
    ```bash
    mydatabase=# select * from iris_data;
     id | sepal_length | sepal_width | petal_length | petal_width | target 
    ----+--------------+-------------+--------------+-------------+--------
      1 |          5.6 |           3 |          4.5 |         1.5 |      1
      2 |          5.9 |           3 |          5.1 |         1.8 |      2
      3 |          5.5 |         2.4 |          3.8 |         1.1 |      1
      4 |          5.4 |         3.9 |          1.3 |         0.4 |      0
    (4 rows)
    ```
    
    실행을 할 때마다 계속해서 데이터가 추가되고 있는 것을 확인할 수 있습니다.
    

## 3. 한계

다만 이 방법은 여러 불편함이 있습니다.

우선 통신을 위해서는 컨테이너의 이름을 알아야 합니다. 그리고 이 컨테이너 이름을 다른 곳에 환경 변수로 전달해야 합니다.
그런데 Docker 에서 컨테이너 이름을 지정하지 않는 경우 랜덤하게 생성되며 여러 개를 띄울 경우 이름 짓기가 어려워 집니다.

또한 컨테이너가 실행되는 순서를 보장할 수 없습니다. 예를 들어서 DB가 실행되기 전에 데이터를 삽입을 시도하면 해당 컨테이너는 오류와 함께 실행이 종료됩니다.

이처럼 여러 컨테이너간의 문제를 조율 하는 것을 Container Orchestration 이라고 하며 도커에서는 자체적인 해결법으로 [Docker Compose](https://docs.docker.com/compose/) 를 제공합니다.
