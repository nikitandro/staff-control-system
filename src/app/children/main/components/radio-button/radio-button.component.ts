import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component(
    {
        selector: 'radio-button',
        styleUrls: ['./styles/radio-button.component.scss'],
        templateUrl: './radio-button.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush
    }
)
export class RadioButtonComponent {
    @Input()
    public text: string = '';

    @Input()
    public isActive: boolean = false;
}
