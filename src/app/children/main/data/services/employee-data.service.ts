import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployeeResponseModel } from '../response-models/employee.response-model.interface';
import { IEmployeeRequestModel } from '../request-models/employee.request-model.interface';

@Injectable()
export class EmployeeDataService {
    constructor(private _http: HttpClient) {
    }

    public getEmployeeData(id: number | undefined): Observable<IEmployeeResponseModel> {
        return this._http.get<IEmployeeResponseModel>(`http://localhost:3000/employees/${id}?_expand=post&_expand=department`);
    }


    public updateEmployeeData(id: number | undefined, employee: IEmployeeRequestModel): Observable<IEmployeeResponseModel> {
        return this._http.put<IEmployeeResponseModel>(`http://localhost:3000/employees/${id}`, employee);
    }

    public addEmployee(employee: IEmployeeRequestModel): Observable<IEmployeeResponseModel> {
        return this._http.post<IEmployeeResponseModel>('http://localhost:3000/employees/', employee);
    }
}
