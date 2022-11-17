---
sidebar_position: 1
---

# 1. Base Model Development

## 목표

모델을 학습하고 저장하는 기본적인 파이프라인을 작성합니다.

## 스펙 명세서

1. 학습 및 평가 데이터 선정
    - scikit-learn 에서 제공하는 iris 데이터를 불러옵니다.
    - 불러온 데이터를 학습 데이터와 평가 데이터로 나눕니다.
    - 이 때 나뉘어진 데이터는 추후에 재현이 되어야 합니다.
2. 모델 개발 및 학습
    - scikit-learn 에서 제공하는 Standard Scaler 아 SVC를 사용합니다.
    - `1. 학습 및 평가 데이터 선정` 에서 나눈 학습 데이터를 이용해 모델을 학습합니다.
    - 학습된 모델을 이용해 학습 데이터와 평가 데이터의 정확도를 계산합니다.
3. 학습된 모델 저장
    - 학습된 모델을 `joblib` , `pickle` , `dill` 등의 패키지를 이용해 저장합니다.
4. 저장된 모델 불러오기
    - 모델이 정상적으로 저장 되었는지 확인하기 위해 모델을 불러옵니다.
    - 불러온 모델로 2.3)에서 학습 데이터와 평가 데이터의 정확도를 계산합니다.
    - `1. 학습 및 평가 데이터 선정` 에서 나눈 Valid 데이터를 이용해 정상적으로 동작하는지 확인합니다.

---

## 0. 패키지 설치

이번 장에서 사용할 패키지들인 `pandas`, `scikit-learn`, `joblib` 를 설치합니다.

```bash
pip install pandas scikit-learn joblib
```

## 1. 학습 및 평가 데이터 선정

`sklearn.datasets` 에서 `load_iris` 함수를 통해서 iris 데이터를 불러올 수 있습니다.

```python
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True, as_frame=True)
```

불러온 데이터를 각각 `X`, `y` 에 할당합니다.

`sklearn.model_selection` 의 `train_test_split` 함수를 이용해 데이터를 학습 및 평가 데이터로 나눕니다. 또한 추후에 재현할 수 있도록 `random_seed` 를 지정합니다.

```python
from sklearn.model_selection import train_test_split

X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, random_state=2022)
```

분리된 데이터에서 학습 데이터를 `X_train`, `y_train` 에 할당하고, 평가 데이터는 `X_valid`, `y_valid` 에 할당합니다.

## 2. 모델 개발 및 학습
데이터 scaling 을 위한 `sklearn.preprocessing`의 `StandardScaler` 를 `scaler` 에 할당합니다.

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
```

`fit` 을 통해 scaler를 학습한 후 `transform`을 이용해 데이터를 scaling 합니다.

```python
scaled_X_train = scaler.fit_transform(X_train)
scaled_X_valid = scaler.transform(X_valid)
```

scaling 전 데이터와 scaling 후 데이터를 비교하면 다음과 같습니다.

```python
print(X_train.values[0])
print(scaled_X_train[0])
# [4.4 3.  1.3 0.2]
# [-1.71687346 -0.1513372  -1.37527528 -1.29070478]
```


이제 모델을 학습해 보겠습니다. 사용할 모델인 `sklearn.svm` 의 `SVC` 를 `classifier`에 할당합니다.
```python
from sklearn.svm import SVC

classifier = SVC()
```

`fit` 함수를 이용해 모델을 학습합니다. 이 때 데이터는 scaling 된 데이터인 `scaled_X_train` 과 `y_train`을 사용합니다.


```python
classifier.fit(scaled_X_train, y_train)
```

`predict` 함수를 통해 주어진 데이터에 대한 예측값을 얻을 수 있습니다. 이 때 SVC를 scaling이 된 데이터를 사용했기 때문에 `scaled_X_train` 과 `scaled_X_valid` 를 통해 예측을 해야 합니다.

```python
train_pred = classifier.predict(scaled_X_train)
valid_pred = classifier.predict(scaled_X_valid)
```

학습 데이터와 평가 데이터에 대해서 예측을 진행 해 각각 `train_pred` 와 `valid_pred` 에 저장합니다.

이제 정확도를 계산해야 합니다. 정확도는 `sklearn.metrics` 에서 제공하는 `accuracy_score` 를 이용해 계산해 보겠습니다.

```python
from sklearn.metrics import accuracy_score

train_acc = accuracy_score(y_true=y_train, y_pred=train_pred)
valid_acc = accuracy_score(y_true=y_valid, y_pred=valid_pred)
```

계산된 정확도를 출력하면 아래와 같습니다.

```python
print("Train Accuracy :", train_acc)
print("Valid Accuracy :", valid_acc)
# Train Accuracy : 0.9833333333333333
# Valid Accuracy : 0.9666666666666667
```

만약 scaling 되기 전인 원본 데이터를 사용하면 어떻게 나올까요?

```python
train_pred = classifier.predict(X_train)
valid_pred = classifier.predict(X_valid)

