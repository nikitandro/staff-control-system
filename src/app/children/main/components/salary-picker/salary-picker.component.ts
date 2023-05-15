import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef, Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'salary-picker',
    templateUrl: './salary-picker.component.html',
    styleUrls: ['./styles/salary-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SalaryPickerComponent),
        multi: true,
    }],
})
export class SalaryPickerComponent implements OnInit, ControlValueAccessor, AfterViewInit {

    public lowestSalaryControl: FormControl<number> = new FormControl<number>(14000, { nonNullable: true });

    public highestSalaryControl: FormControl<number> = new FormControl<number>(100000, { nonNullable: true });

    public sliderControl: FormControl<[number, number]> = new FormControl<[number, number]>([0, 0], { nonNullable: true });

    @Input()
    public salaryBounds: [number, number] = [0, 0];

    public lowestSalary: number = 0;

    public highestSalary: number = 0;

    public sliderOptions: Options = {
        floor: 0,
        ceil: 0,
    };

    @ViewChild('lowestSalary')
    public lowestSalaryElementRef?: ElementRef<HTMLInputElement>;

    @ViewChild('highestSalary')
    public highestSalaryElementRef?: ElementRef<HTMLInputElement>;

    public onChange = (value: [number, number]) => {
    };

    public onTouch = () => {
    };

    public ngAfterViewInit() {

    }

    public isValidState() {
        const currLowestSalaryValue = this.lowestSalaryControl.getRawValue();
        const currHighestSalaryValue = this.highestSalaryControl.getRawValue();
        return currLowestSalaryValue >= this.lowestSalary
            && currLowestSalaryValue <= this.highestSalary
            && currHighestSalaryValue >= this.lowestSalary
            && currHighestSalaryValue <= this.highestSalary;
    }

    public swapLowAndHighSalaryControlsValues() {
        if (!this.isValidState()) {
            return;
        }
        const currLowestSalaryControlValue = this.lowestSalaryControl.getRawValue();
        const currHighestSalaryControlValue = this.highestSalaryControl.getRawValue();
        // this.setValidLowestSalaryValue(currHighestSalaryControlValue);
        // this.setValidHighestSalaryValue(currLowestSalaryControlValue)
        this.highestSalaryControl.setValue(currLowestSalaryControlValue);
        this.lowestSalaryControl.setValue(currHighestSalaryControlValue);
    }

    public setValidSalary() {
        const currLowestSalaryValue = this.lowestSalaryControl.getRawValue();
        const currHighestSalaryValue = this.highestSalaryControl.getRawValue();
        if (currLowestSalaryValue < this.lowestSalary) {
            this.lowestSalaryControl.setValue(this.lowestSalary);
        }
        if (currLowestSalaryValue > this.highestSalary) {
            this.lowestSalaryControl.setValue(this.highestSalary);
        }
        if (currHighestSalaryValue < this.lowestSalary) {
            this.highestSalaryControl.setValue(this.lowestSalary);
        }
        if (currHighestSalaryValue > this.highestSalary) {
            this.highestSalaryControl.setValue(this.highestSalary);
        }
    }

    public onLowestSalaryControlKeyDownEnter() {
        this.setValidSalary();
        if (this.lowestSalaryControl.getRawValue() < this.lowestSalary) {
            this.lowestSalaryControl.setValue(this.lowestSalary);
        }
        this.lowestSalaryElementRef?.nativeElement.blur();
    }

    public onHighestSalaryControlKeyDownEnter() {
        this.setValidSalary();
        if (this.highestSalaryControl.getRawValue() > this.highestSalary) {
            this.highestSalaryControl.setValue(this.highestSalary);
        }
        this.highestSalaryElementRef?.nativeElement.blur();
    }

    public onLowestSalaryControlBlur() {
        this.setValidSalary();
        const currValue = this.lowestSalaryControl.getRawValue();
        if (currValue < this.lowestSalary) {
            this.lowestSalaryControl.setValue(this.lowestSalary);
        } else if (currValue > this.highestSalary) {
            this.lowestSalaryControl.setValue(this.highestSalary);
        }
    }

