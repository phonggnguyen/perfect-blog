import{_ as y}from"./Card.vue_vue_type_script_setup_true_lang.a6edd3fe.js";import{_ as k}from"./Loader.b95226ac.js";import{a as h,s as x,aB as b,a2 as g,o as e,e as s,f as m,t as v,u as o,F as B,y as C,k as n,c as u}from"./entry.fab98536.js";import{u as S}from"./asyncData.d4d22293.js";import{u as q}from"./head.3ac4e41d.js";import"./string-strip-html.esm.46c8bcd0.js";import"./functions.5b35a2ea.js";import"./index.ed37edad.js";import"./Logo.28edc839.js";import"./_plugin-vue_export-helper.a1a6add7.js";const D={class:"my-20"},F={class:"text-4xl font-semibold"},L={key:0},N={class:"my-4"},J=h({__name:"index",setup(P){const l=x(),a=b(),{data:r,pending:d}=S("posts",async()=>{const{data:t,error:p}=await l.from("posts").select("*, profiles!inner (username)").eq("active",!0).eq("profiles.id",a.value.id).order("created_at",{ascending:!1});return t});return q(g(()=>{var t;return`${(t=a.value)==null?void 0:t.name}'s blog`})),(t,p)=>{var i;const _=y,f=k;return e(),s("div",D,[m("h1",F,v((i=o(a))==null?void 0:i.name)+"'s posts",1),m("div",null,[o(r)?(e(),s("ul",L,[(e(!0),s(B,null,C(o(r),c=>(e(),s("li",N,[c.id?(e(),u(_,{key:0,subdomain:"",post:c},null,8,["post"])):n("",!0)]))),256))])):n("",!0),o(d)?(e(),u(f,{key:1})):n("",!0)])])}}});export{J as default};
