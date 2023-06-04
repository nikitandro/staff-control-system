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
    selector: 'employee-condition-data',
    templateUrl: 'employee-condition-data.page.web.component.html',
    styleUrls: ['./styles/employee-condition-data.page.web.component.scss'],
})
export class EmployeeConditionDataPageWebComponent implements OnInit, OnDestroy {
    public isPopupOpen: boolean = false;

    public employeeConditionCardData!: IEmployeeCardData;

    private _employeeId!: number;

    private _routeSubscription!: Subscription;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        private _route: ActivatedRoute,
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeeConditionFormData$: BehaviorSubject<IEmployeeFormData>,
        private _updateDataService: UpdateDataService
    ) {
        this._updateDataService.invokeEvent.subscribe((value: boolean) => {
            if (value) {
                this.getConditionData();
            }
        });
    }

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._employeeId = params['employeeId'];
        });

        this.getConditionData();
    }

    public ngOnDestroy(): void {
        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
    }

    public getConditionData(): void {
        this._employeeDataService.getEmployeeData(this._employeeId)
            .subscribe((data: IEmployeeResponseModel) => {
                this.employeeConditionCardData = {
                    employeeCardFields: [
                        {
                            label: 'Отдел:',
                            data: data.department.title
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
                    canEdit: true,
                    canDelete: false
                };

                this.employeeConditionFormData$.next({
                    employeeFormFields: [
                        {
                            label: 'Отдел:',
                            control: new FormControl(data.department.title, [
                                Validators.required
                            ]),
                            controlType: 'text'
                        },
                        {
                            label: 'Должность:',
                            control: new FormControl(data.post, [
                                Validators.required
                            ]),
                            controlType: 'text'
                        },
                        {
                            label: 'Заработая плата (в рублях):',
                            control: new FormControl(data.salary, [
                                Validators.required
                            ]),
                            controlType: 'number'
                        },
                        {
                            label: 'Формат работы:',
                            control: new FormControl(data.workFormat, [
                                Validators.required
                            ]),
                            controlType: 'text'
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
