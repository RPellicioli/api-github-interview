import { Injectable } from '@angular/core';
import { ApiBase } from './api-base';

@Injectable()
export class ApiSearchService extends ApiBase {
    protected routePath: string = "search";

    public getUsers(q: string): Promise<any> {
        return super.get<any>(`users?q=${q}`);
    }

    public getRepositories(q: string): Promise<any> {
        return super.get<any>(`repositories?q=${q}`);
    }
}