train_acc = accuracy_score(y_true=y_train, y_pred=train_pred)
valid_acc = accuracy_score(y_true=y_valid, y_pred=valid_pred)

print("Train Accuracy :", train_acc)
print("Valid Accuracy :", valid_acc)
# Train Accuracy : 0.23333333333333334
# Valid Accuracy : 0.23333333333333334
```

위의 결과처럼 모델이 제대로 예측하지 못합니다. 이 때문에 학습된 모델이 정상적으로 예측하기 위해서는 데이터를 변환할 때 사용한 scaler 도 같이 저장되어야 합니다.

## 3. 학습된 모델 저장

sickit-learn 에서 공식적으로 권장하는 모델 저장 방법은 `joblib` 패키지를 이용하는 것입니다. [[Scikit-Learn Model Presistence](https://scikit-learn.org/stable/model_persistence.html)]

```python
import joblib

joblib.dump(scaler, "scaler.joblib")
joblib.dump(classifier, "classifier.joblib")
```

코드를 실행하면 경로에 `scaler.joblib` 와 `classifier.joblib` 파일이 생성됩니다.

## 4. 저장된 모델 불러오기

모델이 정상적으로 저장 되었는지 확인해보도록 하겠습니다.
우선, 2.3) 에서 나눈 데이터를 재현 합니다.

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True, as_frame=True)
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, random_state=2022)
```

다음으로 저장된 모델들을 불러옵니다.
```python
import joblib

scaler_load = joblib.load("scaler.joblib")
classifier_load = joblib.load("classifier.joblib")
```

이제 불러온 모델을 통해 학습 및 평가 데이터를 예측을 진행해 보겠습니다.
우선 데이터를 scaler를 통해 scaling을 합니다.

```python
scaled_X_train = scaler_load.transform(X_train)
scaled_X_valid = scaler_load.transform(X_valid)
```

그리고 모델을 통해 예측을 진행합니다.
```python
load_train_pred = classifier_load.predict(scaled_X_train)
load_valid_pred = classifier_load.predict(scaled_X_valid)
```

정확도를 계산후 불러오기 전 모델과 같은지 비교합니다.

```python
from sklearn.metrics import accuracy_score

load_train_acc = accuracy_score(y_true=y_train, y_pred=load_train_pred)
load_valid_acc = accuracy_score(y_true=y_valid, y_pred=load_valid_pred)
```

계산된 정확도를 출력하면 아래와 같습니다.

```python
print("Load Model Train Accuracy :", load_train_acc)
print("Load Model Valid Accuracy :", load_valid_acc)
# Train Accuracy : 0.9833333333333333
# Valid Accuracy : 0.9666666666666667
```

위에서 실행한 결과와 같은 결과가 출력되는 것을 확인할 수 있습니다.

## 5. 전체 코드

위에서 설명한 코드를 `base_train.py`, `base_validate_save_model.py`  로 나눠서 작성할 수 있습니다.

### 5.1 `base_train.py`

우선 학습 및 데이터 저장을 위한 코드들을 모은 `base_train.py` 입니다.

```python
# base_train.py

import joblib
from sklearn.datasets import load_iris
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

# 1. get data
X, y = load_iris(return_X_y=True, as_frame=True)
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, random_state=2022)

# 2. model development and train
scaler = StandardScaler()
classifier = SVC()

scaled_X_train = scaler.fit_transform(X_train)
scaled_X_valid = scaler.transform(X_valid)
classifier.fit(scaled_X_train, y_train)

train_pred = classifier.predict(scaled_X_train)
valid_pred = classifier.predict(scaled_X_valid)

train_acc = accuracy_score(y_true=y_train, y_pred=train_pred)
valid_acc = accuracy_score(y_true=y_valid, y_pred=valid_pred)

print("Train Accuracy :", train_acc)
print("Valid Accuracy :", valid_acc)

# 3. save model
joblib.dump(scaler, "scaler.joblib")
joblib.dump(classifier, "classifier.joblib")

```

### 5.2 `base_validate_save_model.py`

다음은 저장된 모델을 검증하는 `base_validate_save_model.py` 입니다.
```python
# base_validate_save_model.py

import joblib
from sklearn.datasets import load_iris
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

# 1. reproduce data
X, y = load_iris(return_X_y=True, as_frame=True)
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, random_state=2022)

# 2. load model
scaler_load = joblib.load("scaler.joblib")
classifier_load = joblib.load("classifier.joblib")

# 3. validate
scaled_X_train = scaler_load.transform(X_train)
scaled_X_valid = scaler_load.transform(X_valid)

load_train_pred = classifier_load.predict(scaled_X_train)
load_valid_pred = classifier_load.predict(scaled_X_valid)

load_train_acc = accuracy_score(y_true=y_train, y_pred=load_train_pred)
load_valid_acc = accuracy_score(y_true=y_valid, y_pred=load_valid_pred)

print("Load Model Train Accuracy :", load_train_acc)
print("Load Model Valid Accuracy :", load_valid_acc)
```
