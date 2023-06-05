import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[zoom]',
})
export class ZoomDirective {
    constructor(private _el: ElementRef) {}

    @HostListener('mouseenter')
    onMouseEnter(): void {
        this.setFontSize(17);
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.setFontSize(16);
    }

    public setFontSize(size: number | string): void {
        this._el.nativeElement.style.fontSize = `${size}px`;
    }
}
