import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EmployeeSuccessStatus, IEmployeeInfo } from './employee-list-item.types';

@Component({
    selector: 'employee-list-item',
    templateUrl: './employee-list-item.component.html',
    styleUrls: ['./styles/employee-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListItemComponent {
    @Input()
    public info: IEmployeeInfo = {};

    public isSuccessStatusStated() {
        return this.info.successStatus !== EmployeeSuccessStatus.NotStated || this.info.successStatus !== undefined;
    }
}