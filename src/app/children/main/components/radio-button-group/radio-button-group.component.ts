import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRadioButton } from './radio-button-group.types';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'radio-button-group',
    styleUrls: ['./styles/radio-button-group.component.scss'],
    templateUrl: './radio-button-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonGroupComponent implements OnInit{

    @Input()
    public radioButtons: IRadioButton[] = [];

    @Output()
    public groupChange: EventEmitter<number | null> = new EventEmitter<number | null>();

    public currentActiveRadioButton: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

    public ngOnInit(): void {
        this.currentActiveRadioButton.subscribe((value: number | null) => {
            this.groupChange.emit(value);
        });
    }

    public onRadioButtonChange(id: number): void {
        if (this.currentActiveRadioButton.value === id) {
            this.currentActiveRadioButton.next(null);

            return;
        }
        this.currentActiveRadioButton.next(id);
    }
}
