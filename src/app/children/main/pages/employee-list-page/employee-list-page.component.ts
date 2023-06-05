import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
} from '@angular/core';
import { EmployeeService } from '../../data/services/employee.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { Router } from '@angular/router';
import { IntersectionObserverService } from 'ng-intersection-observer';

@Component({
    selector: 'employee-list-page',
    templateUrl: './employee-list-page.component.html',
    styleUrls: ['./styles/employee-list-page.components.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListPageComponent implements OnInit, AfterViewInit {

    public employeeList: IEmployeeResponseModel[] = [];

    constructor(private _employeeService: EmployeeService, private _changeDetection: ChangeDetectorRef, private _router: Router, private _intersectionService: IntersectionObserverService) {

    }

    public ngAfterViewInit(): void {

    }

    public ngOnInit(): void {
        this._employeeService.employeeList$.subscribe((value: IEmployeeResponseModel[]) => {
            this.employeeList = value;
            this._changeDetection.detectChanges();
        });
    }

    public onEmployeeListItemClick(id: number): void {
        this._router.navigate([`cabinet/employee-info/${id}/personal`]);
    }

    public onIntersectionObserverVisible(): void {
        this._employeeService.page$.next(this._employeeService.page$.value + 1);
    }

    public onIntersectionObserverHidden(): void {}
}
