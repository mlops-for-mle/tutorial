---
sidebar_position: 1
---

# 1) DB Server Creation

## 목표

1. Docker 를 이용해 postgres server 를 생성합니다.
2. 생성된 DB 의 role name 과 attributes 를 확인합니다.

## 스펙 명세서

1. Docker 를 설치합니다.
2. Postgres 서버를 생성합니다.
    - `POSTGRES_USER` : `myuser`
    - `POSTGRES_PASSWORD` : `mypassword`
    - `POSTGRES_DB` : `mydatabase`
    - `Port forwarding` : `5432:5432`
3. 생성된 postgres 서버를 확인합니다.
    - `psql` 로 DB 에 접근하여 role name 과 attributes 확인

---

## 1. Docker 설치
### 1.1 Docker Desktop
- 아래의 링크를 통해 각 OS 에 맞는 docker desktop 을 설치합니다.  
    [Docker: Accelerated, Containerized Application Development](https://www.docker.com/)

### 1.2 Docker Engine
- ubuntu에서 desktop 형태가 아닌 engine 형태로 설치하고 싶을 경우, 아래의 방법을 통해 설치합니다.  
    [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

#### 1.2.1 Repository 를 통한 설치

1. Docker 를 설치하기 위해 필요한 apt 패키지를 업데이트합니다.
    
    ```bash
    $ sudo apt-get update
    
    $ sudo apt-get install \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
    ```
    
2. Docker 의 공식 GPG 키를 추가합니다.
    
    ```bash
    $ sudo mkdir -p /etc/apt/keyrings
    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg`
    ```
    
3. Docker 에서 배포한 stable 버전을 설치하도록 repository를 추가합니다.
    
    ```bash
    $ echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```
    

#### 1.2.2 Docker Engine 설치

1. `apt` 패키지 인덱스를 업데이트 합니다.
    
    ```bash
    $ sudo apt-get update
    ```
    
2. Docker Engine, containerd, Docker Compose 을 설치합니다.
    
    ```bash
     $ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    ```
    
3. Docker Engine 이 정상적으로 설치되었는지 확인합니다.
    
    ```bash
    $ sudo docker run hello-world
    ```
    
    정상적으로 설치된 경우 다음과 같이 출력 됩니다.
    
    ```
    Unable to find image 'hello-world:latest' locally
    latest: Pulling from library/hello-world
    7050e35b49f5: Pull complete
    Digest: sha256:faa03e786c97f07ef34423fccceeec2398ec8a5759259f94d99078f264e9d7af
    Status: Downloaded newer image for hello-world:latest
    
    Hello from Docker!
    This message shows that your installation appears to be working correctly.
    
    To generate this message, Docker took the following steps:
     1. The Docker client contacted the Docker daemon.
     2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
        (arm64v8)
     3. The Docker daemon created a new container from that image which runs the
        executable that produces the output you are currently reading.
     4. The Docker daemon streamed that output to the Docker client, which sent it
        to your terminal.
    
    To try something more ambitious, you can run an Ubuntu container with:
     $ docker run -it ubuntu bash
    
    Share images, automate workflows, and more with a free Docker ID:
     https://hub.docker.com/
    
    For more examples and ideas, visit:
     https://docs.docker.com/get-started/
    ```
    

## 2. Postgres 서버 생성

`docker run` 명령어를 이용하면 간단한 옵션들을 통해 postres 서버를 생성할 수 있습니다.

`-d` 옵션을 사용하면 컨테이너가 detached 모드로 실행하게 되며, `-d` 옵션없이 실행했다면 해당 터미널에서 `Ctrl + C` 를 눌러서 빠져나오는 순간 해당 컨테이너는 종료됩니다.

```bash
$ docker run -d \
  --name postgres-server \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydatabase \
  -p 5432:5432 \
  postgres:14.0
```

- `—-name` : 컨테이너의 이름을 지정합니다. 여기서는 `postgres-server` 라는 이름을 사용하겠습니다.
- `-e` : 필요한 환경 변수를 설정합니다.
    - `POSTGRES_USER` : user 의 이름을 설정합니다. 여기서는 `myuser` 를 사용하겠습니다.
    - `POSTGRES_PASSWORD` : user 의 비밀번호를 설정합니다. 여기서는 `mypassword` 를 사용하겠습니다.
    - `POSTGRES_DB` : database 의 이름을 설정합니다. 여기서는 `mydatabase` 를 사용하겠습니다.
- `-p` : host 와 container 의 port 를 설정합니다. 형식은 `host:container` 으로 사용이 되며, 여기서는 `5432:5432` 로 설정하겠습니다.

`docker ps` 명령어를 통해 postres server 가 잘 생성되었는지 확인합니다.

```bash
$ docker ps
CONTAINER ID   IMAGE           COMMAND                  CREATED          STATUS          PORTS                    NAMES
13bd38add3e7   postgres:14.0   "docker-entrypoint.s…"   40 seconds ago   Up 39 seconds   0.0.0.0:5432->5432/tcp   postres-server
```

## 3. Postgres 서버 확인

`psql` 을 통해 생성된 DB 로 접속합니다.

```sql
$ psql -h localhost -p 5432 -U myuser -d mydatabase
Password for user myuser: 
psql (14.3, server 14.0 (Debian 14.0-1.pgdg110+1))
Type "help" for help.

mydatabase=#
```

- `-h` : host 를 지정합니다. 이 때 host 는 docker 에서 port forwarding 을 했기 때문에 `localhost` 를 입력합니다.
- `-p` : port 를 지정합니다. 여기서는 `5432` 를 입력합니다.
- `-U` : 접속할 user 이름을 입력합니다. 여기서는 `myuser` 를 통해 접속합니다.
- `-d` : database 의 이름을 입력합니다. 여기서는 `mydatabase` 를 입력합니다.

`\du` 를 통해 DB 의 role name 과 attributes 을 확인합니다.

```sql
mydatabase=# \du
List of roles
 Role name |                         Attributes                         | Member of 
-----------+------------------------------------------------------------+-----------
 myuser    | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
```
