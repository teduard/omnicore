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
    "revision": "f217668b3bf9da0591b7a17de9b9251a"
  }, {
    "url": "404.html",
    "revision": "3d58dfedc54bf05a23d2c31f458dd246"
  }, {
    "url": "assets/workbox-window.prod.es5-BIl4cyR9.js",
    "revision": null
  }, {
    "url": "assets/webllm-DFLBea7M.js",
    "revision": null
  }, {
    "url": "assets/useCategories-BB-fkeWi.js",
    "revision": null
  }, {
    "url": "assets/use-select-CPEYJKSx.js",
    "revision": null
  }, {
    "url": "assets/use-select-0B8g2LyH.css",
    "revision": null
  }, {
    "url": "assets/sql-wasm-CbWyWKgW.wasm",
    "revision": null
  }, {
    "url": "assets/react-pdf-boJA5j70.js",
    "revision": null
  }, {
    "url": "assets/internal-DfANjbid.css",
    "revision": null
  }, {
    "url": "assets/internal-BrDqYct8.js",
    "revision": null
  }, {
    "url": "assets/index-QmjHETKI.js",
    "revision": null
  }, {
    "url": "assets/index-LtbZklMj.css",
    "revision": null
  }, {
    "url": "assets/index-DrlbA6mj.js",
    "revision": null
  }, {
    "url": "assets/index-DJF5MQcG.js",
    "revision": null
  }, {
    "url": "assets/index-Cq235N6r.js",
    "revision": null
  }, {
    "url": "assets/index-CICcC3j8.css",
    "revision": null
  }, {
    "url": "assets/index-Bu7-U3gE.js",
    "revision": null
  }, {
    "url": "assets/index-BHZ_Gn1G.css",
    "revision": null
  }, {
    "url": "assets/highcharts-more-Ci34_Zyy.js",
    "revision": null
  }, {
    "url": "assets/highcharts-D9hMF4ZW.js",
    "revision": null
  }, {
    "url": "assets/accessibility-DmYp31JV.js",
    "revision": null
  }, {
    "url": "assets/SystemSettings-CICov9G4.js",
    "revision": null
  }, {
    "url": "assets/Profile-CFEet9yi.js",
    "revision": null
  }, {
    "url": "assets/Preferences-CJKDow6d.js",
    "revision": null
  }, {
    "url": "assets/MonthPicker-DjtZmLpq.js",
    "revision": null
  }, {
    "url": "assets/MonthPicker-3tFKCjB0.css",
    "revision": null
  }, {
    "url": "assets/Layout-Dxu7GnNO.js",
    "revision": null
  }, {
    "url": "assets/ExpenseLayout-Cph1TQGe.js",
    "revision": null
  }, {
    "url": "assets/ExpenseEdit-D2XW3vG5.js",
    "revision": null
  }, {
    "url": "assets/ExpenseDashboard-D9V26Hxs.js",
    "revision": null
  }, {
    "url": "assets/ExpenseDashboard-C-UjkKS6.css",
    "revision": null
  }, {
    "url": "assets/ExpenseCostExplorer-DPFsyCix.js",
    "revision": null
  }, {
    "url": "assets/ExpenseCategoryEdit-BSLkWk6v.js",
    "revision": null
  }, {
    "url": "assets/ExpenseCategoriesAdd-BxG1MPgi.js",
    "revision": null
  }, {
    "url": "assets/ExpenseCategories-rd__Oibs.js",
    "revision": null
  }, {
    "url": "assets/ExpenseAdd-B4kO9sIN.js",
    "revision": null
  }, {
    "url": "assets/Documentation-cuqbG6hU.js",
    "revision": null
  }, {
    "url": "assets/Dashboard-ChkMkoX8.js",
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
