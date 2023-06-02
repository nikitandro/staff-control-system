import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { EMPLOYEE_FORM_DATA_TOKEN } from '../../data/tokens/employee-form-data.token';
import { BehaviorSubject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { UpdateDataService } from '../../services/update-data.service';

@Component({
    selector: 'employee-contacts-data',
    templateUrl: 'employee-contacts-data.page.web.component.html',
    styleUrls: ['./styles/employee-contacts-data.page.web.component.scss'],
})
export class EmployeeContactsDataPageWebComponent implements OnInit {
    public isPopupOpen: boolean = false;

    public employeeContactsCardData!: IEmployeeCardData;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeeContactsFormData$: BehaviorSubject<IEmployeeFormData>,
        private _updateDataService: UpdateDataService
    ) {
        this._updateDataService.invokeEvent.subscribe((value: boolean) => {
            if (value) {
                this.getContactsData();
            }
        });
    }

    public ngOnInit(): void {
        this.getContactsData();
    }

    public getContactsData(): void {
        this._employeeDataService.getEmployeeData(2)
            .subscribe((data: IEmployeeResponseModel) => {
                this.employeeContactsCardData = {
                    title: 'Контакты',
                    employeeCardFields: [
                        {
                            label: 'Номер телефона:',
                            data: data.phoneNumber
                        },
                        {
                            label: 'Рабочая почта:',
                            data: data.workEmail
                        },
                        {
                            label: 'Личная почта:',
                            data: data.personalEmail
                        },
                    ],
                    photo: 'user-img.png',
                    canEdit: true,
                    canDelete: false
                };

                this.employeeContactsFormData$.next({
                    employeeFormFields: [
                        {
                            label: 'Номер телефона:',
                            control: new FormControl(data.phoneNumber, Validators.required)
                        },
                        {
                            label: 'Рабочая почта:',
                            control: new FormControl(data.workEmail, Validators.required)
                        },
                        {
                            label: 'Личная почта:',
                            control: new FormControl(data.personalEmail, Validators.required)
                        },
                    ]
                });
                this._ref.detectChanges();
            });
    }

    public open(isEdit: boolean): void {
        this.isPopupOpen = isEdit;
    }

    public close(isOpen: boolean): void {
        this.isPopupOpen = isOpen;
    }
}
