import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { ListItemsModule } from 'app/components/list-items/list-items.module';
import { LoadingModule } from 'app/components/loading/loading.module';
import { UserComponent } from './user.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        ListItemsModule,
        TranslateModule,
        LoadingModule,
        MatIconModule,
        RouterModule.forChild([
            { path: '', component: UserComponent }
        ])
    ],
    exports: [
        UserComponent
    ],
    declarations: [
        UserComponent
    ]
})
export class UserModule { }