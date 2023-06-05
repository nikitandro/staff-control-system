export type IDropDownListOptions = IDropDownListOption[];

export type IDropDownListInputOptions = {
    [name: string]: {
        title: string;
        isChecked?: boolean;
    }
}

export interface IDropDownListOption {
    id: number;
    title: string;
}
