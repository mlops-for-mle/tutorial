---
sidebar_position: 2
---

# 2. Model Pipeline w\ Database

## 목표

데이터베이스에서 데이터를 가져오는 파이프라인을 작성합니다.

## 스펙 명세서

1. 데이터 불러오기
    - 챕터2에서 생성한 데이터베이스에서 데이터를 가져옵니다.
    - `id` column을 기준으로 최신 데이터 100개를 추출하는 쿼리문을 작성합니다.
    - `pandas.read_sql` 함수를 이용해 데이터를 추출합니다.
2. 모델 파이프라인 수정
    - 이전 장에서 작성한 파이프라인 중 데이터를 불러오는 부분을 수정합니다.
    - 모델을 학습하고 저장합니다.
    - 저장된 모델을 불러옵니다.

---

## 0. 패키지 설치

이번 챕터에서 사용할 패키지들인 `pandas`, `scikit-learn`, `joblib` 를 설치합니다.

```bash
$ pip install psycopg2-binary
```

## 1. 데이터 불러오기

### 1.1) `id` column을 기준으로 최신 데이터 100개를 추출하는 쿼리문을 작성합니다.

요구사항을 Query문으로 작성하면 다음과 같습니다.

```sql
SELECT * FROM iris_data ORDER BY id DESC LIMIT 10;
```

`psql` 에서 해당 쿼리문을 입력하면 다음과 같이 출력됩니다.

```sql
postgres=# SELECT * FROM iris_data ORDER BY id DESC LIMIT 10;
  id  | sepal_width | sepal_length | petal_width | petal_length | target
------+-------------+--------------+-------------+--------------+--------
 5789 |         4.4 |            3 |         1.3 |          0.2 |      0
 5788 |         5.1 |          3.7 |         1.5 |          0.4 |      0
 5787 |           5 |          3.4 |         1.6 |          0.4 |      0
 5786 |         5.3 |          3.7 |         1.5 |          0.2 |      0
 5785 |           5 |            3 |         1.6 |          0.2 |      0
 5784 |         6.1 |            3 |         4.9 |          1.8 |      2
 5783 |         6.7 |            3 |           5 |          1.7 |      1
 5782 |         6.9 |          3.1 |         5.4 |          2.1 |      2
 5781 |         6.8 |          3.2 |         5.9 |          2.3 |      2
 5780 |         5.9 |          3.2 |         4.8 |          1.8 |      1
(10 rows)
```

### 1.2) `pandas.read_sql` 함수를 이용해 데이터를 추출합니다.

`pandas.read_sql` 는 입력 argument로 Query문과 DB Connection을 받습니다.

postgres 에 연결할 수 있는 db connection을 생성 후 쿼리문과 db 커넥션을 이용해 데이터를 불러옵니다.

```python
import pandas as pd
import psycopg2

db_connect = psycopg2.connect(host="localhost", database="postgres", user="postgres", password="mypassword")
df = pd.read_sql("SELECT * FROM iris_data ORDER BY id DESC LIMIT 10", db_connect)
```

추출된 데이터를 확인하면 다음과 같습니다.

```python
print(df)
#      id  sepal_width  sepal_length  petal_width  petal_length  target
# 0  5824          6.0           2.2          5.0           1.5       2
# 1  5823          5.7           4.4          1.5           0.4       0
# 2  5822          6.0           2.7          5.1           1.6       1
# 3  5821          6.3           2.3          4.4           1.3       1
# 4  5820          4.8           3.4          1.9           0.2       0
# 5  5819          4.5           2.3          1.3           0.3       0
# 6  5818          6.7           3.3          5.7           2.1       2
# 7  5817          5.2           4.1          1.5           0.1       0
# 8  5816          5.7           4.4          1.5           0.4       0
# 9  5815          5.4           3.0          4.5           1.5       19  
```

## 2. 모델 파이프라인 수정

### 2.1 `train.py`
우선 학습 및 데이터 저장을 위한 코드들을 모은 `train.py` 를 수정합니다.

먼저  `# 1. get data` 부분을 위에서 작성한 코드로 수정합니다.  
그리고 `# 4. save data` 부분을 추가합니다. 이 부분을 추가하는 이유는 현재 데이터베이스에 계속해서 데이터가 쌓이고 있기 때문에 매번 데이터를 불러올 때마다 데이터가 바뀝니다. 데이터가 바뀌면 모델이 정상적으로 불러왔는지 확인할 수 없기 때문에 사용한 데이터를 저장해 평가하는 부분에서 사용합니다.
```python
# train.py

import joblib
import pandas as pd
import psycopg2
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForest
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. get data
db_connect = psycopg2.connect(host="localhost", database="postgres", user="postgres", password="mypassword")
df = pd.read_sql("SELECT * FROM iris_data ORDER BY id DESC LIMIT 10", db_connect)
X = df.drop(["id", "target"], axis="columns")
y = df["target"]
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, random_seed=2022)

# 2. model development and train
rf = RandomForest()
rf.fit(X_train, y_train)

train_acc = accuracy_score(y_true=y_train, y_pred=train_pred)
valid_acc = accuracy_score(y_true=y_valid, y_pred=valid_pred)

print("Train Accuracy :", train_acc)
print("Valid Accuracy :", valid_acc)

# 3. save model
joblib.dump(rf, "rf.joblib")

# 4. save data
df.to_csv("data.csv", index=False)
```


### 2.2 `validate_save_model.py`
다음은 저장된 모델을 검증하는 `validate_save_model.py` 입니다.
`# 1. reproduce data` 에서 저장된 데이터를 불러오게 수정합니다. 나머지 부분은 이 전 장과 동일합니다.

```python
# validate_save_model.py
import joblib

import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. reproduce data
df = pd.load_csv("data.csv")
X = df.drop(["id", "target"], axis="columns")
y = df["target"]
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, random_seed=2022)

# 2. load model
rf_load = joblib.load("rf.joblib")

# 3. validate
load_train_pred = rf_load.predict(X_train)
load_valid_pred = rf_load.predict(X_valid)

load_train_acc = accuracy_score(y_true=y_train, y_pred=load_train_pred)
load_valid_acc = accuracy_score(y_true=y_valid, y_pred=load_valid_pred)

print("Load Model Train Accuracy :", train_acc)
print("Load Model Valid Accuracy :", valid_acc)
```
