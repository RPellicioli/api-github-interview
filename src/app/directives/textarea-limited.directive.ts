import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[textareaLimited]'
})
export class TextareaLimitedDirective {
    @Input() public maxCharsPerLine: number = 20;
    @Input() public maxLines: number = 3;

    constructor(private element: ElementRef<HTMLInputElement>) {
    }

    private splitValueIntoLines(): Array<string> {
        return this.element.nativeElement.value.split(/\n/);
    }

    private isPasteWithKeyboard(event: KeyboardEvent): boolean {
        const ctrlDown = event.ctrlKey || event.metaKey;

        if (ctrlDown && event.altKey) {
            return false;
        }

        return (ctrlDown && event.keyCode === 86);
    }

    private validatedKeys(event: KeyboardEvent): boolean {
        const lines = this.splitValueIntoLines();
        const isEnter = event.keyCode === 13;
        const isBackSpaceOrDelete = [8, 46].includes(event.keyCode);
        const isShiftOrCtrlOrArrows = [16, 17, 37, 38, 39, 40].includes(event.keyCode);

        if ((lines.length === this.maxLines && isEnter) ||
            (!isBackSpaceOrDelete && !isShiftOrCtrlOrArrows && (lines.length === this.maxLines && lines[lines.length - 1].length === this.maxCharsPerLine))) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }

        return !this.isPasteWithKeyboard(event);
    }

    private updateValue(event: KeyboardEvent): void {
        setTimeout(() => {
            const lines = this.splitValueIntoLines();
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].length <= this.maxCharsPerLine) {
                    continue;
                }

                let x = 0;
                let space = this.maxCharsPerLine;
                while (x++ <= this.maxCharsPerLine) {
                    if (lines[i].charAt(x) === ' ') {
                        space = x;
                    }
                }

                lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] || '');
                lines[i] = lines[i].substring(0, space);
            }

            const start = this.element.nativeElement.selectionStart;
            const end = this.element.nativeElement.selectionEnd;
            this.element.nativeElement.value = lines.slice(0, this.maxLines).join('\n');

            this.element.nativeElement.setSelectionRange(start, end);
        });
    }

    private pasting: boolean = false;
    @HostListener('keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent) {
        if (!this.validatedKeys(event) && !this.pasting) {
            return;
        } else {
            this.updateValue(event);
        }
    }

    @HostListener('paste', ['$event'])
    public onPaste(event: Event) {
        this.pasting = true;
        this.updateValue(null);

        setTimeout(() => {
            this.pasting = false;
        }, 100);
    }
}
