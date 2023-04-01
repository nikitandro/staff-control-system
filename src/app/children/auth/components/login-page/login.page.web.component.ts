import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../data/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'auth-login-page',
    templateUrl: './login.page.web.component.html',
    styleUrls: ['./styles/login.page.web.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    private _aSub!: Subscription;

    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        this._route.queryParams.subscribe((params: Params) => {
            if (params['registered']) {
                // Теперь вы можете войти в систему используя свои данные
            } else if (params['accessDenied']) {
                // Для начала авторизуйтесь в системе
            }
        });
    }

    public ngOnDestroy(): void {
        if (this._aSub) {
            this._aSub.unsubscribe();
        }
    }

    public onSubmit(): void {
        this.loginForm.disable();
        this._aSub = this._auth.login(this.loginForm.value).subscribe(
            () => this._router.navigate(['/home']), //TODO сделать главную страницу, на которую должно редиректить после логина
            (error: Error) => {
                console.warn(error);
                this.loginForm.enable();
            }
        );
    }
}
