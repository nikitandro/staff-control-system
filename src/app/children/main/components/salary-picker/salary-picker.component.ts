import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { filter, from, fromEvent, map, pipe, Subject, takeUntil } from 'rxjs';
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
export class SalaryPickerComponent implements OnInit, ControlValueAccessor {

    public lowestSalaryControl: FormControl<number> = new FormControl<number>(14000, { nonNullable: true });
    public highestSalaryControl: FormControl<number> = new FormControl<number>(100000, { nonNullable: true });
    public sliderControl: FormControl<[number, number]> = new FormControl<[number, number]>([14000, 100000], { nonNullable: true });
    public lowestSalary: number = 14000;
    public highestSalary: number = 100000;

    private lowestSalaryKeyDownEnter$: Subject<void> = new Subject<void>();
    private highestSalaryKeyDownEnter$: Subject<void> = new Subject<void>();
    private lowestSalaryBlur$: Subject<void> = new Subject<void>();
    private highestSalaryBlur$: Subject<void> = new Subject<void>();
    public sliderOptions: Options = {
        floor: this.lowestSalary,
        ceil: this.highestSalary,
    };
    @ViewChild('lowestSalary')
    public lowestSalaryElementRef?: ElementRef<HTMLInputElement>;
    @ViewChild('highestSalary')
    public highestSalaryElementRef?: ElementRef<HTMLInputElement>;
    public onChange = (value: [number, number]) => {
    };
    public onTouch = () => {
    };

    public swapLowAndHighSalaryControlsValues() {
        const currLowestSalaryControlValue = this.lowestSalaryControl.getRawValue();
        const currHighestSalaryControlValue = this.highestSalaryControl.getRawValue();
        this.highestSalaryControl.setValue(currLowestSalaryControlValue);
        this.lowestSalaryControl.setValue(currHighestSalaryControlValue);
    }

    public onLowestSalaryControlKeyDownEnter() {
        if (this.lowestSalaryControl.getRawValue() < this.lowestSalary) {
            this.lowestSalaryControl.setValue(this.lowestSalary);
        }
        this.lowestSalaryElementRef?.nativeElement.blur();
    }

    public onHighestSalaryControlKeyDownEnter() {
        if (this.highestSalaryControl.getRawValue() > this.highestSalary) {
            this.highestSalaryControl.setValue(this.highestSalary);
        }
        this.highestSalaryElementRef?.nativeElement.blur();
    }

    public onLowestSalaryControlBlur() {
        const currValue = this.lowestSalaryControl.getRawValue();
        if (currValue < this.lowestSalary) {
            this.lowestSalaryControl.setValue(this.lowestSalary);
        } else if (currValue > this.highestSalary) {
            this.lowestSalaryControl.setValue(this.highestSalary);
        }
    }

    public onHighestSalaryControlBlur() {
        const currValue = this.highestSalaryControl.getRawValue();
        if (currValue > this.highestSalary) {
            this.highestSalaryControl.setValue(this.highestSalary);
        } else if (currValue < this.lowestSalary) {
            this.highestSalaryControl.setValue(this.lowestSalary);
        }
    }

    public ngOnInit() {
        this.sliderControl.valueChanges.pipe(
            tap((value) => {
                const lowestSalaryElement = this.lowestSalaryElementRef?.nativeElement;
                const highestSalaryElement = this.highestSalaryElementRef?.nativeElement;
                if ((document.activeElement === lowestSalaryElement || document.activeElement === highestSalaryElement)) {
                    return;
                }
                this.lowestSalaryControl.setValue(value[0]);
                this.highestSalaryControl.setValue(value[1]);
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
