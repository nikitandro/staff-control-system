import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'employee-card',
    templateUrl: 'employee-card.component.html',
    styleUrls: ['./styles/employee-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCardComponent {

}
