import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IDepartment} from '../interfaces/department.interface';

@Injectable()
export class DepartmentsService {
    constructor(private _http: HttpClient) {
    }

    public getDepartmentsList() {
        return this._http.get<IDepartment[]>('http://localhost:3000/departments');
    }
}
