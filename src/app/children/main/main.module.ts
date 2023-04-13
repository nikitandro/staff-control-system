import { forwardRef, NgModule } from '@angular/core';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmployeeListPageComponent } from './pages/employee-list-page/employee-list-page.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppModule } from '../../app.module';
import { MainHeaderComponent } from './components/header/main-header.component';
import { BurgerButtonComponent } from './components/burger-button/burger-button.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { DropDownListComponent } from './components/drop-down-list/drop-down-list.component';
import { FilterService } from './services/filter.service';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SalaryPickerComponent } from './components/salary-picker/salary-picker.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MainLayoutComponent,
        EmployeeListPageComponent,
        MainHeaderComponent,
        BurgerButtonComponent,
        FilterFormComponent,
        DropDownListComponent,
        CheckboxComponent,
        SalaryPickerComponent
    ],
    exports: [],
    imports: [
        RouterModule,
        CommonModule,
        NgxSliderModule,
        FormsModule,
    ],
    providers: [
        FilterService
    ],
})
export class MainModule {
}