    public onHighestSalaryControlBlur() {
        this.setValidSalary();
        const currValue = this.highestSalaryControl.getRawValue();
        if (currValue > this.highestSalary) {
            this.highestSalaryControl.setValue(this.highestSalary);
        } else if (currValue < this.lowestSalary) {
            this.highestSalaryControl.setValue(this.lowestSalary);
        }

    }

    public setValidLowestSalaryValue(value: number) {
        if (value < this.lowestSalary) {
            this.lowestSalaryControl.setValue(this.lowestSalary);
            return;
        }
        this.lowestSalaryControl.setValue(value);
    }

    public setValidHighestSalaryValue(value: number) {
        if (value > this.highestSalary) {
            this.highestSalaryControl.setValue(this.highestSalary);
            return;
        }
        this.highestSalaryControl.setValue(value);
    }

    public ngOnInit() {
        this.sliderControl.valueChanges.pipe(
            tap((value) => {
                const lowestSalaryElement = this.lowestSalaryElementRef?.nativeElement;
                const highestSalaryElement = this.highestSalaryElementRef?.nativeElement;
                if ((document.activeElement === lowestSalaryElement || document.activeElement === highestSalaryElement)) {
                    if (this.lowestSalaryControl.getRawValue() > this.highestSalaryControl.getRawValue()) {
                        this.swapLowAndHighSalaryControlsValues();
                    }
                    return;
                }
                this.lowestSalaryControl.setValue(value[0]);
                this.highestSalaryControl.setValue(value[1]);
                this.writeValue(value);
            }),
        )
            .subscribe();
        this.lowestSalaryControl.valueChanges.pipe(
            tap((value) => {
                if (!(document.activeElement === this.lowestSalaryElementRef?.nativeElement)) {
                    return;
                }
                const currHighestSalaryControlValue = this.highestSalaryControl.getRawValue();
                if (value < this.lowestSalary) {
                    this.sliderControl.setValue([this.lowestSalary, this.highestSalaryControl.getRawValue()]);
                    return;
                } else if (value > this.highestSalary) {
                    this.sliderControl.setValue([this.highestSalary, this.highestSalaryControl.getRawValue()]);
                    return;
                } else if (value > currHighestSalaryControlValue) {
                    this.swapLowAndHighSalaryControlsValues();
                    this.sliderControl.setValue([this.lowestSalaryControl.getRawValue(), this.highestSalaryControl.getRawValue()]);
                    return;
                }
                this.sliderControl.setValue([value, this.highestSalaryControl.getRawValue()]);
            }),
        )
            .subscribe();
        this.highestSalaryControl.valueChanges.pipe(
            tap((value) => {
                if (!(document.activeElement === this.highestSalaryElementRef?.nativeElement)) {
                    return;
                }
                const currLowestSalaryControlValue = this.lowestSalaryControl.getRawValue();
                if (value > this.highestSalary) {
                    this.sliderControl.setValue([this.lowestSalaryControl.getRawValue(), this.highestSalary]);
                    return;
                } else if (value < this.lowestSalary) {
                    this.sliderControl.setValue([this.lowestSalaryControl.getRawValue(), this.lowestSalary]);
                    return;
                } else if (value < currLowestSalaryControlValue) {
                    this.swapLowAndHighSalaryControlsValues();
                    this.sliderControl.setValue([this.lowestSalaryControl.getRawValue(), this.highestSalaryControl.getRawValue()]);
                    return;
                }
                this.sliderControl.setValue([this.lowestSalaryControl.getRawValue(), value]);
            }),
        )
            .subscribe();
        this.sliderOptions.ceil = this.salaryBounds[1];
        this.sliderOptions.floor = this.salaryBounds[0];
        this.lowestSalary = this.salaryBounds[0];
        this.highestSalary = this.salaryBounds[1];
        this.sliderControl.setValue(this.salaryBounds);
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public writeValue(value: [number, number]): void {
        this.onChange(value);
    }
}
