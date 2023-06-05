import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { EMPLOYEE_FORM_DATA_TOKEN } from '../../data/tokens/employee-form-data.token';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { FormControl, Validators } from '@angular/forms';
import { IEmployeeVacation } from '../../data/interfaces/employee-vacation.interface';
import { UpdateDataService } from '../../services/update-data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'employee-vacation-data',
    templateUrl: 'employee-vacation-data.page.web.component.html',
    styleUrls: ['./styles/employee-vacation-data.page.web.component.scss'],
})
export class EmployeeVacationDataPageWebComponent implements OnInit, OnDestroy {
    public isPopupOpen: boolean = false;

    public canAdd: boolean = true;
    public addTitle: string = 'Добавить отпуск';

    public employeeVacationCardDataList: IEmployeeCardData[] = [];

<<<<<<< HEAD
    public loader: boolean = true;
=======
    private _employeeId!: number;

    private _routeSubscription!: Subscription;
>>>>>>> nikitandro

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        private _route: ActivatedRoute,
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeeVacationFormData$: BehaviorSubject<IEmployeeFormData>,
        private _updateDataService: UpdateDataService
    ) {
        this._updateDataService.invokeEvent.subscribe((value: boolean) => {
            if (value) {
                this.getVacationList();
            }
        });
    }

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._employeeId = params['employeeId'];
        });

        this.getVacationList();
    }

    public ngOnDestroy(): void {
        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
    }

    public getVacationList(): void {
        this.employeeVacationCardDataList = [];
        this._employeeDataService.getEmployeeData(2)
            .subscribe((data: IEmployeeResponseModel) => {
                data.vacations.forEach((vacation: IEmployeeVacation) => {
                    this.employeeVacationCardDataList.push(
                        {
                            id: vacation.vacationId,
                            employeeCardFields: [
                                {
                                    label: 'Вид:',
                                    data: vacation.type
                                },
                                {
                                    label: 'Дата начала:',
                                    data: new Date(vacation.startDate).toLocaleDateString()
                                },
                                {
                                    label: 'Дата окончая:',
                                    data: new Date(vacation.endDate).toLocaleDateString()
                                },
                            ],
                            canEdit: false,
                            canDelete: true
                        }
                    );
                });

                this.employeeVacationFormData$.next({
                    employeeFormFields: [
                        {
                            label: 'Вид:',
                            control: new FormControl('', [
                                Validators.required
                            ]),
                            controlType: 'text'
                        },
                        {
                            label: 'Дата начала:',
                            control: new FormControl('', [
                                Validators.required
                            ]),
                            controlType: 'date'
                        },
                        {
                            label: 'Дата окончая:',
                            control: new FormControl('', [
                                Validators.required
                            ]),
                            controlType: 'date'
                        },
                    ]
                });
                this.loader = false;
                this._ref.detectChanges();
            });
    }

    public open(): void {
        this.isPopupOpen = !this.isPopupOpen;
    }

    public close(isOpen: boolean): void {
        this.isPopupOpen = isOpen;
    }

    public add(): void {
        this.open();
    }
}
