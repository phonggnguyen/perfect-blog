import { v as defineNuxtRouteMiddleware, a as useSupabaseUser, m as navigateTo } from '../server.mjs';
import 'vue';
import 'ohmyfetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import 'vue-router';
import 'defu';
import 'events';
import 'unenv/runtime/npm/debug';
import 'util';
import 'crypto';
import 'url';
import 'bufferutil';
import 'buffer';
import 'utf-8-validate';
import 'http';
import 'https';
import 'typedarray-to-buffer';
import 'yaeti';
import 'cookie-es';
import 'ohash';
import 'vue/server-renderer';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const auth = defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  if (!user.value && to.path !== "/write") {
    return navigateTo("/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth.9d304380.mjs.map
