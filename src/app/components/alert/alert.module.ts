import { ModalModule } from "../modal/modal.module";
import { AlertComponent } from "./alert.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertService } from "./alert.service";

@NgModule({
    imports: [
        CommonModule,
        ModalModule,
    ],
    declarations: [
        AlertComponent,
    ],
    entryComponents: [
        AlertComponent
    ],
    providers: [
        AlertService
    ]
})
export class AlertModule {
}