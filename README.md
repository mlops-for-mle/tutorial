# MLOps for MLE Tutorial

"머신러닝 엔지니어를 위한 MLOps" 튜토리얼 문서가 있는 레포입니다.

## How to start

### Installation

이 레포는 [Docusaurus 2](https://docusaurus.io/) 로 build 되며 백엔드는 npm을 사용합니다.

MacOS를 기준으로 설명하겠습니다.

`npm`을 설치합니다.
```bash
$ brew install npm
```

`yarn`을 설치합니다.
```bash
$ npm install --global yarn
```

`docusaurus`를 설치합니다.
```bash
$ yarn add docusaurus --dev
```

### Check local build

수정한 후 로컬에서 실행이 되는지 확인합니다.

```bash
$ npm run start
```

### pre-commit

pre-commit 을 통과하는지 확인합니다.

```bash
$ pre-commit run --all-files
```

## How to Contribute?
TBD
