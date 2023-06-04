import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { AuthModule } from './children/auth/auth.module';
import { MainModule } from './children/main/main.module';
import { GlobalErrorHandler } from './global-error-handler/global-error-handler';
import {NotFoundComponent} from './component/not-found/not-found.component';

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
        }
    ],
    exports: [
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
