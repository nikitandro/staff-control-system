import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'burger-button',
    templateUrl: './burger-button.component.html',
    styleUrls: ['./styles/burger-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BurgerButtonComponent {
    private isOpen: boolean = false;
}
