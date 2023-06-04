import { IEmployeeAchievement } from '../interfaces/employee-achievement.interface';
import { IEmployeeVacation } from '../interfaces/employee-vacation.interface';
import { IEmployeeEducation } from '../interfaces/employee-education.interface';
import { ISalaryChange } from '../interfaces/salary-change.interface';
import { IEmployeeResponseModel } from '../response-models/employee.response-model.interface';

export class EmployeeModel {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public patronymic!: string;
    public birthDate!: string;
    public phoneNumber!: string;
    public workEmail!: string;
    public personalEmail!: string;
    public departmentName!: string;
    public post!: string;
    public workFormat!: string;
    public achievementsList!: IEmployeeAchievement[];
    public interviewDate!: Date | string;
    public employmentDate!: Date | string;
    public firstWorkDayDate!: Date | string;
    public departmentId!: string;
    public postId!: string;
    public salary!: number;
    public successRate!: string;
    public isFired!: boolean;
    public vacationsList!: IEmployeeVacation[];
    public salaryIncreaseList!: any[];
    public education!: IEmployeeEducation[];
    public salaryHistory!: ISalaryChange[];
    public firingDate!: string;

    public toDto(): any {

    }

    public fromDto(dto: IEmployeeResponseModel): void {
        //TODO: будет формировать объект для работы
    }
}
