import {SuccessStatus} from './SuccessStatus.interface';

export interface IFilters {
    selectedDepartments: number[];
    selectedPosts: number[];
    salary: [number, number];
    isFired: boolean;
    successStatus: SuccessStatus;
}
