import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { EMPLOYEE_FORM_DATA_TOKEN } from '../../data/tokens/employee-form-data.token';
import { BehaviorSubject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'employee-condition-data',
    templateUrl: 'employee-condition-data.page.web.component.html',
    styleUrls: ['./styles/employee-condition-data.page.web.component.scss'],
})
export class EmployeeConditionDataPageWebComponent implements OnInit {
    public isPopupOpen: boolean = false;

    public employeeConditionCardData!: IEmployeeCardData;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeeConditionFormData$: BehaviorSubject<IEmployeeFormData>
    ) {
    }

    public ngOnInit(): void {
        this._employeeDataService.getEmployeeData(2)
            .subscribe((data: IEmployeeResponseModel) => {
                this.employeeConditionCardData = {
                    title: 'Условия работы',
                    employeeCardFields: [
                        {
                            label: 'Отдел:',
                            data: data.departmentName
                        },
                        {
                            label: 'Должность:',
                            data: data.post.title
                        },
                        {
                            label: 'Заработая плата (в рублях):',
                            data: data.salary
                        },
                        {
                            label: 'Формат работы:',
                            data: data.workFormat
                        },
                    ],
                    photo: 'user-img.png',
                    canEdit: true,
                    canDelete: false
                };

                this.employeeConditionFormData$.next({
                    employeeFormFields: [
                        {
                            label: 'Отдел:',
                            control: new FormControl(data.departmentName, Validators.required)
                        },
                        {
                            label: 'Должность:',
                            control: new FormControl(data.post, Validators.required)
                        },
                        {
                            label: 'Заработая плата (в рублях):',
                            control: new FormControl(data.salary, Validators.required)
                        },
                        {
                            label: 'Формат работы:',
                            control: new FormControl(data.workFormat, Validators.required)
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
