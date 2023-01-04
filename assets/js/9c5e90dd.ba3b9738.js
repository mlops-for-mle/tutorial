"use strict";(self.webpackChunktemp=self.webpackChunktemp||[]).push([[5867],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>p});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),m=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=m(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=m(r),p=a,b=d["".concat(c,".").concat(p)]||d[p]||u[p]||o;return r?n.createElement(b,i(i({ref:t},s),{},{components:r})):n.createElement(b,i({ref:t},s))}));function p(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var m=2;m<o;m++)i[m]=r[m];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},3215:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>b,contentTitle:()=>d,default:()=>g,frontMatter:()=>u,metadata:()=>p,toc:()=>h});var n=r(7462),a=r(7294),o=r(3905),i=r(5999);function l(e){let{className:t,name:r,children:n,githubUrl:o,linkedinUrl:i}=e;return a.createElement("div",{className:t},a.createElement("div",{className:"card card--full-height"},a.createElement("div",{className:"card__header"},a.createElement("div",{className:"avatar avatar--vertical"},a.createElement("img",{className:"avatar__photo avatar__photo--xl",src:`${o}.png`,alt:`${r}'s avatar`}),a.createElement("div",{className:"avatar__intro"},a.createElement("h3",{className:"avatar__name"},r)))),a.createElement("div",{className:"card__body"},n),a.createElement("div",{className:"card__footer"},a.createElement("div",{className:"button-group button-group--block"},o&&a.createElement("a",{className:"button button--secondary",href:o},"GitHub"),i&&a.createElement("a",{className:"button button--secondary",href:i},"LinkedIn")))))}function c(e){return a.createElement(l,(0,n.Z)({},e,{className:"col col--6 margin-bottom--lg"}))}function m(){return a.createElement("div",{className:"row"},a.createElement(c,{name:"Jongseob Jeon",githubUrl:"https://github.com/aiden-jeon",linkedinUrl:"https://www.linkedin.com/in/jongseob-jeon/"},a.createElement(i.Z,{id:"team.profile.Jongseob Jeon.body"},"Project Leader")),a.createElement(c,{name:"Dongmin Lee",githubUrl:"https://github.com/dongminlee94"},a.createElement(i.Z,{id:"team.profile.Dongmin Lee.body"},"Project Member")),a.createElement(c,{name:"Donghyun Kim",githubUrl:"https://github.com/Kimdongui",linkedinUrl:"https://www.linkedin.com/in/donghyun-kim-549718215/"},a.createElement(i.Z,{id:"team.profile.Donghyun Kim.body"},"Project Member")),a.createElement(c,{name:"Seokgi Kim",githubUrl:"https://github.com/datawhales"},a.createElement(i.Z,{id:"team.profile.Seokgi Kim.body"},"Project Member")))}function s(){return a.createElement("div",{className:"row"},a.createElement(c,{name:"Minjoo Lee",githubUrl:"https://github.com/LEEMINJOO",linkedinUrl:"https://www.linkedin.com/in/minjoolee218/"},a.createElement(i.Z,{id:"team.profile.Minjoo Lee.body"},"Alpha & Beta Tester")),a.createElement(c,{name:"Haeun Oh",githubUrl:"https://github.com/Haeun-Oh",linkedinUrl:"https://www.linkedin.com/in/haeun-oh/"},a.createElement(i.Z,{id:"team.profile.Haeun Oh.body"},"Beta Tester")),a.createElement(c,{name:"Jonghyuk Lee",githubUrl:"https://github.com/jonhyuk0922",linkedinUrl:"https://www.linkedin.com/in/%EC%A2%85%ED%98%81-%EC%9D%B4-a79396208/"},a.createElement(i.Z,{id:"team.profile.Jonghyuk Lee.body"},"Beta Tester")))}const u={sidebar_position:1},d="Contributors",p={unversionedId:"contributors",id:"contributors",title:"Contributors",description:"Main Authors",source:"@site/community/contributors.md",sourceDirName:".",slug:"/contributors",permalink:"/tutorial/community/contributors",draft:!1,editUrl:"https://github.com/mlops-for-mle/tutorial/tree/main/community/contributors.md",tags:[],version:"current",lastUpdatedBy:"Dongmin Lee",lastUpdatedAt:1672804215,formattedLastUpdatedAt:"Jan 4, 2023",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Discussion",permalink:"/tutorial/community/discussion"}},b={},h=[{value:"Main Authors",id:"main-authors",level:2},{value:"Reviewers",id:"reviewers",level:2}],f={toc:h};function g(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"contributors"},"Contributors"),(0,o.kt)("h2",{id:"main-authors"},"Main Authors"),(0,o.kt)(m,{mdxType:"MainAuthorRow"}),(0,o.kt)("h2",{id:"reviewers"},"Reviewers"),(0,o.kt)("p",null,"Thank you for reviewing our tutorials!"),(0,o.kt)(s,{mdxType:"ReviewersRow"}))}g.isMDXComponent=!0}}]);