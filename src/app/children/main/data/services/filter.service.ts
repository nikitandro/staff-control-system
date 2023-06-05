import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployeeResponseModel } from '../response-models/employee.response-model.interface';
import { BehaviorSubject, combineLatest, map, Observable, } from 'rxjs';
import { IFilters } from '../interfaces/filters.interface';
import { apiUrl } from '../api/api';
import { SuccessStatus } from '../interfaces/SuccessStatus.interface';

@Injectable()
export class FilterService {

    public selectedDepartments$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    public selectedPosts$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    public salary$: BehaviorSubject<[number, number]> = new BehaviorSubject<[number, number]>([0, 0]);
    public isFired$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public successStatus$: BehaviorSubject<SuccessStatus> = new BehaviorSubject<SuccessStatus>(SuccessStatus.NotStated);
    public filters$: BehaviorSubject<IFilters> = new BehaviorSubject<IFilters>({
        salary: [0, 0],
        isFired: false,
        successStatus: SuccessStatus.NotStated,
        selectedPosts: [],
        selectedDepartments: []
    });

    constructor(private _http: HttpClient) {

        combineLatest(this.selectedDepartments$,
            this.selectedPosts$,
            this.salary$,
            this.isFired$,
            this.successStatus$).pipe(map((value: [number[], number[], [number, number], boolean, SuccessStatus]) => {
            return {
                selectedDepartments: value[0],
                selectedPosts: value[1],
                salary: value[2],
                isFired: value[3],
                successStatus: value[4]
            };
        })).subscribe((value: IFilters) => {
            this.filters$.next(value);
        });
    }

    public getActualSalaryBounds(): Observable<[number, number]> {
        return this._http.get<IEmployeeResponseModel[]>(`${apiUrl}/employees?_sort=salary&_order=acs`).pipe(map((response) => {
            if (response.length === 0) {
                this.salary$.next([0, 0]);

                return [0, 0];
            }
            if (response.length > 1) {
                this.salary$.next([response[0].salary, response[response.length - 1].salary]);

                return [response[0].salary, response[response.length - 1].salary];
            }
            this.salary$.next([response[0].salary, response[0].salary]);

            return [response[0].salary, response[0].salary];
        }));
    }


}
