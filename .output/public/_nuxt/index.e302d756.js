import{_ as y}from"./Card.vue_vue_type_script_setup_true_lang.2c7fa91d.js";import{_ as k}from"./Loader.9f0d61ed.js";import{a as x,x as h,ae as b,B as g,e as s,f as c,t as v,u as o,N as B,O as C,k as r,c as u,o as e}from"./entry.35b9f3be.js";import{u as N}from"./asyncData.ef5d71f7.js";import{u as S}from"./head.97b36038.js";import"./nuxt-img.e89747e3.js";import"./string-strip-html.esm.22e52bb0.js";import"./_commonjsHelpers.a7148835.js";import"./functions.0aa32198.js";import"./index.ed37edad.js";import"./Logo.aadd9ea8.js";import"./_plugin-vue_export-helper.a1a6add7.js";const q={class:"my-20"},D={class:"text-4xl font-semibold"},L={key:0},P={class:"my-4"},K=x({__name:"index",setup(V){const p=h(),a=b(),{data:n,pending:l}=N("posts",async()=>{const{data:t,error:d}=await p.from("posts").select("*, profiles!inner (username)").eq("active",!0).eq("profiles.id",a.value.id).order("created_at",{ascending:!1});return t});return S(g(()=>{var t;return`${(t=a.value)==null?void 0:t.name}'s blog`})),(t,d)=>{var i;const _=y,f=k;return e(),s("div",q,[c("h1",D,v((i=o(a))==null?void 0:i.name)+"'s posts",1),c("div",null,[o(n)?(e(),s("ul",L,[(e(!0),s(B,null,C(o(n),m=>(e(),s("li",P,[m.id?(e(),u(_,{key:0,subdomain:"",post:m},null,8,["post"])):r("",!0)]))),256))])):r("",!0),o(l)?(e(),u(f,{key:1})):r("",!0)])])}}});export{K as default};