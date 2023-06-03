import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IEmployeeResponseModel} from '../response-models/employee.response-model.interface';
import {FilterService} from './filter.service';
import {IFilters} from '../interfaces/filters.interface';
import {SuccessStatus} from '../interfaces/SuccessStatus.interface';
import {BehaviorSubject, Subject, combineLatest} from 'rxjs';

@Injectable()
export class EmployeeService {
    public employeeList$: BehaviorSubject<IEmployeeResponseModel[]> = new BehaviorSubject<IEmployeeResponseModel[]>([]);
    public limit$: Subject<number> = new Subject<number>();
    public page$: Subject<number> = new Subject<number>();

    constructor(private _http: HttpClient, private filterService: FilterService) {
        combineLatest(filterService.filters$, this.limit$, this.page$).subscribe((value) => {
            this.updateEmployeeList(...value)
        });
    }

    public updateEmployeeList(filters: IFilters, limit?: number, page?: number) {
        let query: string = 'http://localhost:3000/employees?_expand=department&_expand=post';
        if (limit !== undefined) {
            query += `&_limit=${limit}`;
        }
        if (page !== undefined) {
            query += `&_page=${page}`
        }
        this.getFilteredEmployeeList(query, filters);
    }

    public getFilteredEmployeeList(query:string, filters: IFilters) {
        if (filters.selectedDepartments.length > 0) {
            filters.selectedDepartments.forEach((value, index) => {
                query += `departmentId=${value}&`;
            });
        }
        if (filters.selectedPosts.length > 0) {
            filters.selectedPosts.forEach((value) => {
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
        query += `salary_gte=${filters.salary[0]}&salary_lte${filters.salary[1]}`;
        this._http.get<IEmployeeResponseModel[]>(query).subscribe(this.employeeList$);
    }
}
