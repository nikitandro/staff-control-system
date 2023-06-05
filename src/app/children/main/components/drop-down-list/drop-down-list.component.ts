import {
    ChangeDetectionStrategy, Component, EventEmitter,
    Input, Output,
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IDropDownListOption} from './drop-down-list.types';

@Component({
    selector: 'drop-down-list',
    templateUrl: './drop-down-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/drop-down-list.component.scss'],
})
export class DropDownListComponent {
    @Input()
    public title: string = '';

    @Input()
    public options: IDropDownListOption[] = [];

    @Output()
    public checkedOptionsChange: EventEmitter<number[]> = new EventEmitter<number[]>();

    public checkedOptions$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

    public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        this.checkedOptions$.subscribe((value) => {
            this.checkedOptionsChange.emit(value);
        });
    }


    public toggleIsOpen(): void {
        this.isOpen$.next(!this.isOpen$.value);
    }


    public onPropertyIsCheckedChange(id: number, isChecked: boolean) {
        if (isChecked) {
            this.checkedOptions$.next([...this.checkedOptions$.value, id]);
        } else {
            this.checkedOptions$.next([...this.checkedOptions$.value.filter((value) => {
                return value !== id;
            })]);
        }
    }

}
