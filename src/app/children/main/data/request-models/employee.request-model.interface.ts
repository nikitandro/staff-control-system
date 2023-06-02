import { IEmployeeEducation } from '../interfaces/employee-education.interface';
import { IEmployeeAchievement } from '../interfaces/employee-achievement.interface';
import { IEmployeeVacation } from '../interfaces/employee-vacation.interface';
import { ISalaryChange } from '../interfaces/salary-change.interface';

export interface IEmployeeRequestModel {
    id: number,
    firstName: string,
    lastName: string,
    patronymic: string,
    birthDate: string,
    phoneNumber: string,
    workEmail: string,
    personalEmail: string,
    departmentName: string,
    post: string,
    workFormat: string,
    achievementsList: IEmployeeAchievement[],
    interviewDate: Date | string,
    employmentDate: Date | string,
    firstWorkDayDate: Date | string,
    departmentId: string,
    postId: string,
    salary: number,
    successRate: string,
    isFired: boolean,
    vacationsList: IEmployeeVacation[],
    salaryIncreaseList: any[],
    education: IEmployeeEducation[],
    salaryHistory: ISalaryChange[]
    firingDate: string
}
