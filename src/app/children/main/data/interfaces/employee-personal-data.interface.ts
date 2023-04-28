import { FormControl } from '@angular/forms';

export interface IEmployeePersonalData {
    labels: string[],
    controls: FormControl[],
    photo?: string
}
