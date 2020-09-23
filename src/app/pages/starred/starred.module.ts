import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { StarredComponent } from './starred.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule.forChild([
            { path: '', component: StarredComponent }
        ])
    ],
    exports: [
        StarredComponent
    ],
    declarations: [
        StarredComponent
    ]
})
export class StarredModule { }