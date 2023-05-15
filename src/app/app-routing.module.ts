import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () => import('./children/auth/auth-routing.module').then(module => module.AuthRoutingModule),
    },
    {
        path: 'cabinet',
        loadChildren: () => import('./children/main/main-routing.module').then(module => module.MainRoutingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
