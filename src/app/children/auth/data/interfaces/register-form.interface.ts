import { FormControl } from '@angular/forms';

export interface IRegisterForm {
    email: FormControl<string>
    password: FormControl<string>
}
