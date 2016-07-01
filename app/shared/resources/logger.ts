import {Component} from '@angular/core';
import {Growl, Message} from 'primeng/primeng';

@Component({
    template: '<p-growl [value]="messages"></p-growl>',
    directives: [Growl]
})
export class Logger {
    
    messages: Message[] = [];

    /**
     * Log Info message
     * @method
     * @param {string} title - The message to print in console and/or show in notification widget
     * @param {string} message
     * @param {any} data - The data object to log into console
     * @param {any} source - The source object to log into console
     * @param {boolean} showToast - Show toast using kendo notification widget
    */
    logInfo(title: string, message: string, data: any = null, source: any = null, showToast: boolean = false): void {
        this.logIt(title, message, data, source, showToast, 'info');
    }

    /**
     * Log Error message
     * @method
     * @param {string} title - The message to print in console and/or show in notification widget
     * @param {string} message - The message to print in console and/or show in notification widget
     * @param {any} data - The data object to log into console
     * @param {any} source - The source object to log into console
     * @param {boolean} showToast - Show toast using kendo notification widget
    */
    logError(title: string, message: string, data: any = null, source: any = null, showToast: boolean = false): void {
        this.logIt(title, message, data, source, showToast, 'error');
    }

    /**
     * Log Success message
     * @method
     * @param {string} title - The message to print in console and/or show in notification widget
     * @param {string} message - The message to print in console and/or show in notification widget
     * @param {any} data - The data object to log into console
     * @param {any} source - The source object to log into console
     * @param {boolean} showToast - Show toast using kendo notification widget
    */
    logSuccess(title: string, message: string, data: any = null, source: any = null, showToast: boolean = false): void {
        this.logIt(title, message, data, source, showToast, 'info');
    }

    /**
     * Log Warning message
     * @method
     * @param {string} title - The message to print in console and/or show in notification widget
     * @param {string} message - The message to print in console and/or show in notification widget
     * @param {any} data - The data object to log into console
     * @param {any} source - The source object to log into console
     * @param {boolean} showToast - Show toast using kendo notification widget
    */
    logWarning(title: string, message: string, data: any = null, source: any = null, showToast: boolean = false): void {
        this.logIt(title, message, data, source, showToast, 'warn');
    }

    /**
     * Logs the message from the public methods
     * @method
     * @private
     * @param {string} title - The message to print in console and/or show in notification widget
     * @param {string} message - The message to print in console and/or show in notification widget
     * @param {any} data - The data object to log into console
     * @param {any} source - The source object to log into console
     * @param {boolean} showToast - Show toast using kendo notification widget
     * @param {string} toastType - The type of notification to show
    */
    private logIt(title: string, message: string, data: any, source: any, showToast: boolean, toastType: string): void {
        if (data) {
            if (window.console[toastType]) {
                window.console[toastType](message, source, data);
            } else {
                window.console.log(message, source, data);
            }
        } else {
            if (window.console[toastType]) {
                window.console[toastType](message, source);
            } else {
                window.console.log(message, source);
            }
        }
        if (showToast) {
            //this.messages = [{ severity: toastType, summary: title, detail: message }];
            this.messages.push({ severity: toastType, summary: title, detail: message });
        }
    }

}