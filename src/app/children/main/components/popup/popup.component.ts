import { Component, Input } from '@angular/core';

@Component({
    selector: 'popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./styles/popup.component.scss']
})
export class PopupComponent {
    @Input()
    public isOpen: boolean = false;

    public close(): void {
        this.isOpen = false;
    }
}
