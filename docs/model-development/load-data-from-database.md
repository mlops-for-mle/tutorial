---
sidebar_position: 3
---

# 3) Load Data from Database

## 목표

데이터베이스에서 데이터를 가져오는 파이프라인을 작성합니다.

## 스펙 명세서

1. 데이터 불러오기
    - 챕터2에서 생성한 데이터베이스에서 데이터를 가져옵니다.
    - `id` column을 기준으로 최신 데이터 100개를 추출하는 쿼리문을 작성합니다.
    - `pandas.read_sql` 함수를 이용해 데이터를 추출합니다.
2. 모델 파이프라인 수정
    - 이전 장에서 작성한 파이프라인 중 데이터를 불러오는 부분을 위에서 작성한 함수로 수정합니다.
    - 모델을 학습하고 저장합니다.
    - 모델이 정상적으로 저장되었는지 확인합니다.

---

## 0.  패키지 설치

이번 장에서 사용할 패키지들인 `psycopg2-binary` 를 설치합니다.

```bash
$ pip install psycopg2-binary
```

## 1. 데이터 불러오기

`id` column을 기준으로 최신 데이터 100개를 추출하는 쿼리문을 작성합니다.

```sql
SELECT * FROM iris_data ORDER BY id DESC LIMIT 100;
```

`psql` 에서 해당 쿼리문을 입력하면 다음과 같이 출력됩니다.

```sql
mydatabase=# SELECT * FROM iris_data ORDER BY id DESC LIMIT 100;
  id  | sepal_length | sepal_width | petal_length | petal_width | target
------+--------------+-------------+--------------+-------------+--------
 3499 |          5.4 |         3.9 |          1.7 |         0.4 |      0
 3498 |          6.4 |         2.8 |          5.6 |         2.1 |      2
 3497 |          6.3 |         2.3 |          4.4 |         1.3 |      1
 3496 |          5.4 |         3.9 |          1.7 |         0.4 |      0
 3495 |          5.5 |         4.2 |          1.4 |         0.2 |      0
(...)
```

`pandas.read_sql` 는 입력 argument로 Query문과 DB Connection을 받습니다.

postgres 에 연결할 수 있는 db connection을 생성 후 쿼리문과 db 커넥션을 이용해 데이터를 불러옵니다.

```python
import pandas as pd
import psycopg2

db_connect = psycopg2.connect(host="localhost", database="postgres", user="postgres", password="mypassword")
df = pd.read_sql("SELECT * FROM iris_data ORDER BY id DESC LIMIT 100", db_connect)
```

추출된 데이터를 확인하면 다음과 같습니다.

```python
print(df.head(5))
#      id  sepal_length  sepal_width  petal_length  petal_width  target
# 0  3499          5.4           3.9          1.7           0.4       0
# 1  3498          6.4           2.8          5.6           2.1       2
# 2  3497          6.3           2.3          4.4           1.3       1
# 3  3496          5.4           3.9          1.7           0.4       0
# 4  3495          5.5           4.2          1.4           0.2       0
```

## 2. 모델 파이프라인 수정

### 2.1 `db_train.py`

우선 학습 및 데이터 저장을 위한 코드들을 모은 `base_train.py` 를 수정해 `db_train.py` 로 저장합니다.

먼저  `# 1. get data` 부분을 위에서 작성한 코드로 수정합니다.

그리고 사용한 데이터를 저장하는 `# 4. save data` 부분을 추가합니다.
데이터를 저장하는 이유는 현재 데이터베이스에 계속해서 데이터가 쌓이고 있기 때문에 매번 데이터를 불러올 때마다 데이터가 바뀝니다.
데이터가 바뀌면 모델이 정상적으로 불러왔는지 확인할 수 없기 때문에 사용한 데이터를 저장해 평가하는 부분에서 사용합니다.

```python
# db_train.py

import joblib
import pandas as pd
import psycopg2
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC

# 1. get data
db_connect = psycopg2.connect(host="localhost", database="mydatabase", user="myuser", password="mypassword")
df = pd.read_sql("SELECT * FROM iris_data ORDER BY id DESC LIMIT 100", db_connect)
X = df.drop(["id", "target"], axis="columns")
y = df["target"]
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, random_state=2022)

# 2. model development and train
model_pipeline = Pipeline([("scaler", StandardScaler()), ("svc", SVC())])
model_pipeline.fit(X_train, y_train)

train_pred = model_pipeline.predict(X_train)
valid_pred = model_pipeline.predict(X_valid)

train_acc = accuracy_score(y_true=y_train, y_pred=train_pred)
valid_acc = accuracy_score(y_true=y_valid, y_pred=valid_pred)

print("Train Accuracy :", train_acc)
print("Valid Accuracy :", valid_acc)

# 3. save model
joblib.dump(model_pipeline, "db_pipeline.joblib")

# 4. save data
df.to_csv("data.csv", index=False)
```

### 2.2 `validate_save_model.py`

다음은 저장된 모델을 검증하는 `base_validate_save_model.py` 를 수정해 `db_validate_save_model.py` 로 저장합니다 입니다.
`# 1. reproduce data` 에서 저장된 데이터를 불러오게 수정합니다. 나머지 부분은 이 전 장과 동일합니다.

```python
# db_validate_save_model.py

import joblib
import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

# 1. reproduce data
df = pd.read_csv("data.csv")
X = df.drop(["id", "target"], axis="columns")
y = df["target"]
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, random_state=2022)

# 2. load model
pipeline_load = joblib.load("db_pipeline.joblib")

# 3. validate
load_train_pred = pipeline_load.predict(X_train)
load_valid_pred = pipeline_load.predict(X_valid)

load_train_acc = accuracy_score(y_true=y_train, y_pred=load_train_pred)
load_valid_acc = accuracy_score(y_true=y_valid, y_pred=load_valid_pred)

print("Load Model Train Accuracy :", load_train_acc)
print("Load Model Valid Accuracy :", load_valid_acc)
```
