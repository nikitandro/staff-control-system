import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutWebComponent } from './components/auth-layout/auth-layout.web.component';
import { LoginPageWebComponent } from './components/login-page/login.page.web.component';
import { RegisterPageWebComponent } from './components/register-page/register.page.web.component';
import { authGuard } from './guards/authGuard';

const routes: Routes = [
    {
        path: '',
        component: AuthLayoutWebComponent,
        children: [
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: 'login', component: LoginPageWebComponent },
            { path: 'register', component: RegisterPageWebComponent },
            {
                path: 'private',
                canActivate: [authGuard],
                component: AuthLayoutWebComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
