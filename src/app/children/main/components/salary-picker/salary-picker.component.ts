import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
    selector: 'salary-picker',
    templateUrl: './salary-picker.component.html',
    styleUrls: ['./styles/salary-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalaryPickerComponent {
    public lowestSalary: number = 14000;
    public highestSalary: number = 100000;
    public sliderOptions: Options = {
        floor: this.lowestSalary,
        ceil: this.highestSalary,
    };

    public changeHighestSalary(event: Event) {
        // this.highestSalary = event.;
    }
}
