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
    selector: 'employee-contacts-data',
    templateUrl: 'employee-contacts-data.page.web.component.html',
    styleUrls: ['./styles/employee-contacts-data.page.web.component.scss'],
})
export class EmployeeContactsDataPageWebComponent implements OnInit, OnDestroy {
    public isPopupOpen: boolean = false;

    public employeeContactsCardData!: IEmployeeCardData;
    public loader: boolean = true;

    private _employeeId!: number;

    private _routeSubscription!: Subscription;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        private _route: ActivatedRoute,
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
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._employeeId = params['employeeId'];
        });

        this.getContactsData();
    }

    public ngOnDestroy(): void {
        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
    }

    public getContactsData(): void {
        this._employeeDataService.getEmployeeData(this._employeeId)
            .subscribe((data: IEmployeeResponseModel) => {
                this.employeeContactsCardData = {
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
                    canEdit: true,
                    canDelete: false
                };

                this.employeeContactsFormData$.next({
                    employeeFormFields: [
                        {
                            label: 'Номер телефона:',
                            control: new FormControl(data.phoneNumber, [
                                Validators.required
                            ]),
                            controlType: 'tel'
                        },
                        {
                            label: 'Рабочая почта:',
                            control: new FormControl(data.workEmail, [
                                Validators.required,
                                Validators.email
                            ]),
                            controlType: 'email'
                        },
                        {
                            label: 'Личная почта:',
                            control: new FormControl(data.personalEmail, [
                                Validators.required,
                                Validators.email
                            ]),
                            controlType: 'email'
                        },
                    ]
                });
                this.loader = false;
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
