import { Injectable } from '@angular/core';
import { IAuthUserRequestModel } from '../request-models/auth-user.request-model.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _token: string | undefined = undefined;

    constructor(private _http: HttpClient) {}

    public register(user: IAuthUserRequestModel): Observable<IAuthUserRequestModel> {
        return this._http.post<IAuthUserRequestModel>('http://localhost:3000/register', user);
    }

    public login(user: IAuthUserRequestModel): Observable<{ accessToken: string }> {
        return this._http.post<{ accessToken: string }>('http://localhost:3000/login', user)
            .pipe(
                tap(({ accessToken }) => {
                    localStorage.setItem('token', accessToken);
                    this.setToken(accessToken);
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
