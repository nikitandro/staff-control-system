import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    Input,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
    ControlValueAccessor,
    FormControl, FormGroup,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
    IDropDownListInputOptions, IDropDownListOptions,
    IDropDownListOptionsFormGroup, IDropDownListOption,
} from './drop-down-list.types';

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
    public options: IDropDownListOption[] = [];

    public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private onChange: (properties: IDropDownListOptions) => void = () => {
    };

    private onTouched: () => void = () => {
    };

    public ngAfterViewInit() {

    }

    public toggleIsOpen(): void {
        this.isOpen$.next(!this.isOpen$.value);
    }

    public registerOnChange(fn: (properties: IDropDownListOptions) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public writeValue(properties: IDropDownListOptions): void {
        this.onChange(properties);
    }

    public onPropertyIsCheckedChange(name: string) {
        return (value: IDropDownListOption) => {

        };
    }
}
