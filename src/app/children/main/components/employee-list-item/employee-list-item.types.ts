import { Input } from '@angular/core';

export interface IEmployeeInfo {
    firstname?: string;
    lastname?: string;
    patronymic?: string;
    avatarUrl?: string;
    department?: string;
    post?: string;
    salary?: string;
    successStatus?: EmployeeSuccessStatus;
}

export enum EmployeeSuccessStatus {
    Success = 'success',
    Failure = 'failure',
    NotStated = 'not-stated'
}
