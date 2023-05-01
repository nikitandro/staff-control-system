import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmployeeListPageComponent } from './pages/employee-list-page/employee-list-page.component';
import { authGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'employee-list/1',
                pathMatch: 'full'
            },
            {
                path: 'employee-list/:page',
                component: EmployeeListPageComponent
            },
            {
                path: 'employee-info/:employeeId',
                children: [
                    {
                        path: 'personal',
                        component: EmployeeListPageComponent
                    },
                    {
                        path: 'contacts',
                        component: EmployeeListPageComponent
                    },
                    {
                        path: 'education',
                        component: EmployeeListPageComponent
                    },
                    {
                        path: 'condition',
                        component: EmployeeListPageComponent
                    },
                    {
                        path: 'experience',
                        component: EmployeeListPageComponent
                    },
                    {
                        path: 'vacation',
                        component: EmployeeListPageComponent
                    },
                    {
                        path: 'achievements',
                        component: EmployeeListPageComponent
                    }
                ]
            },

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {
}
