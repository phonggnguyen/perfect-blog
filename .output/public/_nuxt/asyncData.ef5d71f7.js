import{Q as k,r as y,R as x,S as B,T as C,D as M,u as z,U as E}from"./entry.35b9f3be.js";const R=()=>null;function S(...i){var m,_,v,D,g,P,b,w;const u=typeof i[i.length-1]=="string"?i.pop():void 0;typeof i[0]!="string"&&i.unshift(u);let[n,c,e={}]=i;if(typeof n!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof c!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");e.server=(m=e.server)!=null?m:!0,e.default=(_=e.default)!=null?_:R,e.defer&&console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC."),e.lazy=(D=(v=e.lazy)!=null?v:e.defer)!=null?D:!1,e.initialCache=(g=e.initialCache)!=null?g:!0,e.immediate=(P=e.immediate)!=null?P:!0;const a=k(),d=()=>(a.isHydrating||e.initialCache)&&a.payload.data[n]!==void 0;a._asyncData[n]||(a._asyncData[n]={data:y(d()?a.payload.data[n]:(w=(b=e.default)==null?void 0:b.call(e))!=null?w:null),pending:y(!d()),error:y(a.payload._errors[n]?x(a.payload._errors[n]):null)});const t={...a._asyncData[n]};t.refresh=t.execute=(s={})=>{if(a._asyncDataPromises[n]){if(s.dedupe===!1)return a._asyncDataPromises[n];a._asyncDataPromises[n].cancelled=!0}if(s._initial&&d())return a.payload.data[n];t.pending.value=!0;const o=new Promise((r,l)=>{try{r(c(a))}catch(f){l(f)}}).then(r=>{if(o.cancelled)return a._asyncDataPromises[n];e.transform&&(r=e.transform(r)),e.pick&&(r=A(r,e.pick)),t.data.value=r,t.error.value=null}).catch(r=>{var l,f;if(o.cancelled)return a._asyncDataPromises[n];t.error.value=r,t.data.value=z((f=(l=e.default)==null?void 0:l.call(e))!=null?f:null)}).finally(()=>{o.cancelled||(t.pending.value=!1,a.payload.data[n]=t.data.value,t.error.value&&(a.payload._errors[n]=x(t.error.value)),delete a._asyncDataPromises[n])});return a._asyncDataPromises[n]=o,a._asyncDataPromises[n]};const p=()=>t.refresh({_initial:!0}),O=e.server!==!1&&a.payload.serverRendered;{const s=E();if(s&&!s._nuxtOnBeforeMountCbs){s._nuxtOnBeforeMountCbs=[];const r=s._nuxtOnBeforeMountCbs;s&&(B(()=>{r.forEach(l=>{l()}),r.splice(0,r.length)}),C(()=>r.splice(0,r.length)))}O&&a.isHydrating&&n in a.payload.data?t.pending.value=!1:s&&(a.payload.serverRendered&&a.isHydrating||e.lazy)&&e.immediate?s._nuxtOnBeforeMountCbs.push(p):e.immediate&&p(),e.watch&&M(e.watch,()=>t.refresh());const o=a.hook("app:data:refresh",r=>{if(!r||r.includes(n))return t.refresh()});s&&C(o)}const h=Promise.resolve(a._asyncDataPromises[n]).then(()=>t);return Object.assign(h,t),h}function A(i,u){const n={};for(const c of u)n[c]=i[c];return n}export{S as u};