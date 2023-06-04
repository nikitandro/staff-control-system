import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export const EMPLOYEE_ADD_TOKEN: InjectionToken<Subject<boolean>> =
    new InjectionToken<Subject<boolean>>( 'this token is used when you need to collect data from the employee addition form');
