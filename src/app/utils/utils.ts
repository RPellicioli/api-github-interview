import { BehaviorSubject } from "rxjs";
import { KeyValue } from "@angular/common";

declare class URLSearchParams {
    /** Constructor returning a URLSearchParams object. */
    constructor(init?: string| URLSearchParams);

    /**Appends a specified key/value pair as a new search parameter. */
    append(name: string, value: string): void

    /** Deletes the given search parameter, and its associated value, from the list of all search parameters. */
    delete(name: string): void; 

    /** Returns an iterator allowing to go through all key/value pairs contained in this object. */
    entries(): IterableIterator<[string, string]>;

    /** Returns the first value associated to the given search parameter. */
    get(name: string): string;

    /** Returns all the values association with a given search parameter. */
    getAll(name: string): string[];

    /** Returns a Boolean indicating if such a search parameter exists. */
    has(name: string): boolean;

    /** Returns an iterator allowing to go through all keys of the key/value pairs contained in this object. */
    keys(): IterableIterator<string>;

    /** Sets the value associated to a given search parameter to the given value. If there were several values, delete the others. */
    set(name: string, value: string): void;

    /** Returns a string containg a query string suitable for use in a URL. */
    toString(): string;

    /** Returns an iterator allowing to go through all values of the key/ value pairs contained in this object. */
    values(): IterableIterator<string>;

     /** Iterator */
    [Symbol.iterator](): IterableIterator<number>;
}

export class Utils {
    public static listenAnimationsEndEvent = (object: any): BehaviorSubject<AnimationEvent> => {
        const observable = new BehaviorSubject<AnimationEvent>(null);
        object.addEventListener('webkitAnimationEnd', (event) => { observable.next(event); });
        object.addEventListener('mozAnimationEnd', (event) => { observable.next(event); });
        object.addEventListener('oAnimationEnd', (event) => { observable.next(event); });
        object.addEventListener('oanimationend', (event) => { observable.next(event); });
        object.addEventListener('animationend', (event) => { observable.next(event); });
        return observable;
    }

    public static listenTransitionsEndEvent = (object: any): BehaviorSubject<TransitionEvent> => {
        const observable = new BehaviorSubject<TransitionEvent>(null);
        object.addEventListener('webkitTransitionEnd', (event) => { observable.next(event); });
        object.addEventListener('mozTransitionEnd', (event) => { observable.next(event); });
        object.addEventListener('oTransitionEnd', (event) => { observable.next(event); });
        object.addEventListener('otransitionend', (event) => { observable.next(event); });
        object.addEventListener('transitionend', (event) => { observable.next(event); });
        return observable;
    }

    public static formatNumberToRealMoney(number: number, symbol?: string): string {
        if (number) {
            const formatted = number.toFixed(2).split('.');
            formatted[0] = `${symbol ? symbol : 'R$'} ${formatted[0].split(/(?=(?:...)*$)/).join('.')}`;
            return formatted.join(',');
        } else {
            if (symbol) {
                return `${symbol} 0,00`;
            }
            return 'R$ 0,00';
        }
    }

    public static objectToURIParams(obj: any, paramName?: string, prefix?: string): string {
        let params: string = '';
        if (Utils.attrIsBasic(obj)) {
            params = Utils.getAttrParam(paramName || 'param', obj || '');
        } else if (Array.isArray(obj)) {
            const arrayName: string = Object.keys(obj)[0];
            for (var i = 0; i < obj.length; i++) {
                params += Utils.objectToURIParams(obj[i], '', `${paramName || arrayName}[${i}]`);
            }
        } else if (typeof obj === 'object') {
            for (let key of Object.keys(obj)) {
                if (Array.isArray(obj[key])) {
                    params += Utils.objectToURIParams(obj[key], key, '');
                } else {
                    params += Utils.getAttrParam(key || 'param', obj[key] || '', prefix);
                }
            }
        }
        return params;
    }

    public static attrIsBasic(obj: any): boolean {
         return (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || obj instanceof Date);
    }

    public static getAttrParam(key: string, obj: any, prefix?: string): string {
        return `&${prefix ? `${prefix}.` : ''}${key}=${obj.toString()}`;
    }

    public static zeroIfNull(value: number): number {
        if (!value) {
            return 0;
        }

        return value;
    }

    public static getUrlVars(param: string) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(param);
    }

    public static originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
        return 0;
    }
}