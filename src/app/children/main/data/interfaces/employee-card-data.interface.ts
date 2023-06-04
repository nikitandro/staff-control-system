import { IEmployeeCardField } from './employee-card-field.interface';

export interface IEmployeeCardData {
    id?: number;
    employeeCardFields: IEmployeeCardField[];
    photo?: string;
    canEdit: boolean;
    canDelete: boolean;
}
