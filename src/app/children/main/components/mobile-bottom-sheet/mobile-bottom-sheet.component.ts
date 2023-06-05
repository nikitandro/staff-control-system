import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Subject, timer } from 'rxjs';


@Component({
    selector: 'mobile-bottom-sheet',
    styleUrls: ['./styles/mobile-bottom-sheet.component.scss'],
    templateUrl: './mobile-bottom-sheet.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileBottomSheetComponent {

    @ViewChild('sheet')
    private sheetElementRef?: ElementRef<HTMLDivElement>;
    public isDragged: boolean = false;
    public currentY: number | null = null;
    public startClientY: number | null = null;
    public startTopPosition: number | null = null;
    public isOpen: boolean = false;
    public isChangingState$: Subject<boolean> = new Subject<boolean>();

    public getStyles() {
        if (this.isDragged) {
            return {top: this.currentY! + 'px'};
        }
        if (this.isOpen) {
            return {top: '-5%'};
        } else {
            return {};
        }
    }

    public onTouchMove(event: TouchEvent) {
        if (event.changedTouches[0].clientY >= 0) {
            const newY = event.changedTouches[0].clientY - Math.abs(this.startClientY! - this.startTopPosition!);
            if (this.isOpen && newY > 0) {
                this.currentY = newY;
            } else if (!this.isOpen) {
                this.currentY = newY;
            }
        }
    }

    public onTouchStart(event: TouchEvent) {
        event.preventDefault();
        this.startClientY = event.changedTouches[0].clientY;
        this.startTopPosition = this.sheetElementRef?.nativeElement.offsetTop!;
        this.currentY = event.changedTouches[0].clientY - Math.abs(this.startClientY! - this.startTopPosition!);
        this.isDragged = true;
    }

    public onTouchEnd(event: TouchEvent) {
        if (!this.isOpen) {
            if (this.currentY! / window.innerHeight < 0.8) {
                this.isOpen = true;
            }
        } else {
            if (this.currentY! / window.innerHeight > 0.15) {
                this.isOpen = false;
            }
        }
        this.isChangingState$.next(true);
        timer(500)
            .subscribe(() => {
                this.isChangingState$.next(false);
            });
        if (!this.isOpen) {
            this.currentY = null;
        }

        this.startTopPosition = null;
        this.isDragged = false;
    }

    public passFormTouches(event: TouchEvent) {
        event.stopPropagation();
    }

    public stopPropagation(event: MouseEvent) {
        event.stopPropagation();
    }
}
