import { getCurrentInstance, reactive, ref, onServerPrefetch, unref, toRef, isRef, inject, defineComponent, computed, h, resolveComponent, shallowRef, watchEffect, markRaw, provide, Suspense, Transition, mergeProps, useSSRContext, getCurrentScope, onScopeDispose, watch, readonly, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toRefs, nextTick, createTextVNode, withDirectives, vModelText, createApp, toDisplayString, defineAsyncComponent, onErrorCaptured } from "vue";
import { $fetch as $fetch$1 } from "ohmyfetch";
import { joinURL, hasProtocol, parseURL, isEqual as isEqual$1, withLeadingSlash, encodeParam, encodePath } from "ufo";
import { useRuntimeConfig as useRuntimeConfig$1 } from "#internal/nitro";
import { createHooks } from "hookable";
import { getContext, executeAsync } from "unctx";
import { RouterView, createMemoryHistory, createRouter } from "vue-router";
import destr from "destr";
import { createError as createError$1, appendHeader, sendRedirect } from "h3";
import defu, { defuFn, defu as defu$1 } from "defu";
import { isFunction as isFunction$1 } from "@vue/shared";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderSuspense } from "vue/server-renderer";
import { Extension as Extension$1, useEditor, EditorContent, BubbleMenu, VueRenderer } from "@tiptap/vue-3";
import { Node, Extension, Mark, mergeAttributes, markPasteRule, combineTransactionSteps, getChangedRanges, getMarksBetween, findChildrenInRange, getAttributes } from "@tiptap/core";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import { Plugin, TextSelection, PluginKey, Selection } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import Focus from "@tiptap/extension-focus";
import History from "@tiptap/extension-history";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Suggestion from "@tiptap/suggestion";
import tippy from "tippy.js";
import Code$1 from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import CodeBlockLowLight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { registerCustomProtocol, find, test } from "linkifyjs";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import require$$2 from "events";
import require$$1 from "debug";
import require$$1$1 from "util";
import require$$0$3 from "crypto";
import require$$2$1 from "url";
import require$$0$1 from "bufferutil";
import require$$0$2 from "buffer";
import require$$5 from "utf-8-validate";
import require$$3 from "http";
import require$$4 from "https";
import require$$1$2 from "typedarray-to-buffer";
import require$$2$2 from "yaeti";
import { parse, serialize as serialize$1 } from "cookie-es";
import { isEqual } from "ohash";
import { findParentNodeOfType } from "prosemirror-utils";
import { Slice, Fragment as Fragment$1 } from "prosemirror-model";
import { ReplaceStep } from "prosemirror-transform";
import Multiselect from "@vueform/multiselect";
import { stripHtml } from "string-strip-html";
import "slugify";
import { format } from "date-fns";
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const buildAssetsDir = () => appConfig.buildAssetsDir;
const buildAssetsURL = (...path) => joinURL(publicAssetsURL(), buildAssetsDir(), ...path);
const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
};
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
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
      var _a;
      if (prop === "public") {
        return target.public;
      }
      return (_a = target[prop]) != null ? _a : target.public[prop];
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
const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a = options.server) != null ? _a : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  if (options.defer) {
    console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC.");
  }
  options.lazy = (_d = (_c = options.lazy) != null ? _c : options.defer) != null ? _d : false;
  options.initialCache = (_e = options.initialCache) != null ? _e : true;
  options.immediate = (_f = options.immediate) != null ? _f : true;
  const nuxt = useNuxtApp();
  const useInitialCache = () => (nuxt.isHydrating || options.initialCache) && nuxt.payload.data[key] !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref(useInitialCache() ? nuxt.payload.data[key] : (_h = (_g = options.default) == null ? void 0 : _g.call(options)) != null ? _h : null),
      pending: ref(!useInitialCache()),
      error: ref((_i = nuxt.payload._errors[key]) != null ? _i : null)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      return nuxt._asyncDataPromises[key];
    }
    if (opts._initial && useInitialCache()) {
      return nuxt.payload.data[key];
    }
    asyncData.pending.value = true;
    nuxt._asyncDataPromises[key] = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((result) => {
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a2, _b2;
      asyncData.error.value = error;
      asyncData.data.value = unref((_b2 = (_a2 = options.default) == null ? void 0 : _a2.call(options)) != null ? _b2 : null);
    }).finally(() => {
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = true;
      }
      delete nuxt._asyncDataPromises[key];
    });
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    onServerPrefetch(() => promise);
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
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
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name2, _opts) {
  var _a, _b;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref((_b = cookies[name2]) != null ? _b : (_a = opts.default) == null ? void 0 : _a.call(opts));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual(cookie.value, cookies[name2])) {
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
  var _a;
  {
    return parse(((_a = useRequestEvent()) == null ? void 0 : _a.req.headers.cookie) || "", opts);
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
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
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
      return () => {
        var _a, _b, _c;
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
        const href = typeof to.value === "object" ? (_b = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _b : null : to.value || null;
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
        return h("a", { href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$1 = defineNuxtLink({ componentName: "NuxtLink" });
const inlineConfig = {};
defuFn(inlineConfig);
function useHead(meta2) {
  const resolvedMeta = isFunction$1(meta2) ? computed(meta2) : meta2;
  useNuxtApp()._useHead(resolvedMeta);
}
const tailwind = "";
const main$1 = "";
const components = {};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name2 in components) {
    nuxtApp.vueApp.component(name2, components[name2]);
    nuxtApp.vueApp.component("Lazy" + name2, components[name2]);
  }
});
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var BODY_TAG_ATTR_NAME = `data-meta-body`;
var createElement = (tag, attrs, document2) => {
  const el = document2.createElement(tag);
  for (const key of Object.keys(attrs)) {
    if (key === "body" && attrs.body === true) {
      el.setAttribute(BODY_TAG_ATTR_NAME, "true");
    } else {
      let value = attrs[key];
      if (key === "renderPriority" || key === "key" || value === false) {
        continue;
      }
      if (key === "children") {
        el.textContent = value;
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  return el;
};
var stringifyAttrName = (str) => str.replace(/[\s"'><\/=]/g, "").replace(/[^a-zA-Z0-9_-]/g, "");
var stringifyAttrValue = (str) => str.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var stringifyAttrs = (attributes) => {
  const handledAttributes = [];
  for (let [key, value] of Object.entries(attributes)) {
    if (key === "children" || key === "key") {
      continue;
    }
    if (value === false || value == null) {
      continue;
    }
    let attribute = stringifyAttrName(key);
    if (value !== true) {
      attribute += `="${stringifyAttrValue(String(value))}"`;
    }
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
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
var tagDedupeKey = (tag) => {
  if (!["meta", "base", "script", "link"].includes(tag.tag)) {
    return false;
  }
  const { props, tag: tagName } = tag;
  if (tagName === "base") {
    return "base";
  }
  if (tagName === "link" && props.rel === "canonical") {
    return "canonical";
  }
  if (props.charset) {
    return "charset";
  }
  const name2 = ["key", "id", "name", "property", "http-equiv"];
  for (const n of name2) {
    let value = void 0;
    if (typeof props.getAttribute === "function" && props.hasAttribute(n)) {
      value = props.getAttribute(n);
    } else {
      value = props[n];
    }
    if (value !== void 0) {
      return `${tagName}-${n}-${value}`;
    }
  }
  return false;
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "noscript",
  "htmlAttrs",
  "bodyAttrs"
];
var renderTemplate = (template, title) => {
  if (template == null)
    return "";
  if (typeof template === "string") {
    return template.replace("%s", title != null ? title : "");
  }
  return template(unref(title));
};
var headObjToTags = (obj) => {
  const tags = [];
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (obj[key] == null)
      continue;
    switch (key) {
      case "title":
        tags.push({ tag: key, props: { children: obj[key] } });
        break;
      case "titleTemplate":
        break;
      case "base":
        tags.push({ tag: key, props: { key: "default", ...obj[key] } });
        break;
      default:
        if (acceptFields.includes(key)) {
          const value = obj[key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              tags.push({ tag: key, props: unref(item) });
            });
          } else if (value) {
            tags.push({ tag: key, props: value });
          }
        }
        break;
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs)) {
        el.removeAttribute(key);
      }
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys.push(key);
  }
  if (keys.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var updateElements = (document2 = window.document, type, tags) => {
  var _a, _b;
  const head = document2.head;
  const body = document2.body;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  let bodyMetaElements = body.querySelectorAll(`[${BODY_TAG_ATTR_NAME}]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldHeadElements = [];
  const oldBodyElements = [];
  if (bodyMetaElements) {
    for (let i = 0; i < bodyMetaElements.length; i++) {
      if (bodyMetaElements[i] && ((_a = bodyMetaElements[i].tagName) == null ? void 0 : _a.toLowerCase()) === type) {
        oldBodyElements.push(bodyMetaElements[i]);
      }
    }
  }
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_b = j == null ? void 0 : j.tagName) == null ? void 0 : _b.toLowerCase()) === type) {
        oldHeadElements.push(j);
      }
    }
  } else {
    headCountEl = document2.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => {
    var _a2;
    return {
      element: createElement(tag.tag, tag.props, document2),
      body: (_a2 = tag.props.body) != null ? _a2 : false
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
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  oldHeadElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  newElements.forEach((t) => {
    if (t.body === true) {
      body.insertAdjacentElement("beforeend", t.element);
    } else {
      head.insertBefore(t.element, headCountEl);
    }
  });
  headCountEl.setAttribute(
    "content",
    "" + (headCount - oldHeadElements.length + newElements.filter((t) => !t.body).length)
  );
};
var createHead = (initHeadObject) => {
  let allHeadObjs = [];
  let previousTags = /* @__PURE__ */ new Set();
  if (initHeadObject) {
    allHeadObjs.push(shallowRef(initHeadObject));
  }
  const head = {
    install(app) {
      app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      const deduping = {};
      const titleTemplate = allHeadObjs.map((i) => unref(i).titleTemplate).reverse().find((i) => i != null);
      allHeadObjs.forEach((objs, headObjectIdx) => {
        const tags = headObjToTags(unref(objs));
        tags.forEach((tag, tagIdx) => {
          tag._position = headObjectIdx * 1e4 + tagIdx;
          if (titleTemplate && tag.tag === "title") {
            tag.props.children = renderTemplate(
              titleTemplate,
              tag.props.children
            );
          }
          const dedupeKey = tagDedupeKey(tag);
          if (dedupeKey) {
            deduping[dedupeKey] = tag;
          } else {
            deduped.push(tag);
          }
        });
      });
      deduped.push(...Object.values(deduping));
      return deduped.sort((a, b) => a._position - b._position);
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document2 = window.document) {
      let title;
      let htmlAttrs = {};
      let bodyAttrs = {};
      const actualTags = {};
      for (const tag of head.headTags.sort(sortTags)) {
        if (tag.tag === "title") {
          title = tag.props.children;
          continue;
        }
        if (tag.tag === "htmlAttrs") {
          Object.assign(htmlAttrs, tag.props);
          continue;
        }
        if (tag.tag === "bodyAttrs") {
          Object.assign(bodyAttrs, tag.props);
          continue;
        }
        actualTags[tag.tag] = actualTags[tag.tag] || [];
        actualTags[tag.tag].push(tag);
      }
      if (title !== void 0) {
        document2.title = title;
      }
      setAttrs(document2.documentElement, htmlAttrs);
      setAttrs(document2.body, bodyAttrs);
      const tags = /* @__PURE__ */ new Set([...Object.keys(actualTags), ...previousTags]);
      for (const tag of tags) {
        updateElements(document2, tag, actualTags[tag] || []);
      }
      previousTags.clear();
      Object.keys(actualTags).forEach((i) => previousTags.add(i));
    }
  };
  return head;
};
var tagToString = (tag) => {
  let isBodyTag = false;
  if (tag.props.body) {
    isBodyTag = true;
    delete tag.props.body;
  }
  if (tag.props.renderPriority) {
    delete tag.props.renderPriority;
  }
  let attrs = stringifyAttrs(tag.props);
  if (SELF_CLOSING_TAGS.includes(tag.tag)) {
    return `<${tag.tag}${attrs}${isBodyTag ? `  ${BODY_TAG_ATTR_NAME}="true"` : ""}>`;
  }
  return `<${tag.tag}${attrs}${isBodyTag ? ` ${BODY_TAG_ATTR_NAME}="true"` : ""}>${tag.props.children || ""}</${tag.tag}>`;
};
var sortTags = (aTag, bTag) => {
  const tagWeight = (tag) => {
    if (tag.props.renderPriority) {
      return tag.props.renderPriority;
    }
    switch (tag.tag) {
      case "base":
        return -1;
      case "meta":
        if (tag.props.charset) {
          return -2;
        }
        if (tag.props["http-equiv"] === "content-security-policy") {
          return 0;
        }
        return 10;
      default:
        return 10;
    }
  };
  return tagWeight(aTag) - tagWeight(bTag);
};
var renderHeadToString = (head) => {
  const tags = [];
  let titleTag = "";
  let htmlAttrs = {};
  let bodyAttrs = {};
  let bodyTags = [];
  for (const tag of head.headTags.sort(sortTags)) {
    if (tag.tag === "title") {
      titleTag = tagToString(tag);
    } else if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
    } else if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
    } else if (tag.props.body) {
      bodyTags.push(tagToString(tag));
    } else {
      tags.push(tagToString(tag));
    }
  }
  tags.push(`<meta name="${HEAD_COUNT_KEY}" content="${tags.length}">`);
  return {
    get headTags() {
      return titleTag + tags.join("");
    },
    get htmlAttrs() {
      return stringifyAttrs({
        ...htmlAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(htmlAttrs).join(",")
      });
    },
    get bodyAttrs() {
      return stringifyAttrs({
        ...bodyAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(bodyAttrs).join(",")
      });
    },
    get bodyTags() {
      return bodyTags.join("");
    }
  };
};
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  nuxtApp.vueApp.use(head);
  nuxtApp.hooks.hookOnce("app:mounted", () => {
    watchEffect(() => {
      head.updateDOM();
    });
  });
  nuxtApp._useHead = (_meta) => {
    const meta2 = ref(_meta);
    const headObj = computed(() => {
      const overrides = { meta: [] };
      if (meta2.value.charset) {
        overrides.meta.push({ key: "charset", charset: meta2.value.charset });
      }
      if (meta2.value.viewport) {
        overrides.meta.push({ name: "viewport", content: meta2.value.viewport });
      }
      return defu(overrides, meta2.value);
    });
    head.addHeadObjs(headObj);
    {
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = () => {
      const meta2 = renderHeadToString(head);
      return {
        ...meta2,
        bodyScripts: meta2.bodyTags
      };
    };
  }
});
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Script = defineComponent({
  name: "Script",
  inheritAttrs: false,
  props: {
    ...globalProps,
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    fetchpriority: String,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String
  },
  setup: setupForUseMeta((script) => ({
    script: [script]
  }))
});
const NoScript = defineComponent({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    title: String
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a;
    const noscript = { ...props };
    const textContent = (((_a = slots.default) == null ? void 0 : _a.call(slots)) || []).filter(({ children }) => children).map(({ children }) => children).join("");
    if (textContent) {
      noscript.children = textContent;
    }
    return {
      noscript: [noscript]
    };
  })
});
const Link$2 = defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String
  },
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Meta = defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String
  },
  setup: setupForUseMeta((props) => {
    const meta2 = { ...props };
    if (meta2.httpEquiv) {
      meta2["http-equiv"] = meta2.httpEquiv;
      delete meta2.httpEquiv;
    }
    return {
      meta: [meta2]
    };
  })
});
const Style = defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a, _b, _c;
    const style = { ...props };
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const Html = defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const Components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Script,
  NoScript,
  Link: Link$2,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body
}, Symbol.toStringTag, { value: "Module" }));
const appHead = { "meta": [], "link": [], "style": [], "script": [], "noscript": [], "charset": "utf-8", "viewport": "width=device-width, initial-scale=1" };
const appLayoutTransition = { "name": "layout", "mode": "out-in" };
const appPageTransition = { "name": "page", "mode": "out-in" };
const appKeepalive = false;
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
    const source = typeof options.head === "function" ? computed(() => options.head(nuxtApp)) : options.head;
    useHead(source);
  }
};
const node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2 = defineNuxtPlugin((nuxtApp) => {
  useHead(markRaw({ title: "", ...appHead }));
  nuxtApp.vueApp.mixin(metaMixin);
  for (const name2 in Components) {
    nuxtApp.vueApp.component(name2, Components[name2]);
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = defineComponent({
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const isNestedKey = Symbol("isNested");
const NuxtPage = defineComponent({
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
    const isNested = inject(isNestedKey, false);
    provide(isNestedKey, true);
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a, _b, _c, _d;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          const transitionProps = (_b = (_a = props.transition) != null ? _a : routeProps.route.meta.pageTransition) != null ? _b : appPageTransition;
          return _wrapIf(
            Transition,
            transitionProps,
            wrapInKeepAlive(
              (_d = (_c = props.keepalive) != null ? _c : routeProps.route.meta.keepalive) != null ? _d : appKeepalive,
              isNested && nuxtApp.isHydrating ? h(Component, { key, routeProps, pageKey: key, hasTransition: !!transitionProps }) : h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component)
              }, { default: () => h(Component, { key, routeProps, pageKey: key, hasTransition: !!transitionProps }) })
            )
          ).default();
        }
      });
    };
  }
});
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
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$i = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    viewBox: "0 0 100 100",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path d="M0 50C0 8.825 8.825 0 50 0C91.175 0 100 8.825 100 50C100 91.175 91.175 100 50 100C8.825 100 0 91.175 0 50Z" fill="#2D2D2D"></path><path d="M29.4375 30.4688H46.25V72.9375H29.4375V30.4688ZM51.4375 42.0312C51.4375 37.4271 52.6042 34.3333 54.9375 32.75C57.1458 31.2708 61.3021 30.5312 67.4062 30.5312H70.5625V36.4375C70.5625 41.1458 69.3646 44.5 66.9688 46.5C64.5312 48.5 60.3333 49.5 54.375 49.5H51.4375V42.0312ZM51.4375 52.75H54.375C60.25 52.75 64.4479 53.9167 66.9688 56.25C69.3646 58.4792 70.5625 62 70.5625 66.8125V73H67.4062C61.4271 73 57.2708 72.1042 54.9375 70.3125C52.6042 68.5 51.4375 65.25 51.4375 60.5625V52.75Z" fill="white"></path></svg>`);
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Logo.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$h = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Logo = __nuxt_component_1$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-20 flex flex-col justify-center w-full items-center" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Logo, { class: "w-12 h-12 animate-spin animate-duration-1500 animate-ease-in-out" }, null, _parent));
  _push(`<div class="mt-12 font-medium text-gray-400 flex"><p class="mr-2">Tips:</p><p>\u2318 + K to search for commands</p></div></div>`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Loader.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender]]);
const useSupabaseUser = () => useState("supabase_user");
const version$6 = "1.35.7";
const DEFAULT_HEADERS$4 = { "X-Client-Info": `supabase-js/${version$6}` };
const STORAGE_KEY$1 = "supabase.auth.token";
function stripTrailingSlash(url2) {
  return url2.replace(/\/$/, "");
}
const isBrowser$1 = () => false;
const version$5 = "1.23.1";
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
  var _a, _b, _c;
  return serialize(cookie.name, cookie.value, {
    maxAge: cookie.maxAge,
    expires: new Date(Date.now() + cookie.maxAge * 1e3),
    httpOnly: true,
    secure,
    path: (_a = cookie.path) !== null && _a !== void 0 ? _a : "/",
    domain: (_b = cookie.domain) !== null && _b !== void 0 ? _b : "",
    sameSite: (_c = cookie.sameSite) !== null && _c !== void 0 ? _c : "lax"
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
  var _a;
  if (!url2)
    url2 = ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.href) || "";
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
      return yield (yield import("cross-fetch")).fetch(...args);
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
    var _a;
    return (_a = this.cookieOptions.name) !== null && _a !== void 0 ? _a : "";
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
    var _a;
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = "";
        if (options.redirectTo) {
          queryString += "?redirect_to=" + encodeURIComponent(options.redirectTo);
        }
        const shouldCreateUser = (_a = options.shouldCreateUser) !== null && _a !== void 0 ? _a : true;
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
    var _a;
    return __awaiter$a(this, void 0, void 0, function* () {
      try {
        const shouldCreateUser = (_a = options.shouldCreateUser) !== null && _a !== void 0 ? _a : true;
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
        var _a;
        return {
          name: `${this.cookieName()}-${token.key}`,
          value: token.value,
          domain: this.cookieOptions.domain,
          maxAge: (_a = this.cookieOptions.lifetime) !== null && _a !== void 0 ? _a : 0,
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
        var _a;
        return {
          name: `${this.cookieName()}-${token.key}`,
          value: token.value,
          domain: this.cookieOptions.domain,
          maxAge: (_a = this.cookieOptions.lifetime) !== null && _a !== void 0 ? _a : 0,
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
              var _a;
              return {
                name: `${this.cookieName()}-${token.key}`,
                value: token.value,
                domain: this.cookieOptions.domain,
                maxAge: (_a = this.cookieOptions.lifetime) !== null && _a !== void 0 ? _a : 0,
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
const DEFAULT_OPTIONS$2 = {
  url: GOTRUE_URL,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  multiTab: true,
  headers: DEFAULT_HEADERS$3
};
class GoTrueClient {
  constructor(options) {
    this.stateChangeEmitters = /* @__PURE__ */ new Map();
    this.networkRetries = 0;
    const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS$2), options);
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
    var _a;
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        if (!((_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token))
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
    var _a;
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        if (!((_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token))
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
  setSession(refresh_token) {
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        if (!refresh_token) {
          throw new Error("No current session.");
        }
        const { data, error } = yield this.api.refreshAccessToken(refresh_token);
        if (error) {
          return { session: null, error };
        }
        this._saveSession(data);
        this._notifyAllSubscribers("SIGNED_IN");
        return { session: data, error: null };
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
    var _a;
    return __awaiter$9(this, void 0, void 0, function* () {
      const accessToken = (_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token;
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
    var _a, _b;
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        const { data, error } = yield this.api.signInWithEmail(email, password, {
          redirectTo: options.redirectTo,
          captchaToken: options.captchaToken
        });
        if (error || !data)
          return { data: null, user: null, session: null, error };
        if (((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.confirmed_at) || ((_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.email_confirmed_at)) {
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
    var _a;
    return __awaiter$9(this, void 0, void 0, function* () {
      try {
        const { data, error } = yield this.api.signInWithPhone(phone, password, options);
        if (error || !data)
          return { data: null, user: null, session: null, error };
        if ((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.phone_confirmed_at) {
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
    var _a;
    if (refresh_token === void 0) {
      refresh_token = (_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.refresh_token;
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
        var _a;
        if (e.key === STORAGE_KEY) {
          const newSession = JSON.parse(String(e.newValue));
          if ((_a = newSession === null || newSession === void 0 ? void 0 : newSession.currentSession) === null || _a === void 0 ? void 0 : _a.access_token) {
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
        return yield (yield import("cross-fetch")).fetch(...args);
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
      var _a, _b, _c, _d;
      let error = null;
      let data = null;
      let count = null;
      let status = res2.status;
      let statusText = res2.statusText;
      if (res2.ok) {
        const isReturnMinimal = (_a = this.headers["Prefer"]) === null || _a === void 0 ? void 0 : _a.split(",").includes("return=minimal");
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
        const countHeader = (_b = this.headers["Prefer"]) === null || _b === void 0 ? void 0 : _b.match(/count=(exact|planned|estimated)/);
        const contentRange = (_c = res2.headers.get("content-range")) === null || _c === void 0 ? void 0 : _c.split("/");
        if (countHeader && contentRange && contentRange.length > 1) {
          count = parseInt(contentRange[1]);
        }
      } else {
        const body = yield res2.text();
        try {
          error = JSON.parse(body);
        } catch (_e) {
          error = {
            message: body
          };
        }
        if (error && this.allowEmpty && ((_d = error === null || error === void 0 ? void 0 : error.details) === null || _d === void 0 ? void 0 : _d.includes("Results contain 0 rows"))) {
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
  var _a;
  const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
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
  return noop$3(value);
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
      return noop$3(value);
    default:
      return noop$3(value);
  }
};
const noop$3 = (value) => {
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
var noop$2 = utils$3.noop = function() {
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
  logFunction.printOutput = noop$2;
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
    var _a;
    if (this._hasReceived(status)) {
      callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
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
const noop$1 = () => {
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
    this.logger = noop$1;
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
        var _a;
        (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
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
    var _a;
    if (!this.isConnected()) {
      return;
    }
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null;
      this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
      (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(WS_CLOSE_NORMAL, "hearbeat timeout");
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
      return yield (yield import("cross-fetch")).fetch(...args);
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
      return yield (yield import("cross-fetch")).fetch(...args);
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
const DEFAULT_OPTIONS$1 = {
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
    const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS$1), options);
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
    var _a, _b;
    const headers = Object.assign({}, this.headers);
    const authBearer = (_b = (_a = this.auth.session()) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : this.supabaseKey;
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
        var _a, _b, _c;
        if (e.key === STORAGE_KEY$1) {
          const newSession = JSON.parse(String(e.newValue));
          const accessToken = (_b = (_a = newSession === null || newSession === void 0 ? void 0 : newSession.currentSession) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : void 0;
          const previousAccessToken = (_c = this.auth.session()) === null || _c === void 0 ? void 0 : _c.access_token;
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
const isClient = false;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const noop = () => {
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
  const _a = options, {
    eventFilter = bypassFilter
  } = _a, watchOptions = __objRest$5(_a, [
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
  const _a = options, {
    eventFilter: filter
  } = _a, watchOptions = __objRest$1(_a, [
    "eventFilter"
  ]);
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter);
  const stop = watchWithFilter(source, cb, __spreadProps$2(__spreadValues$2({}, watchOptions), {
    eventFilter
  }));
  return { stop, pause, resume, isActive };
}
function unrefElement(elRef) {
  var _a;
  const plain = resolveUnref(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = isClient ? window : void 0;
const defaultDocument = isClient ? window.document : void 0;
isClient ? window.navigator : void 0;
isClient ? window.location : void 0;
function useEventListener(...args) {
  let target;
  let event;
  let listener;
  let options;
  if (isString(args[0])) {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }
  if (!target)
    return noop;
  let cleanup = noop;
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options);
    cleanup = () => {
      el.removeEventListener(event, listener, options);
      cleanup = noop;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore, capture = true, detectIframe = false } = options;
  if (!window2)
    return;
  const shouldListen = ref(true);
  let fallback;
  const listener = (event) => {
    window2.clearTimeout(fallback);
    const el = unrefElement(target);
    if (!el || el === event.target || event.composedPath().includes(el) || !shouldListen.value)
      return;
    handler(event);
  };
  const shouldIgnore = (event) => {
    return ignore && ignore.some((target2) => {
      const el = unrefElement(target2);
      return el && (event.target === el || event.composedPath().includes(el));
    });
  };
  const cleanup = [
    useEventListener(window2, "click", listener, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      shouldListen.value = !!el && !e.composedPath().includes(el) && !shouldIgnore(e);
    }, { passive: true }),
    useEventListener(window2, "pointerup", (e) => {
      if (e.button === 0) {
        const path = e.composedPath();
        e.composedPath = () => path;
        fallback = window2.setTimeout(() => listener(e), 50);
      }
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      var _a;
      const el = unrefElement(target);
      if (((_a = document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(document.activeElement)))
        handler(event);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}
const createKeyPredicate = (keyFilter) => {
  if (typeof keyFilter === "function")
    return keyFilter;
  else if (typeof keyFilter === "string")
    return (event) => event.key === keyFilter;
  else if (Array.isArray(keyFilter))
    return (event) => keyFilter.includes(event.key);
  return () => true;
};
function onKeyStroke(...args) {
  let key;
  let handler;
  let options = {};
  if (args.length === 3) {
    key = args[0];
    handler = args[1];
    options = args[2];
  } else if (args.length === 2) {
    if (typeof args[1] === "object") {
      key = true;
      handler = args[0];
      options = args[1];
    } else {
      key = args[0];
      handler = args[1];
    }
  } else {
    key = true;
    handler = args[0];
  }
  const { target = defaultWindow, eventName = "keydown", passive = false } = options;
  const predicate = createKeyPredicate(key);
  const listener = (e) => {
    if (predicate(e))
      handler(e);
  };
  return useEventListener(target, eventName, listener, passive);
}
const defaults = {
  array: (v) => JSON.stringify(v),
  object: (v) => JSON.stringify(v),
  set: (v) => JSON.stringify(Array.from(v)),
  map: (v) => JSON.stringify(Object.fromEntries(v)),
  null: () => ""
};
function getDefaultSerialization(target) {
  if (!target)
    return defaults.null;
  if (target instanceof Map)
    return defaults.map;
  else if (target instanceof Set)
    return defaults.set;
  else if (Array.isArray(target))
    return defaults.array;
  else
    return defaults.object;
}
function useBase64(target, options) {
  const base64 = ref("");
  const promise = ref();
  function execute() {
    if (!isClient)
      return;
    promise.value = new Promise((resolve, reject) => {
      try {
        const _target = resolveUnref(target);
        if (_target == null) {
          resolve("");
        } else if (typeof _target === "string") {
          resolve(blobToBase64(new Blob([_target], { type: "text/plain" })));
        } else if (_target instanceof Blob) {
          resolve(blobToBase64(_target));
        } else if (_target instanceof ArrayBuffer) {
          resolve(window.btoa(String.fromCharCode(...new Uint8Array(_target))));
        } else if (_target instanceof HTMLCanvasElement) {
          resolve(_target.toDataURL(options == null ? void 0 : options.type, options == null ? void 0 : options.quality));
        } else if (_target instanceof HTMLImageElement) {
          const img = _target.cloneNode(false);
          img.crossOrigin = "Anonymous";
          imgLoaded(img).then(() => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL(options == null ? void 0 : options.type, options == null ? void 0 : options.quality));
          }).catch(reject);
        } else if (typeof _target === "object") {
          const _serializeFn = (options == null ? void 0 : options.serializer) || getDefaultSerialization(_target);
          const serialized = _serializeFn(_target);
          return resolve(blobToBase64(new Blob([serialized], { type: "application/json" })));
        } else {
          reject(new Error("target is unsupported types"));
        }
      } catch (error) {
        reject(error);
      }
    });
    promise.value.then((res) => base64.value = res);
    return promise.value;
  }
  if (isRef(target) || isFunction(target))
    watch(target, execute, { immediate: true });
  else
    execute();
  return {
    base64,
    promise,
    execute
  };
}
function imgLoaded(img) {
  return new Promise((resolve, reject) => {
    if (!img.complete) {
      img.onload = () => {
        resolve();
      };
      img.onerror = reject;
    } else {
      resolve();
    }
  });
}
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = (e) => {
      resolve(e.target.result);
    };
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
const handlers = _global[globalKey];
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : Array.isArray(rawInit) ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
var __defProp$j = Object.defineProperty;
var __getOwnPropSymbols$l = Object.getOwnPropertySymbols;
var __hasOwnProp$l = Object.prototype.hasOwnProperty;
var __propIsEnum$l = Object.prototype.propertyIsEnumerable;
var __defNormalProp$j = (obj, key, value) => key in obj ? __defProp$j(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$j = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$l.call(b, prop))
      __defNormalProp$j(a, prop, b[prop]);
  if (__getOwnPropSymbols$l)
    for (var prop of __getOwnPropSymbols$l(b)) {
      if (__propIsEnum$l.call(b, prop))
        __defNormalProp$j(a, prop, b[prop]);
    }
  return a;
};
const StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v))
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString()
  }
};
function useStorage(key, defaults2, storage, options = {}) {
  var _a;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window: window2 = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e);
    }
  } = options;
  const data = (shallow ? shallowRef : ref)(defaults2);
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a2;
        return (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  if (!storage)
    return data;
  const rawInit = resolveUnref(defaults2);
  const type = guessSerializerType(rawInit);
  const serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, () => write(data.value), { flush, deep, eventFilter });
  if (window2 && listenToStorageChanges)
    useEventListener(window2, "storage", update);
  update();
  return data;
  function write(v) {
    try {
      if (v == null)
        storage.removeItem(key);
      else
        storage.setItem(key, serializer.write(v));
    } catch (e) {
      onError(e);
    }
  }
  function read(event) {
    if (event && event.key !== key)
      return;
    pauseWatch();
    try {
      const rawValue = event ? event.newValue : storage.getItem(key);
      if (rawValue == null) {
        if (writeDefaults && rawInit !== null)
          storage.setItem(key, serializer.write(rawInit));
        return rawInit;
      } else if (!event && mergeDefaults) {
        const value = serializer.read(rawValue);
        if (isFunction(mergeDefaults))
          return mergeDefaults(value, rawInit);
        else if (type === "object" && !Array.isArray(value))
          return __spreadValues$j(__spreadValues$j({}, rawInit), value);
        return value;
      } else if (typeof rawValue !== "string") {
        return rawValue;
      } else {
        return serializer.read(rawValue);
      }
    } catch (e) {
      onError(e);
    } finally {
      resumeWatch();
    }
  }
  function update(event) {
    if (event && event.key !== key)
      return;
    data.value = read(event);
  }
}
var __defProp$b = Object.defineProperty;
var __getOwnPropSymbols$c = Object.getOwnPropertySymbols;
var __hasOwnProp$c = Object.prototype.hasOwnProperty;
var __propIsEnum$c = Object.prototype.propertyIsEnumerable;
var __defNormalProp$b = (obj, key, value) => key in obj ? __defProp$b(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$b = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$c.call(b, prop))
      __defNormalProp$b(a, prop, b[prop]);
  if (__getOwnPropSymbols$c)
    for (var prop of __getOwnPropSymbols$c(b)) {
      if (__propIsEnum$c.call(b, prop))
        __defNormalProp$b(a, prop, b[prop]);
    }
  return a;
};
const DEFAULT_OPTIONS = {
  multiple: true,
  accept: "*"
};
function useFileDialog(options = {}) {
  const {
    document: document2 = defaultDocument
  } = options;
  const files = ref(null);
  let input;
  if (document2) {
    input = document2.createElement("input");
    input.type = "file";
    input.onchange = (event) => {
      const result = event.target;
      files.value = result.files;
    };
  }
  const open = (localOptions) => {
    if (!input)
      return;
    const _options = __spreadValues$b(__spreadValues$b(__spreadValues$b({}, DEFAULT_OPTIONS), options), localOptions);
    input.multiple = _options.multiple;
    input.accept = _options.accept;
    if (hasOwn(_options, "capture"))
      input.capture = _options.capture;
    input.click();
  };
  const reset = () => {
    files.value = null;
    if (input)
      input.value = "";
  };
  return {
    files: readonly(files),
    open,
    reset
  };
}
function useLocalStorage(key, initialValue, options = {}) {
  const { window: window2 = defaultWindow } = options;
  return useStorage(key, initialValue, window2 == null ? void 0 : window2.localStorage, options);
}
const DefaultMagicKeysAliasMap = {
  ctrl: "control",
  command: "meta",
  cmd: "meta",
  option: "alt",
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright"
};
function useMagicKeys(options = {}) {
  const {
    reactive: useReactive = false,
    target = defaultWindow,
    aliasMap = DefaultMagicKeysAliasMap,
    passive = true,
    onEventFired = noop
  } = options;
  const current = reactive(/* @__PURE__ */ new Set());
  const obj = { toJSON() {
    return {};
  }, current };
  const refs = useReactive ? reactive(obj) : obj;
  const metaDeps = /* @__PURE__ */ new Set();
  const usedKeys = /* @__PURE__ */ new Set();
  function setRefs(key, value) {
    if (key in refs) {
      if (useReactive)
        refs[key] = value;
      else
        refs[key].value = value;
    }
  }
  function reset() {
    for (const key of usedKeys)
      setRefs(key, false);
  }
  function updateRefs(e, value) {
    var _a, _b;
    const key = (_a = e.key) == null ? void 0 : _a.toLowerCase();
    const code = (_b = e.code) == null ? void 0 : _b.toLowerCase();
    const values = [code, key].filter(Boolean);
    if (key) {
      if (value)
        current.add(key);
      else
        current.delete(key);
    }
    for (const key2 of values) {
      usedKeys.add(key2);
      setRefs(key2, value);
    }
    if (key === "meta" && !value) {
      metaDeps.forEach((key2) => {
        current.delete(key2);
        setRefs(key2, false);
      });
      metaDeps.clear();
    } else if (typeof e.getModifierState === "function" && e.getModifierState("Meta") && value) {
      [...current, ...values].forEach((key2) => metaDeps.add(key2));
    }
  }
  useEventListener(target, "keydown", (e) => {
    updateRefs(e, true);
    return onEventFired(e);
  }, { passive });
  useEventListener(target, "keyup", (e) => {
    updateRefs(e, false);
    return onEventFired(e);
  }, { passive });
  useEventListener("blur", reset, { passive: true });
  useEventListener("focus", reset, { passive: true });
  const proxy = new Proxy(refs, {
    get(target2, prop, rec) {
      if (typeof prop !== "string")
        return Reflect.get(target2, prop, rec);
      prop = prop.toLowerCase();
      if (prop in aliasMap)
        prop = aliasMap[prop];
      if (!(prop in refs)) {
        if (/[+_-]/.test(prop)) {
          const keys = prop.split(/[+_-]/g).map((i) => i.trim());
          refs[prop] = computed(() => keys.every((key) => unref(proxy[key])));
        } else {
          refs[prop] = ref(false);
        }
      }
      const r = Reflect.get(target2, prop, rec);
      return useReactive ? unref(r) : r;
    }
  });
  return proxy;
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
__spreadValues({
  linear: identity
}, _TransitionPresets);
const constructUrl = (post2, subdomain = false) => {
  var _a, _b, _c;
  if (subdomain)
    return `/${post2.slug}`;
  {
    if ((_b = (_a = post2 == null ? void 0 : post2.profiles) == null ? void 0 : _a.domains) == null ? void 0 : _b.active)
      return `https://${post2.profiles.domains.url}/${post2.slug}`;
    else
      return `https://${(_c = post2 == null ? void 0 : post2.profiles) == null ? void 0 : _c.username}.keypress.blog/${post2.slug}`;
  }
};
const removeVietnameseTones = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  str = str.replace(/\u02C6|\u0306|\u031B/g, "");
  str = str.replace(/ + /g, " ");
  str = str.trim();
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
};
const meta$d = {
  middleware: "auth"
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    loading: Boolean
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        "data-loading": __props.loading,
        disabled: __props.loading,
        class: "btn-loader"
      }, _ctx.$attrs, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const Button_vue_vue_type_style_index_0_lang = "";
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Button.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const meta$c = void 0;
const meta$b = void 0;
const meta$a = void 0;
const meta$9 = void 0;
const Document = Node.create({
  name: "doc",
  topNode: true,
  content: "block+"
});
const Placeholder$1 = Extension.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something \u2026",
      showOnlyWhenEditable: true,
      showOnlyCurrent: true,
      includeChildren: false
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: ({ doc, selection }) => {
            const active = this.editor.isEditable || !this.options.showOnlyWhenEditable;
            const { anchor } = selection;
            const decorations = [];
            if (!active) {
              return null;
            }
            doc.descendants((node, pos) => {
              const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
              const isEmpty = !node.isLeaf && !node.childCount;
              if ((hasAnchor || !this.options.showOnlyCurrent) && isEmpty) {
                const classes = [this.options.emptyNodeClass];
                if (this.editor.isEmpty) {
                  classes.push(this.options.emptyEditorClass);
                }
                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: classes.join(" "),
                  "data-placeholder": typeof this.options.placeholder === "function" ? this.options.placeholder({
                    editor: this.editor,
                    node,
                    pos,
                    hasAnchor
                  }) : this.options.placeholder
                });
                decorations.push(decoration);
              }
              return this.options.includeChildren;
            });
            return DecorationSet.create(doc, decorations);
          }
        }
      })
    ];
  }
});
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "TiptapHeading",
  __ssrInlineRender: true,
  props: {
    modelValue: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    var _a;
    const props = __props;
    const focusNextEditor = () => {
      const editors = document.querySelectorAll(".ProseMirror");
      let nextEditor = editors.item(1);
      if (nextEditor) {
        nextEditor.focus();
        return true;
      }
    };
    const Enter = Extension$1.create({
      addKeyboardShortcuts() {
        return {
          Enter: focusNextEditor,
          "Mod-Enter": focusNextEditor,
          ArrowDown: focusNextEditor
        };
      }
    });
    const CustomDocument = Document.extend({
      content: "heading"
    });
    const editor = useEditor({
      content: (_a = props.modelValue) != null ? _a : "",
      extensions: [
        CustomDocument,
        Text,
        Heading,
        Focus,
        Enter,
        History,
        Placeholder$1.configure({
          placeholder: "What\u2019s the title?"
        })
      ],
      autofocus: true,
      onUpdate(props2) {
        var _a2, _b;
        emit("update:modelValue", (_b = (_a2 = props2.editor.getJSON().content) == null ? void 0 : _a2[0].content) == null ? void 0 : _b[0].text);
      }
    });
    watch(
      () => props.modelValue,
      (newValue) => {
        var _a2, _b;
        const title = (_b = (_a2 = editor.value.getJSON().content) == null ? void 0 : _a2[0].content) == null ? void 0 : _b[0].text;
        const isSame = title === newValue;
        if (isSame)
          return;
        editor.value.commands.setContent(newValue, false);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(EditorContent), mergeProps({ editor: unref(editor) }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TiptapHeading.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Bubble",
  __ssrInlineRender: true,
  props: {
    editor: Object
  },
  setup(__props) {
    const props = __props;
    const nodeType = computed(() => {
      var _a, _b;
      const selection = props.editor.state.selection;
      const isImage = ((_a = selection.node) == null ? void 0 : _a.type.name) === "image";
      const isIframe = ((_b = selection.node) == null ? void 0 : _b.type.name) === "iframe";
      const isText = selection instanceof TextSelection;
      if (isImage)
        return "image";
      if (isIframe)
        return "iframe";
      if (isText)
        return "text";
      return void 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.editor) {
        _push(ssrRenderComponent(unref(BubbleMenu), mergeProps({
          editor: __props.editor,
          "tippy-options": { duration: 100 }
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="p-2 rounded-xl shadow-md bg-white"${_scopeId}>`);
              if (unref(nodeType) === "text") {
                _push2(`<div class="flex items-center space-x-1 text-xl text-gray-400"${_scopeId}><button class="${ssrRenderClass([{ "is-active": __props.editor.isActive("bold") }, "bubble-item"])}"${_scopeId}><div class="i-ic-round-format-bold"${_scopeId}></div></button><button class="${ssrRenderClass([{ "is-active": __props.editor.isActive("italic") }, "bubble-item"])}"${_scopeId}><div class="i-ic-round-format-italic"${_scopeId}></div></button><button class="${ssrRenderClass([{ "is-active": __props.editor.isActive("strike") }, "bubble-item"])}"${_scopeId}><div class="i-ic-round-format-strikethrough"${_scopeId}></div></button><button class="${ssrRenderClass([{ "is-active": __props.editor.isActive("underline") }, "bubble-item"])}"${_scopeId}><div class="i-ic-round-format-underlined"${_scopeId}></div></button></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(nodeType) === "image") {
                _push2(`<div${_scopeId}><button class="bubble-item"${_scopeId}>Edit</button></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(nodeType) === "iframe") {
                _push2(`<div${_scopeId}><button class="bubble-item"${_scopeId}>Edit</button><button${_scopeId}>Focus</button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "p-2 rounded-xl shadow-md bg-white" }, [
                  unref(nodeType) === "text" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center space-x-1 text-xl text-gray-400"
                  }, [
                    createVNode("button", {
                      class: ["bubble-item", { "is-active": __props.editor.isActive("bold") }],
                      onClick: ($event) => __props.editor.chain().focus().toggleBold().run()
                    }, [
                      createVNode("div", { class: "i-ic-round-format-bold" })
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      class: ["bubble-item", { "is-active": __props.editor.isActive("italic") }],
                      onClick: ($event) => __props.editor.chain().focus().toggleItalic().run()
                    }, [
                      createVNode("div", { class: "i-ic-round-format-italic" })
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      class: ["bubble-item", { "is-active": __props.editor.isActive("strike") }],
                      onClick: ($event) => __props.editor.chain().focus().toggleStrike().run()
                    }, [
                      createVNode("div", { class: "i-ic-round-format-strikethrough" })
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      class: ["bubble-item", { "is-active": __props.editor.isActive("underline") }],
                      onClick: ($event) => __props.editor.chain().focus().toggleUnderline().run()
                    }, [
                      createVNode("div", { class: "i-ic-round-format-underlined" })
                    ], 10, ["onClick"])
                  ])) : createCommentVNode("", true),
                  unref(nodeType) === "image" ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("button", {
                      class: "bubble-item",
                      onClick: ($event) => __props.editor.commands.openModal("image")
                    }, "Edit", 8, ["onClick"])
                  ])) : createCommentVNode("", true),
                  unref(nodeType) === "iframe" ? (openBlock(), createBlock("div", { key: 2 }, [
                    createVNode("button", {
                      class: "bubble-item",
                      onClick: ($event) => __props.editor.commands.openModal("iframe")
                    }, "Edit", 8, ["onClick"]),
                    createVNode("button", null, "Focus")
                  ])) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const Bubble_vue_vue_type_style_index_0_lang = "";
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tiptap/Bubble.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const Commands = Extension.create({
  name: "commands",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        }
      }
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        startOfLine: true,
        ...this.options.suggestion
      })
    ];
  }
});
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "CommandList",
  __ssrInlineRender: true,
  props: {
    items: {
      type: Array,
      required: true
    },
    command: {
      type: Function,
      required: true
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    const { items } = toRefs(props);
    const selectedIndex = ref(0);
    watch(items, () => selectedIndex.value = 0);
    const selectItem = (index) => {
      const item = items.value[index];
      if (item) {
        props.command(item);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        selectedIndex.value = (selectedIndex.value + items.value.length - 1) % items.value.length;
        return true;
      }
      if (event.key === "ArrowDown") {
        selectedIndex.value = (selectedIndex.value + 1) % items.value.length;
        return true;
      }
      if (event.key === "Enter") {
        selectItem(selectedIndex.value);
        return true;
      } else
        return;
    };
    expose({
      onKeyDown
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white px-2 py-4 rounded-xl shadow-xl flex flex-col w-72" }, _attrs))}>`);
      if (unref(items).length) {
        _push(`<!--[-->`);
        ssrRenderList(unref(items), (item, index) => {
          _push(`<button class="${ssrRenderClass([{ "!bg-light-300": index === selectedIndex.value }, "p-2 flex flex-col text-sm text-left rounded-lg bg-transparent transition"])}"><span>${ssrInterpolate(item.title)}</span><span class="opacity-40 text-xs">${ssrInterpolate(item.description)}</span></button>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="item">No result</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tiptap/CommandList.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const suggestion = {
  items: ({ query }) => {
    return [
      {
        title: "Heading 2",
        description: "Big section heading.",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
        }
      },
      {
        title: "Heading 3",
        description: "Medium section heading.",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
        }
      },
      {
        title: "Numbered List",
        description: "Create a list with numbering.",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).wrapInList("orderedList").run();
        }
      },
      {
        title: "Bulleted List",
        description: "Create a simple bulleted list.",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).wrapInList("bulletList").run();
        }
      },
      {
        title: "Image",
        description: "Upload or embed with link.",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).openModal("image").run();
        }
      },
      {
        title: "Iframe",
        description: "Embed website with link.",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).openModal("iframe").run();
        }
      }
    ].filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10);
  },
  render: () => {
    let component;
    let popup;
    return {
      onStart: (props) => {
        component = new VueRenderer(_sfc_main$d, {
          props,
          editor: props.editor
        });
        if (!props.clientRect) {
          return;
        }
        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start"
        });
      },
      onUpdate(props) {
        component.updateProps(props);
        if (!props.clientRect) {
          return;
        }
        popup[0].setProps({
          getReferenceClientRect: props.clientRect
        });
      },
      onKeyDown(props) {
        var _a;
        if (props.event.key === "Escape") {
          popup[0].hide();
          return true;
        }
        return (_a = component.ref) == null ? void 0 : _a.onKeyDown(props.event);
      },
      onExit() {
        popup[0].destroy();
        component.destroy();
      }
    };
  }
};
const HardBreak = Extension.create({
  addKeyboardShortcuts() {
    const defaultHandler = () => this.editor.commands.first(({ commands }) => [
      () => commands.newlineInCode(),
      () => commands.createParagraphNear(),
      () => commands.liftEmptyBlock(),
      () => commands.splitListItem("listItem"),
      () => commands.splitBlock()
    ]);
    const shiftEnter = () => {
      return this.editor.commands.first(({ commands }) => [
        () => commands.newlineInCode(),
        () => commands.createParagraphNear()
      ]);
    };
    const modEnter = () => {
      return this.editor.commands.first(({ commands }) => [
        () => commands.newlineInCode(),
        (a) => {
          commands.selectTextblockEnd();
          return commands.createParagraphNear();
        }
      ]);
    };
    return {
      Enter: defaultHandler,
      "Shift-Enter": shiftEnter,
      "Mod-Enter": modEnter
    };
  }
});
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
const Code = Extension.create({
  name: "code",
  addExtensions() {
    return [
      Code$1,
      CodeBlock,
      CodeBlockLowLight.configure({
        lowlight
      })
    ];
  }
});
function autolink(options) {
  return new Plugin({
    key: new PluginKey("autolink"),
    appendTransaction: (transactions, oldState, newState) => {
      const docChanges = transactions.some((transaction) => transaction.docChanged) && !oldState.doc.eq(newState.doc);
      const preventAutolink = transactions.some((transaction) => transaction.getMeta("preventAutolink"));
      if (!docChanges || preventAutolink) {
        return;
      }
      const { tr } = newState;
      const transform = combineTransactionSteps(oldState.doc, [...transactions]);
      const { mapping } = transform;
      const changes = getChangedRanges(transform);
      changes.forEach(({ oldRange, newRange }) => {
        getMarksBetween(oldRange.from, oldRange.to, oldState.doc).filter((item) => item.mark.type === options.type).forEach((oldMark) => {
          const newFrom = mapping.map(oldMark.from);
          const newTo = mapping.map(oldMark.to);
          const newMarks = getMarksBetween(newFrom, newTo, newState.doc).filter((item) => item.mark.type === options.type);
          if (!newMarks.length) {
            return;
          }
          const newMark = newMarks[0];
          const oldLinkText = oldState.doc.textBetween(oldMark.from, oldMark.to, void 0, " ");
          const newLinkText = newState.doc.textBetween(newMark.from, newMark.to, void 0, " ");
          const wasLink = test(oldLinkText);
          const isLink = test(newLinkText);
          if (wasLink && !isLink) {
            tr.removeMark(newMark.from, newMark.to, options.type);
          }
        });
        const nodesInChangedRanges = findChildrenInRange(newState.doc, newRange, (node) => node.isTextblock);
        let textBlock;
        let textBeforeWhitespace;
        if (nodesInChangedRanges.length > 1) {
          textBlock = nodesInChangedRanges[0];
          textBeforeWhitespace = newState.doc.textBetween(textBlock.pos, textBlock.pos + textBlock.node.nodeSize, void 0, " ");
        } else if (nodesInChangedRanges.length && newState.doc.textBetween(newRange.from, newRange.to, " ", " ").endsWith(" ")) {
          textBlock = nodesInChangedRanges[0];
          textBeforeWhitespace = newState.doc.textBetween(textBlock.pos, newRange.to, void 0, " ");
        }
        if (textBlock && textBeforeWhitespace) {
          const wordsBeforeWhitespace = textBeforeWhitespace.split(" ").filter((s) => s !== "");
          if (wordsBeforeWhitespace.length <= 0) {
            return false;
          }
          const lastWordBeforeSpace = wordsBeforeWhitespace[wordsBeforeWhitespace.length - 1];
          const lastWordAndBlockOffset = textBlock.pos + textBeforeWhitespace.lastIndexOf(lastWordBeforeSpace);
          if (!lastWordBeforeSpace) {
            return false;
          }
          find(lastWordBeforeSpace).filter((link) => link.isLink).filter((link) => {
            if (options.validate) {
              return options.validate(link.value);
            }
            return true;
          }).map((link) => ({
            ...link,
            from: lastWordAndBlockOffset + link.start + 1,
            to: lastWordAndBlockOffset + link.end + 1
          })).forEach((link) => {
            tr.addMark(link.from, link.to, options.type.create({
              href: link.href
            }));
          });
        }
      });
      if (!tr.steps.length) {
        return;
      }
      return tr;
    }
  });
}
function clickHandler(options) {
  return new Plugin({
    key: new PluginKey("handleClickLink"),
    props: {
      handleClick: (view, pos, event) => {
        var _a;
        const attrs = getAttributes(view.state, options.type.name);
        const link = (_a = event.target) === null || _a === void 0 ? void 0 : _a.closest("a");
        if (link && attrs.href) {
          window.open(attrs.href, attrs.target);
          return true;
        }
        return false;
      }
    }
  });
}
function pasteHandler(options) {
  return new Plugin({
    key: new PluginKey("handlePasteLink"),
    props: {
      handlePaste: (view, event, slice) => {
        const { state } = view;
        const { selection } = state;
        const { empty } = selection;
        if (empty) {
          return false;
        }
        let textContent = "";
        slice.content.forEach((node) => {
          textContent += node.textContent;
        });
        const link = find(textContent).find((item) => item.isLink && item.value === textContent);
        if (!textContent || !link) {
          return false;
        }
        options.editor.commands.setMark(options.type, {
          href: link.href
        });
        return true;
      }
    }
  });
}
const Link$1 = Mark.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: false,
  onCreate() {
    this.options.protocols.forEach(registerCustomProtocol);
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: true,
      linkOnPaste: true,
      autolink: true,
      protocols: [],
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      validate: void 0
    };
  },
  addAttributes() {
    return {
      href: {
        default: null
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [
      { tag: 'a[href]:not([href *= "javascript:" i])' }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0
    ];
  },
  addCommands() {
    return {
      setLink: (attributes) => ({ chain }) => {
        return chain().setMark(this.name, attributes).setMeta("preventAutolink", true).run();
      },
      toggleLink: (attributes) => ({ chain }) => {
        return chain().toggleMark(this.name, attributes, { extendEmptyMarkRange: true }).setMeta("preventAutolink", true).run();
      },
      unsetLink: () => ({ chain }) => {
        return chain().unsetMark(this.name, { extendEmptyMarkRange: true }).setMeta("preventAutolink", true).run();
      }
    };
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: (text) => find(text).filter((link) => {
          if (this.options.validate) {
            return this.options.validate(link.value);
          }
          return true;
        }).filter((link) => link.isLink).map((link) => ({
          text: link.value,
          index: link.start,
          data: link
        })),
        type: this.type,
        getAttributes: (match) => {
          var _a;
          return {
            href: (_a = match.data) === null || _a === void 0 ? void 0 : _a.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const plugins2 = [];
    if (this.options.autolink) {
      plugins2.push(autolink({
        type: this.type,
        validate: this.options.validate
      }));
    }
    if (this.options.openOnClick) {
      plugins2.push(clickHandler({
        type: this.type
      }));
    }
    if (this.options.linkOnPaste) {
      plugins2.push(pasteHandler({
        editor: this.editor,
        type: this.type
      }));
    }
    return plugins2;
  }
});
const Link = Link$1.extend({
  exitable: true
});
const Placeholder = Placeholder$1.extend({
  addOptions() {
    var _a;
    return {
      ...(_a = this.parent) == null ? void 0 : _a.call(this),
      placeholder: ({ node, editor }) => {
        const selection = editor.state.selection;
        if (selection instanceof TextSelection) {
          return " Type '/' for commands";
        }
      },
      includeChildren: true
    };
  }
});
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  __ssrInlineRender: true,
  props: { open: Boolean, confirmAction: Function, innerClass: String },
  emits: ["update:open"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const el = ref();
    onClickOutside(el, () => {
      emits("update:open", !props.open);
    });
    const { activate, deactivate } = useFocusTrap(el, { immediate: true });
    onKeyStroke("Escape", () => emits("update:open", false));
    watch(
      () => props.open,
      (n) => nextTick(() => n ? activate() : deactivate())
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.open) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 w-screen h-screen z-300 flex items-center justify-center" }, _attrs))}><div class="${ssrRenderClass([__props.innerClass, "inner w-full mx-4 max-w-112 bg-white rounded-2xl shadow-xl overflow-hidden"])}">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`Content`);
        }, _push, _parent);
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "Upload",
  __ssrInlineRender: true,
  props: {
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const client = useSupabaseClient();
    const user = useSupabaseUser();
    const { files, open: openFileDialog, reset } = useFileDialog({ accept: "image/*" });
    const { base64 } = useBase64(computed(() => {
      var _a, _b;
      return (_b = (_a = files.value) == null ? void 0 : _a.item) == null ? void 0 : _b.call(_a, 0);
    }));
    const imageSrc = ref(props.modelValue);
    const isUploading = ref(false);
    const upload = async (file) => {
      var _a, _b, _c;
      isUploading.value = true;
      const filename = `${(_a = user.value) == null ? void 0 : _a.id}/${file.name}`;
      const { data, error } = await client.storage.from("posts").upload(filename, file, { cacheControl: "3600" });
      const { publicURL } = client.storage.from("posts").getPublicUrl((_c = (_b = data == null ? void 0 : data.Key) == null ? void 0 : _b.replace("posts/", "")) != null ? _c : filename);
      emits("update:modelValue", publicURL);
      isUploading.value = false;
    };
    watch(files, async (n) => {
      if (n.length) {
        const file = n.item(0);
        upload(file);
      }
    });
    watch(base64, (n) => imageSrc.value = n);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        disabled: isUploading.value,
        accept: "image/*",
        type: "button",
        class: "block w-full p-0 ring-3 ring-transparent hover:ring-gray-400 focus:ring-gray-400 rounded-2xl transition overflow-hidden"
      }, _attrs))}><div class="h-64 w-full bg-light-300 flex items-center justify-center">`);
      if (imageSrc.value) {
        _push(`<img class="w-full h-full object-scale-down"${ssrRenderAttr("src", imageSrc.value)}>`);
      } else {
        _push(`<p class="text-gray-400">Press &#39;Enter&#39; to upload image</p>`);
      }
      _push(`</div></button>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Upload.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "ModalImage",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    editor: Object
  },
  setup(__props) {
    const props = __props;
    const isVisible = ref(props.show);
    const alt = ref("");
    const image = ref("");
    const isLoading = ref(false);
    const save = async () => {
      if (!image.value)
        return;
      isLoading.value = true;
      props.editor.chain().focus().setImage({
        src: image.value,
        alt: alt.value
      }).run();
      isLoading.value = false;
      isVisible.value = false;
    };
    watch(isVisible, () => {
      if (!isVisible.value) {
        const editorEl = document.querySelector(".content .ProseMirror");
        if (editorEl)
          editorEl.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = _sfc_main$c;
      const _component_Upload = _sfc_main$b;
      const _component_Button = _sfc_main$g;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        open: isVisible.value,
        "onUpdate:open": ($event) => isVisible.value = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col p-6"${_scopeId}><h2 class="text-3xl font-bold"${_scopeId}>Add image</h2><div class="my-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Upload, {
              modelValue: image.value,
              "onUpdate:modelValue": ($event) => image.value = $event
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-4 flex items-center"${_scopeId}><input type="text" name="alt-name" id="alt-name" placeholder="alternate"${ssrRenderAttr("value", alt.value)}${_scopeId}></div></div><div class="flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              class: "btn-primary ml-2",
              loading: isLoading.value,
              onClick: save
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Save`);
                } else {
                  return [
                    createTextVNode("Save")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="btn-plain"${_scopeId}>Cancel</button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col p-6" }, [
                createVNode("h2", { class: "text-3xl font-bold" }, "Add image"),
                createVNode("div", { class: "my-6" }, [
                  createVNode(_component_Upload, {
                    modelValue: image.value,
                    "onUpdate:modelValue": ($event) => image.value = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "mt-4 flex items-center" }, [
                    withDirectives(createVNode("input", {
                      type: "text",
                      name: "alt-name",
                      id: "alt-name",
                      placeholder: "alternate",
                      "onUpdate:modelValue": ($event) => alt.value = $event
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, alt.value]
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_component_Button, {
                    class: "btn-primary ml-2",
                    loading: isLoading.value,
                    onClick: save
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Save")
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode("button", {
                    class: "btn-plain",
                    onClick: ($event) => isVisible.value = false
                  }, "Cancel", 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tiptap/ModalImage.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ModalIframe",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    editor: Object
  },
  setup(__props) {
    const props = __props;
    const open = ref(props.show);
    const url2 = ref("");
    const save = () => {
      var _a;
      if (!((_a = url2.value) == null ? void 0 : _a.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)))
        return;
      props.editor.chain().focus().setIframe({
        src: url2.value
      }).run();
      open.value = false;
    };
    watch(open, () => {
      if (!open.value) {
        const editorEl = document.querySelector(".content .ProseMirror");
        if (editorEl)
          editorEl.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = _sfc_main$c;
      const _component_Button = _sfc_main$g;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col p-6"${_scopeId}><h2 class="text-3xl font-bold"${_scopeId}>Add iframe</h2><div class="flex items-center my-6"${_scopeId}><label for="url" class="mr-4 flex-shrink-0"${_scopeId}>URL :</label><input type="url" name="url" id="url" placeholder="https://supabase.com"${ssrRenderAttr("value", url2.value)}${_scopeId}></div><div class="flex justify-end"${_scopeId}><button class="btn-plain"${_scopeId}>Cancel</button>`);
            _push2(ssrRenderComponent(_component_Button, {
              class: "btn-primary ml-2",
              onClick: save
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Save`);
                } else {
                  return [
                    createTextVNode("Save")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col p-6" }, [
                createVNode("h2", { class: "text-3xl font-bold" }, "Add iframe"),
                createVNode("div", { class: "flex items-center my-6" }, [
                  createVNode("label", {
                    for: "url",
                    class: "mr-4 flex-shrink-0"
                  }, "URL :"),
                  withDirectives(createVNode("input", {
                    type: "url",
                    name: "url",
                    id: "url",
                    placeholder: "https://supabase.com",
                    "onUpdate:modelValue": ($event) => url2.value = $event
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, url2.value]
                  ])
                ]),
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode("button", {
                    class: "btn-plain",
                    onClick: ($event) => open.value = false
                  }, "Cancel", 8, ["onClick"]),
                  createVNode(_component_Button, {
                    class: "btn-primary ml-2",
                    onClick: save
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Save")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tiptap/ModalIframe.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const Upload = Extension.create({
  name: "upload",
  addCommands() {
    return {
      openModal: (type) => ({ commands, editor }) => {
        let component;
        switch (type) {
          case "image": {
            component = _sfc_main$a;
            break;
          }
          case "iframe": {
            component = _sfc_main$9;
            break;
          }
        }
        if (!component)
          return;
        const instance = createApp(component, {
          show: true,
          editor
        }).mount("#modal");
        return !!instance;
      }
    };
  }
});
const Iframe = Node.create({
  name: "iframe",
  group: "block",
  atom: true,
  addOptions() {
    return {
      allowFullscreen: true,
      HTMLAttributes: {
        class: "iframe-wrapper"
      }
    };
  },
  addAttributes() {
    return {
      src: {
        default: null
      },
      frameborder: {
        default: 0
      },
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "iframe"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      this.options.HTMLAttributes,
      ["iframe", mergeAttributes(HTMLAttributes, { frameborder: 10, tabindex: -1 })]
    ];
  },
  addCommands() {
    return {
      setIframe: (options) => ({ tr, dispatch }) => {
        const { selection } = tr;
        const node = this.type.create(options);
        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node);
        }
        return true;
      }
    };
  }
});
function mapChildren(node, callback) {
  const array = [];
  for (let i = 0; i < node.childCount; i++) {
    array.push(callback(node.child(i), i, node instanceof Fragment$1 ? node : node.content));
  }
  return array;
}
const moveNode = (type, dir) => {
  const isDown = dir === "down";
  return (state, dispatch) => {
    var _a;
    const { $from, node } = state.selection;
    const currentResolved = (_a = findParentNodeOfType(type)(state.selection)) != null ? _a : {
      depth: 1,
      node,
      pos: 34,
      start: 34
    };
    if (!currentResolved.node) {
      return false;
    }
    const { node: currentNode } = currentResolved;
    const parentDepth = currentResolved.depth - 1;
    const parent = $from.node(parentDepth);
    const parentPos = $from.start(parentDepth);
    if (currentNode.type !== type) {
      return false;
    }
    const arr = mapChildren(parent, (node2) => node2);
    let index = arr.indexOf(currentNode);
    let swapWith = isDown ? index + 1 : index - 1;
    if (swapWith >= arr.length || swapWith < 0) {
      return false;
    }
    const swapWithNodeSize = arr[swapWith].nodeSize;
    [arr[index], arr[swapWith]] = [arr[swapWith], arr[index]];
    let tr = state.tr;
    let replaceStart = parentPos;
    let replaceEnd = $from.end(parentDepth);
    const slice = new Slice(Fragment$1.fromArray(arr), 0, 0);
    tr = tr.step(new ReplaceStep(replaceStart, replaceEnd, slice, false));
    tr = tr.setSelection(
      Selection.near(tr.doc.resolve(isDown ? $from.pos + swapWithNodeSize : $from.pos - swapWithNodeSize))
    );
    if (dispatch) {
      dispatch(tr.scrollIntoView());
    }
    return true;
  };
};
const Move = Extension.create({
  name: "move",
  addCommands() {
    return {
      moveParent: (direction) => ({ editor, state, dispatch, ...a }) => {
        var _a, _b;
        const type = (_b = (_a = editor.state.selection.node) == null ? void 0 : _a.type) != null ? _b : editor.state.selection.$head.parent.type;
        return moveNode(type, direction)(state, dispatch);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Alt-ArrowUp": () => this.editor.commands.moveParent("up"),
      "Alt-ArrowDown": () => this.editor.commands.moveParent("down")
    };
  }
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Tiptap",
  __ssrInlineRender: true,
  props: {
    modelValue: null,
    editable: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    var _a, _b;
    const props = __props;
    const editor = useEditor({
      content: (_a = props.modelValue) != null ? _a : "",
      extensions: [
        Link,
        StarterKit,
        Image,
        Underline,
        Focus,
        Upload,
        HardBreak,
        Code,
        Placeholder,
        Iframe,
        Move,
        Commands.configure({
          suggestion
        })
      ],
      editable: (_b = props.editable) != null ? _b : false,
      onUpdate(props2) {
        emit("update:modelValue", props2.editor.getHTML());
      }
    });
    watch(
      () => props.modelValue,
      (newValue) => {
        const isSame = editor.value.getHTML() === newValue;
        if (isSame)
          return;
        editor.value.commands.setContent(newValue, false);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TiptapBubble = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_TiptapBubble, { editor: unref(editor) }, null, _parent));
      _push(ssrRenderComponent(unref(EditorContent), {
        class: "content",
        editor: unref(editor)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const Tiptap_vue_vue_type_style_index_0_lang = "";
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tiptap.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Drawer",
  __ssrInlineRender: true,
  props: { open: Boolean, confirmAction: Function },
  emits: ["update:open"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const el = ref();
    onClickOutside(el, () => {
      emits("update:open", !props.open);
    });
    const { activate, deactivate } = useFocusTrap(el);
    onKeyStroke("Escape", () => emits("update:open", false));
    watch(
      () => props.open,
      (n) => nextTick(() => n ? activate() : deactivate()),
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.open) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 w-screen h-screen z-100 flex justify-end" }, _attrs))}><div class="inner w-full max-w-112 ml-8 bg-white rounded-xl shadow-xl overflow-hidden">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`Content`);
        }, _push, _parent);
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Drawer.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Toggle",
  __ssrInlineRender: true,
  props: {
    modelValue: Boolean,
    id: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({
        for: __props.id,
        class: "inline-flex relative items-center cursor-pointer"
      }, _attrs))}><input type="checkbox" class="peer h-1px w-1px absolute border-0 outline-none"${ssrIncludeBooleanAttr(Array.isArray(__props.modelValue) ? ssrLooseContain(__props.modelValue, null) : __props.modelValue) ? " checked" : ""}${ssrRenderAttr("id", __props.id)}><div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-gray-400 rounded-full peer-checked:bg-dark-300 transition"></div><div class="peer-checked:translate-x-full peer-checked:border-white absolute top-[2px] left-[2px] bg-white border-gray-400 rounded-full h-5 w-5 transition-all"></div><span class="ml-2">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`Toggle`);
      }, _push, _parent);
      _push(`</span></label>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Toggle.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "TagsInput",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Object, default: [] },
    id: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const client = useSupabaseClient();
    const { data: tags } = useAsyncData("tags", async () => {
      const { data } = await client.from("tags_view").select("*");
      return data.map((i) => i.name);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(Multiselect), {
        modelValue: __props.modelValue,
        "onUpdate:modelValue": ($event) => isRef(modelValue) ? modelValue.value = $event : null,
        onChange: ($event) => emits("update:modelValue", $event),
        options: (_a = unref(tags)) != null ? _a : [],
        createOption: "",
        mode: "tags",
        placeholder: "Add tags",
        "close-on-select": false,
        searchable: true,
        classes: {
          container: "relative mx-auto p-2 w-full flex items-center justify-end cursor-pointer rounded-2xl bg-light-300",
          tag: "bg-dark-300 text-white text-sm font-semibold py-0.5 pl-2 rounded-lg mr-1.5 mb-1.5 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1",
          tagsSearch: "not-default bg-transparent absolute inset-0 border-0 focus:ring-0 outline-none appearance-none p-0 text-base font-sans box-border w-full",
          tagsSearchCopy: "invisible whitespace-pre-wrap inline-block h-px",
          placeholder: "flex items-center h-full absolute left-2 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-400 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5",
          dropdown: "max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full -mt-px py-2 overflow-y-scroll z-50 bg-light-300 flex flex-col rounded-b-2xl shadow-lg",
          dropdownHidden: "!hidden",
          optionPointed: "text-dark-300 bg-light-700",
          optionSelected: "text-dark-300 bg-light-700",
          noResults: "py-2 px-3 text-gray-400 text-center font-semibold"
        }
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const default_css_vue_type_style_index_0_src_true_lang = "";
const TagsInput_vue_vue_type_style_index_1_lang = "";
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TagsInput.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "EditPost",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    settings: Object
  },
  emits: ["update:show"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { settings } = toRefs(props);
    watch(
      () => props.show,
      () => {
        if (!props.show) {
          const editorEl = document.querySelector(".content .ProseMirror");
          if (editorEl)
            editorEl.focus();
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Drawer = _sfc_main$7;
      const _component_Toggle = _sfc_main$6;
      const _component_Upload = _sfc_main$b;
      const _component_TagsInput = _sfc_main$5;
      _push(ssrRenderComponent(_component_Drawer, mergeProps({
        open: __props.show,
        "onUpdate:open": ($event) => emits("update:show", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col px-4 py-12"${_scopeId}><h2 class="text-3xl font-bold"${_scopeId}>Settings</h2><div class="mt-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Toggle, {
              class: "mt-4",
              modelValue: unref(settings).active,
              "onUpdate:modelValue": ($event) => unref(settings).active = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Publish`);
                } else {
                  return [
                    createTextVNode("Publish")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="mt-8"${_scopeId}><label for="url"${_scopeId}>Cover image: </label>`);
            _push2(ssrRenderComponent(_component_Upload, {
              class: "mt-4",
              modelValue: unref(settings).image,
              "onUpdate:modelValue": ($event) => unref(settings).image = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-8"${_scopeId}><label for="url"${_scopeId}>Tags: </label>`);
            _push2(ssrRenderComponent(_component_TagsInput, {
              class: "mt-4",
              modelValue: unref(settings).tags,
              "onUpdate:modelValue": ($event) => unref(settings).tags = $event
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col px-4 py-12" }, [
                createVNode("h2", { class: "text-3xl font-bold" }, "Settings"),
                createVNode("div", { class: "mt-8" }, [
                  createVNode(_component_Toggle, {
                    class: "mt-4",
                    modelValue: unref(settings).active,
                    "onUpdate:modelValue": ($event) => unref(settings).active = $event
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Publish")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-8" }, [
                  createVNode("label", { for: "url" }, "Cover image: "),
                  createVNode(_component_Upload, {
                    class: "mt-4",
                    modelValue: unref(settings).image,
                    "onUpdate:modelValue": ($event) => unref(settings).image = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-8" }, [
                  createVNode("label", { for: "url" }, "Tags: "),
                  createVNode(_component_TagsInput, {
                    class: "mt-4",
                    modelValue: unref(settings).tags,
                    "onUpdate:modelValue": ($event) => unref(settings).tags = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Drawer/EditPost.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  emits: ["update:show"],
  setup(__props, { emit: emits }) {
    const client = useSupabaseClient();
    const signIn = async () => {
      await client.auth.signIn({ provider: "github" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = _sfc_main$c;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        open: __props.show,
        "onUpdate:open": ($event) => emits("update:show", $event)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col items-center px-6 py-12"${_scopeId}><h1 class="text-4xl font-bold text-center"${_scopeId}>Login</h1><button autofocus class="btn-primary w-max mt-6"${_scopeId}>Login with GitHub</button></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col items-center px-6 py-12" }, [
                createVNode("h1", { class: "text-4xl font-bold text-center" }, "Login"),
                createVNode("button", {
                  autofocus: "",
                  class: "btn-primary w-max mt-6",
                  onClick: signIn
                }, "Login with GitHub")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/Login.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const meta$8 = {
  alias: "/write",
  middleware: "auth"
};
const useImage = () => {
  return useNuxtApp().$img;
};
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
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
const baseImageProps = {
  src: { type: String, required: true },
  format: { type: String, default: void 0 },
  quality: { type: [Number, String], default: void 0 },
  background: { type: String, default: void 0 },
  fit: { type: String, default: void 0 },
  modifiers: { type: Object, default: void 0 },
  preset: { type: String, default: void 0 },
  provider: { type: String, default: void 0 },
  sizes: { type: [Object, String], default: void 0 },
  preload: { type: Boolean, default: void 0 },
  width: { type: [String, Number], default: void 0 },
  height: { type: [String, Number], default: void 0 },
  alt: { type: String, default: void 0 },
  referrerpolicy: { type: String, default: void 0 },
  usemap: { type: String, default: void 0 },
  longdesc: { type: String, default: void 0 },
  ismap: { type: Boolean, default: void 0 },
  loading: { type: String, default: void 0 },
  crossorigin: {
    type: [Boolean, String],
    default: void 0,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    default: void 0,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding
    };
  });
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], default: void 0 }
};
const __nuxt_component_3 = defineComponent({
  name: "NuxtImg",
  props: imgProps,
  setup: (props, ctx) => {
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const attrs = computed(() => {
      const attrs2 = _base.attrs.value;
      if (props.sizes) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          }
        }]
      });
    }
    const imgEl = ref(null);
    return () => h("img", {
      ref: imgEl,
      key: src.value,
      src: src.value,
      ...attrs.value,
      ...ctx.attrs
    });
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    subdomain: Boolean,
    post: Object
  },
  setup(__props) {
    const props = __props;
    const url2 = computed(() => constructUrl(props.post, props.subdomain));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NuxtImg = __nuxt_component_3;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        class: "group block",
        target: __props.subdomain ? "" : "_blank",
        to: unref(url2)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="p-4 md:p-6 my-4 flex flex-col-reverse md:flex-row bg-white shadow-none group-focus:shadow-xl group-focus:shadow-xl hover:shadow-xl shadow-gray-200 rounded-2xl transition-all"${_scopeId}><div class="w-full flex flex-col justify-between md:h-40"${_scopeId}><div${_scopeId}>`);
            if (!__props.subdomain) {
              _push2(`<div class="flex items-center space-x-2"${_scopeId}>`);
              if (__props.post.profiles.avatar_url) {
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  class: "w-5 h-5 rounded-full",
                  src: (_a = __props.post.profiles) == null ? void 0 : _a.avatar_url
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<h4 class="text-sm font-medium"${_scopeId}>${ssrInterpolate(__props.post.profiles.name)}</h4></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h1 class="mt-2 font-semibold text-2xl"${_scopeId}>${ssrInterpolate(__props.post.title)}</h1><p class="mt-1 text-gray-400"${_scopeId}>${ssrInterpolate(unref(stripHtml)(__props.post.body).result.slice(0, 120))}...</p></div><div class="mt-4 text-sm text-gray-400 place-items-end"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(format)(new Date(__props.post.created_at), "MMM d"))}</span>`);
            if (__props.post.tags) {
              _push2(ssrRenderComponent(_component_NuxtLink, { class: "ml-2 bg-light-300 px-2 py-1 rounded" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b2;
                  if (_push3) {
                    _push3(`${ssrInterpolate((_a2 = __props.post.tags) == null ? void 0 : _a2[0])}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString((_b2 = __props.post.tags) == null ? void 0 : _b2[0]), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.post.cover_img) {
              _push2(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full md:w-40 h-40 md:ml-12 mb-6 md:mb-0 rounded-xl flex-shrink-0",
                src: __props.post.cover_img
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 md:p-6 my-4 flex flex-col-reverse md:flex-row bg-white shadow-none group-focus:shadow-xl group-focus:shadow-xl hover:shadow-xl shadow-gray-200 rounded-2xl transition-all" }, [
                createVNode("div", { class: "w-full flex flex-col justify-between md:h-40" }, [
                  createVNode("div", null, [
                    !__props.subdomain ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center space-x-2"
                    }, [
                      __props.post.profiles.avatar_url ? (openBlock(), createBlock(_component_NuxtImg, {
                        key: 0,
                        class: "w-5 h-5 rounded-full",
                        src: (_b = __props.post.profiles) == null ? void 0 : _b.avatar_url
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("h4", { class: "text-sm font-medium" }, toDisplayString(__props.post.profiles.name), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("h1", { class: "mt-2 font-semibold text-2xl" }, toDisplayString(__props.post.title), 1),
                    createVNode("p", { class: "mt-1 text-gray-400" }, toDisplayString(unref(stripHtml)(__props.post.body).result.slice(0, 120)) + "...", 1)
                  ]),
                  createVNode("div", { class: "mt-4 text-sm text-gray-400 place-items-end" }, [
                    createVNode("span", null, toDisplayString(unref(format)(new Date(__props.post.created_at), "MMM d")), 1),
                    __props.post.tags ? (openBlock(), createBlock(_component_NuxtLink, {
                      key: 0,
                      class: "ml-2 bg-light-300 px-2 py-1 rounded"
                    }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createTextVNode(toDisplayString((_a2 = __props.post.tags) == null ? void 0 : _a2[0]), 1)
                        ];
                      }),
                      _: 1
                    })) : createCommentVNode("", true)
                  ])
                ]),
                __props.post.cover_img ? (openBlock(), createBlock(_component_NuxtImg, {
                  key: 0,
                  class: "w-full md:w-40 h-40 md:ml-12 mb-6 md:mb-0 rounded-xl flex-shrink-0",
                  src: __props.post.cover_img
                }, null, 8, ["src"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Post/Card.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const meta$7 = void 0;
const meta$6 = void 0;
const meta$5 = void 0;
const meta$4 = void 0;
const useSubdomain = () => useState("subdomain", () => null);
const useSubdomainProfile = () => useState("subdomain-profile", () => null);
const meta$3 = {
  layout: "user"
};
const meta$2 = void 0;
const meta$1 = void 0;
const meta = void 0;
const _routes = [
  {
    path: "/dashboard",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/dashboard.vue",
    children: [
      {
        name: "dashboard-domain",
        path: "domain",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/dashboard/domain.vue",
        children: [],
        meta: meta$c,
        alias: (meta$c == null ? void 0 : meta$c.alias) || [],
        component: () => import("./_nuxt/domain.14214727.js").then((m) => m.default || m)
      },
      {
        name: "dashboard",
        path: "",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/dashboard/index.vue",
        children: [],
        meta: meta$b,
        alias: (meta$b == null ? void 0 : meta$b.alias) || [],
        component: () => import("./_nuxt/index.9c6c2c14.js").then((m) => m.default || m)
      },
      {
        name: "dashboard-posts",
        path: "posts",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/dashboard/posts.vue",
        children: [],
        meta: meta$a,
        alias: (meta$a == null ? void 0 : meta$a.alias) || [],
        component: () => import("./_nuxt/posts.e0c32c41.js").then((m) => m.default || m)
      },
      {
        name: "dashboard-profile",
        path: "profile",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/dashboard/profile.vue",
        children: [],
        meta: meta$9,
        alias: (meta$9 == null ? void 0 : meta$9.alias) || [],
        component: () => import("./_nuxt/profile.03149d45.js").then((m) => m.default || m)
      }
    ],
    meta: meta$d,
    alias: (meta$d == null ? void 0 : meta$d.alias) || [],
    component: () => import("./_nuxt/dashboard.730714c4.js").then((m) => m.default || m)
  },
  {
    name: "edit-id",
    path: "/edit/:id",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/edit/[id].vue",
    children: [],
    meta: meta$8,
    alias: (meta$8 == null ? void 0 : meta$8.alias) || [],
    component: () => import("./_nuxt/_id_.051584d6.js").then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/index.vue",
    children: [],
    meta: meta$7,
    alias: (meta$7 == null ? void 0 : meta$7.alias) || [],
    component: () => import("./_nuxt/index.809308b2.js").then((m) => m.default || m)
  },
  {
    name: "login",
    path: "/login",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/login.vue",
    children: [],
    meta: meta$6,
    alias: (meta$6 == null ? void 0 : meta$6.alias) || [],
    component: () => import("./_nuxt/login.fdbd7a20.js").then((m) => m.default || m)
  },
  {
    name: "logout",
    path: "/logout",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/logout.vue",
    children: [],
    meta: meta$5,
    alias: (meta$5 == null ? void 0 : meta$5.alias) || [],
    component: () => import("./_nuxt/logout.6313b5bc.js").then((m) => m.default || m)
  },
  {
    name: "posts",
    path: "/posts",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/posts.vue",
    children: [],
    meta: meta$4,
    alias: (meta$4 == null ? void 0 : meta$4.alias) || [],
    component: () => import("./_nuxt/posts.b3523c25.js").then((m) => m.default || m)
  },
  {
    path: "/user/:siteId",
    file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/user/[siteId].vue",
    children: [
      {
        name: "user-siteId-slug",
        path: ":slug",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/user/[siteId]/[slug].vue",
        children: [],
        meta: meta$2,
        alias: (meta$2 == null ? void 0 : meta$2.alias) || [],
        component: () => import("./_nuxt/_slug_.92036626.js").then((m) => m.default || m)
      },
      {
        name: "user-siteId-home",
        path: "home",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/user/[siteId]/home.vue",
        children: [],
        meta: meta$1,
        alias: (meta$1 == null ? void 0 : meta$1.alias) || [],
        component: () => import("./_nuxt/home.f624a73a.js").then((m) => m.default || m)
      },
      {
        name: "user-siteId",
        path: "",
        file: "/Users/bon/Documents/my-workspace/perfect-blog/pages/user/[siteId]/index.vue",
        children: [],
        meta,
        alias: (meta == null ? void 0 : meta.alias) || [],
        component: () => import("./_nuxt/index.a1d39ff1.js").then((m) => m.default || m)
      }
    ],
    meta: meta$3,
    alias: (meta$3 == null ? void 0 : meta$3.alias) || [],
    component: () => import("./_nuxt/_siteId_.a6c6f82c.js").then((m) => m.default || m)
  }
];
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
    var _a;
    if (savedPosition)
      return savedPosition;
    if (to.hash) {
      const el = document.querySelector(to.hash);
      return { left: 0, top: ((_a = el == null ? void 0 : el.offsetTop) != null ? _a : 0) - 30, behavior: "smooth" };
    }
    if (to.fullPath === from.fullPath)
      return;
    return { left: 0, top: 0, behavior: "smooth" };
  }
};
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const globalMiddleware = [];
const namedMiddleware = {
  auth: () => import("./_nuxt/auth.1a3e37f5.js")
};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  var _a, _b, _c, _d;
  let __temp, __restore;
  nuxtApp.vueApp.component("NuxtPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtNestedPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtChild", NuxtPage);
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = (_b = (_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) != null ? _b : createMemoryHistory(routerBase);
  const routes = (_d = (_c = routerOptions.routes) == null ? void 0 : _c.call(routerOptions, _routes)) != null ? _d : _routes;
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
    var _a2, _b2, _c2, _d2;
    if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d2 = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d2.default)) {
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
    var _a2, _b2;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a2 = initialLayout.value) != null ? _a2 : to.meta.layout;
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
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusMessage: `Route navigation aborted: ${initialURL}`
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
      if (!isEqual$1(currentURL, initialURL)) {
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
  const meta2 = await _imageMeta(url2).catch((err) => {
    console.error("Failed to get image meta for " + url2, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta2;
}
async function _imageMeta(url2) {
  {
    const imageMeta2 = await import("image-meta").then((r) => r.imageMeta);
    const data = await fetch(url2).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url2}\`.`);
    }
    const { width, height } = metadata;
    const meta2 = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta2;
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
      modifiers: defu$1(modifiers, options.modifiers || {})
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
  var _a, _b;
  if (typeof input !== "string" || input === "") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults: defaults2 } = getProvider(ctx, options.provider || ctx.options.provider);
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
  const _options = defu$1(options, preset, defaults2);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
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
  var _a, _b;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
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
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: ",",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL: baseURL2 } = {}, _ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL2) {
    baseURL2 = joinURL("/", "/_ipx");
  }
  return {
    url: joinURL(baseURL2, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$U0qIzg7a4d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getImage,
  validateDomains,
  supportsAlias
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
  "provider": "ipx",
  "domains": [
    "avatars0.githubusercontent.com",
    "avatars.githubusercontent.com",
    "images.unsplash.com"
  ],
  "alias": {}
};
imageOptions.providers = {
  ["ipx"]: { provider: ipxRuntime$U0qIzg7a4d, defaults: {} }
};
const node_modules__64nuxt_image_edge_dist_runtime_plugin_mjs_OrkQhMqHci = defineNuxtPlugin(() => {
  const img = createImage(imageOptions);
  return {
    provide: {
      img
    }
  };
});
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
const __uno = "";
const _nuxt_unocss_mjs_MzCDxu9LMj = defineNuxtPlugin(() => {
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB,
  node_modules__64nuxt_image_edge_dist_runtime_plugin_mjs_OrkQhMqHci,
  node_modules__64nuxtjs_supabase_dist_runtime_plugins_supabase_server_mjs_6VOknHCOlQ,
  _nuxt_unocss_mjs_MzCDxu9LMj
];
const _sfc_main$1 = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import("./_nuxt/error-component.62e4a9ef.js").then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
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
const layouts = {
  default: defineAsyncComponent(() => import("./_nuxt/default.ef3db380.js").then((m) => m.default || m)),
  user: defineAsyncComponent(() => import("./_nuxt/user.a3e2be84.js").then((m) => m.default || m))
};
const __nuxt_component_0 = defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const route = useRoute();
    return () => {
      var _a, _b, _c;
      const layout = (_b = (_a = isRef(props.name) ? props.name.value : props.name) != null ? _a : route.meta.layout) != null ? _b : "default";
      const hasLayout = layout && layout in layouts;
      const transitionProps = (_c = route.meta.layoutTransition) != null ? _c : appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => {
          return _wrapIf(layouts[layout], hasLayout, context.slots).default();
        }
      }).default();
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
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtPage = resolveComponent("NuxtPage");
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
  globalThis.$fetch = $fetch$1.create({
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
export {
  _sfc_main$g as _,
  __nuxt_component_0$1 as a,
  useSupabaseUser as b,
  useSupabaseClient as c,
  useMagicKeys as d,
  entry$1 as default,
  _export_sfc as e,
  useAsyncData as f,
  __nuxt_component_1 as g,
  useHead as h,
  useRoute as i,
  useLocalStorage as j,
  _sfc_main$f as k,
  _sfc_main$8 as l,
  _sfc_main$4 as m,
  navigateTo as n,
  _sfc_main$3 as o,
  __nuxt_component_3 as p,
  _sfc_main$2 as q,
  removeVietnameseTones as r,
  constructUrl as s,
  useSubdomainProfile as t,
  useState as u,
  useSubdomain as v,
  defineNuxtRouteMiddleware as w,
  __nuxt_component_1$1 as x,
  useRouter as y,
  _sfc_main$c as z
};
//# sourceMappingURL=server.mjs.map
