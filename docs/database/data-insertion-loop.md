---
sidebar_position: 4
---

# 4) Data Insertion Loop

## 목표

1. 생성된 테이블안에 데이터를 계속해서 생성하는 스크립트를 작성합니다.
2. DB 에 데이터가 계속해서 삽입되고 있는지 확인합니다.

## 스펙 명세서

1. 이전 장에서 작성한 스크립트를 이용하여 계속해서 데이터를 생성하는 data generator 스크립트를 만듭니다.
2. `psycopg2` 를 이용하여 생성된 `iris_data` 테이블에 스크립트를 실행하여 계속해서 데이터를 삽입합니다.
3. `psql` 을 이용하여 삽입한 데이터를 확인합니다.

---

## 1. 데이터 생성

### 1.1 Generate Data

이전 장에서 작성한 `insert_data.py` 스크립트에서 계속해서 데이터를 추가하는 `insert_data_loop.py` 를 작성해 보겠습니다.

계속해서 데이터를 삽입하기 위해 while 문을 사용하겠습니다. 이 때 `while True` 를 통해 외부의 개입이 없다면 계속해서 while 문을 실행할 수 있습니다.

```python
def generate_data(db_connect, df):
    while True:
        insert_data(db_connect, df.sample(5).squeeze())
```

다만 위와 같이 작성할 경우 너무 빠른 시간에 데이터가 추가되기 때문에 DB 에 부하가 생길 수 있습니다.  
이를 방지하기 위해서는 데이터를 삽입 후 잠시 대기하는 시간을 추가하겠습니다. 파이썬 스크립트를 대기시키는 것은 `time` 패키지의 `sleep` 함수를 이용하면 됩니다. 이 함수가 실행될 경우 해당 줄에서 지정된 시간만큼 대기를 합니다.  
여기서는 1초간 멈추게 해보겠습니다.

```python
import time

def generate_data(db_connect, df):
    while True:
        insert_data(db_connect, df.sample(1).squeeze())
        time.sleep(1)
```

### 1.2 Query 실행

#### 1.2.1 `insert_data_loop.py`

앞선 장에서 작성한 내용들과 이번 장에서 설명한 내용을 합쳐서 data generator 를 생성하도록 하겠습니다.

```python
# insert_data_loop.py
import time

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
        time.sleep(1)


if __name__ == "__main__":
    db_connect = psycopg2.connect(
        user="myuser",
        password="mypassword",
        host="localhost",
        port=5432,
        database="mydatabase",
    )
    df = get_data()
    generate_data(db_connect, df)
```

#### 1.2.2 실행

Python 파일을 실행하면 아래와 같이 나옵니다.

```bash
$ python data_generator.py

    CREATE TABLE IF NOT EXISTS iris_data (
        id SERIAL PRIMARY KEY,
        sepal_length float8,
        sepal_width float8,
        petal_length float8,
        petal_width float8,
        target int
    );

    INSERT INTO iris_data
        (sepal_length, sepal_width, petal_length, petal_width, target)
        VALUES (
            6.5,
            2.8,
            4.6,
            1.5,
            1.0
        );
    

    INSERT INTO iris_data
        (sepal_length, sepal_width, petal_length, petal_width, target)
        VALUES (
            5.5,
            4.2,
            1.4,
            0.2,
            0.0
        );
    

    INSERT INTO iris_data
        (sepal_length, sepal_width, petal_length, petal_width, target)
        VALUES (
            4.4,
            2.9,
            1.4,
            0.2,
            0.0
        );
```

## 2. Data 확인

`psql` 을 이용하여 DB 에 접근하고, 계속해서 data 가 삽입되고 있는지 확인해 보겠습니다.

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
