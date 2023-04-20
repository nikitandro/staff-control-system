import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    Output,
} from '@angular/core';
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
    @Input() public title: string = '';
    @Input() public defaultState: boolean = false;
    public isChecked: boolean = false;
    private onChange = (value: boolean) => {
    };
    private onTouched = () => {
    };

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public writeValue(value: boolean): void {
        this.isChecked = value;
        this.onChange(value);
    }

    @HostBinding('click')
    public click() {
        this.writeValue(!this.isChecked);
        console.log('clicked');
    }
}
