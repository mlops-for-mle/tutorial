---
sidebar_position: 3
---


# How to Contribute

## Code Sync
`ML Engineer 를 위한 MLOps` 는 전체 코드를 두 레포에서 관리합니다.  
코드의 수정이 있을 경우 양 레포 모두에 수정하는 PR을 작성해주셔야 합니다.
- [Code Repo](https://github.com/mlops-for-mle/mlops-for-mle)
- [Tutorial Repo](https://github.com/mlops-for-mle/tutorial)


## Table of Contents
1. 전체 단위는 파트, 챕터 순으로 작아진다.
    - 파트는 `01.` , `02.` 와 같이 `XX.` 으로 작성한다.
    - 챕터는 `1)`, `2)` 와 같이 `X)` 로 작성한다.
2. 이전 파트 혹은 챕터를 언급해야 할 경우 다음과 같이 작성한다.
    - 문서 최상단에 `import { Chapter, Part } from '@site/src/components/Highlight';` 를 입력한다.
    - `<Chapter>2) Save Model to Registry</Chapter>` 와 같이 작성한다.\
3. 파트의 구성은 다음과 같이 한다.
    - 모든 파트의 시작 챕터는 `0) Overview` 이다.
        - 여기서는 파트 전체에서 배울 내용의 구조도를 작성한다.
        - 단, 실습 코드가 없는 경우에는 `0) Overview` 가 없어도 된다.
    - 각 챕터의 이름은 영어 명사구로 한다.
4. 챕터의 구성은 다음과 같이 한다.
    - 목표: 여기서 뭘 배울 건지
        - 목표는 1,2,3 으로 넘버링한다.
    - 스펙 명세서: 우리는 여기서 db 이름은 `mydatabase` 로 할거다..
        - 스펙 명세서는 다음과 같이 작성한다.
            1. 스펙 1
                - 스펙 1 구체 내용 A
                - 스펙 1 구체 내용 B
            2. 스펙 2
            3. 스펙 3
    - 해설

## Tone & Manner

1. 한글로 작성했을 때 어색한 영어 단어는 최대한 영어로 작성한다. 이 때 영어 단어 이후 한 칸을 띈 후에 한글을 작성한다.
    - ~~영어한글 → API에서~~
    - 영어 한글 → API 에서
2. 코드 스타일
    - python code는 복붙해서 주피터 노트북에서 실행되는 형태로 한다.
        - `print(df)`
    - bash 코드는 앞에 `$` 붙이기
    - 코드는 하나씩 설명하되 마지막에 코드를 모아서 작성한다.
3. 해설
    - Argument 에 대한 해석은 최초 한번만 합니다. 이후에는 추가적인 설명이 필요하지 않을 경우 설명하지 않습니다.
