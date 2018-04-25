'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var error = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/** An error emitted by Sentry SDKs and related utilities. */
var SentryError = /** @class */ (function (_super) {
    __extends(SentryError, _super);
    function SentryError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.message = message;
        // tslint:disable:no-unsafe-any
        _this.name = _newTarget.prototype.constructor.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return SentryError;
}(Error));
exports.SentryError = SentryError;

});

var error$1 = unwrapExports(error);
var error_1 = error.SentryError;

var error$2 = /*#__PURE__*/Object.freeze({
	default: error$1,
	__moduleExports: error,
	SentryError: error_1
});

var error_1$1 = ( error$2 && error$1 ) || error$2;

var dsn = createCommonjsModule(function (module, exports) {
var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });

/** Regular expression used to parse a DSN. */
var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w\.-]+)(?::(\d+))?\/(.+)/;
/** The Sentry DSN, identifying a Sentry instance and project. */
var DSN = /** @class */ (function () {
    /** Creates a new DSN component */
    function DSN(from) {
        if (typeof from === 'string') {
            this.fromString(from);
        }
        else {
            this.fromComponents(from);
        }
        this.validate();
    }
    /**
     * Renders the string representation of this DSN.
     *
     * By default, this will render the public representation without the password
     * component. To get the deprecated private representation, set `withPassword`
     * to true.
     *
     * @param withPassword When set to true, the password will be included.
     */
    DSN.prototype.toString = function (withPassword) {
        if (withPassword === void 0) { withPassword = false; }
        // tslint:disable-next-line:no-this-assignment
        var _a = this, host = _a.host, path = _a.path, pass = _a.pass, port = _a.port, protocol = _a.protocol, user = _a.user;
        return (protocol + "://" + user + (withPassword && pass ? ":" + pass : '') +
            ("@" + host + (port ? ":" + port : '') + "/" + path));
    };
    /** Parses a string into this DSN. */
    DSN.prototype.fromString = function (str) {
        var match = DSN_REGEX.exec(str);
        if (!match) {
            throw new error_1$1.SentryError('Invalid DSN');
        }
        var _a = __read(match.slice(1), 6), protocol = _a[0], user = _a[1], _b = _a[2], pass = _b === void 0 ? '' : _b, host = _a[3], _c = _a[4], port = _c === void 0 ? '' : _c, path = _a[5];
        Object.assign(this, { host: host, pass: pass, path: path, port: port, protocol: protocol, user: user });
    };
    /** Maps DSN components into this instance. */
    DSN.prototype.fromComponents = function (components) {
        this.protocol = components.protocol;
        this.user = components.user;
        this.pass = components.pass || '';
        this.host = components.host;
        this.port = components.port || '';
        this.path = components.path;
    };
    /** Validates this DSN and throws on error. */
    DSN.prototype.validate = function () {
        try {
            for (var _a = __values(['protocol', 'user', 'host', 'path']), _b = _a.next(); !_b.done; _b = _a.next()) {
                var component = _b.value;
                if (!this[component]) {
                    throw new error_1$1.SentryError("Invalid DSN: Missing " + component);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (this.protocol !== 'http' && this.protocol !== 'https') {
            throw new error_1$1.SentryError("Invalid DSN: Unsupported protocol \"" + this.protocol + "\"");
        }
        if (this.port && isNaN(parseInt(this.port, 10))) {
            throw new error_1$1.SentryError("Invalid DSN: Invalid port number \"" + this.port + "\"");
        }
        var e_1, _c;
    };
    return DSN;
}());
exports.DSN = DSN;

});

var dsn$1 = unwrapExports(dsn);
var dsn_1 = dsn.DSN;

var dsn$2 = /*#__PURE__*/Object.freeze({
	default: dsn$1,
	__moduleExports: dsn,
	DSN: dsn_1
});

var status = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/** The status of an event. */
var SendStatus;
(function (SendStatus) {
    /** The status could not be determined. */
    SendStatus["Unknown"] = "unknown";
    /** The event was skipped due to configuration or callbacks. */
    SendStatus["Skipped"] = "skipped";
    /** The event was sent to Sentry successfully. */
    SendStatus["Success"] = "success";
    /** The client is currently rate limited and will try again later. */
    SendStatus["RateLimit"] = "rate_limit";
    /** The event could not be processed. */
    SendStatus["Invalid"] = "invalid";
    /** A server-side error ocurred during submission. */
    SendStatus["Failed"] = "failed";
})(SendStatus = exports.SendStatus || (exports.SendStatus = {}));
// tslint:disable:no-unnecessary-qualifier no-namespace
(function (SendStatus) {
    /**
     * Converts a HTTP status code into a {@link SendStatus}.
     *
     * @param code The HTTP response status code.
     * @returns The send status or {@link SendStatus.Unknown}.
     */
    function fromHttpCode(code) {
        if (code >= 200 && code < 300) {
            return SendStatus.Success;
        }
        if (code === 429) {
            return SendStatus.RateLimit;
        }
        if (code >= 400 && code < 500) {
            return SendStatus.Invalid;
        }
        if (code >= 500) {
            return SendStatus.Failed;
        }
        return SendStatus.Unknown;
    }
    SendStatus.fromHttpCode = fromHttpCode;
})(SendStatus = exports.SendStatus || (exports.SendStatus = {}));

});

var status$1 = unwrapExports(status);
var status_1 = status.SendStatus;

var status$2 = /*#__PURE__*/Object.freeze({
	default: status$1,
	__moduleExports: status,
	SendStatus: status_1
});

var dsn_1$1 = ( dsn$2 && dsn$1 ) || dsn$2;

var status_1$1 = ( status$2 && status$1 ) || status$2;

var base = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
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
var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * Default maximum number of breadcrumbs added to an event. Can be overwritten
 * with {@link Options.maxBreadcrumbs}.
 */
var DEFAULT_BREADCRUMBS = 30;
/**
 * Absolute maximum number of breadcrumbs added to an event. The
 * `maxBreadcrumbs` option cannot be higher than this value.
 */
var MAX_BREADCRUMBS = 100;
/**
 * Base implementation for all JavaScript SDK frontends.
 *
 * Call the constructor with the corresponding backend constructor and options
 * specific to the frontend subclass. To access these options later, use
 * {@link Frontend.getOptions}. Also, the Backend instance is available via
 * {@link Frontend.getBackend}.
 *
 * Subclasses must implement one abstract method: {@link getSdkInfo}. It must
 * return the unique name and the version of the SDK.
 *
 * If a DSN is specified in the options, it will be parsed and stored. Use
 * {@link Frontend.getDSN} to retrieve the DSN at any moment. In case the DSN is
 * invalid, the constructor will throw a {@link SentryException}. Note that
 * without a valid DSN, the SDK will not send any events to Sentry.
 *
 * Before sending an event via the backend, it is passed through
 * {@link FrontendBase.prepareEvent} to add SDK information and scope data
 * (breadcrumbs and context). To add more custom information, override this
 * method and extend the resulting prepared event.
 *
 * To issue automatically created events (e.g. via instrumentation), use
 * {@link Frontend.captureEvent}. It will prepare the event and pass it through
 * the callback lifecycle. To issue auto-breadcrumbs, use
 * {@link Frontend.addBreadcrumb}.
 *
 * @example
 * class NodeFrontend extends FrontendBase<NodeBackend, NodeOptions> {
 *   public constructor(options: NodeOptions) {
 *     super(NodeBackend, options);
 *   }
 *
 *   // ...
 * }
 */
var FrontendBase = /** @class */ (function () {
    /**
     * Initializes this frontend instance.
     *
     * @param backendClass A constructor function to create the backend.
     * @param options Options for the frontend.
     */
    function FrontendBase(backendClass, options) {
        this.backend = new backendClass(this);
        this.options = options;
        if (options.dsn) {
            this.dsn = new dsn_1$1.DSN(options.dsn);
        }
        // The initial scope must have access to backend, options and DSN
        this.internalScope = this.getInitialScope();
    }
    /**
     * @inheritDoc
     */
    FrontendBase.prototype.install = function () {
        if (!this.isEnabled()) {
            return false;
        }
        if (this.installed === undefined) {
            this.installed = this.getBackend().install();
        }
        return this.installed;
    };
    /**
     * @inheritDoc
     */
    FrontendBase.prototype.captureException = function (exception, scope) {
        if (scope === void 0) { scope = this.internalScope; }
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBackend().eventFromException(exception)];
                    case 1:
                        event = _a.sent();
                        return [4 /*yield*/, this.captureEvent(event, scope)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @inheritDoc
     */
    FrontendBase.prototype.captureMessage = function (message, scope) {
        if (scope === void 0) { scope = this.internalScope; }
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBackend().eventFromMessage(message)];
                    case 1:
                        event = _a.sent();
                        return [4 /*yield*/, this.captureEvent(event, scope)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @inheritDoc
     */
    FrontendBase.prototype.captureEvent = function (event, scope) {
        if (scope === void 0) { scope = this.internalScope; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendEvent(event, scope)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @inheritDoc
     */
    FrontendBase.prototype.addBreadcrumb = function (breadcrumb, scope) {
        if (scope === void 0) { scope = this.internalScope; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, shouldAddBreadcrumb, beforeBreadcrumb, afterBreadcrumb, _b, maxBreadcrumbs, timestamp, mergedBreadcrumb, finalBreadcrumb;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.getOptions(), shouldAddBreadcrumb = _a.shouldAddBreadcrumb, beforeBreadcrumb = _a.beforeBreadcrumb, afterBreadcrumb = _a.afterBreadcrumb, _b = _a.maxBreadcrumbs, maxBreadcrumbs = _b === void 0 ? DEFAULT_BREADCRUMBS : _b;
                        if (maxBreadcrumbs <= 0) {
                            return [2 /*return*/];
                        }
                        timestamp = new Date().getTime() / 1000;
                        mergedBreadcrumb = __assign({ timestamp: timestamp }, breadcrumb);
                        if (shouldAddBreadcrumb && !shouldAddBreadcrumb(mergedBreadcrumb)) {
                            return [2 /*return*/];
                        }
                        finalBreadcrumb = beforeBreadcrumb
                            ? beforeBreadcrumb(mergedBreadcrumb)
                            : mergedBreadcrumb;
                        return [4 /*yield*/, this.getBackend().storeBreadcrumb(finalBreadcrumb, scope)];
                    case 1:
                        if (_c.sent()) {
                            scope.breadcrumbs = __spread(scope.breadcrumbs, [finalBreadcrumb]).slice(-Math.max(0, Math.min(maxBreadcrumbs, MAX_BREADCRUMBS)));
                        }
                        if (afterBreadcrumb) {
                            afterBreadcrumb(finalBreadcrumb);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @inheritDoc
     */
    FrontendBase.prototype.getDSN = function () {
        return this.dsn;
    };
    /**
     * @inheritDoc
     */
    FrontendBase.prototype.getOptions = function () {
        return this.options;
    };
    /**
     * @inheritDoc
     */
    FrontendBase.prototype.setContext = function (nextContext, scope) {
        if (scope === void 0) { scope = this.internalScope; }
        return __awaiter(this, void 0, void 0, function () {
            var context;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBackend().storeContext(nextContext, scope)];
                    case 1:
                        if (_a.sent()) {
                            context = scope.context;
                            if (nextContext.extra) {
                                context.extra = __assign({}, context.extra, nextContext.extra);
                            }
                            if (nextContext.tags) {
                                context.tags = __assign({}, context.tags, nextContext.tags);
                            }
                            if (nextContext.user) {
                                context.user = __assign({}, context.user, nextContext.user);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @inheritDoc
     */
    FrontendBase.prototype.getInitialScope = function () {
        return {
            breadcrumbs: [],
            context: {},
        };
    };
    /** Returns the current internal scope of this instance. */
    FrontendBase.prototype.getInternalScope = function () {
        return this.internalScope;
    };
    /** Returns the current backend. */
    FrontendBase.prototype.getBackend = function () {
        return this.backend;
    };
    /** Determines whether this SDK is enabled and a valid DSN is present. */
    FrontendBase.prototype.isEnabled = function () {
        return this.getOptions().enabled !== false && this.dsn !== undefined;
    };
    /**
     * Adds common information to events.
     *
     * The information includes release and environment from `options`, SDK
     * information returned by {@link FrontendBase.getSdkInfo}, as well as
     * breadcrumbs and context (extra, tags and user) from the scope.
     *
     * Information that is already present in the event is never overwritten. For
     * nested objects, such as the context, keys are merged.
     *
     * @param event The original event.
     * @param scope A scope containing event metadata.
     * @returns A new event with more information.
     */
    FrontendBase.prototype.prepareEvent = function (event, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, environment, _b, maxBreadcrumbs, release, prepared, breadcrumbs, context;
            return __generator(this, function (_c) {
                _a = this.getOptions(), environment = _a.environment, _b = _a.maxBreadcrumbs, maxBreadcrumbs = _b === void 0 ? DEFAULT_BREADCRUMBS : _b, release = _a.release;
                prepared = __assign({ sdk: this.getSdkInfo() }, event);
                if (prepared.environment === undefined && environment !== undefined) {
                    prepared.environment = environment;
                }
                if (prepared.release === undefined && release !== undefined) {
                    prepared.release = release;
                }
                breadcrumbs = scope.breadcrumbs;
                if (breadcrumbs.length > 0 && maxBreadcrumbs > 0) {
                    prepared.breadcrumbs = breadcrumbs.slice(-Math.max(0, Math.min(maxBreadcrumbs, MAX_BREADCRUMBS)));
                }
                context = scope.context;
                if (context.extra) {
                    prepared.extra = __assign({}, context.extra, event.extra);
                }
                if (context.tags) {
                    prepared.tags = __assign({}, context.tags, event.tags);
                }
                if (context.user) {
                    prepared.user = __assign({}, context.user, event.user);
                }
                return [2 /*return*/, prepared];
            });
        });
    };
    /**
     * Sends an event (either error or message) to Sentry.
     *
     * This also adds breadcrumbs and context information to the event. However,
     * platform specific meta data (such as the User's IP address) must be added
     * by the SDK implementor.
     *
     * The returned event status offers clues to whether the event was sent to
     * Sentry and accepted there. If the {@link Options.shouldSend} hook returns
     * `false`, the status will be {@link SendStatus.Skipped}. If the rate limit
     * was exceeded, the status will be {@link SendStatus.RateLimit}.
     *
     * @param event The event to send to Sentry.
     * @param scope A scope containing event metadata.
     * @returns A Promise that resolves with the event status.
     */
    FrontendBase.prototype.sendEvent = function (event, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var prepared, _a, shouldSend, beforeSend, afterSend, finalEvent, code, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.isEnabled()) {
                            return [2 /*return*/, status_1$1.SendStatus.Skipped];
                        }
                        return [4 /*yield*/, this.prepareEvent(event, scope)];
                    case 1:
                        prepared = _b.sent();
                        _a = this.getOptions(), shouldSend = _a.shouldSend, beforeSend = _a.beforeSend, afterSend = _a.afterSend;
                        if (shouldSend && !shouldSend(prepared)) {
                            return [2 /*return*/, status_1$1.SendStatus.Skipped];
                        }
                        finalEvent = beforeSend ? beforeSend(prepared) : prepared;
                        return [4 /*yield*/, this.getBackend().sendEvent(finalEvent)];
                    case 2:
                        code = _b.sent();
                        status = status_1$1.SendStatus.fromHttpCode(code);
                        if (status === status_1$1.SendStatus.RateLimit) {
                            // TODO: Handle rate limits and maintain a queue. For now, we require SDK
                            // implementors to override this method and handle it themselves.
                        }
                        if (afterSend) {
                            afterSend(finalEvent, status);
                        }
                        return [2 /*return*/, status];
                }
            });
        });
    };
    return FrontendBase;
}());
exports.FrontendBase = FrontendBase;

});

var base$1 = unwrapExports(base);
var base_1 = base.FrontendBase;

var base$2 = /*#__PURE__*/Object.freeze({
	default: base$1,
	__moduleExports: base,
	FrontendBase: base_1
});

var interfaces = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/** Console logging verbosity for the SDK. */
var LogLevel;
(function (LogLevel) {
    /** No logs will be generated. */
    LogLevel[LogLevel["None"] = 0] = "None";
    /** Only SDK internal errors will be logged. */
    LogLevel[LogLevel["Error"] = 1] = "Error";
    /** Information useful for debugging the SDK will be logged. */
    LogLevel[LogLevel["Debug"] = 2] = "Debug";
    /** All SDK actions will be logged. */
    LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));

});

var interfaces$1 = unwrapExports(interfaces);
var interfaces_1 = interfaces.LogLevel;

var interfaces$2 = /*#__PURE__*/Object.freeze({
	default: interfaces$1,
	__moduleExports: interfaces,
	LogLevel: interfaces_1
});

var models = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/** TODO */
var Severity;
(function (Severity) {
    /** TODO */
    Severity["Fatal"] = "fatal";
    /** TODO */
    Severity["Error"] = "error";
    /** TODO */
    Severity["Warning"] = "warning";
    /** TODO */
    Severity["Info"] = "info";
    /** TODO */
    Severity["Debug"] = "debug";
    /** TODO */
    Severity["Critical"] = "critical";
})(Severity = exports.Severity || (exports.Severity = {}));

});

var models$1 = unwrapExports(models);
var models_1 = models.Severity;

var models$2 = /*#__PURE__*/Object.freeze({
	default: models$1,
	__moduleExports: models,
	Severity: models_1
});

var global_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
commonjsGlobal.__SENTRY__ = commonjsGlobal.__SENTRY__ || {
    shim: undefined,
    stack: [],
};
/** Returns the global shim registry. */
function getGlobalRegistry() {
    return commonjsGlobal.__SENTRY__;
}
exports.getGlobalRegistry = getGlobalRegistry;
/** Returns the global stack of scope layers. */
function getGlobalStack() {
    return commonjsGlobal.__SENTRY__.stack;
}
exports.getGlobalStack = getGlobalStack;

});

var global$1 = unwrapExports(global_1);
var global_2 = global_1.getGlobalRegistry;
var global_3 = global_1.getGlobalStack;

var global$2 = /*#__PURE__*/Object.freeze({
	default: global$1,
	__moduleExports: global_1,
	getGlobalRegistry: global_2,
	getGlobalStack: global_3
});

var active = false;

var _rollupPluginShim1 = /*#__PURE__*/Object.freeze({
	active: active
});

var require$$0 = ( _rollupPluginShim1 && undefined ) || _rollupPluginShim1;

var domain_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/** A compatibility version for Node's "domain" module. */
var domain;
try {
    // tslint:disable-next-line:no-var-requires
    domain = require$$0;
}
catch (_a) {
    domain = {};
}
/** Checks for an active domain and returns its stack, if present. */
function getDomainStack() {
    var active = domain.active;
    if (!active) {
        return undefined;
    }
    var registry = active.__SENTRY__;
    if (!registry) {
        active.__SENTRY__ = registry = { stack: [] };
    }
    return registry.stack;
}
exports.getDomainStack = getDomainStack;

});

