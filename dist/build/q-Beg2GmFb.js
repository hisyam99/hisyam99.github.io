import{u as r,i as m,s as c,_ as l,e as d,q as o,t as _}from"./q-DOfOxinU.js";import{_ as s}from"./q-uemlvruI.js";const h=async t=>{const[a]=r(),e=t.target.value;a.value=e,typeof window<"u"&&(localStorage.setItem("theme",e),document.documentElement.setAttribute("data-theme",e))},p=()=>{const t=["light","dark","cupcake","bumblebee","emerald","corporate","synthwave","retro","cyberpunk","valentine","halloween","garden","forest","aqua","lofi","pastel","fantasy","wireframe","black","luxury","dracula","cmyk","autumn","business","acid","lemonade","night","coffee","winter","dim","nord","sunset"],e=m(typeof window<"u"&&localStorage.getItem("theme")||"auto"),i=o(()=>s(()=>Promise.resolve().then(()=>u),void 0),"s_eDpVP0KBhUs",[e]);return c(o(()=>s(()=>Promise.resolve().then(()=>u),void 0),"s_2pdRVKDUavE",[e])),l("div",null,null,l("select",null,{class:"select select-primary select-sm",value:d(n=>n.value,[e]),"data-choose-theme":!0,onChange$:i},[l("option",null,{disabled:!0},"Pilih tema",3,null),l("option",null,{value:"auto",class:"text-primary"},"Sistem",3,null),t.map(n=>l("option",{value:n},null,n,1,n))],1,null),1,"b0_0")},f=({track:t})=>{const[a]=r();t(()=>a.value),typeof window<"u"&&document.documentElement.setAttribute("data-theme",a.value)},u=Object.freeze(Object.defineProperty({__proto__:null,_hW:_,s_2pdRVKDUavE:f,s_CiZja5l8W3k:p,s_eDpVP0KBhUs:h},Symbol.toStringTag,{value:"Module"}));export{_ as _hW,f as s_2pdRVKDUavE,p as s_CiZja5l8W3k,h as s_eDpVP0KBhUs};
