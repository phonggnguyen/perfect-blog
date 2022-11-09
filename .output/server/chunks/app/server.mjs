import { getCurrentInstance, toRef, isRef, inject, unref, getCurrentScope, onScopeDispose, version as version$7, defineComponent, h, computed, Suspense, nextTick, Transition, provide, reactive, useSSRContext, ref, resolveComponent, watch, shallowRef, mergeProps, withCtx, createVNode, createApp, defineAsyncComponent, onErrorCaptured, watchEffect } from 'vue';
import { $fetch } from 'ohmyfetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import destr from 'destr';
import { hasProtocol, parseURL, joinURL, isEqual, withLeadingSlash, stringifyQuery } from 'ufo';
import { createError as createError$1, sendRedirect, appendHeader } from 'h3';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter } from 'vue-router';
import { defu } from 'defu';
import require$$2 from 'events';
import require$$1 from 'unenv/runtime/npm/debug';
import require$$1$1 from 'util';
import require$$0$3 from 'crypto';
import require$$2$1 from 'url';
import require$$0$1 from 'bufferutil';
import require$$0$2 from 'buffer';
import require$$5 from 'utf-8-validate';
import require$$3 from 'http';
import require$$4 from 'https';
import require$$1$2 from 'typedarray-to-buffer';
import require$$2$2 from 'yaeti';
import { parse, serialize as serialize$1 } from 'cookie-es';
import { isEqual as isEqual$1 } from 'ohash';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSuspense } from 'vue/server-renderer';
import { u as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name2, value) => {
    const $name = "$" + name2;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a2;
      if (prop === "public") {
        return target.public;
      }
      return (_a2 = target[prop]) != null ? _a2 : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a2;
  return (_a2 = useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a2;
  return (_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.event;
}
const CookieDefaults = {
  path: "/",
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name2, _opts) {
  var _a2, _b2;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref((_b2 = cookies[name2]) != null ? _b2 : (_a2 = opts.default) == null ? void 0 : _a2.call(opts));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual$1(cookie.value, cookies[name2])) {
        writeServerCookie(useRequestEvent(nuxtApp), name2, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:redirected", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  var _a2;
  {
    return parse(((_a2 = useRequestEvent()) == null ? void 0 : _a2.req.headers.cookie) || "", opts);
  }
}
function serializeCookie$1(name2, value, opts = {}) {
  if (value === null || value === void 0) {
    return serialize$1(name2, value, { ...opts, maxAge: -1 });
  }
  return serialize$1(name2, value, opts);
}
function writeServerCookie(event, name2, value, opts = {}) {
  if (event) {
    appendHeader(event, "Set-Cookie", serializeCookie$1(name2, value, opts));
  }
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      const prefetched = ref(false);
      const el = void 0;
      return () => {
        var _a2, _b2, _c2;
        if (!isExternal.value) {
          return h(
            resolveComponent("RouterLink"),
            {
              ref: void 0,
              to: to.value,
              ...prefetched.value && !props.custom ? { class: props.prefetchedClass || options.prefetchedClass } : {},
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b2 = (_a2 = router.resolve(to.value)) == null ? void 0 : _a2.href) != null ? _b2 : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_c2 = slots.default) == null ? void 0 : _c2.call(slots));
      };
    }
  });
}
const __nuxt_component_0$2 = defineNuxtLink({ componentName: "NuxtLink" });
function isObject(val) {
  return val !== null && typeof val === "object";
}
function _defu(baseObj, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObj, {}, namespace, merger);
  }
  const obj = Object.assign({}, defaults);
  for (const key in baseObj) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const val = baseObj[key];
    if (val === null || val === void 0) {
      continue;
    }
    if (merger && merger(obj, key, val, namespace)) {
      continue;
    }
    if (Array.isArray(val) && Array.isArray(obj[key])) {
      obj[key] = val.concat(obj[key]);
    } else if (isObject(val) && isObject(obj[key])) {
      obj[key] = _defu(val, obj[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      obj[key] = val;
    }
  }
  return obj;
}
function createDefu(merger) {
  return (...args) => args.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defuFn = createDefu((obj, key, currentValue, _namespace) => {
  if (typeof obj[key] !== "undefined" && typeof currentValue === "function") {
    obj[key] = currentValue(obj[key]);
    return true;
  }
});
const inlineConfig = {};
defuFn(inlineConfig);
function useHead(meta) {
  useNuxtApp()._useHead(meta);
}
const components = {};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name2 in components) {
    nuxtApp.vueApp.component(name2, components[name2]);
    nuxtApp.vueApp.component("Lazy" + name2, components[name2]);
  }
});
const isClient = false;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const noop$3 = () => {
};
const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key);
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive, pause, resume, eventFilter };
}
function identity(arg) {
  return arg;
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function set(...args) {
  if (args.length === 2) {
    const [ref2, value] = args;
    ref2.value = value;
  }
  if (args.length === 3) {
    {
      const [target, key, value] = args;
      target[key] = value;
    }
  }
}
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$6.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$6.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchWithFilter(source, cb, options = {}) {
  const _a2 = options, {
    eventFilter = bypassFilter
  } = _a2, watchOptions = __objRest$5(_a2, [
    "eventFilter"
  ]);
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
var __defProp$2 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchPausable(source, cb, options = {}) {
  const _a2 = options, {
    eventFilter: filter
  } = _a2, watchOptions = __objRest$1(_a2, [
    "eventFilter"
  ]);
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter);
  const stop = watchWithFilter(source, cb, __spreadProps$2(__spreadValues$2({}, watchOptions), {
    eventFilter
  }));
  return { stop, pause, resume, isActive };
}
var PROVIDE_KEY = "usehead";
var HEAD_COUNT_KEY = "head:count";
var HEAD_ATTRS_KEY = "data-head-attrs";
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var BODY_TAG_ATTR_NAME = "data-meta-body";
var propsToString = (props) => {
  const handledAttributes = [];
  for (const [key, value] of Object.entries(props)) {
    if (value === false || value == null)
      continue;
    let attribute = key;
    if (value !== true)
      attribute += `="${String(value).replace(/"/g, "&quot;")}"`;
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? ` ${handledAttributes.join(" ")}` : "";
};
var tagToString = (tag) => {
  const attrs = propsToString(tag.props);
  const openTag = `<${tag.tag}${attrs}>`;
  return SELF_CLOSING_TAGS.includes(tag.tag) ? openTag : `${openTag}${tag.children || ""}</${tag.tag}>`;
};
var resolveHeadEntries = (entries, force) => {
  return entries.map((e) => {
    if (e.input && (force || !e.resolved))
      e.input = resolveUnrefHeadInput(e.input);
    return e;
  });
};
var renderHeadToString = async (head) => {
  var _a2, _b2;
  const headHtml = [];
  const bodyHtml = [];
  let titleHtml = "";
  const attrs = { htmlAttrs: {}, bodyAttrs: {} };
  const resolvedEntries = resolveHeadEntries(head.headEntries);
  for (const h2 in head.hooks["resolved:entries"])
    await head.hooks["resolved:entries"][h2](resolvedEntries);
  const headTags = resolveHeadEntriesToTags(resolvedEntries);
  for (const h2 in head.hooks["resolved:tags"])
    await head.hooks["resolved:tags"][h2](headTags);
  for (const tag of headTags) {
    if ((_a2 = tag.options) == null ? void 0 : _a2.beforeTagRender)
      tag.options.beforeTagRender(tag);
    if (tag.tag === "title")
      titleHtml = tagToString(tag);
    else if (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs")
      attrs[tag.tag] = { ...attrs[tag.tag], ...tag.props };
    else if ((_b2 = tag.options) == null ? void 0 : _b2.body)
      bodyHtml.push(tagToString(tag));
    else
      headHtml.push(tagToString(tag));
  }
  headHtml.push(`<meta name="${HEAD_COUNT_KEY}" content="${headHtml.length}">`);
  return {
    get headTags() {
      return titleHtml + headHtml.join("");
    },
    get htmlAttrs() {
      return propsToString({
        ...attrs.htmlAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(attrs.htmlAttrs).join(",")
      });
    },
    get bodyAttrs() {
      return propsToString({
        ...attrs.bodyAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(attrs.bodyAttrs).join(",")
      });
    },
    get bodyTags() {
      return bodyHtml.join("");
    }
  };
};
var sortTags = (aTag, bTag) => {
  const tagWeight = (tag) => {
    var _a2;
    if ((_a2 = tag.options) == null ? void 0 : _a2.renderPriority)
      return tag.options.renderPriority;
    switch (tag.tag) {
      case "base":
        return -1;
      case "meta":
        if (tag.props.charset)
          return -2;
        if (tag.props["http-equiv"] === "content-security-policy")
          return 0;
        return 10;
      default:
        return 10;
    }
  };
  return tagWeight(aTag) - tagWeight(bTag);
};
var tagDedupeKey = (tag) => {
  const { props, tag: tagName, options } = tag;
  if (["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"].includes(tagName))
    return tagName;
  if (tagName === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  if (options == null ? void 0 : options.key)
    return `${tagName}:${options.key}`;
  const name2 = ["id"];
  if (tagName === "meta")
    name2.push(...["name", "property", "http-equiv"]);
  for (const n of name2) {
    if (typeof props[n] !== "undefined") {
      return `${tagName}:${n}:${props[n]}`;
    }
  }
  return tag.runtime.position;
};
function resolveUnrefHeadInput(ref2) {
  const root = resolveUnref(ref2);
  if (!ref2 || !root) {
    return root;
  }
  if (Array.isArray(root)) {
    return root.map(resolveUnrefHeadInput);
  }
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([key, value]) => {
        if (key === "titleTemplate")
          return [key, unref(value)];
        return [
          key,
          resolveUnrefHeadInput(value)
        ];
      })
    );
  }
  return root;
}
var resolveTag = (name2, input, e) => {
  var _a2;
  input = { ...input };
  const tag = {
    tag: name2,
    props: {},
    runtime: {
      entryId: e.id
    },
    options: {
      ...e.options
    }
  };
  ["hid", "vmid", "key"].forEach((key) => {
    if (input[key]) {
      tag.options.key = input[key];
      delete input[key];
    }
  });
  ["children", "innerHTML", "textContent"].forEach((key) => {
    if (typeof input[key] !== "undefined") {
      tag.children = input[key];
      delete input[key];
    }
  });
  ["body", "renderPriority"].forEach((key) => {
    if (typeof input[key] !== "undefined") {
      tag.options[key] = input[key];
      delete input[key];
    }
  });
  if ((_a2 = tag.options) == null ? void 0 : _a2.body)
    input[BODY_TAG_ATTR_NAME] = true;
  tag.props = input;
  return tag;
};
var headInputToTags = (e) => {
  return Object.entries(e.input).filter(([, v]) => typeof v !== "undefined").map(([key, value]) => {
    return (Array.isArray(value) ? value : [value]).map((props) => {
      switch (key) {
        case "title":
        case "titleTemplate":
          return {
            tag: key,
            children: props,
            props: {},
            runtime: { entryId: e.id },
            options: e.options
          };
        case "base":
        case "meta":
        case "link":
        case "style":
        case "script":
        case "noscript":
        case "htmlAttrs":
        case "bodyAttrs":
          return resolveTag(key, props, e);
        default:
          return false;
      }
    });
  }).flat().filter((v) => !!v);
};
var renderTitleTemplate = (template, title) => {
  if (template == null)
    return title || null;
  if (typeof template === "function")
    return template(title);
  return template.replace("%s", title != null ? title : "");
};
var resolveHeadEntriesToTags = (entries) => {
  const deduping = {};
  const resolvedEntries = resolveHeadEntries(entries);
  resolvedEntries.forEach((entry2, entryIndex) => {
    const tags = headInputToTags(entry2);
    tags.forEach((tag, tagIdx) => {
      tag.runtime = tag.runtime || {};
      tag.runtime.position = entryIndex * 1e4 + tagIdx;
      deduping[tagDedupeKey(tag)] = tag;
    });
  });
  let resolvedTags = Object.values(deduping).sort((a, b) => a.runtime.position - b.runtime.position).sort(sortTags);
  const titleTemplateIdx = resolvedTags.findIndex((i) => i.tag === "titleTemplate");
  const titleIdx = resolvedTags.findIndex((i) => i.tag === "title");
  if (titleIdx !== -1 && titleTemplateIdx !== -1) {
    const newTitle = renderTitleTemplate(
      resolvedTags[titleTemplateIdx].children,
      resolvedTags[titleIdx].children
    );
    if (newTitle !== null) {
      resolvedTags[titleIdx].children = newTitle || resolvedTags[titleIdx].children;
    } else {
      resolvedTags = resolvedTags.filter((_, i) => i !== titleIdx);
    }
    resolvedTags = resolvedTags.filter((_, i) => i !== titleTemplateIdx);
  } else if (titleTemplateIdx !== -1) {
    const newTitle = renderTitleTemplate(
      resolvedTags[titleTemplateIdx].children
    );
    if (newTitle !== null) {
      resolvedTags[titleTemplateIdx].children = newTitle;
      resolvedTags[titleTemplateIdx].tag = "title";
    } else {
      resolvedTags = resolvedTags.filter((_, i) => i !== titleTemplateIdx);
    }
  }
  return resolvedTags;
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs))
        el.removeAttribute(key);
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false)
      el.removeAttribute(key);
    else
      el.setAttribute(key, value);
    keys.push(key);
  }
  if (keys.length)
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  else
    el.removeAttribute(HEAD_ATTRS_KEY);
};
var createElement = (tag, document2) => {
  var _a2;
  const $el = document2.createElement(tag.tag);
  Object.entries(tag.props).forEach(([k, v]) => {
    if (v !== false) {
      $el.setAttribute(k, v === true ? "" : String(v));
    }
  });
  if (tag.children) {
    if ((_a2 = tag.options) == null ? void 0 : _a2.safe) {
      if (tag.tag !== "script")
        $el.textContent = tag.children;
    } else {
      $el.innerHTML = tag.children;
    }
  }
  return $el;
};
var updateElements = (document2 = window.document, type, tags) => {
  var _a2, _b2;
  const head = document2.head;
  const body = document2.body;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  const bodyMetaElements = body.querySelectorAll(`[${BODY_TAG_ATTR_NAME}]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldHeadElements = [];
  const oldBodyElements = [];
  if (bodyMetaElements) {
    for (let i = 0; i < bodyMetaElements.length; i++) {
      if (bodyMetaElements[i] && ((_a2 = bodyMetaElements[i].tagName) == null ? void 0 : _a2.toLowerCase()) === type)
        oldBodyElements.push(bodyMetaElements[i]);
    }
  }
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_b2 = j == null ? void 0 : j.tagName) == null ? void 0 : _b2.toLowerCase()) === type)
        oldHeadElements.push(j);
    }
  } else {
    headCountEl = document2.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => {
    var _a3;
    var _a22;
    return {
      element: createElement(tag, document2),
      body: (_a3 = (_a22 = tag.options) == null ? void 0 : _a22.body) != null ? _a3 : false
    };
  });
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldHeadElements.length; i++) {
      const oldEl = oldHeadElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldHeadElements.splice(i, 1);
        return false;
      }
    }
    for (let i = 0; i < oldBodyElements.length; i++) {
      const oldEl = oldBodyElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldBodyElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldBodyElements.forEach((t) => {
    var _a22;
    return (_a22 = t.parentNode) == null ? void 0 : _a22.removeChild(t);
  });
  oldHeadElements.forEach((t) => {
    var _a22;
    return (_a22 = t.parentNode) == null ? void 0 : _a22.removeChild(t);
  });
  newElements.forEach((t) => {
    if (t.body)
      body.insertAdjacentElement("beforeend", t.element);
    else
      head.insertBefore(t.element, headCountEl);
  });
  headCountEl.setAttribute(
    "content",
    `${headCount - oldHeadElements.length + newElements.filter((t) => !t.body).length}`
  );
};
var updateDOM = async (head, previousTags, document2) => {
  var _a2, _b2;
  const tags = {};
  if (!document2)
    document2 = window.document;
  for (const k in head.hooks["before:dom"]) {
    if (await head.hooks["before:dom"][k]() === false)
      return;
  }
  const resolvedEntries = resolveHeadEntries(head.headEntries);
  for (const h2 in head.hooks["resolved:entries"])
    await head.hooks["resolved:entries"][h2](resolvedEntries);
  const headTags = resolveHeadEntriesToTags(resolvedEntries);
  for (const h2 in head.hooks["resolved:tags"])
    await head.hooks["resolved:tags"][h2](headTags);
  for (const tag of headTags) {
    switch (tag.tag) {
      case "title":
        if (typeof tag.children !== "undefined")
          document2.title = tag.children;
        break;
      case "base":
      case "meta":
      case "link":
      case "style":
      case "script":
      case "noscript":
        tags[tag.tag] = tags[tag.tag] || [];
        tags[tag.tag].push(tag);
        break;
    }
  }
  setAttrs(document2.documentElement, ((_a2 = headTags.find((t) => t.tag === "htmlAttrs")) == null ? void 0 : _a2.props) || {});
  setAttrs(document2.body, ((_b2 = headTags.find((t) => t.tag === "bodyAttrs")) == null ? void 0 : _b2.props) || {});
  const tagKeys = /* @__PURE__ */ new Set([...Object.keys(tags), ...previousTags]);
  for (const tag of tagKeys)
    updateElements(document2, tag, tags[tag] || []);
  previousTags.clear();
  Object.keys(tags).forEach((i) => previousTags.add(i));
};
version$7.startsWith("2.");
var createHead = (initHeadObject) => {
  let entries = [];
  let entryId = 0;
  const previousTags = /* @__PURE__ */ new Set();
  let domUpdateTick = null;
  const head = {
    install(app) {
      if (app.config.globalProperties)
        app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    },
    get headEntries() {
      return entries;
    },
    get headTags() {
      const resolvedEntries = resolveHeadEntries(head.headEntries);
      return resolveHeadEntriesToTags(resolvedEntries);
    },
    addHeadObjs(input, options) {
      return head.addEntry(input, options);
    },
    addEntry(input, options = {}) {
      let resolved = false;
      if (options == null ? void 0 : options.resolved) {
        resolved = true;
        delete options.resolved;
      }
      const entry2 = {
        id: entryId++,
        options,
        resolved,
        input
      };
      entries.push(entry2);
      return {
        remove() {
          entries = entries.filter((_objs) => _objs.id !== entry2.id);
        },
        update(updatedInput) {
          entries = entries.map((e) => {
            if (e.id === entry2.id)
              e.input = updatedInput;
            return e;
          });
        }
      };
    },
    async updateDOM(document2, force) {
      const doDomUpdate = () => {
        domUpdateTick = null;
        return updateDOM(head, previousTags, document2);
      };
      if (force)
        return doDomUpdate();
      return domUpdateTick = domUpdateTick || new Promise((resolve) => nextTick(() => resolve(doDomUpdate())));
    },
    addReactiveEntry(input, options = {}) {
      let entrySideEffect = null;
      const cleanUpWatch = watchEffect(() => {
        const resolvedInput = resolveUnrefHeadInput(input);
        if (entrySideEffect === null) {
          entrySideEffect = head.addEntry(
            resolvedInput,
            { ...options, resolved: true }
          );
        } else {
          entrySideEffect.update(resolvedInput);
        }
      });
      return () => {
        cleanUpWatch();
        if (entrySideEffect)
          entrySideEffect.remove();
      };
    }
  };
  if (initHeadObject)
    head.addEntry(initHeadObject);
  return head;
};
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [], "style": [], "script": [], "noscript": [] };
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  head.addEntry(appHead, { resolved: true });
  nuxtApp.vueApp.use(head);
  nuxtApp._useHead = (_meta, options) => {
    {
      head.addEntry(_meta, options);
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = async () => {
      const meta = await renderHeadToString(head);
      return {
        ...meta,
        bodyScripts: meta.bodyTags
      };
    };
  }
});
const metaMixin = {
  created() {
    const instance = getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? () => options.head(nuxtApp) : options.head;
    useHead(source);
  }
};
const node_modules_nuxt_dist_head_runtime_mixin_plugin_mjs_prWV5EzJWI = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin(metaMixin);
});
const __nuxt_page_meta$2 = {
  middleware: "auth"
};
const _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47domain_46vueMeta = {};
const _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47index_46vueMeta = {};
const _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47posts_46vueMeta = {};
const _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47profile_46vueMeta = {};
const __nuxt_page_meta$1 = {
  alias: "/write",
  middleware: "auth"
};
const _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47index_46vueMeta = {};
const _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47login_46vueMeta = {};
const _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47logout_46vueMeta = {};
const _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47posts_46vueMeta = {};
const __nuxt_page_meta = {
  layout: "user"
};
const _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47_91slug_93_46vueMeta = {};
const _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47home_46vueMeta = {};
const _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47index_46vueMeta = {};
const _routes = [
  {
    path: (_a = __nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.path) != null ? _a : "/dashboard",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/dashboard.vue",
    children: [
      {
        name: (_b = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47domain_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47domain_46vueMeta.name) != null ? _b : "dashboard-domain",
        path: (_c = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47domain_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47domain_46vueMeta.path) != null ? _c : "domain",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/dashboard/domain.vue",
        children: [],
        meta: _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47domain_46vueMeta,
        alias: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47domain_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47domain_46vueMeta.alias) || [],
        redirect: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47domain_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47domain_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/domain.9c197d78.mjs').then((m) => m.default || m)
      },
      {
        name: (_d = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47index_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47index_46vueMeta.name) != null ? _d : "dashboard",
        path: (_e = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47index_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47index_46vueMeta.path) != null ? _e : "",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/dashboard/index.vue",
        children: [],
        meta: _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47index_46vueMeta,
        alias: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47index_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47index_46vueMeta.alias) || [],
        redirect: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47index_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47index_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/index.a95ada72.mjs').then((m) => m.default || m)
      },
      {
        name: (_f = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47posts_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47posts_46vueMeta.name) != null ? _f : "dashboard-posts",
        path: (_g = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47posts_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47posts_46vueMeta.path) != null ? _g : "posts",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/dashboard/posts.vue",
        children: [],
        meta: _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47posts_46vueMeta,
        alias: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47posts_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47posts_46vueMeta.alias) || [],
        redirect: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47posts_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47posts_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/posts.adf8ae62.mjs').then((m) => m.default || m)
      },
      {
        name: (_h = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47profile_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47profile_46vueMeta.name) != null ? _h : "dashboard-profile",
        path: (_i = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47profile_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47profile_46vueMeta.path) != null ? _i : "profile",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/dashboard/profile.vue",
        children: [],
        meta: _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47profile_46vueMeta,
        alias: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47profile_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47profile_46vueMeta.alias) || [],
        redirect: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47profile_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47dashboard_47profile_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/profile.1a3afb78.mjs').then((m) => m.default || m)
      }
    ],
    name: (_j = __nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.name) != null ? _j : void 0,
    meta: __nuxt_page_meta$2,
    alias: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.alias) || [],
    redirect: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.redirect) || void 0,
    component: () => import('./_nuxt/dashboard.990e3b26.mjs').then((m) => m.default || m)
  },
  {
    name: (_k = __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.name) != null ? _k : "edit-id",
    path: (_l = __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.path) != null ? _l : "/edit/:id",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/edit/[id].vue",
    children: [],
    meta: __nuxt_page_meta$1,
    alias: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.alias) || [],
    redirect: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.redirect) || void 0,
    component: () => import('./_nuxt/_id_.a576edca.mjs').then((m) => m.default || m)
  },
  {
    name: (_m = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47index_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47index_46vueMeta.name) != null ? _m : "index",
    path: (_n = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47index_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47index_46vueMeta.path) != null ? _n : "/",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/index.vue",
    children: [],
    meta: _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47index_46vueMeta,
    alias: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47index_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47index_46vueMeta.alias) || [],
    redirect: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47index_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47index_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/index.51ea7668.mjs').then((m) => m.default || m)
  },
  {
    name: (_o = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47login_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47login_46vueMeta.name) != null ? _o : "login",
    path: (_p = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47login_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47login_46vueMeta.path) != null ? _p : "/login",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/login.vue",
    children: [],
    meta: _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47login_46vueMeta,
    alias: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47login_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47login_46vueMeta.alias) || [],
    redirect: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47login_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47login_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/login.46090f4c.mjs').then((m) => m.default || m)
  },
  {
    name: (_q = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47logout_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47logout_46vueMeta.name) != null ? _q : "logout",
    path: (_r = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47logout_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47logout_46vueMeta.path) != null ? _r : "/logout",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/logout.vue",
    children: [],
    meta: _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47logout_46vueMeta,
    alias: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47logout_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47logout_46vueMeta.alias) || [],
    redirect: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47logout_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47logout_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/logout.d1ae5d29.mjs').then((m) => m.default || m)
  },
  {
    name: (_s = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47posts_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47posts_46vueMeta.name) != null ? _s : "posts",
    path: (_t = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47posts_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47posts_46vueMeta.path) != null ? _t : "/posts",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/posts.vue",
    children: [],
    meta: _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47posts_46vueMeta,
    alias: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47posts_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47posts_46vueMeta.alias) || [],
    redirect: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47posts_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47posts_46vueMeta.redirect) || void 0,
    component: () => import('./_nuxt/posts.4e6d9e7c.mjs').then((m) => m.default || m)
  },
  {
    path: (_u = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) != null ? _u : "/user/:siteId",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/user/[siteId].vue",
    children: [
      {
        name: (_v = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47_91slug_93_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47_91slug_93_46vueMeta.name) != null ? _v : "user-siteId-slug",
        path: (_w = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47_91slug_93_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47_91slug_93_46vueMeta.path) != null ? _w : ":slug",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/user/[siteId]/[slug].vue",
        children: [],
        meta: _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47_91slug_93_46vueMeta,
        alias: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47_91slug_93_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47_91slug_93_46vueMeta.alias) || [],
        redirect: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47_91slug_93_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47_91slug_93_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/_slug_.d5377fa6.mjs').then((m) => m.default || m)
      },
      {
        name: (_x = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47home_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47home_46vueMeta.name) != null ? _x : "user-siteId-home",
        path: (_y = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47home_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47home_46vueMeta.path) != null ? _y : "home",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/user/[siteId]/home.vue",
        children: [],
        meta: _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47home_46vueMeta,
        alias: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47home_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47home_46vueMeta.alias) || [],
        redirect: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47home_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47home_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/home.b3c9713d.mjs').then((m) => m.default || m)
      },
      {
        name: (_z = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47index_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47index_46vueMeta.name) != null ? _z : "user-siteId",
        path: (_A = _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47index_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47index_46vueMeta.path) != null ? _A : "",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/user/[siteId]/index.vue",
        children: [],
        meta: _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47index_46vueMeta,
        alias: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47index_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47index_46vueMeta.alias) || [],
        redirect: (_47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47index_46vueMeta == null ? void 0 : _47Users_47bon_47Documents_47my_45workspace_47perfect_45blog_47pages_47user_47_91siteId_93_47index_46vueMeta.redirect) || void 0,
        component: () => import('./_nuxt/index.8048aeab.mjs').then((m) => m.default || m)
      }
    ],
    name: (_B = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) != null ? _B : void 0,
    meta: __nuxt_page_meta,
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect) || void 0,
    component: () => import('./_nuxt/_siteId_.4ddc7ccf.mjs').then((m) => m.default || m)
  }
];
const useSubdomain = () => useState("subdomain", () => null);
const useSubdomainProfile = () => useState("subdomain-profile", () => null);
const routerOptions0 = {
  routes: (_routes2) => {
    const { ssrContext } = useNuxtApp();
    const subdomain = useSubdomain();
    if (ssrContext == null ? void 0 : ssrContext.event.context.subdomain)
      subdomain.value = ssrContext == null ? void 0 : ssrContext.event.context.subdomain;
    if (subdomain.value) {
      const userRoute = _routes2.filter((i) => i.path.includes("/user/:siteId"));
      const userRouteMapped = userRoute.map((i) => ({
        ...i,
        path: i.path === "/user/:siteId" ? i.path.replace("/user/:siteId", "/") : i.path.replace("/user/:siteId/", "/")
      }));
      return userRouteMapped;
    }
  },
  scrollBehavior(to, from, savedPosition) {
    var _a2;
    if (savedPosition)
      return savedPosition;
    if (to.hash) {
      const el = document.querySelector(to.hash);
      return { left: 0, top: ((_a2 = el == null ? void 0 : el.offsetTop) != null ? _a2 : 0) - 30, behavior: "smooth" };
    }
    if (to.fullPath === from.fullPath)
      return;
    return { left: 0, top: 0, behavior: "smooth" };
  }
};
const routerOptions1 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = to.meta.pageTransition !== false && from.meta.pageTransition !== false;
    const hookToWait = hasTransition ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  const elem = document.querySelector(selector);
  if (elem) {
    return parseFloat(getComputedStyle(elem).scrollMarginTop);
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions1,
  ...routerOptions0
};
const validate = defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (typeof result === "boolean") {
    return result;
  }
  return createError(result);
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {
  auth: () => import('./_nuxt/auth.9d304380.mjs')
};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  var _a2, _b2, _c2, _d2;
  let __temp, __restore;
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = (_b2 = (_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) != null ? _b2 : createMemoryHistory(routerBase);
  const routes = (_d2 = (_c2 = routerOptions.routes) == null ? void 0 : _c2.call(routerOptions, _routes)) != null ? _d2 : _routes;
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a3, _b3, _c3, _d3;
    if (((_b3 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b3.default) === ((_d3 = (_c3 = from.matched[0]) == null ? void 0 : _c3.components) == null ? void 0 : _d3.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    var _a3, _b3;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a3 = initialLayout.value) != null ? _a3 : to.meta.layout;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b3 = namedMiddleware[entry2]) == null ? void 0 : _b3.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusCode: 404,
            statusMessage: `Page Not Found: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, showError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.event.res.statusCode = 404;
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
async function imageMeta(_ctx, url2) {
  const meta = await _imageMeta(url2).catch((err) => {
    console.error("Failed to get image meta for " + url2, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url2) {
  {
    const imageMeta2 = await import('image-meta').then((r) => r.imageMeta);
    const data = await fetch(url2).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url2}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return parseInt(input, 10);
    }
  }
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a2, _b2;
  if (typeof input !== "string" || input === "") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        input = joinURL(ctx.options.alias[base], input.substr(base.length));
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a2 = _options.modifiers) == null ? void 0 : _a2.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b2 = _options.modifiers) == null ? void 0 : _b2.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name2) {
  const provider = ctx.options.providers[name2];
  if (!provider) {
    throw new Error("Unknown provider: " + name2);
  }
  return provider;
}
function getPreset(ctx, name2) {
  if (!name2) {
    return {};
  }
  if (!ctx.options.presets[name2]) {
    throw new Error("Unknown preset: " + name2);
  }
  return ctx.options.presets[name2];
}
function getSizes(ctx, input, opts) {
  var _a2, _b2;
  const width = parseSize((_a2 = opts.modifiers) == null ? void 0 : _a2.width);
  const height = parseSize((_b2 = opts.modifiers) == null ? void 0 : _b2.height);
  const hwRatio = width && height ? height / width : 0;
  const variants = [];
  const sizes = {};
  if (typeof opts.sizes === "string") {
    for (const entry2 of opts.sizes.split(/[\s,]+/).filter((e) => e)) {
      const s = entry2.split(":");
      if (s.length !== 2) {
        continue;
      }
      sizes[s[0].trim()] = s[1].trim();
    }
  } else {
    Object.assign(sizes, opts.sizes);
  }
  for (const key in sizes) {
    const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || parseInt(key);
    let size = String(sizes[key]);
    const isFluid = size.endsWith("vw");
    if (!isFluid && /^\d+$/.test(size)) {
      size = size + "px";
    }
    if (!isFluid && !size.endsWith("px")) {
      continue;
    }
    let _cWidth = parseInt(size);
    if (!screenMaxWidth || !_cWidth) {
      continue;
    }
    if (isFluid) {
      _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
    }
    const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
    variants.push({
      width: _cWidth,
      size,
      screenMaxWidth,
      media: `(max-width: ${screenMaxWidth}px)`,
      src: ctx.$img(input, { ...opts.modifiers, width: _cWidth, height: _cHeight }, opts)
    });
  }
  variants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  const defaultVar = variants[variants.length - 1];
  if (defaultVar) {
    defaultVar.media = "";
  }
  return {
    sizes: variants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", "),
    srcset: variants.map((v) => `${v.src} ${v.width}w`).join(", "),
    src: defaultVar == null ? void 0 : defaultVar.src
  };
}
const getImage = (src, { modifiers, baseURL: baseURL2 = "/_vercel/image" } = {}, ctx) => {
  const validWidths = Object.values(ctx.options.screens || {}).sort((a, b) => a - b);
  const largestWidth = validWidths[validWidths.length - 1];
  let width = Number((modifiers == null ? void 0 : modifiers.width) || 0);
  if (!width) {
    width = largestWidth;
  } else if (!validWidths.includes(width)) {
    width = validWidths.find((validWidth) => validWidth > width) || largestWidth;
  }
  return {
    url: baseURL2 + "?" + stringifyQuery({
      url: src,
      w: String(width),
      q: String((modifiers == null ? void 0 : modifiers.quality) || "100")
    })
  };
};
const validateDomains = true;
const vercelRuntime$9ByWUq1aQe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getImage,
  validateDomains
}, Symbol.toStringTag, { value: "Module" }));
const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536
  },
  "presets": {},
  "provider": "vercel",
  "domains": [
    "avatars0.githubusercontent.com",
    "avatars.githubusercontent.com",
    "images.unsplash.com"
  ],
  "alias": {}
};
imageOptions.providers = {
  ["vercel"]: { provider: vercelRuntime$9ByWUq1aQe, defaults: {} }
};
const node_modules__64nuxt_image_edge_dist_runtime_plugin_mjs_OrkQhMqHci = defineNuxtPlugin(() => {
  const img = createImage(imageOptions);
  return {
    provide: {
      img
    }
  };
});
const useSupabaseUser = () => useState("supabase_user");
const version$6 = "1.35.7";
const DEFAULT_HEADERS$4 = { "X-Client-Info": `supabase-js/${version$6}` };
const STORAGE_KEY$1 = "supabase.auth.token";
function stripTrailingSlash(url2) {
  return url2.replace(/\/$/, "");
}
const isBrowser$1 = () => false;
const version$5 = "1.24.0";
const GOTRUE_URL = "http://localhost:9999";
const DEFAULT_HEADERS$3 = { "X-Client-Info": `gotrue-js/${version$5}` };
const EXPIRY_MARGIN = 10;
const NETWORK_FAILURE = {
  ERROR_MESSAGE: "Request Failed",
  MAX_RETRIES: 10,
  RETRY_INTERVAL: 2
};
const STORAGE_KEY = "supabase.auth.token";
const COOKIE_OPTIONS = {
  name: "sb",
  lifetime: 60 * 60 * 8,
  domain: "",
  path: "/",
  sameSite: "lax"
};
var __awaiter$c = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const _getErrorMessage$1 = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError$1 = (error, reject) => {
  if (!(error === null || error === void 0 ? void 0 : error.status)) {
    return reject({ message: NETWORK_FAILURE.ERROR_MESSAGE });
  }
  if (typeof error.json !== "function") {
    return reject(error);
  }
  error.json().then((err) => {
    return reject({
      message: _getErrorMessage$1(err),
      status: (error === null || error === void 0 ? void 0 : error.status) || 500
    });
  });
};
const _getRequestParams$1 = (method, options, body) => {
  const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
  if (method === "GET") {
    return params;
  }
  params.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, options === null || options === void 0 ? void 0 : options.headers);
  params.body = JSON.stringify(body);
  return params;
};
function _handleRequest$1(fetcher, method, url2, options, body) {
  return __awaiter$c(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url2, _getRequestParams$1(method, options, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson)
          return resolve;
        return result.json();
      }).then((data) => resolve(data)).catch((error) => handleError$1(error, reject));
    });
  });
}
function get$1(fetcher, url2, options) {
  return __awaiter$c(this, void 0, void 0, function* () {
    return _handleRequest$1(fetcher, "GET", url2, options);
  });
}
function post$1(fetcher, url2, body, options) {
  return __awaiter$c(this, void 0, void 0, function* () {
    return _handleRequest$1(fetcher, "POST", url2, options, body);
  });
}
function put$1(fetcher, url2, body, options) {
  return __awaiter$c(this, void 0, void 0, function* () {
    return _handleRequest$1(fetcher, "PUT", url2, options, body);
  });
}
function remove$1(fetcher, url2, body, options) {
  return __awaiter$c(this, void 0, void 0, function* () {
    return _handleRequest$1(fetcher, "DELETE", url2, options, body);
  });
}
function serialize(name2, val, options) {
  const opt = options || {};
  const enc = encodeURIComponent;
  const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name2)) {
    throw new TypeError("argument name is invalid");
  }
  const value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name2 + "=" + value;
  if (null != opt.maxAge) {
    const maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== "function") {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function isSecureEnvironment(req) {
  if (!req || !req.headers || !req.headers.host) {
    throw new Error('The "host" request header is not available');
  }
  const host = req.headers.host.indexOf(":") > -1 && req.headers.host.split(":")[0] || req.headers.host;
  if (["localhost", "127.0.0.1"].indexOf(host) > -1 || host.endsWith(".local")) {
    return false;
  }
  return true;
}
function serializeCookie(cookie, secure) {
  var _a2, _b2, _c2;
  return serialize(cookie.name, cookie.value, {
    maxAge: cookie.maxAge,
    expires: new Date(Date.now() + cookie.maxAge * 1e3),
    httpOnly: true,
    secure,
    path: (_a2 = cookie.path) !== null && _a2 !== void 0 ? _a2 : "/",
    domain: (_b2 = cookie.domain) !== null && _b2 !== void 0 ? _b2 : "",
    sameSite: (_c2 = cookie.sameSite) !== null && _c2 !== void 0 ? _c2 : "lax"
  });
}
function getCookieString(req, res, cookies) {
  const strCookies = cookies.map((c) => serializeCookie(c, isSecureEnvironment(req)));
  const previousCookies = res.getHeader("Set-Cookie");
  if (previousCookies) {
    if (previousCookies instanceof Array) {
      Array.prototype.push.apply(strCookies, previousCookies);
    } else if (typeof previousCookies === "string") {
      strCookies.push(previousCookies);
    }
  }
  return strCookies;
}
function setCookies(req, res, cookies) {
  res.setHeader("Set-Cookie", getCookieString(req, res, cookies));
}
var __awaiter$b = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function expiresAt(expiresIn) {
  const timeNow = Math.round(Date.now() / 1e3);
  return timeNow + expiresIn;
}
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
const isBrowser = () => false;
function getParameterByName(name2, url2) {
  var _a2;
  if (!url2)
    url2 = ((_a2 = window === null || window === void 0 ? void 0 : window.location) === null || _a2 === void 0 ? void 0 : _a2.href) || "";
  name2 = name2.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&#]" + name2 + "(=([^&#]*)|&|#|$)"), results = regex.exec(url2);
  if (!results)
    return null;
  if (!results[2])
    return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const resolveFetch$2 = (customFetch) => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === "undefined") {
    _fetch = (...args) => __awaiter$b(void 0, void 0, void 0, function* () {
      return yield (yield import('unenv/runtime/npm/cross-fetch')).fetch(...args);
    });
  } else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
const setItemAsync = (storage, key, data) => __awaiter$b(void 0, void 0, void 0, function* () {
});
const getItemAsync = (storage, key) => __awaiter$b(void 0, void 0, void 0, function* () {
  return null;
});
const getItemSynchronously = (storage, key) => {
  {
    return null;
  }
};
const removeItemAsync = (storage, key) => __awaiter$b(void 0, void 0, void 0, function* () {
});
var __awaiter$a = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class GoTrueApi {
  constructor({ url: url2 = "", headers = {}, cookieOptions, fetch: fetch2 }) {
    this.url = url2;
    this.headers = headers;
    this.cookieOptions = Object.assign(Object.assign({}, COOKIE_OPTIONS), cookieOptions);
    this.fetch = resolveFetch$2(fetch2);
  }
  _createRequestHeaders(jwt) {
    const headers = Object.assign({}, this.headers);
    headers["Authorization"] = `Bearer ${jwt}`;
    return headers;
  }
  cookieName() {
    var _a2;
    return (_a2 = this.cookieOptions.name) !== null && _a2 !== void 0 ? _a2 : "";
  }
  getUrlForProvider(provider, options) {
    const urlParams = [`provider=${encodeURIComponent(provider)}`];
    if (options === null || options === void 0 ? void 0 : options.redirectTo) {
      urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
    }
    if (options === null || options === void 0 ? void 0 : options.scopes) {
      urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
    }
    if (options === null || options === void 0 ? void 0 : options.queryParams) {
      const query = new URLSearchParams(options.queryParams);
      urlParams.push(`${query}`);
    }
    return `${this.url}/authorize?${urlParams.join("&")}`;
  }
  signUpWithEmail(email, password, options = {}) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = "";
        if (options.redirectTo) {
          queryString = "?redirect_to=" + encodeURIComponent(options.redirectTo);
        }
        const data = yield post$1(this.fetch, `${this.url}/signup${queryString}`, {
          email,
          password,
          data: options.data,
          gotrue_meta_security: { captcha_token: options.captchaToken }
        }, { headers });
        const session = Object.assign({}, data);
        if (session.expires_in)
          session.expires_at = expiresAt(data.expires_in);
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  signInWithEmail(email, password, options = {}) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = "?grant_type=password";
        if (options.redirectTo) {
          queryString += "&redirect_to=" + encodeURIComponent(options.redirectTo);
        }
        const data = yield post$1(this.fetch, `${this.url}/token${queryString}`, { email, password, gotrue_meta_security: { captcha_token: options.captchaToken } }, { headers });
        const session = Object.assign({}, data);
        if (session.expires_in)
          session.expires_at = expiresAt(data.expires_in);
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  signUpWithPhone(phone, password, options = {}) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const data = yield post$1(this.fetch, `${this.url}/signup`, {
          phone,
          password,
          data: options.data,
          gotrue_meta_security: { captcha_token: options.captchaToken }
        }, { headers });
        const session = Object.assign({}, data);
        if (session.expires_in)
          session.expires_at = expiresAt(data.expires_in);
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  signInWithPhone(phone, password, options = {}) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const queryString = "?grant_type=password";
        const data = yield post$1(this.fetch, `${this.url}/token${queryString}`, { phone, password, gotrue_meta_security: { captcha_token: options.captchaToken } }, { headers });
        const session = Object.assign({}, data);
        if (session.expires_in)
          session.expires_at = expiresAt(data.expires_in);
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  signInWithOpenIDConnect({ id_token, nonce, client_id, issuer, provider }) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const queryString = "?grant_type=id_token";
        const data = yield post$1(this.fetch, `${this.url}/token${queryString}`, { id_token, nonce, client_id, issuer, provider }, { headers });
        const session = Object.assign({}, data);
        if (session.expires_in)
          session.expires_at = expiresAt(data.expires_in);
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  sendMagicLinkEmail(email, options = {}) {
    var _a2;
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = "";
        if (options.redirectTo) {
          queryString += "?redirect_to=" + encodeURIComponent(options.redirectTo);
        }
        const shouldCreateUser = (_a2 = options.shouldCreateUser) !== null && _a2 !== void 0 ? _a2 : true;
        const data = yield post$1(this.fetch, `${this.url}/otp${queryString}`, {
          email,
          create_user: shouldCreateUser,
          gotrue_meta_security: { captcha_token: options.captchaToken }
        }, { headers });
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  sendMobileOTP(phone, options = {}) {
    var _a2;
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const shouldCreateUser = (_a2 = options.shouldCreateUser) !== null && _a2 !== void 0 ? _a2 : true;
        const headers = Object.assign({}, this.headers);
        const data = yield post$1(this.fetch, `${this.url}/otp`, {
          phone,
          create_user: shouldCreateUser,
          gotrue_meta_security: { captcha_token: options.captchaToken }
        }, { headers });
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  signOut(jwt) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        yield post$1(this.fetch, `${this.url}/logout`, {}, { headers: this._createRequestHeaders(jwt), noResolveJson: true });
        return { error: null };
      } catch (e) {
        return { error: e };
      }
    });
  }
  verifyMobileOTP(phone, token, options = {}) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const data = yield post$1(this.fetch, `${this.url}/verify`, { phone, token, type: "sms", redirect_to: options.redirectTo }, { headers });
        const session = Object.assign({}, data);
        if (session.expires_in)
          session.expires_at = expiresAt(data.expires_in);
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  verifyOTP({ email, phone, token, type = "sms" }, options = {}) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const data = yield post$1(this.fetch, `${this.url}/verify`, { email, phone, token, type, redirect_to: options.redirectTo }, { headers });
        const session = Object.assign({}, data);
        if (session.expires_in)
          session.expires_at = expiresAt(data.expires_in);
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  inviteUserByEmail(email, options = {}) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = "";
        if (options.redirectTo) {
          queryString += "?redirect_to=" + encodeURIComponent(options.redirectTo);
        }
        const data = yield post$1(this.fetch, `${this.url}/invite${queryString}`, { email, data: options.data }, { headers });
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  resetPasswordForEmail(email, options = {}) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = "";
        if (options.redirectTo) {
          queryString += "?redirect_to=" + encodeURIComponent(options.redirectTo);
        }
        const data = yield post$1(this.fetch, `${this.url}/recover${queryString}`, { email, gotrue_meta_security: { captcha_token: options.captchaToken } }, { headers });
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  refreshAccessToken(refreshToken) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const data = yield post$1(this.fetch, `${this.url}/token?grant_type=refresh_token`, { refresh_token: refreshToken }, { headers: this.headers });
        const session = Object.assign({}, data);
        if (session.expires_in)
          session.expires_at = expiresAt(data.expires_in);
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  setAuthCookie(req, res) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
    const { event, session } = req.body;
    if (!event)
      throw new Error("Auth event missing!");
    if (event === "SIGNED_IN") {
      if (!session)
        throw new Error("Auth session missing!");
      setCookies(req, res, [
        { key: "access-token", value: session.access_token },
        { key: "refresh-token", value: session.refresh_token }
      ].map((token) => {
        var _a2;
        return {
          name: `${this.cookieName()}-${token.key}`,
          value: token.value,
          domain: this.cookieOptions.domain,
          maxAge: (_a2 = this.cookieOptions.lifetime) !== null && _a2 !== void 0 ? _a2 : 0,
          path: this.cookieOptions.path,
          sameSite: this.cookieOptions.sameSite
        };
      }));
    }
    if (event === "SIGNED_OUT") {
      setCookies(req, res, ["access-token", "refresh-token"].map((key) => ({
        name: `${this.cookieName()}-${key}`,
        value: "",
        maxAge: -1
      })));
    }
    res.status(200).json({});
  }
  deleteAuthCookie(req, res, { redirectTo = "/" }) {
    setCookies(req, res, ["access-token", "refresh-token"].map((key) => ({
      name: `${this.cookieName()}-${key}`,
      value: "",
      maxAge: -1
    })));
    return res.redirect(307, redirectTo);
  }
  getAuthCookieString(req, res) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
    const { event, session } = req.body;
    if (!event)
      throw new Error("Auth event missing!");
    if (event === "SIGNED_IN") {
      if (!session)
        throw new Error("Auth session missing!");
      return getCookieString(req, res, [
        { key: "access-token", value: session.access_token },
        { key: "refresh-token", value: session.refresh_token }
      ].map((token) => {
        var _a2;
        return {
          name: `${this.cookieName()}-${token.key}`,
          value: token.value,
          domain: this.cookieOptions.domain,
          maxAge: (_a2 = this.cookieOptions.lifetime) !== null && _a2 !== void 0 ? _a2 : 0,
          path: this.cookieOptions.path,
          sameSite: this.cookieOptions.sameSite
        };
      }));
    }
    if (event === "SIGNED_OUT") {
      return getCookieString(req, res, ["access-token", "refresh-token"].map((key) => ({
        name: `${this.cookieName()}-${key}`,
        value: "",
        maxAge: -1
      })));
    }
    return res.getHeader("Set-Cookie");
  }
  generateLink(type, email, options = {}) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const data = yield post$1(this.fetch, `${this.url}/admin/generate_link`, {
          type,
          email,
          password: options.password,
          data: options.data,
          redirect_to: options.redirectTo
        }, { headers: this.headers });
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  createUser(attributes) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const data = yield post$1(this.fetch, `${this.url}/admin/users`, attributes, {
          headers: this.headers
        });
        return { user: data, data, error: null };
      } catch (e) {
        return { user: null, data: null, error: e };
      }
    });
  }
  listUsers() {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const data = yield get$1(this.fetch, `${this.url}/admin/users`, {
          headers: this.headers
        });
        return { data: data.users, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  getUserById(uid) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const data = yield get$1(this.fetch, `${this.url}/admin/users/${uid}`, {
          headers: this.headers
        });
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  getUserByCookie(req, res) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        if (!req.cookies) {
          throw new Error("Not able to parse cookies! When using Express make sure the cookie-parser middleware is in use!");
        }
        const access_token = req.cookies[`${this.cookieName()}-access-token`];
        const refresh_token = req.cookies[`${this.cookieName()}-refresh-token`];
        if (!access_token) {
          throw new Error("No cookie found!");
        }
        const { user, error: getUserError } = yield this.getUser(access_token);
        if (getUserError) {
          if (!refresh_token)
            throw new Error("No refresh_token cookie found!");
          if (!res)
            throw new Error("You need to pass the res object to automatically refresh the session!");
          const { data, error } = yield this.refreshAccessToken(refresh_token);
          if (error) {
            throw error;
          } else if (data) {
            setCookies(req, res, [
              { key: "access-token", value: data.access_token },
              { key: "refresh-token", value: data.refresh_token }
            ].map((token) => {
              var _a2;
              return {
                name: `${this.cookieName()}-${token.key}`,
                value: token.value,
                domain: this.cookieOptions.domain,
                maxAge: (_a2 = this.cookieOptions.lifetime) !== null && _a2 !== void 0 ? _a2 : 0,
                path: this.cookieOptions.path,
                sameSite: this.cookieOptions.sameSite
              };
            }));
            return { token: data.access_token, user: data.user, data: data.user, error: null };
          }
        }
        return { token: access_token, user, data: user, error: null };
      } catch (e) {
        return { token: null, user: null, data: null, error: e };
      }
    });
  }
  updateUserById(uid, attributes) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        this;
        const data = yield put$1(this.fetch, `${this.url}/admin/users/${uid}`, attributes, {
          headers: this.headers
        });
        return { user: data, data, error: null };
      } catch (e) {
        return { user: null, data: null, error: e };
      }
    });
  }
  deleteUser(uid) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const data = yield remove$1(this.fetch, `${this.url}/admin/users/${uid}`, {}, {
          headers: this.headers
        });
        return { user: data, data, error: null };
      } catch (e) {
        return { user: null, data: null, error: e };
      }
    });
  }
  getUser(jwt) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const data = yield get$1(this.fetch, `${this.url}/user`, {
          headers: this._createRequestHeaders(jwt)
        });
        return { user: data, data, error: null };
      } catch (e) {
        return { user: null, data: null, error: e };
      }
    });
  }
  updateUser(jwt, attributes) {
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const data = yield put$1(this.fetch, `${this.url}/user`, attributes, {
          headers: this._createRequestHeaders(jwt)
        });
        return { user: data, data, error: null };
      } catch (e) {
        return { user: null, data: null, error: e };
      }
    });
  }
}
function polyfillGlobalThis() {
  if (typeof globalThis === "object")
    return;
  try {
    Object.defineProperty(Object.prototype, "__magic__", {
      get: function() {
        return this;
      },
      configurable: true
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (e) {
    if (typeof self !== "undefined") {
      self.globalThis = self;
    }
  }
}
var __awaiter$9 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
polyfillGlobalThis();
const DEFAULT_OPTIONS$1 = {
  url: GOTRUE_URL,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  multiTab: true,
  headers: DEFAULT_HEADERS$3
};
const decodeBase64URL = (value) => {
  try {
    return atob(value.replace(/[-]/g, "+").replace(/[_]/g, "/"));
  } catch (e) {
    if (e instanceof ReferenceError) {
      return Buffer.from(value, "base64").toString("utf-8");
    } else {
      throw e;
    }
  }
};
class GoTrueClient {
  constructor(options) {
    this.stateChangeEmitters = /* @__PURE__ */ new Map();
    this.networkRetries = 0;
    const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS$1), options);
    this.currentUser = null;
    this.currentSession = null;
    this.autoRefreshToken = settings.autoRefreshToken;
    this.persistSession = settings.persistSession;
    this.multiTab = settings.multiTab;
    this.localStorage = settings.localStorage || globalThis.localStorage;
    this.api = new GoTrueApi({
      url: settings.url,
      headers: settings.headers,
      cookieOptions: settings.cookieOptions,
      fetch: settings.fetch
    });
    this._recoverSession();
    this._recoverAndRefresh();
    this._listenForMultiTabEvents();
    this._handleVisibilityChange();
    if (settings.detectSessionInUrl && isBrowser() && !!getParameterByName("access_token")) {
      this.getSessionFromUrl({ storeSession: true }).then(({ error }) => {
        if (error) {
          throw new Error("Error getting session from URL.");
        }
      });
    }
  }
  signUp({ email, password, phone }, options = {}) {
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        this._removeSession();
        const { data, error } = phone && password ? yield this.api.signUpWithPhone(phone, password, {
          data: options.data,
          captchaToken: options.captchaToken
        }) : yield this.api.signUpWithEmail(email, password, {
          redirectTo: options.redirectTo,
          data: options.data,
          captchaToken: options.captchaToken
        });
        if (error) {
          throw error;
        }
        if (!data) {
          throw "An error occurred on sign up.";
        }
        let session = null;
        let user = null;
        if (data.access_token) {
          session = data;
          user = session.user;
          this._saveSession(session);
          this._notifyAllSubscribers("SIGNED_IN");
        }
        if (data.id) {
          user = data;
        }
        return { user, session, error: null };
      } catch (e) {
        return { user: null, session: null, error: e };
      }
    });
  }
  signIn({ email, phone, password, refreshToken, provider, oidc }, options = {}) {
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        this._removeSession();
        if (email && !password) {
          const { error } = yield this.api.sendMagicLinkEmail(email, {
            redirectTo: options.redirectTo,
            shouldCreateUser: options.shouldCreateUser,
            captchaToken: options.captchaToken
          });
          return { user: null, session: null, error };
        }
        if (email && password) {
          return this._handleEmailSignIn(email, password, {
            redirectTo: options.redirectTo,
            captchaToken: options.captchaToken
          });
        }
        if (phone && !password) {
          const { error } = yield this.api.sendMobileOTP(phone, {
            shouldCreateUser: options.shouldCreateUser,
            captchaToken: options.captchaToken
          });
          return { user: null, session: null, error };
        }
        if (phone && password) {
          return this._handlePhoneSignIn(phone, password);
        }
        if (refreshToken) {
          const { error } = yield this._callRefreshToken(refreshToken);
          if (error)
            throw error;
          return {
            user: this.currentUser,
            session: this.currentSession,
            error: null
          };
        }
        if (provider) {
          return this._handleProviderSignIn(provider, {
            redirectTo: options.redirectTo,
            scopes: options.scopes,
            queryParams: options.queryParams
          });
        }
        if (oidc) {
          return this._handleOpenIDConnectSignIn(oidc);
        }
        throw new Error(`You must provide either an email, phone number, a third-party provider or OpenID Connect.`);
      } catch (e) {
        return { user: null, session: null, error: e };
      }
    });
  }
  verifyOTP(params, options = {}) {
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        this._removeSession();
        const { data, error } = yield this.api.verifyOTP(params, options);
        if (error) {
          throw error;
        }
        if (!data) {
          throw "An error occurred on token verification.";
        }
        let session = null;
        let user = null;
        if (data.access_token) {
          session = data;
          user = session.user;
          this._saveSession(session);
          this._notifyAllSubscribers("SIGNED_IN");
        }
        if (data.id) {
          user = data;
        }
        return { user, session, error: null };
      } catch (e) {
        return { user: null, session: null, error: e };
      }
    });
  }
  user() {
    return this.currentUser;
  }
  session() {
    return this.currentSession;
  }
  refreshSession() {
    var _a2;
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        if (!((_a2 = this.currentSession) === null || _a2 === void 0 ? void 0 : _a2.access_token))
          throw new Error("Not logged in.");
        const { error } = yield this._callRefreshToken();
        if (error)
          throw error;
        return { data: this.currentSession, user: this.currentUser, error: null };
      } catch (e) {
        return { data: null, user: null, error: e };
      }
    });
  }
  update(attributes) {
    var _a2;
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        if (!((_a2 = this.currentSession) === null || _a2 === void 0 ? void 0 : _a2.access_token))
          throw new Error("Not logged in.");
        const { user, error } = yield this.api.updateUser(this.currentSession.access_token, attributes);
        if (error)
          throw error;
        if (!user)
          throw Error("Invalid user data.");
        const session = Object.assign(Object.assign({}, this.currentSession), { user });
        this._saveSession(session);
        this._notifyAllSubscribers("USER_UPDATED");
        return { data: user, user, error: null };
      } catch (e) {
        return { data: null, user: null, error: e };
      }
    });
  }
  setSession(arg0) {
    return __awaiter$9(this, void 0, void 0, function* () {
      let session;
      if (typeof arg0 === "string") {
        const refresh_token = arg0;
        const { data, error } = yield this.api.refreshAccessToken(refresh_token);
        if (error) {
          return { session: null, error };
        }
        session = data;
      } else {
        const timeNow = Math.round(Date.now() / 1e3);
        let { refresh_token, access_token } = arg0;
        let expires_at = 0;
        let expires_in = 0;
        const tokenParts = access_token.split(".");
        if (tokenParts.length !== 3)
          throw new Error("access_token is not a proper JWT");
        const bodyJSON = decodeBase64URL(tokenParts[1]);
        let parsed = void 0;
        try {
          parsed = JSON.parse(bodyJSON);
        } catch (e) {
          throw new Error("access_token is not a proper JWT, invalid JSON in body");
        }
        if (typeof parsed === "object" && parsed && typeof parsed.exp === "number") {
          expires_at = parsed.exp;
          expires_in = timeNow - parsed.exp;
        } else {
          throw new Error("access_token is not a proper JWT, missing exp claim");
        }
        if (timeNow > expires_at) {
          const { data, error } = yield this.api.refreshAccessToken(refresh_token);
          if (error) {
            return { session: null, error };
          }
          session = data;
        } else {
          const { user, error } = yield this.api.getUser(access_token);
          if (error)
            throw error;
          session = {
            access_token,
            expires_in,
            expires_at,
            refresh_token,
            token_type: "bearer",
            user
          };
        }
      }
      try {
        this._saveSession(session);
        this._notifyAllSubscribers("SIGNED_IN");
        return { session, error: null };
      } catch (e) {
        return { error: e, session: null };
      }
    });
  }
  setAuth(access_token) {
    this.currentSession = Object.assign(Object.assign({}, this.currentSession), { access_token, token_type: "bearer", user: this.user() });
    this._notifyAllSubscribers("TOKEN_REFRESHED");
    return this.currentSession;
  }
  getSessionFromUrl(options) {
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        if (!isBrowser())
          throw new Error("No browser detected.");
        const error_description = getParameterByName("error_description");
        if (error_description)
          throw new Error(error_description);
        const provider_token = getParameterByName("provider_token");
        const provider_refresh_token = getParameterByName("provider_refresh_token");
        const access_token = getParameterByName("access_token");
        if (!access_token)
          throw new Error("No access_token detected.");
        const expires_in = getParameterByName("expires_in");
        if (!expires_in)
          throw new Error("No expires_in detected.");
        const refresh_token = getParameterByName("refresh_token");
        if (!refresh_token)
          throw new Error("No refresh_token detected.");
        const token_type = getParameterByName("token_type");
        if (!token_type)
          throw new Error("No token_type detected.");
        const timeNow = Math.round(Date.now() / 1e3);
        const expires_at = timeNow + parseInt(expires_in);
        const { user, error } = yield this.api.getUser(access_token);
        if (error)
          throw error;
        const session = {
          provider_token,
          provider_refresh_token,
          access_token,
          expires_in: parseInt(expires_in),
          expires_at,
          refresh_token,
          token_type,
          user
        };
        if (options === null || options === void 0 ? void 0 : options.storeSession) {
          this._saveSession(session);
          const recoveryMode = getParameterByName("type");
          this._notifyAllSubscribers("SIGNED_IN");
          if (recoveryMode === "recovery") {
            this._notifyAllSubscribers("PASSWORD_RECOVERY");
          }
        }
        window.location.hash = "";
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  signOut() {
    var _a2;
    return __awaiter$9(this, void 0, void 0, function* () {
      const accessToken = (_a2 = this.currentSession) === null || _a2 === void 0 ? void 0 : _a2.access_token;
      this._removeSession();
      this._notifyAllSubscribers("SIGNED_OUT");
      if (accessToken) {
        const { error } = yield this.api.signOut(accessToken);
        if (error)
          return { error };
      }
      return { error: null };
    });
  }
  onAuthStateChange(callback) {
    try {
      const id = uuid();
      const subscription = {
        id,
        callback,
        unsubscribe: () => {
          this.stateChangeEmitters.delete(id);
        }
      };
      this.stateChangeEmitters.set(id, subscription);
      return { data: subscription, error: null };
    } catch (e) {
      return { data: null, error: e };
    }
  }
  _handleEmailSignIn(email, password, options = {}) {
    var _a2, _b2;
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        const { data, error } = yield this.api.signInWithEmail(email, password, {
          redirectTo: options.redirectTo,
          captchaToken: options.captchaToken
        });
        if (error || !data)
          return { data: null, user: null, session: null, error };
        if (((_a2 = data === null || data === void 0 ? void 0 : data.user) === null || _a2 === void 0 ? void 0 : _a2.confirmed_at) || ((_b2 = data === null || data === void 0 ? void 0 : data.user) === null || _b2 === void 0 ? void 0 : _b2.email_confirmed_at)) {
          this._saveSession(data);
          this._notifyAllSubscribers("SIGNED_IN");
        }
        return { data, user: data.user, session: data, error: null };
      } catch (e) {
        return { data: null, user: null, session: null, error: e };
      }
    });
  }
  _handlePhoneSignIn(phone, password, options = {}) {
    var _a2;
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        const { data, error } = yield this.api.signInWithPhone(phone, password, options);
        if (error || !data)
          return { data: null, user: null, session: null, error };
        if ((_a2 = data === null || data === void 0 ? void 0 : data.user) === null || _a2 === void 0 ? void 0 : _a2.phone_confirmed_at) {
          this._saveSession(data);
          this._notifyAllSubscribers("SIGNED_IN");
        }
        return { data, user: data.user, session: data, error: null };
      } catch (e) {
        return { data: null, user: null, session: null, error: e };
      }
    });
  }
  _handleProviderSignIn(provider, options = {}) {
    const url2 = this.api.getUrlForProvider(provider, {
      redirectTo: options.redirectTo,
      scopes: options.scopes,
      queryParams: options.queryParams
    });
    try {
      if (isBrowser())
        ;
      return { provider, url: url2, data: null, session: null, user: null, error: null };
    } catch (e) {
      if (url2)
        return { provider, url: url2, data: null, session: null, user: null, error: null };
      return { data: null, user: null, session: null, error: e };
    }
  }
  _handleOpenIDConnectSignIn({ id_token, nonce, client_id, issuer, provider }) {
    return __awaiter$9(this, void 0, void 0, function* () {
      if (id_token && nonce && (client_id && issuer || provider)) {
        try {
          const { data, error } = yield this.api.signInWithOpenIDConnect({
            id_token,
            nonce,
            client_id,
            issuer,
            provider
          });
          if (error || !data)
            return { user: null, session: null, error };
          this._saveSession(data);
          this._notifyAllSubscribers("SIGNED_IN");
          return { user: data.user, session: data, error: null };
        } catch (e) {
          return { user: null, session: null, error: e };
        }
      }
      throw new Error(`You must provide a OpenID Connect provider with your id token and nonce.`);
    });
  }
  _recoverSession() {
    try {
      const data = getItemSynchronously(this.localStorage, STORAGE_KEY);
      if (!data)
        return null;
      const { currentSession, expiresAt: expiresAt2 } = data;
      const timeNow = Math.round(Date.now() / 1e3);
      if (expiresAt2 >= timeNow + EXPIRY_MARGIN && (currentSession === null || currentSession === void 0 ? void 0 : currentSession.user)) {
        this._saveSession(currentSession);
        this._notifyAllSubscribers("SIGNED_IN");
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  _recoverAndRefresh() {
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        const data = yield getItemAsync(this.localStorage, STORAGE_KEY);
        if (!data)
          return null;
        const { currentSession, expiresAt: expiresAt2 } = data;
        const timeNow = Math.round(Date.now() / 1e3);
        if (expiresAt2 < timeNow + EXPIRY_MARGIN) {
          if (this.autoRefreshToken && currentSession.refresh_token) {
            this.networkRetries++;
            const { error } = yield this._callRefreshToken(currentSession.refresh_token);
            if (error) {
              console.log(error.message);
              if (error.message === NETWORK_FAILURE.ERROR_MESSAGE && this.networkRetries < NETWORK_FAILURE.MAX_RETRIES) {
                if (this.refreshTokenTimer)
                  clearTimeout(this.refreshTokenTimer);
                this.refreshTokenTimer = setTimeout(
                  () => this._recoverAndRefresh(),
                  Math.pow(NETWORK_FAILURE.RETRY_INTERVAL, this.networkRetries) * 100
                );
                return;
              }
              yield this._removeSession();
            }
            this.networkRetries = 0;
          } else {
            this._removeSession();
          }
        } else if (!currentSession) {
          console.log("Current session is missing data.");
          this._removeSession();
        } else {
          this._saveSession(currentSession);
          this._notifyAllSubscribers("SIGNED_IN");
        }
      } catch (err) {
        console.error(err);
        return null;
      }
    });
  }
  _callRefreshToken(refresh_token) {
    var _a2;
    if (refresh_token === void 0) {
      refresh_token = (_a2 = this.currentSession) === null || _a2 === void 0 ? void 0 : _a2.refresh_token;
    }
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        if (!refresh_token) {
          throw new Error("No current session.");
        }
        const { data, error } = yield this.api.refreshAccessToken(refresh_token);
        if (error)
          throw error;
        if (!data)
          throw Error("Invalid session data.");
        this._saveSession(data);
        this._notifyAllSubscribers("TOKEN_REFRESHED");
        this._notifyAllSubscribers("SIGNED_IN");
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  _notifyAllSubscribers(event) {
    this.stateChangeEmitters.forEach((x) => x.callback(event, this.currentSession));
  }
  _saveSession(session) {
    this.currentSession = session;
    this.currentUser = session.user;
    const expiresAt2 = session.expires_at;
    if (expiresAt2) {
      const timeNow = Math.round(Date.now() / 1e3);
      const expiresIn = expiresAt2 - timeNow;
      const refreshDurationBeforeExpires = expiresIn > EXPIRY_MARGIN ? EXPIRY_MARGIN : 0.5;
      this._startAutoRefreshToken((expiresIn - refreshDurationBeforeExpires) * 1e3);
    }
    if (this.persistSession && session.expires_at) {
      this._persistSession(this.currentSession);
    }
  }
  _persistSession(currentSession) {
    ({ currentSession, expiresAt: currentSession.expires_at });
    setItemAsync(this.localStorage);
  }
  _removeSession() {
    return __awaiter$9(this, void 0, void 0, function* () {
      this.currentSession = null;
      this.currentUser = null;
      if (this.refreshTokenTimer)
        clearTimeout(this.refreshTokenTimer);
      removeItemAsync(this.localStorage);
    });
  }
  _startAutoRefreshToken(value) {
    if (this.refreshTokenTimer)
      clearTimeout(this.refreshTokenTimer);
    if (value <= 0 || !this.autoRefreshToken)
      return;
    this.refreshTokenTimer = setTimeout(() => __awaiter$9(this, void 0, void 0, function* () {
      this.networkRetries++;
      const { error } = yield this._callRefreshToken();
      if (!error)
        this.networkRetries = 0;
      if ((error === null || error === void 0 ? void 0 : error.message) === NETWORK_FAILURE.ERROR_MESSAGE && this.networkRetries < NETWORK_FAILURE.MAX_RETRIES)
        this._startAutoRefreshToken(Math.pow(NETWORK_FAILURE.RETRY_INTERVAL, this.networkRetries) * 100);
    }), value);
    if (typeof this.refreshTokenTimer.unref === "function")
      this.refreshTokenTimer.unref();
  }
  _listenForMultiTabEvents() {
    if (!this.multiTab || !isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
      return false;
    }
    try {
      window === null || window === void 0 ? void 0 : window.addEventListener("storage", (e) => {
        var _a2;
        if (e.key === STORAGE_KEY) {
          const newSession = JSON.parse(String(e.newValue));
          if ((_a2 = newSession === null || newSession === void 0 ? void 0 : newSession.currentSession) === null || _a2 === void 0 ? void 0 : _a2.access_token) {
            this._saveSession(newSession.currentSession);
            this._notifyAllSubscribers("SIGNED_IN");
          } else {
            this._removeSession();
            this._notifyAllSubscribers("SIGNED_OUT");
          }
        }
      });
    } catch (error) {
      console.error("_listenForMultiTabEvents", error);
    }
  }
  _handleVisibilityChange() {
    if (!this.multiTab || !isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
      return false;
    }
    try {
      window === null || window === void 0 ? void 0 : window.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          this._recoverAndRefresh();
        }
      });
    } catch (error) {
      console.error("_handleVisibilityChange", error);
    }
  }
}
class SupabaseAuthClient extends GoTrueClient {
  constructor(options) {
    super(options);
  }
}
var __awaiter$8 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class PostgrestBuilder {
  constructor(builder) {
    Object.assign(this, builder);
    let _fetch;
    if (builder.fetch) {
      _fetch = builder.fetch;
    } else if (typeof fetch === "undefined") {
      _fetch = (...args) => __awaiter$8(this, void 0, void 0, function* () {
        return yield (yield import('unenv/runtime/npm/cross-fetch')).fetch(...args);
      });
    } else {
      _fetch = fetch;
    }
    this.fetch = (...args) => _fetch(...args);
    this.shouldThrowOnError = builder.shouldThrowOnError || false;
    this.allowEmpty = builder.allowEmpty || false;
  }
  throwOnError(throwOnError) {
    if (throwOnError === null || throwOnError === void 0) {
      throwOnError = true;
    }
    this.shouldThrowOnError = throwOnError;
    return this;
  }
  then(onfulfilled, onrejected) {
    if (typeof this.schema === "undefined")
      ;
    else if (["GET", "HEAD"].includes(this.method)) {
      this.headers["Accept-Profile"] = this.schema;
    } else {
      this.headers["Content-Profile"] = this.schema;
    }
    if (this.method !== "GET" && this.method !== "HEAD") {
      this.headers["Content-Type"] = "application/json";
    }
    let res = this.fetch(this.url.toString(), {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      signal: this.signal
    }).then((res2) => __awaiter$8(this, void 0, void 0, function* () {
      var _a2, _b2, _c2, _d2;
      let error = null;
      let data = null;
      let count = null;
      let status = res2.status;
      let statusText = res2.statusText;
      if (res2.ok) {
        const isReturnMinimal = (_a2 = this.headers["Prefer"]) === null || _a2 === void 0 ? void 0 : _a2.split(",").includes("return=minimal");
        if (this.method !== "HEAD" && !isReturnMinimal) {
          const text = yield res2.text();
          if (!text)
            ;
          else if (this.headers["Accept"] === "text/csv") {
            data = text;
          } else {
            data = JSON.parse(text);
          }
        }
        const countHeader = (_b2 = this.headers["Prefer"]) === null || _b2 === void 0 ? void 0 : _b2.match(/count=(exact|planned|estimated)/);
        const contentRange = (_c2 = res2.headers.get("content-range")) === null || _c2 === void 0 ? void 0 : _c2.split("/");
        if (countHeader && contentRange && contentRange.length > 1) {
          count = parseInt(contentRange[1]);
        }
      } else {
        const body = yield res2.text();
        try {
          error = JSON.parse(body);
        } catch (_e2) {
          error = {
            message: body
          };
        }
        if (error && this.allowEmpty && ((_d2 = error === null || error === void 0 ? void 0 : error.details) === null || _d2 === void 0 ? void 0 : _d2.includes("Results contain 0 rows"))) {
          error = null;
          status = 200;
          statusText = "OK";
        }
        if (error && this.shouldThrowOnError) {
          throw error;
        }
      }
      const postgrestResponse = {
        error,
        data,
        count,
        status,
        statusText,
        body: data
      };
      return postgrestResponse;
    }));
    if (!this.shouldThrowOnError) {
      res = res.catch((fetchError) => ({
        error: {
          message: `FetchError: ${fetchError.message}`,
          details: "",
          hint: "",
          code: fetchError.code || ""
        },
        data: null,
        body: null,
        count: null,
        status: 400,
        statusText: "Bad Request"
      }));
    }
    return res.then(onfulfilled, onrejected);
  }
}
class PostgrestTransformBuilder extends PostgrestBuilder {
  select(columns = "*") {
    let quoted = false;
    const cleanedColumns = columns.split("").map((c) => {
      if (/\s/.test(c) && !quoted) {
        return "";
      }
      if (c === '"') {
        quoted = !quoted;
      }
      return c;
    }).join("");
    this.url.searchParams.set("select", cleanedColumns);
    return this;
  }
  order(column, { ascending = true, nullsFirst = false, foreignTable } = {}) {
    const key = typeof foreignTable === "undefined" ? "order" : `${foreignTable}.order`;
    const existingOrder = this.url.searchParams.get(key);
    this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}.${nullsFirst ? "nullsfirst" : "nullslast"}`);
    return this;
  }
  limit(count, { foreignTable } = {}) {
    const key = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
    this.url.searchParams.set(key, `${count}`);
    return this;
  }
  range(from, to, { foreignTable } = {}) {
    const keyOffset = typeof foreignTable === "undefined" ? "offset" : `${foreignTable}.offset`;
    const keyLimit = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
    this.url.searchParams.set(keyOffset, `${from}`);
    this.url.searchParams.set(keyLimit, `${to - from + 1}`);
    return this;
  }
  abortSignal(signal) {
    this.signal = signal;
    return this;
  }
  single() {
    this.headers["Accept"] = "application/vnd.pgrst.object+json";
    return this;
  }
  maybeSingle() {
    this.headers["Accept"] = "application/vnd.pgrst.object+json";
    this.allowEmpty = true;
    return this;
  }
  csv() {
    this.headers["Accept"] = "text/csv";
    return this;
  }
}
class PostgrestFilterBuilder extends PostgrestTransformBuilder {
  constructor() {
    super(...arguments);
    this.cs = this.contains;
    this.cd = this.containedBy;
    this.sl = this.rangeLt;
    this.sr = this.rangeGt;
    this.nxl = this.rangeGte;
    this.nxr = this.rangeLte;
    this.adj = this.rangeAdjacent;
    this.ov = this.overlaps;
  }
  not(column, operator, value) {
    this.url.searchParams.append(`${column}`, `not.${operator}.${value}`);
    return this;
  }
  or(filters, { foreignTable } = {}) {
    const key = typeof foreignTable === "undefined" ? "or" : `${foreignTable}.or`;
    this.url.searchParams.append(key, `(${filters})`);
    return this;
  }
  eq(column, value) {
    this.url.searchParams.append(`${column}`, `eq.${value}`);
    return this;
  }
  neq(column, value) {
    this.url.searchParams.append(`${column}`, `neq.${value}`);
    return this;
  }
  gt(column, value) {
    this.url.searchParams.append(`${column}`, `gt.${value}`);
    return this;
  }
  gte(column, value) {
    this.url.searchParams.append(`${column}`, `gte.${value}`);
    return this;
  }
  lt(column, value) {
    this.url.searchParams.append(`${column}`, `lt.${value}`);
    return this;
  }
  lte(column, value) {
    this.url.searchParams.append(`${column}`, `lte.${value}`);
    return this;
  }
  like(column, pattern) {
    this.url.searchParams.append(`${column}`, `like.${pattern}`);
    return this;
  }
  ilike(column, pattern) {
    this.url.searchParams.append(`${column}`, `ilike.${pattern}`);
    return this;
  }
  is(column, value) {
    this.url.searchParams.append(`${column}`, `is.${value}`);
    return this;
  }
  in(column, values) {
    const cleanedValues = values.map((s) => {
      if (typeof s === "string" && new RegExp("[,()]").test(s))
        return `"${s}"`;
      else
        return `${s}`;
    }).join(",");
    this.url.searchParams.append(`${column}`, `in.(${cleanedValues})`);
    return this;
  }
  contains(column, value) {
    if (typeof value === "string") {
      this.url.searchParams.append(`${column}`, `cs.${value}`);
    } else if (Array.isArray(value)) {
      this.url.searchParams.append(`${column}`, `cs.{${value.join(",")}}`);
    } else {
      this.url.searchParams.append(`${column}`, `cs.${JSON.stringify(value)}`);
    }
    return this;
  }
  containedBy(column, value) {
    if (typeof value === "string") {
      this.url.searchParams.append(`${column}`, `cd.${value}`);
    } else if (Array.isArray(value)) {
      this.url.searchParams.append(`${column}`, `cd.{${value.join(",")}}`);
    } else {
      this.url.searchParams.append(`${column}`, `cd.${JSON.stringify(value)}`);
    }
    return this;
  }
  rangeLt(column, range) {
    this.url.searchParams.append(`${column}`, `sl.${range}`);
    return this;
  }
  rangeGt(column, range) {
    this.url.searchParams.append(`${column}`, `sr.${range}`);
    return this;
  }
  rangeGte(column, range) {
    this.url.searchParams.append(`${column}`, `nxl.${range}`);
    return this;
  }
  rangeLte(column, range) {
    this.url.searchParams.append(`${column}`, `nxr.${range}`);
    return this;
  }
  rangeAdjacent(column, range) {
    this.url.searchParams.append(`${column}`, `adj.${range}`);
    return this;
  }
  overlaps(column, value) {
    if (typeof value === "string") {
      this.url.searchParams.append(`${column}`, `ov.${value}`);
    } else {
      this.url.searchParams.append(`${column}`, `ov.{${value.join(",")}}`);
    }
    return this;
  }
  textSearch(column, query, { config: config2, type = null } = {}) {
    let typePart = "";
    if (type === "plain") {
      typePart = "pl";
    } else if (type === "phrase") {
      typePart = "ph";
    } else if (type === "websearch") {
      typePart = "w";
    }
    const configPart = config2 === void 0 ? "" : `(${config2})`;
    this.url.searchParams.append(`${column}`, `${typePart}fts${configPart}.${query}`);
    return this;
  }
  fts(column, query, { config: config2 } = {}) {
    const configPart = typeof config2 === "undefined" ? "" : `(${config2})`;
    this.url.searchParams.append(`${column}`, `fts${configPart}.${query}`);
    return this;
  }
  plfts(column, query, { config: config2 } = {}) {
    const configPart = typeof config2 === "undefined" ? "" : `(${config2})`;
    this.url.searchParams.append(`${column}`, `plfts${configPart}.${query}`);
    return this;
  }
  phfts(column, query, { config: config2 } = {}) {
    const configPart = typeof config2 === "undefined" ? "" : `(${config2})`;
    this.url.searchParams.append(`${column}`, `phfts${configPart}.${query}`);
    return this;
  }
  wfts(column, query, { config: config2 } = {}) {
    const configPart = typeof config2 === "undefined" ? "" : `(${config2})`;
    this.url.searchParams.append(`${column}`, `wfts${configPart}.${query}`);
    return this;
  }
  filter(column, operator, value) {
    this.url.searchParams.append(`${column}`, `${operator}.${value}`);
    return this;
  }
  match(query) {
    Object.keys(query).forEach((key) => {
      this.url.searchParams.append(`${key}`, `eq.${query[key]}`);
    });
    return this;
  }
}
class PostgrestQueryBuilder extends PostgrestBuilder {
  constructor(url2, { headers = {}, schema, fetch: fetch2, shouldThrowOnError } = {}) {
    super({ fetch: fetch2, shouldThrowOnError });
    this.url = new URL(url2);
    this.headers = Object.assign({}, headers);
    this.schema = schema;
  }
  select(columns = "*", { head = false, count = null } = {}) {
    this.method = "GET";
    let quoted = false;
    const cleanedColumns = columns.split("").map((c) => {
      if (/\s/.test(c) && !quoted) {
        return "";
      }
      if (c === '"') {
        quoted = !quoted;
      }
      return c;
    }).join("");
    this.url.searchParams.set("select", cleanedColumns);
    if (count) {
      this.headers["Prefer"] = `count=${count}`;
    }
    if (head) {
      this.method = "HEAD";
    }
    return new PostgrestFilterBuilder(this);
  }
  insert(values, { upsert = false, onConflict, returning = "representation", count = null } = {}) {
    this.method = "POST";
    const prefersHeaders = [`return=${returning}`];
    if (upsert)
      prefersHeaders.push("resolution=merge-duplicates");
    if (upsert && onConflict !== void 0)
      this.url.searchParams.set("on_conflict", onConflict);
    this.body = values;
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    if (this.headers["Prefer"]) {
      prefersHeaders.unshift(this.headers["Prefer"]);
    }
    this.headers["Prefer"] = prefersHeaders.join(",");
    if (Array.isArray(values)) {
      const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
      if (columns.length > 0) {
        const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
        this.url.searchParams.set("columns", uniqueColumns.join(","));
      }
    }
    return new PostgrestFilterBuilder(this);
  }
  upsert(values, { onConflict, returning = "representation", count = null, ignoreDuplicates = false } = {}) {
    this.method = "POST";
    const prefersHeaders = [
      `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`,
      `return=${returning}`
    ];
    if (onConflict !== void 0)
      this.url.searchParams.set("on_conflict", onConflict);
    this.body = values;
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    if (this.headers["Prefer"]) {
      prefersHeaders.unshift(this.headers["Prefer"]);
    }
    this.headers["Prefer"] = prefersHeaders.join(",");
    return new PostgrestFilterBuilder(this);
  }
  update(values, { returning = "representation", count = null } = {}) {
    this.method = "PATCH";
    const prefersHeaders = [`return=${returning}`];
    this.body = values;
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    if (this.headers["Prefer"]) {
      prefersHeaders.unshift(this.headers["Prefer"]);
    }
    this.headers["Prefer"] = prefersHeaders.join(",");
    return new PostgrestFilterBuilder(this);
  }
  delete({ returning = "representation", count = null } = {}) {
    this.method = "DELETE";
    const prefersHeaders = [`return=${returning}`];
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    if (this.headers["Prefer"]) {
      prefersHeaders.unshift(this.headers["Prefer"]);
    }
    this.headers["Prefer"] = prefersHeaders.join(",");
    return new PostgrestFilterBuilder(this);
  }
}
class PostgrestRpcBuilder extends PostgrestBuilder {
  constructor(url2, { headers = {}, schema, fetch: fetch2, shouldThrowOnError } = {}) {
    super({ fetch: fetch2, shouldThrowOnError });
    this.url = new URL(url2);
    this.headers = Object.assign({}, headers);
    this.schema = schema;
  }
  rpc(params, { head = false, count = null } = {}) {
    if (head) {
      this.method = "HEAD";
      if (params) {
        Object.entries(params).forEach(([name2, value]) => {
          this.url.searchParams.append(name2, value);
        });
      }
    } else {
      this.method = "POST";
      this.body = params;
    }
    if (count) {
      if (this.headers["Prefer"] !== void 0)
        this.headers["Prefer"] += `,count=${count}`;
      else
        this.headers["Prefer"] = `count=${count}`;
    }
    return new PostgrestFilterBuilder(this);
  }
}
const version$4 = "0.37.4";
const DEFAULT_HEADERS$2 = { "X-Client-Info": `postgrest-js/${version$4}` };
class PostgrestClient {
  constructor(url2, { headers = {}, schema, fetch: fetch2, throwOnError } = {}) {
    this.url = url2;
    this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS$2), headers);
    this.schema = schema;
    this.fetch = fetch2;
    this.shouldThrowOnError = throwOnError;
  }
  auth(token) {
    this.headers["Authorization"] = `Bearer ${token}`;
    return this;
  }
  from(table) {
    const url2 = `${this.url}/${table}`;
    return new PostgrestQueryBuilder(url2, {
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch,
      shouldThrowOnError: this.shouldThrowOnError
    });
  }
  rpc(fn, params, { head = false, count = null } = {}) {
    const url2 = `${this.url}/rpc/${fn}`;
    return new PostgrestRpcBuilder(url2, {
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch,
      shouldThrowOnError: this.shouldThrowOnError
    }).rpc(params, { head, count });
  }
}
var PostgresTypes;
(function(PostgresTypes2) {
  PostgresTypes2["abstime"] = "abstime";
  PostgresTypes2["bool"] = "bool";
  PostgresTypes2["date"] = "date";
  PostgresTypes2["daterange"] = "daterange";
  PostgresTypes2["float4"] = "float4";
  PostgresTypes2["float8"] = "float8";
  PostgresTypes2["int2"] = "int2";
  PostgresTypes2["int4"] = "int4";
  PostgresTypes2["int4range"] = "int4range";
  PostgresTypes2["int8"] = "int8";
  PostgresTypes2["int8range"] = "int8range";
  PostgresTypes2["json"] = "json";
  PostgresTypes2["jsonb"] = "jsonb";
  PostgresTypes2["money"] = "money";
  PostgresTypes2["numeric"] = "numeric";
  PostgresTypes2["oid"] = "oid";
  PostgresTypes2["reltime"] = "reltime";
  PostgresTypes2["text"] = "text";
  PostgresTypes2["time"] = "time";
  PostgresTypes2["timestamp"] = "timestamp";
  PostgresTypes2["timestamptz"] = "timestamptz";
  PostgresTypes2["timetz"] = "timetz";
  PostgresTypes2["tsrange"] = "tsrange";
  PostgresTypes2["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
const convertChangeData = (columns, record, options = {}) => {
  var _a2;
  const skipTypes = (_a2 = options.skipTypes) !== null && _a2 !== void 0 ? _a2 : [];
  return Object.keys(record).reduce((acc, rec_key) => {
    acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
    return acc;
  }, {});
};
const convertColumn = (columnName, columns, record, skipTypes) => {
  const column = columns.find((x) => x.name === columnName);
  const colType = column === null || column === void 0 ? void 0 : column.type;
  const value = record[columnName];
  if (colType && !skipTypes.includes(colType)) {
    return convertCell(colType, value);
  }
  return noop$2(value);
};
const convertCell = (type, value) => {
  if (type.charAt(0) === "_") {
    const dataType = type.slice(1, type.length);
    return toArray(value, dataType);
  }
  switch (type) {
    case PostgresTypes.bool:
      return toBoolean(value);
    case PostgresTypes.float4:
    case PostgresTypes.float8:
    case PostgresTypes.int2:
    case PostgresTypes.int4:
    case PostgresTypes.int8:
    case PostgresTypes.numeric:
    case PostgresTypes.oid:
      return toNumber(value);
    case PostgresTypes.json:
    case PostgresTypes.jsonb:
      return toJson(value);
    case PostgresTypes.timestamp:
      return toTimestampString(value);
    case PostgresTypes.abstime:
    case PostgresTypes.date:
    case PostgresTypes.daterange:
    case PostgresTypes.int4range:
    case PostgresTypes.int8range:
    case PostgresTypes.money:
    case PostgresTypes.reltime:
    case PostgresTypes.text:
    case PostgresTypes.time:
    case PostgresTypes.timestamptz:
    case PostgresTypes.timetz:
    case PostgresTypes.tsrange:
    case PostgresTypes.tstzrange:
      return noop$2(value);
    default:
      return noop$2(value);
  }
};
const noop$2 = (value) => {
  return value;
};
const toBoolean = (value) => {
  switch (value) {
    case "t":
      return true;
    case "f":
      return false;
    default:
      return value;
  }
};
const toNumber = (value) => {
  if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    if (!Number.isNaN(parsedValue)) {
      return parsedValue;
    }
  }
  return value;
};
const toJson = (value) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.log(`JSON parse error: ${error}`);
      return value;
    }
  }
  return value;
};
const toArray = (value, type) => {
  if (typeof value !== "string") {
    return value;
  }
  const lastIdx = value.length - 1;
  const closeBrace = value[lastIdx];
  const openBrace = value[0];
  if (openBrace === "{" && closeBrace === "}") {
    let arr;
    const valTrim = value.slice(1, lastIdx);
    try {
      arr = JSON.parse("[" + valTrim + "]");
    } catch (_) {
      arr = valTrim ? valTrim.split(",") : [];
    }
    return arr.map((val) => convertCell(type, val));
  }
  return value;
};
const toTimestampString = (value) => {
  if (typeof value === "string") {
    return value.replace(" ", "T");
  }
  return value;
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var websocket$1 = { exports: {} };
var utils$3 = {};
var noop$1 = utils$3.noop = function() {
};
utils$3.extend = function extend(dest, source) {
  for (var prop in source) {
    dest[prop] = source[prop];
  }
};
utils$3.eventEmitterListenerCount = require$$2.EventEmitter.listenerCount || function(emitter, type) {
  return emitter.listeners(type).length;
};
utils$3.bufferAllocUnsafe = Buffer.allocUnsafe ? Buffer.allocUnsafe : function oldBufferAllocUnsafe(size) {
  return new Buffer(size);
};
utils$3.bufferFromString = Buffer.from ? Buffer.from : function oldBufferFromString(string, encoding) {
  return new Buffer(string, encoding);
};
utils$3.BufferingLogger = function createBufferingLogger(identifier, uniqueID) {
  var logFunction = require$$1(identifier);
  if (logFunction.enabled) {
    var logger = new BufferingLogger(identifier, uniqueID, logFunction);
    var debug2 = logger.log.bind(logger);
    debug2.printOutput = logger.printOutput.bind(logger);
    debug2.enabled = logFunction.enabled;
    return debug2;
  }
  logFunction.printOutput = noop$1;
  return logFunction;
};
function BufferingLogger(identifier, uniqueID, logFunction) {
  this.logFunction = logFunction;
  this.identifier = identifier;
  this.uniqueID = uniqueID;
  this.buffer = [];
}
BufferingLogger.prototype.log = function() {
  this.buffer.push([new Date(), Array.prototype.slice.call(arguments)]);
  return this;
};
BufferingLogger.prototype.clear = function() {
  this.buffer = [];
  return this;
};
BufferingLogger.prototype.printOutput = function(logFunction) {
  if (!logFunction) {
    logFunction = this.logFunction;
  }
  var uniqueID = this.uniqueID;
  this.buffer.forEach(function(entry2) {
    var date = entry2[0].toLocaleString();
    var args = entry2[1].slice();
    var formatString = args[0];
    if (formatString !== void 0 && formatString !== null) {
      formatString = "%s - %s - " + formatString.toString();
      args.splice(0, 1, formatString, date, uniqueID);
      logFunction.apply(commonjsGlobal, args);
    }
  });
};
var bufferUtil = require$$0$1;
var bufferAllocUnsafe$3 = utils$3.bufferAllocUnsafe;
const DECODE_HEADER = 1;
const WAITING_FOR_16_BIT_LENGTH = 2;
const WAITING_FOR_64_BIT_LENGTH = 3;
const WAITING_FOR_MASK_KEY = 4;
const WAITING_FOR_PAYLOAD = 5;
const COMPLETE = 6;
function WebSocketFrame$1(maskBytes, frameHeader, config2) {
  this.maskBytes = maskBytes;
  this.frameHeader = frameHeader;
  this.config = config2;
  this.maxReceivedFrameSize = config2.maxReceivedFrameSize;
  this.protocolError = false;
  this.frameTooLarge = false;
  this.invalidCloseFrameLength = false;
  this.parseState = DECODE_HEADER;
  this.closeStatus = -1;
}
WebSocketFrame$1.prototype.addData = function(bufferList) {
  if (this.parseState === DECODE_HEADER) {
    if (bufferList.length >= 2) {
      bufferList.joinInto(this.frameHeader, 0, 0, 2);
      bufferList.advance(2);
      var firstByte = this.frameHeader[0];
      var secondByte = this.frameHeader[1];
      this.fin = Boolean(firstByte & 128);
      this.rsv1 = Boolean(firstByte & 64);
      this.rsv2 = Boolean(firstByte & 32);
      this.rsv3 = Boolean(firstByte & 16);
      this.mask = Boolean(secondByte & 128);
      this.opcode = firstByte & 15;
      this.length = secondByte & 127;
      if (this.opcode >= 8) {
        if (this.length > 125) {
          this.protocolError = true;
          this.dropReason = "Illegal control frame longer than 125 bytes.";
          return true;
        }
        if (!this.fin) {
          this.protocolError = true;
          this.dropReason = "Control frames must not be fragmented.";
          return true;
        }
      }
      if (this.length === 126) {
        this.parseState = WAITING_FOR_16_BIT_LENGTH;
      } else if (this.length === 127) {
        this.parseState = WAITING_FOR_64_BIT_LENGTH;
      } else {
        this.parseState = WAITING_FOR_MASK_KEY;
      }
    }
  }
  if (this.parseState === WAITING_FOR_16_BIT_LENGTH) {
    if (bufferList.length >= 2) {
      bufferList.joinInto(this.frameHeader, 2, 0, 2);
      bufferList.advance(2);
      this.length = this.frameHeader.readUInt16BE(2);
      this.parseState = WAITING_FOR_MASK_KEY;
    }
  } else if (this.parseState === WAITING_FOR_64_BIT_LENGTH) {
    if (bufferList.length >= 8) {
      bufferList.joinInto(this.frameHeader, 2, 0, 8);
      bufferList.advance(8);
      var lengthPair = [
        this.frameHeader.readUInt32BE(2),
        this.frameHeader.readUInt32BE(2 + 4)
      ];
      if (lengthPair[0] !== 0) {
        this.protocolError = true;
        this.dropReason = "Unsupported 64-bit length frame received";
        return true;
      }
      this.length = lengthPair[1];
      this.parseState = WAITING_FOR_MASK_KEY;
    }
  }
  if (this.parseState === WAITING_FOR_MASK_KEY) {
    if (this.mask) {
      if (bufferList.length >= 4) {
        bufferList.joinInto(this.maskBytes, 0, 0, 4);
        bufferList.advance(4);
        this.parseState = WAITING_FOR_PAYLOAD;
      }
    } else {
      this.parseState = WAITING_FOR_PAYLOAD;
    }
  }
  if (this.parseState === WAITING_FOR_PAYLOAD) {
    if (this.length > this.maxReceivedFrameSize) {
      this.frameTooLarge = true;
      this.dropReason = "Frame size of " + this.length.toString(10) + " bytes exceeds maximum accepted frame size";
      return true;
    }
    if (this.length === 0) {
      this.binaryPayload = bufferAllocUnsafe$3(0);
      this.parseState = COMPLETE;
      return true;
    }
    if (bufferList.length >= this.length) {
      this.binaryPayload = bufferList.take(this.length);
      bufferList.advance(this.length);
      if (this.mask) {
        bufferUtil.unmask(this.binaryPayload, this.maskBytes);
      }
      if (this.opcode === 8) {
        if (this.length === 1) {
          this.binaryPayload = bufferAllocUnsafe$3(0);
          this.invalidCloseFrameLength = true;
        }
        if (this.length >= 2) {
          this.closeStatus = this.binaryPayload.readUInt16BE(0);
          this.binaryPayload = this.binaryPayload.slice(2);
        }
      }
      this.parseState = COMPLETE;
      return true;
    }
  }
  return false;
};
WebSocketFrame$1.prototype.throwAwayPayload = function(bufferList) {
  if (bufferList.length >= this.length) {
    bufferList.advance(this.length);
    this.parseState = COMPLETE;
    return true;
  }
  return false;
};
WebSocketFrame$1.prototype.toBuffer = function(nullMask) {
  var maskKey;
  var headerLength = 2;
  var data;
  var outputPos;
  var firstByte = 0;
  var secondByte = 0;
  if (this.fin) {
    firstByte |= 128;
  }
  if (this.rsv1) {
    firstByte |= 64;
  }
  if (this.rsv2) {
    firstByte |= 32;
  }
  if (this.rsv3) {
    firstByte |= 16;
  }
  if (this.mask) {
    secondByte |= 128;
  }
  firstByte |= this.opcode & 15;
  if (this.opcode === 8) {
    this.length = 2;
    if (this.binaryPayload) {
      this.length += this.binaryPayload.length;
    }
    data = bufferAllocUnsafe$3(this.length);
    data.writeUInt16BE(this.closeStatus, 0);
    if (this.length > 2) {
      this.binaryPayload.copy(data, 2);
    }
  } else if (this.binaryPayload) {
    data = this.binaryPayload;
    this.length = data.length;
  } else {
    this.length = 0;
  }
  if (this.length <= 125) {
    secondByte |= this.length & 127;
  } else if (this.length > 125 && this.length <= 65535) {
    secondByte |= 126;
    headerLength += 2;
  } else if (this.length > 65535) {
    secondByte |= 127;
    headerLength += 8;
  }
  var output = bufferAllocUnsafe$3(this.length + headerLength + (this.mask ? 4 : 0));
  output[0] = firstByte;
  output[1] = secondByte;
  outputPos = 2;
  if (this.length > 125 && this.length <= 65535) {
    output.writeUInt16BE(this.length, outputPos);
    outputPos += 2;
  } else if (this.length > 65535) {
    output.writeUInt32BE(0, outputPos);
    output.writeUInt32BE(this.length, outputPos + 4);
    outputPos += 8;
  }
  if (this.mask) {
    maskKey = nullMask ? 0 : Math.random() * 4294967295 >>> 0;
    this.maskBytes.writeUInt32BE(maskKey, 0);
    this.maskBytes.copy(output, outputPos);
    outputPos += 4;
    if (data) {
      bufferUtil.mask(data, this.maskBytes, output, outputPos, this.length);
    }
  } else if (data) {
    data.copy(output, outputPos);
  }
  return output;
};
WebSocketFrame$1.prototype.toString = function() {
  return "Opcode: " + this.opcode + ", fin: " + this.fin + ", length: " + this.length + ", hasPayload: " + Boolean(this.binaryPayload) + ", masked: " + this.mask;
};
var WebSocketFrame_1 = WebSocketFrame$1;
var FastBufferList = { exports: {} };
var Buffer$1 = require$$0$2.Buffer;
var EventEmitter$6 = require$$2.EventEmitter;
var bufferAllocUnsafe$2 = utils$3.bufferAllocUnsafe;
FastBufferList.exports = BufferList$1;
FastBufferList.exports.BufferList = BufferList$1;
function BufferList$1(opts) {
  if (!(this instanceof BufferList$1))
    return new BufferList$1(opts);
  EventEmitter$6.call(this);
  var self2 = this;
  if (typeof opts == "undefined")
    opts = {};
  self2.encoding = opts.encoding;
  var head = { next: null, buffer: null };
  var last = { next: null, buffer: null };
  var length = 0;
  self2.__defineGetter__("length", function() {
    return length;
  });
  var offset = 0;
  self2.write = function(buf) {
    if (!head.buffer) {
      head.buffer = buf;
      last = head;
    } else {
      last.next = { next: null, buffer: buf };
      last = last.next;
    }
    length += buf.length;
    self2.emit("write", buf);
    return true;
  };
  self2.end = function(buf) {
    if (Buffer$1.isBuffer(buf))
      self2.write(buf);
  };
  self2.push = function() {
    var args = [].concat.apply([], arguments);
    args.forEach(self2.write);
    return self2;
  };
  self2.forEach = function(fn) {
    if (!head.buffer)
      return bufferAllocUnsafe$2(0);
    if (head.buffer.length - offset <= 0)
      return self2;
    var firstBuf = head.buffer.slice(offset);
    var b = { buffer: firstBuf, next: head.next };
    while (b && b.buffer) {
      var r = fn(b.buffer);
      if (r)
        break;
      b = b.next;
    }
    return self2;
  };
  self2.join = function(start, end) {
    if (!head.buffer)
      return bufferAllocUnsafe$2(0);
    if (start == void 0)
      start = 0;
    if (end == void 0)
      end = self2.length;
    var big = bufferAllocUnsafe$2(end - start);
    var ix = 0;
    self2.forEach(function(buffer) {
      if (start < ix + buffer.length && ix < end) {
        buffer.copy(
          big,
          Math.max(0, ix - start),
          Math.max(0, start - ix),
          Math.min(buffer.length, end - ix)
        );
      }
      ix += buffer.length;
      if (ix > end)
        return true;
    });
    return big;
  };
  self2.joinInto = function(targetBuffer, targetStart, sourceStart, sourceEnd) {
    if (!head.buffer)
      return new bufferAllocUnsafe$2(0);
    if (sourceStart == void 0)
      sourceStart = 0;
    if (sourceEnd == void 0)
      sourceEnd = self2.length;
    var big = targetBuffer;
    if (big.length - targetStart < sourceEnd - sourceStart) {
      throw new Error("Insufficient space available in target Buffer.");
    }
    var ix = 0;
    self2.forEach(function(buffer) {
      if (sourceStart < ix + buffer.length && ix < sourceEnd) {
        buffer.copy(
          big,
          Math.max(targetStart, targetStart + ix - sourceStart),
          Math.max(0, sourceStart - ix),
          Math.min(buffer.length, sourceEnd - ix)
        );
      }
      ix += buffer.length;
      if (ix > sourceEnd)
        return true;
    });
    return big;
  };
  self2.advance = function(n) {
    offset += n;
    length -= n;
    while (head.buffer && offset >= head.buffer.length) {
      offset -= head.buffer.length;
      head = head.next ? head.next : { buffer: null, next: null };
    }
    if (head.buffer === null)
      last = { next: null, buffer: null };
    self2.emit("advance", n);
    return self2;
  };
  self2.take = function(n, encoding) {
    if (n == void 0)
      n = self2.length;
    else if (typeof n !== "number") {
      encoding = n;
      n = self2.length;
    }
    if (!encoding)
      encoding = self2.encoding;
    if (encoding) {
      var acc = "";
      self2.forEach(function(buffer) {
        if (n <= 0)
          return true;
        acc += buffer.toString(
          encoding,
          0,
          Math.min(n, buffer.length)
        );
        n -= buffer.length;
      });
      return acc;
    } else {
      return self2.join(0, n);
    }
  };
  self2.toString = function() {
    return self2.take("binary");
  };
}
require$$1$1.inherits(BufferList$1, EventEmitter$6);
var util$5 = require$$1$1;
var utils$2 = utils$3;
var EventEmitter$5 = require$$2.EventEmitter;
var WebSocketFrame = WebSocketFrame_1;
var BufferList = FastBufferList.exports;
var isValidUTF8 = require$$5;
var bufferAllocUnsafe$1 = utils$2.bufferAllocUnsafe;
var bufferFromString = utils$2.bufferFromString;
const STATE_OPEN = "open";
const STATE_PEER_REQUESTED_CLOSE = "peer_requested_close";
const STATE_ENDING = "ending";
const STATE_CLOSED = "closed";
var setImmediateImpl = "setImmediate" in commonjsGlobal ? commonjsGlobal.setImmediate.bind(commonjsGlobal) : process.nextTick.bind(process);
var idCounter = 0;
function WebSocketConnection$2(socket, extensions, protocol, maskOutgoingPackets, config2) {
  this._debug = utils$2.BufferingLogger("websocket:connection", ++idCounter);
  this._debug("constructor");
  if (this._debug.enabled) {
    instrumentSocketForDebugging(this, socket);
  }
  EventEmitter$5.call(this);
  this._pingListenerCount = 0;
  this.on("newListener", function(ev) {
    if (ev === "ping") {
      this._pingListenerCount++;
    }
  }).on("removeListener", function(ev) {
    if (ev === "ping") {
      this._pingListenerCount--;
    }
  });
  this.config = config2;
  this.socket = socket;
  this.protocol = protocol;
  this.extensions = extensions;
  this.remoteAddress = socket.remoteAddress;
  this.closeReasonCode = -1;
  this.closeDescription = null;
  this.closeEventEmitted = false;
  this.maskOutgoingPackets = maskOutgoingPackets;
  this.maskBytes = bufferAllocUnsafe$1(4);
  this.frameHeader = bufferAllocUnsafe$1(10);
  this.bufferList = new BufferList();
  this.currentFrame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
  this.fragmentationSize = 0;
  this.frameQueue = [];
  this.connected = true;
  this.state = STATE_OPEN;
  this.waitingForCloseResponse = false;
  this.receivedEnd = false;
  this.closeTimeout = this.config.closeTimeout;
  this.assembleFragments = this.config.assembleFragments;
  this.maxReceivedMessageSize = this.config.maxReceivedMessageSize;
  this.outputBufferFull = false;
  this.inputPaused = false;
  this.receivedDataHandler = this.processReceivedData.bind(this);
  this._closeTimerHandler = this.handleCloseTimer.bind(this);
  this.socket.setNoDelay(this.config.disableNagleAlgorithm);
  this.socket.setTimeout(0);
  if (this.config.keepalive && !this.config.useNativeKeepalive) {
    if (typeof this.config.keepaliveInterval !== "number") {
      throw new Error("keepaliveInterval must be specified and numeric if keepalive is true.");
    }
    this._keepaliveTimerHandler = this.handleKeepaliveTimer.bind(this);
    this.setKeepaliveTimer();
    if (this.config.dropConnectionOnKeepaliveTimeout) {
      if (typeof this.config.keepaliveGracePeriod !== "number") {
        throw new Error("keepaliveGracePeriod  must be specified and numeric if dropConnectionOnKeepaliveTimeout is true.");
      }
      this._gracePeriodTimerHandler = this.handleGracePeriodTimer.bind(this);
    }
  } else if (this.config.keepalive && this.config.useNativeKeepalive) {
    if (!("setKeepAlive" in this.socket)) {
      throw new Error("Unable to use native keepalive: unsupported by this version of Node.");
    }
    this.socket.setKeepAlive(true, this.config.keepaliveInterval);
  }
  this.socket.removeAllListeners("error");
}
WebSocketConnection$2.CLOSE_REASON_NORMAL = 1e3;
WebSocketConnection$2.CLOSE_REASON_GOING_AWAY = 1001;
WebSocketConnection$2.CLOSE_REASON_PROTOCOL_ERROR = 1002;
WebSocketConnection$2.CLOSE_REASON_UNPROCESSABLE_INPUT = 1003;
WebSocketConnection$2.CLOSE_REASON_RESERVED = 1004;
WebSocketConnection$2.CLOSE_REASON_NOT_PROVIDED = 1005;
WebSocketConnection$2.CLOSE_REASON_ABNORMAL = 1006;
WebSocketConnection$2.CLOSE_REASON_INVALID_DATA = 1007;
WebSocketConnection$2.CLOSE_REASON_POLICY_VIOLATION = 1008;
WebSocketConnection$2.CLOSE_REASON_MESSAGE_TOO_BIG = 1009;
WebSocketConnection$2.CLOSE_REASON_EXTENSION_REQUIRED = 1010;
WebSocketConnection$2.CLOSE_REASON_INTERNAL_SERVER_ERROR = 1011;
WebSocketConnection$2.CLOSE_REASON_TLS_HANDSHAKE_FAILED = 1015;
WebSocketConnection$2.CLOSE_DESCRIPTIONS = {
  1e3: "Normal connection closure",
  1001: "Remote peer is going away",
  1002: "Protocol error",
  1003: "Unprocessable input",
  1004: "Reserved",
  1005: "Reason not provided",
  1006: "Abnormal closure, no further detail available",
  1007: "Invalid data received",
  1008: "Policy violation",
  1009: "Message too big",
  1010: "Extension requested by client is required",
  1011: "Internal Server Error",
  1015: "TLS Handshake Failed"
};
function validateCloseReason(code) {
  if (code < 1e3) {
    return false;
  }
  if (code >= 1e3 && code <= 2999) {
    return [1e3, 1001, 1002, 1003, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015].indexOf(code) !== -1;
  }
  if (code >= 3e3 && code <= 3999) {
    return true;
  }
  if (code >= 4e3 && code <= 4999) {
    return true;
  }
  if (code >= 5e3) {
    return false;
  }
}
util$5.inherits(WebSocketConnection$2, EventEmitter$5);
WebSocketConnection$2.prototype._addSocketEventListeners = function() {
  this.socket.on("error", this.handleSocketError.bind(this));
  this.socket.on("end", this.handleSocketEnd.bind(this));
  this.socket.on("close", this.handleSocketClose.bind(this));
  this.socket.on("drain", this.handleSocketDrain.bind(this));
  this.socket.on("pause", this.handleSocketPause.bind(this));
  this.socket.on("resume", this.handleSocketResume.bind(this));
  this.socket.on("data", this.handleSocketData.bind(this));
};
WebSocketConnection$2.prototype.setKeepaliveTimer = function() {
  this._debug("setKeepaliveTimer");
  if (!this.config.keepalive || this.config.useNativeKeepalive) {
    return;
  }
  this.clearKeepaliveTimer();
  this.clearGracePeriodTimer();
  this._keepaliveTimeoutID = setTimeout(this._keepaliveTimerHandler, this.config.keepaliveInterval);
};
WebSocketConnection$2.prototype.clearKeepaliveTimer = function() {
  if (this._keepaliveTimeoutID) {
    clearTimeout(this._keepaliveTimeoutID);
  }
};
WebSocketConnection$2.prototype.handleKeepaliveTimer = function() {
  this._debug("handleKeepaliveTimer");
  this._keepaliveTimeoutID = null;
  this.ping();
  if (this.config.dropConnectionOnKeepaliveTimeout) {
    this.setGracePeriodTimer();
  } else {
    this.setKeepaliveTimer();
  }
};
WebSocketConnection$2.prototype.setGracePeriodTimer = function() {
  this._debug("setGracePeriodTimer");
  this.clearGracePeriodTimer();
  this._gracePeriodTimeoutID = setTimeout(this._gracePeriodTimerHandler, this.config.keepaliveGracePeriod);
};
WebSocketConnection$2.prototype.clearGracePeriodTimer = function() {
  if (this._gracePeriodTimeoutID) {
    clearTimeout(this._gracePeriodTimeoutID);
  }
};
WebSocketConnection$2.prototype.handleGracePeriodTimer = function() {
  this._debug("handleGracePeriodTimer");
  this._gracePeriodTimeoutID = null;
  this.drop(WebSocketConnection$2.CLOSE_REASON_ABNORMAL, "Peer not responding.", true);
};
WebSocketConnection$2.prototype.handleSocketData = function(data) {
  this._debug("handleSocketData");
  this.setKeepaliveTimer();
  this.bufferList.write(data);
  this.processReceivedData();
};
WebSocketConnection$2.prototype.processReceivedData = function() {
  this._debug("processReceivedData");
  if (!this.connected) {
    return;
  }
  if (this.inputPaused) {
    return;
  }
  var frame = this.currentFrame;
  if (!frame.addData(this.bufferList)) {
    this._debug("-- insufficient data for frame");
    return;
  }
  var self2 = this;
  if (frame.protocolError) {
    this._debug("-- protocol error");
    process.nextTick(function() {
      self2.drop(WebSocketConnection$2.CLOSE_REASON_PROTOCOL_ERROR, frame.dropReason);
    });
    return;
  } else if (frame.frameTooLarge) {
    this._debug("-- frame too large");
    process.nextTick(function() {
      self2.drop(WebSocketConnection$2.CLOSE_REASON_MESSAGE_TOO_BIG, frame.dropReason);
    });
    return;
  }
  if (frame.rsv1 || frame.rsv2 || frame.rsv3) {
    this._debug("-- illegal rsv flag");
    process.nextTick(function() {
      self2.drop(
        WebSocketConnection$2.CLOSE_REASON_PROTOCOL_ERROR,
        "Unsupported usage of rsv bits without negotiated extension."
      );
    });
    return;
  }
  if (!this.assembleFragments) {
    this._debug("-- emitting frame");
    process.nextTick(function() {
      self2.emit("frame", frame);
    });
  }
  process.nextTick(function() {
    self2.processFrame(frame);
  });
  this.currentFrame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
  if (this.bufferList.length > 0) {
    setImmediateImpl(this.receivedDataHandler);
  }
};
WebSocketConnection$2.prototype.handleSocketError = function(error) {
  this._debug("handleSocketError: %j", error);
  if (this.state === STATE_CLOSED) {
    this._debug("  --- Socket 'error' after 'close'");
    return;
  }
  this.closeReasonCode = WebSocketConnection$2.CLOSE_REASON_ABNORMAL;
  this.closeDescription = "Socket Error: " + error.syscall + " " + error.code;
  this.connected = false;
  this.state = STATE_CLOSED;
  this.fragmentationSize = 0;
  if (utils$2.eventEmitterListenerCount(this, "error") > 0) {
    this.emit("error", error);
  }
  this.socket.destroy();
  this._debug.printOutput();
};
WebSocketConnection$2.prototype.handleSocketEnd = function() {
  this._debug("handleSocketEnd: received socket end.  state = %s", this.state);
  this.receivedEnd = true;
  if (this.state === STATE_CLOSED) {
    this._debug("  --- Socket 'end' after 'close'");
    return;
  }
  if (this.state !== STATE_PEER_REQUESTED_CLOSE && this.state !== STATE_ENDING) {
    this._debug("  --- UNEXPECTED socket end.");
    this.socket.end();
  }
};
WebSocketConnection$2.prototype.handleSocketClose = function(hadError) {
  this._debug("handleSocketClose: received socket close");
  this.socketHadError = hadError;
  this.connected = false;
  this.state = STATE_CLOSED;
  if (this.closeReasonCode === -1) {
    this.closeReasonCode = WebSocketConnection$2.CLOSE_REASON_ABNORMAL;
    this.closeDescription = "Connection dropped by remote peer.";
  }
  this.clearCloseTimer();
  this.clearKeepaliveTimer();
  this.clearGracePeriodTimer();
  if (!this.closeEventEmitted) {
    this.closeEventEmitted = true;
    this._debug("-- Emitting WebSocketConnection close event");
    this.emit("close", this.closeReasonCode, this.closeDescription);
  }
};
WebSocketConnection$2.prototype.handleSocketDrain = function() {
  this._debug("handleSocketDrain: socket drain event");
  this.outputBufferFull = false;
  this.emit("drain");
};
WebSocketConnection$2.prototype.handleSocketPause = function() {
  this._debug("handleSocketPause: socket pause event");
  this.inputPaused = true;
  this.emit("pause");
};
WebSocketConnection$2.prototype.handleSocketResume = function() {
  this._debug("handleSocketResume: socket resume event");
  this.inputPaused = false;
  this.emit("resume");
  this.processReceivedData();
};
WebSocketConnection$2.prototype.pause = function() {
  this._debug("pause: pause requested");
  this.socket.pause();
};
WebSocketConnection$2.prototype.resume = function() {
  this._debug("resume: resume requested");
  this.socket.resume();
};
WebSocketConnection$2.prototype.close = function(reasonCode, description2) {
  if (this.connected) {
    this._debug("close: Initating clean WebSocket close sequence.");
    if ("number" !== typeof reasonCode) {
      reasonCode = WebSocketConnection$2.CLOSE_REASON_NORMAL;
    }
    if (!validateCloseReason(reasonCode)) {
      throw new Error("Close code " + reasonCode + " is not valid.");
    }
    if ("string" !== typeof description2) {
      description2 = WebSocketConnection$2.CLOSE_DESCRIPTIONS[reasonCode];
    }
    this.closeReasonCode = reasonCode;
    this.closeDescription = description2;
    this.setCloseTimer();
    this.sendCloseFrame(this.closeReasonCode, this.closeDescription);
    this.state = STATE_ENDING;
    this.connected = false;
  }
};
WebSocketConnection$2.prototype.drop = function(reasonCode, description2, skipCloseFrame) {
  this._debug("drop");
  if (typeof reasonCode !== "number") {
    reasonCode = WebSocketConnection$2.CLOSE_REASON_PROTOCOL_ERROR;
  }
  if (typeof description2 !== "string") {
    description2 = WebSocketConnection$2.CLOSE_DESCRIPTIONS[reasonCode];
  }
  this._debug(
    "Forcefully dropping connection. skipCloseFrame: %s, code: %d, description: %s",
    skipCloseFrame,
    reasonCode,
    description2
  );
  this.closeReasonCode = reasonCode;
  this.closeDescription = description2;
  this.frameQueue = [];
  this.fragmentationSize = 0;
  if (!skipCloseFrame) {
    this.sendCloseFrame(reasonCode, description2);
  }
  this.connected = false;
  this.state = STATE_CLOSED;
  this.clearCloseTimer();
  this.clearKeepaliveTimer();
  this.clearGracePeriodTimer();
  if (!this.closeEventEmitted) {
    this.closeEventEmitted = true;
    this._debug("Emitting WebSocketConnection close event");
    this.emit("close", this.closeReasonCode, this.closeDescription);
  }
  this._debug("Drop: destroying socket");
  this.socket.destroy();
};
WebSocketConnection$2.prototype.setCloseTimer = function() {
  this._debug("setCloseTimer");
  this.clearCloseTimer();
  this._debug("Setting close timer");
  this.waitingForCloseResponse = true;
  this.closeTimer = setTimeout(this._closeTimerHandler, this.closeTimeout);
};
WebSocketConnection$2.prototype.clearCloseTimer = function() {
  this._debug("clearCloseTimer");
  if (this.closeTimer) {
    this._debug("Clearing close timer");
    clearTimeout(this.closeTimer);
    this.waitingForCloseResponse = false;
    this.closeTimer = null;
  }
};
WebSocketConnection$2.prototype.handleCloseTimer = function() {
  this._debug("handleCloseTimer");
  this.closeTimer = null;
  if (this.waitingForCloseResponse) {
    this._debug("Close response not received from client.  Forcing socket end.");
    this.waitingForCloseResponse = false;
    this.state = STATE_CLOSED;
    this.socket.end();
  }
};
WebSocketConnection$2.prototype.processFrame = function(frame) {
  this._debug("processFrame");
  this._debug(" -- frame: %s", frame);
  if (this.frameQueue.length !== 0 && (frame.opcode > 0 && frame.opcode < 8)) {
    this.drop(
      WebSocketConnection$2.CLOSE_REASON_PROTOCOL_ERROR,
      "Illegal frame opcode 0x" + frame.opcode.toString(16) + " received in middle of fragmented message."
    );
    return;
  }
  switch (frame.opcode) {
    case 2:
      this._debug("-- Binary Frame");
      if (this.assembleFragments) {
        if (frame.fin) {
          this._debug("---- Emitting 'message' event");
          this.emit("message", {
            type: "binary",
            binaryData: frame.binaryPayload
          });
        } else {
          this.frameQueue.push(frame);
          this.fragmentationSize = frame.length;
        }
      }
      break;
    case 1:
      this._debug("-- Text Frame");
      if (this.assembleFragments) {
        if (frame.fin) {
          if (!isValidUTF8(frame.binaryPayload)) {
            this.drop(
              WebSocketConnection$2.CLOSE_REASON_INVALID_DATA,
              "Invalid UTF-8 Data Received"
            );
            return;
          }
          this._debug("---- Emitting 'message' event");
          this.emit("message", {
            type: "utf8",
            utf8Data: frame.binaryPayload.toString("utf8")
          });
        } else {
          this.frameQueue.push(frame);
          this.fragmentationSize = frame.length;
        }
      }
      break;
    case 0:
      this._debug("-- Continuation Frame");
      if (this.assembleFragments) {
        if (this.frameQueue.length === 0) {
          this.drop(
            WebSocketConnection$2.CLOSE_REASON_PROTOCOL_ERROR,
            "Unexpected Continuation Frame"
          );
          return;
        }
        this.fragmentationSize += frame.length;
        if (this.fragmentationSize > this.maxReceivedMessageSize) {
          this.drop(
            WebSocketConnection$2.CLOSE_REASON_MESSAGE_TOO_BIG,
            "Maximum message size exceeded."
          );
          return;
        }
        this.frameQueue.push(frame);
        if (frame.fin) {
          var bytesCopied = 0;
          var binaryPayload = bufferAllocUnsafe$1(this.fragmentationSize);
          var opcode = this.frameQueue[0].opcode;
          this.frameQueue.forEach(function(currentFrame) {
            currentFrame.binaryPayload.copy(binaryPayload, bytesCopied);
            bytesCopied += currentFrame.binaryPayload.length;
          });
          this.frameQueue = [];
          this.fragmentationSize = 0;
          switch (opcode) {
            case 2:
              this.emit("message", {
                type: "binary",
                binaryData: binaryPayload
              });
              break;
            case 1:
              if (!isValidUTF8(binaryPayload)) {
                this.drop(
                  WebSocketConnection$2.CLOSE_REASON_INVALID_DATA,
                  "Invalid UTF-8 Data Received"
                );
                return;
              }
              this.emit("message", {
                type: "utf8",
                utf8Data: binaryPayload.toString("utf8")
              });
              break;
            default:
              this.drop(
                WebSocketConnection$2.CLOSE_REASON_PROTOCOL_ERROR,
                "Unexpected first opcode in fragmentation sequence: 0x" + opcode.toString(16)
              );
              return;
          }
        }
      }
      break;
    case 9:
      this._debug("-- Ping Frame");
      if (this._pingListenerCount > 0) {
        var cancelled = false;
        var cancel = function() {
          cancelled = true;
        };
        this.emit("ping", cancel, frame.binaryPayload);
        if (!cancelled) {
          this.pong(frame.binaryPayload);
        }
      } else {
        this.pong(frame.binaryPayload);
      }
      break;
    case 10:
      this._debug("-- Pong Frame");
      this.emit("pong", frame.binaryPayload);
      break;
    case 8:
      this._debug("-- Close Frame");
      if (this.waitingForCloseResponse) {
        this._debug("---- Got close response from peer.  Completing closing handshake.");
        this.clearCloseTimer();
        this.waitingForCloseResponse = false;
        this.state = STATE_CLOSED;
        this.socket.end();
        return;
      }
      this._debug("---- Closing handshake initiated by peer.");
      this.state = STATE_PEER_REQUESTED_CLOSE;
      var respondCloseReasonCode;
      if (frame.invalidCloseFrameLength) {
        this.closeReasonCode = 1005;
        respondCloseReasonCode = WebSocketConnection$2.CLOSE_REASON_PROTOCOL_ERROR;
      } else if (frame.closeStatus === -1 || validateCloseReason(frame.closeStatus)) {
        this.closeReasonCode = frame.closeStatus;
        respondCloseReasonCode = WebSocketConnection$2.CLOSE_REASON_NORMAL;
      } else {
        this.closeReasonCode = frame.closeStatus;
        respondCloseReasonCode = WebSocketConnection$2.CLOSE_REASON_PROTOCOL_ERROR;
      }
      if (frame.binaryPayload.length > 1) {
        if (!isValidUTF8(frame.binaryPayload)) {
          this.drop(
            WebSocketConnection$2.CLOSE_REASON_INVALID_DATA,
            "Invalid UTF-8 Data Received"
          );
          return;
        }
        this.closeDescription = frame.binaryPayload.toString("utf8");
      } else {
        this.closeDescription = WebSocketConnection$2.CLOSE_DESCRIPTIONS[this.closeReasonCode];
      }
      this._debug(
        "------ Remote peer %s - code: %d - %s - close frame payload length: %d",
        this.remoteAddress,
        this.closeReasonCode,
        this.closeDescription,
        frame.length
      );
      this._debug("------ responding to remote peer's close request.");
      this.sendCloseFrame(respondCloseReasonCode, null);
      this.connected = false;
      break;
    default:
      this._debug("-- Unrecognized Opcode %d", frame.opcode);
      this.drop(
        WebSocketConnection$2.CLOSE_REASON_PROTOCOL_ERROR,
        "Unrecognized Opcode: 0x" + frame.opcode.toString(16)
      );
      break;
  }
};
WebSocketConnection$2.prototype.send = function(data, cb) {
  this._debug("send");
  if (Buffer.isBuffer(data)) {
    this.sendBytes(data, cb);
  } else if (typeof data["toString"] === "function") {
    this.sendUTF(data, cb);
  } else {
    throw new Error("Data provided must either be a Node Buffer or implement toString()");
  }
};
WebSocketConnection$2.prototype.sendUTF = function(data, cb) {
  data = bufferFromString(data.toString(), "utf8");
  this._debug("sendUTF: %d bytes", data.length);
  var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
  frame.opcode = 1;
  frame.binaryPayload = data;
  this.fragmentAndSend(frame, cb);
};
WebSocketConnection$2.prototype.sendBytes = function(data, cb) {
  this._debug("sendBytes");
  if (!Buffer.isBuffer(data)) {
    throw new Error("You must pass a Node Buffer object to WebSocketConnection.prototype.sendBytes()");
  }
  var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
  frame.opcode = 2;
  frame.binaryPayload = data;
  this.fragmentAndSend(frame, cb);
};
WebSocketConnection$2.prototype.ping = function(data) {
  this._debug("ping");
  var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
  frame.opcode = 9;
  frame.fin = true;
  if (data) {
    if (!Buffer.isBuffer(data)) {
      data = bufferFromString(data.toString(), "utf8");
    }
    if (data.length > 125) {
      this._debug("WebSocket: Data for ping is longer than 125 bytes.  Truncating.");
      data = data.slice(0, 124);
    }
    frame.binaryPayload = data;
  }
  this.sendFrame(frame);
};
WebSocketConnection$2.prototype.pong = function(binaryPayload) {
  this._debug("pong");
  var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
  frame.opcode = 10;
  if (Buffer.isBuffer(binaryPayload) && binaryPayload.length > 125) {
    this._debug("WebSocket: Data for pong is longer than 125 bytes.  Truncating.");
    binaryPayload = binaryPayload.slice(0, 124);
  }
  frame.binaryPayload = binaryPayload;
  frame.fin = true;
  this.sendFrame(frame);
};
WebSocketConnection$2.prototype.fragmentAndSend = function(frame, cb) {
  this._debug("fragmentAndSend");
  if (frame.opcode > 7) {
    throw new Error("You cannot fragment control frames.");
  }
  var threshold = this.config.fragmentationThreshold;
  var length = frame.binaryPayload.length;
  if (!this.config.fragmentOutgoingMessages || frame.binaryPayload && length <= threshold) {
    frame.fin = true;
    this.sendFrame(frame, cb);
    return;
  }
  var numFragments = Math.ceil(length / threshold);
  var sentFragments = 0;
  var sentCallback = function fragmentSentCallback(err) {
    if (err) {
      if (typeof cb === "function") {
        cb(err);
        cb = null;
      }
      return;
    }
    ++sentFragments;
    if (sentFragments === numFragments && typeof cb === "function") {
      cb();
    }
  };
  for (var i = 1; i <= numFragments; i++) {
    var currentFrame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
    currentFrame.opcode = i === 1 ? frame.opcode : 0;
    currentFrame.fin = i === numFragments;
    var currentLength = i === numFragments ? length - threshold * (i - 1) : threshold;
    var sliceStart = threshold * (i - 1);
    currentFrame.binaryPayload = frame.binaryPayload.slice(sliceStart, sliceStart + currentLength);
    this.sendFrame(currentFrame, sentCallback);
  }
};
WebSocketConnection$2.prototype.sendCloseFrame = function(reasonCode, description2, cb) {
  if (typeof reasonCode !== "number") {
    reasonCode = WebSocketConnection$2.CLOSE_REASON_NORMAL;
  }
  this._debug("sendCloseFrame state: %s, reasonCode: %d, description: %s", this.state, reasonCode, description2);
  if (this.state !== STATE_OPEN && this.state !== STATE_PEER_REQUESTED_CLOSE) {
    return;
  }
  var frame = new WebSocketFrame(this.maskBytes, this.frameHeader, this.config);
  frame.fin = true;
  frame.opcode = 8;
  frame.closeStatus = reasonCode;
  if (typeof description2 === "string") {
    frame.binaryPayload = bufferFromString(description2, "utf8");
  }
  this.sendFrame(frame, cb);
  this.socket.end();
};
WebSocketConnection$2.prototype.sendFrame = function(frame, cb) {
  this._debug("sendFrame");
  frame.mask = this.maskOutgoingPackets;
  var flushed = this.socket.write(frame.toBuffer(), cb);
  this.outputBufferFull = !flushed;
  return flushed;
};
var WebSocketConnection_1 = WebSocketConnection$2;
function instrumentSocketForDebugging(connection, socket) {
  if (!connection._debug.enabled) {
    return;
  }
  var originalSocketEmit = socket.emit;
  socket.emit = function(event) {
    connection._debug("||| Socket Event  '%s'", event);
    originalSocketEmit.apply(this, arguments);
  };
  for (var key in socket) {
    if ("function" !== typeof socket[key]) {
      continue;
    }
    if (["emit"].indexOf(key) !== -1) {
      continue;
    }
    (function(key2) {
      var original = socket[key2];
      if (key2 === "on") {
        socket[key2] = function proxyMethod__EventEmitter__On() {
          connection._debug("||| Socket method called:  %s (%s)", key2, arguments[0]);
          return original.apply(this, arguments);
        };
        return;
      }
      socket[key2] = function proxyMethod() {
        connection._debug("||| Socket method called:  %s", key2);
        return original.apply(this, arguments);
      };
    })(key);
  }
}
var crypto$1 = require$$0$3;
var util$4 = require$$1$1;
var url$1 = require$$2$1;
var EventEmitter$4 = require$$2.EventEmitter;
var WebSocketConnection$1 = WebSocketConnection_1;
var headerValueSplitRegExp = /,\s*/;
var headerParamSplitRegExp = /;\s*/;
var headerSanitizeRegExp = /[\r\n]/g;
var xForwardedForSeparatorRegExp = /,\s*/;
var separators = [
  "(",
  ")",
  "<",
  ">",
  "@",
  ",",
  ";",
  ":",
  "\\",
  '"',
  "/",
  "[",
  "]",
  "?",
  "=",
  "{",
  "}",
  " ",
  String.fromCharCode(9)
];
var cookieNameValidateRegEx = /([\x00-\x20\x22\x28\x29\x2c\x2f\x3a-\x3f\x40\x5b-\x5e\x7b\x7d\x7f])/;
var cookieValueValidateRegEx = /[^\x21\x23-\x2b\x2d-\x3a\x3c-\x5b\x5d-\x7e]/;
var cookieValueDQuoteValidateRegEx = /^"[^"]*"$/;
var controlCharsAndSemicolonRegEx = /[\x00-\x20\x3b]/g;
var cookieSeparatorRegEx = /[;,] */;
var httpStatusDescriptions = {
  100: "Continue",
  101: "Switching Protocols",
  200: "OK",
  201: "Created",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  406: "Not Acceptable",
  407: "Proxy Authorization Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Request Entity Too Long",
  414: "Request-URI Too Long",
  415: "Unsupported Media Type",
  416: "Requested Range Not Satisfiable",
  417: "Expectation Failed",
  426: "Upgrade Required",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported"
};
function WebSocketRequest$1(socket, httpRequest, serverConfig) {
  EventEmitter$4.call(this);
  this.socket = socket;
  this.httpRequest = httpRequest;
  this.resource = httpRequest.url;
  this.remoteAddress = socket.remoteAddress;
  this.remoteAddresses = [this.remoteAddress];
  this.serverConfig = serverConfig;
  this._socketIsClosing = false;
  this._socketCloseHandler = this._handleSocketCloseBeforeAccept.bind(this);
  this.socket.on("end", this._socketCloseHandler);
  this.socket.on("close", this._socketCloseHandler);
  this._resolved = false;
}
util$4.inherits(WebSocketRequest$1, EventEmitter$4);
WebSocketRequest$1.prototype.readHandshake = function() {
  var self2 = this;
  var request = this.httpRequest;
  this.resourceURL = url$1.parse(this.resource, true);
  this.host = request.headers["host"];
  if (!this.host) {
    throw new Error("Client must provide a Host header.");
  }
  this.key = request.headers["sec-websocket-key"];
  if (!this.key) {
    throw new Error("Client must provide a value for Sec-WebSocket-Key.");
  }
  this.webSocketVersion = parseInt(request.headers["sec-websocket-version"], 10);
  if (!this.webSocketVersion || isNaN(this.webSocketVersion)) {
    throw new Error("Client must provide a value for Sec-WebSocket-Version.");
  }
  switch (this.webSocketVersion) {
    case 8:
    case 13:
      break;
    default:
      var e = new Error("Unsupported websocket client version: " + this.webSocketVersion + "Only versions 8 and 13 are supported.");
      e.httpCode = 426;
      e.headers = {
        "Sec-WebSocket-Version": "13"
      };
      throw e;
  }
  if (this.webSocketVersion === 13) {
    this.origin = request.headers["origin"];
  } else if (this.webSocketVersion === 8) {
    this.origin = request.headers["sec-websocket-origin"];
  }
  var protocolString = request.headers["sec-websocket-protocol"];
  this.protocolFullCaseMap = {};
  this.requestedProtocols = [];
  if (protocolString) {
    var requestedProtocolsFullCase = protocolString.split(headerValueSplitRegExp);
    requestedProtocolsFullCase.forEach(function(protocol) {
      var lcProtocol = protocol.toLocaleLowerCase();
      self2.requestedProtocols.push(lcProtocol);
      self2.protocolFullCaseMap[lcProtocol] = protocol;
    });
  }
  if (!this.serverConfig.ignoreXForwardedFor && request.headers["x-forwarded-for"]) {
    var immediatePeerIP = this.remoteAddress;
    this.remoteAddresses = request.headers["x-forwarded-for"].split(xForwardedForSeparatorRegExp);
    this.remoteAddresses.push(immediatePeerIP);
    this.remoteAddress = this.remoteAddresses[0];
  }
  if (this.serverConfig.parseExtensions) {
    var extensionsString = request.headers["sec-websocket-extensions"];
    this.requestedExtensions = this.parseExtensions(extensionsString);
  } else {
    this.requestedExtensions = [];
  }
  if (this.serverConfig.parseCookies) {
    var cookieString = request.headers["cookie"];
    this.cookies = this.parseCookies(cookieString);
  } else {
    this.cookies = [];
  }
};
WebSocketRequest$1.prototype.parseExtensions = function(extensionsString) {
  if (!extensionsString || extensionsString.length === 0) {
    return [];
  }
  var extensions = extensionsString.toLocaleLowerCase().split(headerValueSplitRegExp);
  extensions.forEach(function(extension, index, array) {
    var params = extension.split(headerParamSplitRegExp);
    var extensionName = params[0];
    var extensionParams = params.slice(1);
    extensionParams.forEach(function(rawParam, index2, array2) {
      var arr = rawParam.split("=");
      var obj2 = {
        name: arr[0],
        value: arr[1]
      };
      array2.splice(index2, 1, obj2);
    });
    var obj = {
      name: extensionName,
      params: extensionParams
    };
    array.splice(index, 1, obj);
  });
  return extensions;
};
WebSocketRequest$1.prototype.parseCookies = function(str) {
  if (!str || typeof str !== "string") {
    return [];
  }
  var cookies = [];
  var pairs = str.split(cookieSeparatorRegEx);
  pairs.forEach(function(pair) {
    var eq_idx = pair.indexOf("=");
    if (eq_idx === -1) {
      cookies.push({
        name: pair,
        value: null
      });
      return;
    }
    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();
    if ('"' === val[0]) {
      val = val.slice(1, -1);
    }
    cookies.push({
      name: key,
      value: decodeURIComponent(val)
    });
  });
  return cookies;
};
WebSocketRequest$1.prototype.accept = function(acceptedProtocol, allowedOrigin, cookies) {
  this._verifyResolution();
  var protocolFullCase;
  if (acceptedProtocol) {
    protocolFullCase = this.protocolFullCaseMap[acceptedProtocol.toLocaleLowerCase()];
    if (typeof protocolFullCase === "undefined") {
      protocolFullCase = acceptedProtocol;
    }
  } else {
    protocolFullCase = acceptedProtocol;
  }
  this.protocolFullCaseMap = null;
  var sha1 = crypto$1.createHash("sha1");
  sha1.update(this.key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
  var acceptKey = sha1.digest("base64");
  var response = "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: " + acceptKey + "\r\n";
  if (protocolFullCase) {
    for (var i = 0; i < protocolFullCase.length; i++) {
      var charCode = protocolFullCase.charCodeAt(i);
      var character = protocolFullCase.charAt(i);
      if (charCode < 33 || charCode > 126 || separators.indexOf(character) !== -1) {
        this.reject(500);
        throw new Error('Illegal character "' + String.fromCharCode(character) + '" in subprotocol.');
      }
    }
    if (this.requestedProtocols.indexOf(acceptedProtocol) === -1) {
      this.reject(500);
      throw new Error("Specified protocol was not requested by the client.");
    }
    protocolFullCase = protocolFullCase.replace(headerSanitizeRegExp, "");
    response += "Sec-WebSocket-Protocol: " + protocolFullCase + "\r\n";
  }
  this.requestedProtocols = null;
  if (allowedOrigin) {
    allowedOrigin = allowedOrigin.replace(headerSanitizeRegExp, "");
    if (this.webSocketVersion === 13) {
      response += "Origin: " + allowedOrigin + "\r\n";
    } else if (this.webSocketVersion === 8) {
      response += "Sec-WebSocket-Origin: " + allowedOrigin + "\r\n";
    }
  }
  if (cookies) {
    if (!Array.isArray(cookies)) {
      this.reject(500);
      throw new Error('Value supplied for "cookies" argument must be an array.');
    }
    var seenCookies = {};
    cookies.forEach(function(cookie) {
      if (!cookie.name || !cookie.value) {
        this.reject(500);
        throw new Error('Each cookie to set must at least provide a "name" and "value"');
      }
      cookie.name = cookie.name.replace(controlCharsAndSemicolonRegEx, "");
      cookie.value = cookie.value.replace(controlCharsAndSemicolonRegEx, "");
      if (seenCookies[cookie.name]) {
        this.reject(500);
        throw new Error("You may not specify the same cookie name twice.");
      }
      seenCookies[cookie.name] = true;
      var invalidChar = cookie.name.match(cookieNameValidateRegEx);
      if (invalidChar) {
        this.reject(500);
        throw new Error("Illegal character " + invalidChar[0] + " in cookie name");
      }
      if (cookie.value.match(cookieValueDQuoteValidateRegEx)) {
        invalidChar = cookie.value.slice(1, -1).match(cookieValueValidateRegEx);
      } else {
        invalidChar = cookie.value.match(cookieValueValidateRegEx);
      }
      if (invalidChar) {
        this.reject(500);
        throw new Error("Illegal character " + invalidChar[0] + " in cookie value");
      }
      var cookieParts = [cookie.name + "=" + cookie.value];
      if (cookie.path) {
        invalidChar = cookie.path.match(controlCharsAndSemicolonRegEx);
        if (invalidChar) {
          this.reject(500);
          throw new Error("Illegal character " + invalidChar[0] + " in cookie path");
        }
        cookieParts.push("Path=" + cookie.path);
      }
      if (cookie.domain) {
        if (typeof cookie.domain !== "string") {
          this.reject(500);
          throw new Error("Domain must be specified and must be a string.");
        }
        invalidChar = cookie.domain.match(controlCharsAndSemicolonRegEx);
        if (invalidChar) {
          this.reject(500);
          throw new Error("Illegal character " + invalidChar[0] + " in cookie domain");
        }
        cookieParts.push("Domain=" + cookie.domain.toLowerCase());
      }
      if (cookie.expires) {
        if (!(cookie.expires instanceof Date)) {
          this.reject(500);
          throw new Error('Value supplied for cookie "expires" must be a vaild date object');
        }
        cookieParts.push("Expires=" + cookie.expires.toGMTString());
      }
      if (cookie.maxage) {
        var maxage = cookie.maxage;
        if (typeof maxage === "string") {
          maxage = parseInt(maxage, 10);
        }
        if (isNaN(maxage) || maxage <= 0) {
          this.reject(500);
          throw new Error('Value supplied for cookie "maxage" must be a non-zero number');
        }
        maxage = Math.round(maxage);
        cookieParts.push("Max-Age=" + maxage.toString(10));
      }
      if (cookie.secure) {
        if (typeof cookie.secure !== "boolean") {
          this.reject(500);
          throw new Error('Value supplied for cookie "secure" must be of type boolean');
        }
        cookieParts.push("Secure");
      }
      if (cookie.httponly) {
        if (typeof cookie.httponly !== "boolean") {
          this.reject(500);
          throw new Error('Value supplied for cookie "httponly" must be of type boolean');
        }
        cookieParts.push("HttpOnly");
      }
      response += "Set-Cookie: " + cookieParts.join(";") + "\r\n";
    }.bind(this));
  }
  this._resolved = true;
  this.emit("requestResolved", this);
  response += "\r\n";
  var connection = new WebSocketConnection$1(this.socket, [], acceptedProtocol, false, this.serverConfig);
  connection.webSocketVersion = this.webSocketVersion;
  connection.remoteAddress = this.remoteAddress;
  connection.remoteAddresses = this.remoteAddresses;
  var self2 = this;
  if (this._socketIsClosing) {
    cleanupFailedConnection(connection);
  } else {
    this.socket.write(response, "ascii", function(error) {
      if (error) {
        cleanupFailedConnection(connection);
        return;
      }
      self2._removeSocketCloseListeners();
      connection._addSocketEventListeners();
    });
  }
  this.emit("requestAccepted", connection);
  return connection;
};
WebSocketRequest$1.prototype.reject = function(status, reason, extraHeaders) {
  this._verifyResolution();
  this._resolved = true;
  this.emit("requestResolved", this);
  if (typeof status !== "number") {
    status = 403;
  }
  var response = "HTTP/1.1 " + status + " " + httpStatusDescriptions[status] + "\r\nConnection: close\r\n";
  if (reason) {
    reason = reason.replace(headerSanitizeRegExp, "");
    response += "X-WebSocket-Reject-Reason: " + reason + "\r\n";
  }
  if (extraHeaders) {
    for (var key in extraHeaders) {
      var sanitizedValue = extraHeaders[key].toString().replace(headerSanitizeRegExp, "");
      var sanitizedKey = key.replace(headerSanitizeRegExp, "");
      response += sanitizedKey + ": " + sanitizedValue + "\r\n";
    }
  }
  response += "\r\n";
  this.socket.end(response, "ascii");
  this.emit("requestRejected", this);
};
WebSocketRequest$1.prototype._handleSocketCloseBeforeAccept = function() {
  this._socketIsClosing = true;
  this._removeSocketCloseListeners();
};
WebSocketRequest$1.prototype._removeSocketCloseListeners = function() {
  this.socket.removeListener("end", this._socketCloseHandler);
  this.socket.removeListener("close", this._socketCloseHandler);
};
WebSocketRequest$1.prototype._verifyResolution = function() {
  if (this._resolved) {
    throw new Error("WebSocketRequest may only be accepted or rejected one time.");
  }
};
function cleanupFailedConnection(connection) {
  process.nextTick(function() {
    connection.drop(1006, "TCP connection lost before handshake completed.", true);
  });
}
var WebSocketRequest_1 = WebSocketRequest$1;
var extend$2 = utils$3.extend;
var utils$1 = utils$3;
var util$3 = require$$1$1;
var debug = require$$1("websocket:server");
var EventEmitter$3 = require$$2.EventEmitter;
var WebSocketRequest = WebSocketRequest_1;
var WebSocketServer = function WebSocketServer2(config2) {
  EventEmitter$3.call(this);
  this._handlers = {
    upgrade: this.handleUpgrade.bind(this),
    requestAccepted: this.handleRequestAccepted.bind(this),
    requestResolved: this.handleRequestResolved.bind(this)
  };
  this.connections = [];
  this.pendingRequests = [];
  if (config2) {
    this.mount(config2);
  }
};
util$3.inherits(WebSocketServer, EventEmitter$3);
WebSocketServer.prototype.mount = function(config2) {
  this.config = {
    httpServer: null,
    maxReceivedFrameSize: 65536,
    maxReceivedMessageSize: 1048576,
    fragmentOutgoingMessages: true,
    fragmentationThreshold: 16384,
    keepalive: true,
    keepaliveInterval: 2e4,
    dropConnectionOnKeepaliveTimeout: true,
    keepaliveGracePeriod: 1e4,
    useNativeKeepalive: false,
    assembleFragments: true,
    autoAcceptConnections: false,
    ignoreXForwardedFor: false,
    parseCookies: true,
    parseExtensions: true,
    disableNagleAlgorithm: true,
    closeTimeout: 5e3
  };
  extend$2(this.config, config2);
  if (this.config.httpServer) {
    if (!Array.isArray(this.config.httpServer)) {
      this.config.httpServer = [this.config.httpServer];
    }
    var upgradeHandler = this._handlers.upgrade;
    this.config.httpServer.forEach(function(httpServer) {
      httpServer.on("upgrade", upgradeHandler);
    });
  } else {
    throw new Error("You must specify an httpServer on which to mount the WebSocket server.");
  }
};
WebSocketServer.prototype.unmount = function() {
  var upgradeHandler = this._handlers.upgrade;
  this.config.httpServer.forEach(function(httpServer) {
    httpServer.removeListener("upgrade", upgradeHandler);
  });
};
WebSocketServer.prototype.closeAllConnections = function() {
  this.connections.forEach(function(connection) {
    connection.close();
  });
  this.pendingRequests.forEach(function(request) {
    process.nextTick(function() {
      request.reject(503);
    });
  });
};
WebSocketServer.prototype.broadcast = function(data) {
  if (Buffer.isBuffer(data)) {
    this.broadcastBytes(data);
  } else if (typeof data.toString === "function") {
    this.broadcastUTF(data);
  }
};
WebSocketServer.prototype.broadcastUTF = function(utfData) {
  this.connections.forEach(function(connection) {
    connection.sendUTF(utfData);
  });
};
WebSocketServer.prototype.broadcastBytes = function(binaryData) {
  this.connections.forEach(function(connection) {
    connection.sendBytes(binaryData);
  });
};
WebSocketServer.prototype.shutDown = function() {
  this.unmount();
  this.closeAllConnections();
};
WebSocketServer.prototype.handleUpgrade = function(request, socket) {
  var self2 = this;
  var wsRequest = new WebSocketRequest(socket, request, this.config);
  try {
    wsRequest.readHandshake();
  } catch (e) {
    wsRequest.reject(
      e.httpCode ? e.httpCode : 400,
      e.message,
      e.headers
    );
    debug("Invalid handshake: %s", e.message);
    this.emit("upgradeError", e);
    return;
  }
  this.pendingRequests.push(wsRequest);
  wsRequest.once("requestAccepted", this._handlers.requestAccepted);
  wsRequest.once("requestResolved", this._handlers.requestResolved);
  socket.once("close", function() {
    self2._handlers.requestResolved(wsRequest);
  });
  if (!this.config.autoAcceptConnections && utils$1.eventEmitterListenerCount(this, "request") > 0) {
    this.emit("request", wsRequest);
  } else if (this.config.autoAcceptConnections) {
    wsRequest.accept(wsRequest.requestedProtocols[0], wsRequest.origin);
  } else {
    wsRequest.reject(404, "No handler is configured to accept the connection.");
  }
};
WebSocketServer.prototype.handleRequestAccepted = function(connection) {
  var self2 = this;
  connection.once("close", function(closeReason, description2) {
    self2.handleConnectionClose(connection, closeReason, description2);
  });
  this.connections.push(connection);
  this.emit("connect", connection);
};
WebSocketServer.prototype.handleConnectionClose = function(connection, closeReason, description2) {
  var index = this.connections.indexOf(connection);
  if (index !== -1) {
    this.connections.splice(index, 1);
  }
  this.emit("close", connection, closeReason, description2);
};
WebSocketServer.prototype.handleRequestResolved = function(request) {
  var index = this.pendingRequests.indexOf(request);
  if (index !== -1) {
    this.pendingRequests.splice(index, 1);
  }
};
var WebSocketServer_1 = WebSocketServer;
var utils = utils$3;
var extend$1 = utils.extend;
var util$2 = require$$1$1;
var EventEmitter$2 = require$$2.EventEmitter;
var http = require$$3;
var https = require$$4;
var url = require$$2$1;
var crypto = require$$0$3;
var WebSocketConnection = WebSocketConnection_1;
var bufferAllocUnsafe = utils.bufferAllocUnsafe;
var protocolSeparators = [
  "(",
  ")",
  "<",
  ">",
  "@",
  ",",
  ";",
  ":",
  "\\",
  '"',
  "/",
  "[",
  "]",
  "?",
  "=",
  "{",
  "}",
  " ",
  String.fromCharCode(9)
];
var excludedTlsOptions = ["hostname", "port", "method", "path", "headers"];
function WebSocketClient$1(config2) {
  EventEmitter$2.call(this);
  this.config = {
    maxReceivedFrameSize: 1048576,
    maxReceivedMessageSize: 8388608,
    fragmentOutgoingMessages: true,
    fragmentationThreshold: 16384,
    webSocketVersion: 13,
    assembleFragments: true,
    disableNagleAlgorithm: true,
    closeTimeout: 5e3,
    tlsOptions: {}
  };
  if (config2) {
    var tlsOptions;
    if (config2.tlsOptions) {
      tlsOptions = config2.tlsOptions;
      delete config2.tlsOptions;
    } else {
      tlsOptions = {};
    }
    extend$1(this.config, config2);
    extend$1(this.config.tlsOptions, tlsOptions);
  }
  this._req = null;
  switch (this.config.webSocketVersion) {
    case 8:
    case 13:
      break;
    default:
      throw new Error("Requested webSocketVersion is not supported. Allowed values are 8 and 13.");
  }
}
util$2.inherits(WebSocketClient$1, EventEmitter$2);
WebSocketClient$1.prototype.connect = function(requestUrl, protocols, origin, headers, extraRequestOptions) {
  var self2 = this;
  if (typeof protocols === "string") {
    if (protocols.length > 0) {
      protocols = [protocols];
    } else {
      protocols = [];
    }
  }
  if (!(protocols instanceof Array)) {
    protocols = [];
  }
  this.protocols = protocols;
  this.origin = origin;
  if (typeof requestUrl === "string") {
    this.url = url.parse(requestUrl);
  } else {
    this.url = requestUrl;
  }
  if (!this.url.protocol) {
    throw new Error("You must specify a full WebSocket URL, including protocol.");
  }
  if (!this.url.host) {
    throw new Error("You must specify a full WebSocket URL, including hostname. Relative URLs are not supported.");
  }
  this.secure = this.url.protocol === "wss:";
  this.protocols.forEach(function(protocol) {
    for (var i2 = 0; i2 < protocol.length; i2++) {
      var charCode = protocol.charCodeAt(i2);
      var character = protocol.charAt(i2);
      if (charCode < 33 || charCode > 126 || protocolSeparators.indexOf(character) !== -1) {
        throw new Error('Protocol list contains invalid character "' + String.fromCharCode(charCode) + '"');
      }
    }
  });
  var defaultPorts = {
    "ws:": "80",
    "wss:": "443"
  };
  if (!this.url.port) {
    this.url.port = defaultPorts[this.url.protocol];
  }
  var nonce = bufferAllocUnsafe(16);
  for (var i = 0; i < 16; i++) {
    nonce[i] = Math.round(Math.random() * 255);
  }
  this.base64nonce = nonce.toString("base64");
  var hostHeaderValue = this.url.hostname;
  if (this.url.protocol === "ws:" && this.url.port !== "80" || this.url.protocol === "wss:" && this.url.port !== "443") {
    hostHeaderValue += ":" + this.url.port;
  }
  var reqHeaders = {};
  if (this.secure && this.config.tlsOptions.hasOwnProperty("headers")) {
    extend$1(reqHeaders, this.config.tlsOptions.headers);
  }
  if (headers) {
    extend$1(reqHeaders, headers);
  }
  extend$1(reqHeaders, {
    "Upgrade": "websocket",
    "Connection": "Upgrade",
    "Sec-WebSocket-Version": this.config.webSocketVersion.toString(10),
    "Sec-WebSocket-Key": this.base64nonce,
    "Host": reqHeaders.Host || hostHeaderValue
  });
  if (this.protocols.length > 0) {
    reqHeaders["Sec-WebSocket-Protocol"] = this.protocols.join(", ");
  }
  if (this.origin) {
    if (this.config.webSocketVersion === 13) {
      reqHeaders["Origin"] = this.origin;
    } else if (this.config.webSocketVersion === 8) {
      reqHeaders["Sec-WebSocket-Origin"] = this.origin;
    }
  }
  var pathAndQuery;
  if (this.url.pathname) {
    pathAndQuery = this.url.path;
  } else if (this.url.path) {
    pathAndQuery = "/" + this.url.path;
  } else {
    pathAndQuery = "/";
  }
  function handleRequestError(error) {
    self2._req = null;
    self2.emit("connectFailed", error);
  }
  var requestOptions = {
    agent: false
  };
  if (extraRequestOptions) {
    extend$1(requestOptions, extraRequestOptions);
  }
  extend$1(requestOptions, {
    hostname: this.url.hostname,
    port: this.url.port,
    method: "GET",
    path: pathAndQuery,
    headers: reqHeaders
  });
  if (this.secure) {
    var tlsOptions = this.config.tlsOptions;
    for (var key in tlsOptions) {
      if (tlsOptions.hasOwnProperty(key) && excludedTlsOptions.indexOf(key) === -1) {
        requestOptions[key] = tlsOptions[key];
      }
    }
  }
  var req = this._req = (this.secure ? https : http).request(requestOptions);
  req.on("upgrade", function handleRequestUpgrade(response, socket, head) {
    self2._req = null;
    req.removeListener("error", handleRequestError);
    self2.socket = socket;
    self2.response = response;
    self2.firstDataChunk = head;
    self2.validateHandshake();
  });
  req.on("error", handleRequestError);
  req.on("response", function(response) {
    self2._req = null;
    if (utils.eventEmitterListenerCount(self2, "httpResponse") > 0) {
      self2.emit("httpResponse", response, self2);
      if (response.socket) {
        response.socket.end();
      }
    } else {
      var headerDumpParts = [];
      for (var headerName in response.headers) {
        headerDumpParts.push(headerName + ": " + response.headers[headerName]);
      }
      self2.failHandshake(
        "Server responded with a non-101 status: " + response.statusCode + " " + response.statusMessage + "\nResponse Headers Follow:\n" + headerDumpParts.join("\n") + "\n"
      );
    }
  });
  req.end();
};
WebSocketClient$1.prototype.validateHandshake = function() {
  var headers = this.response.headers;
  if (this.protocols.length > 0) {
    this.protocol = headers["sec-websocket-protocol"];
    if (this.protocol) {
      if (this.protocols.indexOf(this.protocol) === -1) {
        this.failHandshake("Server did not respond with a requested protocol.");
        return;
      }
    } else {
      this.failHandshake("Expected a Sec-WebSocket-Protocol header.");
      return;
    }
  }
  if (!(headers["connection"] && headers["connection"].toLocaleLowerCase() === "upgrade")) {
    this.failHandshake("Expected a Connection: Upgrade header from the server");
    return;
  }
  if (!(headers["upgrade"] && headers["upgrade"].toLocaleLowerCase() === "websocket")) {
    this.failHandshake("Expected an Upgrade: websocket header from the server");
    return;
  }
  var sha1 = crypto.createHash("sha1");
  sha1.update(this.base64nonce + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
  var expectedKey = sha1.digest("base64");
  if (!headers["sec-websocket-accept"]) {
    this.failHandshake("Expected Sec-WebSocket-Accept header from server");
    return;
  }
  if (headers["sec-websocket-accept"] !== expectedKey) {
    this.failHandshake("Sec-WebSocket-Accept header from server didn't match expected value of " + expectedKey);
    return;
  }
  this.succeedHandshake();
};
WebSocketClient$1.prototype.failHandshake = function(errorDescription) {
  if (this.socket && this.socket.writable) {
    this.socket.end();
  }
  this.emit("connectFailed", new Error(errorDescription));
};
WebSocketClient$1.prototype.succeedHandshake = function() {
  var connection = new WebSocketConnection(this.socket, [], this.protocol, true, this.config);
  connection.webSocketVersion = this.config.webSocketVersion;
  connection._addSocketEventListeners();
  this.emit("connect", connection);
  if (this.firstDataChunk.length > 0) {
    connection.handleSocketData(this.firstDataChunk);
  }
  this.firstDataChunk = null;
};
WebSocketClient$1.prototype.abort = function() {
  if (this._req) {
    this._req.abort();
  }
};
var WebSocketClient_1 = WebSocketClient$1;
var util$1 = require$$1$1;
var EventEmitter$1 = require$$2.EventEmitter;
function WebSocketRouterRequest$1(webSocketRequest, resolvedProtocol) {
  EventEmitter$1.call(this);
  this.webSocketRequest = webSocketRequest;
  if (resolvedProtocol === "____no_protocol____") {
    this.protocol = null;
  } else {
    this.protocol = resolvedProtocol;
  }
  this.origin = webSocketRequest.origin;
  this.resource = webSocketRequest.resource;
  this.resourceURL = webSocketRequest.resourceURL;
  this.httpRequest = webSocketRequest.httpRequest;
  this.remoteAddress = webSocketRequest.remoteAddress;
  this.webSocketVersion = webSocketRequest.webSocketVersion;
  this.requestedExtensions = webSocketRequest.requestedExtensions;
  this.cookies = webSocketRequest.cookies;
}
util$1.inherits(WebSocketRouterRequest$1, EventEmitter$1);
WebSocketRouterRequest$1.prototype.accept = function(origin, cookies) {
  var connection = this.webSocketRequest.accept(this.protocol, origin, cookies);
  this.emit("requestAccepted", connection);
  return connection;
};
WebSocketRouterRequest$1.prototype.reject = function(status, reason, extraHeaders) {
  this.webSocketRequest.reject(status, reason, extraHeaders);
  this.emit("requestRejected", this);
};
var WebSocketRouterRequest_1 = WebSocketRouterRequest$1;
var extend2 = utils$3.extend;
var util = require$$1$1;
var EventEmitter = require$$2.EventEmitter;
var WebSocketRouterRequest = WebSocketRouterRequest_1;
function WebSocketRouter(config2) {
  EventEmitter.call(this);
  this.config = {
    server: null
  };
  if (config2) {
    extend2(this.config, config2);
  }
  this.handlers = [];
  this._requestHandler = this.handleRequest.bind(this);
  if (this.config.server) {
    this.attachServer(this.config.server);
  }
}
util.inherits(WebSocketRouter, EventEmitter);
WebSocketRouter.prototype.attachServer = function(server) {
  if (server) {
    this.server = server;
    this.server.on("request", this._requestHandler);
  } else {
    throw new Error("You must specify a WebSocketServer instance to attach to.");
  }
};
WebSocketRouter.prototype.detachServer = function() {
  if (this.server) {
    this.server.removeListener("request", this._requestHandler);
    this.server = null;
  } else {
    throw new Error("Cannot detach from server: not attached.");
  }
};
WebSocketRouter.prototype.mount = function(path, protocol, callback) {
  if (!path) {
    throw new Error("You must specify a path for this handler.");
  }
  if (!protocol) {
    protocol = "____no_protocol____";
  }
  if (!callback) {
    throw new Error("You must specify a callback for this handler.");
  }
  path = this.pathToRegExp(path);
  if (!(path instanceof RegExp)) {
    throw new Error("Path must be specified as either a string or a RegExp.");
  }
  var pathString = path.toString();
  protocol = protocol.toLocaleLowerCase();
  if (this.findHandlerIndex(pathString, protocol) !== -1) {
    throw new Error("You may only mount one handler per path/protocol combination.");
  }
  this.handlers.push({
    "path": path,
    "pathString": pathString,
    "protocol": protocol,
    "callback": callback
  });
};
WebSocketRouter.prototype.unmount = function(path, protocol) {
  var index = this.findHandlerIndex(this.pathToRegExp(path).toString(), protocol);
  if (index !== -1) {
    this.handlers.splice(index, 1);
  } else {
    throw new Error("Unable to find a route matching the specified path and protocol.");
  }
};
WebSocketRouter.prototype.findHandlerIndex = function(pathString, protocol) {
  protocol = protocol.toLocaleLowerCase();
  for (var i = 0, len = this.handlers.length; i < len; i++) {
    var handler = this.handlers[i];
    if (handler.pathString === pathString && handler.protocol === protocol) {
      return i;
    }
  }
  return -1;
};
WebSocketRouter.prototype.pathToRegExp = function(path) {
  if (typeof path === "string") {
    if (path === "*") {
      path = /^.*$/;
    } else {
      path = path.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      path = new RegExp("^" + path + "$");
    }
  }
  return path;
};
WebSocketRouter.prototype.handleRequest = function(request) {
  var requestedProtocols = request.requestedProtocols;
  if (requestedProtocols.length === 0) {
    requestedProtocols = ["____no_protocol____"];
  }
  for (var i = 0; i < requestedProtocols.length; i++) {
    var requestedProtocol = requestedProtocols[i].toLocaleLowerCase();
    for (var j = 0, len = this.handlers.length; j < len; j++) {
      var handler = this.handlers[j];
      if (handler.path.test(request.resourceURL.pathname)) {
        if (requestedProtocol === handler.protocol || handler.protocol === "*") {
          var routerRequest = new WebSocketRouterRequest(request, requestedProtocol);
          handler.callback(routerRequest);
          return;
        }
      }
    }
  }
  request.reject(404, "No handler is available for the given request.");
};
var WebSocketRouter_1 = WebSocketRouter;
var WebSocketClient = WebSocketClient_1;
var toBuffer = require$$1$2;
var yaeti = require$$2$2;
const CONNECTING = 0;
const OPEN = 1;
const CLOSING = 2;
const CLOSED = 3;
var W3CWebSocket_1 = W3CWebSocket;
function W3CWebSocket(url2, protocols, origin, headers, requestOptions, clientConfig) {
  yaeti.EventTarget.call(this);
  clientConfig = clientConfig || {};
  clientConfig.assembleFragments = true;
  var self2 = this;
  this._url = url2;
  this._readyState = CONNECTING;
  this._protocol = void 0;
  this._extensions = "";
  this._bufferedAmount = 0;
  this._binaryType = "arraybuffer";
  this._connection = void 0;
  this._client = new WebSocketClient(clientConfig);
  this._client.on("connect", function(connection) {
    onConnect.call(self2, connection);
  });
  this._client.on("connectFailed", function() {
    onConnectFailed.call(self2);
  });
  this._client.connect(url2, protocols, origin, headers, requestOptions);
}
Object.defineProperties(W3CWebSocket.prototype, {
  url: { get: function() {
    return this._url;
  } },
  readyState: { get: function() {
    return this._readyState;
  } },
  protocol: { get: function() {
    return this._protocol;
  } },
  extensions: { get: function() {
    return this._extensions;
  } },
  bufferedAmount: { get: function() {
    return this._bufferedAmount;
  } }
});
Object.defineProperties(W3CWebSocket.prototype, {
  binaryType: {
    get: function() {
      return this._binaryType;
    },
    set: function(type) {
      if (type !== "arraybuffer") {
        throw new SyntaxError('just "arraybuffer" type allowed for "binaryType" attribute');
      }
      this._binaryType = type;
    }
  }
});
[["CONNECTING", CONNECTING], ["OPEN", OPEN], ["CLOSING", CLOSING], ["CLOSED", CLOSED]].forEach(function(property) {
  Object.defineProperty(W3CWebSocket.prototype, property[0], {
    get: function() {
      return property[1];
    }
  });
});
[["CONNECTING", CONNECTING], ["OPEN", OPEN], ["CLOSING", CLOSING], ["CLOSED", CLOSED]].forEach(function(property) {
  Object.defineProperty(W3CWebSocket, property[0], {
    get: function() {
      return property[1];
    }
  });
});
W3CWebSocket.prototype.send = function(data) {
  if (this._readyState !== OPEN) {
    throw new Error("cannot call send() while not connected");
  }
  if (typeof data === "string" || data instanceof String) {
    this._connection.sendUTF(data);
  } else {
    if (data instanceof Buffer) {
      this._connection.sendBytes(data);
    } else if (data.byteLength || data.byteLength === 0) {
      data = toBuffer(data);
      this._connection.sendBytes(data);
    } else {
      throw new Error("unknown binary data:", data);
    }
  }
};
W3CWebSocket.prototype.close = function(code, reason) {
  switch (this._readyState) {
    case CONNECTING:
      onConnectFailed.call(this);
      this._client.on("connect", function(connection) {
        if (code) {
          connection.close(code, reason);
        } else {
          connection.close();
        }
      });
      break;
    case OPEN:
      this._readyState = CLOSING;
      if (code) {
        this._connection.close(code, reason);
      } else {
        this._connection.close();
      }
      break;
  }
};
function createCloseEvent(code, reason) {
  var event = new yaeti.Event("close");
  event.code = code;
  event.reason = reason;
  event.wasClean = typeof code === "undefined" || code === 1e3;
  return event;
}
function createMessageEvent(data) {
  var event = new yaeti.Event("message");
  event.data = data;
  return event;
}
function onConnect(connection) {
  var self2 = this;
  this._readyState = OPEN;
  this._connection = connection;
  this._protocol = connection.protocol;
  this._extensions = connection.extensions;
  this._connection.on("close", function(code, reason) {
    onClose.call(self2, code, reason);
  });
  this._connection.on("message", function(msg) {
    onMessage.call(self2, msg);
  });
  this.dispatchEvent(new yaeti.Event("open"));
}
function onConnectFailed() {
  destroy.call(this);
  this._readyState = CLOSED;
  try {
    this.dispatchEvent(new yaeti.Event("error"));
  } finally {
    this.dispatchEvent(createCloseEvent(1006, "connection failed"));
  }
}
function onClose(code, reason) {
  destroy.call(this);
  this._readyState = CLOSED;
  this.dispatchEvent(createCloseEvent(code, reason || ""));
}
function onMessage(message) {
  if (message.utf8Data) {
    this.dispatchEvent(createMessageEvent(message.utf8Data));
  } else if (message.binaryData) {
    if (this.binaryType === "arraybuffer") {
      var buffer = message.binaryData;
      var arraybuffer = new ArrayBuffer(buffer.length);
      var view = new Uint8Array(arraybuffer);
      for (var i = 0, len = buffer.length; i < len; ++i) {
        view[i] = buffer[i];
      }
      this.dispatchEvent(createMessageEvent(arraybuffer));
    }
  }
}
function destroy() {
  this._client.removeAllListeners();
  if (this._connection) {
    this._connection.removeAllListeners();
  }
}
var Deprecation = {
  disableWarnings: false,
  deprecationWarningMap: {},
  warn: function(deprecationName) {
    if (!this.disableWarnings && this.deprecationWarningMap[deprecationName]) {
      console.warn("DEPRECATION WARNING: " + this.deprecationWarningMap[deprecationName]);
      this.deprecationWarningMap[deprecationName] = false;
    }
  }
};
var Deprecation_1 = Deprecation;
const name = "websocket";
const description = "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.";
const keywords = [
  "websocket",
  "websockets",
  "socket",
  "networking",
  "comet",
  "push",
  "RFC-6455",
  "realtime",
  "server",
  "client"
];
const author = "Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)";
const contributors = [
  "I\xF1aki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"
];
const version$3 = "1.0.34";
const repository = {
  type: "git",
  url: "https://github.com/theturtle32/WebSocket-Node.git"
};
const homepage = "https://github.com/theturtle32/WebSocket-Node";
const engines = {
  node: ">=4.0.0"
};
const dependencies = {
  bufferutil: "^4.0.1",
  debug: "^2.2.0",
  "es5-ext": "^0.10.50",
  "typedarray-to-buffer": "^3.1.5",
  "utf-8-validate": "^5.0.2",
  yaeti: "^0.0.6"
};
const devDependencies = {
  "buffer-equal": "^1.0.0",
  gulp: "^4.0.2",
  "gulp-jshint": "^2.0.4",
  "jshint-stylish": "^2.2.1",
  jshint: "^2.0.0",
  tape: "^4.9.1"
};
const config = {
  verbose: false
};
const scripts = {
  test: "tape test/unit/*.js",
  gulp: "gulp"
};
const main = "index";
const directories = {
  lib: "./lib"
};
const browser = "lib/browser.js";
const license = "Apache-2.0";
const require$$0 = {
  name,
  description,
  keywords,
  author,
  contributors,
  version: version$3,
  repository,
  homepage,
  engines,
  dependencies,
  devDependencies,
  config,
  scripts,
  main,
  directories,
  browser,
  license
};
var version$2 = require$$0.version;
var websocket = {
  "server": WebSocketServer_1,
  "client": WebSocketClient_1,
  "router": WebSocketRouter_1,
  "frame": WebSocketFrame_1,
  "request": WebSocketRequest_1,
  "connection": WebSocketConnection_1,
  "w3cwebsocket": W3CWebSocket_1,
  "deprecation": Deprecation_1,
  "version": version$2
};
(function(module) {
  module.exports = websocket;
})(websocket$1);
const version$1 = "1.7.5";
const DEFAULT_HEADERS$1 = { "X-Client-Info": `realtime-js/${version$1}` };
const VSN = "1.0.0";
const DEFAULT_TIMEOUT = 1e4;
const WS_CLOSE_NORMAL = 1e3;
var SOCKET_STATES;
(function(SOCKET_STATES2) {
  SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
  SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
  SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
  SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
})(SOCKET_STATES || (SOCKET_STATES = {}));
var CHANNEL_STATES;
(function(CHANNEL_STATES2) {
  CHANNEL_STATES2["closed"] = "closed";
  CHANNEL_STATES2["errored"] = "errored";
  CHANNEL_STATES2["joined"] = "joined";
  CHANNEL_STATES2["joining"] = "joining";
  CHANNEL_STATES2["leaving"] = "leaving";
})(CHANNEL_STATES || (CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
(function(CHANNEL_EVENTS2) {
  CHANNEL_EVENTS2["close"] = "phx_close";
  CHANNEL_EVENTS2["error"] = "phx_error";
  CHANNEL_EVENTS2["join"] = "phx_join";
  CHANNEL_EVENTS2["reply"] = "phx_reply";
  CHANNEL_EVENTS2["leave"] = "phx_leave";
  CHANNEL_EVENTS2["access_token"] = "access_token";
})(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
var TRANSPORTS;
(function(TRANSPORTS2) {
  TRANSPORTS2["websocket"] = "websocket";
})(TRANSPORTS || (TRANSPORTS = {}));
var CONNECTION_STATE;
(function(CONNECTION_STATE2) {
  CONNECTION_STATE2["Connecting"] = "connecting";
  CONNECTION_STATE2["Open"] = "open";
  CONNECTION_STATE2["Closing"] = "closing";
  CONNECTION_STATE2["Closed"] = "closed";
})(CONNECTION_STATE || (CONNECTION_STATE = {}));
class Timer {
  constructor(callback, timerCalc) {
    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = void 0;
    this.tries = 0;
    this.callback = callback;
    this.timerCalc = timerCalc;
  }
  reset() {
    this.tries = 0;
    clearTimeout(this.timer);
  }
  scheduleTimeout() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.tries = this.tries + 1;
      this.callback();
    }, this.timerCalc(this.tries + 1));
  }
}
class Serializer {
  constructor() {
    this.HEADER_LENGTH = 1;
  }
  decode(rawPayload, callback) {
    if (rawPayload.constructor === ArrayBuffer) {
      return callback(this._binaryDecode(rawPayload));
    }
    if (typeof rawPayload === "string") {
      return callback(JSON.parse(rawPayload));
    }
    return callback({});
  }
  _binaryDecode(buffer) {
    const view = new DataView(buffer);
    const decoder = new TextDecoder();
    return this._decodeBroadcast(buffer, view, decoder);
  }
  _decodeBroadcast(buffer, view, decoder) {
    const topicSize = view.getUint8(1);
    const eventSize = view.getUint8(2);
    let offset = this.HEADER_LENGTH + 2;
    const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    const event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
    return { ref: null, topic, event, payload: data };
  }
}
class Push {
  constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
    this.channel = channel;
    this.event = event;
    this.payload = payload;
    this.timeout = timeout;
    this.sent = false;
    this.timeoutTimer = void 0;
    this.ref = "";
    this.receivedResp = null;
    this.recHooks = [];
    this.refEvent = null;
  }
  resend(timeout) {
    this.timeout = timeout;
    this._cancelRefEvent();
    this.ref = "";
    this.refEvent = null;
    this.receivedResp = null;
    this.sent = false;
    this.send();
  }
  send() {
    if (this._hasReceived("timeout")) {
      return;
    }
    this.startTimeout();
    this.sent = true;
    this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: this.ref,
      join_ref: this.channel.joinRef()
    });
  }
  updatePayload(payload) {
    this.payload = Object.assign(Object.assign({}, this.payload), payload);
  }
  receive(status, callback) {
    var _a2;
    if (this._hasReceived(status)) {
      callback((_a2 = this.receivedResp) === null || _a2 === void 0 ? void 0 : _a2.response);
    }
    this.recHooks.push({ status, callback });
    return this;
  }
  startTimeout() {
    if (this.timeoutTimer) {
      return;
    }
    this.ref = this.channel.socket.makeRef();
    this.refEvent = this.channel.replyEventName(this.ref);
    const callback = (payload) => {
      this._cancelRefEvent();
      this._cancelTimeout();
      this.receivedResp = payload;
      this._matchReceive(payload);
    };
    this.channel.on(this.refEvent, callback);
    this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  trigger(status, response) {
    if (this.refEvent)
      this.channel.trigger(this.refEvent, { status, response });
  }
  destroy() {
    this._cancelRefEvent();
    this._cancelTimeout();
  }
  _cancelRefEvent() {
    if (!this.refEvent) {
      return;
    }
    this.channel.off(this.refEvent);
  }
  _cancelTimeout() {
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = void 0;
  }
  _matchReceive({ status, response }) {
    this.recHooks.filter((h2) => h2.status === status).forEach((h2) => h2.callback(response));
  }
  _hasReceived(status) {
    return this.receivedResp && this.receivedResp.status === status;
  }
}
class RealtimeSubscription {
  constructor(topic, params = {}, socket) {
    this.topic = topic;
    this.params = params;
    this.socket = socket;
    this.bindings = [];
    this.state = CHANNEL_STATES.closed;
    this.joinedOnce = false;
    this.pushBuffer = [];
    this.timeout = this.socket.timeout;
    this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
    this.rejoinTimer = new Timer(() => this.rejoinUntilConnected(), this.socket.reconnectAfterMs);
    this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined;
      this.rejoinTimer.reset();
      this.pushBuffer.forEach((pushEvent) => pushEvent.send());
      this.pushBuffer = [];
    });
    this.onClose(() => {
      this.rejoinTimer.reset();
      this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
      this.state = CHANNEL_STATES.closed;
      this.socket.remove(this);
    });
    this.onError((reason) => {
      if (this.isLeaving() || this.isClosed()) {
        return;
      }
      this.socket.log("channel", `error ${this.topic}`, reason);
      this.state = CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this.joinPush.receive("timeout", () => {
      if (!this.isJoining()) {
        return;
      }
      this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
      this.state = CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this.on(CHANNEL_EVENTS.reply, (payload, ref2) => {
      this.trigger(this.replyEventName(ref2), payload);
    });
  }
  rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout();
    if (this.socket.isConnected()) {
      this.rejoin();
    }
  }
  subscribe(timeout = this.timeout) {
    if (this.joinedOnce) {
      throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
    } else {
      this.joinedOnce = true;
      this.rejoin(timeout);
      return this.joinPush;
    }
  }
  onClose(callback) {
    this.on(CHANNEL_EVENTS.close, callback);
  }
  onError(callback) {
    this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
  }
  on(event, callback) {
    this.bindings.push({ event, callback });
  }
  off(event) {
    this.bindings = this.bindings.filter((bind) => bind.event !== event);
  }
  canPush() {
    return this.socket.isConnected() && this.isJoined();
  }
  push(event, payload, timeout = this.timeout) {
    if (!this.joinedOnce) {
      throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    }
    let pushEvent = new Push(this, event, payload, timeout);
    if (this.canPush()) {
      pushEvent.send();
    } else {
      pushEvent.startTimeout();
      this.pushBuffer.push(pushEvent);
    }
    return pushEvent;
  }
  updateJoinPayload(payload) {
    this.joinPush.updatePayload(payload);
  }
  unsubscribe(timeout = this.timeout) {
    this.state = CHANNEL_STATES.leaving;
    let onClose2 = () => {
      this.socket.log("channel", `leave ${this.topic}`);
      this.trigger(CHANNEL_EVENTS.close, "leave", this.joinRef());
    };
    this.joinPush.destroy();
    let leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
    leavePush.receive("ok", () => onClose2()).receive("timeout", () => onClose2());
    leavePush.send();
    if (!this.canPush()) {
      leavePush.trigger("ok", {});
    }
    return leavePush;
  }
  onMessage(event, payload, ref2) {
    return payload;
  }
  isMember(topic) {
    return this.topic === topic;
  }
  joinRef() {
    return this.joinPush.ref;
  }
  rejoin(timeout = this.timeout) {
    if (this.isLeaving()) {
      return;
    }
    this.socket.leaveOpenTopic(this.topic);
    this.state = CHANNEL_STATES.joining;
    this.joinPush.resend(timeout);
  }
  trigger(event, payload, ref2) {
    let { close, error, leave, join } = CHANNEL_EVENTS;
    let events = [close, error, leave, join];
    if (ref2 && events.indexOf(event) >= 0 && ref2 !== this.joinRef()) {
      return;
    }
    let handledPayload = this.onMessage(event, payload, ref2);
    if (payload && !handledPayload) {
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    }
    this.bindings.filter((bind) => {
      if (bind.event === "*") {
        return event === (payload === null || payload === void 0 ? void 0 : payload.type);
      } else {
        return bind.event === event;
      }
    }).map((bind) => bind.callback(handledPayload, ref2));
  }
  replyEventName(ref2) {
    return `chan_reply_${ref2}`;
  }
  isClosed() {
    return this.state === CHANNEL_STATES.closed;
  }
  isErrored() {
    return this.state === CHANNEL_STATES.errored;
  }
  isJoined() {
    return this.state === CHANNEL_STATES.joined;
  }
  isJoining() {
    return this.state === CHANNEL_STATES.joining;
  }
  isLeaving() {
    return this.state === CHANNEL_STATES.leaving;
  }
}
var __awaiter$7 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const noop = () => {
};
class RealtimeClient {
  constructor(endPoint, options) {
    this.accessToken = null;
    this.channels = [];
    this.endPoint = "";
    this.headers = DEFAULT_HEADERS$1;
    this.params = {};
    this.timeout = DEFAULT_TIMEOUT;
    this.transport = websocket$1.exports.w3cwebsocket;
    this.heartbeatIntervalMs = 3e4;
    this.longpollerTimeout = 2e4;
    this.heartbeatTimer = void 0;
    this.pendingHeartbeatRef = null;
    this.ref = 0;
    this.logger = noop;
    this.conn = null;
    this.sendBuffer = [];
    this.serializer = new Serializer();
    this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    };
    this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
    if (options === null || options === void 0 ? void 0 : options.params)
      this.params = options.params;
    if (options === null || options === void 0 ? void 0 : options.headers)
      this.headers = Object.assign(Object.assign({}, this.headers), options.headers);
    if (options === null || options === void 0 ? void 0 : options.timeout)
      this.timeout = options.timeout;
    if (options === null || options === void 0 ? void 0 : options.logger)
      this.logger = options.logger;
    if (options === null || options === void 0 ? void 0 : options.transport)
      this.transport = options.transport;
    if (options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs)
      this.heartbeatIntervalMs = options.heartbeatIntervalMs;
    if (options === null || options === void 0 ? void 0 : options.longpollerTimeout)
      this.longpollerTimeout = options.longpollerTimeout;
    this.reconnectAfterMs = (options === null || options === void 0 ? void 0 : options.reconnectAfterMs) ? options.reconnectAfterMs : (tries) => {
      return [1e3, 2e3, 5e3, 1e4][tries - 1] || 1e4;
    };
    this.encode = (options === null || options === void 0 ? void 0 : options.encode) ? options.encode : (payload, callback) => {
      return callback(JSON.stringify(payload));
    };
    this.decode = (options === null || options === void 0 ? void 0 : options.decode) ? options.decode : this.serializer.decode.bind(this.serializer);
    this.reconnectTimer = new Timer(() => __awaiter$7(this, void 0, void 0, function* () {
      yield this.disconnect();
      this.connect();
    }), this.reconnectAfterMs);
  }
  connect() {
    if (this.conn) {
      return;
    }
    this.conn = new this.transport(this.endPointURL(), [], null, this.headers);
    if (this.conn) {
      this.conn.binaryType = "arraybuffer";
      this.conn.onopen = () => this._onConnOpen();
      this.conn.onerror = (error) => this._onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this._onConnClose(event);
    }
  }
  disconnect(code, reason) {
    return new Promise((resolve, _reject) => {
      try {
        if (this.conn) {
          this.conn.onclose = function() {
          };
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
          this.conn = null;
          this.heartbeatTimer && clearInterval(this.heartbeatTimer);
          this.reconnectTimer.reset();
        }
        resolve({ error: null, data: true });
      } catch (error) {
        resolve({ error, data: false });
      }
    });
  }
  log(kind, msg, data) {
    this.logger(kind, msg, data);
  }
  onOpen(callback) {
    this.stateChangeCallbacks.open.push(callback);
  }
  onClose(callback) {
    this.stateChangeCallbacks.close.push(callback);
  }
  onError(callback) {
    this.stateChangeCallbacks.error.push(callback);
  }
  onMessage(callback) {
    this.stateChangeCallbacks.message.push(callback);
  }
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case SOCKET_STATES.connecting:
        return CONNECTION_STATE.Connecting;
      case SOCKET_STATES.open:
        return CONNECTION_STATE.Open;
      case SOCKET_STATES.closing:
        return CONNECTION_STATE.Closing;
      default:
        return CONNECTION_STATE.Closed;
    }
  }
  isConnected() {
    return this.connectionState() === CONNECTION_STATE.Open;
  }
  remove(channel) {
    this.channels = this.channels.filter((c) => c.joinRef() !== channel.joinRef());
  }
  channel(topic, chanParams = {}) {
    const chan = new RealtimeSubscription(topic, chanParams, this);
    this.channels.push(chan);
    return chan;
  }
  push(data) {
    const { topic, event, payload, ref: ref2 } = data;
    let callback = () => {
      this.encode(data, (result) => {
        var _a2;
        (_a2 = this.conn) === null || _a2 === void 0 ? void 0 : _a2.send(result);
      });
    };
    this.log("push", `${topic} ${event} (${ref2})`, payload);
    if (this.isConnected()) {
      callback();
    } else {
      this.sendBuffer.push(callback);
    }
  }
  onConnMessage(rawMessage) {
    this.decode(rawMessage.data, (msg) => {
      let { topic, event, payload, ref: ref2 } = msg;
      if (ref2 && ref2 === this.pendingHeartbeatRef || event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
        this.pendingHeartbeatRef = null;
      }
      this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref2 && "(" + ref2 + ")" || ""}`, payload);
      this.channels.filter((channel) => channel.isMember(topic)).forEach((channel) => channel.trigger(event, payload, ref2));
      this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
    });
  }
  endPointURL() {
    return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
  }
  makeRef() {
    let newRef = this.ref + 1;
    if (newRef === this.ref) {
      this.ref = 0;
    } else {
      this.ref = newRef;
    }
    return this.ref.toString();
  }
  setAuth(token) {
    this.accessToken = token;
    this.channels.forEach((channel) => {
      token && channel.updateJoinPayload({ user_token: token });
      if (channel.joinedOnce && channel.isJoined()) {
        channel.push(CHANNEL_EVENTS.access_token, { access_token: token });
      }
    });
  }
  leaveOpenTopic(topic) {
    let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
    if (dupChannel) {
      this.log("transport", `leaving duplicate topic "${topic}"`);
      dupChannel.unsubscribe();
    }
  }
  _onConnOpen() {
    this.log("transport", `connected to ${this.endPointURL()}`);
    this._flushSendBuffer();
    this.reconnectTimer.reset();
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
    this.stateChangeCallbacks.open.forEach((callback) => callback());
  }
  _onConnClose(event) {
    this.log("transport", "close", event);
    this._triggerChanError();
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.reconnectTimer.scheduleTimeout();
    this.stateChangeCallbacks.close.forEach((callback) => callback(event));
  }
  _onConnError(error) {
    this.log("transport", error.message);
    this._triggerChanError();
    this.stateChangeCallbacks.error.forEach((callback) => callback(error));
  }
  _triggerChanError() {
    this.channels.forEach((channel) => channel.trigger(CHANNEL_EVENTS.error));
  }
  _appendParams(url2, params) {
    if (Object.keys(params).length === 0) {
      return url2;
    }
    const prefix = url2.match(/\?/) ? "&" : "?";
    const query = new URLSearchParams(params);
    return `${url2}${prefix}${query}`;
  }
  _flushSendBuffer() {
    if (this.isConnected() && this.sendBuffer.length > 0) {
      this.sendBuffer.forEach((callback) => callback());
      this.sendBuffer = [];
    }
  }
  _sendHeartbeat() {
    var _a2;
    if (!this.isConnected()) {
      return;
    }
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null;
      this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
      (_a2 = this.conn) === null || _a2 === void 0 ? void 0 : _a2.close(WS_CLOSE_NORMAL, "hearbeat timeout");
      return;
    }
    this.pendingHeartbeatRef = this.makeRef();
    this.push({
      topic: "phoenix",
      event: "heartbeat",
      payload: {},
      ref: this.pendingHeartbeatRef
    });
    this.setAuth(this.accessToken);
  }
}
class SupabaseRealtimeClient {
  constructor(socket, headers, schema, tableName) {
    const chanParams = {};
    const topic = tableName === "*" ? `realtime:${schema}` : `realtime:${schema}:${tableName}`;
    const userToken = headers["Authorization"].split(" ")[1];
    if (userToken) {
      chanParams["user_token"] = userToken;
    }
    this.subscription = socket.channel(topic, chanParams);
  }
  getPayloadRecords(payload) {
    const records = {
      new: {},
      old: {}
    };
    if (payload.type === "INSERT" || payload.type === "UPDATE") {
      records.new = convertChangeData(payload.columns, payload.record);
    }
    if (payload.type === "UPDATE" || payload.type === "DELETE") {
      records.old = convertChangeData(payload.columns, payload.old_record);
    }
    return records;
  }
  on(event, callback) {
    this.subscription.on(event, (payload) => {
      let enrichedPayload = {
        schema: payload.schema,
        table: payload.table,
        commit_timestamp: payload.commit_timestamp,
        eventType: payload.type,
        new: {},
        old: {},
        errors: payload.errors
      };
      enrichedPayload = Object.assign(Object.assign({}, enrichedPayload), this.getPayloadRecords(payload));
      callback(enrichedPayload);
    });
    return this;
  }
  subscribe(callback = () => {
  }) {
    this.subscription.onError((e) => callback("SUBSCRIPTION_ERROR", e));
    this.subscription.onClose(() => callback("CLOSED"));
    this.subscription.subscribe().receive("ok", () => callback("SUBSCRIBED")).receive("error", (e) => callback("SUBSCRIPTION_ERROR", e)).receive("timeout", () => callback("RETRYING_AFTER_TIMEOUT"));
    return this.subscription;
  }
}
class SupabaseQueryBuilder extends PostgrestQueryBuilder {
  constructor(url2, { headers = {}, schema, realtime, table, fetch: fetch2, shouldThrowOnError }) {
    super(url2, { headers, schema, fetch: fetch2, shouldThrowOnError });
    this._subscription = null;
    this._realtime = realtime;
    this._headers = headers;
    this._schema = schema;
    this._table = table;
  }
  on(event, callback) {
    if (!this._realtime.isConnected()) {
      this._realtime.connect();
    }
    if (!this._subscription) {
      this._subscription = new SupabaseRealtimeClient(this._realtime, this._headers, this._schema, this._table);
    }
    return this._subscription.on(event, callback);
  }
}
const version = "1.7.3";
const DEFAULT_HEADERS = { "X-Client-Info": `storage-js/${version}` };
var __awaiter$6 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError = (error, reject) => {
  if (typeof error.json !== "function") {
    return reject(error);
  }
  error.json().then((err) => {
    return reject({
      message: _getErrorMessage(err),
      status: (error === null || error === void 0 ? void 0 : error.status) || 500
    });
  });
};
const _getRequestParams = (method, options, parameters, body) => {
  const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
  if (method === "GET") {
    return params;
  }
  params.headers = Object.assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers);
  params.body = JSON.stringify(body);
  return Object.assign(Object.assign({}, params), parameters);
};
function _handleRequest(fetcher, method, url2, options, parameters, body) {
  return __awaiter$6(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url2, _getRequestParams(method, options, parameters, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson)
          return resolve(result);
        return result.json();
      }).then((data) => resolve(data)).catch((error) => handleError(error, reject));
    });
  });
}
function get(fetcher, url2, options, parameters) {
  return __awaiter$6(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "GET", url2, options, parameters);
  });
}
function post(fetcher, url2, body, options, parameters) {
  return __awaiter$6(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "POST", url2, options, parameters, body);
  });
}
function put(fetcher, url2, body, options, parameters) {
  return __awaiter$6(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "PUT", url2, options, parameters, body);
  });
}
function remove(fetcher, url2, body, options, parameters) {
  return __awaiter$6(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "DELETE", url2, options, parameters, body);
  });
}
var __awaiter$5 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const resolveFetch$1 = (customFetch) => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === "undefined") {
    _fetch = (...args) => __awaiter$5(void 0, void 0, void 0, function* () {
      return yield (yield import('unenv/runtime/npm/cross-fetch')).fetch(...args);
    });
  } else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
