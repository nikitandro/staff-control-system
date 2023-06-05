import { IEmployeeEducation } from '../interfaces/employee-education.interface';
import { IEmployeeAchievement } from '../interfaces/employee-achievement.interface';
import { IEmployeeVacation } from '../interfaces/employee-vacation.interface';
import { ISalaryChange } from '../interfaces/salary-change.interface';
import { IEmployeeResponseModel } from '../response-models/employee.response-model.interface';

export interface IEmployeeRequestModel extends Partial<IEmployeeResponseModel> {
    id: number;
    avatarUrl: string | null;
    firstName: string;
    lastName: string;
    patronymic: string;
    birthDate: string;
    phoneNumber: string;
    workEmail: string;
    personalEmail: string;
    workFormat: string;
    achievements: IEmployeeAchievement[];
    interviewDate: string;
    employmentDate: string;
    firstWorkDayDate: string;
    departmentId: number;
    postId: number;
    salary: number;
    successRate: number;
    isFired: boolean;
    vacations: IEmployeeVacation[];
    education: IEmployeeEducation[];
    salaryHistory: ISalaryChange[];
    firingDate: string | null;
}
