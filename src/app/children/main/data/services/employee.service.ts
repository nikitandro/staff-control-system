import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployeeResponseModel } from '../response-models/employee.response-model.interface';
import { FilterService } from './filter.service';
import { IFilters } from '../interfaces/filters.interface';
import { SuccessStatus } from '../interfaces/SuccessStatus.interface';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Injectable()
export class EmployeeService {

    public employeeList$: BehaviorSubject<IEmployeeResponseModel[]> = new BehaviorSubject<IEmployeeResponseModel[]>([]);

    public limit: number = 10;

    public page$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

    constructor(private _http: HttpClient, private _filterService: FilterService) {
        _filterService.filters$.subscribe((value: IFilters ) => {
            this.page$.next(1);
        });
        this.page$.pipe(debounceTime(300)).subscribe((value: number) => {
            this.updateEmployeeList(this._filterService.filters$.value, this.limit, value);
        });
    }

    public updateEmployeeList(filters: IFilters, limit?: number, page?: number): void {
        let query: string = 'http://localhost:3000/employees?_expand=department&_expand=post&';
        if (limit !== undefined && page !== undefined) {
            query += `_limit=${limit * page}&`;
        }
        if (page !== undefined) {
            query += `_page=1&`;
        }
        this.getFilteredEmployeeList(query, filters);
    }

    public getFilteredEmployeeList(query: string, filters: IFilters): void {
        if (filters.selectedDepartments.length > 0) {
            filters.selectedDepartments.forEach((value: number) => {
                query += `departmentId=${value}&`;
            });
        }
        if (filters.selectedPosts.length > 0) {
            filters.selectedPosts.forEach((value: number) => {
                query += `postId=${value}&`;
            });
        }
        switch (filters.successStatus) {
            case SuccessStatus.Successful:
                query += 'successRate_gte=1&';
                break;
            case SuccessStatus.Unsuccessful:
                query += 'successRate_lte=-1&';
                break;
            case SuccessStatus.Zero:
                query += 'successRate=0&';
                break;
        }
        query += `isFired=${filters.isFired}&`;
        query += `salary_gte=${filters.salary[0]}&salary_lte=${filters.salary[1]}`;
        this._http.get<IEmployeeResponseModel[]>(query).subscribe((value: IEmployeeResponseModel[]) => {
            if (value.length !== this.employeeList$.value.length) {
                this.employeeList$.next(value);
            }
        });
    }
}
