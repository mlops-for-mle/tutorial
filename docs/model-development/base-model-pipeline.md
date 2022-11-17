---
sidebar_position: 2
---

# 2. Model Pipeline

## 목표

모델을 학습하고 저장하는 기본적인 파이프라인을 작성합니다.

## 스펙 명세서

1. 모델들의 파이프라인화
    - Scikit-learn pipeline 을 이용합니다.
2. 저장된 파이프라인 검증
    - 저장된 파이프라인이 정상적으로 동작하는지 확인합니다.

---

## 1.  모델들의 파이프라인화

### 모델 파이프라인

이 전 장에서 예측을 위해 사용한 모델은 scaler 와 SVC 두 가지가 있었습니다. 이중 SVC가 정상적으로 예측하기 위해서는 scaler가 필요하다는 것도 알아 보았습니다. 즉 아래와 같은 사용법이 강제 됩니다.

```python
scaled_X_train = scaler.transform(X_train)
train_pred = classifier.predict(scaled_X_train)
```

하지만 위 방법은 scaler 를 까먹거나 다른 scaler를 사용하는 경우가 발생할 수 있습니다. 이러한 실수를 막을 수 있는 방법이 모델들을 파이프라인화 시키는 것입니다. 파이프라인화 된 모델은 아래 처럼 사용할 수 있습니다.

```python
model_pipeline.predict(X_train)
```

`model_pipeline` 안에는 학습이 완료된 scaler 와 SVC 가 같이 존재하기 때문에 위에서 발생할 수 있는 실수를 없애줍니다.

물론 이 방법에도 단점이 있습니다. 한번 구축된 파이프라인은 수정하기 어렵다는 점과 scaler 처럼 한 모델에서만 쓰이는게 아니라 여러 모델에도 사용할 수 있는 것들을 중복적으로 학습해야 한다는 점이 있습니다.

### 코드

그럼 한번 직접 모델들을 파이프라인으로 작성해 보겠습니다.

`sklearn.pipeline` 의 `Pipeline` 을 통해 파이프라인을 작성할 수 있습니다. 이 때 파이프라인 안에 들어가는 값은 리스트이며 리스트 안에는 `(모델 이름, 모델 객체)` 가 값으로 들어갑니다.

```python
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC

model_pipeline = Pipeline([("scaler", StandardScaler()), ("svc", SVC())])
```

이제 생성한 파이프라인을 학습해 보도록 하겠습니다. 학습 방법은 일반적인 scikit-learn의 모델처럼 진행하면 됩니다.

```python
model_pipeline.fit(X_train, y_train)
```

학습이 완료된 파이프라인은 바로 예측을 하거나 각 step별로 진행해 볼 수 있습니다.

예를 들어서 scaler 만 사용하고 싶은 경우에는 아래처럼 할 수 있습니다.

```python
print(model_pipeline[0].transform(X_train[:1]))
# [[-1.71687346 -0.1513372  -1.37527528 -1.29070478]]
```

다음으로 파이프라인으로 예측을 하고 정확도를 계산합니다.

```python
from sklearn.metrics import accuracy_score

train_pred = model_pipeline.predict(X_train)
valid_pred = model_pipeline.predict(X_valid)

train_acc = accuracy_score(y_true=y_train, y_pred=train_pred)
valid_acc = accuracy_score(y_true=y_valid, y_pred=valid_pred)

print("Train Accuracy :", train_acc)
print("Valid Accuracy :", valid_acc)
# Train Accuracy : 0.9833333333333333
# Valid Accuracy : 0.9666666666666667
```

마지막으로 모델을 저장합니다. 이 때 이 전 장처럼 따로 할 필요 없이 하나의 파일로 저장할 수 있습니다.

```python
import joblib

joblib.dump(model_pipeline, "model_pipeline.joblib")
```

### 전체 코드

위에서 작성한 코드를 모아서 `pipeline_train.py` 로 작성합니다.

```python
# pipeline_train.py

import joblib
from sklearn.datasets import load_iris
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC

# 1. get data
X, y = load_iris(return_X_y=True, as_frame=True)
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
joblib.dump(model_pipeline, "model_pipeline.joblib")
```

## 2. 저장된 파이프라인 검증

저장된 파이프라인이 정상적으로 동작하는 지 검증하기 위해 이 전 장에서 작성한 `base_validate_save_model.py` 의 코드를 수정해 `pipeline_validate_save_model.py` 로 작성합니다.

```python
# pipeline_validate_save_model.py

import joblib
from sklearn.datasets import load_iris
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

# 1. reproduce data
X, y = load_iris(return_X_y=True, as_frame=True)
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, random_state=2022)

# 2. load model
model_pipeline_load = joblib.load("model_pipeline.joblib")

# 3. validate
load_train_pred = model_pipeline_load.predict(X_train)
load_valid_pred = model_pipeline_load.predict(X_valid)

load_train_acc = accuracy_score(y_true=y_train, y_pred=load_train_pred)
load_valid_acc = accuracy_score(y_true=y_valid, y_pred=load_valid_pred)

print("Load Model Train Accuracy :", load_train_acc)
print("Load Model Valid Accuracy :", load_valid_acc)
```
