import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from "environments/environment";
import * as Sentry from "@sentry/browser";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    public handleError(error: any): void {
        if (environment.production && !GlobalErrorHandler.ignoreError(error)) {
            Sentry.captureException((error && error.originalError) || error);
            throw error;
        }

        console.error(error);
    }

    private static ignoreError(error: any): boolean {
        error = (error && error.originalError) || error;
        const msg =  error && error.message as string;
        if (msg) {
            if (msg.indexOf("'RdstationPopup' is undefined") > -1) {
                return true;
            }

            if (msg.indexOf("Socket server did not execute the callback for setAttributes with data") > -1) {
                return true;
            }
        }

        return false;
    }
}