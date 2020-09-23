import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { ApiUsersService } from './api-users.service';
import { ApiSearchService } from './api-search.service';

@NgModule({
    imports: [
        HttpClientModule,
        HttpClientJsonpModule
    ],
    providers: [
        ApiUsersService,
        ApiSearchService
    ]
})
export class ApiModule { }