var __awaiter$4 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class StorageBucketApi {
  constructor(url2, headers = {}, fetch2) {
    this.url = url2;
    this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS), headers);
    this.fetch = resolveFetch$1(fetch2);
  }
  listBuckets() {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        const data = yield get(this.fetch, `${this.url}/bucket`, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  getBucket(id) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        const data = yield get(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  createBucket(id, options = { public: false }) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/bucket`, { id, name: id, public: options.public }, { headers: this.headers });
        return { data: data.name, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  updateBucket(id, options) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        const data = yield put(this.fetch, `${this.url}/bucket/${id}`, { id, name: id, public: options.public }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  emptyBucket(id) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  deleteBucket(id) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        const data = yield remove(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
}
var __awaiter$3 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const DEFAULT_SEARCH_OPTIONS = {
  limit: 100,
  offset: 0,
  sortBy: {
    column: "name",
    order: "asc"
  }
};
const DEFAULT_FILE_OPTIONS = {
  cacheControl: "3600",
  contentType: "text/plain;charset=UTF-8",
  upsert: false
};
class StorageFileApi {
  constructor(url2, headers = {}, bucketId, fetch2) {
    this.url = url2;
    this.headers = headers;
    this.bucketId = bucketId;
    this.fetch = resolveFetch$1(fetch2);
  }
  uploadOrUpdate(method, path, fileBody, fileOptions) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        let body;
        const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
        const headers = Object.assign(Object.assign({}, this.headers), method === "POST" && { "x-upsert": String(options.upsert) });
        if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
          body = new FormData();
          body.append("cacheControl", options.cacheControl);
          body.append("", fileBody);
        } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
          body = fileBody;
          body.append("cacheControl", options.cacheControl);
        } else {
          body = fileBody;
          headers["cache-control"] = `max-age=${options.cacheControl}`;
          headers["content-type"] = options.contentType;
        }
        const cleanPath = this._removeEmptyFolders(path);
        const _path = this._getFinalPath(cleanPath);
        const res = yield this.fetch(`${this.url}/object/${_path}`, {
          method,
          body,
          headers
        });
        if (res.ok) {
          return { data: { Key: _path }, error: null };
        } else {
          const error = yield res.json();
          return { data: null, error };
        }
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  upload(path, fileBody, fileOptions) {
    return __awaiter$3(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
    });
  }
  update(path, fileBody, fileOptions) {
    return __awaiter$3(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
    });
  }
  move(fromPath, toPath) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  copy(fromPath, toPath) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/object/copy`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  createSignedUrl(path, expiresIn) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        const _path = this._getFinalPath(path);
        let data = yield post(this.fetch, `${this.url}/object/sign/${_path}`, { expiresIn }, { headers: this.headers });
        const signedURL = `${this.url}${data.signedURL}`;
        data = { signedURL };
        return { data, error: null, signedURL };
      } catch (error) {
        return { data: null, error, signedURL: null };
      }
    });
  }
  createSignedUrls(paths, expiresIn) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn, paths }, { headers: this.headers });
        return {
          data: data.map((datum) => Object.assign(Object.assign({}, datum), { signedURL: datum.signedURL ? `${this.url}${datum.signedURL}` : null })),
          error: null
        };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  download(path) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        const _path = this._getFinalPath(path);
        const res = yield get(this.fetch, `${this.url}/object/${_path}`, {
          headers: this.headers,
          noResolveJson: true
        });
        const data = yield res.blob();
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  getPublicUrl(path) {
    try {
      const _path = this._getFinalPath(path);
      const publicURL = `${this.url}/object/public/${_path}`;
      const data = { publicURL };
      return { data, error: null, publicURL };
    } catch (error) {
      return { data: null, error, publicURL: null };
    }
  }
  remove(paths) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        const data = yield remove(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  list(path, options, parameters) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), { prefix: path || "" });
        const data = yield post(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, { headers: this.headers }, parameters);
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  _getFinalPath(path) {
    return `${this.bucketId}/${path}`;
  }
  _removeEmptyFolders(path) {
    return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
}
class StorageClient extends StorageBucketApi {
  constructor(url2, headers = {}, fetch2) {
    super(url2, headers, fetch2);
  }
  from(id) {
    return new StorageFileApi(this.url, this.headers, id, this.fetch);
  }
}
var __awaiter$2 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const resolveFetch = (customFetch) => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === "undefined") {
    _fetch = (...args) => __awaiter$2(void 0, void 0, void 0, function* () {
      return yield (yield import('unenv/runtime/npm/cross-fetch')).fetch(...args);
    });
  } else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
