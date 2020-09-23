import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OnViewportDirective } from './on-viewport.directive';
import { WhellDirective } from './whell.directive';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { TextareaLimitedDirective } from './textarea-limited.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        OnViewportDirective,
        WhellDirective,
        OnlyNumbersDirective,
        TextareaLimitedDirective
    ], 
    exports: [
        OnViewportDirective,
        WhellDirective,
        OnlyNumbersDirective,
        TextareaLimitedDirective
    ]
})
export class DirectivesModule { }