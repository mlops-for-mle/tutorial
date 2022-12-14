---
sidebar_position: 3
---

# How to Contribute

## Code Sync

ML Engineer 를 위한 MLOps 는 전체 코드를 두 레포에서 관리합니다.  

코드의 수정이 있을 경우 양 레포 모두에 수정하는 PR을 작성해주셔야 합니다.
- [Code Repo](https://github.com/mlops-for-mle/mlops-for-mle)
- [Tutorial Repo](https://github.com/mlops-for-mle/tutorial)

## Table of Contents

1. 전체 단위는 파트, 챕터 순으로 작아집니다.
    - 파트는 `01.` , `02.` 와 같이 `XX.` 으로 작성합니다.
    - 챕터는 `1)`, `2)` 와 같이 `X)` 로 작성합니다.
2. 이전 파트 혹은 챕터를 언급해야 할 경우 다음과 같이 작성합니다.
    - 문서 최상단에 `import { Chapter, Part } from '@site/src/components/Highlight';` 를 입력합니다.
    - 파트의 경우 `<Part>01. Database</Part>` 와 같이 작성합니다.
    - 챕터의 경우 `<Chapter>2) Save Model to Registry</Chapter>` 와 같이 작성합니다.
3. 파트의 구성은 다음과 같이 합니다.
    - 모든 파트의 시작 챕터는 `0) Overview` 입니다.
        - 여기서는 파트 전체에서 배울 내용의 전반적이 셜명과 구조에 대한 이미지를 작성합니다.
        - 단, 실습 코드가 없는 경우에는 `0) Overview` 가 없어도 됩니다.
    - 각 챕터의 이름은 영어 명사구로 작성합니다.
4. 챕터의 구성은 다음과 같이 작성합니다.
    - 목표: 여기서 무엇을 배울 건지?
        - 목표는 1,2,3 으로 넘버링합니다.
    - 스펙 명세서
        - 스펙 명세서는 다음과 같이 작성합니다.
            1. 스펙 1
                - 스펙 1의 구체적인 내용 A
                - 스펙 1의 구체적인 내용 B
            2. 스펙 2
            3. 스펙 3
        - e.g) DB 이름은 `mydatabase` 로 하겠습니다.
    - 해설

## Tone & Manner

1. 한글로 작성했을 때 어색한 영어 단어는 최대한 영어로 작성합니다. 이 때 영어 단어 이후 한 칸을 띈 후에 한글을 작성한다.
    - ~~영어한글 → API에서~~ 🙅🏻‍♂️
    - 영어 한글 → API 에서 🙆🏻‍♂️
2. 코드 스타일
    - Python code 는 복붙해서 주피터 노트북에서 실행되는 형태로 합니다.
        - `print(df)`
    - Bash 코드는 앞에 `$` 붙여 명시합니다.
        - 다음과 같이 작성하여 명시할 수 있습니다.
        ```md
        # terminal-command
        your-command
        ```
        - 출력은 다음과 같이 됩니다.
        ```bash
        $ your-command
        ```
    - 코드는 해설에 적당한 크기로 끊어서 설명하되 마지막에 코드를 모아서 작성합니다.
3. 변수에 대한 해석
    - 변수에 대한 해석 및 설명은 최초에 한번만 진행합니다.
    - 예를 들어, Docker Network 에 대한 설명이 앞장에 있다면 다시 설명하지 않고 넘어갑니다.
    - 단, 앞장에서의 상황과 차이점이 발생하는 경우 설명을 추가합니다. 
4. 글꼴 및 문법
    - **bold** 는 사용하지 않습니다.
    - *Italic* 는 * 또는 <code>&lt;var&gt;key&lt;/var&gt;</code> 태그로 단어나 문장을 감싸 표현합니다.
    - `코드 블럭` 을 사용하는 경우
        - Python, shell script, Dockerfile, 파일 제목 등 실제로 코드에 작성되는 내용들은 모두 `코드 블럭` 으로 표현합니다.
        - DB 테이블 이름, MLflow 의 구성요소 이름과 같이 시스템을 구성하는 요소의 이름도 `코드 블럭` 으로 표현합니다.
        - `코드 블럭` 은 ` 또는 <code>&lt;code&gt;value&lt;/code&gt;</code> 태그로 단어나 문장을 감싸 표현합니다.
    - 단 colon(`:`)을 사용하는 경우 colon 을 기준으로 왼쪽은 *Italic* 오른쪽은 `코드 블럭` 을 사용합니다.
    - 영어 단어를 사용하는 경우, 일반 명사는 문장의 시작일 경우에만 대문자로 쓰고 나머지는 소문자로 작성합니다.
    - 기술 스택과 같은 영어 대명사의 경우, 모두 대문자로 시작하게 작성합니다.
