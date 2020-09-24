import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiSearchService } from 'app/services/api/api-search.service';
import { GlobalService } from 'app/services/global.service';
import { SearchService } from 'app/services/search.service';

@Component({
    selector: 'results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    public users: any[];
    public repositories: any[];

    constructor(
        public globalService: GlobalService,
        public searchSerivce: SearchService,
        public apiSearchService: ApiSearchService,
        private router: ActivatedRoute,
    ) {
        this.router.queryParams.subscribe( async queryParams => {
            this.searchSerivce.query = queryParams['q'];

            const resUsers = await this.apiSearchService.getUsers(this.searchSerivce.query);
            this.users = resUsers.items;
            
            const resRepositories = await this.apiSearchService.getRepositories(this.searchSerivce.query);
            this.repositories = resRepositories.items;

            console.log(this.users); 
            console.log(this.repositories);           
        }); 
    }

    public ngOnInit(): void {
    }

}
