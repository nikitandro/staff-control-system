import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../data/services/auth.service';
import { IRegisterForm } from '../../data/interfaces/register-form.interface';
import { ILoginForm } from '../../data/interfaces/login-form.interface';
import { IAuthUserRequestModel } from '../../data/request-models/auth-user.request-model.interface';
import { passwordValidator } from '../../validators/password.validator';

@Component({
    selector: 'auth-register-page',
    templateUrl: './register.page.web.component.html',
    styleUrls: ['./styles/register.page.web.component.scss']
})
export class RegisterPageWebComponent implements OnDestroy {
    public registerForm!: FormGroup<IRegisterForm>;

    private _registerSubscription!: Subscription;

    constructor(private _auth: AuthService, private _router: Router) {
        this.registerForm = new FormGroup<ILoginForm>({
            email: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.minLength(6),
                    passwordValidator
                ]
            })
        });
    }

    public ngOnDestroy(): void {
        if (this._registerSubscription) {
            this._registerSubscription.unsubscribe();
        }
    }

    public onSubmit(): void {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();

            return;
        }
        const user: IAuthUserRequestModel = {
            email: this.registerForm.controls.email.value,
            password: this.registerForm.controls.password.value
        };
        this.registerForm.disable();
        this._registerSubscription = this._auth
            .register(user)
            .subscribe(
                () => {
                    this._router.navigate(['/cabinet'], {
                        queryParams: {
                            registered: true
                        }
                    });
                },
                (error: Error) => {
                    console.warn(error);
                    this.registerForm.enable();
                }
            );
    }
}
