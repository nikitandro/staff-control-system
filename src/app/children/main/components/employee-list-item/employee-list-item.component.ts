import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EmployeeSuccessStatus, IEmployeeInfo } from './employee-list-item.types';
import {IEmployeeResponseModel} from '../../data/response-models/employee.response-model.interface';

@Component({
    selector: 'employee-list-item',
    templateUrl: './employee-list-item.component.html',
    styleUrls: ['./styles/employee-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListItemComponent {
    @Input()
    public info: IEmployeeResponseModel = {} as IEmployeeResponseModel;

    // public isSuccessStatusStated() {
    //     return this.info.successStatus !== EmployeeSuccessStatus.NotStated || this.info.successStatus !== undefined;
    // }
}
