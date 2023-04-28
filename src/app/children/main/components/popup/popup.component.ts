import { Component, Input } from '@angular/core';
import { IEmployeePersonalData } from '../../data/interfaces/employee-personal-data.interface';

@Component({
    selector: 'popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./styles/popup.component.scss']
})
export class PopupComponent {
    @Input()
    public isOpen: boolean = false;

    @Input()
    public data!: IEmployeePersonalData;

    public close(isClose: boolean): void {
        this.isOpen = isClose;
    }
}
