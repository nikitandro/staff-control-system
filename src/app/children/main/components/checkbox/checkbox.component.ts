import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'main-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./styles/checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true,
    }],
})
export class CheckboxComponent implements ControlValueAccessor {
    @Input() public text: string = '';
    @Input() public defaultState: boolean = false;
    // @Output() public checkEvent$: EventEmitter<boolean> = new EventEmitter<boolean>();
    public isChecked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.defaultState);
    private onChange = (value: any) => {
    };
    private onTouched = (value: any) => {
    };

    public toggleIsChecked(): void {
        this.isChecked$.next(!this.isChecked$.getValue());
        // this.checkEvent$.emit(!this.isChecked$.getValue());
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
    }

    public writeValue(obj: any): void {
        this.isChecked$.next(!this.isChecked$.getValue());
        this.onChange(!this.isChecked$.getValue());
    }
}
