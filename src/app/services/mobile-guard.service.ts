import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { GlobalService } from './global.service';
import { WindowScrollService } from '../services/window-scroll.service';

@Injectable()
export class MobileGuardService implements CanActivate {

    constructor(private globalService: GlobalService, private windowScrollService: WindowScrollService) { }

    public canActivate(): boolean {
        return !this.windowScrollService.isViewMobile();
    }
}