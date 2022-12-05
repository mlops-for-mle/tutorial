"use strict";(self.webpackChunktemp=self.webpackChunktemp||[]).push([[6245],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),d=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=d(e.components);return a.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=d(n),m=r,_=u["".concat(p,".").concat(m)]||u[m]||c[m]||l;return n?a.createElement(_,o(o({ref:t},s),{},{components:n})):a.createElement(_,o({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=u;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var d=2;d<l;d++)o[d]=n[d];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3058:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>i,toc:()=>d});var a=n(7462),r=(n(7294),n(3905));const l={sidebar_position:4},o="4) Data Insertion Loop",i={unversionedId:"database/data-insertion-loop",id:"database/data-insertion-loop",title:"4) Data Insertion Loop",description:"\ubaa9\ud45c",source:"@site/docs/database/data-insertion-loop.md",sourceDirName:"database",slug:"/database/data-insertion-loop",permalink:"/tutorial/docs/database/data-insertion-loop",draft:!1,editUrl:"https://github.com/mlops-for-mle/tutorial/tree/main/docs/database/data-insertion-loop.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"3) Data Insertion",permalink:"/tutorial/docs/database/data-insertion"},next:{title:"5) Data Generator on Docker",permalink:"/tutorial/docs/database/data-generator-docker"}},p={},d=[{value:"\ubaa9\ud45c",id:"\ubaa9\ud45c",level:2},{value:"\uc2a4\ud399 \uba85\uc138\uc11c",id:"\uc2a4\ud399-\uba85\uc138\uc11c",level:2},{value:"1. \ub370\uc774\ud130 \uc0dd\uc131",id:"1-\ub370\uc774\ud130-\uc0dd\uc131",level:2},{value:"1.1 Generate Data",id:"11-generate-data",level:3},{value:"1.2 Query \uc2e4\ud589",id:"12-query-\uc2e4\ud589",level:3},{value:"1.2.1 <code>insert_data_loop.py</code>",id:"121-insert_data_looppy",level:4},{value:"1.2.2 \uc2e4\ud589",id:"122-\uc2e4\ud589",level:4},{value:"2. Data \ud655\uc778",id:"2-data-\ud655\uc778",level:2}],s={toc:d};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"4-data-insertion-loop"},"4) Data Insertion Loop"),(0,r.kt)("h2",{id:"\ubaa9\ud45c"},"\ubaa9\ud45c"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\uc0dd\uc131\ub41c \ud14c\uc774\ube14\uc548\uc5d0 \ub370\uc774\ud130\ub97c \uacc4\uc18d\ud574\uc11c \uc0dd\uc131\ud558\ub294 \uc2a4\ud06c\ub9bd\ud2b8\ub97c \uc791\uc131\ud569\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ol"},"DB \uc5d0 \ub370\uc774\ud130\uac00 \uacc4\uc18d\ud574\uc11c \uc0bd\uc785\ub418\uace0 \uc788\ub294\uc9c0 \ud655\uc778\ud569\ub2c8\ub2e4.")),(0,r.kt)("h2",{id:"\uc2a4\ud399-\uba85\uc138\uc11c"},"\uc2a4\ud399 \uba85\uc138\uc11c"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\uc774\uc804 \uc7a5\uc5d0\uc11c \uc791\uc131\ud55c \uc2a4\ud06c\ub9bd\ud2b8\ub97c \uc774\uc6a9\ud558\uc5ec \uacc4\uc18d\ud574\uc11c \ub370\uc774\ud130\ub97c \uc0dd\uc131\ud558\ub294 data generator \uc2a4\ud06c\ub9bd\ud2b8\ub97c \ub9cc\ub4ed\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"psycopg2")," \ub97c \uc774\uc6a9\ud558\uc5ec \uc0dd\uc131\ub41c ",(0,r.kt)("inlineCode",{parentName:"li"},"iris_data")," \ud14c\uc774\ube14\uc5d0 \uc2a4\ud06c\ub9bd\ud2b8\ub97c \uc2e4\ud589\ud558\uc5ec \uacc4\uc18d\ud574\uc11c \ub370\uc774\ud130\ub97c \uc0bd\uc785\ud569\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"psql"),"\xa0\uc744 \uc774\uc6a9\ud558\uc5ec \uc0bd\uc785\ud55c \ub370\uc774\ud130\ub97c \ud655\uc778\ud569\ub2c8\ub2e4.")),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"1-\ub370\uc774\ud130-\uc0dd\uc131"},"1. \ub370\uc774\ud130 \uc0dd\uc131"),(0,r.kt)("h3",{id:"11-generate-data"},"1.1 Generate Data"),(0,r.kt)("p",null,"\uc774\uc804 \uc7a5\uc5d0\uc11c \uc791\uc131\ud55c ",(0,r.kt)("inlineCode",{parentName:"p"},"insert_data.py")," \uc2a4\ud06c\ub9bd\ud2b8\uc5d0\uc11c \uacc4\uc18d\ud574\uc11c \ub370\uc774\ud130\ub97c \ucd94\uac00\ud558\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"insert_data_loop.py")," \ub97c \uc791\uc131\ud574 \ubcf4\uaca0\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uacc4\uc18d\ud574\uc11c \ub370\uc774\ud130\ub97c \uc0bd\uc785\ud558\uae30 \uc704\ud574 while \ubb38\uc744 \uc0ac\uc6a9\ud558\uaca0\uc2b5\ub2c8\ub2e4. \uc774 \ub54c ",(0,r.kt)("inlineCode",{parentName:"p"},"while True")," \ub97c \ud1b5\ud574 \uc678\ubd80\uc758 \uac1c\uc785\uc774 \uc5c6\ub2e4\uba74 \uacc4\uc18d\ud574\uc11c while \ubb38\uc744 \uc2e4\ud589\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"def generate_data(db_connect, df):\n    while True:\n        insert_data(db_connect, df.sample(5).squeeze())\n")),(0,r.kt)("p",null,"\ub2e4\ub9cc \uc704\uc640 \uac19\uc774 \uc791\uc131\ud560 \uacbd\uc6b0 \ub108\ubb34 \ube60\ub978 \uc2dc\uac04\uc5d0 \ub370\uc774\ud130\uac00 \ucd94\uac00\ub418\uae30 \ub54c\ubb38\uc5d0 DB \uc5d0 \ubd80\ud558\uac00 \uc0dd\uae38 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",(0,r.kt)("br",{parentName:"p"}),"\n","\uc774\ub97c \ubc29\uc9c0\ud558\uae30 \uc704\ud574\uc11c\ub294 \ub370\uc774\ud130\ub97c \uc0bd\uc785 \ud6c4 \uc7a0\uc2dc \ub300\uae30\ud558\ub294 \uc2dc\uac04\uc744 \ucd94\uac00\ud558\uaca0\uc2b5\ub2c8\ub2e4. \ud30c\uc774\uc36c \uc2a4\ud06c\ub9bd\ud2b8\ub97c \ub300\uae30\uc2dc\ud0a4\ub294 \uac83\uc740 ",(0,r.kt)("inlineCode",{parentName:"p"},"time")," \ud328\ud0a4\uc9c0\uc758 ",(0,r.kt)("inlineCode",{parentName:"p"},"sleep")," \ud568\uc218\ub97c \uc774\uc6a9\ud558\uba74 \ub429\ub2c8\ub2e4. \uc774 \ud568\uc218\uac00 \uc2e4\ud589\ub420 \uacbd\uc6b0 \ud574\ub2f9 \uc904\uc5d0\uc11c \uc9c0\uc815\ub41c \uc2dc\uac04\ub9cc\ud07c \ub300\uae30\ub97c \ud569\ub2c8\ub2e4.",(0,r.kt)("br",{parentName:"p"}),"\n","\uc5ec\uae30\uc11c\ub294 1\ucd08\uac04 \uba48\ucd94\uac8c \ud574\ubcf4\uaca0\uc2b5\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"import time\n\ndef generate_data(db_connect, df):\n    while True:\n        insert_data(db_connect, df.sample(1).squeeze())\n        time.sleep(1)\n")),(0,r.kt)("h3",{id:"12-query-\uc2e4\ud589"},"1.2 Query \uc2e4\ud589"),(0,r.kt)("h4",{id:"121-insert_data_looppy"},"1.2.1 ",(0,r.kt)("inlineCode",{parentName:"h4"},"insert_data_loop.py")),(0,r.kt)("p",null,"\uc55e\uc120 \uc7a5\uc5d0\uc11c \uc791\uc131\ud55c \ub0b4\uc6a9\ub4e4\uacfc \uc774\ubc88 \uc7a5\uc5d0\uc11c \uc124\uba85\ud55c \ub0b4\uc6a9\uc744 \ud569\uccd0\uc11c data generator \ub97c \uc0dd\uc131\ud558\ub3c4\ub85d \ud558\uaca0\uc2b5\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'# insert_data_loop.py\nimport time\n\nimport pandas as pd\nimport psycopg2\nfrom sklearn.datasets import load_iris\n\ndef get_data():\n    X, y = load_iris(return_X_y=True, as_frame=True)\n    df = pd.concat([X, y], axis="columns")\n    rename_rule = {\n        "sepal length (cm)": "sepal_length",\n        "sepal width (cm)": "sepal_width",\n        "petal length (cm)": "petal_length",\n        "petal width (cm)": "petal_width",\n    }\n    df = df.rename(columns=rename_rule)\n    return df\n\ndef insert_data(db_connect, data):\n    insert_row_query = f"""\n    INSERT INTO iris_data\n        (sepal_length, sepal_width, petal_length, petal_width, target)\n        VALUES (\n            {data.sepal_length},\n            {data.sepal_width},\n            {data.petal_length},\n            {data.petal_width},\n            {data.target}\n        );\n    """\n    print(insert_row_query)\n    with db_connect.cursor() as cur:\n        cur.execute(insert_row_query)\n        db_connect.commit()\n\n\ndef generate_data(db_connect, df):\n    while True:\n        insert_data(db_connect, df.sample(1).squeeze())\n        time.sleep(1)\n\n\nif __name__ == "__main__":\n    db_connect = psycopg2.connect(\n        user="myuser",\n        password="mypassword",\n        host="localhost",\n        port=5432,\n        database="mydatabase",\n    )\n    df = get_data()\n    generate_data(db_connect, df)\n')),(0,r.kt)("h4",{id:"122-\uc2e4\ud589"},"1.2.2 \uc2e4\ud589"),(0,r.kt)("p",null,"Python \ud30c\uc77c\uc744 \uc2e4\ud589\ud558\uba74 \uc544\ub798\uc640 \uac19\uc774 \ub098\uc635\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ python data_generator.py\n\n    CREATE TABLE IF NOT EXISTS iris_data (\n        id SERIAL PRIMARY KEY,\n        sepal_length float8,\n        sepal_width float8,\n        petal_length float8,\n        petal_width float8,\n        target int\n    );\n\n    INSERT INTO iris_data\n        (sepal_length, sepal_width, petal_length, petal_width, target)\n        VALUES (\n            6.5,\n            2.8,\n            4.6,\n            1.5,\n            1.0\n        );\n    \n\n    INSERT INTO iris_data\n        (sepal_length, sepal_width, petal_length, petal_width, target)\n        VALUES (\n            5.5,\n            4.2,\n            1.4,\n            0.2,\n            0.0\n        );\n    \n\n    INSERT INTO iris_data\n        (sepal_length, sepal_width, petal_length, petal_width, target)\n        VALUES (\n            4.4,\n            2.9,\n            1.4,\n            0.2,\n            0.0\n        );\n")),(0,r.kt)("h2",{id:"2-data-\ud655\uc778"},"2. Data \ud655\uc778"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"psql")," \uc744 \uc774\uc6a9\ud558\uc5ec DB \uc5d0 \uc811\uadfc\ud558\uace0, \uacc4\uc18d\ud574\uc11c data \uac00 \uc0bd\uc785\ub418\uace0 \uc788\ub294\uc9c0 \ud655\uc778\ud574 \ubcf4\uaca0\uc2b5\ub2c8\ub2e4."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"psql \uc5d0 \uc811\uc18d\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'$ psql -h localhost -p 5432 -U myuser -d mydatabase\nPassword for user myuser: \npsql (14.3, server 14.0 (Debian 14.0-1.pgdg110+1))\nType "help" for help.\n\nmydatabase=#\n'))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"\uc55e\uc120 \uc7a5\uc5d0\uc11c \uc791\uc131\ud55c ",(0,r.kt)("inlineCode",{parentName:"p"},"iris_data")," \ud14c\uc774\ube14\uc5d0 \uc788\ub294 \ub370\uc774\ud130 \uc804\uccb4\ub97c \ud655\uc778\ud558\uae30 \uc704\ud55c query \ub97c \uc2e4\ud589\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mydatabase=# select * from iris_data;\n id | sepal_length | sepal_width | petal_length | petal_width | target \n----+--------------+-------------+--------------+-------------+--------\n  1 |          5.6 |           3 |          4.5 |         1.5 |      1\n  2 |          5.9 |           3 |          5.1 |         1.8 |      2\n  3 |          5.5 |         2.4 |          3.8 |         1.1 |      1\n  4 |          5.4 |         3.9 |          1.3 |         0.4 |      0\n(4 rows)\n")),(0,r.kt)("p",{parentName:"li"},"\uc2e4\ud589\uc744 \ud560 \ub54c\ub9c8\ub2e4 \uacc4\uc18d\ud574\uc11c \ub370\uc774\ud130\uac00 \ucd94\uac00\ub418\uace0 \uc788\ub294 \uac83\uc744 \ud655\uc778\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."))))}c.isMDXComponent=!0}}]);