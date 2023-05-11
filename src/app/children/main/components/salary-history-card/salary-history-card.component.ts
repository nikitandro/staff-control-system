import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ISalaryChange } from '../../data/interfaces/salary-change.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';

@Component({
    selector: 'salary-history-card',
    templateUrl: 'salary-history-card.component.html',
    styleUrls: ['./styles/salary-history-card.component.scss']
})
export class SalaryHistoryCardComponent implements OnInit {
    public salaryHistoryData: ISalaryChange[] = [];

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef
    ) {
    }

    public ngOnInit(): void {
        this._employeeDataService.getEmployeeData(2)
            .subscribe((data: IEmployeeResponseModel) => {
                data.salaryHistory.forEach((salaryChange: ISalaryChange) => {
                    this.salaryHistoryData.push(
                        {
                            date: salaryChange.date,
                            salary: salaryChange.salary
                        }
                    );
                });
            });

        this._ref.detectChanges();
    }

    public add(): void {
        //TODO: реализлвать добавление изменений в историю з/п
    }
}
