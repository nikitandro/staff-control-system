import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../../auth/data/services/auth.service';

@Component({
    selector: 'burger-button',
    templateUrl: './burger-button.component.html',
    styleUrls: ['./styles/burger-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BurgerButtonComponent {
    public isOpen: boolean = false;

    constructor(private authService: AuthService) {
    }

    public toggleOpen() {
        this.isOpen = !this.isOpen;
    }

    public logout() {
        this.authService.logout();
    }
}
