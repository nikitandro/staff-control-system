import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './children/auth/auth.module';
import { MainModule } from './children/main/main.module';
import { MainHeaderComponent } from './children/main/components/header/main-header.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        MainModule
    ],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
