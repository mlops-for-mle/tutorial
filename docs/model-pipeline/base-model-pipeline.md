---
sidebar_position: 1
---

# 1. Base Model Pipeline

## 목표

모델을 학습하고 저장하는 기본적인 파이프라인을 작성합니다.

## 스펙 명세서

1. 학습 및 평가 데이터
    1. scikit-learn 에서  제공하는 iris 데이터를 불러옵니다.
    2. 불러온 데이터를 학습 데이터와 평가 데이터로 나눕니다.
        1. 이 때 나뉘어진 데이터는 추후에 재현이 되어야 합니다.
2. 모델 개발 및 학습
    1. 예측을 위한 모델은 scikit-learn 에서 제공하는 Random Forest를 사용합니다.
    2.  `1. 학습 및 평가 데이터 선정` 에서 나눈 학습 데이터를 이용해 모델을 학습합니다.
    3. 학습된 모델을 이용해 학습 데이터와 평가 데이터의 정확도를 계산합니다.
3. 학습된 모델 저장
    1. 학습된 모델을 `joblib` , `pickle` , `dill` 등의 패키지를 이용해 저장합니다.
4. 저장된 모델 불러오기
    1. 모델이 정상적으로 저장 되었는지 확인하기 위해 모델을 불러옵니다.
    2. 불러온 모델로 2.3)에서 학습 데이터와 평가 데이터의 정확도를 계산합니다.
    3. `1. 학습 및 평가 데이터 선정` 에서 나눈 Valid 데이터를 이용해 정상적으로 동작하는지 확인합니다.
        1. `predict` 수행

---


## 0. 패키지 설치

이번 챕터에서 사용할 패키지들인 `pandas`, `scikit-learn`, `joblib` 를 설치합니다.

```bash
pip install pandas scikit-learn joblib
```

## 1. 학습 및 평가 데이터 선정

### 1.1) scikit-learn 에서  제공하는 iris 데이터를 불러옵니다.

`sklearn.datasets` 에서 `load_iris` 함수를 통해서 iris 데이터를 불러올 수 있습니다.

```python
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True, as_frame=True)
```

불러온 데이터를 각각 `X`, `y` 에 할당합니다.

### 1.2) 불러온 데이터를 학습 데이터와 평가 데이터로 나눕니다.

사이킷런에서 제공하는 `train_test_split` 함수를 이용해 데이터를 학습 및 평가 데이터로 나눕니다. 또한 추후에 재현할 수 있도록 `random_seed` 를 지정합니다.

```python
from sklearn.model_selection import train_test_split

X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, random_seed=2022)
```

분리된 데이터에서 학습 데이터를 `X_train`, `y_train` 에 할당하고, 평가 데이터는 `X_valid`, `y_valid` 에 할당합니다.

## 2. 모델 개발 및 학습

### 2.1) 예측을 위한 모델은 scikit-learn 에서 제공하는 Random Forest를 사용합니다.

`sklearn.ensemble` 의 `RandomForest` 을 `rf` 에 할당합니다.

```python
from sklearn.ensemble import RandomForest

rf = RandomForest()
```

### 2.2) `1.2) 학습 및 평가 데이터 선정` 에서 나눈 학습 데이터를 이용해 모델을 학습합니다.

`fit` 함수를 통해 모델을 학습합니다.

```python
rf.fit(X_train, y_train)
```

### 2.3) 학습된 모델을 이용해 학습 데이터와 평가 데이터의 정확도를 계산합니다.

`predict` 함수를 통해 주어진 데이터에 대한 예측값을 얻을 수 있습니다.

```python
train_pred = rf.predict(X_train)
valid_pred = rf.predict(X_valid)
```

학습 데이터와 평가 데이터에 대해서 예측을 진행 해 각각 `train_pred` 와 `valid_pred` 에 저장합니다.

이제 정확도를 계산해야 합니다. 정확도는 `sklearn.metrics` 에서 제공하는 `accuracy_score` 를 이용해 계산해 보겠습니다.

```python
from sklearn.metrics import accuracy_score

train_acc = accuracy_score(y_true=y_train, y_pred=train_pred)
valid_acc = accuracy_score(y_true=y_valid, y_pred=valid_pred)

print("Train Accuracy :", train_acc)
print("Valid Accuracy :", valid_acc)
```

## 3. 학습된 모델 저장

### 3.1) 학습된 모델을 `joblib` , `pickle` , `dill` 등의 패키지를 이용해 저장합니다.

sickit-learn 에서 공식적으로 권장하는 모델 저장 방법은 `joblib` 패키지를 이용하는 것입니다. [[Scikit-Learn Model Presistence](https://scikit-learn.org/stable/model_persistence.html)]

```python
import joblib

joblib.dump(rf, "rf.joblib")
```

코드를 실행하면 경로에 `rf.joblib` 파일이 생성됩니다.

## 4. 저장된 모델 불러오기

### 4.1) 모델이 정상적으로 저장 되었는지 확인하기 위해 모델을 불러옵니다.

```python
import joblib

rf_load = joblib.load("rf.joblib")
```

### 4.2) 불러온 모델로 2.3)에서 학습 데이터와 평가 데이터의 정확도를 계산합니다.

2.3) 에서 나눈 데이터를 재현합니다.

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True, as_frame=True)
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, random_seed=2022)
```

불러온 모델을 통해 학습 및 평가 데이터를 예측합니다.

```python
load_train_pred = rf_load.predict(X_train)
load_valid_pred = rf_load.predict(X_valid)
```

정확도를 계산후 불러오기 전 모델과 같은지 비교합니다.

```python
from sklearn.metrics import accuracy_score

load_train_acc = accuracy_score(y_true=y_train, y_pred=load_train_pred)
load_valid_acc = accuracy_score(y_true=y_valid, y_pred=load_valid_pred)

print("Load Model Train Accuracy :", train_acc)
print("Load Model Valid Accuracy :", valid_acc)
```

## 5. 전체 코드

위에서 설명한 코드를 `train.py`, `validate_save_model.py`  로 나눠서 작성할 수 있습니다.

### 5.1 `train.py`
우선 학습 및 데이터 저장을 위한 코드들을 모은 `train.py` 입니다.

```python
# train.py

import joblib
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForest
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. get data
X, y = load_iris(return_X_y=True, as_frame=True)
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

```

### 5.2 `validate_save_model.py`
다음은 저장된 모델을 검증하는 `validate_save_model.py` 입니다.

```python
# validate_save_model.py
import joblib

from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. reproduce data
X, y = load_iris(return_X_y=True, as_frame=True)
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
