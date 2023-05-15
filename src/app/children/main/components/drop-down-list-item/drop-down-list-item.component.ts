import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'drop-down-list-item',
    templateUrl: './drop-down-list-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/drop-down-list-item.component.scss'],

})
export class DropDownListItemComponent {
    public checkboxControl: FormControl<boolean> = new FormControl<boolean>(false, { nonNullable: true });
}
