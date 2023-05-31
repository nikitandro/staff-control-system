import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployeeResponseModel } from '../response-models/employee.response-model.interface';

@Injectable()
export class EmployeeDataService {
    constructor(private _http: HttpClient) {
    }

    public getEmployeeData(id: number): Observable<IEmployeeResponseModel> {
        return this._http.get<IEmployeeResponseModel>(`http://localhost:3000/employees/${id}`);
    }
}
