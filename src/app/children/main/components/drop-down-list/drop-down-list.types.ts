import { ICheckboxModel } from '../checkbox/checkbox.types';

export type IDropDownListProperties = IDropDownListProperty[]

export  interface  IDropDownListProperty extends ICheckboxModel{
    name: string;
    title: string,
    isChecked: boolean
}

export interface IDropDownListControlValue {
    title: string;
    selectedProperties: IDropDownListProperties;
}
