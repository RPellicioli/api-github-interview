import { Injectable } from '@angular/core';
import { ApiBase } from './api-base';

@Injectable()
export class ApiReposService extends ApiBase {
    protected routePath: string = "repos";

    public getRepos(): Promise<any> {
        return super.get<any>("");
    }
}
export namespace ApiReposService {

}