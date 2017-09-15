/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overlay_template__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__overlay_scss__);



class OverlayDirective {

    classes() {
        return {
            overlayWrapper: 'ng-overlay-wrapper'
        };
    }

    constructor($compile, $timeout) {
        this.$compile = $compile;
        this.$timeout = $timeout;

        this.restrict = 'A';
        this.scope = {
            ngOverlayTemplate: '<',
            ngOverlayTrigger: '@',
            ngOverlayData: '<',
            ngOverlayShow: '&ngOverlayOnShow',
            ngOverlayClose: '&ngOverlayOnClose',
            ngOverlayCloseTimeout: '@'
        };

        this.replace = true;
    }

    link(scope, el, attrs) {
        if (!scope.ngOverlayData) {
            scope.ngOverlayData = {};
        }
        this.handleEvents(el, scope);

        scope.$watch('ngOverlayData', (newValue, oldValue) => {
            if (newValue && newValue.visible === true) {
                this.createOverlayContainer(scope);
            } else if (newValue && newValue.visible === false) {
                this.closeOverlay(scope);
            }
        }, true);
    }

    closeOverlay(scope) {
        scope.closingOverlay = true;
        if (scope.ngOverlayCloseTimeout) {
            this.$timeout(() => {
                this.closeOverlayActions(scope);
            }, parseInt(scope.ngOverlayCloseTimeout));
        } else {
            this.closeOverlayActions(scope);
        }
    }

    closeOverlayActions(scope) {
        if (this.overlayWrapper) {
            scope.closingOverlay = this.overlayWrapper.remove();
        }

        if (scope.ngOverlayClose) {
            scope.ngOverlayClose();
        }
    }

    createOverlayContainer(scope) {
        let classes = this.classes();
        this.overlayWrapper = document.querySelectorAll(`.${classes.overlayWrapper}`);

        if (this.overlayWrapper.length) {
            this.overlayWrapper.remove();
        }

        let body = angular.element(document.getElementsByTagName('body')[0]);

        this.overlayWrapper = angular.element(Object(__WEBPACK_IMPORTED_MODULE_0__overlay_template__["a" /* default */])(scope.ngOverlayTemplate));
        body.append(this.$compile(this.overlayWrapper)(scope));
        this.$timeout(() => {
            if (scope.ngOverlayShow) {
                scope.ngOverlayShow();
            }
        }, 0);
    }

    handleEvents(el, scope) {
        el.on(scope.ngOverlayTrigger, () => {
            scope.ngOverlayData.visible = true;
            scope.$apply();
        });

        scope.close = () => {
            scope.ngOverlayData.visible = false;
        };

        angular.element(document).on('keyup', event => {
            if (scope.ngOverlayData.visible === true && event.keyCode === 27) {
                ///ESC
                scope.ngOverlayData.visible = false;
                scope.$apply();
            }
        });
    }
}

OverlayDirective.$inject = ['$compile', '$timeout'];

angular.module('ngOverlay', ['ngSanitize']).directive('ngOverlay', ($compile, $timeout) => new OverlayDirective($compile, $timeout));

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (content) {
    return `<div></div><div data-ng-class="{'ng-overlay-closing': closingOverlay}" class="ng-overlay-wrapper">
        <div class="ng-overlay-controls">
            <button ng-click="close()" class="ng-overlay-close">Close</button>
        </div>
        <div class="ng-overlay-content">${content}</div>
    </div></div>`;
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_overlay_directive__ = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=overlay.js.map