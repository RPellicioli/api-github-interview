import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { ModalComponent } from "./modal.component";

@NgModule({
    imports: [
          CommonModule,
          BrowserAnimationsModule
    ],
    exports: [
          ModalComponent
    ],
    declarations: [
          ModalComponent
    ]
})
export class ModalModule { }