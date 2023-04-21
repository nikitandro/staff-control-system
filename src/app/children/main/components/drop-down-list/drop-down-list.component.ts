import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { trigger } from '@angular/animations';
import {
    ControlValueAccessor, FormArray,
    FormBuilder,
    FormControl,
    NG_VALUE_ACCESSOR,
    NonNullableFormBuilder,
} from '@angular/forms';
import { values } from 'json-server-auth';
import { IDropDownListProperties, IDropDownListProperty } from './drop-down-list.types';

@Component({
    selector: 'drop-down-list',
    templateUrl: './drop-down-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/drop-down-list.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DropDownListComponent),
        multi: true,
    }],
})
export class DropDownListComponent implements ControlValueAccessor, AfterViewInit {
    @Input()
    public title: string = '';
    @Input()
    public selectedProperties: IDropDownListProperties = [];
    public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public checkboxFormBuilder: NonNullableFormBuilder = new FormBuilder().nonNullable;
    public checkboxFormControls: FormArray<FormControl<IDropDownListProperty>> = new FormArray<FormControl<IDropDownListProperty>>([]);
    private onChange: (properties: IDropDownListProperties) => void = () => {
    };
    private onTouched: () => void = () => {
    };

    public ngAfterViewInit() {
        for (let property of this.selectedProperties) {
            const newFormControl = this.checkboxFormBuilder.control<IDropDownListProperty>(property);
            newFormControl.valueChanges.subscribe(this.onPropertyIsCheckedChange(property.name));
            this.checkboxFormControls.push(newFormControl);
        }
    }

    public toggleIsOpen(): void {
        this.isOpen$.next(!this.isOpen$.value);
    }

    public registerOnChange(fn: (properties: IDropDownListProperties) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public writeValue(properties: IDropDownListProperties): void {
        this.selectedProperties = properties;
        this.onChange(properties);
    }

    public onPropertyIsCheckedChange(name: string) {
        return (value: IDropDownListProperty) => {
            this.writeValue([...this.selectedProperties.map((property) => {
                if (name === property.name) {
                    return value;
                }
                return property;
            })]);
        };
    }
}
