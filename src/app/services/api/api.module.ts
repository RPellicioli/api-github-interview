import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { ApiUsersService } from './api-users.service';

@NgModule({
    imports: [
        HttpClientModule,
        HttpClientJsonpModule
    ],
    providers: [
        ApiUsersService
    ]
})
export class ApiModule { }