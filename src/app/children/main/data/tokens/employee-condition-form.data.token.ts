import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEmployeeConditionFormData } from '../interfaces/employee-condition-form-data.interface';

export const EMPLOYEE_CONDITION_FORM_DATA_TOKEN: InjectionToken<BehaviorSubject<IEmployeeConditionFormData | null>> =
    new InjectionToken<BehaviorSubject<IEmployeeConditionFormData | null>>( 'the token that is used to set employee condition data in the form');
