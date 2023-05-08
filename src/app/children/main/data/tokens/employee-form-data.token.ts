import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEmployeeFormData } from '../interfaces/employee-form-data.interface';

export const EMPLOYEE_FORM_DATA_TOKEN: InjectionToken<BehaviorSubject<IEmployeeFormData | null>> =
    new InjectionToken<BehaviorSubject<IEmployeeFormData | null>>( 'какая-то строка');
