import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { trigger } from '@angular/animations';

@Component({
    selector: 'drop-down-list',
    templateUrl: './drop-down-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/drop-down-list.component.scss'],
})
export class DropDownListComponent {
    @Input() public name: string = '';
    @Input() public propertyList: string[] = [];
    @Output() public selectedProperties: EventEmitter<string[]> = new EventEmitter();

    public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public toggleIsOpen(): void {
        this.isOpen$.next(!this.isOpen$.value);
    }
}
