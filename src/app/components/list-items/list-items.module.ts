import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ListItemsComponent } from './list-items.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule
    ],
    exports: [
        ListItemsComponent
    ],
    declarations: [
        ListItemsComponent
    ]
})
export class ListItemsModule { }