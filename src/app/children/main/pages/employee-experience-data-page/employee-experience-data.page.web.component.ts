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
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeeExperienceFormData$: BehaviorSubject<IEmployeeFormData>,
        private _updateDataService: UpdateDataService
    ) {
        this._updateDataService.invokeEvent.subscribe((value: boolean) => {
            if (value) {
                this.getExperienceData();
            }
        });
    }

    public ngOnInit(): void {
        this.getExperienceData();
    }

    public getExperienceData(): void {
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
                            control: new FormControl(data.interviewDate, Validators.required)
                        },
                        {
                            label: 'Дата подтверждения оффера:',
                            control: new FormControl(data.employmentDate, Validators.required)
                        },
                        {
                            label: 'Дата первого рабочего дня:',
                            control: new FormControl(data.firstWorkDayDate, Validators.required)
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
