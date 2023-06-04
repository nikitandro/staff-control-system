import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {authGuard} from './children/auth/guards/auth.guard';


const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./children/auth/auth-routing.module').then(module => module.AuthRoutingModule),
    },
    {
        path: 'cabinet',
        canActivate: [authGuard],
        loadChildren: () => import('./children/main/main-routing.module').then(module => module.MainRoutingModule),
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
