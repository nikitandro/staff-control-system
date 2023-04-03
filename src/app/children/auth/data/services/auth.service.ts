import { Injectable } from '@angular/core';
import { IAuthUserRequestModel } from '../request-models/auth-user.request-model.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAuthUserResponseModel } from '../response-models/auth-user.response-model.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _token: string | undefined = undefined;

    constructor(private _http: HttpClient) {}

    public register(
        user: IAuthUserRequestModel
    ): Observable<IAuthUserResponseModel> {
        return this._http
            .post<IAuthUserResponseModel>(
                'http://localhost:3000/register',
                user
            )
            .pipe(
                tap((request) => {
                    localStorage.setItem('token', request.accessToken);
                    this.setToken(request.accessToken);
                })
            );
    }

    public login(
        user: IAuthUserRequestModel
    ): Observable<IAuthUserResponseModel> {
        return this._http
            .post<IAuthUserResponseModel>('http://localhost:3000/login', user)
            .pipe(
                tap((request) => {
                    localStorage.setItem('token', request.accessToken);
                    this.setToken(request.accessToken);
                })
            );
    }

    public logout(): void {
        this.setToken(undefined);
        localStorage.clear();
    }

    public isAuthenticated(): boolean {
        return !!this._token;
    }

    private setToken(token: string | undefined): void {
        this._token = token;
    }

    private getToken(): string | undefined {
        return this._token;
    }
}
