import { Component, Input } from '@angular/core';
import { IEmployeeData } from '../../data/interfaces/employee-data.interface';

@Component({
    selector: 'popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./styles/popup.component.scss']
})
export class PopupComponent {
    @Input()
    public isOpen: boolean = false;

    @Input()
    public employeeData!: IEmployeeData;

    public close(isClose: boolean): void {
        this.isOpen = isClose;
    }
}
