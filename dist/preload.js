(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*****************************!*\
  !*** ./src/main/preload.ts ***!
  \*****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(/*! electron */ "electron");
// 暴露 Node.js API 给渲染进程
electron_1.contextBridge.exposeInMainWorld('appApi', {
    //'electron' 是一个命名空间字符串。渲染进程中将通过 window.electron 访问被暴露的功能。
    fs: {
        readFile: async (path) => await electron_1.ipcRenderer.invoke('read-file', path),
        writeFile: async (path, data) => await electron_1.ipcRenderer.invoke('write-file', path, data),
    },
    crawler: {
        /**
         * 启动爬虫任务
         * @param url - 要爬取的网址
         * @param keywords - 关键词列表
         * @returns 数据 ID
         */
        startCrawl: async (url, keywords) => {
            return await electron_1.ipcRenderer.invoke('start-crawl', { url, keywords });
        },
        /**
         * 处理爬取到的数据
         * @param dataId - 数据唯一标识
         * @returns 处理后的数据
         */
        processData: async (dataId) => {
            return await electron_1.ipcRenderer.invoke('process-data', dataId);
        },
        /**
         * 打开结果文件
         * @param dataId - 数据唯一标识
         */
        openResult: async (dataId) => {
            return await electron_1.ipcRenderer.invoke('open-result', dataId);
        },
    },
});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=preload.js.map