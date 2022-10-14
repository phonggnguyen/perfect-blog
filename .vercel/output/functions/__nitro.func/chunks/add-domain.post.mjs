import { defineEventHandler, useBody, createError } from 'h3';
import { s as serverSupabaseClient } from './serverSupabaseClient.mjs';
import '@supabase/supabase-js';
import './nitro/vercel.mjs';
import 'node-fetch-native/polyfill';
import 'ohmyfetch';
import 'destr';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'node:url';
import 'ipx';

const serverSupabaseUser = async (event) => {
  const client = serverSupabaseClient(event);
  if (!event.context._token) {
    return null;
  }
  const { user: supabaseUser, error } = await client.auth.api.getUser(event.context._token);
  event.context._user = error ? null : supabaseUser;
  return event.context._user;
};

const addDomain_post = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const { domain, user_id } = await useBody(event);
    const user = await serverSupabaseUser(event);
    const client = serverSupabaseClient(event);
    if (Array.isArray(domain) || Array.isArray(user_id))
      createError({ statusCode: 400, statusMessage: "Bad request. Query parameters are not valid." });
    const { data: domainData } = await client.from("domains").select("*").eq("url", domain).maybeSingle();
    if (domainData.user_id === user.id)
      return true;
    const data = await $fetch(`https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`
      },
      body: {
        name: domain
      }
    });
    console.log({ domain, data });
    if (((_a = data.error) == null ? void 0 : _a.code) === "forbidden")
      return createError({ statusCode: 400, statusMessage: data.error.code });
    if (((_b = data.error) == null ? void 0 : _b.code) === "domain_taken")
      return createError({ statusCode: 409, statusMessage: data.error.code });
    const { error: domainError } = await client.from("domains").upsert({
      url: domain,
      user_id: user.id,
      active: false
    });
    if (domainError)
      return createError({ statusCode: 400, statusMessage: domainError.message });
    return data;
  } catch (err) {
    return createError({ statusCode: 500, statusMessage: err });
  }
});

export { addDomain_post as default };
//# sourceMappingURL=add-domain.post.mjs.map
