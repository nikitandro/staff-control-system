import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'employee-personal-data',
    templateUrl: 'employee-personal-data.page.web.component.html',
    styleUrls: ['./styles/employee-personal-data.page.web.component.scss'],
})
export class EmployeePersonalDataPageWebComponent implements OnInit {
    public isPopupOpen: boolean = false;

    public canAdd: boolean = true;
    public addTitle: string = 'Добавить образование';

    public employeePersonalCardData!: IEmployeeCardData;
    public employeePersonalFormData!: IEmployeeFormData;

    constructor(private _employeeDataService: EmployeeDataService, private _ref: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this._employeeDataService.getEmployeeData(2)
            .subscribe((data: IEmployeeResponseModel) => {
                this.employeePersonalCardData = {
                    title: 'Личная информация:',
                    employeeCardFields: [
                        {
                            label: 'Фамилия:',
                            data: data.lastName
                        },
                        {
                            label: 'Имя:',
                            data: data.firstName
                        },
                        {
                            label: 'Отчество:',
                            data: data.patronymic
                        },
                        {
                            label: 'Дата рождения:',
                            data: new Date(data.birthDate).toLocaleDateString()
                        }
                    ],
                    canEdit: true,
                    canDelete: true
                };

                this.employeePersonalFormData = {
                    employeeFormFields: [
                        {
                            label: 'Фамилия',
                            control: new FormControl(data.lastName, Validators.required)
                        },
                        {
                            label: 'Имя',
                            control: new FormControl(data.firstName, Validators.required)
                        },
                        {
                            label: 'Отчество',
                            control: new FormControl(data.patronymic, Validators.required)
                        },
                        {
                            label: 'Дата рождения',
                            control: new FormControl(new Date(data.birthDate).toLocaleDateString(), Validators.required)
                        }
                    ]
                };

                this._ref.detectChanges();
            });
    }

    public open(isEdit: boolean): void {
        this.isPopupOpen = isEdit;
    }

    public close(isOpen: boolean): void {
        this.isPopupOpen = isOpen;
    }

    public add(): void {

    }
}
