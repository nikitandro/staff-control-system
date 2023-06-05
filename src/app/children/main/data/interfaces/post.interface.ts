import {IDropDownListOption} from '../../components/drop-down-list/drop-down-list.types';

export interface IPost extends IDropDownListOption {
    id: number;
    title: string;
    salaryCurrency: string;
    salaryLowest: number;
    salaryHighest: number;
    responsibilitiesDescription: string;
    departmentId: number;
}
