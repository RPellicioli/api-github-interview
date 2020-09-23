import { Component, OnInit } from '@angular/core';
import { ApiUsersService } from 'app/services/api/api-users.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private apiUsersService: ApiUsersService
    ) { }

    public async ngOnInit(): Promise<void> {
        const user = await this.apiUsersService.getUser("RPellicioli");

        console.log(user);
    }
}
