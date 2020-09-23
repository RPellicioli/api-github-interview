import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        MatIconModule,
        MatSlideToggleModule
    ],
    exports: [
        HeaderComponent
    ],
    declarations: [
        HeaderComponent
    ]
})
export class HeaderModule { }