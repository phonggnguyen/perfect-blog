import { defineEventHandler, useBody, setCookie } from 'h3';
import { u as useRuntimeConfig } from './nitro/node-server.mjs';
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

const session_post = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await useBody(event);
  const config = useRuntimeConfig().public;
  const cookieOptions = config.supabase.cookies;
  const { event: signEvent, session } = body;
  if (!event) {
    throw new Error("Auth event missing!");
  }
  if (signEvent === "SIGNED_IN") {
    if (!session) {
      throw new Error("Auth session missing!");
    }
    setCookie(event, `${cookieOptions.name}-access-token`, session.access_token, {
      domain: cookieOptions.domain,
      maxAge: (_a = cookieOptions.lifetime) != null ? _a : 0,
      path: cookieOptions.path,
      sameSite: cookieOptions.sameSite
    });
    setCookie(event, `${cookieOptions.name}-refresh-token`, session.refresh_token, {
      domain: cookieOptions.domain,
      maxAge: (_b = cookieOptions.lifetime) != null ? _b : 0,
      path: cookieOptions.path,
      sameSite: cookieOptions.sameSite
    });
  }
  if (signEvent === "SIGNED_OUT") {
    setCookie(event, `${cookieOptions.name}-access-token`, "", {
      maxAge: -1,
      path: cookieOptions.path
    });
  }
  return "custom auth cookie set";
});

export { session_post as default };
//# sourceMappingURL=session.post.mjs.map