var domain = unwrapExports(domain_1);
var domain_2 = domain_1.getDomainStack;

var domain$1 = /*#__PURE__*/Object.freeze({
	default: domain,
	__moduleExports: domain_1,
	getDomainStack: domain_2
});

var domain_1$1 = ( domain$1 && domain ) || domain$1;

var global_1$1 = ( global$2 && global$1 ) || global$2;

var shim = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * API compatibility version of this shim.
 *
 * WARNING: This number should only be incresed when the global interface
 * changes a and new methods are introduced.
 */
exports.API_VERSION = 1;
/**
 * Internal class used to make sure we always have the latest internal functions
 * working in case we have a version conflict.
 */
var Shim = /** @class */ (function () {
    /** Creates a new shim instance. */
    function Shim(version) {
        if (version === void 0) { version = exports.API_VERSION; }
        this.version = version;
        var stack = global_1$1.getGlobalStack();
        if (stack.length === 0) {
            stack.push({ scope: {}, type: 'process' });
        }
    }
    /**
     * Checks if this shim's version is older than the given version.
     *
     * @param version A version number to compare to.
     * @return True if the given version is newer; otherwise false.
     */
    Shim.prototype.isOlderThan = function (version) {
        return this.version < version;
    };
    /**
     * Creates a new 'local' ScopeLayer with the given client.
     * @param client Optional client, defaults to the current client.
     */
    Shim.prototype.pushScope = function (client) {
        var usedClient = client || this.getCurrentClient();
        this.getStack().push({
            client: usedClient,
            scope: this.getInitialScope(usedClient),
            type: 'local',
        });
    };
    /** Removes the top most ScopeLayer of the current stack. */
    Shim.prototype.popScope = function () {
        return this.getStack().pop() !== undefined;
    };
    /**
     * Convenience method for pushScope and popScope.
     *
     * @param arg1 Either the client or callback.
     * @param arg2 Either the client or callback.
     */
    Shim.prototype.withScope = function (arg1, arg2) {
        var callback = arg1;
        var client = arg2;
        if (!!(arg1 && arg1.constructor && arg1.call && arg1.apply)) {
            callback = arg1;
            client = arg2;
        }
        if (!!(arg2 && arg2.constructor && arg2.call && arg2.apply)) {
            callback = arg2;
            client = arg1;
        }
        this.pushScope(client);
        try {
            callback();
        }
        finally {
            this.popScope();
        }
    };
    /** Resets the current scope to the initialScope. */
    Shim.prototype.clearScope = function () {
        var top = this.getStackTop();
        top.scope = this.getInitialScope(top.client);
    };
    /** Returns the client of the currently active scope. */
    Shim.prototype.getCurrentClient = function () {
        return this.getStackTop().client;
    };
    /** Returns the scope stack for domains or the process. */
    Shim.prototype.getStack = function () {
        return domain_1$1.getDomainStack() || global_1$1.getGlobalStack();
    };
    /** Returns the topmost scope layer in the order domain > local > process. */
    Shim.prototype.getStackTop = function () {
        return this.getDomainStackTop() || this.getGlobalStackTop();
    };
    /** Returns the topmost ScopeLayer from the global stack. */
    Shim.prototype.getGlobalStackTop = function () {
        var stack = global_1$1.getGlobalStack();
        return stack[stack.length - 1];
    };
    /** Tries to return the top most ScopeLayer from the domainStack. */
    Shim.prototype.getDomainStackTop = function () {
        var stack = domain_1$1.getDomainStack();
        if (!stack) {
            return undefined;
        }
        if (stack.length === 0) {
            var client = this.getCurrentClient();
            stack.push({
                client: client,
                scope: this.getInitialScope(client),
                type: 'domain',
            });
        }
        return stack[stack.length - 1];
    };
    /**
     * Obtains a new scope instance from the client.
     *
     * @param client An SDK client that implements `getInitialScope`.
     * @returns The scope instance or an empty object on error.
     */
    Shim.prototype.getInitialScope = function (client) {
        try {
            return client && client.getInitialScope();
        }
        catch (_a) {
            return {};
        }
    };
    return Shim;
}());
exports.Shim = Shim;

});

var shim$1 = unwrapExports(shim);
var shim_1 = shim.API_VERSION;
var shim_2 = shim.Shim;

var shim$2 = /*#__PURE__*/Object.freeze({
	default: shim$1,
	__moduleExports: shim,
	API_VERSION: shim_1,
	Shim: shim_2
});

var shim_1$1 = ( shim$2 && shim$1 ) || shim$2;

var sdk = createCommonjsModule(function (module, exports) {
var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });


/** Default callback used for catching async errors. */
function logError(e) {
    if (e) {
        console.error(e);
    }
}
/**
 * Internal helper function to call a method on the top client if it exists.
 *
 * @param method The method to call on the client/frontend.
 * @param args Arguments to pass to the client/fontend.
 */
function invokeClient(method) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var top = getOrCreateShim().getStackTop();
    if (top && top.client && top.client[method]) {
        (_a = top.client)[method].apply(_a, __spread(args, [top.scope]));
    }
    var _a;
}
/**
 * Internal helper function to call an async method on the top client if it
 * exists.
 *
 * @param method The method to call on the client/frontend.
 * @param callback A callback called with the error or success return value.
 * @param args Arguments to pass to the client/fontend.
 */
function invokeClientAsync(method, callback) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var top = getOrCreateShim().getStackTop();
    if (top && top.client && top.client[method]) {
        (_a = top.client)[method].apply(_a, __spread(args, [top.scope])).then(function (value) {
            callback(undefined, value);
        })
            .catch(function (err) {
            callback(err);
        });
    }
    var _a;
}
/**
 * Returns the latest shim instance.
 *
 * If a shim is already registered in the global registry but this module
 * contains a more recent version, it replaces the registered version.
 * Otherwise, the currently registered shim will be returned.
 */
function getOrCreateShim() {
    var registry = global_1$1.getGlobalRegistry();
    if (!registry.shim || registry.shim.isOlderThan(shim_1$1.API_VERSION)) {
        registry.shim = new shim_1$1.Shim();
    }
    return registry.shim;
}
/**
 * Create a new scope to store context information.
 *
 * The scope will be layered on top of the current one. It is isolated, i.e. all
 * breadcrumbs and context information added to this scope will be removed once
 * the scope ends. Be sure to always remove this scope with {@link popScope}
 * when the operation finishes or throws.
 */
function pushScope(client) {
    getOrCreateShim().pushScope(client);
}
exports.pushScope = pushScope;
/**
 * Removes a previously pushed scope from the stack.
 *
 * This restores the state before the scope was pushed. All breadcrumbs and
 * context information added since the last call to {@link pushScope} are
 * discarded.
 */
function popScope() {
    getOrCreateShim().popScope();
}
exports.popScope = popScope;
function withScope(arg1, arg2) {
    getOrCreateShim().withScope(arg1, arg2);
}
exports.withScope = withScope;
/** Clears the current scope and resets it to the initalScope. */
function clearScope() {
    getOrCreateShim().clearScope();
}
exports.clearScope = clearScope;
/** Returns the current client, if any. */
function getCurrentClient() {
    return getOrCreateShim().getCurrentClient();
}
exports.getCurrentClient = getCurrentClient;
/**
 * This binds the given client to the current scope.
 * @param client An SDK client (frontend) instance.
 */
function bindClient(client) {
    var shim = getOrCreateShim();
    var top = shim.getStackTop();
    top.client = client;
    top.scope = shim.getInitialScope(client);
}
exports.bindClient = bindClient;
/**
 * Captures an exception event and sends it to Sentry.
 *
 * @param exception An exception-like object.
 * @param callback A callback that is invoked when the exception has been sent.
 */
function captureException(exception, callback) {
    if (callback === void 0) { callback = logError; }
    invokeClientAsync('captureException', callback, exception);
}
exports.captureException = captureException;
/**
 * Captures a message event and sends it to Sentry.
 *
 * @param message The message to send to Sentry.
 * @param callback A callback that is invoked when the message has been sent.
 */
function captureMessage(message, callback) {
    if (callback === void 0) { callback = logError; }
    invokeClientAsync('captureMessage', callback, message);
}
exports.captureMessage = captureMessage;
/**
 * Captures a manually created event and sends it to Sentry.
 *
 * @param event The event to send to Sentry.
 * @param callback A callback that is invoked when the event has been sent.
 */
function captureEvent(event, callback) {
    if (callback === void 0) { callback = logError; }
    invokeClientAsync('captureEvent', callback, event);
}
exports.captureEvent = captureEvent;
/**
 * Records a new breadcrumb which will be attached to future events.
 *
 * Breadcrumbs will be added to subsequent events to provide more context on
 * user's actions prior to an error or crash.
 *
 * @param breadcrumb The breadcrumb to record.
 */
function addBreadcrumb(breadcrumb) {
    invokeClient('addBreadcrumb', breadcrumb);
}
exports.addBreadcrumb = addBreadcrumb;
/**
 * Updates user context information for future events.
 * @param extra User context object to merge into current context.
 */
function setUserContext(user) {
    invokeClient('setContext', { user: user });
}
exports.setUserContext = setUserContext;
/**
 * Updates tags context information for future events.
 * @param extra Tags context object to merge into current context.
 */
function setTagsContext(tags) {
    invokeClient('setContext', { tags: tags });
}
exports.setTagsContext = setTagsContext;
/**
 * Updates extra context information for future events.
 * @param extra Extra context object to merge into current context.
 */
function setExtraContext(extra) {
    invokeClient('setContext', { extra: extra });
}
exports.setExtraContext = setExtraContext;
/**
 * Calls a function on the latest client. Use this with caution, it's meant as
 * in "internal" helper so we don't need to expose every possible function in
 * the shim. It is not guaranteed that the client actually implements the
 * function.
 *
 * @param method The method to call on the client/frontend.
 * @param args Arguments to pass to the client/fontend.
 */
function _callOnClient(method) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    invokeClient.apply(void 0, __spread([method], args));
}
exports._callOnClient = _callOnClient;

});

var sdk$1 = unwrapExports(sdk);
var sdk_1 = sdk.pushScope;
var sdk_2 = sdk.popScope;
var sdk_3 = sdk.withScope;
var sdk_4 = sdk.clearScope;
var sdk_5 = sdk.getCurrentClient;
var sdk_6 = sdk.bindClient;
var sdk_7 = sdk.captureException;
var sdk_8 = sdk.captureMessage;
var sdk_9 = sdk.captureEvent;
var sdk_10 = sdk.addBreadcrumb;
var sdk_11 = sdk.setUserContext;
var sdk_12 = sdk.setTagsContext;
var sdk_13 = sdk.setExtraContext;
var sdk_14 = sdk._callOnClient;

var sdk$2 = /*#__PURE__*/Object.freeze({
	default: sdk$1,
	__moduleExports: sdk,
	pushScope: sdk_1,
	popScope: sdk_2,
	withScope: sdk_3,
	clearScope: sdk_4,
	getCurrentClient: sdk_5,
	bindClient: sdk_6,
	captureException: sdk_7,
	captureMessage: sdk_8,
	captureEvent: sdk_9,
	addBreadcrumb: sdk_10,
	setUserContext: sdk_11,
	setTagsContext: sdk_12,
	setExtraContext: sdk_13,
	_callOnClient: sdk_14
});

var models_1$1 = ( models$2 && models$1 ) || models$2;

var sdk_1$1 = ( sdk$2 && sdk$1 ) || sdk$2;

var dist = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.Severity = models_1$1.Severity;

exports._callOnClient = sdk_1$1._callOnClient;
exports.addBreadcrumb = sdk_1$1.addBreadcrumb;
exports.bindClient = sdk_1$1.bindClient;
exports.captureMessage = sdk_1$1.captureMessage;
exports.captureException = sdk_1$1.captureException;
exports.captureEvent = sdk_1$1.captureEvent;
exports.clearScope = sdk_1$1.clearScope;
exports.getCurrentClient = sdk_1$1.getCurrentClient;
exports.popScope = sdk_1$1.popScope;
exports.pushScope = sdk_1$1.pushScope;
exports.setUserContext = sdk_1$1.setUserContext;
exports.setTagsContext = sdk_1$1.setTagsContext;
exports.setExtraContext = sdk_1$1.setExtraContext;
exports.withScope = sdk_1$1.withScope;

});

var index = unwrapExports(dist);
var dist_1 = dist.Severity;
var dist_2 = dist._callOnClient;
var dist_3 = dist.addBreadcrumb;
var dist_4 = dist.bindClient;
var dist_5 = dist.captureMessage;
var dist_6 = dist.captureException;
var dist_7 = dist.captureEvent;
var dist_8 = dist.clearScope;
var dist_9 = dist.getCurrentClient;
var dist_10 = dist.popScope;
var dist_11 = dist.pushScope;
var dist_12 = dist.setUserContext;
var dist_13 = dist.setTagsContext;
var dist_14 = dist.setExtraContext;
var dist_15 = dist.withScope;

var dist$1 = /*#__PURE__*/Object.freeze({
	default: index,
	__moduleExports: dist,
	Severity: dist_1,
	_callOnClient: dist_2,
	addBreadcrumb: dist_3,
	bindClient: dist_4,
	captureMessage: dist_5,
	captureException: dist_6,
	captureEvent: dist_7,
	clearScope: dist_8,
	getCurrentClient: dist_9,
	popScope: dist_10,
	pushScope: dist_11,
	setUserContext: dist_12,
	setTagsContext: dist_13,
	setExtraContext: dist_14,
	withScope: dist_15
});

var Shim = ( dist$1 && index ) || dist$1;

var sdk$3 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var shim_1 = Shim;
exports.captureException = shim_1.captureException;
exports.captureMessage = shim_1.captureMessage;
exports.clearScope = shim_1.clearScope;
exports.popScope = shim_1.popScope;
exports.pushScope = shim_1.pushScope;
exports.setExtraContext = shim_1.setExtraContext;
exports.setTagsContext = shim_1.setTagsContext;
/**
 * Internal function to create a new SDK frontend instance. The frontend is
 * installed and then bound to the current scope.
 *
 * @param frontendClass The frontend class to instanciate.
 * @param options Options to pass to the frontend.
 * @returns The installed and bound frontend instance.
 */
function initAndBind(frontendClass, options) {
    if (Shim.getCurrentClient()) {
        return;
    }
    var frontend = new frontendClass(options);
    frontend.install();
    Shim.bindClient(frontend);
}
exports.initAndBind = initAndBind;

});

var sdk$4 = unwrapExports(sdk$3);
var sdk_1$2 = sdk$3.captureException;
var sdk_2$1 = sdk$3.captureMessage;
var sdk_3$1 = sdk$3.clearScope;
var sdk_4$1 = sdk$3.popScope;
var sdk_5$1 = sdk$3.pushScope;
var sdk_6$1 = sdk$3.setExtraContext;
var sdk_7$1 = sdk$3.setTagsContext;
var sdk_8$1 = sdk$3.initAndBind;

var sdk$5 = /*#__PURE__*/Object.freeze({
	default: sdk$4,
	__moduleExports: sdk$3,
	captureException: sdk_1$2,
	captureMessage: sdk_2$1,
	clearScope: sdk_3$1,
	popScope: sdk_4$1,
	pushScope: sdk_5$1,
	setExtraContext: sdk_6$1,
	setTagsContext: sdk_7$1,
	initAndBind: sdk_8$1
});

var base_1$1 = ( base$2 && base$1 ) || base$2;

var interfaces_1$1 = ( interfaces$2 && interfaces$1 ) || interfaces$2;

var sdk_1$3 = ( sdk$5 && sdk$4 ) || sdk$5;

var dist$2 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.FrontendBase = base_1$1.FrontendBase;

exports.DSN = dsn_1$1.DSN;

exports.SentryError = error_1$1.SentryError;

exports.LogLevel = interfaces_1$1.LogLevel;

exports.initAndBind = sdk_1$3.initAndBind;

});

var index$1 = unwrapExports(dist$2);
var dist_1$1 = dist$2.FrontendBase;
var dist_2$1 = dist$2.DSN;
var dist_3$1 = dist$2.SentryError;
var dist_4$1 = dist$2.LogLevel;
var dist_5$1 = dist$2.initAndBind;

var dist$3 = /*#__PURE__*/Object.freeze({
	default: index$1,
	__moduleExports: dist$2,
	FrontendBase: dist_1$1,
	DSN: dist_2$1,
	SentryError: dist_3$1,
	LogLevel: dist_4$1,
	initAndBind: dist_5$1
});

var core = ( dist$3 && index$1 ) || dist$3;

var dist$4 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });




/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var commonjsGlobal$$1 = typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

function createCommonjsModule$$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var stringify_1 = createCommonjsModule$$1(function (module, exports) {
/*
 json-stringify-safe
 Like JSON.stringify, but doesn't throw on circular references.

 Originally forked from https://github.com/isaacs/json-stringify-safe
 version 5.0.1 on 3/8/2017 and modified to handle Errors serialization
 and IE8 compatibility. Tests for this are in test/vendor.

 ISC license: https://github.com/isaacs/json-stringify-safe/blob/master/LICENSE
*/

exports = module.exports = stringify;
exports.getSerialize = serializer;

function indexOf(haystack, needle) {
  for (var i = 0; i < haystack.length; ++i) {
    if (haystack[i] === needle) return i;
  }
  return -1;
}

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
}

// https://github.com/ftlabs/js-abbreviate/blob/fa709e5f139e7770a71827b1893f22418097fbda/index.js#L95-L106
function stringifyError(value) {
  var err = {
    // These properties are implemented as magical getters and don't show up in for in
    stack: value.stack,
    message: value.message,
    name: value.name
  };

  for (var i in value) {
    if (Object.prototype.hasOwnProperty.call(value, i)) {
      err[i] = value[i];
    }
  }

  return err;
}

function serializer(replacer, cycleReplacer) {
  var stack = [];
  var keys = [];

  if (cycleReplacer == null) {
    cycleReplacer = function(key, value) {
      if (stack[0] === value) {
        return '[Circular ~]';
      }
      return '[Circular ~.' + keys.slice(0, indexOf(stack, value)).join('.') + ']';
    };
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = indexOf(stack, this);
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);

      if (~indexOf(stack, value)) {
        value = cycleReplacer.call(this, key, value);
      }
    } else {
      stack.push(value);
    }

    return replacer == null
      ? value instanceof Error ? stringifyError(value) : value
      : replacer.call(this, key, value);
  };
}
});
var stringify_2 = stringify_1.getSerialize;

var _window =
  typeof window !== 'undefined'
    ? window
    : typeof commonjsGlobal$$1 !== 'undefined' ? commonjsGlobal$$1 : typeof self !== 'undefined' ? self : {};

function isObject(what) {
  return typeof what === 'object' && what !== null;
}

// Yanked from https://git.io/vS8DV re-used under CC0
// with some tiny modifications
function isError(value) {
  switch ({}.toString.call(value)) {
    case '[object Error]':
      return true;
    case '[object Exception]':
      return true;
    case '[object DOMException]':
      return true;
    default:
      return value instanceof Error;
  }
}

