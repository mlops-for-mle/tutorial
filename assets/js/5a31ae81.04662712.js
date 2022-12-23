"use strict";(self.webpackChunktemp=self.webpackChunktemp||[]).push([[900],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>u});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},i=Object.keys(e);for(o=0;o<i.length;o++)r=i[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=o.createContext({}),d=function(e){var t=o.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},s=function(e){var t=d(e.components);return o.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=d(r),u=n,f=m["".concat(p,".").concat(u)]||m[u]||c[u]||i;return r?o.createElement(f,a(a({ref:t},s),{},{components:r})):o.createElement(f,a({ref:t},s))}));function u(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,a=new Array(i);a[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:n,a[1]=l;for(var d=2;d<i;d++)a[d]=r[d];return o.createElement.apply(null,a)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3691:(e,t,r)=>{r.d(t,{L:()=>n,W:()=>i});var o=r(7294);function n(e){let{children:t}=e;return o.createElement("span",{style:{backgroundColor:"#9747FF",borderRadius:"2px",color:"#fff",padding:"0.2rem"}},t)}function i(e){let{children:t}=e;return o.createElement("span",{style:{backgroundColor:"#6A77D7",borderRadius:"2px",color:"#fff",padding:"0.2rem"}},t)}},3145:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>m,frontMatter:()=>a,metadata:()=>p,toc:()=>s});var o=r(7462),n=(r(7294),r(3905)),i=r(3691);const a={sidebar_position:0,description:"\ud83d\udccc Overview of Model Registry Chapter"},l="0) Overview",p={unversionedId:"model-registry/overview",id:"model-registry/overview",title:"0) Overview",description:"\ud83d\udccc Overview of Model Registry Chapter",source:"@site/docs/model-registry/overview.mdx",sourceDirName:"model-registry",slug:"/model-registry/overview",permalink:"/tutorial/docs/model-registry/overview",draft:!1,editUrl:"https://github.com/mlops-for-mle/tutorial/tree/main/docs/model-registry/overview.mdx",tags:[],version:"current",lastUpdatedBy:"Jongseob Jeon",lastUpdatedAt:1671783749,formattedLastUpdatedAt:"Dec 23, 2022",sidebarPosition:0,frontMatter:{sidebar_position:0,description:"\ud83d\udccc Overview of Model Registry Chapter"},sidebar:"tutorialSidebar",previous:{title:"03. Model Registry",permalink:"/tutorial/docs/category/03-model-registry"},next:{title:"1) MLflow Setup",permalink:"/tutorial/docs/model-registry/mlflow-setup"}},d={},s=[],c={toc:s};function m(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,o.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"0-overview"},"0) Overview"),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"\ud83d\udccc  \ud574\ub2f9 \ud30c\ud2b8\ub294 ",(0,n.kt)(i.L,{mdxType:"Part"},"01. Database")," \ud30c\ud2b8\uc758 DB \ub97c \uc774\uc6a9\ud569\ub2c8\ub2e4.",(0,n.kt)("br",{parentName:"p"}),"\n","\ud83d\udccc  DB \ub97c \ub744\uc6b0\uc9c0 \uc54a\uc740 \uacbd\uc6b0 ",(0,n.kt)(i.L,{mdxType:"Part"},"01. Database")," \ud30c\ud2b8\ub97c \uc644\ub8cc\ud558\uace0 DB \uac00 \ub744\uc6cc\uc9c4 \uc0c1\ud0dc\uc5d0\uc11c \uc9c4\ud589\ud574\uc8fc\uc138\uc694.")),(0,n.kt)(i.L,{mdxType:"Part"},"03. Model Registry")," \ud30c\ud2b8\uc5d0\uc11c\ub294 ",(0,n.kt)(i.L,{mdxType:"Part"},"02. Model development")," \ud30c\ud2b8\ub97c \ud1b5\ud574 \ub9cc\ub4e4\uc5b4\uc9c4 \ubaa8\ub378\uc744 \uc800\uc7a5, \uad00\ub9ac \ud558\ub294 \ubc29\ubc95\uc744 \ud559\uc2b5\ud569\ub2c8\ub2e4.",(0,n.kt)("p",null,"\uc6b0\uc120 MLflow \uc11c\ubc84\ub97c \uad6c\ucd95\uc744 \ud55c \ud6c4 \uad6c\ucd95\ub41c MLflow \uc11c\ubc84\uc5d0 \uc800\uc7a5\ud558\ub294 \uacfc\uc815\uc744 \uc9c4\ud589\ud569\ub2c8\ub2e4.\n\uc774 \ub54c \ucf54\ub4dc\ub294 ",(0,n.kt)(i.L,{mdxType:"Part"},"02. Model Development")," \ud30c\ud2b8\uc758 ",(0,n.kt)(i.W,{mdxType:"Chapter"},"3) Load Data from Database")," \ucc55\ud130\uc5d0\uc11c \uc791\uc131\ud55c ",(0,n.kt)("code",null,"db_train.py")," \ucf54\ub4dc \uc911\uc5d0\uc11c ",(0,n.kt)("inlineCode",{parentName:"p"},"# 3. save model")," \ubd80\ubd84\uc744 \ubcc0\uacbd\ud569\ub2c8\ub2e4."),(0,n.kt)("div",{style:{textAlign:"center"}},(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Model registry Workflow",src:r(273).Z,width:"4268",height:"1056"}),"\n","[\uadf8\ub9bc 3-1]"," Model Registry Workflow")))}m.isMDXComponent=!0},273:(e,t,r)=>{r.d(t,{Z:()=>o});const o=r.p+"assets/images/model-registry-1-c15c53c345f874d360b4d9a9446e56a3.png"}}]);