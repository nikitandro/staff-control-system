import {Component, Input} from '@angular/core';

@Component({
  selector: 'employee-info-navigation',
  templateUrl: './employee-info-navigation.component.html',
  styleUrls: ['./styles/employee-info-navigation.component.scss']
})
export class EmployeeInfoNavigationComponent {
    @Input()
    public Id: string = '1';
}