function isErrorEvent(value) {
  return supportsErrorEvent() && {}.toString.call(value) === '[object ErrorEvent]';
}

function isUndefined(what) {
  return what === void 0;
}

function isFunction(what) {
  return typeof what === 'function';
}

function isPlainObject(what) {
  return Object.prototype.toString.call(what) === '[object Object]';
}

function isString(what) {
  return Object.prototype.toString.call(what) === '[object String]';
}

function isArray(what) {
  return Object.prototype.toString.call(what) === '[object Array]';
}

function isEmptyObject(what) {
  if (!isPlainObject(what)) return false;

  for (var _ in what) {
    if (what.hasOwnProperty(_)) {
      return false;
    }
  }
  return true;
}

function supportsErrorEvent() {
  try {
    new ErrorEvent(''); // eslint-disable-line no-new
    return true;
  } catch (e) {
    return false;
  }
}

function supportsFetch() {
  if (!('fetch' in _window)) return false;

  try {
    new Headers(); // eslint-disable-line no-new
    new Request(''); // eslint-disable-line no-new
    new Response(); // eslint-disable-line no-new
    return true;
  } catch (e) {
    return false;
  }
}

// Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
// https://caniuse.com/#feat=referrer-policy
// It doesn't. And it throw exception instead of ignoring this parameter...
// REF: https://github.com/getsentry/raven-js/issues/1233
function supportsReferrerPolicy() {
  if (!supportsFetch()) return false;

  try {
    // eslint-disable-next-line no-new
    new Request('pickleRick', {
      referrerPolicy: 'origin'
    });
    return true;
  } catch (e) {
    return false;
  }
}

function supportsPromiseRejectionEvent() {
  return typeof PromiseRejectionEvent === 'function';
}

function wrappedCallback(callback) {
  function dataCallback(data, original) {
    var normalizedData = callback(data) || data;
    if (original) {
      return original(normalizedData) || normalizedData;
    }
    return normalizedData;
  }

  return dataCallback;
}

function each(obj, callback) {
  var i, j;

  if (isUndefined(obj.length)) {
    for (i in obj) {
      if (hasKey(obj, i)) {
        callback.call(null, i, obj[i]);
      }
    }
  } else {
    j = obj.length;
    if (j) {
      for (i = 0; i < j; i++) {
        callback.call(null, i, obj[i]);
      }
    }
  }
}

function objectMerge(obj1, obj2) {
  if (!obj2) {
    return obj1;
  }
  each(obj2, function(key, value) {
    obj1[key] = value;
  });
  return obj1;
}

/**
 * This function is only used for react-native.
 * react-native freezes object that have already been sent over the
 * js bridge. We need this function in order to check if the object is frozen.
 * So it's ok that objectFrozen returns false if Object.isFrozen is not
 * supported because it's not relevant for other "platforms". See related issue:
 * https://github.com/getsentry/react-native-sentry/issues/57
 */
function objectFrozen(obj) {
  if (!Object.isFrozen) {
    return false;
  }
  return Object.isFrozen(obj);
}

function truncate(str, max) {
  return !max || str.length <= max ? str : str.substr(0, max) + '\u2026';
}

/**
 * hasKey, a better form of hasOwnProperty
 * Example: hasKey(MainHostObject, property) === true/false
 *
 * @param {Object} host object to check property
 * @param {string} key to check
 */
function hasKey(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function joinRegExp(patterns) {
  // Combine an array of regular expressions and strings into one large regexp
  // Be mad.
  var sources = [],
    i = 0,
    len = patterns.length,
    pattern;

  for (; i < len; i++) {
    pattern = patterns[i];
    if (isString(pattern)) {
      // If it's a string, we need to escape it
      // Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
      sources.push(pattern.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'));
    } else if (pattern && pattern.source) {
      // If it's a regexp already, we want to extract the source
      sources.push(pattern.source);
    }
    // Intentionally skip other cases
  }
  return new RegExp(sources.join('|'), 'i');
}

function urlencode(o) {
  var pairs = [];
  each(o, function(key, value) {
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
  });
  return pairs.join('&');
}

// borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
// intentionally using regex and not <a/> href parsing trick because React Native and other
// environments where DOM might not be available
function parseUrl(url) {
  if (typeof url !== 'string') return {};
  var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);

  // coerce to undefined values to empty string so we don't get 'undefined'
  var query = match[6] || '';
  var fragment = match[8] || '';
  return {
    protocol: match[2],
    host: match[4],
    path: match[5],
    relative: match[5] + query + fragment // everything minus origin
  };
}
function uuid4() {
  var crypto = _window.crypto || _window.msCrypto;

  if (!isUndefined(crypto) && crypto.getRandomValues) {
    // Use window.crypto API if available
    // eslint-disable-next-line no-undef
    var arr = new Uint16Array(8);
    crypto.getRandomValues(arr);

    // set 4 in byte 7
    arr[3] = (arr[3] & 0xfff) | 0x4000;
    // set 2 most significant bits of byte 9 to '10'
    arr[4] = (arr[4] & 0x3fff) | 0x8000;

    var pad = function(num) {
      var v = num.toString(16);
      while (v.length < 4) {
        v = '0' + v;
      }
      return v;
    };

    return (
      pad(arr[0]) +
      pad(arr[1]) +
      pad(arr[2]) +
      pad(arr[3]) +
      pad(arr[4]) +
      pad(arr[5]) +
      pad(arr[6]) +
      pad(arr[7])
    );
  } else {
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @param elem
 * @returns {string}
 */
function htmlTreeAsString(elem) {
  /* eslint no-extra-parens:0*/
  var MAX_TRAVERSE_HEIGHT = 5,
    MAX_OUTPUT_LEN = 80,
    out = [],
    height = 0,
    len = 0,
    separator = ' > ',
    sepLength = separator.length,
    nextStr;

  while (elem && height++ < MAX_TRAVERSE_HEIGHT) {
    nextStr = htmlElementAsString(elem);
    // bail out if
    // - nextStr is the 'html' element
    // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
    //   (ignore this limit if we are on the first iteration)
    if (
      nextStr === 'html' ||
      (height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)
    ) {
      break;
    }

    out.push(nextStr);

    len += nextStr.length;
    elem = elem.parentNode;
  }

  return out.reverse().join(separator);
}

/**
 * Returns a simple, query-selector representation of a DOM element
 * e.g. [HTMLElement] => input#foo.btn[name=baz]
 * @param HTMLElement
 * @returns {string}
 */
function htmlElementAsString(elem) {
  var out = [],
    className,
    classes,
    key,
    attr,
    i;

  if (!elem || !elem.tagName) {
    return '';
  }

  out.push(elem.tagName.toLowerCase());
  if (elem.id) {
    out.push('#' + elem.id);
  }

  className = elem.className;
  if (className && isString(className)) {
    classes = className.split(/\s+/);
    for (i = 0; i < classes.length; i++) {
      out.push('.' + classes[i]);
    }
  }
  var attrWhitelist = ['type', 'name', 'title', 'alt'];
  for (i = 0; i < attrWhitelist.length; i++) {
    key = attrWhitelist[i];
    attr = elem.getAttribute(key);
    if (attr) {
      out.push('[' + key + '="' + attr + '"]');
    }
  }
  return out.join('');
}

/**
 * Returns true if either a OR b is truthy, but not both
 */
function isOnlyOneTruthy(a, b) {
  return !!(!!a ^ !!b);
}

/**
 * Returns true if both parameters are undefined
 */
function isBothUndefined(a, b) {
  return isUndefined(a) && isUndefined(b);
}

/**
 * Returns true if the two input exception interfaces have the same content
 */
function isSameException(ex1, ex2) {
  if (isOnlyOneTruthy(ex1, ex2)) return false;

  ex1 = ex1.values[0];
  ex2 = ex2.values[0];

  if (ex1.type !== ex2.type || ex1.value !== ex2.value) return false;

  // in case both stacktraces are undefined, we can't decide so default to false
  if (isBothUndefined(ex1.stacktrace, ex2.stacktrace)) return false;

  return isSameStacktrace(ex1.stacktrace, ex2.stacktrace);
}

/**
 * Returns true if the two input stack trace interfaces have the same content
 */
function isSameStacktrace(stack1, stack2) {
  if (isOnlyOneTruthy(stack1, stack2)) return false;

  var frames1 = stack1.frames;
  var frames2 = stack2.frames;

  // Exit early if frame count differs
  if (frames1.length !== frames2.length) return false;

  // Iterate through every frame; bail out if anything differs
  var a, b;
  for (var i = 0; i < frames1.length; i++) {
    a = frames1[i];
    b = frames2[i];
    if (
      a.filename !== b.filename ||
      a.lineno !== b.lineno ||
      a.colno !== b.colno ||
      a['function'] !== b['function']
    )
      return false;
  }
  return true;
}

/**
 * Polyfill a method
 * @param obj object e.g. `document`
 * @param name method name present on object e.g. `addEventListener`
 * @param replacement replacement function
 * @param track {optional} record instrumentation to an array
 */
function fill(obj, name, replacement, track) {
  if (obj == null) return;
  var orig = obj[name];
  obj[name] = replacement(orig);
  obj[name].__raven__ = true;
  obj[name].__orig__ = orig;
  if (track) {
    track.push([obj, name, orig]);
  }
}

/**
 * Join values in array
 * @param input array of values to be joined together
 * @param delimiter string to be placed in-between values
 * @returns {string}
 */
function safeJoin(input, delimiter) {
  if (!isArray(input)) return '';

  var output = [];

  for (var i = 0; i < input.length; i++) {
    try {
      output.push(String(input[i]));
    } catch (e) {
      output.push('[value cannot be serialized]');
    }
  }

  return output.join(delimiter);
}

// Default Node.js REPL depth
var MAX_SERIALIZE_EXCEPTION_DEPTH = 3;
// 50kB, as 100kB is max payload size, so half sounds reasonable
var MAX_SERIALIZE_EXCEPTION_SIZE = 50 * 1024;
var MAX_SERIALIZE_KEYS_LENGTH = 40;

function utf8Length(value) {
  return ~-encodeURI(value).split(/%..|./).length;
}

function jsonSize(value) {
  return utf8Length(JSON.stringify(value));
}

function serializeValue(value) {
  var maxLength = 40;

  if (typeof value === 'string') {
    return value.length <= maxLength ? value : value.substr(0, maxLength - 1) + '\u2026';
  } else if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined'
  ) {
    return value;
  }

  var type = Object.prototype.toString.call(value);

  // Node.js REPL notation
  if (type === '[object Object]') return '[Object]';
  if (type === '[object Array]') return '[Array]';
  if (type === '[object Function]')
    return value.name ? '[Function: ' + value.name + ']' : '[Function]';

  return value;
}

function serializeObject(value, depth) {
  if (depth === 0) return serializeValue(value);

  if (isPlainObject(value)) {
    return Object.keys(value).reduce(function(acc, key) {
      acc[key] = serializeObject(value[key], depth - 1);
      return acc;
    }, {});
  } else if (Array.isArray(value)) {
    return value.map(function(val) {
      return serializeObject(val, depth - 1);
    });
  }

  return serializeValue(value);
}

function serializeException(ex, depth, maxSize) {
  if (!isPlainObject(ex)) return ex;

  depth = typeof depth !== 'number' ? MAX_SERIALIZE_EXCEPTION_DEPTH : depth;
  maxSize = typeof depth !== 'number' ? MAX_SERIALIZE_EXCEPTION_SIZE : maxSize;

  var serialized = serializeObject(ex, depth);

  if (jsonSize(stringify_1(serialized)) > maxSize) {
    return serializeException(ex, depth - 1);
  }

  return serialized;
}

function serializeKeysForMessage(keys, maxLength) {
  if (typeof keys === 'number' || typeof keys === 'string') return keys.toString();
  if (!Array.isArray(keys)) return '';

  keys = keys.filter(function(key) {
    return typeof key === 'string';
  });
  if (keys.length === 0) return '[object has no keys]';

  maxLength = typeof maxLength !== 'number' ? MAX_SERIALIZE_KEYS_LENGTH : maxLength;
  if (keys[0].length >= maxLength) return keys[0];

  for (var usedKeys = keys.length; usedKeys > 0; usedKeys--) {
    var serialized = keys.slice(0, usedKeys).join(', ');
    if (serialized.length > maxLength) continue;
    if (usedKeys === keys.length) return serialized;
    return serialized + '\u2026';
  }

  return '';
}

function sanitize(input, sanitizeKeys) {
  if (!isArray(sanitizeKeys) || (isArray(sanitizeKeys) && sanitizeKeys.length === 0))
    return input;

  var sanitizeRegExp = joinRegExp(sanitizeKeys);
  var sanitizeMask = '********';
  var safeInput;

  try {
    safeInput = JSON.parse(stringify_1(input));
  } catch (o_O) {
    return input;
  }

  function sanitizeWorker(workerInput) {
    if (isArray(workerInput)) {
      return workerInput.map(function(val) {
        return sanitizeWorker(val);
      });
    }

    if (isPlainObject(workerInput)) {
      return Object.keys(workerInput).reduce(function(acc, k) {
        if (sanitizeRegExp.test(k)) {
          acc[k] = sanitizeMask;
        } else {
          acc[k] = sanitizeWorker(workerInput[k]);
        }
        return acc;
      }, {});
    }

    return workerInput;
  }

  return sanitizeWorker(safeInput);
}

var utils = {
  isObject: isObject,
  isError: isError,
  isErrorEvent: isErrorEvent,
  isUndefined: isUndefined,
  isFunction: isFunction,
  isPlainObject: isPlainObject,
  isString: isString,
  isArray: isArray,
  isEmptyObject: isEmptyObject,
  supportsErrorEvent: supportsErrorEvent,
  supportsFetch: supportsFetch,
  supportsReferrerPolicy: supportsReferrerPolicy,
  supportsPromiseRejectionEvent: supportsPromiseRejectionEvent,
  wrappedCallback: wrappedCallback,
  each: each,
  objectMerge: objectMerge,
  truncate: truncate,
  objectFrozen: objectFrozen,
  hasKey: hasKey,
  joinRegExp: joinRegExp,
  urlencode: urlencode,
  uuid4: uuid4,
  htmlTreeAsString: htmlTreeAsString,
  htmlElementAsString: htmlElementAsString,
  isSameException: isSameException,
  isSameStacktrace: isSameStacktrace,
  parseUrl: parseUrl,
  fill: fill,
  safeJoin: safeJoin,
  serializeException: serializeException,
  serializeKeysForMessage: serializeKeysForMessage,
  sanitize: sanitize
};

/*
 TraceKit - Cross brower stack traces

 This was originally forked from github.com/occ/TraceKit, but has since been
 largely re-written and is now maintained as part of raven-js.  Tests for
 this are in test/vendor.

 MIT license
*/

var TraceKit = {
  collectWindowErrors: true,
  debug: false
};

// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
var _window$1 =
  typeof window !== 'undefined'
    ? window
    : typeof commonjsGlobal$$1 !== 'undefined' ? commonjsGlobal$$1 : typeof self !== 'undefined' ? self : {};

// global reference to slice
var _slice = [].slice;
var UNKNOWN_FUNCTION = '?';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;

function getLocationHref() {
  if (typeof document === 'undefined' || document.location == null) return '';

  return document.location.href;
}

/**
 * TraceKit.report: cross-browser processing of unhandled exceptions
 *
 * Syntax:
 *   TraceKit.report.subscribe(function(stackInfo) { ... })
 *   TraceKit.report.unsubscribe(function(stackInfo) { ... })
 *   TraceKit.report(exception)
 *   try { ...code... } catch(ex) { TraceKit.report(ex); }
 *
 * Supports:
 *   - Firefox: full stack trace with line numbers, plus column number
 *              on top frame; column number is not guaranteed
 *   - Opera:   full stack trace with line and column numbers
 *   - Chrome:  full stack trace with line and column numbers
 *   - Safari:  line and column number for the top frame only; some frames
 *              may be missing, and column number is not guaranteed
 *   - IE:      line and column number for the top frame only; some frames
 *              may be missing, and column number is not guaranteed
 *
 * In theory, TraceKit should work on all of the following versions:
 *   - IE5.5+ (only 8.0 tested)
 *   - Firefox 0.9+ (only 3.5+ tested)
 *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
 *     Exceptions Have Stacktrace to be enabled in opera:config)
 *   - Safari 3+ (only 4+ tested)
 *   - Chrome 1+ (only 5+ tested)
 *   - Konqueror 3.5+ (untested)
 *
 * Requires TraceKit.computeStackTrace.
 *
 * Tries to catch all unhandled exceptions and report them to the
 * subscribed handlers. Please note that TraceKit.report will rethrow the
 * exception. This is REQUIRED in order to get a useful stack trace in IE.
 * If the exception does not reach the top of the browser, you will only
 * get a stack trace from the point where TraceKit.report was called.
 *
 * Handlers receive a stackInfo object as described in the
 * TraceKit.computeStackTrace docs.
 */
TraceKit.report = (function reportModuleWrapper() {
  var handlers = [],
    lastArgs = null,
    lastException = null,
    lastExceptionStack = null;

  /**
   * Add a crash handler.
   * @param {Function} handler
   */
  function subscribe(handler) {
    installGlobalHandler();
    handlers.push(handler);
  }

  /**
   * Remove a crash handler.
   * @param {Function} handler
   */
  function unsubscribe(handler) {
    for (var i = handlers.length - 1; i >= 0; --i) {
      if (handlers[i] === handler) {
        handlers.splice(i, 1);
      }
    }
  }

  /**
   * Remove all crash handlers.
   */
  function unsubscribeAll() {
    uninstallGlobalHandler();
    handlers = [];
  }

  /**
   * Dispatch stack information to all handlers.
   * @param {Object.<string, *>} stack
   */
  function notifyHandlers(stack, isWindowError) {
    var exception = null;
    if (isWindowError && !TraceKit.collectWindowErrors) {
      return;
    }
    for (var i in handlers) {
      if (handlers.hasOwnProperty(i)) {
        try {
          handlers[i].apply(null, [stack].concat(_slice.call(arguments, 2)));
        } catch (inner) {
          exception = inner;
        }
      }
    }

    if (exception) {
      throw exception;
    }
  }

  var _oldOnerrorHandler, _onErrorHandlerInstalled;

  /**
   * Ensures all global unhandled exceptions are recorded.
   * Supported by Gecko and IE.
   * @param {string} msg Error message.
   * @param {string} url URL of script that generated the exception.
   * @param {(number|string)} lineNo The line number at which the error
   * occurred.
   * @param {?(number|string)} colNo The column number at which the error
   * occurred.
   * @param {?Error} ex The actual Error object.
   */
  function traceKitWindowOnError(msg, url, lineNo, colNo, ex) {
    var stack = null;
    // If 'ex' is ErrorEvent, get real Error from inside
    var exception = utils.isErrorEvent(ex) ? ex.error : ex;
    // If 'msg' is ErrorEvent, get real message from inside
    var message = utils.isErrorEvent(msg) ? msg.message : msg;

    if (lastExceptionStack) {
      TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(
        lastExceptionStack,
        url,
        lineNo,
        message
      );
      processLastException();
    } else if (exception && utils.isError(exception)) {
      // non-string `exception` arg; attempt to extract stack trace

      // New chrome and blink send along a real error object
      // Let's just report that like a normal error.
      // See: https://mikewest.org/2013/08/debugging-runtime-errors-with-window-onerror
      stack = TraceKit.computeStackTrace(exception);
      notifyHandlers(stack, true);
    } else {
      var location = {
        url: url,
        line: lineNo,
        column: colNo
      };

      var name = undefined;
      var groups;

      if ({}.toString.call(message) === '[object String]') {
        var groups = message.match(ERROR_TYPES_RE);
        if (groups) {
          name = groups[1];
          message = groups[2];
        }
      }

      location.func = UNKNOWN_FUNCTION;

      stack = {
        name: name,
        message: message,
        url: getLocationHref(),
        stack: [location]
      };
      notifyHandlers(stack, true);
    }

    if (_oldOnerrorHandler) {
      return _oldOnerrorHandler.apply(this, arguments);
    }

    return false;
  }

  function installGlobalHandler() {
    if (_onErrorHandlerInstalled) {
      return;
    }
    _oldOnerrorHandler = _window$1.onerror;
    _window$1.onerror = traceKitWindowOnError;
    _onErrorHandlerInstalled = true;
  }

  function uninstallGlobalHandler() {
    if (!_onErrorHandlerInstalled) {
      return;
    }
    _window$1.onerror = _oldOnerrorHandler;
    _onErrorHandlerInstalled = false;
    _oldOnerrorHandler = undefined;
  }

  function processLastException() {
    var _lastExceptionStack = lastExceptionStack,
      _lastArgs = lastArgs;
    lastArgs = null;
    lastExceptionStack = null;
    lastException = null;
    notifyHandlers.apply(null, [_lastExceptionStack, false].concat(_lastArgs));
  }

  /**
   * Reports an unhandled Error to TraceKit.
   * @param {Error} ex
   * @param {?boolean} rethrow If false, do not re-throw the exception.
   * Only used for window.onerror to not cause an infinite loop of
   * rethrowing.
   */
  function report(ex, rethrow) {
    var args = _slice.call(arguments, 1);
    if (lastExceptionStack) {
      if (lastException === ex) {
        return; // already caught by an inner catch block, ignore
      } else {
        processLastException();
      }
    }

    var stack = TraceKit.computeStackTrace(ex);
    lastExceptionStack = stack;
    lastException = ex;
    lastArgs = args;

    // If the stack trace is incomplete, wait for 2 seconds for
    // slow slow IE to see if onerror occurs or not before reporting
    // this exception; otherwise, we will end up with an incomplete
    // stack trace
    setTimeout(function() {
      if (lastException === ex) {
        processLastException();
      }
    }, stack.incomplete ? 2000 : 0);

    if (rethrow !== false) {
      throw ex; // re-throw to propagate to the top level (and cause window.onerror)
    }
  }

  report.subscribe = subscribe;
  report.unsubscribe = unsubscribe;
  report.uninstall = unsubscribeAll;
  return report;
})();

/**
 * TraceKit.computeStackTrace: cross-browser stack traces in JavaScript
 *
 * Syntax:
 *   s = TraceKit.computeStackTrace(exception) // consider using TraceKit.report instead (see below)
 * Returns:
 *   s.name              - exception name
 *   s.message           - exception message
 *   s.stack[i].url      - JavaScript or HTML file URL
 *   s.stack[i].func     - function name, or empty for anonymous functions (if guessing did not work)
 *   s.stack[i].args     - arguments passed to the function, if known
 *   s.stack[i].line     - line number, if known
 *   s.stack[i].column   - column number, if known
 *
 * Supports:
 *   - Firefox:  full stack trace with line numbers and unreliable column
 *               number on top frame
 *   - Opera 10: full stack trace with line and column numbers
 *   - Opera 9-: full stack trace with line numbers
 *   - Chrome:   full stack trace with line and column numbers
 *   - Safari:   line and column number for the topmost stacktrace element
 *               only
 *   - IE:       no line numbers whatsoever
 *
 * Tries to guess names of anonymous functions by looking for assignments
 * in the source code. In IE and Safari, we have to guess source file names
 * by searching for function bodies inside all page scripts. This will not
 * work for scripts that are loaded cross-domain.
 * Here be dragons: some function names may be guessed incorrectly, and
 * duplicate functions may be mismatched.
 *
 * TraceKit.computeStackTrace should only be used for tracing purposes.
 * Logging of unhandled exceptions should be done with TraceKit.report,
 * which builds on top of TraceKit.computeStackTrace and provides better
 * IE support by utilizing the window.onerror event to retrieve information
 * about the top of the stack.
 *
 * Note: In IE and Safari, no stack trace is recorded on the Error object,
 * so computeStackTrace instead walks its *own* chain of callers.
 * This means that:
 *  * in Safari, some methods may be missing from the stack trace;
 *  * in IE, the topmost function in the stack trace will always be the
 *    caller of computeStackTrace.
 *
 * This is okay for tracing (because you are likely to be calling
 * computeStackTrace from the function you want to be the topmost element
 * of the stack trace anyway), but not okay for logging unhandled
 * exceptions (because your catch block will likely be far away from the
 * inner function that actually caused the exception).
 *
 */
TraceKit.computeStackTrace = (function computeStackTraceWrapper() {
  // Contents of Exception in various browsers.
  //
  // SAFARI:
  // ex.message = Can't find variable: qq
  // ex.line = 59
  // ex.sourceId = 580238192
  // ex.sourceURL = http://...
  // ex.expressionBeginOffset = 96
  // ex.expressionCaretOffset = 98
  // ex.expressionEndOffset = 98
  // ex.name = ReferenceError
  //
  // FIREFOX:
  // ex.message = qq is not defined
  // ex.fileName = http://...
  // ex.lineNumber = 59
  // ex.columnNumber = 69
  // ex.stack = ...stack trace... (see the example below)
  // ex.name = ReferenceError
  //
  // CHROME:
  // ex.message = qq is not defined
  // ex.name = ReferenceError
  // ex.type = not_defined
  // ex.arguments = ['aa']
  // ex.stack = ...stack trace...
  //
  // INTERNET EXPLORER:
  // ex.message = ...
  // ex.name = ReferenceError
  //
  // OPERA:
  // ex.message = ...message... (see the example below)
  // ex.name = ReferenceError
  // ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
  // ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'

  /**
   * Computes stack trace information from the stack property.
   * Chrome and Gecko use this property.
   * @param {Error} ex
   * @return {?Object.<string, *>} Stack trace information.
   */
  function computeStackTraceFromStackProp(ex) {
    if (typeof ex.stack === 'undefined' || !ex.stack) return;

    var chrome = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
    var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    // NOTE: blob urls are now supposed to always have an origin, therefore it's format
    // which is `blob:http://url/path/with-some-uuid`, is matched by `blob.*?:\/` as well
    var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
    // Used to additionally parse URL/line/column from eval frames
    var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
    var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/;
    var lines = ex.stack.split('\n');
    var stack = [];
    var submatch;
    var parts;
    var element;
    var reference = /^(.*) is undefined$/.exec(ex.message);

    for (var i = 0, j = lines.length; i < j; ++i) {
      if ((parts = chrome.exec(lines[i]))) {
        var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
        var isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
        if (isEval && (submatch = chromeEval.exec(parts[2]))) {
          // throw out eval line/column and use top-most line/column number
          parts[2] = submatch[1]; // url
          parts[3] = submatch[2]; // line
          parts[4] = submatch[3]; // column
        }
        element = {
          url: !isNative ? parts[2] : null,
          func: parts[1] || UNKNOWN_FUNCTION,
          args: isNative ? [parts[2]] : [],
          line: parts[3] ? +parts[3] : null,
          column: parts[4] ? +parts[4] : null
        };
      } else if ((parts = winjs.exec(lines[i]))) {
        element = {
          url: parts[2],
          func: parts[1] || UNKNOWN_FUNCTION,
          args: [],
          line: +parts[3],
          column: parts[4] ? +parts[4] : null
        };
      } else if ((parts = gecko.exec(lines[i]))) {
        var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
        if (isEval && (submatch = geckoEval.exec(parts[3]))) {
          // throw out eval line/column and use top-most line number
          parts[3] = submatch[1];
          parts[4] = submatch[2];
          parts[5] = null; // no column when eval
        } else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
          // FireFox uses this awesome columnNumber property for its top frame
          // Also note, Firefox's column number is 0-based and everything else expects 1-based,
          // so adding 1
          // NOTE: this hack doesn't work if top-most frame is eval
          stack[0].column = ex.columnNumber + 1;
        }
        element = {
          url: parts[3],
          func: parts[1] || UNKNOWN_FUNCTION,
          args: parts[2] ? parts[2].split(',') : [],
          line: parts[4] ? +parts[4] : null,
          column: parts[5] ? +parts[5] : null
        };
      } else {
        continue;
      }

      if (!element.func && element.line) {
        element.func = UNKNOWN_FUNCTION;
      }

      stack.push(element);
    }

    if (!stack.length) {
      return null;
    }

    return {
      name: ex.name,
      message: ex.message,
      url: getLocationHref(),
      stack: stack
    };
  }

  /**
   * Adds information about the first frame to incomplete stack traces.
   * Safari and IE require this to get complete data on the first frame.
   * @param {Object.<string, *>} stackInfo Stack trace information from
   * one of the compute* methods.
   * @param {string} url The URL of the script that caused an error.
   * @param {(number|string)} lineNo The line number of the script that
   * caused an error.
   * @param {string=} message The error generated by the browser, which
   * hopefully contains the name of the object that caused the error.
   * @return {boolean} Whether or not the stack information was
   * augmented.
   */
  function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
    var initial = {
      url: url,
      line: lineNo
    };

    if (initial.url && initial.line) {
      stackInfo.incomplete = false;

      if (!initial.func) {
        initial.func = UNKNOWN_FUNCTION;
      }

      if (stackInfo.stack.length > 0) {
        if (stackInfo.stack[0].url === initial.url) {
          if (stackInfo.stack[0].line === initial.line) {
            return false; // already in stack trace
          } else if (
            !stackInfo.stack[0].line &&
            stackInfo.stack[0].func === initial.func
          ) {
            stackInfo.stack[0].line = initial.line;
            return false;
          }
        }
      }

      stackInfo.stack.unshift(initial);
      stackInfo.partial = true;
      return true;
    } else {
      stackInfo.incomplete = true;
    }

    return false;
  }

  /**
   * Computes stack trace information by walking the arguments.caller
   * chain at the time the exception occurred. This will cause earlier
   * frames to be missed but is the only way to get any stack trace in
   * Safari and IE. The top frame is restored by
   * {@link augmentStackTraceWithInitialElement}.
   * @param {Error} ex
   * @return {?Object.<string, *>} Stack trace information.
   */
  function computeStackTraceByWalkingCallerChain(ex, depth) {
    var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,
      stack = [],
      funcs = {},
      recursion = false,
      parts,
      item;

    for (
      var curr = computeStackTraceByWalkingCallerChain.caller;
      curr && !recursion;
      curr = curr.caller
    ) {
      if (curr === computeStackTrace || curr === TraceKit.report) {
        // console.log('skipping internal function');
        continue;
      }

      item = {
        url: null,
        func: UNKNOWN_FUNCTION,
        line: null,
        column: null
      };

      if (curr.name) {
        item.func = curr.name;
      } else if ((parts = functionName.exec(curr.toString()))) {
        item.func = parts[1];
      }

      if (typeof item.func === 'undefined') {
        try {
          item.func = parts.input.substring(0, parts.input.indexOf('{'));
        } catch (e) {}
      }

      if (funcs['' + curr]) {
        recursion = true;
      } else {
        funcs['' + curr] = true;
      }

      stack.push(item);
    }

    if (depth) {
      // console.log('depth is ' + depth);
      // console.log('stack is ' + stack.length);
      stack.splice(0, depth);
    }

    var result = {
      name: ex.name,
      message: ex.message,
      url: getLocationHref(),
      stack: stack
    };
    augmentStackTraceWithInitialElement(
      result,
      ex.sourceURL || ex.fileName,
      ex.line || ex.lineNumber,
      ex.message || ex.description
    );
    return result;
  }

  /**
   * Computes a stack trace for an exception.
   * @param {Error} ex
   * @param {(string|number)=} depth
   */
  function computeStackTrace(ex, depth) {
    var stack = null;
    depth = depth == null ? 0 : +depth;

    try {
      stack = computeStackTraceFromStackProp(ex);
      if (stack) {
        return stack;
      }
    } catch (e) {
      if (TraceKit.debug) {
        throw e;
      }
    }

    try {
      stack = computeStackTraceByWalkingCallerChain(ex, depth + 1);
      if (stack) {
        return stack;
      }
    } catch (e) {
      if (TraceKit.debug) {
        throw e;
      }
    }
    return {
      name: ex.name,
      message: ex.message,
      url: getLocationHref()
    };
  }

  computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
  computeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp;

  return computeStackTrace;
})();

