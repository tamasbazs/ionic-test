import { CordovaOptions } from './backend';
export { addBreadcrumb, captureEvent, captureException, captureMessage, clearScope, popScope, pushScope, setExtraContext, setTagsContext, setUserContext } from '@sentry/shim';
export declare function init(options: CordovaOptions): void;
export declare function setRelease(release: string): void;
export declare function setDist(dist: string): void;
export declare function setVersion(version: string): void;
