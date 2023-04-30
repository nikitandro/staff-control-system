import { FormControl } from '@angular/forms';

export type IDropDownListOptionsFormGroup = { [name: string]: FormControl<IDropDownListOption> }

export type IDropDownListOptions = {
    [name: string]: IDropDownListOption;
};

export type IDropDownListInputOptions = {
    [name: string]: {
        title: string;
        isChecked?: boolean;
    }
}

export interface IDropDownListOption {
    name: string;
    title: string;
    isChecked: boolean;
}

export interface IDropDownListControlValue {
    title: string;
    selectedProperties: IDropDownListOptionsFormGroup;
}
