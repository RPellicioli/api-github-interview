import { Component, OnInit } from '@angular/core';
import { ApiUsersService } from 'app/services/api/api-users.service';

@Component({
    selector: 'repos',
    templateUrl: './repos.component.html',
    styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {

    constructor(
        private apiUsersService: ApiUsersService
    ) { }

    public async ngOnInit(): Promise<void> {
        const user = await this.apiUsersService.getUser("RPellicioli");

        console.log(user);
    }
}
