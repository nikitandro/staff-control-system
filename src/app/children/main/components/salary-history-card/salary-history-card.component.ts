import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ISalaryChange } from '../../data/interfaces/salary-change.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IEmployeeRequestModel } from '../../data/request-models/employee.request-model.interface';
import { switchMap } from 'rxjs';

@Component({
    selector: 'salary-history-card',
    templateUrl: 'salary-history-card.component.html',
    styleUrls: ['./styles/salary-history-card.component.scss']
})
export class SalaryHistoryCardComponent implements OnInit {
    public salaryHistoryData: ISalaryChange[] = [];
    public salaryChangeForm: FormGroup = new FormGroup({
        changeDate: new FormControl('', Validators.required),
        changeSalary: new FormControl('', Validators.required)
    });

    public showForm: boolean = false;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef
    ) {
    }

    public ngOnInit(): void {
        this.getSalaryHistoryData();
    }

    public getSalaryHistoryData(): void {
        this.salaryHistoryData = [];
        this._employeeDataService.getEmployeeData(2)
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

    public onSubmit(): void {
        this.showForm = false;
        const salaryChange: ISalaryChange = {
            salaryChangeId: 3,
            date: this.salaryChangeForm.value.changeDate,
            salary: this.salaryChangeForm.value.changeSalary
        };
        let updateEmployee!: IEmployeeRequestModel;
        this._employeeDataService.getEmployeeData(2)
            .pipe(
                switchMap((currentEmployeeData: IEmployeeResponseModel) => {
                    updateEmployee = currentEmployeeData;
                    updateEmployee.salaryHistory.push(salaryChange);

                    return this._employeeDataService.updateEmployeeData(2, updateEmployee);
                })
            ).subscribe(() => this.getSalaryHistoryData());
    }
}
