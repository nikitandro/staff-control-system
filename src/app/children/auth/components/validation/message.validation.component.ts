import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'validation-message',
    styleUrls: ['./styles/message.validation.component.scss'],
    templateUrl: 'message.validation.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class ValidationMessageComponent {
    @Input()
    public control!: AbstractControl;

    @Input()
    public errorMessage?: string;
}
