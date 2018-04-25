"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("@sentry/browser");
var normalize_1 = require("./normalize");
var PLUGIN_NAME = 'Sentry';
/** The Sentry Cordova SDK Backend. */
var CordovaBackend = /** @class */ (function () {
    /** Creates a new cordova backend instance. */
    function CordovaBackend(frontend) {
        this.frontend = frontend;
        this.browserBackend = new browser_1.BrowserBackend(this.frontend);
    }
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.install = function () {
        var _this = this;
        this.browserBackend.install();
        if (this.isCordova()) {
            this.deviceReadyCallback = function () { return _this.runNativeInstall(); };
            document.addEventListener('deviceready', this.deviceReadyCallback);
        }
        return true;
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.eventFromException = function (exception) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.browserBackend.eventFromException(exception)];
            });
        });
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.eventFromMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.browserBackend.eventFromMessage(message)];
            });
        });
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.sendEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var mergedEvent;
            return __generator(this, function (_a) {
                mergedEvent = __assign({}, normalize_1.normalizeData(event));
                return [2 /*return*/, this.nativeCall('sendEvent', mergedEvent)];
            });
        });
    };
    // CORDOVA --------------------
    CordovaBackend.prototype.nativeCall = function (action) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var exec = window && window.Cordova && window.Cordova.exec;
            if (!exec) {
                reject('Cordova.exec not available');
            }
            else {
                window.Cordova.exec(resolve, reject, PLUGIN_NAME, action, args);
            }
        }).catch(function (e) {
            if ((e === 'not implemented' || e === 'Cordova.exec not available') &&
                _this.browserBackend[action]) {
                // This is our fallback to the browser implementation
                return (_a = _this.browserBackend)[action].apply(_a, __spread(args));
            }
            else {
                // TODO log error on unpatched console
            }
            var _a;
        });
    };
    CordovaBackend.prototype.runNativeInstall = function () {
        document.removeEventListener('deviceready', this.deviceReadyCallback);
        if (this.frontend.getDSN()) {
            this.nativeCall('install', this.frontend.getDSN().toString(true), this.frontend.getOptions());
        }
    };
    CordovaBackend.prototype.isCordova = function () {
        return window.cordova !== undefined || window.Cordova !== undefined;
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.storeBreadcrumb = function (breadcrumb) {
        this.nativeCall('addBreadcrumb', breadcrumb);
        return true;
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.storeContext = function (context) {
        if (context.extra) {
            this.nativeCall('setExtraContext', context.extra);
        }
        if (context.tags) {
            this.nativeCall('setTagsContext', context.tags);
        }
        if (context.user) {
            this.nativeCall('setUserContext', context.user);
        }
        return true;
    };
    return CordovaBackend;
}());
exports.CordovaBackend = CordovaBackend;
//# sourceMappingURL=backend.js.map