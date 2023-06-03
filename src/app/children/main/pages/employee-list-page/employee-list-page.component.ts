import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { IEmployeeInfo } from '../../components/employee-list-item/employee-list-item.types';
import {EmployeeService} from '../../data/services/employee.service';
import {tap} from 'rxjs/operators';
import {IEmployeeResponseModel} from '../../data/response-models/employee.response-model.interface';

@Component({
    selector: 'employee-list-page',
    templateUrl: './employee-list-page.component.html',
    styleUrls: ['./styles/employee-list-page.components.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListPageComponent implements OnInit{

    public employeeList: IEmployeeResponseModel[] = []
    constructor(public employeeService: EmployeeService, private changeDetection: ChangeDetectorRef) {

    }

    public ngOnInit() {
        this.employeeService.employeeList$.subscribe((value) => {
            this.employeeList = value;
            this.changeDetection.detectChanges()
        })
        this.employeeService.limit$.next(20);
        this.employeeService.page$.next(1);
    }
}
