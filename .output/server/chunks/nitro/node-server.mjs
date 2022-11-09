globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, setResponseHeader, createError, useCookies, assertMethod, readBody, setCookie, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, withLeadingSlash, withoutTrailingSlash, joinURL } from 'ufo';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{"supabase":{"url":"https://xwbvsqjgfezyuektkwml.supabase.co","key":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3YnZzcWpnZmV6eXVla3Rrd21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU2NTM5MjMsImV4cCI6MTk4MTIyOTkyM30.t5LV73LoXTfY91-3U6GxqvDHgvCyzK47pk2eilqpUtw","client":{},"cookies":{"name":"sb","lifetime":28800,"domain":"","path":"/","sameSite":"lax"}}},"supabase":{}};
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
const config$2 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$2;
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
const timingMiddleware = eventHandler((event) => {
  const start = globalTiming.start();
  const _end = event.res.end;
  event.res.end = function(chunk, encoding, cb) {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!event.res.headersSent) {
      event.res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(event.res, chunk, encoding, cb);
    return this;
  }.bind(event.res);
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const config$1 = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(createRouter({ routes: config$1.nitro.routeRules }));
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(event, routeRules.redirect.to, routeRules.redirect.statusCode);
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(path);
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
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
  const validate = opts.validate || (() => true);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
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
      if (validate(entry)) {
        useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
      }
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
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
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
    let _resSendBody;
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
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          for (const header in headers2) {
            this.setHeader(header, headers2[header]);
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event) || _resSendBody;
    const headers = event.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
    headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
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
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
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

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
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
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
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
    stack: "",
    data: error.data
  };
  event.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.res.statusMessage = errorObject.statusMessage;
  }
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
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery("/__nuxt_error", errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.res.statusMessage = res.statusText;
  }
  event.res.end(await res.text());
});

