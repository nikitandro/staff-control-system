import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { IEmployeePersonalData } from '../../data/interfaces/employee-personal-data.interface';

@Component({
    selector: 'employee-personal-data',
    templateUrl: 'employee-personal-data.page.web.component.html',
    styleUrls: ['./styles/employee-personal-data.page.web.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeePersonalDataPageWebComponent {
    public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public data: IEmployeePersonalData = {
        labels: [
            'Фамилия',
            'Имя',
            'Отчество',
            'Дата рождения'
        ],
        controls: [
            new FormControl('Иванов', Validators.required),
            new FormControl('Иван', Validators.required),
            new FormControl('Иванович', Validators.required),
            new FormControl(new Date('1943-01-19'), Validators.required),
        ],
        photo: 'ФОТОЧКА'
    };

    public open(): void {
        this.isOpen$.next(!this.isOpen$.getValue());
    }
}
