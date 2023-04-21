import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IFilterFormControls, ISalaryOption, ISelectedOptions } from './filter-form.types';
import {
    IDropDownListControlValue,
    IDropDownListProperties,
    IDropDownListProperty,
} from '../drop-down-list/drop-down-list.types';

@Component({
    selector: 'filter-form',
    templateUrl: './filter-form.component.html',
    styleUrls: ['./styles/filter-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FilterFormComponent),
        multi: true,
    }],
})
export class FilterFormComponent implements ControlValueAccessor, AfterViewInit {
    public filterForm: FormGroup<IFilterFormControls> = new FormGroup<IFilterFormControls>(
        {
            selectedDepartments: new FormControl<IDropDownListProperties>([{
                name: 'one',
                title: 'one',
                isChecked: false,
            }], { nonNullable: true }),
            selectedPosts: new FormControl<IDropDownListProperties>([], { nonNullable: true }),
            salary: new FormControl<ISalaryOption>({ from: 0, to: 0 }, { nonNullable: true }),
            isFired: new FormControl<boolean>(false, { nonNullable: true }),
            isSuccessful: new FormControl<boolean | null>(false),
        },
    );

    public onChange = (value: typeof this.filterForm.value) => {
    };
    public onTouch = () => {
    };

    constructor() {
    }

    public ngAfterViewInit() {
        this.filterForm.valueChanges.subscribe((value) => {
            this.writeValue(value);
        });
    }

    public test(properties: IDropDownListProperties) {
        console.log(properties);
    }

    public onDepartmentOptionChange() {
        return (properties: IDropDownListProperties) => {
            this.test(properties);
        };
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public writeValue(value: typeof this.filterForm.value): void {
        this.onChange(value);
    }
}
