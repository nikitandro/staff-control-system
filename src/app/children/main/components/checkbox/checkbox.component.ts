import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'main-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./styles/checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
    @Input() public text: string = '';
    @Input() public defaultState: boolean = false;
    @Output() public checkEvent$: EventEmitter<boolean> = new EventEmitter<boolean>();
    public isChecked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.defaultState);

    public toggleIsChecked(): void {
        this.isChecked$.next(!this.isChecked$.getValue());
        this.checkEvent$.emit(!this.isChecked$.getValue());
    }
}
