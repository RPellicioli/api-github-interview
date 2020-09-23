import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { ReposComponent } from './repos.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule.forChild([
            { path: '', component: ReposComponent }
        ])
    ],
    exports: [
        ReposComponent
    ],
    declarations: [
        ReposComponent
    ]
})
export class ReposModule { }