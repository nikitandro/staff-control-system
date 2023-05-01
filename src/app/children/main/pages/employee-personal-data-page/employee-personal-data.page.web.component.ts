import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { IEmployeeData } from '../../data/interfaces/employee-data.interface';

@Component({
    selector: 'employee-personal-data',
    templateUrl: 'employee-personal-data.page.web.component.html',
    styleUrls: ['./styles/employee-personal-data.page.web.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeePersonalDataPageWebComponent {
    public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public employeePersonalData: IEmployeeData = {
        employeeFormFields: [
            {
                label: 'Фамилия',
                control: new FormControl('Иванов', Validators.required)
            },
            {
                label: 'Имя',
                control: new FormControl('Иван', Validators.required)
            },
            {
                label: 'Отчество',
                control: new FormControl('Иванович', Validators.required)
            },
            {
                label: 'Дата рождения',
                control: new FormControl(new Date('1943-01-19').toLocaleDateString(), Validators.required)
            }
        ],
        photo: 'ФОТОЧКА'
    };

    public open(): void {
        this.isOpen$.next(!this.isOpen$.getValue());
    }
}
