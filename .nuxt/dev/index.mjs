globalThis._importMeta_={url:import.meta.url,env:process.env};import 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/node-fetch-native/dist/polyfill.mjs';
import { Server } from 'http';
import { tmpdir } from 'os';
import { join, resolve } from 'path';
import { mkdirSync, readFileSync } from 'fs';
import { parentPort, threadId } from 'worker_threads';
import { provider, isWindows } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/std-env/dist/index.mjs';
import { eventHandler, defineEventHandler, handleCacheHeaders, createEvent, useCookies, sendRedirect, assertMethod, readBody, setCookie, createApp, createRouter, lazyEventHandler, useBody, createError, useCookie, getQuery } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/h3/dist/index.mjs';
import { Resvg } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/@resvg/resvg-js/index.js';
import satori from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/satori/dist/esm/index.js';
import { createClient } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/@supabase/supabase-js/dist/main/index.js';
import { createRenderer } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import devalue from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/@nuxt/devalue/dist/devalue.mjs';
import { renderToString } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/vue/server-renderer/index.mjs';
import { parseURL, withQuery, joinURL } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/ufo/dist/index.mjs';
import destr from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/destr/dist/index.mjs';
import { snakeCase } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/scule/dist/index.mjs';
import { createFetch as createFetch$1, Headers } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/ohmyfetch/dist/node.mjs';
import { createRouter as createRouter$1 } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/radix3/dist/index.mjs';
import { createCall, createFetch } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/unenv/runtime/fetch/index.mjs';
import { createHooks } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/hookable/dist/index.mjs';
import { hash } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/ohash/dist/index.mjs';
import { createStorage } from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/unstorage/dist/drivers/fs.mjs';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{"supabase":{"url":"https://xwbvsqjgfezyuektkwml.supabase.co","key":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3YnZzcWpnZmV6eXVla3Rrd21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU2NTM5MjMsImV4cCI6MTk4MTIyOTkyM30.t5LV73LoXTfY91-3U6GxqvDHgvCyzK47pk2eilqpUtw","client":{},"cookies":{"name":"sb","lifetime":28800,"domain":"","path":"/","sameSite":"lax"}}},"supabase":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const serverAssets = [{"baseName":"server","dir":"/Users/bon/Documents/my-workspace/perfect-blog/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir }));
}

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/bon/Documents/my-workspace/perfect-blog","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/bon/Documents/my-workspace/perfect-blog/server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/bon/Documents/my-workspace/perfect-blog/.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/bon/Documents/my-workspace/perfect-blog/.nuxt/cache","ignore":["**/node_modules/**","**/.git/**"]}));

function defineRenderHandler(handler) {
  return eventHandler(async (event) => {
    if (event.req.url.endsWith("/favicon.ico")) {
      event.res.setHeader("Content-Type", "image/x-icon");
      event.res.end("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      return;
    }
    const response = await handler(event);
    if (!response) {
      if (!event.res.writableEnded) {
        event.res.statusCode = event.res.statusCode === 200 ? 500 : event.res.statusCode;
        event.res.end("No response returned from render handler: " + event.req.url);
      }
      return;
    }
    const nitroApp = useNitroApp();
    await nitroApp.hooks.callHook("render:response", response, { event });
    if (!event.res.headersSent && response.headers) {
      for (const header in response.headers) {
        event.res.setHeader(header, response.headers[header]);
      }
      if (response.statusCode) {
        event.res.statusCode = response.statusCode;
      }
      if (response.statusMessage) {
        event.res.statusMessage = response.statusMessage;
      }
    }
    if (!event.res.writableEnded) {
      event.res.end(typeof response.body === "string" ? response.body : JSON.stringify(response.body));
    }
  });
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    stack: statusCode !== 404 ? `<pre>${stack.map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n")}</pre>` : "",
    data: error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.req.url?.startsWith("/__nuxt_error");
  let html = !isErrorPage ? await $fetch(withQuery("/__nuxt_error", errorObject)).catch(() => null) : null;
  if (!html) {
    const { template } = await import('file:///Users/bon/Documents/my-workspace/perfect-blog/node_modules/@nuxt/ui-templates/dist/templates/error-dev.mjs') ;
    {
      errorObject.description = errorObject.message;
    }
    html = template(errorObject);
  }
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const _zB0uKI = defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "perfect-blog.vercel.app";
  const mainDomain = ["localhost:3000", "perfect-blog.vercel.app"];
  if (!mainDomain.includes(hostname)) {
    const currentHost = hostname.replace(`.localhost:3000`, "");
    console.log("currentHost", currentHost);
    context.subdomain = currentHost;
  }
});

const _PYpkU5 = defineEventHandler(async (event) => {
  const { req, res } = event;
  const referrer = req.headers.referer;
  const cookie = useCookies(event);
  const accessToken = cookie["sb-access-token"];
  const refreshToken = cookie["sb-refresh-token"];
  if (req.url === "/login" && referrer && accessToken && refreshToken) {
    return await sendRedirect(
      event,
      referrer + `#access_token=${accessToken}&expires_in=604800&provider_token=${process.env.GITHUB_PROVIDER_TOKEN}&refresh_token=${refreshToken}&token_type=bearer`,
      302
    );
  }
});

const config = useRuntimeConfig().public;
const _ztXju3 = defineEventHandler(async (event) => {
  assertMethod(event, "POST");
  const body = await readBody(event);
  const cookieOptions = config.supabase.cookies;
  const { event: signEvent, session } = body;
  if (!event) {
    throw new Error("Auth event missing!");
  }
  if (signEvent === "SIGNED_IN") {
    if (!session) {
      throw new Error("Auth session missing!");
    }
    setCookie(
      event,
      `${cookieOptions.name}-access-token`,
      session.access_token,
      {
        domain: cookieOptions.domain,
        maxAge: cookieOptions.lifetime ?? 0,
        path: cookieOptions.path,
        sameSite: cookieOptions.sameSite
      }
    );
  }
  if (signEvent === "SIGNED_OUT") {
    setCookie(
      event,
      `${cookieOptions.name}-access-token`,
      "",
      {
        maxAge: -1,
        path: cookieOptions.path
      }
    );
  }
  return "auth cookie set";
});

const _lazy_oZuyLT = () => Promise.resolve().then(function () { return userValidation_post$1; });
const _lazy_oXpEnF = () => Promise.resolve().then(function () { return requestDelegation$1; });
const _lazy_XEwlFl = () => Promise.resolve().then(function () { return deleteDomain_post$1; });
const _lazy_QHCV9v = () => Promise.resolve().then(function () { return checkDomain_post$1; });
const _lazy_oiAovE = () => Promise.resolve().then(function () { return addDomain_post$1; });
const _lazy_gVTWXa = () => Promise.resolve().then(function () { return session_post$1; });
const _lazy_14u1KD = () => Promise.resolve().then(function () { return _slug_$1; });
const _lazy_PY0J3J = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _zB0uKI, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _PYpkU5, lazy: false, middleware: true, method: undefined },
  { route: '/api/user-validation', handler: _lazy_oZuyLT, lazy: true, middleware: false, method: "post" },
  { route: '/api/request-delegation', handler: _lazy_oXpEnF, lazy: true, middleware: false, method: undefined },
  { route: '/api/delete-domain', handler: _lazy_XEwlFl, lazy: true, middleware: false, method: "post" },
  { route: '/api/check-domain', handler: _lazy_QHCV9v, lazy: true, middleware: false, method: "post" },
  { route: '/api/add-domain', handler: _lazy_oiAovE, lazy: true, middleware: false, method: "post" },
  { route: '/api/_supabase/session', handler: _lazy_gVTWXa, lazy: true, middleware: false, method: "post" },
  { route: '/og/:slug', handler: _lazy_14u1KD, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_PY0J3J, lazy: true, middleware: false, method: undefined },
  { route: '/api/_supabase/session', handler: _ztXju3, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_PY0J3J, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(true),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const server = new Server(nitroApp.h3App.nodeHandler);
function getAddress() {
  if (provider === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET) {
    return "0";
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (isWindows) {
    return join("\\\\.\\pipe\\nitro", socketName);
  } else {
    const socketDir = join(tmpdir(), "nitro");
    mkdirSync(socketDir, { recursive: true });
    return join(socketDir, socketName);
  }
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address.port }
  });
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection]", err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException]", err));
}

const userValidation_post = defineEventHandler(async (event) => {
  await useBody(event);
  event.req.headers.host;
  return "auth cookie set";
});

const userValidation_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': userValidation_post
});

const requestDelegation = defineEventHandler((event) => {
  return "Hello add-domain";
});

const requestDelegation$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': requestDelegation
});

const deleteDomain_post = defineEventHandler(async (event) => {
  try {
    const { domain, user_id } = await useBody(event);
    if (Array.isArray(domain) || Array.isArray(user_id))
      createError({ statusCode: 400, statusMessage: "Bad request. Query parameters are not valid." });
    const data = await $fetch(
      `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${domain}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`
        }
      }
    );
    console.log({ domain, data });
    return data;
  } catch (err) {
    return createError({ statusCode: 500, statusMessage: err });
  }
});

const deleteDomain_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': deleteDomain_post
});

const serverSupabaseClient = (event) => {
  const { supabase: { url, key, client: clientOptions, cookies: cookieOptions } } = useRuntimeConfig().public;
  if (!event.context._supabaseClient) {
    const supabaseClient = createClient(url, key, clientOptions);
    const token = useCookie(event, `${cookieOptions.name}-access-token`);
    supabaseClient.auth.setAuth(token);
    event.context._supabaseClient = supabaseClient;
    event.context._token = token;
  }
  return event.context._supabaseClient;
};

const serverSupabaseUser = async (event) => {
  const client = serverSupabaseClient(event);
  if (!event.context._token) {
    return null;
  }
  const { user: supabaseUser, error } = await client.auth.api.getUser(event.context._token);
  event.context._user = error ? null : supabaseUser;
  return event.context._user;
};

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

const checkDomain_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': checkDomain_post
});

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

const addDomain_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': addDomain_post
});

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

const session_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': session_post
});

const useUrl = () => "http://localhost:3000" ;

const _slug_ = defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const url = useUrl();
  const slug = event.context.params.slug;
  const fonts = ["arial.ttf", "arial_bold.ttf"];
  try {
    const { data, error } = await client.from("posts").select("title, profiles(name, avatar_url)").eq("slug", slug).single();
    if (error)
      throw Error(error.message);
    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            letterSpacing: "-.02em",
            fontWeight: 700,
            background: "#f8f9fa"
          },
          children: [
            {
              type: "img",
              props: {
                style: {
                  right: 42,
                  bottom: 42,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  width: "300px"
                },
                src: url + "/banner.png"
              }
            },
            {
              type: "div",
              props: {
                style: {
                  left: 42,
                  bottom: 42,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center"
                },
                children: [
                  {
                    type: "img",
                    props: {
                      style: {
                        width: "70px",
                        height: "70px",
                        borderRadius: "9999px"
                      },
                      src: data.profiles.avatar_url
                    }
                  },
                  {
                    type: "p",
                    props: {
                      style: {
                        marginLeft: "20px",
                        fontSize: "24px"
                      },
                      children: data.profiles.name
                    }
                  }
                ]
              }
            },
            {
              type: "div",
              props: {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  padding: "20px 50px",
                  margin: "0 42px 150px 42px",
                  fontSize: "64px",
                  width: "auto",
                  maxWidth: 1200 - 48 * 2,
                  textAlign: "center",
                  backgroundColor: "#2D2D2D",
                  borderRadius: "30px",
                  color: "white",
                  lineHeight: 1.4
                },
                children: data.title
              }
            }
          ]
        }
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Arial",
            data: readFileSync(join(process.cwd(), "public/fonts", fonts[0])),
            weight: 400,
            style: "normal"
          },
          {
            name: "Arial",
            data: readFileSync(join(process.cwd(), "public/fonts", fonts[1])),
            weight: 700,
            style: "normal"
          }
        ]
      }
    );
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: "width",
        value: 1200
      },
      font: {
        fontFiles: fonts.map((i) => join(resolve("."), "public/fonts", i)),
        loadSystemFonts: false
      }
    });
    const resolved = await Promise.all(
      resvg.imagesToResolve().map(async (url2) => {
        console.info("image url", url2);
        const img = await fetch(url2);
        const buffer = await img.arrayBuffer();
        return {
          url: url2,
          buffer: Buffer.from(buffer)
        };
      })
    );
    if (resolved.length > 0) {
      for (const result of resolved) {
        const { url: url2, buffer } = result;
        resvg.resolveImage(url2, buffer);
      }
    }
    const renderData = resvg.render();
    const pngBuffer = renderData.asPng();
    event.res.setHeader("Cache-Control", "s-maxage=7200, stale-while-revalidate");
    return pngBuffer;
  } catch (err) {
    return createError({ statusCode: 500, statusMessage: err });
  }
});

const _slug_$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': _slug_
});

function buildAssetsURL(...path) {
  return joinURL(publicAssetsURL(), useRuntimeConfig().app.buildAssetsDir, ...path);
}
function publicAssetsURL(...path) {
  const publicBase = useRuntimeConfig().app.cdnURL || useRuntimeConfig().app.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
}

const getClientManifest = () => import('/Users/bon/Documents/my-workspace/perfect-blog/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getServerEntry = () => import('/Users/bon/Documents/my-workspace/perfect-blog/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return `<div id="__nuxt">${html}</div>`;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const options = {
    manifest,
    renderToString: () => '<div id="__nuxt"></div>',
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig();
    ssrContext.payload = {
      serverRendered: false,
      config: {
        public: config.public,
        app: config.app
      },
      data: {},
      state: {}
    };
    ssrContext.renderMeta = ssrContext.renderMeta ?? (() => ({}));
    return Promise.resolve(result);
  };
  return { renderToString };
});
const PAYLOAD_URL_RE = /\/_payload(\.[a-zA-Z0-9]+)?.js(\?.*)?$/;
const renderer = defineRenderHandler(async (event) => {
  const ssrError = event.req.url?.startsWith("/__nuxt_error") ? getQuery(event) : null;
  let url = ssrError?.url || event.req.url;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url);
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event.req.url = url;
  }
  const ssrContext = {
    url,
    event,
    req: event.req,
    res: event.res,
    runtimeConfig: useRuntimeConfig(),
    noSSR: !!event.req.headers["x-nuxt-no-ssr"] || (false),
    error: !!ssrError,
    nuxt: void 0,
    payload: ssrError ? { error: ssrError } : {}
  };
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  const _rendered = await renderer.renderToString(ssrContext).catch((err) => {
    if (!ssrError) {
      throw ssrContext.payload?.error || err;
    }
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext });
  if (!_rendered) {
    return void 0;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    return response2;
  }
  const renderedMeta = await ssrContext.renderMeta?.() ?? {};
  const inlinedStyles = "";
  const htmlContext = {
    htmlAttrs: normalizeChunks([renderedMeta.htmlAttrs]),
    head: normalizeChunks([
      renderedMeta.headTags,
      null,
      _rendered.renderResourceHints(),
      _rendered.renderStyles(),
      inlinedStyles,
      ssrContext.styles
    ]),
    bodyAttrs: normalizeChunks([renderedMeta.bodyAttrs]),
    bodyPreprend: normalizeChunks([
      renderedMeta.bodyScriptsPrepend,
      ssrContext.teleports?.body
    ]),
    body: [
      _rendered.html
    ],
    bodyAppend: normalizeChunks([
      `<script>window.__NUXT__=${devalue(ssrContext.payload)}<\/script>`,
      _rendered.renderScripts(),
      renderedMeta.bodyScripts
    ])
  };
  const nitroApp = useNitroApp();
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: event.res.statusCode,
    statusMessage: event.res.statusMessage,
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "X-Powered-By": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  return chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html>
<html ${joinAttrs(html.htmlAttrs)}>
<head>${joinTags(html.head)}</head>
<body ${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPreprend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>
</html>`;
}
function renderPayloadResponse(ssrContext) {
  return {
    body: `export default ${devalue(splitPayload(ssrContext).payload)}`,
    statusCode: ssrContext.event.res.statusCode,
    statusMessage: ssrContext.event.res.statusMessage,
    headers: {
      "content-type": "text/javascript;charset=UTF-8",
      "x-powered-by": "Nuxt"
    }
  };
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': renderer
});
//# sourceMappingURL=index.mjs.map
