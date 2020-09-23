import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
    public darkMode: boolean;
    public supportsWebp: boolean;

    constructor() {
        this.darkMode = true;
    }

    private _init: Promise<void>;

    public init(): Promise<void> {
        if (this._init) {
            return this._init;
        }

        this._init = new Promise<void>(async resolve => {
            this.supportsWebp = await this.validateSupportsWebp();

            resolve();
        });

        return this._init;
    }

    public async validateSupportsWebp(): Promise<boolean> {
        if (!self.createImageBitmap) return false;
        
        const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
        const blob = await fetch(webpData).then(r => r.blob());
        return createImageBitmap(blob).then(() => true, () => false);
    }
}