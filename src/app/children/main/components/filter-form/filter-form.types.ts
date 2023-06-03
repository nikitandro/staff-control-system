import {FormControl} from '@angular/forms';
import {
    IDropDownListOptions
} from '../drop-down-list/drop-down-list.types';

export type ISelectedOptions = string[]

export interface ISalaryOption {
    from: number;
    to: number;
}

export interface IFilterFormControls {
    selectedDepartments: FormControl<IDropDownListOptions>;
    selectedPosts: FormControl<IDropDownListOptions>;
    salary: FormControl<[number, number]>;
    isFired: FormControl<boolean>;
    isSuccessful: FormControl<boolean | null>;
}

export interface IFilterFormOptions {
    departments: IDropDownListOptions;
    posts: IDropDownListOptions;
    salaryBounds: [number, number];
    isFired: boolean;
    successStatus: boolean | null;
}