var __awaiter$1 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class FunctionsClient {
  constructor(url2, { headers = {}, customFetch } = {}) {
    this.url = url2;
    this.headers = headers;
    this.fetch = resolveFetch(customFetch);
  }
  setAuth(token) {
    this.headers.Authorization = `Bearer ${token}`;
  }
  invoke(functionName, invokeOptions) {
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        const { headers, body } = invokeOptions !== null && invokeOptions !== void 0 ? invokeOptions : {};
        const response = yield this.fetch(`${this.url}/${functionName}`, {
          method: "POST",
          headers: Object.assign({}, this.headers, headers),
          body
        });
        const isRelayError = response.headers.get("x-relay-error");
        if (isRelayError && isRelayError === "true") {
          return { data: null, error: new Error(yield response.text()) };
        }
        let data;
        const { responseType } = invokeOptions !== null && invokeOptions !== void 0 ? invokeOptions : {};
        if (!responseType || responseType === "json") {
          data = yield response.json();
        } else if (responseType === "arrayBuffer") {
          data = yield response.arrayBuffer();
        } else if (responseType === "blob") {
          data = yield response.blob();
        } else {
          data = yield response.text();
        }
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
}
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const DEFAULT_OPTIONS = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  multiTab: true,
  headers: DEFAULT_HEADERS$4
};
class SupabaseClient {
  constructor(supabaseUrl, supabaseKey, options) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    if (!supabaseUrl)
      throw new Error("supabaseUrl is required.");
    if (!supabaseKey)
      throw new Error("supabaseKey is required.");
    const _supabaseUrl = stripTrailingSlash(supabaseUrl);
    const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    this.restUrl = `${_supabaseUrl}/rest/v1`;
    this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace("http", "ws");
    this.authUrl = `${_supabaseUrl}/auth/v1`;
    this.storageUrl = `${_supabaseUrl}/storage/v1`;
    const isPlatform = _supabaseUrl.match(/(supabase\.co)|(supabase\.in)/);
    if (isPlatform) {
      const urlParts = _supabaseUrl.split(".");
      this.functionsUrl = `${urlParts[0]}.functions.${urlParts[1]}.${urlParts[2]}`;
    } else {
      this.functionsUrl = `${_supabaseUrl}/functions/v1`;
    }
    this.schema = settings.schema;
    this.multiTab = settings.multiTab;
    this.fetch = settings.fetch;
    this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS$4), options === null || options === void 0 ? void 0 : options.headers);
    this.shouldThrowOnError = settings.shouldThrowOnError || false;
    this.auth = this._initSupabaseAuthClient(settings);
    this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers }, settings.realtime));
    this._listenForAuthEvents();
    this._listenForMultiTabEvents();
  }
  get functions() {
    return new FunctionsClient(this.functionsUrl, {
      headers: this._getAuthHeaders(),
      customFetch: this.fetch
    });
  }
  get storage() {
    return new StorageClient(this.storageUrl, this._getAuthHeaders(), this.fetch);
  }
  from(table) {
    const url2 = `${this.restUrl}/${table}`;
    return new SupabaseQueryBuilder(url2, {
      headers: this._getAuthHeaders(),
      schema: this.schema,
      realtime: this.realtime,
      table,
      fetch: this.fetch,
      shouldThrowOnError: this.shouldThrowOnError
    });
  }
  rpc(fn, params, { head = false, count = null } = {}) {
    const rest = this._initPostgRESTClient();
    return rest.rpc(fn, params, { head, count });
  }
  removeAllSubscriptions() {
    return __awaiter(this, void 0, void 0, function* () {
      const allSubs = this.getSubscriptions().slice();
      const allSubPromises = allSubs.map((sub) => this.removeSubscription(sub));
      const allRemovedSubs = yield Promise.all(allSubPromises);
      return allRemovedSubs.map(({ error }, i) => {
        return {
          data: { subscription: allSubs[i] },
          error
        };
      });
    });
  }
  removeSubscription(subscription) {
    return __awaiter(this, void 0, void 0, function* () {
      const { error } = yield this._closeSubscription(subscription);
      const allSubs = this.getSubscriptions();
      const openSubCount = allSubs.filter((chan) => chan.isJoined()).length;
      if (allSubs.length === 0)
        yield this.realtime.disconnect();
      return { data: { openSubscriptions: openSubCount }, error };
    });
  }
  _closeSubscription(subscription) {
    return __awaiter(this, void 0, void 0, function* () {
      let error = null;
      if (!subscription.isClosed()) {
        const { error: unsubError } = yield this._unsubscribeSubscription(subscription);
        error = unsubError;
      }
      this.realtime.remove(subscription);
      return { error };
    });
  }
  _unsubscribeSubscription(subscription) {
    return new Promise((resolve) => {
      subscription.unsubscribe().receive("ok", () => resolve({ error: null })).receive("error", (error) => resolve({ error })).receive("timeout", () => resolve({ error: new Error("timed out") }));
    });
  }
  getSubscriptions() {
    return this.realtime.channels;
  }
  _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, localStorage, headers, fetch: fetch2, cookieOptions, multiTab }) {
    const authHeaders = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new SupabaseAuthClient({
      url: this.authUrl,
      headers: Object.assign(Object.assign({}, headers), authHeaders),
      autoRefreshToken,
      persistSession,
      detectSessionInUrl,
      localStorage,
      fetch: fetch2,
      cookieOptions,
      multiTab
    });
  }
  _initRealtimeClient(options) {
    return new RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options), { params: Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.params), { apikey: this.supabaseKey }) }));
  }
  _initPostgRESTClient() {
    return new PostgrestClient(this.restUrl, {
      headers: this._getAuthHeaders(),
      schema: this.schema,
      fetch: this.fetch,
      throwOnError: this.shouldThrowOnError
    });
  }
  _getAuthHeaders() {
    var _a2, _b2;
    const headers = Object.assign({}, this.headers);
    const authBearer = (_b2 = (_a2 = this.auth.session()) === null || _a2 === void 0 ? void 0 : _a2.access_token) !== null && _b2 !== void 0 ? _b2 : this.supabaseKey;
    headers["apikey"] = this.supabaseKey;
    headers["Authorization"] = headers["Authorization"] || `Bearer ${authBearer}`;
    return headers;
  }
  _listenForMultiTabEvents() {
    if (!this.multiTab || !isBrowser$1() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
      return null;
    }
    try {
      return window === null || window === void 0 ? void 0 : window.addEventListener("storage", (e) => {
        var _a2, _b2, _c2;
        if (e.key === STORAGE_KEY$1) {
          const newSession = JSON.parse(String(e.newValue));
          const accessToken = (_b2 = (_a2 = newSession === null || newSession === void 0 ? void 0 : newSession.currentSession) === null || _a2 === void 0 ? void 0 : _a2.access_token) !== null && _b2 !== void 0 ? _b2 : void 0;
          const previousAccessToken = (_c2 = this.auth.session()) === null || _c2 === void 0 ? void 0 : _c2.access_token;
          if (!accessToken) {
            this._handleTokenChanged("SIGNED_OUT", accessToken, "STORAGE");
          } else if (!previousAccessToken && accessToken) {
            this._handleTokenChanged("SIGNED_IN", accessToken, "STORAGE");
          } else if (previousAccessToken !== accessToken) {
            this._handleTokenChanged("TOKEN_REFRESHED", accessToken, "STORAGE");
          }
        }
      });
    } catch (error) {
      console.error("_listenForMultiTabEvents", error);
      return null;
    }
  }
  _listenForAuthEvents() {
    let { data } = this.auth.onAuthStateChange((event, session) => {
      this._handleTokenChanged(event, session === null || session === void 0 ? void 0 : session.access_token, "CLIENT");
    });
    return data;
  }
  _handleTokenChanged(event, token, source) {
    if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
      this.realtime.setAuth(token);
      if (source == "STORAGE")
        this.auth.setAuth(token);
      this.changedAccessToken = token;
    } else if (event === "SIGNED_OUT" || event === "USER_DELETED") {
      this.realtime.setAuth(this.supabaseKey);
      if (source == "STORAGE")
        this.auth.signOut();
    }
  }
}
const createClient = (supabaseUrl, supabaseKey, options) => {
  return new SupabaseClient(supabaseUrl, supabaseKey, options);
};
const useSupabaseToken = () => {
  const { supabase: { cookies: cookieOptions } } = useRuntimeConfig().public;
  const cookieName = `${cookieOptions.name}-access-token`;
  return useCookie(cookieName);
};
const useSupabaseClient = () => {
  const nuxtApp = useNuxtApp();
  const token = useSupabaseToken();
  const { supabase: { url: url2, key, client: options } } = useRuntimeConfig().public;
  if (!nuxtApp._supabaseClient) {
    nuxtApp._supabaseClient = createClient(url2, key, options);
    if (nuxtApp.ssrContext) {
      nuxtApp._supabaseClient.auth.setAuth(token.value);
    }
  }
  return nuxtApp._supabaseClient;
};
const node_modules__64nuxtjs_supabase_dist_runtime_plugins_supabase_server_mjs_6VOknHCOlQ = defineNuxtPlugin(async () => {
  let __temp, __restore;
  const user = useSupabaseUser();
  const client = useSupabaseClient();
  const token = useSupabaseToken();
  if (!token.value) {
    return;
  }
  const { user: supabaseUser, error } = ([__temp, __restore] = executeAsync(() => client.auth.api.getUser(token.value)), __temp = await __temp, __restore(), __temp);
  if (error) {
    token.value = null;
    user.value = null;
  } else {
    user.value = supabaseUser;
  }
});
const _nuxt_unocss_mjs_MzCDxu9LMj = defineNuxtPlugin(() => {
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_head_runtime_mixin_plugin_mjs_prWV5EzJWI,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB,
  node_modules__64nuxt_image_edge_dist_runtime_plugin_mjs_OrkQhMqHci,
  node_modules__64nuxtjs_supabase_dist_runtime_plugins_supabase_server_mjs_6VOknHCOlQ,
  _nuxt_unocss_mjs_MzCDxu9LMj
];
const _sfc_main$1 = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import('./_nuxt/error-component.82befab4.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = resolveComponent("App");
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Fragment = defineComponent({
  setup(_props, { slots }) {
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const layouts = {
  default: () => import('./_nuxt/default.4ae1200a.mjs').then((m) => m.default || m),
  user: () => import('./_nuxt/user.5783c100.mjs').then((m) => m.default || m)
};
const LayoutLoader = defineComponent({
  props: {
    name: String,
    ...{}
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => {
      return h(LayoutComponent, {}, context.slots);
    };
  }
});
const __nuxt_component_0$1 = defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const injectedRoute = inject("_route");
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = unref(props.name)) != null ? _a2 : route.meta.layout) != null ? _b2 : "default";
    });
    return () => {
      var _a2;
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = (_a2 = route.meta.layoutTransition) != null ? _a2 : appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => _wrapIf(LayoutLoader, hasLayout && { key: layout.value, name: layout.value, hasTransition: void 0 }, context.slots).default()
      }).default();
    };
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a2;
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a3;
    return ((_a3 = m.components) == null ? void 0 : _a3.default) === routeProps.Component.type;
  });
  const source = (_a2 = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a2 : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const __nuxt_component_0 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a2, _b2, _c2, _d2;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!((_b2 = (_a2 = props.transition) != null ? _a2 : routeProps.route.meta.pageTransition) != null ? _b2 : appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              (_d2 = (_c2 = props.keepalive) != null ? _c2 : routeProps.route.meta.keepalive) != null ? _d2 : appKeepalive,
              h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(Component, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const Component = defineComponent({
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      charset: "utf-8",
      titleTemplate: (title) => `${title} | KeyPress`,
      link: [{ rel: "icon", href: "/logo.svg" }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$1;
      const _component_NuxtPage = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main$1);
    vueApp.component("App", _sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { __nuxt_component_0$2 as _, useSupabaseUser as a, useSupabaseClient as b, isString as c, isFunction as d, entry$1 as default, identity as e, __nuxt_component_0 as f, useNuxtApp as g, hasOwn as h, isClient as i, createError as j, useHead as k, useRoute as l, navigateTo as m, noop$3 as n, useSubdomainProfile as o, parseSize as p, useSubdomain as q, resolveUnref as r, set as s, tryOnScopeDispose as t, useState as u, defineNuxtRouteMiddleware as v, watchPausable as w, useRouter as x };
//# sourceMappingURL=server.mjs.map
