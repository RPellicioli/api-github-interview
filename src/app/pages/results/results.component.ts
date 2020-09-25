import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListItemsComponent } from 'app/components/list-items/list-items.component';
import { Repository } from 'app/models/repository';
import { User } from 'app/models/user';
import { ApiSearchService } from 'app/services/api/api-search.service';
import { GlobalService } from 'app/services/global.service';
import { SearchService } from 'app/services/search.service';

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
        private router: ActivatedRoute
    ) {
        this.loadingUsers = true;
        this.loadingRepositories = true;
        
        this.router.queryParams.subscribe( async queryParams => {
            this.searchSerivce.query = queryParams['q'];

            const resUsers = await this.apiSearchService.getUsers(this.searchSerivce.query);
            this.users = resUsers.items;

            this.loadingUsers = false;
            
            const resRepositories = await this.apiSearchService.getRepositories(this.searchSerivce.query);
            this.repositories = resRepositories.items;

            this.loadingRepositories = false;     
        }); 
    }

    public ngOnInit(): void {
    }

}
