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
    "revision": "3b9b62b836914ebf5739d841dc4671a5"
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
    "url": "assets/internal-DxlDOgS-.js",
    "revision": null
  }, {
    "url": "assets/internal-DfANjbid.css",
    "revision": null
  }, {
    "url": "assets/index-uu3zVhp3.css",
    "revision": null
  }, {
    "url": "assets/index-LtbZklMj.css",
    "revision": null
  }, {
    "url": "assets/index-Dm13pMsY.js",
    "revision": null
  }, {
    "url": "assets/index-DgmgMkRH.js",
    "revision": null
  }, {
    "url": "assets/index-DVwEdowm.js",
    "revision": null
  }, {
    "url": "assets/index-CGHGoRGm.js",
    "revision": null
  }, {
    "url": "assets/index-Bh1snd4x.css",
    "revision": null
  }, {
    "url": "assets/index-BH-jVFMI.js",
    "revision": null
  }, {
    "url": "assets/highcharts-more-U_VGJpwz.js",
    "revision": null
  }, {
    "url": "assets/highcharts-D2ADY7-e.js",
    "revision": null
  }, {
    "url": "assets/accessibility-nunJxXlp.js",
    "revision": null
  }, {
    "url": "assets/SystemSettings-CAsL05dy.js",
    "revision": null
  }, {
    "url": "assets/MonthPicker-B6LjpLo2.js",
    "revision": null
  }, {
    "url": "assets/MonthPicker-3tFKCjB0.css",
    "revision": null
  }, {
    "url": "assets/ExpenseLayout-CWXf47gE.js",
    "revision": null
  }, {
    "url": "assets/ExpenseDashboardLocal-DrgrIXbO.js",
    "revision": null
  }, {
    "url": "assets/ExpenseDashboardLocal-CKsLCq0O.css",
    "revision": null
  }, {
    "url": "assets/ExpenseCostExplorerTable-Da64BOF4.js",
    "revision": null
  }, {
    "url": "assets/ExpenseCostExplorerLocal-De0fphsS.js",
    "revision": null
  }, {
    "url": "assets/ExpenseCostExplorer-B7l28nBP.js",
    "revision": null
  }, {
    "url": "assets/ExpenseCategoriesAdd-BX4ETLub.js",
    "revision": null
  }, {
    "url": "assets/ExpenseCategories-BLChi7JI.js",
    "revision": null
  }, {
    "url": "assets/ExpenseAddLocal-NioSjdjA.js",
    "revision": null
  }, {
    "url": "assets/ExpenseAdd-COavYGOy.js",
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
