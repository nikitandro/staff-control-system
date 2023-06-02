import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { IEmployeeEducation } from '../../data/interfaces/employee-education.interface';
import { IEmployeeRequestModel } from '../../data/request-models/employee.request-model.interface';
import { IEmployeeVacation } from '../../data/interfaces/employee-vacation.interface';
import { IEmployeeAchievement } from '../../data/interfaces/employee-achievement.interface';

@Component({
    selector: 'employee-card',
    templateUrl: 'employee-card.component.html',
    styleUrls: ['./styles/employee-card.component.scss'],
})
export class EmployeeCardComponent{
    @Output()
    public isEdit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    @Output()
    public emitUpdateDataMethod: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    public isEditINP: boolean = false;

    @Input()
    public employeeCardData!: IEmployeeCardData;

    constructor(
        private _employeeDataService: EmployeeDataService
    ) {
    }

    public edit(): void {
        this.isEdit$.next(!this.isEditINP);
    }

    public callUpdateDataMethod(): void {
        this.emitUpdateDataMethod.emit(true);
    }

    public delete(id: number | undefined): void {
        let employee!: IEmployeeRequestModel;
        this._employeeDataService.getEmployeeData(2)
            .pipe(
                switchMap((data: IEmployeeResponseModel) => {
                    employee = data;
                    if (this.employeeCardData.title === 'Образование') {
                        employee.education = employee.education.filter((education: IEmployeeEducation) => {
                            return education.educationId !== id;
                        });
                    } else if (this.employeeCardData.title === 'Отпуска сотрудника') {
                        employee.vacationsList = employee.vacationsList.filter((vacation: IEmployeeVacation) => {
                            return vacation.vacationId !== id;
                        });
                    } else if (this.employeeCardData.title === 'Достижения сотрудника') {
                        employee.achievementsList = employee.achievementsList.filter((achievement: IEmployeeAchievement) => {
                            return achievement.achievementId !== id;
                        });
                    }

                    return this._employeeDataService.updateEmployeeData(2, employee);
                })
            ).subscribe(() => this.callUpdateDataMethod());
    }
}
