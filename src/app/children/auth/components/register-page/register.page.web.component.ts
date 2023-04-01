import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../data/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'auth-register-page',
    templateUrl: './register.page.web.component.html',
    styleUrls: ['./styles/register.page.web.component.scss']
})
export class RegisterPageComponent implements OnDestroy {
    public registerForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    private _aSub!: Subscription;

    constructor(
        private _auth: AuthService,
        private _router: Router
    ) { }

    public ngOnDestroy(): void {
        if (this._aSub) {
            this._aSub.unsubscribe();
        }
    }

    public onSubmit(): void {
        this.registerForm.disable();
        this._aSub = this._auth.register(this.registerForm.value).subscribe(
            () => {
                this._router.navigate(['/login'], {
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