var tracekit = TraceKit;

/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
* Add integers, wrapping at 2^32. This uses 16-bit operations internally
* to work around bugs in some JS interpreters.
*/
function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xffff);
}

/*
* Bitwise rotate a 32-bit number to the left.
*/
function bitRotateLeft(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
* These functions implement the four basic operations the algorithm uses.
*/
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn((b & c) | (~b & d), a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
* Calculate the MD5 of an array of little-endian words, and a bit length.
*/
function binlMD5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << (len % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var i;
  var olda;
  var oldb;
  var oldc;
  var oldd;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}

/*
* Convert an array of little-endian words to a string
*/
function binl2rstr(input) {
  var i;
  var output = '';
  var length32 = input.length * 32;
  for (i = 0; i < length32; i += 8) {
    output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
  }
  return output;
}

/*
* Convert a raw string to an array of little-endian words
* Characters >255 have their high-byte silently ignored.
*/
function rstr2binl(input) {
  var i;
  var output = [];
  output[(input.length >> 2) - 1] = undefined;
  for (i = 0; i < output.length; i += 1) {
    output[i] = 0;
  }
  var length8 = input.length * 8;
  for (i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32);
  }
  return output;
}

/*
* Calculate the MD5 of a raw string
*/
function rstrMD5(s) {
  return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
}

/*
* Calculate the HMAC-MD5, of a key and some data (raw strings)
*/
function rstrHMACMD5(key, data) {
  var i;
  var bkey = rstr2binl(key);
  var ipad = [];
  var opad = [];
  var hash;
  ipad[15] = opad[15] = undefined;
  if (bkey.length > 16) {
    bkey = binlMD5(bkey, key.length * 8);
  }
  for (i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5c5c5c5c;
  }
  hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
}

/*
* Convert a raw string to a hex string
*/
function rstr2hex(input) {
  var hexTab = '0123456789abcdef';
  var output = '';
  var x;
  var i;
  for (i = 0; i < input.length; i += 1) {
    x = input.charCodeAt(i);
    output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
  }
  return output;
}

/*
* Encode a string as utf-8
*/
function str2rstrUTF8(input) {
  return unescape(encodeURIComponent(input));
}

/*
* Take string arguments and return either raw or hex encoded strings
*/
function rawMD5(s) {
  return rstrMD5(str2rstrUTF8(s));
}
function hexMD5(s) {
  return rstr2hex(rawMD5(s));
}
function rawHMACMD5(k, d) {
  return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
}
function hexHMACMD5(k, d) {
  return rstr2hex(rawHMACMD5(k, d));
}

function md5(string, key, raw) {
  if (!key) {
    if (!raw) {
      return hexMD5(string);
    }
    return rawMD5(string);
  }
  if (!raw) {
    return hexHMACMD5(key, string);
  }
  return rawHMACMD5(key, string);
}

var md5_1 = md5;

function RavenConfigError(message) {
  this.name = 'RavenConfigError';
  this.message = message;
}
RavenConfigError.prototype = new Error();
RavenConfigError.prototype.constructor = RavenConfigError;

var configError = RavenConfigError;

var wrapMethod = function(console, level, callback) {
  var originalConsoleLevel = console[level];
  var originalConsole = console;

  if (!(level in console)) {
    return;
  }

  var sentryLevel = level === 'warn' ? 'warning' : level;

  console[level] = function() {
    var args = [].slice.call(arguments);

    var msg = utils.safeJoin(args, ' ');
    var data = {level: sentryLevel, logger: 'console', extra: {arguments: args}};

    if (level === 'assert') {
      if (args[0] === false) {
        // Default browsers message
        msg =
          'Assertion failed: ' + (utils.safeJoin(args.slice(1), ' ') || 'console.assert');
        data.extra.arguments = args.slice(1);
        callback && callback(msg, data);
      }
    } else {
      callback && callback(msg, data);
    }

    // this fails for some browsers. :(
    if (originalConsoleLevel) {
      // IE9 doesn't allow calling apply on console functions directly
      // See: https://stackoverflow.com/questions/5472938/does-ie9-support-console-log-and-is-it-a-real-function#answer-5473193
      Function.prototype.apply.call(originalConsoleLevel, originalConsole, args);
    }
  };
};

var console$1 = {
  wrapMethod: wrapMethod
};

/*global XDomainRequest:false */







var isError$1 = utils.isError;
var isObject$1 = utils.isObject;
var isPlainObject$1 = utils.isPlainObject;
var isErrorEvent$1 = utils.isErrorEvent;
var isUndefined$1 = utils.isUndefined;
var isFunction$1 = utils.isFunction;
var isString$1 = utils.isString;
var isArray$1 = utils.isArray;
var isEmptyObject$1 = utils.isEmptyObject;
var each$1 = utils.each;
var objectMerge$1 = utils.objectMerge;
var truncate$1 = utils.truncate;
var objectFrozen$1 = utils.objectFrozen;
var hasKey$1 = utils.hasKey;
var joinRegExp$1 = utils.joinRegExp;
var urlencode$1 = utils.urlencode;
var uuid4$1 = utils.uuid4;
var htmlTreeAsString$1 = utils.htmlTreeAsString;
var isSameException$1 = utils.isSameException;
var isSameStacktrace$1 = utils.isSameStacktrace;
var parseUrl$1 = utils.parseUrl;
var fill$1 = utils.fill;
var supportsFetch$1 = utils.supportsFetch;
var supportsReferrerPolicy$1 = utils.supportsReferrerPolicy;
var serializeKeysForMessage$1 = utils.serializeKeysForMessage;
var serializeException$1 = utils.serializeException;
var sanitize$1 = utils.sanitize;

var wrapConsoleMethod = console$1.wrapMethod;

var dsnKeys = 'source protocol user pass host port path'.split(' '),
  dsnPattern = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;

function now() {
  return +new Date();
}

// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
var _window$2 =
  typeof window !== 'undefined'
    ? window
    : typeof commonjsGlobal$$1 !== 'undefined' ? commonjsGlobal$$1 : typeof self !== 'undefined' ? self : {};
var _document = _window$2.document;
var _navigator = _window$2.navigator;

function keepOriginalCallback(original, callback) {
  return isFunction$1(callback)
    ? function(data) {
        return callback(data, original);
      }
    : callback;
}

// First, check for JSON support
// If there is no JSON, we no-op the core features of Raven
// since JSON is required to encode the payload
function Raven() {
  this._hasJSON = !!(typeof JSON === 'object' && JSON.stringify);
  // Raven can run in contexts where there's no document (react-native)
  this._hasDocument = !isUndefined$1(_document);
  this._hasNavigator = !isUndefined$1(_navigator);
  this._lastCapturedException = null;
  this._lastData = null;
  this._lastEventId = null;
  this._globalServer = null;
  this._globalKey = null;
  this._globalProject = null;
  this._globalContext = {};
  this._globalOptions = {
    // SENTRY_RELEASE can be injected by https://github.com/getsentry/sentry-webpack-plugin
    release: _window$2.SENTRY_RELEASE && _window$2.SENTRY_RELEASE.id,
    logger: 'javascript',
    ignoreErrors: [],
    ignoreUrls: [],
    whitelistUrls: [],
    includePaths: [],
    headers: null,
    collectWindowErrors: true,
    captureUnhandledRejections: true,
    maxMessageLength: 0,
    // By default, truncates URL values to 250 chars
    maxUrlLength: 250,
    stackTraceLimit: 50,
    autoBreadcrumbs: true,
    instrument: true,
    sampleRate: 1,
    sanitizeKeys: []
  };
  this._fetchDefaults = {
    method: 'POST',
    keepalive: true,
    // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
    // https://caniuse.com/#feat=referrer-policy
    // It doesn't. And it throw exception instead of ignoring this parameter...
    // REF: https://github.com/getsentry/raven-js/issues/1233
    referrerPolicy: supportsReferrerPolicy$1() ? 'origin' : ''
  };
  this._ignoreOnError = 0;
  this._isRavenInstalled = false;
  this._originalErrorStackTraceLimit = Error.stackTraceLimit;
  // capture references to window.console *and* all its methods first
  // before the console plugin has a chance to monkey patch
  this._originalConsole = _window$2.console || {};
  this._originalConsoleMethods = {};
  this._plugins = [];
  this._startTime = now();
  this._wrappedBuiltIns = [];
  this._breadcrumbs = [];
  this._lastCapturedEvent = null;
  this._keypressTimeout;
  this._location = _window$2.location;
  this._lastHref = this._location && this._location.href;
  this._resetBackoff();

  // eslint-disable-next-line guard-for-in
  for (var method in this._originalConsole) {
    this._originalConsoleMethods[method] = this._originalConsole[method];
  }
}

/*
 * The core Raven singleton
 *
 * @this {Raven}
 */

Raven.prototype = {
  // Hardcode version string so that raven source can be loaded directly via
  // webpack (using a build step causes webpack #1617). Grunt verifies that
  // this value matches package.json during build.
  //   See: https://github.com/getsentry/raven-js/issues/465
  VERSION: '3.24.1',

  debug: false,

  TraceKit: tracekit, // alias to TraceKit

  /*
     * Configure Raven with a DSN and extra options
     *
     * @param {string} dsn The public Sentry DSN
     * @param {object} options Set of global options [optional]
     * @return {Raven}
     */
  config: function(dsn, options) {
    var self = this;

    if (self._globalServer) {
      this._logDebug('error', 'Error: Raven has already been configured');
      return self;
    }
    if (!dsn) return self;

    var globalOptions = self._globalOptions;

    // merge in options
    if (options) {
      each$1(options, function(key, value) {
        // tags and extra are special and need to be put into context
        if (key === 'tags' || key === 'extra' || key === 'user') {
          self._globalContext[key] = value;
        } else {
          globalOptions[key] = value;
        }
      });
    }

    self.setDSN(dsn);

    // "Script error." is hard coded into browsers for errors that it can't read.
    // this is the result of a script being pulled in from an external domain and CORS.
    globalOptions.ignoreErrors.push(/^Script error\.?$/);
    globalOptions.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/);

    // join regexp rules into one big rule
    globalOptions.ignoreErrors = joinRegExp$1(globalOptions.ignoreErrors);
    globalOptions.ignoreUrls = globalOptions.ignoreUrls.length
      ? joinRegExp$1(globalOptions.ignoreUrls)
      : false;
    globalOptions.whitelistUrls = globalOptions.whitelistUrls.length
      ? joinRegExp$1(globalOptions.whitelistUrls)
      : false;
    globalOptions.includePaths = joinRegExp$1(globalOptions.includePaths);
    globalOptions.maxBreadcrumbs = Math.max(
      0,
      Math.min(globalOptions.maxBreadcrumbs || 100, 100)
    ); // default and hard limit is 100

    var autoBreadcrumbDefaults = {
      xhr: true,
      console: true,
      dom: true,
      location: true,
      sentry: true
    };

    var autoBreadcrumbs = globalOptions.autoBreadcrumbs;
    if ({}.toString.call(autoBreadcrumbs) === '[object Object]') {
      autoBreadcrumbs = objectMerge$1(autoBreadcrumbDefaults, autoBreadcrumbs);
    } else if (autoBreadcrumbs !== false) {
      autoBreadcrumbs = autoBreadcrumbDefaults;
    }
    globalOptions.autoBreadcrumbs = autoBreadcrumbs;

    var instrumentDefaults = {
      tryCatch: true
    };

    var instrument = globalOptions.instrument;
    if ({}.toString.call(instrument) === '[object Object]') {
      instrument = objectMerge$1(instrumentDefaults, instrument);
    } else if (instrument !== false) {
      instrument = instrumentDefaults;
    }
    globalOptions.instrument = instrument;

    tracekit.collectWindowErrors = !!globalOptions.collectWindowErrors;

    // return for chaining
    return self;
  },

  /*
     * Installs a global window.onerror error handler
     * to capture and report uncaught exceptions.
     * At this point, install() is required to be called due
     * to the way TraceKit is set up.
     *
     * @return {Raven}
     */
  install: function() {
    var self = this;
    if (self.isSetup() && !self._isRavenInstalled) {
      tracekit.report.subscribe(function() {
        self._handleOnErrorStackInfo.apply(self, arguments);
      });

      if (self._globalOptions.captureUnhandledRejections) {
        self._attachPromiseRejectionHandler();
      }

      self._patchFunctionToString();

      if (self._globalOptions.instrument && self._globalOptions.instrument.tryCatch) {
        self._instrumentTryCatch();
      }

      if (self._globalOptions.autoBreadcrumbs) self._instrumentBreadcrumbs();

      // Install all of the plugins
      self._drainPlugins();

      self._isRavenInstalled = true;
    }

    Error.stackTraceLimit = self._globalOptions.stackTraceLimit;
    return this;
  },

  /*
     * Set the DSN (can be called multiple time unlike config)
     *
     * @param {string} dsn The public Sentry DSN
     */
  setDSN: function(dsn) {
    var self = this,
      uri = self._parseDSN(dsn),
      lastSlash = uri.path.lastIndexOf('/'),
      path = uri.path.substr(1, lastSlash);

    self._dsn = dsn;
    self._globalKey = uri.user;
    self._globalSecret = uri.pass && uri.pass.substr(1);
    self._globalProject = uri.path.substr(lastSlash + 1);

    self._globalServer = self._getGlobalServer(uri);

    self._globalEndpoint =
      self._globalServer + '/' + path + 'api/' + self._globalProject + '/store/';

    // Reset backoff state since we may be pointing at a
    // new project/server
    this._resetBackoff();
  },

  /*
     * Wrap code within a context so Raven can capture errors
     * reliably across domains that is executed immediately.
     *
     * @param {object} options A specific set of options for this context [optional]
     * @param {function} func The callback to be immediately executed within the context
     * @param {array} args An array of arguments to be called with the callback [optional]
     */
  context: function(options, func, args) {
    if (isFunction$1(options)) {
      args = func || [];
      func = options;
      options = undefined;
    }

    return this.wrap(options, func).apply(this, args);
  },

  /*
     * Wrap code within a context and returns back a new function to be executed
     *
     * @param {object} options A specific set of options for this context [optional]
     * @param {function} func The function to be wrapped in a new context
     * @param {function} func A function to call before the try/catch wrapper [optional, private]
     * @return {function} The newly wrapped functions with a context
     */
  wrap: function(options, func, _before) {
    var self = this;
    // 1 argument has been passed, and it's not a function
    // so just return it
    if (isUndefined$1(func) && !isFunction$1(options)) {
      return options;
    }

    // options is optional
    if (isFunction$1(options)) {
      func = options;
      options = undefined;
    }

    // At this point, we've passed along 2 arguments, and the second one
    // is not a function either, so we'll just return the second argument.
    if (!isFunction$1(func)) {
      return func;
    }

    // We don't wanna wrap it twice!
    try {
      if (func.__raven__) {
        return func;
      }

      // If this has already been wrapped in the past, return that
      if (func.__raven_wrapper__) {
        return func.__raven_wrapper__;
      }
    } catch (e) {
      // Just accessing custom props in some Selenium environments
      // can cause a "Permission denied" exception (see raven-js#495).
      // Bail on wrapping and return the function as-is (defers to window.onerror).
      return func;
    }

    function wrapped() {
      var args = [],
        i = arguments.length,
        deep = !options || (options && options.deep !== false);

      if (_before && isFunction$1(_before)) {
        _before.apply(this, arguments);
      }

      // Recursively wrap all of a function's arguments that are
      // functions themselves.
      while (i--) args[i] = deep ? self.wrap(options, arguments[i]) : arguments[i];

      try {
        // Attempt to invoke user-land function
        // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
        //       means Raven caught an error invoking your application code. This is
        //       expected behavior and NOT indicative of a bug with Raven.js.
        return func.apply(this, args);
      } catch (e) {
        self._ignoreNextOnError();
        self.captureException(e, options);
        throw e;
      }
    }

    // copy over properties of the old function
    for (var property in func) {
      if (hasKey$1(func, property)) {
        wrapped[property] = func[property];
      }
    }
    wrapped.prototype = func.prototype;

    func.__raven_wrapper__ = wrapped;
    // Signal that this function has been wrapped/filled already
    // for both debugging and to prevent it to being wrapped/filled twice
    wrapped.__raven__ = true;
    wrapped.__orig__ = func;

    return wrapped;
  },

  /**
   * Uninstalls the global error handler.
   *
   * @return {Raven}
   */
  uninstall: function() {
    tracekit.report.uninstall();

    this._detachPromiseRejectionHandler();
    this._unpatchFunctionToString();
    this._restoreBuiltIns();
    this._restoreConsole();

    Error.stackTraceLimit = this._originalErrorStackTraceLimit;
    this._isRavenInstalled = false;

    return this;
  },

  /**
   * Callback used for `unhandledrejection` event
   *
   * @param {PromiseRejectionEvent} event An object containing
   *   promise: the Promise that was rejected
   *   reason: the value with which the Promise was rejected
   * @return void
   */
  _promiseRejectionHandler: function(event) {
    this._logDebug('debug', 'Raven caught unhandled promise rejection:', event);
    this.captureException(event.reason, {
      extra: {
        unhandledPromiseRejection: true
      }
    });
  },

  /**
   * Installs the global promise rejection handler.
   *
   * @return {raven}
   */
  _attachPromiseRejectionHandler: function() {
    this._promiseRejectionHandler = this._promiseRejectionHandler.bind(this);
    _window$2.addEventListener &&
      _window$2.addEventListener('unhandledrejection', this._promiseRejectionHandler);
    return this;
  },

  /**
   * Uninstalls the global promise rejection handler.
   *
   * @return {raven}
   */
  _detachPromiseRejectionHandler: function() {
    _window$2.removeEventListener &&
      _window$2.removeEventListener('unhandledrejection', this._promiseRejectionHandler);
    return this;
  },

  /**
   * Manually capture an exception and send it over to Sentry
   *
   * @param {error} ex An exception to be logged
   * @param {object} options A specific set of options for this error [optional]
   * @return {Raven}
   */
  captureException: function(ex, options) {
    options = objectMerge$1({trimHeadFrames: 0}, options ? options : {});

    if (isErrorEvent$1(ex) && ex.error) {
      // If it is an ErrorEvent with `error` property, extract it to get actual Error
      ex = ex.error;
    } else if (isError$1(ex)) {
      // we have a real Error object
      ex = ex;
    } else if (isPlainObject$1(ex)) {
      // If it is plain Object, serialize it manually and extract options
      // This will allow us to group events based on top-level keys
      // which is much better than creating new group when any key/value change
      options = this._getCaptureExceptionOptionsFromPlainObject(options, ex);
      ex = new Error(options.message);
    } else {
      // If none of previous checks were valid, then it means that
      // it's not a plain Object
      // it's not a valid ErrorEvent (one with an error property)
      // it's not an Error
      // So bail out and capture it as a simple message:
      return this.captureMessage(
        ex,
        objectMerge$1(options, {
          stacktrace: true, // if we fall back to captureMessage, default to attempting a new trace
          trimHeadFrames: options.trimHeadFrames + 1
        })
      );
    }

    // Store the raw exception object for potential debugging and introspection
    this._lastCapturedException = ex;

    // TraceKit.report will re-raise any exception passed to it,
    // which means you have to wrap it in try/catch. Instead, we
    // can wrap it here and only re-raise if TraceKit.report
    // raises an exception different from the one we asked to
    // report on.
    try {
      var stack = tracekit.computeStackTrace(ex);
      this._handleStackInfo(stack, options);
    } catch (ex1) {
      if (ex !== ex1) {
        throw ex1;
      }
    }

    return this;
  },

  _getCaptureExceptionOptionsFromPlainObject: function(currentOptions, ex) {
    var exKeys = Object.keys(ex).sort();
    var options = objectMerge$1(currentOptions, {
      message:
        'Non-Error exception captured with keys: ' + serializeKeysForMessage$1(exKeys),
      fingerprint: [md5_1(exKeys)],
      extra: currentOptions.extra || {}
    });
    options.extra.__serialized__ = serializeException$1(ex);

    return options;
  },

  /*
     * Manually send a message to Sentry
     *
     * @param {string} msg A plain message to be captured in Sentry
     * @param {object} options A specific set of options for this message [optional]
     * @return {Raven}
     */
  captureMessage: function(msg, options) {
    // config() automagically converts ignoreErrors from a list to a RegExp so we need to test for an
    // early call; we'll error on the side of logging anything called before configuration since it's
    // probably something you should see:
    if (
      !!this._globalOptions.ignoreErrors.test &&
      this._globalOptions.ignoreErrors.test(msg)
    ) {
      return;
    }

    options = options || {};
    msg = msg + ''; // Make sure it's actually a string

    var data = objectMerge$1(
      {
        message: msg
      },
      options
    );

    var ex;
    // Generate a "synthetic" stack trace from this point.
    // NOTE: If you are a Sentry user, and you are seeing this stack frame, it is NOT indicative
    //       of a bug with Raven.js. Sentry generates synthetic traces either by configuration,
    //       or if it catches a thrown object without a "stack" property.
    try {
      throw new Error(msg);
    } catch (ex1) {
      ex = ex1;
    }

    // null exception name so `Error` isn't prefixed to msg
    ex.name = null;
    var stack = tracekit.computeStackTrace(ex);

    // stack[0] is `throw new Error(msg)` call itself, we are interested in the frame that was just before that, stack[1]
    var initialCall = isArray$1(stack.stack) && stack.stack[1];
    var fileurl = (initialCall && initialCall.url) || '';

    if (
      !!this._globalOptions.ignoreUrls.test &&
      this._globalOptions.ignoreUrls.test(fileurl)
    ) {
      return;
    }

    if (
      !!this._globalOptions.whitelistUrls.test &&
      !this._globalOptions.whitelistUrls.test(fileurl)
    ) {
      return;
    }

    if (this._globalOptions.stacktrace || (options && options.stacktrace)) {
      // fingerprint on msg, not stack trace (legacy behavior, could be revisited)
      data.fingerprint = data.fingerprint == null ? msg : data.fingerprint;

      options = objectMerge$1(
        {
          trimHeadFrames: 0
        },
        options
      );
      // Since we know this is a synthetic trace, the top frame (this function call)
      // MUST be from Raven.js, so mark it for trimming
      // We add to the trim counter so that callers can choose to trim extra frames, such
      // as utility functions.
      options.trimHeadFrames += 1;

      var frames = this._prepareFrames(stack, options);
      data.stacktrace = {
        // Sentry expects frames oldest to newest
        frames: frames.reverse()
      };
    }

    // Make sure that fingerprint is always wrapped in an array
    if (data.fingerprint) {
      data.fingerprint = isArray$1(data.fingerprint)
        ? data.fingerprint
        : [data.fingerprint];
    }

    // Fire away!
    this._send(data);

    return this;
  },

  captureBreadcrumb: function(obj) {
    var crumb = objectMerge$1(
      {
        timestamp: now() / 1000
      },
      obj
    );

    if (isFunction$1(this._globalOptions.breadcrumbCallback)) {
      var result = this._globalOptions.breadcrumbCallback(crumb);

      if (isObject$1(result) && !isEmptyObject$1(result)) {
        crumb = result;
      } else if (result === false) {
        return this;
      }
    }

    this._breadcrumbs.push(crumb);
    if (this._breadcrumbs.length > this._globalOptions.maxBreadcrumbs) {
      this._breadcrumbs.shift();
    }
    return this;
  },

  addPlugin: function(plugin /*arg1, arg2, ... argN*/) {
    var pluginArgs = [].slice.call(arguments, 1);

    this._plugins.push([plugin, pluginArgs]);
    if (this._isRavenInstalled) {
      this._drainPlugins();
    }

    return this;
  },

  /*
     * Set/clear a user to be sent along with the payload.
     *
     * @param {object} user An object representing user data [optional]
     * @return {Raven}
     */
  setUserContext: function(user) {
    // Intentionally do not merge here since that's an unexpected behavior.
    this._globalContext.user = user;

    return this;
  },

  /*
     * Merge extra attributes to be sent along with the payload.
     *
     * @param {object} extra An object representing extra data [optional]
     * @return {Raven}
     */
  setExtraContext: function(extra) {
    this._mergeContext('extra', extra);

    return this;
  },

  /*
     * Merge tags to be sent along with the payload.
     *
     * @param {object} tags An object representing tags [optional]
     * @return {Raven}
     */
  setTagsContext: function(tags) {
    this._mergeContext('tags', tags);

    return this;
  },

  /*
     * Clear all of the context.
     *
     * @return {Raven}
     */
  clearContext: function() {
    this._globalContext = {};

    return this;
  },

  /*
     * Get a copy of the current context. This cannot be mutated.
     *
     * @return {object} copy of context
     */
  getContext: function() {
    // lol javascript
    return JSON.parse(stringify_1(this._globalContext));
  },

  /*
     * Set environment of application
     *
     * @param {string} environment Typically something like 'production'.
     * @return {Raven}
     */
  setEnvironment: function(environment) {
    this._globalOptions.environment = environment;

    return this;
  },

  /*
     * Set release version of application
     *
     * @param {string} release Typically something like a git SHA to identify version
     * @return {Raven}
     */
  setRelease: function(release) {
    this._globalOptions.release = release;

    return this;
  },

  /*
     * Set the dataCallback option
     *
     * @param {function} callback The callback to run which allows the
     *                            data blob to be mutated before sending
     * @return {Raven}
     */
  setDataCallback: function(callback) {
    var original = this._globalOptions.dataCallback;
    this._globalOptions.dataCallback = keepOriginalCallback(original, callback);
    return this;
  },

  /*
     * Set the breadcrumbCallback option
     *
     * @param {function} callback The callback to run which allows filtering
     *                            or mutating breadcrumbs
     * @return {Raven}
     */
  setBreadcrumbCallback: function(callback) {
    var original = this._globalOptions.breadcrumbCallback;
    this._globalOptions.breadcrumbCallback = keepOriginalCallback(original, callback);
    return this;
  },

  /*
     * Set the shouldSendCallback option
     *
     * @param {function} callback The callback to run which allows
     *                            introspecting the blob before sending
     * @return {Raven}
     */
  setShouldSendCallback: function(callback) {
    var original = this._globalOptions.shouldSendCallback;
    this._globalOptions.shouldSendCallback = keepOriginalCallback(original, callback);
    return this;
  },

  /**
   * Override the default HTTP transport mechanism that transmits data
   * to the Sentry server.
   *
   * @param {function} transport Function invoked instead of the default
   *                             `makeRequest` handler.
   *
   * @return {Raven}
   */
  setTransport: function(transport) {
    this._globalOptions.transport = transport;

    return this;
  },

  /*
     * Get the latest raw exception that was captured by Raven.
     *
     * @return {error}
     */
  lastException: function() {
    return this._lastCapturedException;
  },

  /*
     * Get the last event id
     *
     * @return {string}
     */
  lastEventId: function() {
    return this._lastEventId;
  },

  /*
     * Determine if Raven is setup and ready to go.
     *
     * @return {boolean}
     */
  isSetup: function() {
    if (!this._hasJSON) return false; // needs JSON support
    if (!this._globalServer) {
      if (!this.ravenNotConfiguredError) {
        this.ravenNotConfiguredError = true;
        this._logDebug('error', 'Error: Raven has not been configured.');
      }
      return false;
    }
    return true;
  },

  afterLoad: function() {
    // TODO: remove window dependence?

    // Attempt to initialize Raven on load
    var RavenConfig = _window$2.RavenConfig;
    if (RavenConfig) {
      this.config(RavenConfig.dsn, RavenConfig.config).install();
    }
  },

  showReportDialog: function(options) {
    if (
      !_document // doesn't work without a document (React native)
    )
      return;

    options = options || {};

    var lastEventId = options.eventId || this.lastEventId();
    if (!lastEventId) {
      throw new configError('Missing eventId');
    }

    var dsn = options.dsn || this._dsn;
    if (!dsn) {
      throw new configError('Missing DSN');
    }

    var encode = encodeURIComponent;
    var qs = '';
    qs += '?eventId=' + encode(lastEventId);
    qs += '&dsn=' + encode(dsn);

    var user = options.user || this._globalContext.user;
    if (user) {
      if (user.name) qs += '&name=' + encode(user.name);
      if (user.email) qs += '&email=' + encode(user.email);
    }

    var globalServer = this._getGlobalServer(this._parseDSN(dsn));

    var script = _document.createElement('script');
    script.async = true;
    script.src = globalServer + '/api/embed/error-page/' + qs;
    (_document.head || _document.body).appendChild(script);
  },

  /**** Private functions ****/
  _ignoreNextOnError: function() {
    var self = this;
    this._ignoreOnError += 1;
    setTimeout(function() {
      // onerror should trigger before setTimeout
      self._ignoreOnError -= 1;
    });
  },

  _triggerEvent: function(eventType, options) {
    // NOTE: `event` is a native browser thing, so let's avoid conflicting wiht it
    var evt, key;

    if (!this._hasDocument) return;

    options = options || {};

    eventType = 'raven' + eventType.substr(0, 1).toUpperCase() + eventType.substr(1);

    if (_document.createEvent) {
      evt = _document.createEvent('HTMLEvents');
      evt.initEvent(eventType, true, true);
    } else {
      evt = _document.createEventObject();
      evt.eventType = eventType;
    }

    for (key in options)
      if (hasKey$1(options, key)) {
        evt[key] = options[key];
      }

    if (_document.createEvent) {
      // IE9 if standards
      _document.dispatchEvent(evt);
    } else {
      // IE8 regardless of Quirks or Standards
      // IE9 if quirks
      try {
        _document.fireEvent('on' + evt.eventType.toLowerCase(), evt);
      } catch (e) {
        // Do nothing
      }
    }
  },

  /**
   * Wraps addEventListener to capture UI breadcrumbs
   * @param evtName the event name (e.g. "click")
   * @returns {Function}
   * @private
   */
  _breadcrumbEventHandler: function(evtName) {
    var self = this;
    return function(evt) {
      // reset keypress timeout; e.g. triggering a 'click' after
      // a 'keypress' will reset the keypress debounce so that a new
      // set of keypresses can be recorded
      self._keypressTimeout = null;

      // It's possible this handler might trigger multiple times for the same
      // event (e.g. event propagation through node ancestors). Ignore if we've
      // already captured the event.
      if (self._lastCapturedEvent === evt) return;

      self._lastCapturedEvent = evt;

      // try/catch both:
      // - accessing evt.target (see getsentry/raven-js#838, #768)
      // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
      //   can throw an exception in some circumstances.
      var target;
      try {
        target = htmlTreeAsString$1(evt.target);
      } catch (e) {
        target = '<unknown>';
      }

      self.captureBreadcrumb({
        category: 'ui.' + evtName, // e.g. ui.click, ui.input
        message: target
      });
    };
  },

  /**
   * Wraps addEventListener to capture keypress UI events
   * @returns {Function}
   * @private
   */
  _keypressEventHandler: function() {
    var self = this,
      debounceDuration = 1000; // milliseconds

    // TODO: if somehow user switches keypress target before
    //       debounce timeout is triggered, we will only capture
    //       a single breadcrumb from the FIRST target (acceptable?)
    return function(evt) {
      var target;
      try {
        target = evt.target;
      } catch (e) {
        // just accessing event properties can throw an exception in some rare circumstances
        // see: https://github.com/getsentry/raven-js/issues/838
        return;
      }
      var tagName = target && target.tagName;

      // only consider keypress events on actual input elements
      // this will disregard keypresses targeting body (e.g. tabbing
      // through elements, hotkeys, etc)
      if (
        !tagName ||
        (tagName !== 'INPUT' && tagName !== 'TEXTAREA' && !target.isContentEditable)
      )
        return;

      // record first keypress in a series, but ignore subsequent
      // keypresses until debounce clears
      var timeout = self._keypressTimeout;
      if (!timeout) {
        self._breadcrumbEventHandler('input')(evt);
      }
      clearTimeout(timeout);
      self._keypressTimeout = setTimeout(function() {
        self._keypressTimeout = null;
      }, debounceDuration);
    };
  },

  /**
   * Captures a breadcrumb of type "navigation", normalizing input URLs
   * @param to the originating URL
   * @param from the target URL
   * @private
   */
  _captureUrlChange: function(from, to) {
    var parsedLoc = parseUrl$1(this._location.href);
    var parsedTo = parseUrl$1(to);
    var parsedFrom = parseUrl$1(from);

    // because onpopstate only tells you the "new" (to) value of location.href, and
    // not the previous (from) value, we need to track the value of the current URL
    // state ourselves
    this._lastHref = to;

    // Use only the path component of the URL if the URL matches the current
    // document (almost all the time when using pushState)
    if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host)
      to = parsedTo.relative;
    if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host)
      from = parsedFrom.relative;

    this.captureBreadcrumb({
      category: 'navigation',
      data: {
        to: to,
        from: from
      }
    });
  },

  _patchFunctionToString: function() {
    var self = this;
    self._originalFunctionToString = Function.prototype.toString;
    // eslint-disable-next-line no-extend-native
    Function.prototype.toString = function() {
      if (typeof this === 'function' && this.__raven__) {
        return self._originalFunctionToString.apply(this.__orig__, arguments);
      }
      return self._originalFunctionToString.apply(this, arguments);
    };
  },

  _unpatchFunctionToString: function() {
    if (this._originalFunctionToString) {
      // eslint-disable-next-line no-extend-native
      Function.prototype.toString = this._originalFunctionToString;
    }
  },

  /**
   * Wrap timer functions and event targets to catch errors and provide
   * better metadata.
   */
  _instrumentTryCatch: function() {
    var self = this;

    var wrappedBuiltIns = self._wrappedBuiltIns;

    function wrapTimeFn(orig) {
      return function(fn, t) {
        // preserve arity
        // Make a copy of the arguments to prevent deoptimization
        // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i) {
          args[i] = arguments[i];
        }
        var originalCallback = args[0];
        if (isFunction$1(originalCallback)) {
          args[0] = self.wrap(originalCallback);
        }

        // IE < 9 doesn't support .call/.apply on setInterval/setTimeout, but it
        // also supports only two arguments and doesn't care what this is, so we
        // can just call the original function directly.
        if (orig.apply) {
          return orig.apply(this, args);
        } else {
          return orig(args[0], args[1]);
        }
      };
    }

    var autoBreadcrumbs = this._globalOptions.autoBreadcrumbs;

    function wrapEventTarget(global) {
      var proto = _window$2[global] && _window$2[global].prototype;
      if (proto && proto.hasOwnProperty && proto.hasOwnProperty('addEventListener')) {
        fill$1(
          proto,
          'addEventListener',
          function(orig) {
            return function(evtName, fn, capture, secure) {
              // preserve arity
              try {
                if (fn && fn.handleEvent) {
                  fn.handleEvent = self.wrap(fn.handleEvent);
                }
              } catch (err) {
                // can sometimes get 'Permission denied to access property "handle Event'
              }

              // More breadcrumb DOM capture ... done here and not in `_instrumentBreadcrumbs`
              // so that we don't have more than one wrapper function
              var before, clickHandler, keypressHandler;

              if (
                autoBreadcrumbs &&
                autoBreadcrumbs.dom &&
                (global === 'EventTarget' || global === 'Node')
              ) {
                // NOTE: generating multiple handlers per addEventListener invocation, should
                //       revisit and verify we can just use one (almost certainly)
                clickHandler = self._breadcrumbEventHandler('click');
                keypressHandler = self._keypressEventHandler();
                before = function(evt) {
                  // need to intercept every DOM event in `before` argument, in case that
                  // same wrapped method is re-used for different events (e.g. mousemove THEN click)
                  // see #724
                  if (!evt) return;

                  var eventType;
                  try {
                    eventType = evt.type;
                  } catch (e) {
                    // just accessing event properties can throw an exception in some rare circumstances
                    // see: https://github.com/getsentry/raven-js/issues/838
                    return;
                  }
                  if (eventType === 'click') return clickHandler(evt);
                  else if (eventType === 'keypress') return keypressHandler(evt);
                };
              }
              return orig.call(
                this,
                evtName,
                self.wrap(fn, undefined, before),
                capture,
                secure
              );
            };
          },
          wrappedBuiltIns
        );
        fill$1(
          proto,
          'removeEventListener',
          function(orig) {
            return function(evt, fn, capture, secure) {
              try {
                fn = fn && (fn.__raven_wrapper__ ? fn.__raven_wrapper__ : fn);
              } catch (e) {
                // ignore, accessing __raven_wrapper__ will throw in some Selenium environments
              }
              return orig.call(this, evt, fn, capture, secure);
            };
          },
          wrappedBuiltIns
        );
      }
    }

    fill$1(_window$2, 'setTimeout', wrapTimeFn, wrappedBuiltIns);
    fill$1(_window$2, 'setInterval', wrapTimeFn, wrappedBuiltIns);
    if (_window$2.requestAnimationFrame) {
      fill$1(
        _window$2,
        'requestAnimationFrame',
        function(orig) {
          return function(cb) {
            return orig(self.wrap(cb));
          };
        },
        wrappedBuiltIns
      );
    }

    // event targets borrowed from bugsnag-js:
    // https://github.com/bugsnag/bugsnag-js/blob/master/src/bugsnag.js#L666
    var eventTargets = [
      'EventTarget',
      'Window',
      'Node',
      'ApplicationCache',
      'AudioTrackList',
      'ChannelMergerNode',
      'CryptoOperation',
      'EventSource',
      'FileReader',
      'HTMLUnknownElement',
      'IDBDatabase',
      'IDBRequest',
      'IDBTransaction',
      'KeyOperation',
      'MediaController',
      'MessagePort',
      'ModalWindow',
      'Notification',
      'SVGElementInstance',
      'Screen',
      'TextTrack',
      'TextTrackCue',
      'TextTrackList',
      'WebSocket',
      'WebSocketWorker',
      'Worker',
      'XMLHttpRequest',
      'XMLHttpRequestEventTarget',
      'XMLHttpRequestUpload'
    ];
    for (var i = 0; i < eventTargets.length; i++) {
      wrapEventTarget(eventTargets[i]);
    }
  },

  /**
   * Instrument browser built-ins w/ breadcrumb capturing
   *  - XMLHttpRequests
   *  - DOM interactions (click/typing)
   *  - window.location changes
   *  - console
   *
   * Can be disabled or individually configured via the `autoBreadcrumbs` config option
   */
  _instrumentBreadcrumbs: function() {
    var self = this;
    var autoBreadcrumbs = this._globalOptions.autoBreadcrumbs;

    var wrappedBuiltIns = self._wrappedBuiltIns;

    function wrapProp(prop, xhr) {
      if (prop in xhr && isFunction$1(xhr[prop])) {
        fill$1(xhr, prop, function(orig) {
          return self.wrap(orig);
        }); // intentionally don't track filled methods on XHR instances
      }
    }

    if (autoBreadcrumbs.xhr && 'XMLHttpRequest' in _window$2) {
      var xhrproto = _window$2.XMLHttpRequest && _window$2.XMLHttpRequest.prototype;
      fill$1(
        xhrproto,
        'open',
        function(origOpen) {
          return function(method, url) {
            // preserve arity

            // if Sentry key appears in URL, don't capture
            if (isString$1(url) && url.indexOf(self._globalKey) === -1) {
              this.__raven_xhr = {
                method: method,
                url: url,
                status_code: null
              };
            }

            return origOpen.apply(this, arguments);
          };
        },
        wrappedBuiltIns
      );

      fill$1(
        xhrproto,
        'send',
        function(origSend) {
          return function() {
            // preserve arity
            var xhr = this;

            function onreadystatechangeHandler() {
              if (xhr.__raven_xhr && xhr.readyState === 4) {
                try {
                  // touching statusCode in some platforms throws
                  // an exception
                  xhr.__raven_xhr.status_code = xhr.status;
                } catch (e) {
                  /* do nothing */
                }

                self.captureBreadcrumb({
                  type: 'http',
                  category: 'xhr',
                  data: xhr.__raven_xhr
                });
              }
            }

            var props = ['onload', 'onerror', 'onprogress'];
            for (var j = 0; j < props.length; j++) {
              wrapProp(props[j], xhr);
            }

            if ('onreadystatechange' in xhr && isFunction$1(xhr.onreadystatechange)) {
              fill$1(
                xhr,
                'onreadystatechange',
                function(orig) {
                  return self.wrap(orig, undefined, onreadystatechangeHandler);
                } /* intentionally don't track this instrumentation */
              );
            } else {
              // if onreadystatechange wasn't actually set by the page on this xhr, we
              // are free to set our own and capture the breadcrumb
              xhr.onreadystatechange = onreadystatechangeHandler;
            }

            return origSend.apply(this, arguments);
          };
        },
        wrappedBuiltIns
      );
    }

    if (autoBreadcrumbs.xhr && supportsFetch$1()) {
      fill$1(
        _window$2,
        'fetch',
        function(origFetch) {
          return function() {
            // preserve arity
            // Make a copy of the arguments to prevent deoptimization
            // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
            var args = new Array(arguments.length);
            for (var i = 0; i < args.length; ++i) {
              args[i] = arguments[i];
            }

            var fetchInput = args[0];
            var method = 'GET';
            var url;

            if (typeof fetchInput === 'string') {
              url = fetchInput;
            } else if ('Request' in _window$2 && fetchInput instanceof _window$2.Request) {
              url = fetchInput.url;
              if (fetchInput.method) {
                method = fetchInput.method;
              }
            } else {
              url = '' + fetchInput;
            }

            // if Sentry key appears in URL, don't capture, as it's our own request
            if (url.indexOf(self._globalKey) !== -1) {
              return origFetch.apply(this, args);
            }

            if (args[1] && args[1].method) {
              method = args[1].method;
            }

            var fetchData = {
              method: method,
              url: url,
              status_code: null
            };

            return origFetch.apply(this, args).then(function(response) {
              fetchData.status_code = response.status;

              self.captureBreadcrumb({
                type: 'http',
                category: 'fetch',
                data: fetchData
              });

              return response;
            });
          };
        },
        wrappedBuiltIns
      );
    }

    // Capture breadcrumbs from any click that is unhandled / bubbled up all the way
    // to the document. Do this before we instrument addEventListener.
    if (autoBreadcrumbs.dom && this._hasDocument) {
      if (_document.addEventListener) {
        _document.addEventListener('click', self._breadcrumbEventHandler('click'), false);
        _document.addEventListener('keypress', self._keypressEventHandler(), false);
      } else if (_document.attachEvent) {
        // IE8 Compatibility
        _document.attachEvent('onclick', self._breadcrumbEventHandler('click'));
        _document.attachEvent('onkeypress', self._keypressEventHandler());
      }
    }

    // record navigation (URL) changes
    // NOTE: in Chrome App environment, touching history.pushState, *even inside
    //       a try/catch block*, will cause Chrome to output an error to console.error
    // borrowed from: https://github.com/angular/angular.js/pull/13945/files
    var chrome = _window$2.chrome;
    var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
    var hasPushAndReplaceState =
      !isChromePackagedApp &&
      _window$2.history &&
      history.pushState &&
      history.replaceState;
    if (autoBreadcrumbs.location && hasPushAndReplaceState) {
      // TODO: remove onpopstate handler on uninstall()
      var oldOnPopState = _window$2.onpopstate;
      _window$2.onpopstate = function() {
        var currentHref = self._location.href;
        self._captureUrlChange(self._lastHref, currentHref);

        if (oldOnPopState) {
          return oldOnPopState.apply(this, arguments);
        }
      };

      var historyReplacementFunction = function(origHistFunction) {
        // note history.pushState.length is 0; intentionally not declaring
        // params to preserve 0 arity
        return function(/* state, title, url */) {
          var url = arguments.length > 2 ? arguments[2] : undefined;

          // url argument is optional
          if (url) {
            // coerce to string (this is what pushState does)
            self._captureUrlChange(self._lastHref, url + '');
          }

          return origHistFunction.apply(this, arguments);
        };
      };

      fill$1(history, 'pushState', historyReplacementFunction, wrappedBuiltIns);
      fill$1(history, 'replaceState', historyReplacementFunction, wrappedBuiltIns);
    }

    if (autoBreadcrumbs.console && 'console' in _window$2 && console.log) {
      // console
      var consoleMethodCallback = function(msg, data) {
        self.captureBreadcrumb({
          message: msg,
          level: data.level,
          category: 'console'
        });
      };

      each$1(['debug', 'info', 'warn', 'error', 'log'], function(_, level) {
        wrapConsoleMethod(console, level, consoleMethodCallback);
      });
    }
  },

  _restoreBuiltIns: function() {
    // restore any wrapped builtins
    var builtin;
    while (this._wrappedBuiltIns.length) {
      builtin = this._wrappedBuiltIns.shift();

      var obj = builtin[0],
        name = builtin[1],
        orig = builtin[2];

      obj[name] = orig;
    }
  },

  _restoreConsole: function() {
    // eslint-disable-next-line guard-for-in
    for (var method in this._originalConsoleMethods) {
      this._originalConsole[method] = this._originalConsoleMethods[method];
    }
  },

  _drainPlugins: function() {
    var self = this;

    // FIX ME TODO
    each$1(this._plugins, function(_, plugin) {
      var installer = plugin[0];
      var args = plugin[1];
      installer.apply(self, [self].concat(args));
    });
  },

  _parseDSN: function(str) {
    var m = dsnPattern.exec(str),
      dsn = {},
      i = 7;

    try {
      while (i--) dsn[dsnKeys[i]] = m[i] || '';
    } catch (e) {
      throw new configError('Invalid DSN: ' + str);
    }

    if (dsn.pass && !this._globalOptions.allowSecretKey) {
      throw new configError(
        'Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key'
      );
    }

    return dsn;
  },

  _getGlobalServer: function(uri) {
    // assemble the endpoint from the uri pieces
    var globalServer = '//' + uri.host + (uri.port ? ':' + uri.port : '');

    if (uri.protocol) {
      globalServer = uri.protocol + ':' + globalServer;
    }
    return globalServer;
  },

  _handleOnErrorStackInfo: function() {
    // if we are intentionally ignoring errors via onerror, bail out
    if (!this._ignoreOnError) {
      this._handleStackInfo.apply(this, arguments);
    }
  },

  _handleStackInfo: function(stackInfo, options) {
    var frames = this._prepareFrames(stackInfo, options);

    this._triggerEvent('handle', {
      stackInfo: stackInfo,
      options: options
    });

    this._processException(
      stackInfo.name,
      stackInfo.message,
      stackInfo.url,
      stackInfo.lineno,
      frames,
      options
    );
  },

  _prepareFrames: function(stackInfo, options) {
    var self = this;
    var frames = [];
    if (stackInfo.stack && stackInfo.stack.length) {
      each$1(stackInfo.stack, function(i, stack) {
        var frame = self._normalizeFrame(stack, stackInfo.url);
        if (frame) {
          frames.push(frame);
        }
      });

      // e.g. frames captured via captureMessage throw
      if (options && options.trimHeadFrames) {
        for (var j = 0; j < options.trimHeadFrames && j < frames.length; j++) {
          frames[j].in_app = false;
        }
      }
    }
    frames = frames.slice(0, this._globalOptions.stackTraceLimit);
    return frames;
  },

  _normalizeFrame: function(frame, stackInfoUrl) {
    // normalize the frames data
    var normalized = {
      filename: frame.url,
      lineno: frame.line,
      colno: frame.column,
      function: frame.func || '?'
    };

    // Case when we don't have any information about the error
    // E.g. throwing a string or raw object, instead of an `Error` in Firefox
    // Generating synthetic error doesn't add any value here
    //
    // We should probably somehow let a user know that they should fix their code
    if (!frame.url) {
      normalized.filename = stackInfoUrl; // fallback to whole stacks url from onerror handler
    }

    normalized.in_app = !// determine if an exception came from outside of our app
    // first we check the global includePaths list.
    (
      (!!this._globalOptions.includePaths.test &&
        !this._globalOptions.includePaths.test(normalized.filename)) ||
      // Now we check for fun, if the function name is Raven or TraceKit
      /(Raven|TraceKit)\./.test(normalized['function']) ||
      // finally, we do a last ditch effort and check for raven.min.js
      /raven\.(min\.)?js$/.test(normalized.filename)
    );

    return normalized;
  },

  _processException: function(type, message, fileurl, lineno, frames, options) {
    var prefixedMessage = (type ? type + ': ' : '') + (message || '');
    if (
      !!this._globalOptions.ignoreErrors.test &&
      (this._globalOptions.ignoreErrors.test(message) ||
        this._globalOptions.ignoreErrors.test(prefixedMessage))
    ) {
      return;
    }

    var stacktrace;

    if (frames && frames.length) {
      fileurl = frames[0].filename || fileurl;
      // Sentry expects frames oldest to newest
      // and JS sends them as newest to oldest
      frames.reverse();
      stacktrace = {frames: frames};
    } else if (fileurl) {
      stacktrace = {
        frames: [
          {
            filename: fileurl,
            lineno: lineno,
            in_app: true
          }
        ]
      };
    }

    if (
      !!this._globalOptions.ignoreUrls.test &&
      this._globalOptions.ignoreUrls.test(fileurl)
    ) {
      return;
    }

    if (
      !!this._globalOptions.whitelistUrls.test &&
      !this._globalOptions.whitelistUrls.test(fileurl)
    ) {
      return;
    }

    var data = objectMerge$1(
      {
        // sentry.interfaces.Exception
        exception: {
          values: [
            {
              type: type,
              value: message,
              stacktrace: stacktrace
            }
          ]
        },
        culprit: fileurl
      },
      options
    );

    // Fire away!
    this._send(data);
  },

  _trimPacket: function(data) {
    // For now, we only want to truncate the two different messages
    // but this could/should be expanded to just trim everything
    var max = this._globalOptions.maxMessageLength;
    if (data.message) {
      data.message = truncate$1(data.message, max);
    }
    if (data.exception) {
      var exception = data.exception.values[0];
      exception.value = truncate$1(exception.value, max);
    }

    var request = data.request;
    if (request) {
      if (request.url) {
        request.url = truncate$1(request.url, this._globalOptions.maxUrlLength);
      }
      if (request.Referer) {
        request.Referer = truncate$1(request.Referer, this._globalOptions.maxUrlLength);
      }
    }

    if (data.breadcrumbs && data.breadcrumbs.values)
      this._trimBreadcrumbs(data.breadcrumbs);

    return data;
  },

  /**
   * Truncate breadcrumb values (right now just URLs)
   */
  _trimBreadcrumbs: function(breadcrumbs) {
    // known breadcrumb properties with urls
    // TODO: also consider arbitrary prop values that start with (https?)?://
    var urlProps = ['to', 'from', 'url'],
      urlProp,
      crumb,
      data;

    for (var i = 0; i < breadcrumbs.values.length; ++i) {
      crumb = breadcrumbs.values[i];
      if (
        !crumb.hasOwnProperty('data') ||
        !isObject$1(crumb.data) ||
        objectFrozen$1(crumb.data)
      )
        continue;

      data = objectMerge$1({}, crumb.data);
      for (var j = 0; j < urlProps.length; ++j) {
        urlProp = urlProps[j];
        if (data.hasOwnProperty(urlProp) && data[urlProp]) {
          data[urlProp] = truncate$1(data[urlProp], this._globalOptions.maxUrlLength);
        }
      }
      breadcrumbs.values[i].data = data;
    }
  },

  _getHttpData: function() {
    if (!this._hasNavigator && !this._hasDocument) return;
    var httpData = {};

    if (this._hasNavigator && _navigator.userAgent) {
      httpData.headers = {
        'User-Agent': navigator.userAgent
      };
    }

    // Check in `window` instead of `document`, as we may be in ServiceWorker environment
    if (_window$2.location && _window$2.location.href) {
      httpData.url = _window$2.location.href;
    }

    if (this._hasDocument && _document.referrer) {
      if (!httpData.headers) httpData.headers = {};
      httpData.headers.Referer = _document.referrer;
    }

    return httpData;
  },

  _resetBackoff: function() {
    this._backoffDuration = 0;
    this._backoffStart = null;
  },

  _shouldBackoff: function() {
    return this._backoffDuration && now() - this._backoffStart < this._backoffDuration;
  },

  /**
   * Returns true if the in-process data payload matches the signature
   * of the previously-sent data
   *
   * NOTE: This has to be done at this level because TraceKit can generate
   *       data from window.onerror WITHOUT an exception object (IE8, IE9,
   *       other old browsers). This can take the form of an "exception"
   *       data object with a single frame (derived from the onerror args).
   */
  _isRepeatData: function(current) {
    var last = this._lastData;

    if (
      !last ||
      current.message !== last.message || // defined for captureMessage
      current.culprit !== last.culprit // defined for captureException/onerror
    )
      return false;

    // Stacktrace interface (i.e. from captureMessage)
    if (current.stacktrace || last.stacktrace) {
      return isSameStacktrace$1(current.stacktrace, last.stacktrace);
    } else if (current.exception || last.exception) {
      // Exception interface (i.e. from captureException/onerror)
      return isSameException$1(current.exception, last.exception);
    }

    return true;
  },

  _setBackoffState: function(request) {
    // If we are already in a backoff state, don't change anything
    if (this._shouldBackoff()) {
      return;
    }

    var status = request.status;

    // 400 - project_id doesn't exist or some other fatal
    // 401 - invalid/revoked dsn
    // 429 - too many requests
    if (!(status === 400 || status === 401 || status === 429)) return;

    var retry;
    try {
      // If Retry-After is not in Access-Control-Expose-Headers, most
      // browsers will throw an exception trying to access it
      if (supportsFetch$1()) {
        retry = request.headers.get('Retry-After');
      } else {
        retry = request.getResponseHeader('Retry-After');
      }

      // Retry-After is returned in seconds
      retry = parseInt(retry, 10) * 1000;
    } catch (e) {
      /* eslint no-empty:0 */
    }

    this._backoffDuration = retry
      ? // If Sentry server returned a Retry-After value, use it
        retry
      : // Otherwise, double the last backoff duration (starts at 1 sec)
        this._backoffDuration * 2 || 1000;

    this._backoffStart = now();
  },

  _send: function(data) {
    var globalOptions = this._globalOptions;

    var baseData = {
        project: this._globalProject,
        logger: globalOptions.logger,
        platform: 'javascript'
      },
      httpData = this._getHttpData();

    if (httpData) {
      baseData.request = httpData;
    }

    // HACK: delete `trimHeadFrames` to prevent from appearing in outbound payload
    if (data.trimHeadFrames) delete data.trimHeadFrames;

    data = objectMerge$1(baseData, data);

    // Merge in the tags and extra separately since objectMerge doesn't handle a deep merge
    data.tags = objectMerge$1(objectMerge$1({}, this._globalContext.tags), data.tags);
    data.extra = objectMerge$1(objectMerge$1({}, this._globalContext.extra), data.extra);

    // Send along our own collected metadata with extra
    data.extra['session:duration'] = now() - this._startTime;

    if (this._breadcrumbs && this._breadcrumbs.length > 0) {
      // intentionally make shallow copy so that additions
      // to breadcrumbs aren't accidentally sent in this request
      data.breadcrumbs = {
        values: [].slice.call(this._breadcrumbs, 0)
      };
    }

    if (this._globalContext.user) {
      // sentry.interfaces.User
      data.user = this._globalContext.user;
    }

    // Include the environment if it's defined in globalOptions
    if (globalOptions.environment) data.environment = globalOptions.environment;

    // Include the release if it's defined in globalOptions
    if (globalOptions.release) data.release = globalOptions.release;

    // Include server_name if it's defined in globalOptions
    if (globalOptions.serverName) data.server_name = globalOptions.serverName;

    data = this._sanitizeData(data);

    // Cleanup empty properties before sending them to the server
    Object.keys(data).forEach(function(key) {
      if (data[key] == null || data[key] === '' || isEmptyObject$1(data[key])) {
        delete data[key];
      }
    });

    if (isFunction$1(globalOptions.dataCallback)) {
      data = globalOptions.dataCallback(data) || data;
    }

    // Why??????????
    if (!data || isEmptyObject$1(data)) {
      return;
    }

    // Check if the request should be filtered or not
    if (
      isFunction$1(globalOptions.shouldSendCallback) &&
      !globalOptions.shouldSendCallback(data)
    ) {
      return;
    }

    // Backoff state: Sentry server previously responded w/ an error (e.g. 429 - too many requests),
    // so drop requests until "cool-off" period has elapsed.
    if (this._shouldBackoff()) {
      this._logDebug('warn', 'Raven dropped error due to backoff: ', data);
      return;
    }

    if (typeof globalOptions.sampleRate === 'number') {
      if (Math.random() < globalOptions.sampleRate) {
        this._sendProcessedPayload(data);
      }
    } else {
      this._sendProcessedPayload(data);
    }
  },

  _sanitizeData: function(data) {
    return sanitize$1(data, this._globalOptions.sanitizeKeys);
  },

  _getUuid: function() {
    return uuid4$1();
  },

  _sendProcessedPayload: function(data, callback) {
    var self = this;
    var globalOptions = this._globalOptions;

    if (!this.isSetup()) return;

    // Try and clean up the packet before sending by truncating long values
    data = this._trimPacket(data);

    // ideally duplicate error testing should occur *before* dataCallback/shouldSendCallback,
    // but this would require copying an un-truncated copy of the data packet, which can be
    // arbitrarily deep (extra_data) -- could be worthwhile? will revisit
    if (!this._globalOptions.allowDuplicates && this._isRepeatData(data)) {
      this._logDebug('warn', 'Raven dropped repeat event: ', data);
      return;
    }

    // Send along an event_id if not explicitly passed.
    // This event_id can be used to reference the error within Sentry itself.
    // Set lastEventId after we know the error should actually be sent
    this._lastEventId = data.event_id || (data.event_id = this._getUuid());

    // Store outbound payload after trim
    this._lastData = data;

    this._logDebug('debug', 'Raven about to send:', data);

    var auth = {
      sentry_version: '7',
      sentry_client: 'raven-js/' + this.VERSION,
      sentry_key: this._globalKey
    };

    if (this._globalSecret) {
      auth.sentry_secret = this._globalSecret;
    }

    var exception = data.exception && data.exception.values[0];

    // only capture 'sentry' breadcrumb is autoBreadcrumbs is truthy
    if (
      this._globalOptions.autoBreadcrumbs &&
      this._globalOptions.autoBreadcrumbs.sentry
    ) {
      this.captureBreadcrumb({
        category: 'sentry',
        message: exception
          ? (exception.type ? exception.type + ': ' : '') + exception.value
          : data.message,
        event_id: data.event_id,
        level: data.level || 'error' // presume error unless specified
      });
    }

    var url = this._globalEndpoint;
    (globalOptions.transport || this._makeRequest).call(this, {
      url: url,
      auth: auth,
      data: data,
      options: globalOptions,
      onSuccess: function success() {
        self._resetBackoff();

        self._triggerEvent('success', {
          data: data,
          src: url
        });
        callback && callback();
      },
      onError: function failure(error) {
        self._logDebug('error', 'Raven transport failed to send: ', error);

        if (error.request) {
          self._setBackoffState(error.request);
        }

        self._triggerEvent('failure', {
          data: data,
          src: url
        });
        error = error || new Error('Raven send failed (no additional details provided)');
        callback && callback(error);
      }
    });
  },

  _makeRequest: function(opts) {
    // Auth is intentionally sent as part of query string (NOT as custom HTTP header) to avoid preflight CORS requests
    var url = opts.url + '?' + urlencode$1(opts.auth);

    var evaluatedHeaders = null;
    var evaluatedFetchParameters = {};

    if (opts.options.headers) {
      evaluatedHeaders = this._evaluateHash(opts.options.headers);
    }

    if (opts.options.fetchParameters) {
      evaluatedFetchParameters = this._evaluateHash(opts.options.fetchParameters);
    }

    if (supportsFetch$1()) {
      evaluatedFetchParameters.body = stringify_1(opts.data);

      var defaultFetchOptions = objectMerge$1({}, this._fetchDefaults);
      var fetchOptions = objectMerge$1(defaultFetchOptions, evaluatedFetchParameters);

      if (evaluatedHeaders) {
        fetchOptions.headers = evaluatedHeaders;
      }

      return _window$2
        .fetch(url, fetchOptions)
        .then(function(response) {
          if (response.ok) {
            opts.onSuccess && opts.onSuccess();
          } else {
            var error = new Error('Sentry error code: ' + response.status);
            // It's called request only to keep compatibility with XHR interface
            // and not add more redundant checks in setBackoffState method
            error.request = response;
            opts.onError && opts.onError(error);
          }
        })
        ['catch'](function() {
          opts.onError &&
            opts.onError(new Error('Sentry error code: network unavailable'));
        });
    }

    var request = _window$2.XMLHttpRequest && new _window$2.XMLHttpRequest();
    if (!request) return;

    // if browser doesn't support CORS (e.g. IE7), we are out of luck
    var hasCORS = 'withCredentials' in request || typeof XDomainRequest !== 'undefined';

    if (!hasCORS) return;

    if ('withCredentials' in request) {
      request.onreadystatechange = function() {
        if (request.readyState !== 4) {
          return;
        } else if (request.status === 200) {
          opts.onSuccess && opts.onSuccess();
        } else if (opts.onError) {
          var err = new Error('Sentry error code: ' + request.status);
          err.request = request;
          opts.onError(err);
        }
      };
    } else {
      request = new XDomainRequest();
      // xdomainrequest cannot go http -> https (or vice versa),
      // so always use protocol relative
      url = url.replace(/^https?:/, '');

      // onreadystatechange not supported by XDomainRequest
      if (opts.onSuccess) {
        request.onload = opts.onSuccess;
      }
      if (opts.onError) {
        request.onerror = function() {
          var err = new Error('Sentry error code: XDomainRequest');
          err.request = request;
          opts.onError(err);
        };
      }
    }

    request.open('POST', url);

    if (evaluatedHeaders) {
      each$1(evaluatedHeaders, function(key, value) {
        request.setRequestHeader(key, value);
      });
    }

    request.send(stringify_1(opts.data));
  },

  _evaluateHash: function(hash) {
    var evaluated = {};

    for (var key in hash) {
      if (hash.hasOwnProperty(key)) {
        var value = hash[key];
        evaluated[key] = typeof value === 'function' ? value() : value;
      }
    }

    return evaluated;
  },

  _logDebug: function(level) {
    if (this._originalConsoleMethods[level] && this.debug) {
      // In IE<10 console methods do not have their own 'apply' method
      Function.prototype.apply.call(
        this._originalConsoleMethods[level],
        this._originalConsole,
        [].slice.call(arguments, 1)
      );
    }
  },

  _mergeContext: function(key, context) {
    if (isUndefined$1(context)) {
      delete this._globalContext[key];
    } else {
      this._globalContext[key] = objectMerge$1(this._globalContext[key] || {}, context);
    }
  }
};

