import { Component } from '@angular/core';


@Component({
    selector: 'employee-card-skeleton',
    templateUrl: './employee-card-skeleton.component.html',
    styleUrls: ['./styles/employee-card-skeleton.component.scss']
})
export class EmployeeCardSkeletonComponent {
    public isLoader = true;
}
