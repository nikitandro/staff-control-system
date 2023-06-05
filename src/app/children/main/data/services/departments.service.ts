import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDepartment } from '../interfaces/department.interface';
import { Observable } from 'rxjs';
import { apiUrl } from '../api/api';

@Injectable()
export class DepartmentsService {
    constructor(private _http: HttpClient) {
    }

    public getDepartmentsList(): Observable<IDepartment[]> {
        return this._http.get<IDepartment[]>(`${apiUrl}/departments`);
    }
}
