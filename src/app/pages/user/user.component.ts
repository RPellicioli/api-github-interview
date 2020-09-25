import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListItemsComponent } from 'app/components/list-items/list-items.component';
import { Repository } from 'app/models/repository';
import { User } from 'app/models/user';
import { ApiUsersService } from 'app/services/api/api-users.service';
import { GlobalService } from 'app/services/global.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public userName: string;
    public user: User;
    public loadingRepositories: boolean;
    public types = ListItemsComponent.Type;
    public repositories: Repository[];

    constructor(
        public globalService: GlobalService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private apiUsersService: ApiUsersService
    ) { 
        this.activatedRoute.params.subscribe( async params => {
            this.userName = params['userName'];

            if(!this.userName){
                this.router.navigate(['/']);
            }
            else{
                this.loadingRepositories = true;

                this.user = await this.apiUsersService.getUser(this.userName);
                this.repositories = await this.apiUsersService.getRepos(this.userName);

                this.loadingRepositories = false;
            }
        });
    }

    public ngOnInit(): void {
    }

}
