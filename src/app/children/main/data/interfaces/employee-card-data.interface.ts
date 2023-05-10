import { IEmployeeCardField } from './employee-card-field.interface';

export interface IEmployeeCardData {
    title: string,
    employeeCardFields: IEmployeeCardField[],
    photo?: string,
    canEdit: boolean,
    canDelete: boolean
}