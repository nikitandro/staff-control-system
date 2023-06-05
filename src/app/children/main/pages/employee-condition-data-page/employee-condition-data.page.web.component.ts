import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UpdateDataService } from '../../services/update-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DepartmentsService } from '../../data/services/departments.service';
import { EMPLOYEE_CONDITION_FORM_DATA_TOKEN } from '../../data/tokens/employee-condition-form.data.token';
import { IEmployeeConditionFormData } from '../../data/interfaces/employee-condition-form-data.interface';

@Component({
    selector: 'employee-condition-data',
    templateUrl: 'employee-condition-data.page.web.component.html',
    styleUrls: ['./styles/employee-condition-data.page.web.component.scss']
})
export class EmployeeConditionDataPageWebComponent implements OnInit, OnDestroy {
    public isPopupOpen: boolean = false;

    public employeeConditionCardData!: IEmployeeCardData;
    public loader: boolean = true;

    private _employeeId!: number;

    private _routeSubscription!: Subscription;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        private _route: ActivatedRoute,
        @Inject(EMPLOYEE_CONDITION_FORM_DATA_TOKEN) public employeeConditionFormData$: BehaviorSubject<IEmployeeConditionFormData>,
        private _updateDataService: UpdateDataService,
        private _departmentsService: DepartmentsService
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
                    salary: data.salary,
                    workFormat: data.workFormat
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
