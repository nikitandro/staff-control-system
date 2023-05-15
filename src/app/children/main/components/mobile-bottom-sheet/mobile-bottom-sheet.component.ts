import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'mobile-bottom-sheet',
    styleUrls: ['./styles/mobile-bottom-sheet.component.scss'],
    templateUrl: './mobile-bottom-sheet.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileBottomSheetComponent implements AfterViewInit {

    @ViewChild('sheet')
    private sheetElementRef?: ElementRef<HTMLDivElement>;
    private currentY: number = 0;

    public ngAfterViewInit() {
        if (!this.sheetElementRef) {
            return;
        }
        this.currentY = this.sheetElementRef?.nativeElement.clientTop;
    }

    public moveY(dragEvent: DragEvent) {
        console.log(dragEvent);
    }

    public onTouchStart(event: TouchEvent) {
        event.preventDefault();

    }
}
