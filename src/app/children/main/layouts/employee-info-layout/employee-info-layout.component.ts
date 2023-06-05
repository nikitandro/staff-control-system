import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'employee-info-layout',
    templateUrl: './employee-info-layout.component.html',
    styleUrls: ['./styles/employee-info-layout.component.scss']
})
export class EmployeeInfoLayoutComponent implements OnInit{

    public loader: boolean = true;

    public ngOnInit(): void {
        this.loader = false
    }

}