// Deprecations
Raven.prototype.setUser = Raven.prototype.setUserContext;
Raven.prototype.setReleaseContext = Raven.prototype.setRelease;

var raven = Raven;

/**
 * Enforces a single instance of the Raven client, and the
 * main entry point for Raven. If you are a consumer of the
 * Raven library, you SHOULD load this file (vs raven.js).
 **/



// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
var _window$3 =
  typeof window !== 'undefined'
    ? window
    : typeof commonjsGlobal$$1 !== 'undefined' ? commonjsGlobal$$1 : typeof self !== 'undefined' ? self : {};
var _Raven = _window$3.Raven;

var Raven$1 = new raven();

/*
 * Allow multiple versions of Raven to be installed.
 * Strip Raven from the global context and returns the instance.
 *
 * @return {Raven}
 */
Raven$1.noConflict = function() {
  _window$3.Raven = _Raven;
  return Raven$1;
};

Raven$1.afterLoad();

var singleton = Raven$1;

/**
 * DISCLAIMER:
 *
 * Expose `Client` constructor for cases where user want to track multiple "sub-applications" in one larger app.
 * It's not meant to be used by a wide audience, so pleaaase make sure that you know what you're doing before using it.
 * Accidentally calling `install` multiple times, may result in an unexpected behavior that's very hard to debug.
 *
 * It's called `Client' to be in-line with Raven Node implementation.
 *
 * HOWTO:
 *
 * import Raven from 'raven-js';
 *
 * const someAppReporter = new Raven.Client();
 * const someOtherAppReporter = new Raven.Client();
 *
 * someAppReporter.config('__DSN__', {
 *   ...config goes here
 * });
 *
 * someOtherAppReporter.config('__OTHER_DSN__', {
 *   ...config goes here
 * });
 *
 * someAppReporter.captureMessage(...);
 * someAppReporter.captureException(...);
 * someAppReporter.captureBreadcrumb(...);
 *
 * someOtherAppReporter.captureMessage(...);
 * someOtherAppReporter.captureException(...);
 * someOtherAppReporter.captureBreadcrumb(...);
 *
 * It should "just work".
 */
