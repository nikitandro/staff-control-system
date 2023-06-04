import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { EMPLOYEE_FORM_DATA_TOKEN } from '../../data/tokens/employee-form-data.token';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { UpdateDataService } from '../../services/update-data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'employee-personal-data',
    templateUrl: 'employee-personal-data.page.web.component.html',
    styleUrls: ['./styles/employee-personal-data.page.web.component.scss'],
})
export class EmployeePersonalDataPageWebComponent implements OnInit, OnDestroy {
    public isPopupOpen: boolean = false;

    public employeePersonalCardData!: IEmployeeCardData;

    private _employeeId!: number;

    private _routeSubscription!: Subscription;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        private _route: ActivatedRoute,
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeePersonalFormData$: BehaviorSubject<IEmployeeFormData>,
        private _updateDataService: UpdateDataService
    ) {
        this._updateDataService.invokeEvent.subscribe((value: boolean) => {
            if (value) {
                this.getPersonalData();
            }
        });
    }

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._employeeId = params['employeeId'];
        });

        this.getPersonalData();
    }

    public ngOnDestroy(): void {
        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
    }

    public getPersonalData(): void {
        this._employeeDataService.getEmployeeData(2)
            .subscribe((data: IEmployeeResponseModel) => {
                this.employeePersonalCardData = {
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
                    photo: 'user-img.png',
                    canEdit: true,
                    canDelete: false
                };

                this.employeePersonalFormData$.next({
                    employeeFormFields: [
                        {
                            label: 'Фамилия:',
                            control: new FormControl(data.lastName, [
                                Validators.required
                            ]),
                            controlType: 'text'
                        },
                        {
                            label: 'Имя:',
                            control: new FormControl(data.firstName, [
                                Validators.required
                            ]),
                            controlType: 'text'
                        },
                        {
                            label: 'Отчество:',
                            control: new FormControl(data.patronymic, [
                                Validators.required
                            ]),
                            controlType: 'text'
                        },
                        {
                            label: 'Дата рождения:',
                            control: new FormControl(data.birthDate, [
                                Validators.required
                            ]),
                            controlType: 'date'
                        }
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
