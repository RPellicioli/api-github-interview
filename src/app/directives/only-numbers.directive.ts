import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[onlyNumbers]'
})
export class OnlyNumbersDirective {
    constructor(private element: ElementRef<HTMLInputElement>) {
    }

    @HostListener('keydown', ['$event']) 
    public onKeyDown(event: KeyboardEvent) {
        if ([46, 8, 9, 27, 13, 110, 190, 109, 189, 173].some(n => n === event.keyCode) ||
            (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
            (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
            (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
            (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        }
        if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }
}
