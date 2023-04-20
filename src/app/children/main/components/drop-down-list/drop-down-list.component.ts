import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { trigger } from '@angular/animations';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { values } from 'json-server-auth';
import { IDropDownListProperties } from './drop-down-list.types';

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
export class DropDownListComponent implements ControlValueAccessor {
    @Input()
    public name: string = '';
    @Input()
    public propertyList: string[] = [];
    @Output()
    public selectPropertyEvent: EventEmitter<string[]> = new EventEmitter();

    public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public selectedProperties$: BehaviorSubject<IDropDownListProperties> = new BehaviorSubject<IDropDownListProperties>({});
    private onChange = (value: any) => {
    };
    private onTouched = (value: any) => {
    };

    public toggleIsOpen(): void {
        this.isOpen$.next(!this.isOpen$.value);
    }

    public setIsCheckedProperty(): void {

    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public writeValue(obj: any): void {
    }
}
