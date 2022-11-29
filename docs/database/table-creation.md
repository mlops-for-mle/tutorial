---
sidebar_position: 2
---

# 2) Table Creation

## 목표

1. 생성된 DB 에 query 를 작성하여 테이블을 생성합니다.
2. 생성된 테이블 을 확인합니다.

## 스펙 명세서

1. `pandas` , `psycopg2-binary` , `scikit-learn` 패키지를 설치합니다.
2. Python 스크립트를 이용하여 DB 에 접근합니다.
    - user : `myuser`
    - password : `mypassword`
    - host : `localhost`
    - port : `5432`
    - database : `mydatabase`
3. Python 에서 `psycopg2` 를 사용하여  `iris_data` 테이블을 생성합니다.
    - 테이블은 다음과 같은 column 들을 갖고 있어야 합니다.
        
        
        | column | id | sepal length (cm) | sepal width (cm) | petal length (cm) | petal width (cm) | target |
        | --- | --- | --- | --- | --- | --- | --- |
        | type | primary key | float | float | float | float | int |
4. `psql` 을 이용하여 생성한 테이블을 확인합니다.

---

## 0. 패키지 설치

필요한 패키지들을 설치합니다.

```bash
$ pip install pandas psycopg2-binary scikit-learn
```

## 1. 테이블 생성
Python 에서 postgres 서버에 접근하기 위한 가장 간단한 방법은 `psycopg2` 패키지를 이용하는 것입니다.  
`psycopg2` 에 관한 자세한 내용은 [공식 문서](https://www.psycopg.org/docs/)를 참고해주세요.

### 1.1 DB connection
`psycopg2` 를 이용하여 DB 에 접근하기 위해서는 `connect` 함수를 이용해야 합니다. `connect` 함수를 아래와 같이 작성하여 `db_connect` connector 를 생성합니다.

```python
import psycopg2

db_connect = psycopg2.connect(
    user="myuser", 
    password="mypassword",
    host="localhost",
    port=5432,
    database="mydatabase",
)
```

여기서 기억해야할 것은 일반적으로 DB 연결 시 `user`, `password`, `host`, `port`, `database` 총 5가지의 정보가 필요합니다.
이전 장에서 DB 를 생성할 때 입력한 `myuser`, `mypassword`, `localhost`, `5432`, `mydatabase` 를 입력합니다.

### 1.2 Table creation query

#### 1.2.1 SQL Table Creation Query Rule

테이블을 생성하기 위한 SQL 문은 아래와 같은 규칙을 갖습니다.

```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
   ....
);
```

이제 위에서 정의한 스펙 명세서에 맞춰 필요한 내용을 채워보겠습니다.

#### 1.2.2 Table Creation Query

삽입할 데이터는 `scikit-learn` 패키지의 `load_iris` 를 이용합니다.

```python
import pandas as pd
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True, as_frame=True)
df = pd.concat([X, y], axis="columns")
```

데이터를 출력하면 아래와 같습니다.

```python
print(df)
#      sepal length (cm)  sepal width (cm)  petal length (cm)  petal width (cm)  target
# 0                  5.1               3.5                1.4               0.2       0
# 1                  4.9               3.0                1.4               0.2       0
# 2                  4.7               3.2                1.3               0.2       0
# 3                  4.6               3.1                1.5               0.2       0
# 4                  5.0               3.6                1.4               0.2       0
# ..                 ...               ...                ...               ...     ...
# 145                6.7               3.0                5.2               2.3       2
# 146                6.3               2.5                5.0               1.9       2
# 147                6.5               3.0                5.2               2.0       2
# 148                6.2               3.4                5.4               2.3       2
# 149                5.9               3.0                5.1               1.8       2
#
# [150 rows x 5 columns]
```

Iris 데이터의 column 들의 type 을 확인하면 다음과 같습니다.

```python
print(df.dtypes)
# sepal length (cm)    float64
# sepal width (cm)     float64
# petal length (cm)    float64
# petal width (cm)     float64
# target                 int64
# dtype: object
```

`X` 의 data type 은 `float64` 로 표기되고, target 은 `int64` 로 표기됩니다. 그런데 이 data type 들은 postgres 에서 지원하지 않기에 각각 `float8`, `int` 로 선언해 주어야 합니다. 
또한 column 이름은 `sepal length (cm)` 에 포함되어 있는 `(` 때문에 이용할 수 없기 때문에 해당 부분을 제거해야 합니다.

위의 내용을 반영한 query 는 다음과 같이 작성할 수 있습니다.

```python
create_table_query = """
CREATE TABLE IF NOT EXISTS iris_data (
    id SERIAL PRIMARY KEY,
    sepal_width float8,
    sepal_length float8,
    petal_width float8,
    petal_length float8
    target int
);"""
```

#### 1.2.3 Send Query to DB

이제 작성한 query 를 DB 에 전달해야 합니다. 전달을 위해서는 아래의 과정을 수행하면 됩니다.

1. connector 의 cursor 를 열고 cursor 에 query 를 전달합니다.
    
    ```python
    cur = db_connect.cursor()
    cur.execute(create_table_query)
    ```
    
2. 전달 된 query 를 실행하기 위해서는 connector 에서 `commit` 을 해주어야 합니다.
    
    ```python
    db_connect.commit()
    ```
    
3. cursor 의 사용이 끝나면 cursor 를 `close` 합니다.
    
    ```python
    cur.close()
    ```
    

위에서 설명한 3개의 과정은 아래처럼 하나의 프로세스로 처리할 수 있습니다.

```python
with db_connect.cursor() as cur:
    cur.execute(create_table_query)
    db_connect.commit()
```

with 문을 이용한 사용법에 대한 내용은 [공식 홈페이지](https://www.psycopg.org/docs/connection.html#the-connection-class)에서 다음과 같이 언급하고 있습니다.

> Connections can be used as context managers. Note that a context wraps a transaction: if the context exits with success the transaction is committed, if it exits with an exception the transaction is rolled back. Note that the connection is not closed by the context and it can be used for several contexts.

#### 1.2.4 `create_table`

위에서 작성한 코드를 이용해 `create_table` 함수를 작성합니다.

```python
def create_table(db_connect) -> None:
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
```

`create_table`  의 입력값은 `db_connect` 입니다. DB와의 연결을 지속적으로 요구할 경우 부하가 갈 수 있기 때문에 최초에 한번만 연결 후 연결된 connector 를 재사용하기 위함입니다.  
함수 내부에서는 query 가 있고 실행될 때 어떤 query 가 실행되었는지 확인하기 위해서 `print` 를 합니다.  
마지막으로 query 를 DB에 전달하는 with 문을 추가합니다.  

### 2.3 Query 실행

#### 2.3.1 `create_table.py`

위에서 작성한 코드를 모아서 `create_table.py` 로 작성합니다.

```python
# create_table.py
import psycopg2

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

if __name__ == "__main__":
    db_connect = psycopg2.connect(
        user="myuser",
        password="mypassword",
        host="localhost",
        port=5432,
        database="mydatabase",
    )
    create_table(db_connect)
```

#### 1.3.2 실행

Python 스크립트를 실행합니다.

```bash
$ python create_table.py
CREATE TABLE IF NOT EXISTS iris_data (
    id SERIAL PRIMARY KEY,
    sepal_length float8,
    sepal_width float8,
    petal_length float8,
    petal_width float8,
    target int
);
```

## 2. Table 확인

`psql` 을 이용하여 DB 에 접근하고, 생성된 테이블을 확인해 보겠습니다.

1. 우선 psql에 접속합니다.
    
    ```bash
    $ psql -h localhost -p 5432 -U myuser -d mydatabase
    Password for user myuser: 
    psql (14.3, server 14.0 (Debian 14.0-1.pgdg110+1))
    Type "help" for help.
    
    mydatabase=#
    ```
    
2. `\d` 를 입력해 생성된 테이블들의 목록을 확인합니다.
    
    ```bash
    mydatabase=# \d
    List of relations
     Schema |       Name       |   Type   | Owner  
    --------+------------------+----------+--------
     public | iris_data        | table    | myuser
     public | iris_data_id_seq | sequence | myuser
    (2 rows)
    
    ```
    
3. 위 목록 중 `iris_data` 테이블에 있는 데이터 전체를 확인하기 위한 query 문을 실행한 결과입니다.
    
    ```bash
    mydatabase=# select * from iris_data;
     id | sepal_length | sepal_width | petal_length | petal_width | target 
    ----+--------------+-------------+--------------+-------------+--------
    (0 rows)
    ```
    
    column 들이 위의 Python 스크립트에서 작성한 이름과 같은지 확인합니다.
    또한 아직 입력한 데이터가 없기 때문에 `(0 rows)` 로 나오는 걸 확인할 수 있습니다.