var Client = raven;
singleton.Client = Client;

var RavenJS = /*#__PURE__*/Object.freeze({
    default: singleton,
    __moduleExports: singleton,
    Client: Client
});

// tslint:disable-next-line:no-implicit-dependencies
/** Casted raven instance with access to internal functions. */
// tslint:disable-next-line:variable-name
var Raven$2 = ((RavenJS || {}).default ||
    RavenJS);

/** Original raven send function. */
var sendRavenEvent = Raven$2._sendProcessedPayload.bind(Raven$2);
/** Normalizes the event so it is consistent with our domain interface. */
function normalizeRavenEvent(event) {
    var ex = (event.exception || {});
    if (ex && ex.values) {
        event.exception = ex.values;
    }
    return event;
}
/** Prepares an event so it can be send with raven-js. */
function prepareEventForRaven(event) {
    var ravenEvent = event;
    if (event.exception) {
        // tslint:disable-next-line:no-unsafe-any
        ravenEvent.exception = { values: event.exception };
    }
    return ravenEvent;
}
/** The Sentry Browser SDK Backend. */
var BrowserBackend = /** @class */ (function () {
    /** Creates a new browser backend instance. */
    function BrowserBackend(frontend) {
        this.frontend = frontend;
    }
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.install = function () {
        // We are only called by the frontend if the SDK is enabled and a valid DSN
        // has been configured. If no DSN is present, this indicates a programming
        // error.
        var dsn = this.frontend.getDSN();
        if (!dsn) {
            throw new core.SentryError('Invariant exception: install() must not be called when disabled');
        }
        Raven$2.config(dsn.toString(), this.frontend.getOptions()).install();
        // Hook into Raven's breadcrumb mechanism. This allows us to intercept both
        // breadcrumbs created internally by Raven and pass them to the Frontend
        // first, before actually capturing them.
        Raven$2.setBreadcrumbCallback(function (breadcrumb) {
            Shim.addBreadcrumb(breadcrumb);
            return false;
        });
        // Hook into Raven's internal event sending mechanism. This allows us to
        // pass events to the frontend, before they will be sent back here for
        // actual submission.
        Raven$2._sendProcessedPayload = function (event) {
            Shim.captureEvent(normalizeRavenEvent(event));
        };
        return true;
    };
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.eventFromException = function (exception) {
        return __awaiter(this, void 0, void 0, function () {
            var originalSend, event_1;
            return __generator(this, function (_a) {
                originalSend = Raven$2._sendProcessedPayload;
                try {
                    Raven$2._sendProcessedPayload = function (evt) {
                        event_1 = evt;
                    };
                    Raven$2.captureException(exception);
                    return [2 /*return*/, normalizeRavenEvent(event_1)];
                }
                finally {
                    Raven$2._sendProcessedPayload = originalSend;
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.eventFromMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var originalSend, event_2;
            return __generator(this, function (_a) {
                originalSend = Raven$2._sendProcessedPayload;
                try {
                    Raven$2._sendProcessedPayload = function (evt) {
                        event_2 = evt;
                    };
                    Raven$2.captureMessage(message);
                    return [2 /*return*/, normalizeRavenEvent(event_2)];
                }
                finally {
                    Raven$2._sendProcessedPayload = originalSend;
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.sendEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        sendRavenEvent(prepareEventForRaven(event), function (error) {
                            // TODO: Check the response status code
                            resolve(error ? 500 : 200);
                        });
                    })];
            });
        });
    };
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.storeBreadcrumb = function () {
        return true;
    };
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.storeContext = function () {
        return true;
    };
    return BrowserBackend;
}());

/**
 * The Sentry Browser SDK Frontend.
 *
 * @see BrowserOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
var BrowserFrontend = /** @class */ (function (_super) {
    __extends(BrowserFrontend, _super);
    /**
     * Creates a new Browser SDK instance.
     *
     * @param options Configuration options for this SDK.
     */
    function BrowserFrontend(options) {
        return _super.call(this, BrowserBackend, options) || this;
    }
    /**
     * @inheritDoc
     */
    BrowserFrontend.prototype.getSdkInfo = function () {
        return {
            name: 'sentry-browser',
            version: Raven$2.VERSION,
        };
    };
    /**
     * Instruments the given function and sends an event to Sentry every time the
     * function throws an exception.
     *
     * @param fn A function to wrap.
     * @returns The wrapped function.
     */
    // tslint:disable-next-line:ban-types
    BrowserFrontend.prototype.wrap = function (fn, options) {
        return Raven$2.wrap(options, fn);
    };
    return BrowserFrontend;
}(core.FrontendBase));

/**
 * The Sentry Browser SDK Client.
 *
 * To use this SDK, call the {@link init} function as early as possible when
 * loading the web page. To set context information or send manual events, use
 * the provided methods.
 *
 * @example
 * import { init } from '@sentry/browser';
 *
 * init({
 *   dsn: '__DSN__',
 *   // ...
 * });
 *
 * @example
 * import { setContext } from '@sentry/browser';
 * setContext({
 *   extra: { battery: 0.7 },
 *   tags: { user_mode: 'admin' },
 *   user: { id: '4711' },
 * });
 *
 * @example
 * import { addBreadcrumb } from '@sentry/browser';
 * addBreadcrumb({
 *   message: 'My Breadcrumb',
 *   // ...
 * });
 *
 * @example
 * import * as Sentry from '@sentry/browser';
 * Sentry.captureMessage('Hello, world!');
 * Sentry.captureException(new Error('Good bye'));
 * Sentry.captureEvent({
 *   message: 'Manual',
 *   stacktrace: [
 *     // ...
 *   ],
 * });
 *
 * @see BrowserOptions for documentation on configuration options.
 */
function init(options) {
    core.initAndBind(BrowserFrontend, options);
}
/** Returns the current BrowserFrontend, if any. */
function getCurrentFrontend() {
    return Shim.getCurrentClient();
}

exports.Severity = Shim.Severity;
exports.addBreadcrumb = Shim.addBreadcrumb;
exports.captureMessage = Shim.captureMessage;
exports.captureException = Shim.captureException;
exports.captureEvent = Shim.captureEvent;
exports.clearScope = Shim.clearScope;
exports.popScope = Shim.popScope;
exports.pushScope = Shim.pushScope;
exports.setUserContext = Shim.setUserContext;
exports.setTagsContext = Shim.setTagsContext;
exports.setExtraContext = Shim.setExtraContext;
exports.withScope = Shim.withScope;
exports.BrowserBackend = BrowserBackend;
exports.BrowserFrontend = BrowserFrontend;
exports.init = init;
exports.getCurrentFrontend = getCurrentFrontend;
});

