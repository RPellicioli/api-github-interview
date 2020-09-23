import { Injectable } from "@angular/core";

@Injectable()
export class WindowScrollService {
    public window: any;
    public content: HTMLDivElement;
    public isViewScrolling = false;
    public routerTransitionsMade = 0;
    public keepScrollPosition = false;
    public currentScrollOffsetTop = 0;

    public get windowWidth(): number {
        return this.getCssMetricStringToNumber("width");
    }

    public get windowHeight(): number {
        return this.getCssMetricStringToNumber("height");
    }

    public get contentWidth(): number {
        if (this.content) {
            const rect = this.content.getBoundingClientRect();
            if (rect) {
                return rect.width;
            }
        }
        return 0;
    }

    constructor() { }

    private windowComputedStyle(): CSSStyleDeclaration {
        if (window && this.window) {
            return window.getComputedStyle(this.window, "");
        }
        return null;
    }

    public isViewMobile(): boolean {
        return this.windowWidth <= 768;
    }

    public isViewIpad(): boolean {
        return this.windowWidth <= 960;
    }

    private getCssMetricStringToNumber(property: string, unit?: string): number {
        const computedStyle = this.windowComputedStyle();
        if (computedStyle) {
            const computedStyleProp = computedStyle.getPropertyValue(property);
            if (computedStyleProp) {
                return Number(computedStyleProp.replace(unit ? unit : "px", ""));
            }
        }

        return 0;
    }

    public scrollTo(scrollPosition: number): void {
        try {
            if (this.window) {
                this.window.scrollTop = scrollPosition;
            }
        } catch (ex) {
            console.log(ex);
        }
    }
}
