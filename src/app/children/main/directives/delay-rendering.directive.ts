import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[delayRendering]'
})
export class DelayRenderingDirective {
    constructor(
        private _templateRef: TemplateRef<any>,
        private _containerRef: ViewContainerRef
    ) {

    }

    @Input()
    public set delayRendering(delayTime: number) {
        setTimeout(() => {
            this._containerRef.createEmbeddedView(this._templateRef);
        }, delayTime);
    }
}
