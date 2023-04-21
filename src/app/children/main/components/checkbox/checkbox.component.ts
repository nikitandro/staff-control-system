import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICheckboxModel } from './checkbox.types';


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
    @Input()
    public title: string = '';
    @Input()
    public isChecked?: boolean = false;
    @Input()
    public name: string = '';
    private onChange = (value: ICheckboxModel) => {
    };
    private onTouched = () => {
    };

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public writeValue(value: ICheckboxModel): void {
        this.name = value.name;
        this.title = value.title;
        this.isChecked = value.isChecked;
        this.onChange(value);
    }

    public click() {
        this.writeValue({ name: this.name, title: this.title, isChecked: !this.isChecked });
    }
}
