import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IEmployeeResponseModel} from '../response-models/employee.response-model.interface';
import {BehaviorSubject, combineLatest, map, Subject,} from 'rxjs';
import {IFilters} from '../interfaces/filters.interface';
import {tap} from 'rxjs/operators';
import {apiUrl} from '../api/api';
import {SuccessStatus} from '../interfaces/SuccessStatus.interface';

@Injectable()
export class FilterService {

    public selectedDepartments$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    public selectedPosts$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    public salary$: BehaviorSubject<[number, number]> = new BehaviorSubject<[number, number]>([0, 0]);
    public isFired$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public successStatus$: BehaviorSubject<SuccessStatus> = new BehaviorSubject<SuccessStatus>(SuccessStatus.NotStated);
    public filters$: Subject<IFilters> = new Subject<IFilters>();

    constructor(private _http: HttpClient) {
        this.getActualSalaryBounds();
        combineLatest(this.selectedDepartments$,
            this.selectedPosts$,
            this.salary$,
            this.isFired$,
            this.successStatus$).pipe(map((value) => {
            return {
                selectedDepartments: value[0],
                selectedPosts: value[1],
                salary: value[2],
                isFired: value[3],
                successStatus: value[4]
            };
        })).subscribe(this.filters$);
        this.filters$.subscribe(console.log);
    }

    public getActualSalaryBounds() {
        this._http.get<IEmployeeResponseModel[]>(`${apiUrl}/employees?_sort=salary&_order=acs`).pipe(tap((response) => {
            if (response.length === 0) {
                this.salary$.next([0, 0]);
                return;
            }
            if (response.length > 1) {
                this.salary$.next([response[0].salary, response[response.length - 1].salary]);
                return;
            }
            this.salary$.next([response[0].salary, response[0].salary]);
        })).subscribe();
    }


}
