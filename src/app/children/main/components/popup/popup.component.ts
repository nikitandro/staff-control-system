import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEmployeeData } from '../../data/interfaces/employee-data.interface';

@Component({
    selector: 'popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./styles/popup.component.scss']
})
export class PopupComponent implements OnInit {
    @Input()
    public isOpenINP!: boolean;

    @Output()
    public isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    public employeeData!: IEmployeeData;

    public ngOnInit(): void {
        this.isOpen.emit(this.isOpenINP);
    }

    public close(event: any): void {
        if (typeof event === 'boolean') {
            this.isOpenINP = false;
            this.isOpen.emit(false);

            return;
        }
        if (event.target.id === 'popup-id') {
            this.isOpenINP = false;
            this.isOpen.emit(false);

            return;
        }
    }
}
