import{Q as y,B as a,ad as s,a as h,r as f,V as S,b,X as z}from"./entry.35b9f3be.js";const w=()=>y().$img,p={src:{type:String,required:!0},format:{type:String,default:void 0},quality:{type:[Number,String],default:void 0},background:{type:String,default:void 0},fit:{type:String,default:void 0},modifiers:{type:Object,default:void 0},preset:{type:String,default:void 0},provider:{type:String,default:void 0},sizes:{type:[Object,String],default:void 0},preload:{type:Boolean,default:void 0},width:{type:[String,Number],default:void 0},height:{type:[String,Number],default:void 0},alt:{type:String,default:void 0},referrerpolicy:{type:String,default:void 0},usemap:{type:String,default:void 0},longdesc:{type:String,default:void 0},ismap:{type:Boolean,default:void 0},loading:{type:String,default:void 0},crossorigin:{type:[Boolean,String],default:void 0,validator:e=>["anonymous","use-credentials","",!0,!1].includes(e)},decoding:{type:String,default:void 0,validator:e=>["async","auto","sync"].includes(e)}},B=e=>{const d=a(()=>({provider:e.provider,preset:e.preset})),n=a(()=>({width:s(e.width),height:s(e.height),alt:e.alt,referrerpolicy:e.referrerpolicy,usemap:e.usemap,longdesc:e.longdesc,ismap:e.ismap,crossorigin:e.crossorigin===!0?"anonymous":e.crossorigin||void 0,loading:e.loading,decoding:e.decoding})),i=a(()=>({...e.modifiers,width:s(e.width),height:s(e.height),format:e.format,quality:e.quality,background:e.background,fit:e.fit}));return{options:d,attrs:n,modifiers:i}},N={...p,placeholder:{type:[Boolean,String,Number,Array],default:void 0}},k=h({name:"NuxtImg",props:N,setup:(e,d)=>{const n=w(),i=B(e),g=f(!1),r=a(()=>n.getSizes(e.src,{...i.options.value,sizes:e.sizes,modifiers:{...i.modifiers.value,width:s(e.width),height:s(e.height)}})),m=a(()=>{const t=i.attrs.value;return e.sizes&&(t.sizes=r.value.sizes,t.srcset=r.value.srcset),t}),l=a(()=>{let t=e.placeholder;if(t===""&&(t=!0),!t||g.value)return!1;if(typeof t=="string")return t;const o=Array.isArray(t)?t:typeof t=="number"?[t,t]:[10,10];return n(e.src,{...i.modifiers.value,width:o[0],height:o[1],quality:o[2]||50},i.options.value)}),u=a(()=>e.sizes?r.value.src:n(e.src,i.modifiers.value,i.options.value)),c=a(()=>l.value?l.value:u.value);if(e.preload){const t=Object.values(r.value).every(o=>o);S({link:[{rel:"preload",as:"image",...t?{href:r.value.src,imagesizes:r.value.sizes,imagesrcset:r.value.srcset}:{href:c.value}}]})}const v=f(null);return b(()=>{if(l.value){const t=new Image;t.src=u.value,t.onload=()=>{v.value.src=u.value,g.value=!0}}}),()=>z("img",{ref:v,key:c.value,src:c.value,...m.value,...d.attrs})}});export{k as _};
