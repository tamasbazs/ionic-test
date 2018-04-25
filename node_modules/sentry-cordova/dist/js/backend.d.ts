import { Breadcrumb, Context, SentryEvent } from '@sentry/shim';
import { Backend, Frontend } from '@sentry/core';
import { BrowserOptions } from '@sentry/browser';
/**
 * Configuration options for the Sentry Cordova SDK.
 * @see CordovaFrontend for more information.
 */
export interface CordovaOptions extends BrowserOptions {
    autoBreadcrumbs?: boolean;
    instrument?: boolean;
}
/** The Sentry Cordova SDK Backend. */
export declare class CordovaBackend implements Backend {
    /** Handle to the SDK frontend for callbacks. */
    private readonly frontend;
    private browserBackend;
    private deviceReadyCallback;
    /** Creates a new cordova backend instance. */
    constructor(frontend: Frontend<CordovaOptions>);
    /**
     * @inheritDoc
     */
    install(): boolean;
    /**
     * @inheritDoc
     */
    eventFromException(exception: any): Promise<SentryEvent>;
    /**
     * @inheritDoc
     */
    eventFromMessage(message: string): Promise<SentryEvent>;
    /**
     * @inheritDoc
     */
    sendEvent(event: SentryEvent): Promise<number>;
    nativeCall(action: string, ...args: any[]): Promise<any>;
    private runNativeInstall();
    private isCordova();
    /**
     * @inheritDoc
     */
    storeBreadcrumb(breadcrumb: Breadcrumb): boolean;
    /**
     * @inheritDoc
     */
    storeContext(context: Context): boolean;
}
