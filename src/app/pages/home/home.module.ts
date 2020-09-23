import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule.forChild([
            { path: '', component: HomeComponent }
        ])
    ],
    exports: [
        HomeComponent
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }