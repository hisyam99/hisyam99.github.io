import { j as jsx, k as _renderSSR, l as _pauseFromContexts, F as Fragment, s as setPlatform, c as componentQrl, i as inlinedQrl, m as useDocumentHead, n as useLocation, g as _jsxC, b as _jsxQ, o as _fnSignal, p as _jsxS, q as ServiceWorkerRegister, R as RouterOutlet, Q as QwikCityProvider } from "./q-DE9SRNy1.js";
/**
 * @license
 * @builder.io/qwik/server 1.5.7
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var SYNC_QRL = "<sync>";
function createPlatform(opts, resolvedManifest) {
  const mapper = resolvedManifest == null ? void 0 : resolvedManifest.mapper;
  const mapperFn = opts.symbolMapper ? opts.symbolMapper : (symbolName) => {
    var _a;
    if (mapper) {
      const hash = getSymbolHash(symbolName);
      const result = mapper[hash];
      if (!result) {
        if (hash === SYNC_QRL) {
          return [hash, ""];
        }
        const isRegistered = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.has(hash);
        if (isRegistered) {
          return [symbolName, "_"];
        }
        console.error("Cannot resolve symbol", symbolName, "in", mapper);
      }
      return result;
    }
  };
  const serverPlatform = {
    isServer: true,
    async importSymbol(_containerEl, url, symbolName) {
      var _a;
      const hash = getSymbolHash(symbolName);
      const regSym = (_a = globalThis.__qwik_reg_symbols) == null ? void 0 : _a.get(hash);
      if (regSym) {
        return regSym;
      }
      let modulePath = String(url);
      if (!modulePath.endsWith(".js")) {
        modulePath += ".js";
      }
      const module = __require(modulePath);
      if (!(symbolName in module)) {
        throw new Error(`Q-ERROR: missing symbol '${symbolName}' in module '${modulePath}'.`);
      }
      return module[symbolName];
    },
    raf: () => {
      console.error("server can not rerender");
      return Promise.resolve();
    },
    nextTick: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    chunkForSymbol(symbolName) {
      return mapperFn(symbolName, mapper);
    }
  };
  return serverPlatform;
}
async function setServerPlatform(opts, manifest2) {
  const platform = createPlatform(opts, manifest2);
  setPlatform(platform);
}
var getSymbolHash = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};
function createTimer() {
  if (typeof performance === "undefined") {
    return () => 0;
  }
  const start = performance.now();
  return () => {
    const end = performance.now();
    const delta = end - start;
    return delta / 1e6;
  };
}
function getBuildBase(opts) {
  let base = opts.base;
  if (typeof opts.base === "function") {
    base = opts.base(opts);
  }
  if (typeof base === "string") {
    if (!base.endsWith("/")) {
      base += "/";
    }
    return base;
  }
  return `${"/"}build/`;
}
var QWIK_LOADER_DEFAULT_MINIFIED = '(()=>{var e=Object.defineProperty,t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,o=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,s=(e,s)=>{for(var a in s||(s={}))n.call(s,a)&&o(e,a,s[a]);if(t)for(var a of t(s))r.call(s,a)&&o(e,a,s[a]);return e};((e,t)=>{const n="__q_context__",r=window,o=new Set,a="replace",i="forEach",c="target",l="getAttribute",f="isConnected",p="qvisible",b="_qwikjson_",u=t=>e.querySelectorAll(t),y=e=>e&&"function"==typeof e.then,d=(e,t,n=t.type)=>{u("[on"+e+"\\\\:"+n+"]")[i]((r=>q(r,e,t,n)))},m=t=>{if(void 0===t[b]){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===n[l]("type")){t[b]=JSON.parse(n.textContent[a](/\\\\x3C(\\/?script)/gi,"<$1"));break}n=n.previousElementSibling}}},h=(e,t)=>new CustomEvent(e,{detail:t}),q=async(t,r,o,i=o.type)=>{const c="on"+r+":"+i;t.hasAttribute("preventdefault:"+i)&&o.preventDefault();const p=t._qc_,b=p&&p.li.filter((e=>e[0]===c));if(b&&b.length>0){for(const e of b){const n=e[1].getFn([t,o],(()=>t[f]))(o,t),r=o.cancelBubble;y(n)&&await n,r&&o.stopPropagation()}return}const u=t[l](c);if(u){const r=t.closest("[q\\\\:container]"),i=r[l]("q:base"),c=r[l]("q:version")||"unknown",p=r[l]("q:manifest-hash")||"dev",b=new URL(i,e.baseURI);for(const l of u.split("\\n")){const u=new URL(l,b),d=u.href,h=u.hash[a](/^#?([^?[|]*).*$/,"$1")||"default",q=performance.now();let v,g,E;const _=l.startsWith("#"),k={qBase:i,qManifest:p,qVersion:c,href:d,symbol:h,element:t,reqTime:q};if(_)v=(r.qFuncs||[])[Number.parseInt(h)],v||(g="sync",E=Error("sync handler error for symbol: "+h));else{const e=u.href.split("#")[0];try{const t=import(e);m(r),v=(await t)[h]}catch(e){g="async",E=e}}if(!v){w("qerror",s({importError:g,error:E},k));break}const C=e[n];if(t[f])try{e[n]=[t,o,u],_||w("qsymbol",s({},k));const r=v(o,t);y(r)&&await r}catch(e){w("qerror",s({error:e},k))}finally{e[n]=C}}}},w=(t,n)=>{e.dispatchEvent(h(t,n))},v=e=>e[a](/([A-Z])/g,(e=>"-"+e.toLowerCase())),g=async e=>{let t=v(e.type),n=e[c];for(d("-document",e,t);n&&n[l];){const r=q(n,"",e,t);let o=e.cancelBubble;y(r)&&await r,o=o||e.cancelBubble||n.hasAttribute("stoppropagation:"+e.type),n=e.bubbles&&!0!==o?n.parentElement:null}},E=e=>{d("-window",e,v(e.type))},_=()=>{var n;const s=e.readyState;if(!t&&("interactive"==s||"complete"==s)&&(t=1,w("qinit"),(null!=(n=r.requestIdleCallback)?n:r.setTimeout).bind(r)((()=>w("qidle"))),o.has(p))){const e=u("[on\\\\:"+p+"]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n[c]),q(n[c],"",h(p,n)))}));e[i]((e=>t.observe(e)))}},k=(e,t,n,r=!1)=>e.addEventListener(t,n,{capture:r,passive:!1}),C=t=>{for(const n of t)o.has(n)||(k(e,n,g,!0),k(r,n,E,!0),o.add(n))};if(!(n in e)){e[n]=0;const t=r.qwikevents;Array.isArray(t)&&C(t),r.qwikevents={push:(...e)=>C(e)},k(e,"readystatechange",_),_()}})(document)})()';
var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    var __defProp = Object.defineProperty;\n    var __getOwnPropSymbols = Object.getOwnPropertySymbols;\n    var __hasOwnProp = Object.prototype.hasOwnProperty;\n    var __propIsEnum = Object.prototype.propertyIsEnumerable;\n    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {\n        enumerable: !0,\n        configurable: !0,\n        writable: !0,\n        value: value\n    }) : obj[key] = value;\n    var __spreadValues = (a, b) => {\n        for (var prop in b || (b = {})) {\n            __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n        }\n        if (__getOwnPropSymbols) {\n            for (var prop of __getOwnPropSymbols(b)) {\n                __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n            }\n        }\n        return a;\n    };\n    ((doc, hasInitialized) => {\n        const Q_CONTEXT = "__q_context__";\n        const win = window;\n        const events =  new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const isPromise = promise => promise && "function" == typeof promise.then;\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((el => dispatch(el, infix, ev, type)));\n        };\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === script.getAttribute("type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const relevantListeners = ctx && ctx.li.filter((li => li[0] === attrName));\n            if (relevantListeners && relevantListeners.length > 0) {\n                for (const listener of relevantListeners) {\n                    const results = listener[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                    const cancelBubble = ev.cancelBubble;\n                    isPromise(results) && await results;\n                    cancelBubble && ev.stopPropagation();\n                }\n                return;\n            }\n            const attrValue = element.getAttribute(attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const qBase = container.getAttribute("q:base");\n                const qVersion = container.getAttribute("q:version") || "unknown";\n                const qManifest = container.getAttribute("q:manifest-hash") || "dev";\n                const base = new URL(qBase, doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const href = url.href;\n                    const symbol = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    let handler;\n                    let importError;\n                    let error;\n                    const isSync = qrl.startsWith("#");\n                    const eventData = {\n                        qBase: qBase,\n                        qManifest: qManifest,\n                        qVersion: qVersion,\n                        href: href,\n                        symbol: symbol,\n                        element: element,\n                        reqTime: reqTime\n                    };\n                    if (isSync) {\n                        handler = (container.qFuncs || [])[Number.parseInt(symbol)];\n                        if (!handler) {\n                            importError = "sync";\n                            error = new Error("sync handler error for symbol: " + symbol);\n                        }\n                    } else {\n                        const uri = url.href.split("#")[0];\n                        try {\n                            const module = import(\n                                                        uri);\n                            resolveContainer(container);\n                            handler = (await module)[symbol];\n                        } catch (err) {\n                            importError = "async";\n                            error = err;\n                        }\n                    }\n                    if (!handler) {\n                        emitEvent("qerror", __spreadValues({\n                            importError: importError,\n                            error: error\n                        }, eventData));\n                        break;\n                    }\n                    const previousCtx = doc[Q_CONTEXT];\n                    if (element.isConnected) {\n                        try {\n                            doc[Q_CONTEXT] = [ element, ev, url ];\n                            isSync || emitEvent("qsymbol", __spreadValues({}, eventData));\n                            const results = handler(ev, element);\n                            isPromise(results) && await results;\n                        } catch (error2) {\n                            emitEvent("qerror", __spreadValues({\n                                error: error2\n                            }, eventData));\n                        } finally {\n                            doc[Q_CONTEXT] = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                const results = dispatch(element, "", ev, type);\n                let cancelBubble = ev.cancelBubble;\n                isPromise(results) && await results;\n                cancelBubble = cancelBubble || ev.cancelBubble || element.hasAttribute("stoppropagation:" + ev.type);\n                element = ev.bubbles && !0 !== cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent, !0);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!(Q_CONTEXT in doc)) {\n            doc[Q_CONTEXT] = 0;\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})()';
function getQwikLoaderScript(opts = {}) {
  return opts.debug ? QWIK_LOADER_DEFAULT_DEBUG : QWIK_LOADER_DEFAULT_MINIFIED;
}
function getPrefetchResources(snapshotResult, opts, resolvedManifest) {
  if (!resolvedManifest) {
    return [];
  }
  const prefetchStrategy = opts.prefetchStrategy;
  const buildBase = getBuildBase(opts);
  if (prefetchStrategy !== null) {
    if (!prefetchStrategy || !prefetchStrategy.symbolsToPrefetch || prefetchStrategy.symbolsToPrefetch === "auto") {
      return getAutoPrefetch(snapshotResult, resolvedManifest, buildBase);
    }
    if (typeof prefetchStrategy.symbolsToPrefetch === "function") {
      try {
        return prefetchStrategy.symbolsToPrefetch({ manifest: resolvedManifest.manifest });
      } catch (e) {
        console.error("getPrefetchUrls, symbolsToPrefetch()", e);
      }
    }
  }
  return [];
}
function getAutoPrefetch(snapshotResult, resolvedManifest, buildBase) {
  const prefetchResources = [];
  const qrls = snapshotResult == null ? void 0 : snapshotResult.qrls;
  const { mapper, manifest: manifest2 } = resolvedManifest;
  const urls = /* @__PURE__ */ new Map();
  if (Array.isArray(qrls)) {
    for (const obj of qrls) {
      const qrlSymbolName = obj.getHash();
      const resolvedSymbol = mapper[qrlSymbolName];
      if (resolvedSymbol) {
        addBundle(manifest2, urls, prefetchResources, buildBase, resolvedSymbol[1]);
      }
    }
  }
  return prefetchResources;
}
function addBundle(manifest2, urls, prefetchResources, buildBase, bundleFileName) {
  const url = buildBase + bundleFileName;
  let prefetchResource = urls.get(url);
  if (!prefetchResource) {
    prefetchResource = {
      url,
      imports: []
    };
    urls.set(url, prefetchResource);
    const bundle = manifest2.bundles[bundleFileName];
    if (bundle) {
      if (Array.isArray(bundle.imports)) {
        for (const importedFilename of bundle.imports) {
          addBundle(manifest2, urls, prefetchResource.imports, buildBase, importedFilename);
        }
      }
    }
  }
  prefetchResources.push(prefetchResource);
}
function getValidManifest(manifest2) {
  if (manifest2 != null && manifest2.mapping != null && typeof manifest2.mapping === "object" && manifest2.symbols != null && typeof manifest2.symbols === "object" && manifest2.bundles != null && typeof manifest2.bundles === "object") {
    return manifest2;
  }
  return void 0;
}
function workerFetchScript() {
  const fetch = `Promise.all(e.data.map(u=>fetch(u))).finally(()=>{setTimeout(postMessage({}),9999)})`;
  const workerBody = `onmessage=(e)=>{${fetch}}`;
  const blob = `new Blob(['${workerBody}'],{type:"text/javascript"})`;
  const url = `URL.createObjectURL(${blob})`;
  let s = `const w=new Worker(${url});`;
  s += `w.postMessage(u.map(u=>new URL(u,origin)+''));`;
  s += `w.onmessage=()=>{w.terminate()};`;
  return s;
}
function prefetchUrlsEventScript(prefetchResources) {
  const data = {
    bundles: flattenPrefetchResources(prefetchResources).map((u) => u.split("/").pop())
  };
  return `(${PREFETCH_BUNDLES_CODE})(
    document.currentScript.closest('[q\\\\:container]'),
    window.qwikPrefetchSW||(window.qwikPrefetchSW=[]),
    ${JSON.stringify(data.bundles)}
  );`;
}
var PREFETCH_BUNDLES_CODE = /* @__PURE__ */ ((qc, q, bundles) => {
  q.push(["prefetch", qc.getAttribute("q:base"), ...bundles]);
}).toString();
function flattenPrefetchResources(prefetchResources) {
  const urls = [];
  const addPrefetchResource = (prefetchResources2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        if (!urls.includes(prefetchResource.url)) {
          urls.push(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports);
        }
      }
    }
  };
  addPrefetchResource(prefetchResources);
  return urls;
}
function getMostReferenced(prefetchResources) {
  const common = /* @__PURE__ */ new Map();
  let total = 0;
  const addPrefetchResource = (prefetchResources2, visited2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        const count = common.get(prefetchResource.url) || 0;
        common.set(prefetchResource.url, count + 1);
        total++;
        if (!visited2.has(prefetchResource.url)) {
          visited2.add(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports, visited2);
        }
      }
    }
  };
  const visited = /* @__PURE__ */ new Set();
  for (const resource of prefetchResources) {
    visited.clear();
    addPrefetchResource(resource.imports, visited);
  }
  const threshold = total / common.size * 2;
  const urls = Array.from(common.entries());
  urls.sort((a, b) => b[1] - a[1]);
  return urls.slice(0, 5).filter((e) => e[1] > threshold).map((e) => e[0]);
}
function applyPrefetchImplementation(prefetchStrategy, prefetchResources, nonce) {
  const prefetchImpl = normalizePrefetchImplementation(prefetchStrategy == null ? void 0 : prefetchStrategy.implementation);
  const prefetchNodes = [];
  if (prefetchImpl.prefetchEvent === "always") {
    prefetchUrlsEvent(prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchImpl.linkInsert === "html-append") {
    linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl);
  }
  if (prefetchImpl.linkInsert === "js-append") {
    linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce);
  } else if (prefetchImpl.workerFetchInsert === "always") {
    workerFetchImplementation(prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchNodes.length > 0) {
    return jsx(Fragment, { children: prefetchNodes });
  }
  return null;
}
function prefetchUrlsEvent(prefetchNodes, prefetchResources, nonce) {
  const mostReferenced = getMostReferenced(prefetchResources);
  for (const url of mostReferenced) {
    prefetchNodes.push(
      jsx("link", {
        rel: "modulepreload",
        href: url,
        nonce
      })
    );
  }
  prefetchNodes.push(
    jsx("script", {
      "q:type": "prefetch-bundles",
      dangerouslySetInnerHTML: prefetchUrlsEventScript(prefetchResources) + `document.dispatchEvent(new CustomEvent('qprefetch', {detail:{links: [location.pathname]}}))`,
      nonce
    })
  );
}
function linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl) {
  const urls = flattenPrefetchResources(prefetchResources);
  const rel = prefetchImpl.linkRel || "prefetch";
  for (const url of urls) {
    const attributes = {};
    attributes["href"] = url;
    attributes["rel"] = rel;
    if (rel === "prefetch" || rel === "preload") {
      if (url.endsWith(".js")) {
        attributes["as"] = "script";
      }
    }
    prefetchNodes.push(jsx("link", attributes));
  }
}
function linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce) {
  const rel = prefetchImpl.linkRel || "prefetch";
  let s = ``;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `let supportsLinkRel = true;`;
  }
  s += `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += `u.map((u,i)=>{`;
  s += `const l=document.createElement('link');`;
  s += `l.setAttribute("href",u);`;
  s += `l.setAttribute("rel","${rel}");`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(i===0){`;
    s += `try{`;
    s += `supportsLinkRel=l.relList.supports("${rel}");`;
    s += `}catch(e){}`;
    s += `}`;
  }
  s += `document.body.appendChild(l);`;
  s += `});`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(!supportsLinkRel){`;
    s += workerFetchScript();
    s += `}`;
  }
  if (prefetchImpl.workerFetchInsert === "always") {
    s += workerFetchScript();
  }
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      "q:type": "link-js",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function workerFetchImplementation(prefetchNodes, prefetchResources, nonce) {
  let s = `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += workerFetchScript();
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      "q:type": "prefetch-worker",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function normalizePrefetchImplementation(input) {
  return { ...PrefetchImplementationDefault, ...input };
}
var PrefetchImplementationDefault = {
  linkInsert: null,
  linkRel: null,
  workerFetchInsert: null,
  prefetchEvent: "always"
};
var DOCTYPE = "<!DOCTYPE html>";
async function renderToStream(rootNode, opts) {
  var _a, _b, _c;
  let stream = opts.stream;
  let bufferSize = 0;
  let totalSize = 0;
  let networkFlushes = 0;
  let firstFlushTime = 0;
  let buffer = "";
  let snapshotResult;
  const inOrderStreaming = ((_a = opts.streaming) == null ? void 0 : _a.inOrder) ?? {
    strategy: "auto",
    maximunInitialChunk: 5e4,
    maximunChunk: 3e4
  };
  const containerTagName = opts.containerTagName ?? "html";
  const containerAttributes = opts.containerAttributes ?? {};
  const nativeStream = stream;
  const firstFlushTimer = createTimer();
  const buildBase = getBuildBase(opts);
  const resolvedManifest = resolveManifest(opts.manifest);
  function flush() {
    if (buffer) {
      nativeStream.write(buffer);
      buffer = "";
      bufferSize = 0;
      networkFlushes++;
      if (networkFlushes === 1) {
        firstFlushTime = firstFlushTimer();
      }
    }
  }
  function enqueue(chunk) {
    const len = chunk.length;
    bufferSize += len;
    totalSize += len;
    buffer += chunk;
  }
  switch (inOrderStreaming.strategy) {
    case "disabled":
      stream = {
        write: enqueue
      };
      break;
    case "direct":
      stream = nativeStream;
      break;
    case "auto":
      let count = 0;
      let forceFlush = false;
      const minimunChunkSize = inOrderStreaming.maximunChunk ?? 0;
      const initialChunkSize = inOrderStreaming.maximunInitialChunk ?? 0;
      stream = {
        write(chunk) {
          if (chunk === "<!--qkssr-f-->") {
            forceFlush || (forceFlush = true);
          } else if (chunk === "<!--qkssr-pu-->") {
            count++;
          } else if (chunk === "<!--qkssr-po-->") {
            count--;
          } else {
            enqueue(chunk);
          }
          const chunkSize = networkFlushes === 0 ? initialChunkSize : minimunChunkSize;
          if (count === 0 && (forceFlush || bufferSize >= chunkSize)) {
            forceFlush = false;
            flush();
          }
        }
      };
      break;
  }
  if (containerTagName === "html") {
    stream.write(DOCTYPE);
  } else {
    stream.write("<!--cq-->");
    if (opts.qwikLoader) {
      if (opts.qwikLoader.include === void 0) {
        opts.qwikLoader.include = "never";
      }
      if (opts.qwikLoader.position === void 0) {
        opts.qwikLoader.position = "bottom";
      }
    } else {
      opts.qwikLoader = {
        include: "never"
      };
    }
    if (!opts.qwikPrefetchServiceWorker) {
      opts.qwikPrefetchServiceWorker = {};
    }
    if (!opts.qwikPrefetchServiceWorker.include) {
      opts.qwikPrefetchServiceWorker.include = false;
    }
    if (!opts.qwikPrefetchServiceWorker.position) {
      opts.qwikPrefetchServiceWorker.position = "top";
    }
  }
  if (!opts.manifest) {
    console.warn(
      `Missing client manifest, loading symbols in the client might 404. Please ensure the client build has run and generated the manifest for the server build.`
    );
  }
  await setServerPlatform(opts, resolvedManifest);
  const injections = resolvedManifest == null ? void 0 : resolvedManifest.manifest.injections;
  const beforeContent = injections ? injections.map((injection) => jsx(injection.tag, injection.attributes ?? {})) : [];
  const includeMode = ((_b = opts.qwikLoader) == null ? void 0 : _b.include) ?? "auto";
  const positionMode = ((_c = opts.qwikLoader) == null ? void 0 : _c.position) ?? "bottom";
  if (positionMode === "top" && includeMode !== "never") {
    const qwikLoaderScript = getQwikLoaderScript({
      debug: opts.debug
    });
    beforeContent.push(
      jsx("script", {
        id: "qwikloader",
        dangerouslySetInnerHTML: qwikLoaderScript
      })
    );
    beforeContent.push(
      jsx("script", {
        dangerouslySetInnerHTML: `window.qwikevents.push('click')`
      })
    );
  }
  const renderTimer = createTimer();
  const renderSymbols = [];
  let renderTime = 0;
  let snapshotTime = 0;
  await _renderSSR(rootNode, {
    stream,
    containerTagName,
    containerAttributes,
    serverData: opts.serverData,
    base: buildBase,
    beforeContent,
    beforeClose: async (contexts, containerState, _dynamic, textNodes) => {
      var _a2, _b2, _c2, _d, _e;
      renderTime = renderTimer();
      const snapshotTimer = createTimer();
      snapshotResult = await _pauseFromContexts(contexts, containerState, void 0, textNodes);
      const children = [];
      if (opts.prefetchStrategy !== null) {
        const prefetchResources = getPrefetchResources(snapshotResult, opts, resolvedManifest);
        if (prefetchResources.length > 0) {
          const prefetchImpl = applyPrefetchImplementation(
            opts.prefetchStrategy,
            prefetchResources,
            (_a2 = opts.serverData) == null ? void 0 : _a2.nonce
          );
          if (prefetchImpl) {
            children.push(prefetchImpl);
          }
        }
      }
      const jsonData = JSON.stringify(snapshotResult.state, void 0, void 0);
      children.push(
        jsx("script", {
          type: "qwik/json",
          dangerouslySetInnerHTML: escapeText(jsonData),
          nonce: (_b2 = opts.serverData) == null ? void 0 : _b2.nonce
        })
      );
      if (snapshotResult.funcs.length > 0) {
        children.push(
          jsx("script", {
            "q:func": "qwik/json",
            dangerouslySetInnerHTML: serializeFunctions(snapshotResult.funcs),
            nonce: (_c2 = opts.serverData) == null ? void 0 : _c2.nonce
          })
        );
      }
      const needLoader = !snapshotResult || snapshotResult.mode !== "static";
      const includeLoader = includeMode === "always" || includeMode === "auto" && needLoader;
      if (includeLoader) {
        const qwikLoaderScript = getQwikLoaderScript({
          debug: opts.debug
        });
        children.push(
          jsx("script", {
            id: "qwikloader",
            dangerouslySetInnerHTML: qwikLoaderScript,
            nonce: (_d = opts.serverData) == null ? void 0 : _d.nonce
          })
        );
      }
      const extraListeners = Array.from(containerState.$events$, (s) => JSON.stringify(s));
      if (extraListeners.length > 0) {
        const content = (includeLoader ? `window.qwikevents` : `(window.qwikevents||=[])`) + `.push(${extraListeners.join(", ")})`;
        children.push(
          jsx("script", {
            dangerouslySetInnerHTML: content,
            nonce: (_e = opts.serverData) == null ? void 0 : _e.nonce
          })
        );
      }
      collectRenderSymbols(renderSymbols, contexts);
      snapshotTime = snapshotTimer();
      return jsx(Fragment, { children });
    },
    manifestHash: (resolvedManifest == null ? void 0 : resolvedManifest.manifest.manifestHash) || "dev"
  });
  if (containerTagName !== "html") {
    stream.write("<!--/cq-->");
  }
  flush();
  const isDynamic = snapshotResult.resources.some((r) => r._cache !== Infinity);
  const result = {
    prefetchResources: void 0,
    snapshotResult,
    flushes: networkFlushes,
    manifest: resolvedManifest == null ? void 0 : resolvedManifest.manifest,
    size: totalSize,
    isStatic: !isDynamic,
    timing: {
      render: renderTime,
      snapshot: snapshotTime,
      firstFlush: firstFlushTime
    },
    _symbols: renderSymbols
  };
  return result;
}
function resolveManifest(manifest2) {
  if (!manifest2) {
    return void 0;
  }
  if ("mapper" in manifest2) {
    return manifest2;
  }
  manifest2 = getValidManifest(manifest2);
  if (manifest2) {
    const mapper = {};
    Object.entries(manifest2.mapping).forEach(([key, value]) => {
      mapper[getSymbolHash(key)] = [key, value];
    });
    return {
      mapper,
      manifest: manifest2
    };
  }
  return void 0;
}
var escapeText = (str) => {
  return str.replace(/<(\/?script)/gi, "\\x3C$1");
};
function collectRenderSymbols(renderSymbols, elements) {
  var _a;
  for (const ctx of elements) {
    const symbol = (_a = ctx.$componentQrl$) == null ? void 0 : _a.getSymbol();
    if (symbol && !renderSymbols.includes(symbol)) {
      renderSymbols.push(symbol);
    }
  }
}
var Q_FUNCS_PREFIX = 'document.currentScript.closest("[q\\\\:container]").qFuncs=';
function serializeFunctions(funcs) {
  return Q_FUNCS_PREFIX + `[${funcs.join(",\n")}]`;
}
async function setServerPlatform2(manifest2) {
  const platform = createPlatform({ manifest: manifest2 }, resolveManifest(manifest2));
  setPlatform(platform);
}
const manifest = { "manifestHash": "5zti1n", "symbols": { "s_02wMImzEAbk": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component_useTask", "canonicalFilename": "s_02wmimzeabk", "hash": "02wMImzEAbk", "ctxKind": "function", "ctxName": "useTask$", "captures": true, "parent": "s_TxCFOy819ag", "loc": [27380, 36565] }, "s_2pdRVKDUavE": { "origin": "components/ThemeChanger/ThemeChanger.tsx", "displayName": "ThemeChanger_component_useTask", "canonicalFilename": "s_2pdrvkduave", "hash": "2pdRVKDUavE", "ctxKind": "function", "ctxName": "useTask$", "captures": true, "parent": "s_CiZja5l8W3k", "loc": [1105, 1274] }, "s_0pN0AMJa0Jg": { "origin": "components/ThemeSelector/ThemeSelector.tsx", "displayName": "ThemeSelector_component_useVisibleTask_1", "canonicalFilename": "s_0pn0amja0jg", "hash": "0pN0AMJa0Jg", "ctxKind": "function", "ctxName": "useVisibleTask$", "captures": true, "parent": "s_dakElEM0ZXA", "loc": [1022, 1120] }, "s_CPbFZ07aIik": { "origin": "components/ThemeSelectorOld/ThemeSelectorOld.tsx", "displayName": "ThemeSelectorOld_component_useVisibleTask", "canonicalFilename": "s_cpbfz07aiik", "hash": "CPbFZ07aIik", "ctxKind": "function", "ctxName": "useVisibleTask$", "captures": false, "parent": "s_5nLnpiV5H4c", "loc": [654, 689] }, "s_UCQH23x9mzU": { "origin": "components/starter/header/header.tsx", "displayName": "header_component_useVisibleTask", "canonicalFilename": "s_ucqh23x9mzu", "hash": "UCQH23x9mzU", "ctxKind": "function", "ctxName": "useVisibleTask$", "captures": true, "parent": "s_nZGrLeXTa6g", "loc": [356, 683] }, "s_WCYXMXaOdtE": { "origin": "components/ThemeSelector/ThemeSelector.tsx", "displayName": "ThemeSelector_component_useVisibleTask", "canonicalFilename": "s_wcyxmxaodte", "hash": "WCYXMXaOdtE", "ctxKind": "function", "ctxName": "useVisibleTask$", "captures": true, "parent": "s_dakElEM0ZXA", "loc": [714, 952] }, "s_0gfi0CXoYTc": { "origin": "components/starter/counter/counter.tsx", "displayName": "counter_component", "canonicalFilename": "s_0gfi0cxoytc", "hash": "0gfi0CXoYTc", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [162, 732] }, "s_1dXFoSbSWis": { "origin": "components/BottomNavbar/BottomNavbar.tsx", "displayName": "BottomNavbar_component", "canonicalFilename": "s_1dxfosbswis", "hash": "1dXFoSbSWis", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [192, 4424] }, "s_4Dx3te0wVYM": { "origin": "components/starter/infobox/infobox.tsx", "displayName": "infobox_component", "canonicalFilename": "s_4dx3te0wvym", "hash": "4Dx3te0wVYM", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [124, 261] }, "s_4pbcJajGtCs": { "origin": "components/router-head/router-head.tsx", "displayName": "RouterHead_component", "canonicalFilename": "s_4pbcjajgtcs", "hash": "4pbcJajGtCs", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [289, 1341] }, "s_5nLnpiV5H4c": { "origin": "components/ThemeSelectorOld/ThemeSelectorOld.tsx", "displayName": "ThemeSelectorOld_component", "canonicalFilename": "s_5nlnpiv5h4c", "hash": "5nLnpiV5H4c", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [588, 1136] }, "s_6cIfUe8AleY": { "origin": "components/starter/next-steps/next-steps.tsx", "displayName": "next_steps_component", "canonicalFilename": "s_6cifue8aley", "hash": "6cIfUe8AleY", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [1792, 3040] }, "s_7D0p4hAiqVE": { "origin": "components/starter/gauge/index.tsx", "displayName": "gauge_component", "canonicalFilename": "s_7d0p4haiqve", "hash": "7D0p4hAiqVE", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [116, 1127] }, "s_8gdLBszqbaM": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component", "canonicalFilename": "s_8gdlbszqbam", "hash": "8gdLBszqbaM", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [38549, 41209] }, "s_CiZja5l8W3k": { "origin": "components/ThemeChanger/ThemeChanger.tsx", "displayName": "ThemeChanger_component", "canonicalFilename": "s_cizja5l8w3k", "hash": "CiZja5l8W3k", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [112, 1761] }, "s_EvJLNGvXt18": { "origin": "components/DrawerButton/DrawerButton.tsx", "displayName": "DrawerButton_component", "canonicalFilename": "s_evjlngvxt18", "hash": "EvJLNGvXt18", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [88, 539] }, "s_Ipfp442DRLg": { "origin": "routes/blog/index.tsx", "displayName": "blog_component", "canonicalFilename": "s_ipfp442drlg", "hash": "Ipfp442DRLg", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [244, 4533] }, "s_Nk9PlpjQm9Y": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "GetForm_component", "canonicalFilename": "s_nk9plpjqm9y", "hash": "Nk9PlpjQm9Y", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [53873, 55644] }, "s_P4LpiWRSrIU": { "origin": "routes/index.tsx", "displayName": "routes_component", "canonicalFilename": "s_p4lpiwrsriu", "hash": "P4LpiWRSrIU", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [187, 242] }, "s_TxCFOy819ag": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component", "canonicalFilename": "s_txcfoy819ag", "hash": "TxCFOy819ag", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [23840, 36852] }, "s_VgJUqBljXKc": { "origin": "root.tsx", "displayName": "root_component", "canonicalFilename": "s_vgjuqbljxkc", "hash": "VgJUqBljXKc", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [268, 1126] }, "s_WmYC5H00wtI": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityMockProvider_component", "canonicalFilename": "s_wmyc5h00wti", "hash": "WmYC5H00wtI", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [37136, 38430] }, "s_bx6j0LaWyhg": { "origin": "components/starter/footer/footer.tsx", "displayName": "footer_component", "canonicalFilename": "s_bx6j0lawyhg", "hash": "bx6j0LaWyhg", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [121, 5833] }, "s_dakElEM0ZXA": { "origin": "components/ThemeSelector/ThemeSelector.tsx", "displayName": "ThemeSelector_component", "canonicalFilename": "s_dakelem0zxa", "hash": "dakElEM0ZXA", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [544, 2810] }, "s_e0ssiDXoeAM": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "RouterOutlet_component", "canonicalFilename": "s_e0ssidxoeam", "hash": "e0ssiDXoeAM", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [7828, 8542] }, "s_fNr1m43wcv8": { "origin": "routes/layout.tsx", "displayName": "layout_component", "canonicalFilename": "s_fnr1m43wcv8", "hash": "fNr1m43wcv8", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [990, 1198] }, "s_nZGrLeXTa6g": { "origin": "components/starter/header/header.tsx", "displayName": "header_component", "canonicalFilename": "s_nzgrlexta6g", "hash": "nZGrLeXTa6g", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [290, 1950] }, "s_snwU0Di7E7A": { "origin": "components/drawer/drawer.tsx", "displayName": "Drawer_component", "canonicalFilename": "s_snwu0di7e7a", "hash": "snwU0Di7E7A", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [174, 1176] }, "s_tNYG1Iu571w": { "origin": "routes/404.tsx", "displayName": "_404_component", "canonicalFilename": "s_tnyg1iu571w", "hash": "tNYG1Iu571w", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [134, 787] }, "s_zQysZhdKDPo": { "origin": "components/starter/hero/hero.tsx", "displayName": "hero_component", "canonicalFilename": "s_zqyszhdkdpo", "hash": "zQysZhdKDPo", "ctxKind": "function", "ctxName": "component$", "captures": false, "parent": null, "loc": [233, 25481] }, "s_RPDJAz33WLA": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component_useStyles", "canonicalFilename": "s_rpdjaz33wla", "hash": "RPDJAz33WLA", "ctxKind": "function", "ctxName": "useStyles$", "captures": false, "parent": "s_TxCFOy819ag", "loc": [23895, 23929] }, "s_A5bZC7WO00A": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "routeActionQrl_action_submit", "canonicalFilename": "s_a5bzc7wo00a", "hash": "A5bZC7WO00A", "ctxKind": "function", "ctxName": "submit", "captures": true, "parent": null, "loc": [42279, 43946] }, "s_DyVc0YBIqQU": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "spa_init", "canonicalFilename": "s_dyvc0ybiqqu", "hash": "DyVc0YBIqQU", "ctxKind": "function", "ctxName": "spaInit", "captures": false, "parent": null, "loc": [1366, 6841] }, "s_SGytLJ8uq8I": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "serverQrl_rpc", "canonicalFilename": "s_sgytlj8uq8i", "hash": "SGytLJ8uq8I", "ctxKind": "function", "ctxName": "rpc", "captures": true, "parent": null, "loc": [47701, 50608] }, "s_uPHV2oGn4wc": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Form_form_onSubmit", "canonicalFilename": "s_uphv2ogn4wc", "hash": "uPHV2oGn4wc", "ctxKind": "function", "ctxName": "_jsxS", "captures": true, "parent": null, "loc": [52785, 52934] }, "s_03wl4B3PYe4": { "origin": "components/ThemeSelector/ThemeSelector.tsx", "displayName": "ThemeSelector_component_div_ul_li_input_onChange", "canonicalFilename": "s_03wl4b3pye4", "hash": "03wl4B3PYe4", "ctxKind": "eventHandler", "ctxName": "onChange$", "captures": true, "parent": "s_dakElEM0ZXA", "loc": [2246, 2277] }, "s_2eKHV0tUzxE": { "origin": "components/ThemeSelector/ThemeSelector.tsx", "displayName": "ThemeSelector_component_handleThemeChange", "canonicalFilename": "s_2ekhv0tuzxe", "hash": "2eKHV0tUzxE", "ctxKind": "function", "ctxName": "$", "captures": true, "parent": "s_dakElEM0ZXA", "loc": [1188, 1319] }, "s_4ElcLab76lQ": { "origin": "components/starter/next-steps/next-steps.tsx", "displayName": "next_steps_component_div_button_onClick", "canonicalFilename": "s_4elclab76lq", "hash": "4ElcLab76lQ", "ctxKind": "eventHandler", "ctxName": "onClick$", "captures": true, "parent": "s_6cIfUe8AleY", "loc": [2689, 2721] }, "s_BUbtvTyvVRE": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityMockProvider_component_goto", "canonicalFilename": "s_bubtvtyvvre", "hash": "BUbtvTyvVRE", "ctxKind": "function", "ctxName": "goto", "captures": false, "parent": "s_WmYC5H00wtI", "loc": [37551, 37629] }, "s_KK5BfmKH4ZI": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "GetForm_component_form_onSubmit_1", "canonicalFilename": "s_kk5bfmkh4zi", "hash": "KK5BfmKH4ZI", "ctxKind": "function", "ctxName": "_jsxS", "captures": false, "parent": "s_Nk9PlpjQm9Y", "loc": [54979, 55303] }, "s_OW0OMENauVE": { "origin": "components/starter/counter/counter.tsx", "displayName": "counter_component_div_button_onClick_1", "canonicalFilename": "s_ow0omenauve", "hash": "OW0OMENauVE", "ctxKind": "eventHandler", "ctxName": "onClick$", "captures": true, "parent": "s_0gfi0CXoYTc", "loc": [648, 679] }, "s_Osdg8FnYTw4": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_handlePrefetch", "canonicalFilename": "s_osdg8fnytw4", "hash": "Osdg8FnYTw4", "ctxKind": "function", "ctxName": "handlePrefetch", "captures": false, "parent": "s_8gdLBszqbaM", "loc": [39249, 39580] }, "s_QhgO20uMdCQ": { "origin": "components/starter/next-steps/next-steps.tsx", "displayName": "next_steps_component_useOnWindow", "canonicalFilename": "s_qhgo20umdcq", "hash": "QhgO20uMdCQ", "ctxKind": "function", "ctxName": "$", "captures": true, "parent": "s_6cIfUe8AleY", "loc": [1880, 1988] }, "s_RI4ZVJ18hxE": { "origin": "components/starter/hero/hero.tsx", "displayName": "hero_component_scrollToNextSection", "canonicalFilename": "s_ri4zvj18hxe", "hash": "RI4ZVJ18hxE", "ctxKind": "function", "ctxName": "$", "captures": true, "parent": "s_zQysZhdKDPo", "loc": [342, 419] }, "s_Wq2Hs0j004o": { "origin": "components/starter/counter/counter.tsx", "displayName": "counter_component_div_button_onClick", "canonicalFilename": "s_wq2hs0j004o", "hash": "Wq2Hs0j004o", "ctxKind": "eventHandler", "ctxName": "onClick$", "captures": true, "parent": "s_0gfi0CXoYTc", "loc": [472, 503] }, "s_XDJIbtUnw50": { "origin": "components/starter/next-steps/next-steps.tsx", "displayName": "next_steps_component_div_button_onClick_1", "canonicalFilename": "s_xdjibtunw50", "hash": "XDJIbtUnw50", "ctxKind": "eventHandler", "ctxName": "onClick$", "captures": true, "parent": "s_6cIfUe8AleY", "loc": [2929, 2965] }, "s_eDpVP0KBhUs": { "origin": "components/ThemeChanger/ThemeChanger.tsx", "displayName": "ThemeChanger_component_handleChangeTheme", "canonicalFilename": "s_edpvp0kbhus", "hash": "eDpVP0KBhUs", "ctxKind": "function", "ctxName": "$", "captures": true, "parent": "s_CiZja5l8W3k", "loc": [806, 1090] }, "s_fX0bDjeJa0E": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCityProvider_component_goto", "canonicalFilename": "s_fx0bdjeja0e", "hash": "fX0bDjeJa0E", "ctxKind": "function", "ctxName": "goto", "captures": true, "parent": "s_TxCFOy819ag", "loc": [25238, 26768] }, "s_p9MSze0ojs4": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "GetForm_component_form_onSubmit", "canonicalFilename": "s_p9msze0ojs4", "hash": "p9MSze0ojs4", "ctxKind": "function", "ctxName": "_jsxS", "captures": true, "parent": "s_Nk9PlpjQm9Y", "loc": [54464, 54873] }, "s_pIf0khHUxfY": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_handleClick", "canonicalFilename": "s_pif0khhuxfy", "hash": "pIf0khHUxfY", "ctxKind": "function", "ctxName": "handleClick", "captures": true, "parent": "s_8gdLBszqbaM", "loc": [40007, 40527] }, "s_pMWFVDdDl3M": { "origin": "components/ThemeSelector/ThemeSelector.tsx", "displayName": "ThemeSelector_component_div_ul_li_input_onChange_1", "canonicalFilename": "s_pmwfvdddl3m", "hash": "pMWFVDdDl3M", "ctxKind": "eventHandler", "ctxName": "onChange$", "captures": true, "parent": "s_dakElEM0ZXA", "loc": [2648, 2684] }, "s_zT1txil2NZM": { "origin": "components/starter/counter/counter.tsx", "displayName": "counter_component_setCount", "canonicalFilename": "s_zt1txil2nzm", "hash": "zT1txil2NZM", "ctxKind": "function", "ctxName": "$", "captures": true, "parent": "s_0gfi0CXoYTc", "loc": [223, 340] } }, "mapping": { "s_02wMImzEAbk": "q-BiuXI5Lo.js", "s_2pdRVKDUavE": "q-Beg2GmFb.js", "s_0pN0AMJa0Jg": "q-Bt6-mdhr.js", "s_CPbFZ07aIik": "q-B3R10STm.js", "s_UCQH23x9mzU": "q-Ce1w65Uq.js", "s_WCYXMXaOdtE": "q-Bt6-mdhr.js", "s_0gfi0CXoYTc": "q-ax6lccjF.js", "s_1dXFoSbSWis": "q-D9xGsuKV.js", "s_4Dx3te0wVYM": "q-Dfdf_5bK.js", "s_4pbcJajGtCs": "q-CXBnnB6S.js", "s_5nLnpiV5H4c": "q-B3R10STm.js", "s_6cIfUe8AleY": "q-Cq4lj60y.js", "s_7D0p4hAiqVE": "q-o8fjqDP-.js", "s_8gdLBszqbaM": "q-f2qdL91B.js", "s_CiZja5l8W3k": "q-Beg2GmFb.js", "s_EvJLNGvXt18": "q-BaWMWf1t.js", "s_Ipfp442DRLg": "q-DR4oNU7p.js", "s_Nk9PlpjQm9Y": "q-BUfqQ13i.js", "s_P4LpiWRSrIU": "q-Cg5rKDC8.js", "s_TxCFOy819ag": "q-BiuXI5Lo.js", "s_VgJUqBljXKc": "q-BGOj0Kwz.js", "s_WmYC5H00wtI": "q-DU1YHo9O.js", "s_bx6j0LaWyhg": "q-Cey-aXHY.js", "s_dakElEM0ZXA": "q-Bt6-mdhr.js", "s_e0ssiDXoeAM": "q-BOVLX0r9.js", "s_fNr1m43wcv8": "q-XOQuke6J.js", "s_nZGrLeXTa6g": "q-Ce1w65Uq.js", "s_snwU0Di7E7A": "q-DvNYHnGq.js", "s_tNYG1Iu571w": "q-CFW9j4YO.js", "s_zQysZhdKDPo": "q-DRYmST9W.js", "s_RPDJAz33WLA": "q-BiuXI5Lo.js", "s_A5bZC7WO00A": "q-TCbtd4C3.js", "s_DyVc0YBIqQU": "q-D3WBTSLL.js", "s_SGytLJ8uq8I": "q-CZIVYdBX.js", "s_uPHV2oGn4wc": "q-bxQknXqr.js", "s_03wl4B3PYe4": "q-Bt6-mdhr.js", "s_2eKHV0tUzxE": "q-Bt6-mdhr.js", "s_4ElcLab76lQ": "q-Cq4lj60y.js", "s_BUbtvTyvVRE": "q-DU1YHo9O.js", "s_KK5BfmKH4ZI": "q-BUfqQ13i.js", "s_OW0OMENauVE": "q-ax6lccjF.js", "s_Osdg8FnYTw4": "q-f2qdL91B.js", "s_QhgO20uMdCQ": "q-Cq4lj60y.js", "s_RI4ZVJ18hxE": "q-DRYmST9W.js", "s_Wq2Hs0j004o": "q-ax6lccjF.js", "s_XDJIbtUnw50": "q-Cq4lj60y.js", "s_eDpVP0KBhUs": "q-Beg2GmFb.js", "s_fX0bDjeJa0E": "q-BiuXI5Lo.js", "s_p9MSze0ojs4": "q-BUfqQ13i.js", "s_pIf0khHUxfY": "q-f2qdL91B.js", "s_pMWFVDdDl3M": "q-Bt6-mdhr.js", "s_zT1txil2NZM": "q-ax6lccjF.js" }, "bundles": { "q-ax6lccjF.js": { "size": 1154, "imports": ["q-DOfOxinU.js", "q-uemlvruI.js"], "dynamicImports": ["q-o8fjqDP-.js"], "origins": ["src/components/starter/counter/counter.module.css", "src/components/starter/gauge/index.tsx", "src/entry_counter.js", "src/s_0gfi0cxoytc.js", "src/s_ow0omenauve.js", "src/s_wq2hs0j004o.js", "src/s_zt1txil2nzm.js"], "symbols": ["s_0gfi0CXoYTc", "s_OW0OMENauVE", "s_Wq2Hs0j004o", "s_zT1txil2NZM"] }, "q-B3R10STm.js": { "size": 4278, "imports": ["q-DOfOxinU.js", "q-uemlvruI.js"], "origins": ["node_modules/theme-change/index.js", "src/components/ThemeSelectorOld/ThemeSelectorOld.tsx", "src/entry_ThemeSelectorOld.js", "src/s_5nlnpiv5h4c.js", "src/s_cpbfz07aiik.js"], "symbols": ["s_5nLnpiV5H4c", "s_CPbFZ07aIik"] }, "q-BaWMWf1t.js": { "size": 427, "imports": ["q-DOfOxinU.js"], "origins": ["src/entry_DrawerButton.js", "src/s_evjlngvxt18.js"], "symbols": ["s_EvJLNGvXt18"] }, "q-Beg2GmFb.js": { "size": 1476, "imports": ["q-DOfOxinU.js", "q-uemlvruI.js"], "origins": ["src/entry_ThemeChanger.js", "src/s_2pdrvkduave.js", "src/s_cizja5l8w3k.js", "src/s_edpvp0kbhus.js"], "symbols": ["s_2pdRVKDUavE", "s_CiZja5l8W3k", "s_eDpVP0KBhUs"] }, "q-BGOj0Kwz.js": { "size": 821, "imports": ["q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "dynamicImports": ["q-CXBnnB6S.js"], "origins": ["src/components/router-head/router-head.tsx", "src/entry_root.js", "src/s_vgjuqbljxkc.js"], "symbols": ["s_VgJUqBljXKc"] }, "q-BiuXI5Lo.js": { "size": 5842, "imports": ["q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "dynamicImports": ["q-BY5ccTA0.js", "q-D6cBV_wf.js", "q-D8TebJPg.js", "q-DuCJUo8d.js", "q-MNErTmVU.js"], "origins": ["@qwik-city-plan", "src/entry_QwikCityProvider.js", "src/s_02wmimzeabk.js", "src/s_fx0bdjeja0e.js", "src/s_rpdjaz33wla.js", "src/s_txcfoy819ag.js"], "symbols": ["s_02wMImzEAbk", "s_fX0bDjeJa0E", "s_RPDJAz33WLA", "s_TxCFOy819ag"] }, "q-BOVLX0r9.js": { "size": 491, "imports": ["q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "origins": ["src/entry_RouterOutlet.js", "src/s_e0ssidxoeam.js"], "symbols": ["s_e0ssiDXoeAM"] }, "q-Bt6-mdhr.js": { "size": 2283, "imports": ["q-D_Z4-cek.js", "q-DOfOxinU.js", "q-uemlvruI.js"], "origins": ["src/entry_ThemeSelector.js", "src/s_03wl4b3pye4.js", "src/s_0pn0amja0jg.js", "src/s_2ekhv0tuzxe.js", "src/s_dakelem0zxa.js", "src/s_pmwfvdddl3m.js", "src/s_wcyxmxaodte.js"], "symbols": ["s_03wl4B3PYe4", "s_0pN0AMJa0Jg", "s_2eKHV0tUzxE", "s_dakElEM0ZXA", "s_pMWFVDdDl3M", "s_WCYXMXaOdtE"] }, "q-BUfqQ13i.js": { "size": 1351, "imports": ["q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "origins": ["src/entry_GetForm.js", "src/s_kk5bfmkh4zi.js", "src/s_nk9plpjqm9y.js", "src/s_p9msze0ojs4.js"], "symbols": ["s_KK5BfmKH4ZI", "s_Nk9PlpjQm9Y", "s_p9MSze0ojs4"] }, "q-bxQknXqr.js": { "size": 125, "imports": ["q-DOfOxinU.js"], "origins": ["src/entry_Form.js", "src/s_uphv2ogn4wc.js"], "symbols": ["s_uPHV2oGn4wc"] }, "q-BY5ccTA0.js": { "size": 125, "imports": ["q-uemlvruI.js"], "dynamicImports": ["q-iz7VWvBz.js"], "origins": ["@qwik-city-entries"] }, "q-Ce1w65Uq.js": { "size": 1843, "imports": ["q-D_Z4-cek.js", "q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "dynamicImports": ["q-BaWMWf1t.js"], "origins": ["src/components/DrawerButton/DrawerButton.tsx", "src/entry_header.js", "src/s_nzgrlexta6g.js", "src/s_ucqh23x9mzu.js"], "symbols": ["s_nZGrLeXTa6g", "s_UCQH23x9mzU"] }, "q-Cey-aXHY.js": { "size": 4852, "imports": ["q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "origins": ["src/entry_footer.js", "src/s_bx6j0lawyhg.js"], "symbols": ["s_bx6j0LaWyhg"] }, "q-CFW9j4YO.js": { "size": 690, "imports": ["q-DOfOxinU.js"], "origins": ["src/entry_404.js", "src/s_tnyg1iu571w.js"], "symbols": ["s_tNYG1Iu571w"] }, "q-Cg5rKDC8.js": { "size": 241, "imports": ["q-DOfOxinU.js", "q-uemlvruI.js"], "dynamicImports": ["q-DRYmST9W.js"], "origins": ["src/components/starter/hero/hero.tsx", "src/entry_routes.js", "src/s_p4lpiwrsriu.js"], "symbols": ["s_P4LpiWRSrIU"] }, "q-Cq4lj60y.js": { "size": 2969, "imports": ["q-DOfOxinU.js", "q-uemlvruI.js"], "origins": ["src/components/starter/next-steps/next-steps.module.css", "src/components/starter/next-steps/next-steps.tsx", "src/entry_next_steps.js", "src/s_4elclab76lq.js", "src/s_6cifue8aley.js", "src/s_qhgo20umdcq.js", "src/s_xdjibtunw50.js"], "symbols": ["s_4ElcLab76lQ", "s_6cIfUe8AleY", "s_QhgO20uMdCQ", "s_XDJIbtUnw50"] }, "q-CXBnnB6S.js": { "size": 1226, "imports": ["q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "origins": ["node_modules/@qwikdev/pwa/lib/head.qwik.js", "src/entry_RouterHead.js", "src/s_4pbcjajgtcs.js"], "symbols": ["s_4pbcJajGtCs"] }, "q-CZIVYdBX.js": { "size": 1215, "imports": ["q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "origins": ["src/entry_serverQrl.js", "src/s_sgytlj8uq8i.js"], "symbols": ["s_SGytLJ8uq8I"] }, "q-D3WBTSLL.js": { "size": 2280, "origins": ["src/entry_spaInit.js", "src/s_dyvc0ybiqqu.js"], "symbols": ["s_DyVc0YBIqQU"] }, "q-D6cBV_wf.js": { "size": 366, "imports": ["q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "dynamicImports": ["q-XOQuke6J.js"], "origins": ["src/routes/layout.tsx"] }, "q-D8TebJPg.js": { "size": 256, "imports": ["q-DOfOxinU.js", "q-uemlvruI.js"], "dynamicImports": ["q-Cg5rKDC8.js"], "origins": ["src/routes/index.tsx"] }, "q-D9xGsuKV.js": { "size": 3304, "imports": ["q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "origins": ["src/entry_BottomNavbar.js", "src/s_1dxfosbswis.js"], "symbols": ["s_1dXFoSbSWis"] }, "q-D_Z4-cek.js": { "size": 474, "imports": ["q-DOfOxinU.js", "q-uemlvruI.js"], "dynamicImports": ["q-Bt6-mdhr.js"], "origins": ["src/components/ThemeSelector/ThemeSelector.tsx"] }, "q-Dfdf_5bK.js": { "size": 261, "imports": ["q-DOfOxinU.js"], "origins": ["src/components/starter/infobox/infobox.module.css", "src/entry_infobox.js", "src/s_4dx3te0wvym.js"], "symbols": ["s_4Dx3te0wVYM"] }, "q-DIg5zwvB.js": { "size": 338, "imports": ["q-DOfOxinU.js"], "origins": ["src/media/reparin.png?jsx"] }, "q-DOfOxinU.js": { "size": 64597, "origins": ["@builder.io/qwik/build", "node_modules/@builder.io/qwik/core.prod.mjs"] }, "q-DR4oNU7p.js": { "size": 3952, "imports": ["q-DIg5zwvB.js", "q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "origins": ["src/entry_blog.js", "src/media/blog/xz-manpage.avif?jsx", "src/s_ipfp442drlg.js"], "symbols": ["s_Ipfp442DRLg"] }, "q-DRYmST9W.js": { "size": 22011, "imports": ["q-DIg5zwvB.js", "q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "origins": ["src/entry_hero.js", "src/media/hisyam.jpg?jsx", "src/s_ri4zvj18hxe.js", "src/s_zqyszhdkdpo.js"], "symbols": ["s_RI4ZVJ18hxE", "s_zQysZhdKDPo"] }, "q-DU1YHo9O.js": { "size": 845, "imports": ["q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "origins": ["src/entry_QwikCityMockProvider.js", "src/s_bubtvtyvvre.js", "src/s_wmyc5h00wti.js"], "symbols": ["s_BUbtvTyvVRE", "s_WmYC5H00wtI"] }, "q-DuCJUo8d.js": { "size": 207, "imports": ["q-DOfOxinU.js", "q-uemlvruI.js"], "dynamicImports": ["q-CFW9j4YO.js"], "origins": ["src/routes/404.tsx"] }, "q-DvNYHnGq.js": { "size": 1036, "imports": ["q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "origins": ["src/entry_Drawer.js", "src/s_snwu0di7e7a.js"], "symbols": ["s_snwU0Di7E7A"] }, "q-f2qdL91B.js": { "size": 1514, "imports": ["q-DOfOxinU.js", "q-jjn6GexR.js", "q-uemlvruI.js"], "origins": ["src/entry_Link.js", "src/s_8gdlbszqbam.js", "src/s_osdg8fnytw4.js", "src/s_pif0khhuxfy.js"], "symbols": ["s_8gdLBszqbaM", "s_Osdg8FnYTw4", "s_pIf0khHUxfY"] }, "q-iz7VWvBz.js": { "size": 21073, "origins": ["node_modules/@builder.io/qwik-city/service-worker.mjs", "node_modules/@qwikdev/pwa/lib/sw.qwik.js", "src/routes/service-worker.ts"] }, "q-jjn6GexR.js": { "size": 9026, "imports": ["q-DOfOxinU.js", "q-uemlvruI.js"], "dynamicImports": ["q-BiuXI5Lo.js", "q-BOVLX0r9.js", "q-D3WBTSLL.js", "q-f2qdL91B.js"], "origins": ["@qwik-city-sw-register", "node_modules/@builder.io/qwik-city/index.qwik.mjs"] }, "q-MNErTmVU.js": { "size": 210, "imports": ["q-DOfOxinU.js", "q-uemlvruI.js"], "dynamicImports": ["q-DR4oNU7p.js"], "origins": ["src/routes/blog/index.tsx"] }, "q-mRm29Si4.js": { "size": 171, "imports": ["q-DOfOxinU.js", "q-uemlvruI.js"], "dynamicImports": ["q-BGOj0Kwz.js"], "origins": ["src/global.css", "src/root.tsx"] }, "q-o8fjqDP-.js": { "size": 955, "imports": ["q-DOfOxinU.js"], "origins": ["src/components/starter/gauge/gauge.module.css", "src/entry_gauge.js", "src/s_7d0p4haiqve.js"], "symbols": ["s_7D0p4hAiqVE"] }, "q-TCbtd4C3.js": { "size": 761, "imports": ["q-DOfOxinU.js"], "origins": ["src/entry_routeActionQrl.js", "src/s_a5bzc7wo00a.js"], "symbols": ["s_A5bZC7WO00A"] }, "q-uemlvruI.js": { "size": 1077 }, "q-XOQuke6J.js": { "size": 599, "imports": ["q-DOfOxinU.js", "q-uemlvruI.js"], "dynamicImports": ["q-Ce1w65Uq.js", "q-Cey-aXHY.js", "q-D9xGsuKV.js", "q-DvNYHnGq.js"], "origins": ["src/components/BottomNavbar/BottomNavbar.tsx", "src/components/drawer/drawer.tsx", "src/components/starter/footer/footer.tsx", "src/components/starter/header/header.tsx", "src/entry_layout.js", "src/s_fnr1m43wcv8.js"], "symbols": ["s_fNr1m43wcv8"] } }, "injections": [{ "tag": "link", "location": "head", "attributes": { "rel": "stylesheet", "href": "/build/q-mH-4ZdZx.css" } }], "version": "1", "options": { "target": "client", "buildMode": "production", "entryStrategy": { "type": "smart" } }, "platform": { "qwik": "1.5.7", "vite": "", "rollup": "4.18.0", "env": "node", "os": "win32", "node": "21.5.0" } };
const links$1 = [{ "key": "/favicon.ico", "rel": "icon", "href": "/favicon.ico", "sizes": "48x48" }, { "key": "/favicon.svg", "rel": "icon", "href": "/favicon.svg", "sizes": "any", "type": "image/svg+xml" }, { "key": "/apple-touch-icon-180x180.png", "rel": "apple-touch-icon", "href": "/apple-touch-icon-180x180.png" }];
const meta$1 = [{ "key": "theme-color", "content": "#fff", "name": "theme-color" }];
const meta = meta$1;
const links = links$1;
const s_4pbcJajGtCs = () => {
  const head = useDocumentHead();
  const loc = useLocation();
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: [
      /* @__PURE__ */ _jsxQ("title", null, null, head.title, 1, null),
      /* @__PURE__ */ _jsxQ("link", null, {
        rel: "canonical",
        href: _fnSignal((p0) => p0.url.href, [
          loc
        ], "p0.url.href")
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("meta", null, {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }, null, 3, null),
      meta.map((l) => /* @__PURE__ */ _jsxS("meta", {
        ...l
      }, null, 0, l.key)),
      links.map((l) => /* @__PURE__ */ _jsxS("link", {
        ...l
      }, null, 0, l.key)),
      head.meta.map((m) => /* @__PURE__ */ _jsxS("meta", {
        ...m
      }, null, 0, m.key)),
      head.links.map((l) => /* @__PURE__ */ _jsxS("link", {
        ...l
      }, null, 0, l.key)),
      head.styles.map((s) => {
        var _a;
        return /* @__PURE__ */ _jsxS("style", {
          ...s.props,
          ...((_a = s.props) == null ? void 0 : _a.dangerouslySetInnerHTML) ? {} : {
            dangerouslySetInnerHTML: s.style
          }
        }, null, 0, s.key);
      }),
      head.scripts.map((s) => {
        var _a;
        return /* @__PURE__ */ _jsxS("script", {
          ...s.props,
          ...((_a = s.props) == null ? void 0 : _a.dangerouslySetInnerHTML) ? {} : {
            dangerouslySetInnerHTML: s.script
          }
        }, null, 0, s.key);
      })
    ]
  }, 1, "9N_0");
};
const RouterHead = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_4pbcJajGtCs, "s_4pbcJajGtCs"));
const s_VgJUqBljXKc = () => {
  return /* @__PURE__ */ _jsxC(QwikCityProvider, {
    children: [
      /* @__PURE__ */ _jsxQ("head", null, null, [
        /* @__PURE__ */ _jsxQ("meta", null, {
          charset: "utf-8"
        }, null, 3, null),
        /* @__PURE__ */ _jsxQ("link", null, {
          rel: "manifest",
          href: "/manifest.json"
        }, null, 3, null),
        /* @__PURE__ */ _jsxC(RouterHead, null, 3, "TT_0"),
        /* @__PURE__ */ _jsxQ("script", null, {
          dangerouslySetInnerHTML: `
    (function() {
      function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }
      var theme = localStorage.getItem('theme');
      setTheme(theme);
    })();
  `
        }, null, 3, null),
        /* @__PURE__ */ _jsxC(ServiceWorkerRegister, null, 3, "TT_1")
      ], 1, null),
      /* @__PURE__ */ _jsxQ("body", null, {
        lang: "en"
      }, /* @__PURE__ */ _jsxC(RouterOutlet, null, 3, "TT_2"), 1, null)
    ]
  }, 1, "TT_3");
};
const Root = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_VgJUqBljXKc, "s_VgJUqBljXKc"));
function render(opts) {
  return renderToStream(/* @__PURE__ */ _jsxC(Root, null, 3, "jC_0"), {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: "en-us",
      ...opts.containerAttributes
    },
    serverData: {
      ...opts.serverData
    }
  });
}
export {
  manifest as m,
  render as r,
  setServerPlatform2 as s
};
