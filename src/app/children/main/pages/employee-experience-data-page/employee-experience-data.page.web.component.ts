import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { EMPLOYEE_FORM_DATA_TOKEN } from '../../data/tokens/employee-form-data.token';
import { BehaviorSubject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'employee-experience-data',
    templateUrl: 'employee-experience-data.page.web.component.html',
    styleUrls: ['./styles/employee-experience-data.page.web.component.scss'],
})
export class EmployeeExperienceDataPageWebComponent implements OnInit {
    public isPopupOpen: boolean = false;

    public employeeExperienceCardData!: IEmployeeCardData;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeeExperienceFormData$: BehaviorSubject<IEmployeeFormData>
    ) {
    }

    public ngOnInit(): void {
        this._employeeDataService.getEmployeeData(2)
            .subscribe((data: IEmployeeResponseModel) => {
                this.employeeExperienceCardData = {
                    title: 'Стаж работы',
                    employeeCardFields: [
                        {
                            label: 'Дата собеседования:',
                            data: new Date(data.interviewDate).toLocaleDateString()
                        },
                        {
                            label: 'Дата подтверждения оффера:',
                            data: new Date(data.employmentDate).toLocaleDateString()
                        },
                        {
                            label: 'Дата первого рабочего дня:',
                            data: new Date(data.firstWorkDayDate).toLocaleDateString()
                        },
                    ],
                    photo: 'user-img.png',
                    canEdit: true,
                    canDelete: false
                };

                this.employeeExperienceFormData$.next({
                    employeeFormFields: [
                        {
                            label: 'Дата собеседования:',
                            control: new FormControl(new Date(data.interviewDate).toLocaleDateString(), Validators.required)
                        },
                        {
                            label: 'Дата подтверждения оффера:',
                            control: new FormControl(new Date(data.employmentDate).toLocaleDateString(), Validators.required)
                        },
                        {
                            label: 'Дата первого рабочего дня:',
                            control: new FormControl(new Date(data.firstWorkDayDate).toLocaleDateString(), Validators.required)
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
