import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { ResultsComponent } from './results.component';
import { ListItemsModule } from 'app/components/list-items/list-items.module';
import { LoadingModule } from 'app/components/loading/loading.module';

@NgModule({
    imports: [
        CommonModule,
        ListItemsModule,
        TranslateModule,
        LoadingModule,
        RouterModule.forChild([
            { path: '', component: ResultsComponent }
        ])
    ],
    exports: [
        ResultsComponent
    ],
    declarations: [
        ResultsComponent
    ]
})
export class ResultsModule { }