import{T as g,H as v}from"./components.b61ce57a.js";import{a as k,x as w,r as N,D as T,e as r,h as n,w as l,f as t,u as c,c as B,N as i,O as P,l as C,j as e,o as s}from"./entry.090bca8d.js";import{_ as E}from"./Loader.e3327f54.js";import{_ as H}from"./Card.vue_vue_type_script_setup_true_lang.338a32a8.js";import{u as K}from"./asyncData.4c602d1d.js";import{u as L}from"./index.53ce2f14.js";import"./Logo.789fe3de.js";import"./_plugin-vue_export-helper.a1a6add7.js";import"./nuxt-img.d3061ea7.js";import"./string-strip-html.esm.22e52bb0.js";import"./_commonjsHelpers.a7148835.js";import"./functions.0aa32198.js";import"./index.ed37edad.js";const V={class:"pb-20"},$={class:"relative my-20 md:my-30 text-center"},j={class:"z-100"},z=t("h1",{class:"text-4xl md:text-6xl font-bold"},[e(" Keyboard-first "),t("br"),e(" Blogging Platform ")],-1),D=t("h2",{class:"mt-8 text-xl md:text-3xl font-semibold text-gray-300"},[e(" KeyPress let you write your blog "),t("br"),e(" with only keyboard ")],-1),S={class:"mt-12 flex flex-col items-center justify-center"},q=t("span",{class:"text-sm mt-2 text-gray-300"},"or 'Tab' to Navigate",-1),A=t("h2",{class:"mt-20 text-4xl font-bold"},"Posts",-1),F={key:1,class:"mt-4"},ot=k({__name:"index",setup(M){const _=w(),{data:m,pending:d}=K("posts",async()=>{const{data:a}=await _.from("posts").select("*, profiles(avatar_url, name, username, domains (url, active) )").eq("active",!0).order("created_at",{ascending:!1});return a},{lazy:!0,server:!1}),o=N(),{Slash:u}=L();return T(u,a=>{a&&o.value&&(o.value.$el.focus(),setTimeout(()=>{o.value.$el.click()},300))}),(a,O)=>{const p=g,f=v,x=C,y=E,h=H;return s(),r(i,null,[n(f,null,{default:l(()=>[n(p,null,{default:l(()=>[e(" Experience keyboard-first blogging platform ")]),_:1})]),_:1}),t("div",V,[t("div",$,[t("div",j,[z,D,t("div",S,[n(x,{ref_key:"writeEl",ref:o,class:"btn-primary text-xl",to:"/write"},{default:l(()=>[e("Press '/' to write")]),_:1},512),q])])]),A,c(d)?(s(),B(y,{key:0})):(s(),r("ul",F,[(s(!0),r(i,null,P(c(m),b=>(s(),r("li",null,[n(h,{post:b},null,8,["post"])]))),256))]))])],64)}}});export{ot as default};
