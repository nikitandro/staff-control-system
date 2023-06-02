import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployeeResponseModel } from '../response-models/employee.response-model.interface';
import { IEmployeeRequestModel } from '../request-models/employee.request-model.interface';

@Injectable()
export class EmployeeDataService {
    constructor(private _http: HttpClient) {
    }

    public getEmployeeData(id: number | undefined): Observable<IEmployeeResponseModel> {
        return this._http.get<IEmployeeResponseModel>(`http://localhost:3000/employees/${id}`);
    }


    public updateEmployeeData(id: number | undefined, employee: IEmployeeRequestModel): any {
        const httpOptions: any = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };

        return this._http.put<any>(`http://localhost:3000/employees/${id}`, employee, httpOptions);
    }

    public addEmployee(employee: IEmployeeRequestModel): any {
        const httpOptions: any = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };

        return this._http.post<any>('http://localhost:3000/employees/', employee, httpOptions);
    }
}
