import { Injectable } from '@angular/core';
import { ApiBase } from './api-base';

@Injectable()
export class ApiUsersService extends ApiBase {
    protected routePath: string = "users";

    public getUser(user: string): Promise<any> {
        return super.get<any>(`${user}`);
    }

    public getRepos(user: string): Promise<any> {
        return super.get<any>(`${user}/repos`);
    }

    public getStarred(user: string, owner: string, repo: string): Promise<any> {
        return super.get<any>(`${user}/starred/${owner}/${repo}`);
    }
}