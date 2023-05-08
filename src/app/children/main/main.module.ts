import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmployeeListPageComponent } from './pages/employee-list-page/employee-list-page.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/header/main-header.component';
import { BurgerButtonComponent } from './components/burger-button/burger-button.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { DropDownListComponent } from './components/drop-down-list/drop-down-list.component';
import { FilterService } from './services/filter.service';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SalaryPickerComponent } from './components/salary-picker/salary-picker.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeePersonalDataPageWebComponent } from './pages/employee-personal-data-page/employee-personal-data.page.web.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { PopupComponent } from './components/popup/popup.component';
import { EmployeeDataService } from './data/services/employee-data.service';
import { EmployeeInfoNavigationComponent } from './components/employee-info-navigation/employee-info-navigation.component';
import { NavigationButtonComponent } from './components/navigation-button/navigation-button.component';
import { EmployeeInfoLayoutComponent } from './layouts/employee-info-layout/employee-info-layout.component';
import { EMPLOYEE_FORM_DATA_TOKEN } from './data/tokens/employee-form-data.token';
import { BehaviorSubject } from 'rxjs';
import { IEmployeeFormData } from './data/interfaces/employee-form-data.interface';
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



@NgModule({
    declarations: [
        MainLayoutComponent,
        EmployeeListPageComponent,
        MainHeaderComponent,
        BurgerButtonComponent,
        FilterFormComponent,
        DropDownListComponent,
        CheckboxComponent,
        EmployeeCardComponent,
        EmployeeFormComponent,
        PopupComponent,
        SalaryPickerComponent,
        EmployeePersonalDataPageWebComponent,
        EmployeeInfoNavigationComponent,
        NavigationButtonComponent,
        EmployeeInfoLayoutComponent,
        EmployeeEducationDataPageWebComponent,
        EmployeeContactsDataPageWebComponent,
        EmployeeConditionDataPageWebComponent,
        EmployeeAchievementsDataPageWebComponent,
        EmployeeVacationDataPageWebComponent,
        EmployeeExperienceDataPageWebComponent
    ],
    exports: [],
    imports: [
        RouterModule,
        CommonModule,
        NgxSliderModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        FilterService,
        EmployeeDataService,
        {
            provide: EMPLOYEE_FORM_DATA_TOKEN,
            useValue: new BehaviorSubject<IEmployeeFormData | null>(null)
        }
    ],
})
export class MainModule {
}
