import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ListItemsComponent } from 'app/components/list-items/list-items.component';
import { Repository } from 'app/models/repository';
import { User } from 'app/models/user';
import { ApiSearchService } from 'app/services/api/api-search.service';
import { GlobalService } from 'app/services/global.service';
import { SearchService } from 'app/services/search.service';
import { SEOService } from 'app/services/seo.service';

@Component({
    selector: 'results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    public loadingUsers: boolean;
    public loadingRepositories: boolean;
    public types = ListItemsComponent.Type;
    public users: User[];
    public repositories: Repository[];

    constructor(
        public globalService: GlobalService,
        public searchSerivce: SearchService,
        public apiSearchService: ApiSearchService,
        private router: ActivatedRoute,
        private translateService: TranslateService,
        private seoService: SEOService
    ) {       
        this.seoService.updateSEO(this.translateService.instant('URLs.Results.Description'), '', '', window.location.origin, true);

        this.router.queryParams.subscribe( async queryParams => {
            this.searchSerivce.query = queryParams['q'];

            this.getUsers(this.searchSerivce.query);
            this.getRepositories(this.searchSerivce.query);
        }); 
    }

    public ngOnInit(): void {
    }

    public async getUsers(query: string): Promise<void> {
        this.loadingUsers = true;

        try{
            const resUsers = await this.apiSearchService.getUsers(query);
            this.users = resUsers.items;

            this.loadingUsers = false;
        }
        catch(e){
            this.loadingUsers = false;
            alert("Erro ao buscar usuários");
        }        
    }

    public async getRepositories(query: string): Promise<void> {
        this.loadingRepositories = true;

        try{
            const resRepositories = await this.apiSearchService.getRepositories(query);
            this.repositories = resRepositories.items;

            this.loadingRepositories = false;
        }
        catch(e){
            this.loadingRepositories = false;
            alert("Erro ao buscar repositórios");
        }
    }
}
