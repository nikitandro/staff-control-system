import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";

@Component(
    {
        selector: 'radio-button',
        styleUrls: ['./styles/radio-button.component.scss'],
        templateUrl: './radio-button.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush
    }
)
export class RadioButtonComponent {
    @Input()
    public text: string = '';
    @Output()
    public isActive: EventEmitter<boolean>  = new EventEmitter<boolean>();

    public _isActive: boolean = false;
    constructor() {

    }

    public toggleIsActive() {
        this._isActive = !this._isActive;
        this.isActive.emit(this._isActive);
    }
}
