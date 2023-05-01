import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'employee-card',
    templateUrl: 'employee-card.component.html',
    styleUrls: ['./styles/employee-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCardComponent {
    @Output()
    public isEdit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    @Input()
    public isEditINP: boolean = false;

    public edit(): void {
        this.isEdit$.next(!this.isEditINP);
    }
}
