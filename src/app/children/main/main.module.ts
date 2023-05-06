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
        EmployeeDataService
    ],
})
export class MainModule {
}
