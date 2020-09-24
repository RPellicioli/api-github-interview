import { Component, OnInit } from '@angular/core';
import { ApiSearchService } from 'app/services/api/api-search.service';
import { ApiUsersService } from 'app/services/api/api-users.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private apiUsersService: ApiUsersService,
        private apiSearchService: ApiSearchService
    ) { }

    public async ngOnInit(): Promise<void> {
        const user = await this.apiSearchService.getUsers("RPelli");
    }
}
