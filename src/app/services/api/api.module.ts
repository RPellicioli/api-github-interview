import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { ApiReposService } from './api-respos.service';

@NgModule({
    imports: [
        HttpClientModule,
        HttpClientJsonpModule
    ],
    providers: [
        ApiReposService
    ]
})
export class ApiModule { }