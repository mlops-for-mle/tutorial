"use strict";(self.webpackChunktemp=self.webpackChunktemp||[]).push([[3256],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),c=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(o.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),u=c(n),k=r,m=u["".concat(o,".").concat(k)]||u[k]||s[k]||i;return n?a.createElement(m,l(l({ref:t},d),{},{components:n})):a.createElement(m,l({ref:t},d))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=u;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,l[1]=p;for(var c=2;c<i;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1324:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>s,frontMatter:()=>i,metadata:()=>p,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const i={sidebar_position:4},l="4) FastAPI on Docker",p={unversionedId:"fastapi/fastapi-on-docker",id:"fastapi/fastapi-on-docker",title:"4) FastAPI on Docker",description:"\ubaa9\ud45c",source:"@site/docs/fastapi/fastapi-on-docker.md",sourceDirName:"fastapi",slug:"/fastapi/fastapi-on-docker",permalink:"/tutorial/docs/fastapi/fastapi-on-docker",draft:!1,editUrl:"https://github.com/mlops-for-mle/tutorial/tree/main/docs/fastapi/fastapi-on-docker.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"3) FastAPI CRUD (Pydantic)",permalink:"/tutorial/docs/fastapi/fasapi-crud-pydantic"},next:{title:"06. Model Deployment",permalink:"/tutorial/docs/category/06-model-deployment"}},o={},c=[{value:"\ubaa9\ud45c",id:"\ubaa9\ud45c",level:2},{value:"\uc2a4\ud399 \uba85\uc138\uc11c",id:"\uc2a4\ud399-\uba85\uc138\uc11c",level:2},{value:"1. Dockerfile \uc791\uc131",id:"1-dockerfile-\uc791\uc131",level:2},{value:"1.1 Dockerfile",id:"11-dockerfile",level:3},{value:"1.2 Build",id:"12-build",level:3},{value:"1.3 Run",id:"13-run",level:3},{value:"2. API \uc11c\ubc84 \uc811\uc18d\ud558\uc5ec \uc791\ub3d9 \ud655\uc778",id:"2-api-\uc11c\ubc84-\uc811\uc18d\ud558\uc5ec-\uc791\ub3d9-\ud655\uc778",level:2}],d={toc:c};function s(e){let{components:t,...i}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"4-fastapi-on-docker"},"4) FastAPI on Docker"),(0,r.kt)("h2",{id:"\ubaa9\ud45c"},"\ubaa9\ud45c"),(0,r.kt)("p",null,"\uc55e\uc11c \uc791\uc131\ud55c API \ub97c \ub3c4\ucee4\ub97c \uc774\uc6a9\ud558\uc5ec \uc2e4\ud589\ud569\ub2c8\ub2e4."),(0,r.kt)("h2",{id:"\uc2a4\ud399-\uba85\uc138\uc11c"},"\uc2a4\ud399 \uba85\uc138\uc11c"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\uc55e\uc11c Pydantic \uc744 \uc774\uc6a9\ud558\uc5ec \uc218\uc815\ud55c API \ub97c \uc11c\ubc84\ub85c \uc2e4\ud589\ud558\uae30 \uc704\ud574 ",(0,r.kt)("inlineCode",{parentName:"li"},"Dockerfile")," \uc744 \uc791\uc131\ud569\ub2c8\ub2e4.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Base image\ub294 ",(0,r.kt)("inlineCode",{parentName:"li"},"amd64/python:3.9-slim")," \uc744 \uc0ac\uc6a9\ud569\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"crud_pydantic.py")," \ub97c \uc774\uc6a9\ud569\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},"\ud3ec\ud2b8\ub294 default \ud3ec\ud2b8\uc778 ",(0,r.kt)("inlineCode",{parentName:"li"},"8000"),"\ubc88 \ud3ec\ud2b8\ub97c \uc774\uc6a9\ud569\ub2c8\ub2e4."))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("a",{parentName:"li",href:"http://localhost:8000/docs"},(0,r.kt)("inlineCode",{parentName:"a"},"http://localhost:8000/docs"))," \uc5d0 \uc811\uc18d\ud558\uc5ec \uc55e\uc11c \uc218\ud589\ud55c \uc2dc\ub098\ub9ac\uc624 \ub4f1\uc774 \uc81c\ub300\ub85c \uc791\ub3d9\ud558\ub294\uc9c0 \ud655\uc778\ud569\ub2c8\ub2e4.")),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"1-dockerfile-\uc791\uc131"},"1. Dockerfile \uc791\uc131"),(0,r.kt)("h3",{id:"11-dockerfile"},"1.1 Dockerfile"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Dockerfile")," \uc744 \uc774\uc6a9\ud558\uc5ec \uc55e\uc11c Pydantic \uc744 \uc774\uc6a9\ud558\uc5ec \uc218\uc815\ud55c API \ub97c \uc791\ub3d9\uc2dc\ud0ac \uc218 \uc788\ub294 API \uc11c\ubc84\uc758 \ub3c4\ucee4 \uc774\ubbf8\uc9c0\ub97c \ub9cc\ub4e4\uc5b4\ubcf4\uaca0\uc2b5\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-docker"},'FROM amd64/python:3.9-slim\n\nWORKDIR /usr/app\n\nRUN pip install -U pip \\\n    && pip install "fastapi[all]"\n\nCOPY crud_pydantic.py crud_pydantic.py\n\nCMD ["uvicorn", "crud_pydantic:app", "--host", "0.0.0.0", "--reload"]\n')),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"FROM")," : Base image \ub85c\ub294 ",(0,r.kt)("inlineCode",{parentName:"li"},"amd64/python:3.9-slim")," \uc744 \uc0ac\uc6a9\ud558\ub3c4\ub85d \ud558\uaca0\uc2b5\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"WORKDIR")," : \uc791\uc5c5 directory \ub294 ",(0,r.kt)("inlineCode",{parentName:"li"},"/usr/app")," \uc73c\ub85c \uc9c0\uc815\ud569\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"RUN")," : ",(0,r.kt)("inlineCode",{parentName:"li"},"pip")," \ub97c \uba3c\uc800 \uc5c5\ub370\uc774\ud2b8\ud55c \ud6c4\uc5d0 ",(0,r.kt)("inlineCode",{parentName:"li"},"fastapi[all]")," \uc744 \uc124\uce58\ud569\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"COPY")," : Pydantic \uc744 \uc774\uc6a9\ud558\uc5ec \uc218\uc815\ud55c API \uc758 \ucf54\ub4dc\uac00 \ub2f4\uaca8 \uc788\ub294 ",(0,r.kt)("inlineCode",{parentName:"li"},"crud_paydantic.py")," \ub97c \ucee8\ud14c\uc774\ub108 \ub0b4\ubd80\ub85c \ubcf5\uc0ac\ud569\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"CMD")," : \ucee8\ud14c\uc774\ub108\uac00 \uc2e4\ud589\ub420 \ub54c \uc218\ud589\ud560 \uba85\ub839\uc5b4\uc758 \uae30\ubcf8\uac12\uc744 \uc801\uc5b4\uc90d\ub2c8\ub2e4. \uc5ec\uae30\uc5d0\uc11c\ub294 ",(0,r.kt)("inlineCode",{parentName:"li"},"uvicorn")," \uc744 \uc774\uc6a9\ud574 ",(0,r.kt)("inlineCode",{parentName:"li"},"crud_pydantic.py")," \uc5d0\uc11c \ub9cc\ub4e0 FastAPI \uc758 \uac1d\uccb4 ",(0,r.kt)("inlineCode",{parentName:"li"},"app")," \uc744 \uc2e4\ud589\ud574 \uc90d\ub2c8\ub2e4.")),(0,r.kt)("h3",{id:"12-build"},"1.2 Build"),(0,r.kt)("p",null,"\uc791\uc131\ud55c ",(0,r.kt)("inlineCode",{parentName:"p"},"Dockerfile")," \uc744 \uc774\uc6a9\ud574 \uc774\ubbf8\uc9c0\ub97c build \ud569\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uc774\ubbf8\uc9c0 \uc774\ub984\uc740 ",(0,r.kt)("inlineCode",{parentName:"p"},"ch5-api-server")," \ub85c \ud558\uaca0\uc2b5\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker build -f Dockerfile -t ch5-api-server .\n")),(0,r.kt)("p",null,"\uc774\ubbf8\uc9c0\uac00 \uc798 \uc0dd\uc131\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker image ls\n")),(0,r.kt)("p",null,"\ub2e4\uc74c\uacfc \uac19\uc774 ",(0,r.kt)("inlineCode",{parentName:"p"},"ch5-api-server")," \uc774\ubbf8\uc9c0\uac00 \uc798 \uc0dd\uc131\ub418\uc5c8\uc74c\uc744 \ud655\uc778\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker image ls\nREPOSITORY                  TAG       IMAGE ID       CREATED         SIZE\nch5-api-server             latest    3dec4bf727fe   3 hours ago     249MB\n")),(0,r.kt)("h3",{id:"13-run"},"1.3 Run"),(0,r.kt)("p",null,"\uc774\uc81c build \ud55c \uc774\ubbf8\uc9c0\ub97c \uc2e4\ud589\ud574 \ubcf4\uaca0\uc2b5\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker run \\\n  --name api-server \\\n  -p 8000:8000 \\\n  -d \\\n  ch5-api-server\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"--name")," : \ucee8\ud14c\uc774\ub108\uc758 \uc774\ub984\uc744 ",(0,r.kt)("inlineCode",{parentName:"li"},"api-server")," \ub85c \uc124\uc815\ud569\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"-p")," : \ud3ec\ud2b8 \ud3ec\uc6cc\ub529\uc744 ",(0,r.kt)("inlineCode",{parentName:"li"},"8000")," \ubc88 \ud3ec\ud2b8\uc5d0\uc11c ",(0,r.kt)("inlineCode",{parentName:"li"},"8000")," \ubc88 \ud3ec\ud2b8\ub85c \uc124\uc815\ud569\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"-d")," : \ucee8\ud14c\uc774\ub108\ub97c detach mode \ub85c \uc2e4\ud589\ud569\ub2c8\ub2e4. Detach mode \ub780 \ubc31\uadf8\ub77c\uc6b4\ub4dc\uc5d0\uc11c \uc2e4\ud589\ud558\ub294 \uac83\uc744 \uc758\ubbf8\ud569\ub2c8\ub2e4.")),(0,r.kt)("p",null,"\uc774\uc81c \ucee8\ud14c\uc774\ub108\uac00 \uc798 \uc2e4\ud589\ub418\uace0 \uc788\ub294\uc9c0 \ud655\uc778\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ docker ps\n")),(0,r.kt)("p",null,"\uc704\uc758 \uba85\ub839\uc5b4\ub97c \uc2e4\ud589\ud574\ubcf4\uba74 ",(0,r.kt)("inlineCode",{parentName:"p"},"api-server")," \ub77c\ub294 \uc774\ub984\uc744 \uac00\uc9c4 \ucee8\ud14c\uc774\ub108\uac00 \uc2e4\ud589\ub418\uace0 \uc788\uc74c\uc744 \ud655\uc778\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'$ docker ps\nCONTAINER ID   IMAGE             COMMAND                  CREATED          STATUS          PORTS                    NAMES\nfb72ccf8fb47   ch5-api-server   "uvicorn crud_pydant\u2026"   13 minutes ago   Up 13 minutes   0.0.0.0:8000->8000/tcp   api-server\n')),(0,r.kt)("h2",{id:"2-api-\uc11c\ubc84-\uc811\uc18d\ud558\uc5ec-\uc791\ub3d9-\ud655\uc778"},"2. API \uc11c\ubc84 \uc811\uc18d\ud558\uc5ec \uc791\ub3d9 \ud655\uc778"),(0,r.kt)("p",null,"\uc774\uc81c FastAPI \ub97c \ud1b5\ud574 \ub9cc\ub4e0 API \uc11c\ubc84\uac00 \uc798 \uc791\ub3d9\ud558\ub294\uc9c0 \ud655\uc778\ud574 \ubcf4\uaca0\uc2b5\ub2c8\ub2e4.\nAPI \uc11c\ubc84 \ucee8\ud14c\uc774\ub108\ub97c \uc2e4\ud589\ud560 \ub54c \ud3ec\ud2b8 \ud3ec\uc6cc\ub529\uc744 ",(0,r.kt)("inlineCode",{parentName:"p"},"8000")," \ubc88\uc5d0\uc11c ",(0,r.kt)("inlineCode",{parentName:"p"},"8000")," \ubc88\uc73c\ub85c \ud588\uc73c\ubbc0\ub85c ",(0,r.kt)("inlineCode",{parentName:"p"},"8000")," \ubc88 \ud3ec\ud2b8\ub85c \uc811\uc18d\ud558\uba74 API \uc11c\ubc84\ub85c \uc811\uc18d\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.\nFastAPI \uc5d0\uc11c \uc81c\uacf5\ud558\ub294 ",(0,r.kt)("a",{parentName:"p",href:"https://fastapi.tiangolo.com/tutorial/first-steps/#interactive-api-docs"},"Interactive API docs")," \uc5d0 \uc811\uc18d\ud558\ub824\uba74 URL \ub4a4\uc5d0 ",(0,r.kt)("inlineCode",{parentName:"p"},"/docs")," \ub97c \ubd99\uc774\uba74 \ub429\ub2c8\ub2e4."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"http://localhost:8000/docs"},(0,r.kt)("inlineCode",{parentName:"a"},"http://localhost:8000/docs"))," \uc5d0 \uc811\uc18d\ud558\uba74 \ub2e4\uc74c\uacfc \uac19\uc774 \uc811\uc18d\uc774 \ub418\ub294 \uac83\uc744 \ud655\uc778\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("div",{style:{textAlign:"center"}},(0,r.kt)("p",null,(0,r.kt)("img",{alt:"API&#39;s Swagger UI Screen",src:n(11).Z,width:"4336",height:"2794"}),"\n","[\uadf8\ub9bc 5-4]"," \uc791\uc131\ud55c API\uc758 Swagger UI \ud654\uba74")),(0,r.kt)("p",null,"\uc774 \ud654\uba74\uc5d0\uc11c \uc55e\uc11c \uc218\ud589\ud55c \uc2dc\ub098\ub9ac\uc624\uc640 \uac19\uc740 \ub2e4\uc591\ud55c \uc791\uc5c5\uc744 \ud574 \ubcf4\uba74, \ub9cc\ub4e0 API \uac00 \uc81c\ub300\ub85c \uc791\ub3d9\ud558\ub294 \uac83\uc744 \ud655\uc778\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."))}s.isMDXComponent=!0},11:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/fastapi-4-40852c01d7bb915c18a8d70d2b469f12.png"}}]);