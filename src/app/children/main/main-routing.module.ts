import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmployeeListPageComponent } from './pages/employee-list-page/employee-list-page.component';
import { authGuard } from '../auth/guards/auth.guard';
import {
    EmployeePersonalDataPageWebComponent
} from './pages/employee-personal-data-page/employee-personal-data.page.web.component';
import { EmployeeInfoLayoutComponent } from './layouts/employee-info-layout/employee-info-layout.component';

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
                        component: EmployeePersonalDataPageWebComponent
                    }
                ]
            }
        ],
    },
    {
        path: 'employee-info',
        component: EmployeeInfoLayoutComponent,
        children: [
            {
                path: ':employeeId/personal',
                component: EmployeeListPageComponent
            },
            {
                path: ':employeeId/contacts',
                component: EmployeeListPageComponent
            },
            {
                path: ':employeeId/education',
                component: EmployeeListPageComponent
            },
            {
                path: ':employeeId/condition',
                component: EmployeeListPageComponent
            },
            {
                path: ':employeeId/experience',
                component: EmployeeListPageComponent
            },
            {
                path: ':employeeId/vacation',
                component: EmployeeListPageComponent
            },
            {
                path: ':employeeId/achievements',
                component: EmployeeListPageComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {
}
