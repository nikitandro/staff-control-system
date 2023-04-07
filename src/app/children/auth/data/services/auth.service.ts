import { Injectable } from '@angular/core';
import { IAuthUserRequestModel } from '../request-models/auth-user.request-model.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAuthUserResponseModel } from '../response-models/auth-user.response-model.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _token: string | undefined = undefined;

    constructor(private _http: HttpClient) {
    }

    public register(user: IAuthUserRequestModel): Observable<IAuthUserResponseModel> {
        return this._http.post<IAuthUserResponseModel>('http://localhost:3000/register', user)
            .pipe(
                tap((response: IAuthUserResponseModel) => {
                    this.setToken(response.accessToken);
                })
            );
    }

    public login(user: IAuthUserRequestModel): Observable<IAuthUserResponseModel> {
        return this._http.post<IAuthUserResponseModel>('http://localhost:3000/login', user)
            .pipe(
                tap((response: IAuthUserResponseModel) => {
                    this.setToken(response.accessToken);
                })
            );
    }

    public logout(): void {
        this.removeToken();
    }

    public isAuthenticated(): boolean {
        return !!this._token && !!localStorage.getItem('token');
    }

    private setToken(token: string): void {
        localStorage.setItem('token', token);
        this._token = token;
    }

    private removeToken(): void {
        localStorage.removeItem('token');
        this._token = undefined;
    }

    private getToken(): string | undefined {
        return this._token;
    }
}
