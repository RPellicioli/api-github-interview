import { Injectable } from '@angular/core';
import { ApiBase } from './api-base';

@Injectable()
export class ApiSearchService extends ApiBase {
    protected routePath: string = "search";

    public getUsers(query: string): Promise<any> {
        return super.get<any>(`users?q=${query}`);
    }
}