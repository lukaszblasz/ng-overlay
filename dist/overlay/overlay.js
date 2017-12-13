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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _overlay = __webpack_require__(1);

var _overlay2 = _interopRequireDefault(_overlay);

__webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OverlayDirective = function () {
    _createClass(OverlayDirective, [{
        key: 'classes',
        value: function classes() {
            return {
                overlayWrapper: 'ng-overlay-wrapper'
            };
        }
    }]);

    function OverlayDirective($compile, $timeout) {
        _classCallCheck(this, OverlayDirective);

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

    _createClass(OverlayDirective, [{
        key: 'link',
        value: function link(scope, el, attrs) {
            var _this = this;

            if (!scope.ngOverlayData) {
                scope.ngOverlayData = {};
            }
            this.handleEvents(el, scope);

            scope.$watch('ngOverlayData', function (newValue, oldValue) {
                if (newValue.visible !== oldValue.visible) {
                    if (newValue && newValue.visible === true) {
                        _this.createOverlayContainer(scope);
                    } else if (newValue && newValue.visible === false) {
                        _this.closeOverlay(scope);
                    }
                }
            }, true);
        }
    }, {
        key: 'closeOverlay',
        value: function closeOverlay(scope) {
            var _this2 = this;

            scope.closingOverlay = true;
            if (scope.ngOverlayCloseTimeout) {
                this.$timeout(function () {
                    _this2.closeOverlayActions(scope);
                }, parseInt(scope.ngOverlayCloseTimeout));
            } else {
                this.closeOverlayActions(scope);
            }
        }
    }, {
        key: 'closeOverlayActions',
        value: function closeOverlayActions(scope) {
            if (this.overlayWrapper) {
                scope.closingOverlay = false;
                this.overlayWrapper.remove();
            }

            if (scope.ngOverlayClose) {
                scope.ngOverlayClose();
            }
        }
    }, {
        key: 'createOverlayContainer',
        value: function createOverlayContainer(scope) {
            var classes = this.classes();
            this.overlayWrapper = document.querySelectorAll('.' + classes.overlayWrapper);

            if (this.overlayWrapper.length) {
                this.overlayWrapper.remove();
            }

            var body = angular.element(document.getElementsByTagName('body')[0]);

            this.overlayWrapper = angular.element((0, _overlay2.default)(scope.ngOverlayTemplate));
            body.append(this.$compile(this.overlayWrapper)(scope));
            this.$timeout(function () {
                if (scope.ngOverlayShow) {
                    scope.ngOverlayShow();
                }
            }, 0);
        }
    }, {
        key: 'handleEvents',
        value: function handleEvents(el, scope) {
            el.on(scope.ngOverlayTrigger, function () {
                scope.ngOverlayData.visible = true;
                scope.$apply();
            });

            scope.close = function () {
                scope.ngOverlayData.visible = false;
            };

            angular.element(document).on('keyup', function (event) {
                if (scope.ngOverlayData.visible === true && event.keyCode === 27) {
                    ///ESC
                    scope.ngOverlayData.visible = false;
                    scope.$apply();
                }
            });
        }
    }]);

    return OverlayDirective;
}();

OverlayDirective.$inject = ['$compile', '$timeout'];

angular.module('ngOverlay', ['ngSanitize']).directive('ngOverlay', function ($compile, $timeout) {
    return new OverlayDirective($compile, $timeout);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (content) {
    return "<div></div><div role=\"dialog\" data-ng-class=\"{'ng-overlay-closing': closingOverlay}\" class=\"ng-overlay-wrapper\">\n        <div class=\"ng-overlay-controls\">\n            <button ng-click=\"close()\" class=\"ng-overlay-close\">Close</button>\n        </div>\n        <div class=\"ng-overlay-content\">" + content + "</div>\n    </div></div>";
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

/***/ })
/******/ ]);
//# sourceMappingURL=overlay.js.map