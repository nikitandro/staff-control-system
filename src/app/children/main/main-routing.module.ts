import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmployeeListPageComponent } from './pages/employee-list-page/employee-list-page.component';
import {
    EmployeePersonalDataPageWebComponent
} from './pages/employee-personal-data-page/employee-personal-data.page.web.component';
import { EmployeeInfoLayoutComponent } from './layouts/employee-info-layout/employee-info-layout.component';
import {
    EmployeeEducationDataPageWebComponent
} from './pages/employee-education-data-page/employee-education-data.page.web.component';
import {
    EmployeeContactsDataPageWebComponent
} from './pages/employee-contacts-data-page/employee-contacts-data.page.web.component';
import {
    EmployeeConditionDataPageWebComponent
} from './pages/employee-condition-data-page/employee-condition-data.page.web.component';
import {
    EmployeeAchievementsDataPageWebComponent
} from './pages/employee-achievements-data-page/employee-achievements-data.page.web.component';
import {
    EmployeeVacationDataPageWebComponent
} from './pages/employee-vacantion-data-page/employee-vacation-data.page.web.component';
import {
    EmployeeExperienceDataPageWebComponent
} from './pages/employee-experience-data-page/employee-experience-data.page.web.component';
import { EmployeeAddLayoutComponent } from './layouts/employee-add-layout/employee-add-layout.component';
import { EmployeeAddPageWebComponent } from './pages/employee-add-page/employee-add.page.web.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'employee-list',
                pathMatch: 'full'
            },
            {
                path: 'employee-list',
                component: EmployeeListPageComponent
            },
        ],
    },
    {
        path: 'employee-info',
        component: EmployeeInfoLayoutComponent,
        children: [
            {
                path: ':employeeId/personal',
                component: EmployeePersonalDataPageWebComponent
            },
            {
                path: ':employeeId/contacts',
                component: EmployeeContactsDataPageWebComponent
            },
            {
                path: ':employeeId/education',
                component: EmployeeEducationDataPageWebComponent
            },
            {
                path: ':employeeId/condition',
                component: EmployeeConditionDataPageWebComponent
            },
            {
                path: ':employeeId/experience',
                component: EmployeeExperienceDataPageWebComponent
            },
            {
                path: ':employeeId/vacation',
                component: EmployeeVacationDataPageWebComponent
            },
            {
                path: ':employeeId/achievements',
                component: EmployeeAchievementsDataPageWebComponent
            }
        ]
    },
    {
        path: 'employee-add',
        component: EmployeeAddLayoutComponent,
        children: [
            {
                path: '',
                component: EmployeeAddPageWebComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {
}
