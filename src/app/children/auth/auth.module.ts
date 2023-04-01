import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/login-page/login.page.web.component';
import { RegisterPageComponent } from './components/register-page/register.page.web.component';
import { CommonModule } from '@angular/common';


const components: any[] = [
    LoginPageComponent,
    RegisterPageComponent
];

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule
    ],
    exports: [
        LoginPageComponent,
        RegisterPageComponent
    ],
    providers: []
})
export class AuthModule {}
