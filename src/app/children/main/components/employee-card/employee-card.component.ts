import { Component, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';

@Component({
    selector: 'employee-card',
    templateUrl: 'employee-card.component.html',
    styleUrls: ['./styles/employee-card.component.scss'],
})
export class EmployeeCardComponent{
    @Output()
    public isEdit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    @Input()
    public isEditINP: boolean = false;

    @Input()
    public employeeCardData!: IEmployeeCardData;

    public edit(): void {
        this.isEdit$.next(!this.isEditINP);
    }

    public delete(): void {
        //TODO: реализовать удаление карточки
    }
}
