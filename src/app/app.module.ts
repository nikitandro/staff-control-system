import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './component/app.component';
import {AuthModule} from './children/auth/auth.module';
import {MainModule} from './children/main/main.module';
import {GlobalErrorHandler} from './global-error-handler/global-error-handler';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './data/services/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        MainModule
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    exports: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