var index$2 = unwrapExports(dist$4);
var dist_1$2 = dist$4.Severity;
var dist_2$2 = dist$4.addBreadcrumb;
var dist_3$2 = dist$4.captureMessage;
var dist_4$2 = dist$4.captureException;
var dist_5$2 = dist$4.captureEvent;
var dist_6$1 = dist$4.clearScope;
var dist_7$1 = dist$4.popScope;
var dist_8$1 = dist$4.pushScope;
var dist_9$1 = dist$4.setUserContext;
var dist_10$1 = dist$4.setTagsContext;
var dist_11$1 = dist$4.setExtraContext;
var dist_12$1 = dist$4.withScope;
var dist_13$1 = dist$4.BrowserBackend;
var dist_14$1 = dist$4.BrowserFrontend;
var dist_15$1 = dist$4.init;
var dist_16 = dist$4.getCurrentFrontend;

var dist$5 = /*#__PURE__*/Object.freeze({
	default: index$2,
	__moduleExports: dist$4,
	Severity: dist_1$2,
	addBreadcrumb: dist_2$2,
	captureMessage: dist_3$2,
	captureException: dist_4$2,
	captureEvent: dist_5$2,
	clearScope: dist_6$1,
	popScope: dist_7$1,
	pushScope: dist_8$1,
	setUserContext: dist_9$1,
	setTagsContext: dist_10$1,
	setExtraContext: dist_11$1,
	withScope: dist_12$1,
	BrowserBackend: dist_13$1,
	BrowserFrontend: dist_14$1,
	init: dist_15$1,
	getCurrentFrontend: dist_16
});

