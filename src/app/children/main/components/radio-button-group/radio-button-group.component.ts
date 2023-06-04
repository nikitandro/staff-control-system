import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IRadioButtons} from './radio-button-group.types';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'radio-button-group',
    styleUrls: ['./styles/radio-button-group.component.scss'],
    templateUrl: './radio-button-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonGroupComponent {

    @Input()
    public defaultIsActive: boolean = false;

    @Input()
    public radioButtons: IRadioButtons = [];

    @Output()
    public groupChange: EventEmitter<number | null> = new EventEmitter<number | null>();

    public currentActiveRadioButton: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

    public ngOnInit() {
        this.currentActiveRadioButton.subscribe((value) => {
            this.groupChange.emit(value);
        })
    }

    public onRadioButtonChange(id: number) {
        if (this.currentActiveRadioButton.value === id) {
            this.currentActiveRadioButton.next(null);
            return;
        }
        this.currentActiveRadioButton.next(id);
    }
}
