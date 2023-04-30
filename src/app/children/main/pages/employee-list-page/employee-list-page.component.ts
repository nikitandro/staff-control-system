import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IEmployeeInfo } from '../../components/employee-list-item/employee-list-item.types';

@Component({
    selector: 'employee-list-page',
    templateUrl: './employee-list-page.component.html',
    styleUrls: ['./styles/employee-list-page.components.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListPageComponent {
    public info: IEmployeeInfo = {
        firstname: 'Никита',
        lastname: 'Вишняков',
        patronymic: 'Сергеевич',
        post: 'Frontend-разработчик (Angular)',
        department: 'Разработка',
        salary: '150000'
    }
}
