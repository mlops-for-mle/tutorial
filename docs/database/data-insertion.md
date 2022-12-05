---
sidebar_position: 3
---

# 3) Data Insertion

## 목표

1. 생성한 테이블에 iris data row 한 줄을 삽입합니다.
2. 삽입한 데이터를 확인합니다.

## 스펙 명세서

1. Python 스크립트를 이용하여 DB 에 접근합니다.
    - `user` : `myuser`
    - `password` : `mypassword`
    - `host` : `localhost`
    - `port` : `5432`
    - `database` : `mydatabase`
2. `psycopg2` 를 이용하여 생성된 `iris_data` 테이블에 data row 한 줄을 삽입합니다.
3. `psql` 을 이용하여 삽입한 데이터를 확인합니다.

---

## 1. 데이터 삽입

### 1.1 Iris 데이터 불러오기

Iris 데이터 를 불러온 뒤, 이전 장에서 생성된 테이블의 column 이름과 일치하도록 `rename` 함수를 이용해 수정합니다.

```python
import pandas as pd
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True, as_frame=True)
df = pd.concat([X, y], axis="columns")
rename_rule = {
    "sepal length (cm)": "sepal_length",
    "sepal width (cm)": "sepal_width",
    "petal length (cm)": "petal_length",
    "petal width (cm)": "petal_width",
}
df = df.rename(columns=rename_rule)
```

변환된 데이터를 확인하면 아래과 같습니다.

```python
print(df)
#        sepal_width  sepal_length  petal_width  petal_length  target
# 0            5.1           3.5          1.4           0.2       0
# 1            4.9           3.0          1.4           0.2       0
# 2            4.7           3.2          1.3           0.2       0
# 3            4.6           3.1          1.5           0.2       0
# 4            5.0           3.6          1.4           0.2       0
# ..           ...           ...          ...           ...     ...
# 145          6.7           3.0          5.2           2.3       2
# 146          6.3           2.5          5.0           1.9       2
# 147          6.5           3.0          5.2           2.0       2
# 148          6.2           3.4          5.4           2.3       2
# 149          5.9           3.0          5.1           1.8       2
#
# [150 rows x 5 columns]
```

위의 내용을 `get_data` 함수로 작성합니다.

```python
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
```

### 1.2 Data insertion query 작성

#### 1.2.1) SQL Data Insertion Query Rule

Data 를 삽입할 수 있는 query 를 작성합니다. DB 에 data 를 삽입하는 query 의 포맷은 다음과 같습니다.

```sql
INSRT INTO {table_name} (col_1, col_2, ...) VALUES (val_1, val_2, ...)
```

이제 위에서 정의한 스펙 명세서에 맞춰 필요한 내용을 채워보겠습니다.

#### 1.2.2) Data Insertion Query

`sample` 함수를 이용하여 data row 한 줄을 추출합니다.

```python
data = df.sample(1).squeeze()
```

추출된 데이터는 다음과 같습니다.

```python
print(data)
# sepal_width     6.8
# sepal_length    3.0
# petal_width     5.5
# petal_length    2.1
# target          2.0
# Name: 112, dtype: float64
```

추출된 data 를 이용해 query 을 작성합니다.

```python
insert_row_query = f"""
INSERT INTO iris_data
    (sepal_length, sepal_width, petal_length, petal_width, target)
    VALUES (
        {data.sepal_length},
        {data.sepal_width},
        {data.petal_length},
        {data.petal_width},
        {data.target}
    );"""
```

#### 1.2.3)  Send Query to DB

작성한 query 를 DB 에 전달합니다.

```python
with db_connect.cursor() as cur:
    cur.execute(insert_row_query)
    db_connect.commit()

```

#### 2.2.4) `insert_data`

위에서 작성한 코드를 이용해 `insert_data` 함수를 작성합니다.

```python
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
        );"""
    print(insert_row_query)
    with db_connect.cursor() as cur:
        cur.execute(insert_row_query)
        db_connect.commit()

```

### 1.3 Query 실행

#### 1.3.1 `insert_data.py`

위에서 작성한 코드를 모아서 `insert_data.py` 로 작성합니다.

```python
# insert_data.py
import pandas as pd
import psycopg2
from sklearn.datasets import load_iris

<<<<<<< HEAD

=======
>>>>>>> 9cd52a67ad7b0f32eb8d1ccb88e18770aaf57ec7
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

<<<<<<< HEAD

=======
>>>>>>> 9cd52a67ad7b0f32eb8d1ccb88e18770aaf57ec7
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
        );"""
    print(insert_row_query)
    with db_connect.cursor() as cur:
        cur.execute(insert_row_query)
        db_connect.commit()

<<<<<<< HEAD

=======
>>>>>>> 9cd52a67ad7b0f32eb8d1ccb88e18770aaf57ec7
if __name__ == "__main__":
    db_connect = psycopg2.connect(
        user="myuser",
        password="mypassword",
        host="localhost",
        port=5432,
        database="mydatabase",
    )
    df = get_data()
    insert_data(db_connect, df.sample(1).squeeze())
```

#### 1.3.2 실행

Python 스크립트를 실행합니다.

```bash
$ python insert_data.py
        INSERT INTO iris_data
            (sepal_length, sepal_width, petal_length, petal_width, target)
            VALUES (
                5.0,
                3.5,
                1.6,
                0.6,
                0
            );
```

## 2. Data 확인

`psql` 을 이용하여 DB 에 접근하고, 삽입된 데이터를 확인해 보겠습니다.

1. psql에 접속합니다.
    
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
      1 |          6.7 |           3 |            5 |         1.7 |      1
    (1 row)
    ```
    
    이 전 장과는 다르게 데이터가 한 줄 추가된 것을 확인할 수 있습니다.
