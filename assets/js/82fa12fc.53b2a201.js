"use strict";(self.webpackChunktemp=self.webpackChunktemp||[]).push([[8693],{3905:(e,a,t)=>{t.d(a,{Zo:()=>s,kt:()=>u});var n=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function l(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?l(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function o(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var d=n.createContext({}),p=function(e){var a=n.useContext(d),t=a;return e&&(t="function"==typeof e?e(a):i(i({},a),e)),t},s=function(e){var a=p(e.components);return n.createElement(d.Provider,{value:a},e.children)},c={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},m=n.forwardRef((function(e,a){var t=e.components,r=e.mdxType,l=e.originalType,d=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),m=p(t),u=r,_=m["".concat(d,".").concat(u)]||m[u]||c[u]||l;return t?n.createElement(_,i(i({ref:a},s),{},{components:t})):n.createElement(_,i({ref:a},s))}));function u(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var l=t.length,i=new Array(l);i[0]=m;var o={};for(var d in a)hasOwnProperty.call(a,d)&&(o[d]=a[d]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var p=2;p<l;p++)i[p]=t[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},8566:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>d,contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var n=t(7462),r=(t(7294),t(3905));const l={sidebar_position:3},i="3) Load Data from Database",o={unversionedId:"model-development/load-data-from-database",id:"model-development/load-data-from-database",title:"3) Load Data from Database",description:"\ubaa9\ud45c",source:"@site/docs/model-development/load-data-from-database.md",sourceDirName:"model-development",slug:"/model-development/load-data-from-database",permalink:"/tutorial/docs/model-development/load-data-from-database",draft:!1,editUrl:"https://github.com/mlops-for-mle/tutorial/tree/main/docs/model-development/load-data-from-database.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"2) Model Pipeline",permalink:"/tutorial/docs/model-development/base-model-pipeline"},next:{title:"03. Model Registry",permalink:"/tutorial/docs/category/03-model-registry"}},d={},p=[{value:"\ubaa9\ud45c",id:"\ubaa9\ud45c",level:2},{value:"\uc2a4\ud399 \uba85\uc138\uc11c",id:"\uc2a4\ud399-\uba85\uc138\uc11c",level:2},{value:"0.  \ud328\ud0a4\uc9c0 \uc124\uce58",id:"0--\ud328\ud0a4\uc9c0-\uc124\uce58",level:2},{value:"1. \ub370\uc774\ud130 \ubd88\ub7ec\uc624\uae30",id:"1-\ub370\uc774\ud130-\ubd88\ub7ec\uc624\uae30",level:2},{value:"2. \ubaa8\ub378 \ud30c\uc774\ud504\ub77c\uc778 \uc218\uc815",id:"2-\ubaa8\ub378-\ud30c\uc774\ud504\ub77c\uc778-\uc218\uc815",level:2},{value:"2.1 <code>db_train.py</code>",id:"21-db_trainpy",level:3},{value:"2.2 <code>validate_save_model.py</code>",id:"22-validate_save_modelpy",level:3}],s={toc:p};function c(e){let{components:a,...t}=e;return(0,r.kt)("wrapper",(0,n.Z)({},s,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"3-load-data-from-database"},"3) Load Data from Database"),(0,r.kt)("h2",{id:"\ubaa9\ud45c"},"\ubaa9\ud45c"),(0,r.kt)("p",null,"\ub370\uc774\ud130\ubca0\uc774\uc2a4\uc5d0\uc11c \ub370\uc774\ud130\ub97c \uac00\uc838\uc624\ub294 \ud30c\uc774\ud504\ub77c\uc778\uc744 \uc791\uc131\ud569\ub2c8\ub2e4."),(0,r.kt)("h2",{id:"\uc2a4\ud399-\uba85\uc138\uc11c"},"\uc2a4\ud399 \uba85\uc138\uc11c"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\ub370\uc774\ud130 \ubd88\ub7ec\uc624\uae30",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\ucc55\ud1302\uc5d0\uc11c \uc0dd\uc131\ud55c \ub370\uc774\ud130\ubca0\uc774\uc2a4\uc5d0\uc11c \ub370\uc774\ud130\ub97c \uac00\uc838\uc635\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"id"),"\xa0column\uc744 \uae30\uc900\uc73c\ub85c \ucd5c\uc2e0 \ub370\uc774\ud130 100\uac1c\ub97c \ucd94\ucd9c\ud558\ub294 \ucffc\ub9ac\ubb38\uc744 \uc791\uc131\ud569\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"pandas.read_sql"),"\xa0\ud568\uc218\ub97c \uc774\uc6a9\ud574 \ub370\uc774\ud130\ub97c \ucd94\ucd9c\ud569\ub2c8\ub2e4."))),(0,r.kt)("li",{parentName:"ol"},"\ubaa8\ub378 \ud30c\uc774\ud504\ub77c\uc778 \uc218\uc815",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\uc774\uc804 \uc7a5\uc5d0\uc11c \uc791\uc131\ud55c \ud30c\uc774\ud504\ub77c\uc778 \uc911 \ub370\uc774\ud130\ub97c \ubd88\ub7ec\uc624\ub294 \ubd80\ubd84\uc744 \uc704\uc5d0\uc11c \uc791\uc131\ud55c \ud568\uc218\ub85c \uc218\uc815\ud569\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},"\ubaa8\ub378\uc744 \ud559\uc2b5\ud558\uace0 \uc800\uc7a5\ud569\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},"\ubaa8\ub378\uc774 \uc815\uc0c1\uc801\uc73c\ub85c \uc800\uc7a5\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud569\ub2c8\ub2e4.")))),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"0--\ud328\ud0a4\uc9c0-\uc124\uce58"},"0.  \ud328\ud0a4\uc9c0 \uc124\uce58"),(0,r.kt)("p",null,"\uc774\ubc88 \uc7a5\uc5d0\uc11c \uc0ac\uc6a9\ud560 \ud328\ud0a4\uc9c0\ub4e4\uc778 ",(0,r.kt)("inlineCode",{parentName:"p"},"psycopg2-binary")," \ub97c \uc124\uce58\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ pip install psycopg2-binary\n")),(0,r.kt)("h2",{id:"1-\ub370\uc774\ud130-\ubd88\ub7ec\uc624\uae30"},"1. \ub370\uc774\ud130 \ubd88\ub7ec\uc624\uae30"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"id"),"\xa0column\uc744 \uae30\uc900\uc73c\ub85c \ucd5c\uc2e0 \ub370\uc774\ud130 100\uac1c\ub97c \ucd94\ucd9c\ud558\ub294 \ucffc\ub9ac\ubb38\uc744 \uc791\uc131\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM iris_data ORDER BY id DESC LIMIT 100;\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"psql"),"\xa0\uc5d0\uc11c \ud574\ub2f9 \ucffc\ub9ac\ubb38\uc744 \uc785\ub825\ud558\uba74 \ub2e4\uc74c\uacfc \uac19\uc774 \ucd9c\ub825\ub429\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"mydatabase=# SELECT * FROM iris_data ORDER BY id DESC LIMIT 100;\n  id  | sepal_length | sepal_width | petal_length | petal_width | target\n------+--------------+-------------+--------------+-------------+--------\n 3499 |          5.4 |         3.9 |          1.7 |         0.4 |      0\n 3498 |          6.4 |         2.8 |          5.6 |         2.1 |      2\n 3497 |          6.3 |         2.3 |          4.4 |         1.3 |      1\n 3496 |          5.4 |         3.9 |          1.7 |         0.4 |      0\n 3495 |          5.5 |         4.2 |          1.4 |         0.2 |      0\n(...)\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"pandas.read_sql"),"\xa0\ub294 \uc785\ub825 argument\ub85c Query\ubb38\uacfc DB Connection\uc744 \ubc1b\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,"postgres \uc5d0 \uc5f0\uacb0\ud560 \uc218 \uc788\ub294 db connection\uc744 \uc0dd\uc131 \ud6c4 \ucffc\ub9ac\ubb38\uacfc db \ucee4\ub125\uc158\uc744 \uc774\uc6a9\ud574 \ub370\uc774\ud130\ub97c \ubd88\ub7ec\uc635\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'import pandas as pd\nimport psycopg2\n\ndb_connect = psycopg2.connect(host="localhost", database="postgres", user="postgres", password="mypassword")\ndf = pd.read_sql("SELECT * FROM iris_data ORDER BY id DESC LIMIT 100", db_connect)\n')),(0,r.kt)("p",null,"\ucd94\ucd9c\ub41c \ub370\uc774\ud130\ub97c \ud655\uc778\ud558\uba74 \ub2e4\uc74c\uacfc \uac19\uc2b5\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"print(df.head(5))\n#      id  sepal_length  sepal_width  petal_length  petal_width  target\n# 0  3499          5.4           3.9          1.7           0.4       0\n# 1  3498          6.4           2.8          5.6           2.1       2\n# 2  3497          6.3           2.3          4.4           1.3       1\n# 3  3496          5.4           3.9          1.7           0.4       0\n# 4  3495          5.5           4.2          1.4           0.2       0\n")),(0,r.kt)("h2",{id:"2-\ubaa8\ub378-\ud30c\uc774\ud504\ub77c\uc778-\uc218\uc815"},"2. \ubaa8\ub378 \ud30c\uc774\ud504\ub77c\uc778 \uc218\uc815"),(0,r.kt)("h3",{id:"21-db_trainpy"},"2.1 ",(0,r.kt)("inlineCode",{parentName:"h3"},"db_train.py")),(0,r.kt)("p",null,"\uc6b0\uc120 \ud559\uc2b5 \ubc0f \ub370\uc774\ud130 \uc800\uc7a5\uc744 \uc704\ud55c \ucf54\ub4dc\ub4e4\uc744 \ubaa8\uc740 ",(0,r.kt)("inlineCode",{parentName:"p"},"base_train.py")," \ub97c \uc218\uc815\ud574 ",(0,r.kt)("inlineCode",{parentName:"p"},"db_train.py")," \ub85c \uc800\uc7a5\ud569\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uba3c\uc800  ",(0,r.kt)("inlineCode",{parentName:"p"},"# 1. get data")," \ubd80\ubd84\uc744 \uc704\uc5d0\uc11c \uc791\uc131\ud55c \ucf54\ub4dc\ub85c \uc218\uc815\ud569\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uadf8\ub9ac\uace0 \uc0ac\uc6a9\ud55c \ub370\uc774\ud130\ub97c \uc800\uc7a5\ud558\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"# 4. save data")," \ubd80\ubd84\uc744 \ucd94\uac00\ud569\ub2c8\ub2e4.\n\ub370\uc774\ud130\ub97c \uc800\uc7a5\ud558\ub294 \uc774\uc720\ub294 \ud604\uc7ac \ub370\uc774\ud130\ubca0\uc774\uc2a4\uc5d0 \uacc4\uc18d\ud574\uc11c \ub370\uc774\ud130\uac00 \uc313\uc774\uace0 \uc788\uae30 \ub54c\ubb38\uc5d0 \ub9e4\ubc88 \ub370\uc774\ud130\ub97c \ubd88\ub7ec\uc62c \ub54c\ub9c8\ub2e4 \ub370\uc774\ud130\uac00 \ubc14\ub01d\ub2c8\ub2e4.\n\ub370\uc774\ud130\uac00 \ubc14\ub00c\uba74 \ubaa8\ub378\uc774 \uc815\uc0c1\uc801\uc73c\ub85c \ubd88\ub7ec\uc654\ub294\uc9c0 \ud655\uc778\ud560 \uc218 \uc5c6\uae30 \ub54c\ubb38\uc5d0 \uc0ac\uc6a9\ud55c \ub370\uc774\ud130\ub97c \uc800\uc7a5\ud574 \ud3c9\uac00\ud558\ub294 \ubd80\ubd84\uc5d0\uc11c \uc0ac\uc6a9\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'# db_train.py\n\nimport joblib\nimport pandas as pd\nimport psycopg2\nfrom sklearn.metrics import accuracy_score\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.svm import SVC\n\n# 1. get data\ndb_connect = psycopg2.connect(host="localhost", database="mydatabase", user="myuser", password="mypassword")\ndf = pd.read_sql("SELECT * FROM iris_data ORDER BY id DESC LIMIT 100", db_connect)\nX = df.drop(["id", "target"], axis="columns")\ny = df["target"]\nX_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, random_state=2022)\n\n# 2. model development and train\nmodel_pipeline = Pipeline([("scaler", StandardScaler()), ("svc", SVC())])\nmodel_pipeline.fit(X_train, y_train)\n\ntrain_pred = model_pipeline.predict(X_train)\nvalid_pred = model_pipeline.predict(X_valid)\n\ntrain_acc = accuracy_score(y_true=y_train, y_pred=train_pred)\nvalid_acc = accuracy_score(y_true=y_valid, y_pred=valid_pred)\n\nprint("Train Accuracy :", train_acc)\nprint("Valid Accuracy :", valid_acc)\n\n# 3. save model\njoblib.dump(model_pipeline, "db_pipeline.joblib")\n\n# 4. save data\ndf.to_csv("data.csv", index=False)\n')),(0,r.kt)("h3",{id:"22-validate_save_modelpy"},"2.2 ",(0,r.kt)("inlineCode",{parentName:"h3"},"validate_save_model.py")),(0,r.kt)("p",null,"\ub2e4\uc74c\uc740 \uc800\uc7a5\ub41c \ubaa8\ub378\uc744 \uac80\uc99d\ud558\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"base_validate_save_model.py")," \ub97c \uc218\uc815\ud574 ",(0,r.kt)("inlineCode",{parentName:"p"},"db_validate_save_model.py")," \ub85c \uc800\uc7a5\ud569\ub2c8\ub2e4 \uc785\ub2c8\ub2e4.\n",(0,r.kt)("inlineCode",{parentName:"p"},"# 1. reproduce data")," \uc5d0\uc11c \uc800\uc7a5\ub41c \ub370\uc774\ud130\ub97c \ubd88\ub7ec\uc624\uac8c \uc218\uc815\ud569\ub2c8\ub2e4. \ub098\uba38\uc9c0 \ubd80\ubd84\uc740 \uc774 \uc804 \uc7a5\uacfc \ub3d9\uc77c\ud569\ub2c8\ub2e4."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'# db_validate_save_model.py\n\nimport joblib\nimport pandas as pd\nfrom sklearn.metrics import accuracy_score\nfrom sklearn.model_selection import train_test_split\n\n# 1. reproduce data\ndf = pd.read_csv("data.csv")\nX = df.drop(["id", "target"], axis="columns")\ny = df["target"]\nX_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, random_state=2022)\n\n# 2. load model\npipeline_load = joblib.load("db_pipeline.joblib")\n\n# 3. validate\nload_train_pred = pipeline_load.predict(X_train)\nload_valid_pred = pipeline_load.predict(X_valid)\n\nload_train_acc = accuracy_score(y_true=y_train, y_pred=load_train_pred)\nload_valid_acc = accuracy_score(y_true=y_valid, y_pred=load_valid_pred)\n\nprint("Load Model Train Accuracy :", load_train_acc)\nprint("Load Model Valid Accuracy :", load_valid_acc)\n')))}c.isMDXComponent=!0}}]);