import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutWebComponent } from './components/auth-layout/auth-layout.web.component';
import { LoginPageWebComponent } from './components/login-page/login.page.web.component';
import { RegisterPageWebComponent } from './components/register-page/register.page.web.component';
import { isLoggedInGuard } from './guards/isLoggedIn.guard';

const routes: Routes = [
    {
        path: '',
        component: AuthLayoutWebComponent,
        canActivate: [isLoggedInGuard],
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginPageWebComponent },
            { path: 'register', component: RegisterPageWebComponent }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
