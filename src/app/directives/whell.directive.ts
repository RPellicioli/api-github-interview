import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[wheel]'
})
export class WhellDirective {
    @Output() mouseWheelUp = new EventEmitter();
    @Output() mouseWheelDown = new EventEmitter();
    
    constructor() { }

    @HostListener('wheel', ['$event']) Wheel(event: WheelEvent) {
        const delta = Math.max(-1, Math.min(1, (event.deltaY || -event.detail)));
        if(delta < 0) {
            this.mouseWheelUp.emit(event);
        } else if(delta > 0) {
            this.mouseWheelDown.emit(event);
        }
    }
}
