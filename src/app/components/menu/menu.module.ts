import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        RouterModule,
        MatIconModule
    ],
    exports: [
        MenuComponent
    ],
    declarations: [
        MenuComponent
    ]
})
export class MenuModule { }