import {IEmployeeEducation} from '../interfaces/employee-education.interface';
import {IEmployeeAchievement} from '../interfaces/employee-achievement.interface';
import {IEmployeeVacation} from '../interfaces/employee-vacation.interface';
import {ISalaryChange} from '../interfaces/salary-change.interface';
import {IDepartment} from '../interfaces/department.interface';
import {IPost} from '../interfaces/post.interface';

export interface IEmployeeResponseModel {
    id: number;
    avatarUrl: string | null;
    firstName: string;
    lastName: string;
    patronymic: string;
    birthDate: string;
    phoneNumber: string;
    workEmail: string;
    personalEmail: string;
    departmentName: string;
    post: IPost;
    workFormat: string;
    achievements: IEmployeeAchievement[];
    interviewDate: string;
    employmentDate: string;
    firstWorkDayDate: string;
    departmentId: string;
    postId: string;
    salary: number;
    successRate: string;
    isFired: boolean;
    vacations: IEmployeeVacation[];
    education: IEmployeeEducation[];
    salaryHistory: ISalaryChange[];
    firingDate: string;
    department: IDepartment;
}
