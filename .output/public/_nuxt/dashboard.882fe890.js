import{q as c,s as f,x as m,r as p}from"./entry.090bca8d.js";import{u as g}from"./index.53ce2f14.js";import{r as d}from"./functions.0aa32198.js";const k=()=>c("profile",()=>null),y=s=>{const a=f(),i=m(),o=p(!1),r=async()=>{var t,l,u,n;o.value=!0,console.log("save profile settings",s.value),console.log("save profile user",a.value);const e=((t=a.value)==null?void 0:t.app_metadata.provider)==="facebook";console.log({isFacebook:e}),e&&(s.value.avatar_url=(l=a.value)==null?void 0:l.user_metadata.avatar_url,s.value.username=d((u=a.value)==null?void 0:u.user_metadata.name).replaceAll(" ","").toLowerCase());const{data:v}=await i.from("profiles").upsert({...s.value,id:(n=a.value)==null?void 0:n.id}).single();console.log({data:v}),o.value=!1};return g({passive:!1,onEventFired(e){(e.ctrlKey||e.metaKey)&&e.key==="s"&&e.type==="keydown"&&(e.preventDefault(),r())}}),{save:r,isSaving:o}};export{y as a,k as u};
