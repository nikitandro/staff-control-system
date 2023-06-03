import { IEmployeeFormField } from './employee-form-field.interface';

export interface IEmployeeFormData {
    employeeFormFields: IEmployeeFormField[];
    photo?: string;
}
