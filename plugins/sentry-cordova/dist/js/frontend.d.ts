import { SdkInfo, SentryEvent } from '@sentry/shim';
import { FrontendBase, Scope } from '@sentry/core';
import { CordovaBackend, CordovaOptions } from './backend';
/**
 * The Sentry Cordova SDK Frontend.
 *
 * @see CordovaOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
export declare class CordovaFrontend extends FrontendBase<CordovaBackend, CordovaOptions> {
    /**
     * Creates a new Cordova SDK instance.
     * @param options Configuration options for this SDK.
     */
    constructor(options: CordovaOptions);
    /**
     * @inheritDoc
     */
    protected getSdkInfo(): SdkInfo;
    /**
     * @inheritDoc
     */
    protected prepareEvent(event: SentryEvent, scope: Scope): Promise<SentryEvent>;
}
