import { defineEventHandler, useBody, createError } from 'h3';
import { s as serverSupabaseClient } from './serverSupabaseClient.mjs';
import '@supabase/supabase-js';
import './nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'defu';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const checkDomain_post = defineEventHandler(async (event) => {
  try {
    const { domain, subdomain = false } = await useBody(event);
    const client = serverSupabaseClient(event);
    if (Array.isArray(domain))
      return createError({ statusCode: 400, statusMessage: "Bad request. domain parameter cannot be an array." });
    const data = await $fetch(`https://api.vercel.com/v6/domains/${domain}/config`, {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`
      }
    });
    console.log({ domain, data });
    const valid = (data == null ? void 0 : data.configuredBy) ? true : false;
    if (valid) {
      const { error: domainError } = await client.from("domains").update({
        url: domain,
        active: true
      });
      if (domainError)
        return createError({ statusCode: 400, statusMessage: "Bad request. domain parameter cannot be an array." });
    }
    return { valid };
  } catch (err) {
    return createError({ statusCode: 404, statusMessage: err });
  }
});

export { checkDomain_post as default };
//# sourceMappingURL=check-domain.post.mjs.map
