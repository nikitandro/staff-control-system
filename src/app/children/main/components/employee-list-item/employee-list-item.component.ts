import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IEmployeeResponseModel} from '../../data/response-models/employee.response-model.interface';
import {SuccessStatus} from '../../data/interfaces/SuccessStatus.interface';

@Component({
    selector: 'employee-list-item',
    templateUrl: './employee-list-item.component.html',
    styleUrls: ['./styles/employee-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListItemComponent {
    @Input()
    public info: IEmployeeResponseModel = {} as IEmployeeResponseModel;

    public isNonZeroSuccessRate() {
        return this.info.successRate !== 0;
    }

    public isSuccessful() {
        return this.info.successRate > 0;
    }
}
