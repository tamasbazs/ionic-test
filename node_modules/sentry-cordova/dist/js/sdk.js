"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@sentry/core");
var frontend_1 = require("./frontend");
var shim_1 = require("@sentry/shim");
var shim_2 = require("@sentry/shim");
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
    core_1.initAndBind(frontend_1.CordovaFrontend, options);
}
exports.init = init;
function setRelease(release) {
    shim_1.setExtraContext({ __sentry_release: release });
}
exports.setRelease = setRelease;
function setDist(dist) {
    shim_1.setExtraContext({ __sentry_dist: dist });
}
exports.setDist = setDist;
function setVersion(version) {
    shim_1.setExtraContext({ __sentry_version: version });
}
exports.setVersion = setVersion;
//# sourceMappingURL=sdk.js.map