const assets = {
  "/banner.png": {
    "type": "image/png",
    "etag": "\"118a-hSkXtOlLv2db4NvZ83GkDpBXMJA\"",
    "mtime": "2022-11-08T13:59:33.771Z",
    "size": 4490,
    "path": "../public/banner.png"
  },
  "/hero.png": {
    "type": "image/png",
    "etag": "\"2815f-/IECx4R5opdflCqvIU3XY80ymNU\"",
    "mtime": "2022-11-08T13:59:33.768Z",
    "size": 164191,
    "path": "../public/hero.png"
  },
  "/logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"318-MXT3G5UxDEFrCL5YIzOxAwGjM90\"",
    "mtime": "2022-11-08T13:59:33.768Z",
    "size": 792,
    "path": "../public/logo.svg"
  },
  "/og.png": {
    "type": "image/png",
    "etag": "\"328e-CvE7P93p5GygGtd2T49/sVkaROs\"",
    "mtime": "2022-11-08T13:59:33.768Z",
    "size": 12942,
    "path": "../public/og.png"
  },
  "/fonts/arial.ttf": {
    "type": "font/ttf",
    "etag": "\"fd128-ZhVAYumQLWZk+YVb/AQTjosMfFM\"",
    "mtime": "2022-11-08T13:59:33.771Z",
    "size": 1036584,
    "path": "../public/fonts/arial.ttf"
  },
  "/fonts/arial_bold.ttf": {
    "type": "font/ttf",
    "etag": "\"ef714-A+pV1CkDwEGx/2TCvVk/t7nTqEM\"",
    "mtime": "2022-11-08T13:59:33.770Z",
    "size": 980756,
    "path": "../public/fonts/arial_bold.ttf"
  },
  "/_nuxt/Button.cf3eda74.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"208-npilzlAR47qmd1lVbimI3EyMtks\"",
    "mtime": "2022-11-08T13:59:33.767Z",
    "size": 520,
    "path": "../public/_nuxt/Button.cf3eda74.css"
  },
  "/_nuxt/Button.vue_vue_type_style_index_0_lang.a355e8f2.js": {
    "type": "application/javascript",
    "etag": "\"135-+IID7rUdEIIhFNASUClVTf+2EKg\"",
    "mtime": "2022-11-08T13:59:33.767Z",
    "size": 309,
    "path": "../public/_nuxt/Button.vue_vue_type_style_index_0_lang.a355e8f2.js"
  },
  "/_nuxt/Card.vue_vue_type_script_setup_true_lang.2c7fa91d.js": {
    "type": "application/javascript",
    "etag": "\"6c7-8zv7yxOjHKZT7Yb6EbqE0WPiIMY\"",
    "mtime": "2022-11-08T13:59:33.767Z",
    "size": 1735,
    "path": "../public/_nuxt/Card.vue_vue_type_script_setup_true_lang.2c7fa91d.js"
  },
  "/_nuxt/Command.vue_vue_type_script_setup_true_lang.66e65092.js": {
    "type": "application/javascript",
    "etag": "\"49ed-r0EffFnKwkg5oFUoy+NHDXmekaY\"",
    "mtime": "2022-11-08T13:59:33.766Z",
    "size": 18925,
    "path": "../public/_nuxt/Command.vue_vue_type_script_setup_true_lang.66e65092.js"
  },
  "/_nuxt/Loader.9f0d61ed.js": {
    "type": "application/javascript",
    "etag": "\"22b-qV1Ii7i4So2bhE2GetR6uSWKpoU\"",
    "mtime": "2022-11-08T13:59:33.766Z",
    "size": 555,
    "path": "../public/_nuxt/Loader.9f0d61ed.js"
  },
  "/_nuxt/Logo.aadd9ea8.js": {
    "type": "application/javascript",
    "etag": "\"2be-xGSj1ZiKgIQ8P2fRnTreVVT3Bo8\"",
    "mtime": "2022-11-08T13:59:33.766Z",
    "size": 702,
    "path": "../public/_nuxt/Logo.aadd9ea8.js"
  },
  "/_nuxt/Modal.vue_vue_type_script_setup_true_lang.f32758ff.js": {
    "type": "application/javascript",
    "etag": "\"797-5gU/Veb2O+OMhJuqgiirXEC8Ruw\"",
    "mtime": "2022-11-08T13:59:33.766Z",
    "size": 1943,
    "path": "../public/_nuxt/Modal.vue_vue_type_script_setup_true_lang.f32758ff.js"
  },
  "/_nuxt/_commonjsHelpers.a7148835.js": {
    "type": "application/javascript",
    "etag": "\"256-6uOMMI/YLTI3cVIDyGJaQtfiMxo\"",
    "mtime": "2022-11-08T13:59:33.765Z",
    "size": 598,
    "path": "../public/_nuxt/_commonjsHelpers.a7148835.js"
  },
  "/_nuxt/_id_.09993e52.js": {
    "type": "application/javascript",
    "etag": "\"846cd-EN3Y6174t30cpsYAnUQaYkrSOrk\"",
    "mtime": "2022-11-08T13:59:33.765Z",
    "size": 542413,
    "path": "../public/_nuxt/_id_.09993e52.js"
  },
  "/_nuxt/_id_.b7cb788e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3ef1-wiMj2xMewIL3zSIlV2voNrlBGvY\"",
    "mtime": "2022-11-08T13:59:33.764Z",
    "size": 16113,
    "path": "../public/_nuxt/_id_.b7cb788e.css"
  },
  "/_nuxt/_plugin-vue_export-helper.a1a6add7.js": {
    "type": "application/javascript",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2022-11-08T13:59:33.764Z",
    "size": 91,
    "path": "../public/_nuxt/_plugin-vue_export-helper.a1a6add7.js"
  },
  "/_nuxt/_siteId_.64436412.js": {
    "type": "application/javascript",
    "etag": "\"23a-QyZ0aNIN7Rbjk6PuQYt8gUS0/RA\"",
    "mtime": "2022-11-08T13:59:33.764Z",
    "size": 570,
    "path": "../public/_nuxt/_siteId_.64436412.js"
  },
  "/_nuxt/_slug_.942c177b.js": {
    "type": "application/javascript",
    "etag": "\"b59-W7bhmLXRA2JkGUS1ZACt9b7dp9U\"",
    "mtime": "2022-11-08T13:59:33.763Z",
    "size": 2905,
    "path": "../public/_nuxt/_slug_.942c177b.js"
  },
  "/_nuxt/asyncData.ef5d71f7.js": {
    "type": "application/javascript",
    "etag": "\"a06-EbC6Zx6j+p/Q9NYY+RIZscXepOU\"",
    "mtime": "2022-11-08T13:59:33.763Z",
    "size": 2566,
    "path": "../public/_nuxt/asyncData.ef5d71f7.js"
  },
  "/_nuxt/auth.05a2a952.js": {
    "type": "application/javascript",
    "etag": "\"91-Is0NRvDySJPB/zAskRb2+PFwANI\"",
    "mtime": "2022-11-08T13:59:33.763Z",
    "size": 145,
    "path": "../public/_nuxt/auth.05a2a952.js"
  },
  "/_nuxt/browser-ponyfill.968ef1cb.js": {
    "type": "application/javascript",
    "etag": "\"2273-wDiNFhtHbJ0/koYIB+eNp2aOkNs\"",
    "mtime": "2022-11-08T13:59:33.762Z",
    "size": 8819,
    "path": "../public/_nuxt/browser-ponyfill.968ef1cb.js"
  },
  "/_nuxt/components.2b7b3845.js": {
    "type": "application/javascript",
    "etag": "\"cf4-F9h3AegRfiF5t4yZRoEyQGflA5w\"",
    "mtime": "2022-11-08T13:59:33.762Z",
    "size": 3316,
    "path": "../public/_nuxt/components.2b7b3845.js"
  },
  "/_nuxt/dashboard.8f143b7b.js": {
    "type": "application/javascript",
    "etag": "\"38d-1Zo9gy2nSOs2EnqreTf8otZ9PM8\"",
    "mtime": "2022-11-08T13:59:33.761Z",
    "size": 909,
    "path": "../public/_nuxt/dashboard.8f143b7b.js"
  },
  "/_nuxt/dashboard.ea383da8.js": {
    "type": "application/javascript",
    "etag": "\"553-kTK07HVBIhZkgtQEP60FohRu6Z0\"",
    "mtime": "2022-11-08T13:59:33.761Z",
    "size": 1363,
    "path": "../public/_nuxt/dashboard.ea383da8.js"
  },
  "/_nuxt/default.2265aab0.js": {
    "type": "application/javascript",
    "etag": "\"51a-6Wslg6dMhfbxhSRyr2Do5/xGHv0\"",
    "mtime": "2022-11-08T13:59:33.760Z",
    "size": 1306,
    "path": "../public/_nuxt/default.2265aab0.js"
  },
  "/_nuxt/domain.ed0e6479.js": {
    "type": "application/javascript",
    "etag": "\"961-ZRSr8PkL5kX/DHovyKm+5D9U6R0\"",
    "mtime": "2022-11-08T13:59:33.760Z",
    "size": 2401,
    "path": "../public/_nuxt/domain.ed0e6479.js"
  },
  "/_nuxt/entry.1f3e2cd7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"85df-SetwqvNT0IW9t/QGZoiZh2/UGaE\"",
    "mtime": "2022-11-08T13:59:33.760Z",
    "size": 34271,
    "path": "../public/_nuxt/entry.1f3e2cd7.css"
  },
  "/_nuxt/entry.35b9f3be.js": {
    "type": "application/javascript",
    "etag": "\"38503-qe2IAw7DWIN8kSzy0Y5/t+lvL94\"",
    "mtime": "2022-11-08T13:59:33.759Z",
    "size": 230659,
    "path": "../public/_nuxt/entry.35b9f3be.js"
  },
  "/_nuxt/error-404.18ced855.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-F8gJ3uSz6Dg2HRyb374Ax3RegKE\"",
    "mtime": "2022-11-08T13:59:33.759Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.18ced855.css"
  },
  "/_nuxt/error-404.6f4c986b.js": {
    "type": "application/javascript",
    "etag": "\"8e4-yHJlULsZgB79EYAaBPt0bKUSS64\"",
    "mtime": "2022-11-08T13:59:33.759Z",
    "size": 2276,
    "path": "../public/_nuxt/error-404.6f4c986b.js"
  },
  "/_nuxt/error-500.c403114d.js": {
    "type": "application/javascript",
    "etag": "\"78d-DD3SAE3criXDxmHkSzU+FuT2/NI\"",
    "mtime": "2022-11-08T13:59:33.758Z",
    "size": 1933,
    "path": "../public/_nuxt/error-500.c403114d.js"
  },
  "/_nuxt/error-500.e60962de.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-VhleGjkSRH7z4cQDJV3dxcboMhU\"",
    "mtime": "2022-11-08T13:59:33.758Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.e60962de.css"
  },
  "/_nuxt/error-component.4430a8e2.js": {
    "type": "application/javascript",
    "etag": "\"4c9-H8oEjqtw821+fqs/iwjANnilgmI\"",
    "mtime": "2022-11-08T13:59:33.758Z",
    "size": 1225,
    "path": "../public/_nuxt/error-component.4430a8e2.js"
  },
  "/_nuxt/functions.0aa32198.js": {
    "type": "application/javascript",
    "etag": "\"512-/62g1MAzL/s2VPfZFg5l4hs51Xw\"",
    "mtime": "2022-11-08T13:59:33.758Z",
    "size": 1298,
    "path": "../public/_nuxt/functions.0aa32198.js"
  },
  "/_nuxt/head.97b36038.js": {
    "type": "application/javascript",
    "etag": "\"455-kSqTpTEy/yNbL0AQv1QM5xUS9Ko\"",
    "mtime": "2022-11-08T13:59:33.757Z",
    "size": 1109,
    "path": "../public/_nuxt/head.97b36038.js"
  },
  "/_nuxt/home.81f490fa.js": {
    "type": "application/javascript",
    "etag": "\"d2-DVWpZqoUIvYQTB5ad4C4j4Z2J10\"",
    "mtime": "2022-11-08T13:59:33.757Z",
    "size": 210,
    "path": "../public/_nuxt/home.81f490fa.js"
  },
  "/_nuxt/index.233d62c3.js": {
    "type": "application/javascript",
    "etag": "\"d8-FA5MJhRdrin4ZrVEftxJW45QagA\"",
    "mtime": "2022-11-08T13:59:33.757Z",
    "size": 216,
    "path": "../public/_nuxt/index.233d62c3.js"
  },
  "/_nuxt/index.adc8bbd4.js": {
    "type": "application/javascript",
    "etag": "\"21b9-Ffx8jIa1+lPvWpHhPSpiw9RLe0s\"",
    "mtime": "2022-11-08T13:59:33.757Z",
    "size": 8633,
    "path": "../public/_nuxt/index.adc8bbd4.js"
  },
  "/_nuxt/index.e302d756.js": {
    "type": "application/javascript",
    "etag": "\"530-vO4vDKE2TfuocGChRyzSrZXkSyE\"",
    "mtime": "2022-11-08T13:59:33.756Z",
    "size": 1328,
    "path": "../public/_nuxt/index.e302d756.js"
  },
  "/_nuxt/index.ed37edad.js": {
    "type": "application/javascript",
    "etag": "\"5ec6-hiOkYGzXlBoXPjarXKDQsiIXYbQ\"",
    "mtime": "2022-11-08T13:59:33.756Z",
    "size": 24262,
    "path": "../public/_nuxt/index.ed37edad.js"
  },
  "/_nuxt/index.f02091c8.js": {
    "type": "application/javascript",
    "etag": "\"838-3ivSLcndGsjBWYwslb9d1Lx81L4\"",
    "mtime": "2022-11-08T13:59:33.756Z",
    "size": 2104,
    "path": "../public/_nuxt/index.f02091c8.js"
  },
  "/_nuxt/login.a60bdb3b.js": {
    "type": "application/javascript",
    "etag": "\"1dc-uXTt1fnI5io9j8abrzWkzQsz0eg\"",
    "mtime": "2022-11-08T13:59:33.756Z",
    "size": 476,
    "path": "../public/_nuxt/login.a60bdb3b.js"
  },
  "/_nuxt/logout.b2147fa0.js": {
    "type": "application/javascript",
    "etag": "\"c5-DH5t/hS9bwl2z1gztsBefNzqFE8\"",
    "mtime": "2022-11-08T13:59:33.755Z",
    "size": 197,
    "path": "../public/_nuxt/logout.b2147fa0.js"
  },
  "/_nuxt/nuxt-img.e89747e3.js": {
    "type": "application/javascript",
    "etag": "\"a34-QJfHf/9TDb8hf2gZW1+MTPd0cbo\"",
    "mtime": "2022-11-08T13:59:33.755Z",
    "size": 2612,
    "path": "../public/_nuxt/nuxt-img.e89747e3.js"
  },
  "/_nuxt/posts.0813e7a5.js": {
    "type": "application/javascript",
    "etag": "\"33e-V+Ce4Mf5oTKXaR7cFL2qZ37QTLE\"",
    "mtime": "2022-11-08T13:59:33.755Z",
    "size": 830,
    "path": "../public/_nuxt/posts.0813e7a5.js"
  },
  "/_nuxt/posts.8077029b.js": {
    "type": "application/javascript",
    "etag": "\"762-vaHA2+pd9EtAouGVfQ+gRGrRnNc\"",
    "mtime": "2022-11-08T13:59:33.755Z",
    "size": 1890,
    "path": "../public/_nuxt/posts.8077029b.js"
  },
  "/_nuxt/profile.62feec55.js": {
    "type": "application/javascript",
    "etag": "\"3bb-6juqeGb7+vUs8J6MC+YzCC4cV4E\"",
    "mtime": "2022-11-08T13:59:33.754Z",
    "size": 955,
    "path": "../public/_nuxt/profile.62feec55.js"
  },
  "/_nuxt/string-strip-html.esm.22e52bb0.js": {
    "type": "application/javascript",
    "etag": "\"22ce7-IiVy8m3aTGd4u2lHwKRpak+osKI\"",
    "mtime": "2022-11-08T13:59:33.754Z",
    "size": 142567,
    "path": "../public/_nuxt/string-strip-html.esm.22e52bb0.js"
  },
  "/_nuxt/url.221072b4.js": {
    "type": "application/javascript",
    "etag": "\"31-Pp6UMavoQGm6Y9esCJAaeMwxCBY\"",
    "mtime": "2022-11-08T13:59:33.754Z",
    "size": 49,
    "path": "../public/_nuxt/url.221072b4.js"
  },
  "/_nuxt/user.e0e0d784.js": {
    "type": "application/javascript",
    "etag": "\"a8a-biIhVEi1srwUjDFZWLKZzx5aEdU\"",
    "mtime": "2022-11-08T13:59:33.753Z",
    "size": 2698,
    "path": "../public/_nuxt/user.e0e0d784.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort().concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end();
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end();
      return;
    }
  }
  if (asset.type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.getHeader("ETag")) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.getHeader("Last-Modified")) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.res.getHeader("Content-Encoding")) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size && !event.res.getHeader("Content-Length")) {
    event.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _zB0uKI = defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "meetoon.co";
  const mainDomain = ["localhost:3000", "meetoon.co"];
  console.log("hostname", hostname);
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
      referrer + `#access_token=${accessToken}&expires_in=604800&provider_token=${process.env.FB_PROVIDER_TOKEN}&refresh_token=${refreshToken}&token_type=bearer`,
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

const _lazy_oZuyLT = () => import('../user-validation.post.mjs');
const _lazy_oXpEnF = () => import('../request-delegation.mjs');
const _lazy_XEwlFl = () => import('../delete-domain.post.mjs');
const _lazy_QHCV9v = () => import('../check-domain.post.mjs');
const _lazy_oiAovE = () => import('../add-domain.post.mjs');
const _lazy_gVTWXa = () => import('../session.post.mjs');
const _lazy_14u1KD = () => import('../_slug_.mjs');
const _lazy_PY0J3J = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
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
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(h.route.replace(/:\w+|\*\*/g, "_"));
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
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

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useNitroApp as a, getRouteRules as g, nodeServer as n, useRuntimeConfig as u };
//# sourceMappingURL=node-server.mjs.map