import { FormControl } from '@angular/forms';
import { IDropDownListControlValue, IDropDownListProperties } from '../drop-down-list/drop-down-list.types';

export type ISelectedOptions = string[]

export interface ISalaryOption {
    from: number;
    to: number;
}

export interface IFilterFormControls {
    selectedDepartments: FormControl<IDropDownListProperties>;
    selectedPosts: FormControl<IDropDownListProperties>;
    salary: FormControl<ISalaryOption>;
    isFired: FormControl<boolean>;
    isSuccessful: FormControl<boolean | null>;
}
