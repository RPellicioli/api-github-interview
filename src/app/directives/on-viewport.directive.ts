import { Directive, ElementRef, HostBinding, Input } from "@angular/core";
import { WindowScrollService } from "../services/window-scroll.service";

@Directive({
    selector: "[onViewport]"
})
export class OnViewportDirective {
    @Input() initialClasses: string[] = [];
    protected _elementClass: string[] = [];
    public currentScroll = null;

    @HostBinding("class")
    get elementClass(): string {
        this.initialClasses.forEach(iClass => {
            if (this._elementClass.indexOf(iClass) < 0) {
                this._elementClass.push(iClass);
            }
        });
        return this._elementClass.join(" ");
    }

    constructor(
        private el: ElementRef,
        private windowScrollService: WindowScrollService
    ) {
        this.isAnyPartOfElementInViewport();
    }

    @Input("currentScroll")
    set updateCurrentScroll(value: any) {
        if (
            this.isAnyPartOfElementInViewport() &&
            this._elementClass.indexOf("scroll-transition") < 0
        ) {
            this._elementClass.push("scroll-transition");
        }
    }

    private isAnyPartOfElementInViewport(): boolean {
        if (this.el && this.el.nativeElement && this.el.nativeElement.getBoundingClientRect) {
            const rect = this.el.nativeElement.getBoundingClientRect();
            const vertInView = rect.top <= this.windowScrollService.windowHeight && rect.top + rect.height >= 0;
            const horInView = rect.left <= this.windowScrollService.windowWidth && rect.left + rect.width >= 0;
            return vertInView && horInView;
        }
        return false;
    }
}