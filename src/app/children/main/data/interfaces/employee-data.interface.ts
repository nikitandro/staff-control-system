import { IEmployeeFormFieldInterface } from './employee-form-field.interface';

export interface IEmployeeData {
    employeeFormFields: IEmployeeFormFieldInterface[],
    photo?: string
}
