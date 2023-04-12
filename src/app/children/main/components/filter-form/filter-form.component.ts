import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ISalaryOption, ISelectedOptions } from './filter-form.types';

@Component({
    selector: 'filter-form',
    templateUrl: './filter-form.component.html',
    styleUrls: ['./styles/filter-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterFormComponent {
    public filterForm: FormGroup = new FormGroup(
        {
            selectedDepartments: new FormControl<ISelectedOptions>([], { nonNullable: true }),
            selectedPosts: new FormControl<ISelectedOptions>([], { nonNullable: true }),
            salary: new FormControl<ISalaryOption>({ from: 0, to: 0 }, { nonNullable: true }),
            isFired: new FormControl<boolean>(false, {nonNullable: true}),
            isSuccessful: new FormControl<boolean | null>(false)
        },
    );

    constructor() {
    }
}
