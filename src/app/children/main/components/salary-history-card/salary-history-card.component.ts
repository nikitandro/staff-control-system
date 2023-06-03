import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ISalaryChange } from '../../data/interfaces/salary-change.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IEmployeeRequestModel } from '../../data/request-models/employee.request-model.interface';
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'salary-history-card',
    templateUrl: 'salary-history-card.component.html',
    styleUrls: ['./styles/salary-history-card.component.scss']
})
export class SalaryHistoryCardComponent implements OnInit, OnDestroy {
    public salaryHistoryData: ISalaryChange[] = [];
    public salaryChangeForm: FormGroup = new FormGroup({
        changeDate: new FormControl('', Validators.required),
        changeSalary: new FormControl('', Validators.required)
    });

    public showForm: boolean = false;

    private _employeeId!: number;

    private _routeSubscription!: Subscription;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        private _route: ActivatedRoute
    ) {
    }

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._employeeId = params['employeeId'];
        });

        this.getSalaryHistoryData();
    }

    public ngOnDestroy(): void {
        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
    }

    public getSalaryHistoryData(): void {
        this.salaryHistoryData = [];
        this._employeeDataService.getEmployeeData(this._employeeId)
            .subscribe((data: IEmployeeResponseModel) => {
                data.salaryHistory.forEach((salaryChange: ISalaryChange) => {
                    this.salaryHistoryData.push(
                        {
                            salaryChangeId: salaryChange.salaryChangeId,
                            date: salaryChange.date,
                            salary: salaryChange.salary
                        }
                    );
                });
            });

        this._ref.detectChanges();
    }

    public add(): void {
        this.showForm = true;
    }

    public cancel(): void {
        this.showForm = false;
    }

    public onSubmit(): void {
        this.showForm = false;
        const salaryChange: ISalaryChange = {
            salaryChangeId: Date.now(),
            date: this.salaryChangeForm.value.changeDate,
            salary: this.salaryChangeForm.value.changeSalary
        };
        let updateEmployee!: IEmployeeRequestModel;
        this._employeeDataService.getEmployeeData(this._employeeId)
            .pipe(
                switchMap((currentEmployeeData: IEmployeeResponseModel) => {
                    updateEmployee = currentEmployeeData;
                    updateEmployee.salaryHistory.push(salaryChange);

                    return this._employeeDataService.updateEmployeeData(this._employeeId, updateEmployee);
                })
            ).subscribe(() => this.getSalaryHistoryData());
    }
}