var normalize = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var PATH_STRIP_RE = /^.*\/[^\.]+(\.app|CodePush|.*(?=\/))/;
function normalizeUrl(url, pathStripRe) {
    return "app://" + url.replace(/^file\:\/\//, '').replace(pathStripRe, '');
}
exports.normalizeUrl = normalizeUrl;
function normalizeData(data) {
    if (data.culprit) {
        data.culprit = normalizeUrl(data.culprit, PATH_STRIP_RE);
    }
    var stacktrace = data.stacktrace || (data.exception && data.exception[0].stacktrace);
    if (stacktrace) {
        stacktrace.frames.forEach(function (frame) {
            if (frame.filename !== '[native code]') {
                frame.filename = normalizeUrl(frame.filename, PATH_STRIP_RE);
            }
        });
    }
    return data;
}
exports.normalizeData = normalizeData;

});

var normalize$1 = unwrapExports(normalize);
var normalize_1 = normalize.normalizeUrl;
var normalize_2 = normalize.normalizeData;

var normalize$2 = /*#__PURE__*/Object.freeze({
	default: normalize$1,
	__moduleExports: normalize,
	normalizeUrl: normalize_1,
	normalizeData: normalize_2
});

var browser_1 = ( dist$5 && index$2 ) || dist$5;

var normalize_1$1 = ( normalize$2 && normalize$1 ) || normalize$2;

var backend = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
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
var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });


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
                mergedEvent = __assign({}, normalize_1$1.normalizeData(event));
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

});

var backend$1 = unwrapExports(backend);
var backend_1 = backend.CordovaBackend;

var backend$2 = /*#__PURE__*/Object.freeze({
	default: backend$1,
	__moduleExports: backend,
	CordovaBackend: backend_1
});

var backend_1$1 = ( backend$2 && backend$1 ) || backend$2;

var frontend = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
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
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * The Sentry Cordova SDK Frontend.
 *
 * @see CordovaOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
var CordovaFrontend = /** @class */ (function (_super) {
    __extends(CordovaFrontend, _super);
    /**
     * Creates a new Cordova SDK instance.
     * @param options Configuration options for this SDK.
     */
    function CordovaFrontend(options) {
        return _super.call(this, backend_1$1.CordovaBackend, options) || this;
    }
    /**
     * @inheritDoc
     */
    CordovaFrontend.prototype.getSdkInfo = function () {
        return {
            name: 'sentry-cordova',
            version: '0.9.1',
        };
    };
    /**
     * @inheritDoc
     */
    CordovaFrontend.prototype.prepareEvent = function (event, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var prepared, release, extra;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareEvent.call(this, event, scope)];
                    case 1:
                        prepared = _a.sent();
                        release = window.SENTRY_RELEASE && window.SENTRY_RELEASE.id;
                        if (release && !prepared.release) {
                            extra = __assign({ __sentry_release: window.SENTRY_RELEASE.id }, prepared.extra);
                            prepared = __assign({ release: release }, prepared, { extra: extra });
                        }
                        return [2 /*return*/, prepared];
                }
            });
        });
    };
    return CordovaFrontend;
}(core.FrontendBase));
exports.CordovaFrontend = CordovaFrontend;

});

var frontend$1 = unwrapExports(frontend);
var frontend_1 = frontend.CordovaFrontend;

var frontend$2 = /*#__PURE__*/Object.freeze({
	default: frontend$1,
	__moduleExports: frontend,
	CordovaFrontend: frontend_1
});

var frontend_1$1 = ( frontend$2 && frontend$1 ) || frontend$2;

var sdk$6 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



var shim_2 = Shim;
exports.addBreadcrumb = shim_2.addBreadcrumb;
exports.captureEvent = shim_2.captureEvent;
exports.captureException = shim_2.captureException;
exports.captureMessage = shim_2.captureMessage;
exports.clearScope = shim_2.clearScope;
exports.popScope = shim_2.popScope;
exports.pushScope = shim_2.pushScope;
exports.setExtraContext = shim_2.setExtraContext;
exports.setTagsContext = shim_2.setTagsContext;
exports.setUserContext = shim_2.setUserContext;
function init(options) {
    core.initAndBind(frontend_1$1.CordovaFrontend, options);
}
exports.init = init;
function setRelease(release) {
    Shim.setExtraContext({ __sentry_release: release });
}
exports.setRelease = setRelease;
function setDist(dist) {
    Shim.setExtraContext({ __sentry_dist: dist });
}
exports.setDist = setDist;
function setVersion(version) {
    Shim.setExtraContext({ __sentry_version: version });
}
exports.setVersion = setVersion;

});

var sdk$7 = unwrapExports(sdk$6);
var sdk_1$4 = sdk$6.addBreadcrumb;
var sdk_2$2 = sdk$6.captureEvent;
var sdk_3$2 = sdk$6.captureException;
var sdk_4$2 = sdk$6.captureMessage;
var sdk_5$2 = sdk$6.clearScope;
var sdk_6$2 = sdk$6.popScope;
var sdk_7$2 = sdk$6.pushScope;
var sdk_8$2 = sdk$6.setExtraContext;
var sdk_9$1 = sdk$6.setTagsContext;
var sdk_10$1 = sdk$6.setUserContext;
var sdk_11$1 = sdk$6.init;
var sdk_12$1 = sdk$6.setRelease;
var sdk_13$1 = sdk$6.setDist;
var sdk_14$1 = sdk$6.setVersion;

var sdk$8 = /*#__PURE__*/Object.freeze({
	default: sdk$7,
	__moduleExports: sdk$6,
	addBreadcrumb: sdk_1$4,
	captureEvent: sdk_2$2,
	captureException: sdk_3$2,
	captureMessage: sdk_4$2,
	clearScope: sdk_5$2,
	popScope: sdk_6$2,
	pushScope: sdk_7$2,
	setExtraContext: sdk_8$2,
	setTagsContext: sdk_9$1,
	setUserContext: sdk_10$1,
	init: sdk_11$1,
	setRelease: sdk_12$1,
	setDist: sdk_13$1,
	setVersion: sdk_14$1
});

var sdk_1$5 = ( sdk$8 && sdk$7 ) || sdk$8;

var sentryCordova = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.CordovaFrontend = frontend_1$1.CordovaFrontend;

exports.addBreadcrumb = sdk_1$5.addBreadcrumb;
exports.captureEvent = sdk_1$5.captureEvent;
exports.captureException = sdk_1$5.captureException;
exports.captureMessage = sdk_1$5.captureMessage;
exports.init = sdk_1$5.init;
exports.popScope = sdk_1$5.popScope;
exports.pushScope = sdk_1$5.pushScope;
exports.setDist = sdk_1$5.setDist;
exports.setUserContext = sdk_1$5.setUserContext;
exports.setExtraContext = sdk_1$5.setExtraContext;
exports.setRelease = sdk_1$5.setRelease;
exports.setTagsContext = sdk_1$5.setTagsContext;
exports.setVersion = sdk_1$5.setVersion;

});

var sentryCordova$1 = unwrapExports(sentryCordova);
var sentryCordova_1 = sentryCordova.CordovaFrontend;
var sentryCordova_2 = sentryCordova.addBreadcrumb;
var sentryCordova_3 = sentryCordova.captureEvent;
var sentryCordova_4 = sentryCordova.captureException;
var sentryCordova_5 = sentryCordova.captureMessage;
var sentryCordova_6 = sentryCordova.init;
var sentryCordova_7 = sentryCordova.popScope;
var sentryCordova_8 = sentryCordova.pushScope;
var sentryCordova_9 = sentryCordova.setDist;
var sentryCordova_10 = sentryCordova.setUserContext;
var sentryCordova_11 = sentryCordova.setExtraContext;
var sentryCordova_12 = sentryCordova.setRelease;
var sentryCordova_13 = sentryCordova.setTagsContext;
var sentryCordova_14 = sentryCordova.setVersion;

exports.default = sentryCordova$1;
exports.CordovaFrontend = sentryCordova_1;
exports.addBreadcrumb = sentryCordova_2;
exports.captureEvent = sentryCordova_3;
exports.captureException = sentryCordova_4;
exports.captureMessage = sentryCordova_5;
exports.init = sentryCordova_6;
exports.popScope = sentryCordova_7;
exports.pushScope = sentryCordova_8;
exports.setDist = sentryCordova_9;
exports.setUserContext = sentryCordova_10;
exports.setExtraContext = sentryCordova_11;
exports.setRelease = sentryCordova_12;
exports.setTagsContext = sentryCordova_13;
exports.setVersion = sentryCordova_14;
