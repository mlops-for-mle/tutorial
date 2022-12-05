---
sidebar_position: 2
---

# 2) FastAPI CRUD

## 목표

1. FastAPI 를 이용해 CRUD 를 수행하는 API 를 작성합니다.
2. Path Parameter 와 Query Parameter 의 차이점에 대해 학습합니다.

## 스펙 명세서

1. 다음의 CRUD 기능을 수행하는 API 의 명세서를 **(a) Path Parameter** 를 이용한 방법과 **(b) Query Parameter** 를 이용한 방법으로 각각 작성합니다.
    - **C (Create)**
        - 이름과 별명을 입력하여 사용자를 생성합니다.
    - **R (Read)**
        - 이름을 입력하여 해당 이름을 가진 사용자의 별명을 반환합니다.
        - 입력된 이름이 존재하지 않는다면 `400 status code` 와 함께 `Name not found` 메세지를 반환합니다.
        - 이 때 `fastapi.HTTPException` 을 활용합니다. [[FastAPI Handling Errors](https://fastapi.tiangolo.com/tutorial/handling-errors/)]
    - **U (Update)**
        - 이름과 새로운 별명을 입력하여 해당 이름을 가진 사용자의 별명을 업데이트합니다.
        - 입력된 이름이 존재하지 않는다면 `400 status code` 와 함께 `Name not found` 메세지를 반환합니다.
    - **D (Delete)**
        - 이름을 입력하여 해당 이름을 가진 사용자의 정보를 삭제합니다.
        - 입력된 이름이 존재하지 않는다면 `400 status code` 와 함께 `Name not found` 메세지를 반환합니다.

2. 작성한 명세서를 FastAPI 를 이용해 **(a) Path Parameter** 를 이용한 방법과 **(b) Query Parameter** 를 이용한 방법으로 각각 구현합니다.

3. FastAPI 의 Swagger UI ([`http://localhost:8000/docs`](http://localhost:8000/docs)) 를 통해 다음의 시나리오가 잘 작동하는지 확인합니다.
    - **Create**

        - POST 를 통해 `{"name": "hello", "nickname": "world"}` 로 create 합니다.

            - `{"status": "success"}` 를 정상적으로 return 하는지 확인합니다.

    - **Read**

        - GET 을 통해 `{"name": "hello"}` 로 read 합니다.

            - `{"nickname": "world"}` 를 정상적으로 return 하는지 확인합니다.

        - GET 을 통해 `{"name": "hello2"}` 로 read 합니다.

            - `{"detail": "Name not found."}` 를 return 하며 400 error 가 발생하는지 확인합니다.

    - **Update**

        - PUT 을 통해 `{"name": "hello", "nickname": "world"}` 로 update 합니다.

            - `{"status": "success"}` 를 정상적으로 return 하는지 확인합니다.

            - GET 을 통해 `{"name": "hello"}` 로 read 하여 정상적으로 `{"nickname": "world"}` 를 return 하는지 확인합니다.

        - PUT 을 통해 `{”name”: “hello”, “nickname”: “world2”}` 로 update 합니다.

            - `{"status": "success"}` 를 정상적으로 return 하는지 확인합니다.

            - GET 을 통해 `{"name": "hello"}` 로 read 하여 정상적으로 `{"nickname": "world2"}` 를 return 하는지 확인합니다.

        - PUT 을 통해 `{"name": "hello2", "nickname": "world2"}` 로 update 합니다.

            - `{"detail": "Name not found."}` 를 return 하며 400 error 가 발생하는지 확인합니다.

    - **Delete**

        - DELETE 를 통해 `{"name": "hello"}` 로 delete 합니다.

            - `{"status": "success"}` 를 정상적으로 return 하는지 확인합니다.

            - GET 을 통해 `{"name": "hello"}` 로 read 하여 `{"detail": "Name not found."}` 를 return 하며 400 error 가 발생하는지 확인합니다.

        - DELETE 를 통해 `{"name": "hello2"}` 로 delete 합니다.

            - `{"detail": "Name not found."}` 를 return 하며 400 error 가 발생하는지 확인합니다.

4. **Path parameter** 를 이용한 방법과 **Query parameter** 를 이용한 방법에 어떠한 차이가 있는지 확인합니다.

---

## 1. API 명세서 작성

주어진 CRUD 를 수행하는 API 의 명세서를 다음과 같이 작성할 수 있습니다.

### 1.1 Path Parameter 이용

Path Parameter 의 경우 각 API 에서 사용되는 파라미터를 Request Header 에 넣어 전달합니다.

이를 고려하여 명세서를 작성하면 다음과 같습니다.

1. Create

    이름과 별명을 입력하여 사용자를 생성합니다.
    
    | Request Header | Request Body | Response Body |
    | --- | --- | --- |
    | POST /users/name/{name}/nickname/{nickname} | {} | {<br/>&emsp;“status”: “success”&emsp;<br/>} |

2. Read
    
    이름을 입력하여 해당 이름을 가진 사용자의 별명을 반환합니다.
    
    | Request Header | Request Body | Response Body |
    | --- | --- | --- |
    | GET /users/name/{name} | {} | {<br/>&emsp;“nickname”: “world”&emsp;<br/>} |

3. Update
    
    이름과 새로운 별명을 입력하여 해당 이름을 가진 사용자의 별명을 업데이트합니다.
    
    | Request Header | Request Body | Response Body |
    | --- | --- | --- |
    | PUT /users/name/{name}/nickname/{nickname} | {} | {<br/>&emsp;“status”: “success”&emsp;<br/>} |

4. Delete
    
    이름을 입력하여 해당 이름을 가진 사용자의 정보를 삭제합니다.
    
    | Request Header | Request Body | Response Body |
    | --- | --- | --- |
    | DELETE /users/name/{name} | {} | {<br/>&emsp;“status”: “success”&emsp;<br/>} |

### 1.2 Query Parameter 이용

Query Parameter 의 경우 각 API 에서 사용되는 파라미터를 Request Body 에 넣어 전달합니다.

이를 고려하여 명세서를 작성하면 다음과 같습니다.

1. Create
    
    이름과 별명을 입력하여 사용자를 생성합니다.
    
    | Request Header | Request Body | Response Body |
    | --- | --- | --- |
    | POST /users | {<br/>&emsp;”name”: “hello”,<br/>&emsp;“nickname”: “world”&emsp;<br/>} | {<br/>&emsp;“status”: “success”&emsp;<br/>} |

2. Read
    
    이름을 입력하여 해당 이름을 가진 사용자의 별명을 반환합니다.
    
    | Request Header | Request Body | Response Body |
    | --- | --- | --- |
    | GET /users | {<br/>&emsp;”name”: “hello”&emsp;<br/>} | {<br/>&emsp;“nickname”: “world”&emsp;<br/>} |

3. Update
    
    이름과 새로운 별명을 입력하여 해당 이름을 가진 사용자의 별명을 업데이트합니다.
    
    | Request Header | Request Body | Response Body |
    | --- | --- | --- |
    | PUT /users | {<br/>&emsp;”name”: “hello”,<br/>&emsp;“nickname”: “world2”&emsp;<br/>} | {<br/>&emsp;“status”: “success”&emsp;<br/>} |

4. Delete
    
    이름을 입력하여 해당 이름을 가진 사용자의 정보를 삭제합니다.
    
    | Request Header | Request Body | Response Body |
    | --- | --- | --- |
    | DELETE /users | {<br/>&emsp;”name”: “hello”&emsp;<br/>} | {<br/>&emsp;“status”: “success”&emsp;<br/>} |

## 2. API 구현

작성한 명세서를 FastAPI 를 이용해 구현합니다.

다음과 같이 FastAPI 클래스의 instance 를 생성한 후 입력받은 데이터를 저장할 수 있도록 `USER_DB` 를 생성합니다.

또한, 메모리에 존재하지 않는 이름에 대한 요청이 들어온 경우에 에러를 발생할 수 있도록 `HTTPException` 을 이용하여 `NAME_NOT_FOUND` 를 선언합니다.

```python
from fastapi import FastAPI, HTTPException

# Create a FastAPI instance
app = FastAPI()

# User database
USER_DB = {}

# Fail response
NAME_NOT_FOUND = HTTPException(status_code=400, detail="Name not found.")
```

### 2.1 Path Parameter 이용

#### 2.1.1 구현

1. Create
    
    이름과 별명을 입력 받아 `USER_DB` 에 정보를 저장하고 상태 정보를 return 합니다.
    
    ```python
    @app.post("/users/name/{name}/nickname/{nickname}")
    def create_user(name: str, nickname: str):
        USER_DB[name] = nickname
        return {"status": "success"}
    ```
    
2. Read
    
    이름을 입력 받아 `USER_DB` 에서 별명을 찾아 return 합니다.
    
    ```python
    @app.get("/users/name/{name}")
    def read_user(name: str):
        if name not in USER_DB:
            raise NAME_NOT_FOUND
        return {"nickname": USER_DB[name]}
    ```
    
3. Update
    
    이름과 새로운 별명을 입력 받아 `USER_DB` 의 정보를 업데이트하고 상태 정보를 return 합니다.
    
    ```python
    @app.put("/users/name/{name}/nickname/{nickname}")
    def update_user(name: str, nickname: str):
        if name not in USER_DB:
            raise NAME_NOT_FOUND
        USER_DB[name] = nickname
        return {"status": "success"}
    ```
    
4. Delete
    
    이름을 입력 받아 `USER_DB` 에서 정보를 삭제하고 상태 정보를 return 합니다.
    
    ```python
    @app.delete("/users/name/{name}")
    def delete_user(name: str):
        if name not in USER_DB:
            raise NAME_NOT_FOUND
        del USER_DB[name]
        return {"status": "success"}
    ```

#### 2.1.2 `crud_path.py`

위에서 작성한 코드를 모으면 아래와 같습니다.

```python
# crud_path.py
from fastapi import FastAPI, HTTPException

# Create a FastAPI instance
app = FastAPI()

# User database
USER_DB = {}

# Fail response
NAME_NOT_FOUND = HTTPException(status_code=400, detail="Name not found.")


@app.post("/users/name/{name}/nickname/{nickname}")
def create_user(name: str, nickname: str):
    USER_DB[name] = nickname
    return {"status": "success"}


@app.get("/users/name/{name}")
def read_user(name: str):
    if name not in USER_DB:
        raise NAME_NOT_FOUND
    return {"nickname": USER_DB[name]}


@app.put("/users/name/{name}/nickname/{nickname}")
def update_user(name: str, nickname: str):
    if name not in USER_DB:
        raise NAME_NOT_FOUND
    USER_DB[name] = nickname
    return {"status": "success"}


@app.delete("/users/name/{name}")
def delete_user(name: str):
    if name not in USER_DB:
        raise NAME_NOT_FOUND
    del USER_DB[name]
    return {"status": "success"}
```

### 2.2 Query Parameter 이용

#### 2.2.1 구현

1. Create
    
    이름과 별명을 입력 받아 `USER_DB` 에 정보를 저장하고 상태 정보를 return 합니다.
    
    ```python
    @app.post("/users")
    def create_user(name: str, nickname: str):
        USER_DB[name] = nickname
        return {"status": "success"}
    ```
    
2. Read
    
    이름을 입력 받아 `USER_DB` 에서 별명을 찾아 return 합니다.
    
    ```python
    @app.get("/users")
    def read_user(name: str):
        if name not in USER_DB:
            raise NAME_NOT_FOUND
        return {"nickname": USER_DB[name]}
    ```
    
3. Update
    
    이름과 새로운 별명을 입력 받아 `USER_DB` 의 정보를 업데이트하고 상태 정보를 return 합니다.
    
    ```python
    @app.put("/users")
    def update_user(name: str, nickname: str):
        if name not in USER_DB:
            raise NAME_NOT_FOUND
        USER_DB[name] = nickname
        return {"status": "success"}
    ```
    
4. Delete
    
    이름을 입력 받아 `USER_DB` 에서 정보를 삭제하고 상태 정보를 return 합니다.
    
    ```python
    @app.delete("/users")
    def delete_user(name: str):
        if name not in USER_DB:
            raise NAME_NOT_FOUND
        del USER_DB[name]
        return {"status": "success"}
    ```
    

#### 2.2.2 `crud_query.py`

위에서 작성한 코드를 모으면 아래와 같습니다.

```python
# crud_query.py
from fastapi import FastAPI, HTTPException

# Create a FastAPI instance
app = FastAPI()

# User database
USER_DB = {}

# Fail response
NAME_NOT_FOUND = HTTPException(status_code=400, detail="Name not found.")


@app.post("/users")
def create_user(name: str, nickname: str):
    USER_DB[name] = nickname
    return {"status": "success"}


@app.get("/users")
def read_user(name: str):
    if name not in USER_DB:
        raise NAME_NOT_FOUND
    return {"nickname": USER_DB[name]}


@app.put("/users")
def update_user(name: str, nickname: str):
    if name not in USER_DB:
        raise NAME_NOT_FOUND
    USER_DB[name] = nickname
    return {"status": "success"}


@app.delete("/users")
def delete_user(name: str):
    if name not in USER_DB:
        raise NAME_NOT_FOUND
    del USER_DB[name]
    return {"status": "success"}
```

## 3. API 테스트

`http://localhost:8000/docs`를 통해 FastAPI 의 Swagger UI 에 접속하여 다음의 시나리오가 잘 작동하는지 확인합니다.

1. **Create**

    - POST 를 통해 `{"name": "hello", "nickname": "world"}` 로 create 합니다.

        - `{"status": "success"}` 를 정상적으로 return 하는지 확인합니다.

2. **Read**

    - GET 을 통해 `{"name": "hello"}` 로 read 합니다.

        - `{"nickname": "world"}` 를 정상적으로 return 하는지 확인합니다.

    - GET 을 통해 `{"name": "hello2"}` 로 read 합니다.

        - `{"detail": "Name not found."}` 를 return 하며 400 error 가 발생하는지 확인합니다.

3. **Update**

    - PUT 을 통해 `{"name": "hello", "nickname": "world"}` 로 update 합니다.

        - `{"status": "success"}` 를 정상적으로 return 하는지 확인합니다.

        - GET 을 통해 `{"name": "hello"}` 로 read 하여 정상적으로 `{"nickname": "world"}` 를 return 하는지 확인합니다.

    - PUT 을 통해 `{”name”: “hello”, “nickname”: “world2”}` 로 update 합니다.

        - `{"status": "success"}` 를 정상적으로 return 하는지 확인합니다.

        - GET 을 통해 `{"name": "hello"}` 로 read 하여 정상적으로 `{"nickname": "world2"}` 를 return 하는지 확인합니다.

    - PUT 을 통해 `{"name": "hello2", "nickname": "world2"}` 로 update 합니다.

        - `{"detail": "Name not found."}` 를 return 하며 400 error 가 발생하는지 확인합니다.

4. **Delete**

    - DELETE 를 통해 `{"name": "hello"}` 로 delete 합니다.

        - `{"status": "success"}` 를 정상적으로 return 하는지 확인합니다.

        - GET 을 통해 `{"name": "hello"}` 로 read 하여 `{"detail": "Name not found."}` 를 return 하며 400 error 가 발생하는지 확인합니다.

    - DELETE 를 통해 `{"name": "hello2"}` 로 delete 합니다.

        - `{"detail": "Name not found."}` 를 return 하며 400 error 가 발생하는지 확인합니다.

## 4. Path Parameter vs Query Parameter

Path Parameter 를 이용한 API 에서는 path 에 변수의 값을 저장하여 함수에 전달합니다.

반면, Query Parameter 를 이용한 API 에서는 path 에 변수의 값을 저장하지 않기 때문에 request body 를 통해 데이터를 전달합니다.
