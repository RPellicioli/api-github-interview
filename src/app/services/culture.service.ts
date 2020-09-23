import { Injectable, EventEmitter } from '@angular/core'
import { CookiesUtils } from 'app/utils/cookies-utils';

@Injectable()
export class CultureService {

    public onCultureChanged = new EventEmitter<string>();

    constructor() {
        this._currentCulture = CookiesUtils.get('CurrentCulture');
        if (!this._currentCulture) {
            this._currentCulture = 'pt-BR';
        }
    }

    private _currentCulture: string;
    public get currentCulture(): string {
        return this._currentCulture;
    }

    public setCurrentCulture(culture: 'pt-BR' | 'en-US' | 'es-PY'): void {
        this._currentCulture = culture;
        CookiesUtils.set('CurrentCulture', culture);

        this.onCultureChanged.emit(culture);
    }
}