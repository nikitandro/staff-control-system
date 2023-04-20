import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginPageWebComponent } from './components/login-page/login.page.web.component';
import { RegisterPageWebComponent } from './components/register-page/register.page.web.component';
import { AuthLayoutWebComponent } from './components/auth-layout/auth-layout.web.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ValidationMessageComponent } from './components/validation/message.validation.component';

const components: any[] = [
    LoginPageWebComponent,
    RegisterPageWebComponent,
    AuthLayoutWebComponent,
];

@NgModule({
    declarations: [...components],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        RouterModule,
        AppRoutingModule,
        ValidationMessageComponent
    ],
    exports: [LoginPageWebComponent, RegisterPageWebComponent],
    providers: [],
})
export class AuthModule {}
