import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input, Output,
} from '@angular/core';

import {BehaviorSubject, Subject} from 'rxjs';


@Component({
    selector: 'main-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./styles/checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
    @Input()
    public title: string = '';

    @Output()
    public isCheckedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    public isChecked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        this.isChecked$.subscribe((value) => {
            this.isCheckedChange.emit(value);
        });
    }

    public toggleIsChecked() {
        this.isChecked$.next(!this.isChecked$.value);
    }
}
