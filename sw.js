/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-5a5d9309'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "index.html",
    "revision": "84619b9acb535c8c8b49b31d8912b603"
  }, {
    "url": "404.html",
    "revision": "3d58dfedc54bf05a23d2c31f458dd246"
  }, {
    "url": "assets/workbox-window.prod.es5-BIl4cyR9.js",
    "revision": null
  }, {
    "url": "assets/webllm-l0sNRNKZ.js",
    "revision": null
  }, {
    "url": "assets/sql-wasm-CbWyWKgW.wasm",
    "revision": null
  }, {
    "url": "assets/internal-Dxpm5i3b.js",
    "revision": null
  }, {
    "url": "assets/internal-DfANjbid.css",
    "revision": null
  }, {
    "url": "assets/index-w18fh6ws.js",
    "revision": null
  }, {
    "url": "assets/index-uu3zVhp3.css",
    "revision": null
  }, {
    "url": "assets/index-i8URqjWk.js",
    "revision": null
  }, {
    "url": "assets/index-LtbZklMj.css",
    "revision": null
  }, {
    "url": "assets/index-D_lqj6Qb.js",
    "revision": null
  }, {
    "url": "assets/index-D4Hf28AK.js",
    "revision": null
  }, {
    "url": "assets/index-Bh1snd4x.css",
    "revision": null
  }, {
    "url": "assets/highcharts-more-MlHmJaxH.js",
    "revision": null
  }, {
    "url": "assets/highcharts-C7XplHEk.js",
    "revision": null
  }, {
    "url": "assets/accessibility-BjfWnehx.js",
    "revision": null
  }, {
    "url": "assets/SystemSettings-BvTNmygi.js",
    "revision": null
  }, {
    "url": "assets/MonthPicker-Cruv2OYY.js",
    "revision": null
  }, {
    "url": "assets/MonthPicker-3tFKCjB0.css",
    "revision": null
  }, {
    "url": "assets/ExpenseLayout-Bg0ba4xj.js",
    "revision": null
  }, {
    "url": "assets/ExpenseDashboard-vsZ_jlcZ.js",
    "revision": null
  }, {
    "url": "assets/ExpenseDashboard-CKsLCq0O.css",
    "revision": null
  }, {
    "url": "assets/ExpenseCostExplorerTable-D4tjjTEd.js",
    "revision": null
  }, {
    "url": "assets/ExpenseCostExplorerLocal-B0_G2acf.js",
    "revision": null
  }, {
    "url": "assets/ExpenseCostExplorer-pXFJPHHO.js",
    "revision": null
  }, {
    "url": "assets/ExpenseCategoriesAdd-i3AvBqhH.js",
    "revision": null
  }, {
    "url": "assets/ExpenseCategories-Ce7twbtT.js",
    "revision": null
  }, {
    "url": "assets/ExpenseAddLocal-BqKHaVCu.js",
    "revision": null
  }, {
    "url": "assets/ExpenseAdd-CcythRVj.js",
    "revision": null
  }, {
    "url": "favicon.ico",
    "revision": "cf3942ed10df780bec4ff4b58eab5277"
  }, {
    "url": "manifest.webmanifest",
    "revision": "c3c4afe017c508da8076846eca5b0e55"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
