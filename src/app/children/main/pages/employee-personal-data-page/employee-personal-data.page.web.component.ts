import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'employee-personal-data',
    templateUrl: 'employee-personal-data.page.web.component.html',
    styleUrls: ['./styles/employee-personal-data.page.web.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeePersonalDataPageWebComponent {
    public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public open(): void {
        this.isOpen$.next(!this.isOpen$.getValue());
    }
}
