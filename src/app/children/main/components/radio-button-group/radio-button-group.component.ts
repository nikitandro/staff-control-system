import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {IRadioButtons} from "./radio-button-group.types";

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
    public change: EventEmitter<string | null> = new EventEmitter<string | null>();

    public onRadioButtonChange() {

    }
}
