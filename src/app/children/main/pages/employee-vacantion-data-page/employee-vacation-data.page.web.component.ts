import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { EMPLOYEE_FORM_DATA_TOKEN } from '../../data/tokens/employee-form-data.token';
import { BehaviorSubject } from 'rxjs';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { FormControl, Validators } from '@angular/forms';
import { IEmployeeVacation } from '../../data/interfaces/employee-vacation.interface';

@Component({
    selector: 'employee-vacation-data',
    templateUrl: 'employee-vacation-data.page.web.component.html',
    styleUrls: ['./styles/employee-vacation-data.page.web.component.scss'],
})
export class EmployeeVacationDataPageWebComponent implements OnInit {
    public isPopupOpen: boolean = false;

    public canAdd: boolean = true;
    public addTitle: string = 'Добавить отпуск';

    public employeeVacationCardDataList: IEmployeeCardData[] = [];

    public loader: boolean = true;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeeVacationFormData$: BehaviorSubject<IEmployeeFormData>
    ) {
    }

    public ngOnInit(): void {
        this.getVacationList();
    }

    public getVacationList(): void {
        this.employeeVacationCardDataList = [];
        this._employeeDataService.getEmployeeData(2)
            .subscribe((data: IEmployeeResponseModel) => {
                data.vacationsList.forEach((vacation: IEmployeeVacation) => {
                    this.employeeVacationCardDataList.push(
                        {
                            id: vacation.vacationId,
                            title: 'Отпуска сотрудника',
                            employeeCardFields: [
                                {
                                    label: 'Вид:',
                                    data: vacation.type
                                },
                                {
                                    label: 'Дата начала:',
                                    data: new Date(vacation.startDate).toLocaleDateString()
                                },
                                {
                                    label: 'Дата окончая:',
                                    data: new Date(vacation.endDate).toLocaleDateString()
                                },
                            ],
                            canEdit: false,
                            canDelete: true
                        }
                    );
                });

                this.employeeVacationFormData$.next({
                    employeeFormFields: [
                        {
                            label: 'Вид:',
                            control: new FormControl('', Validators.required)
                        },
                        {
                            label: 'Дата начала:',
                            control: new FormControl('', Validators.required)
                        },
                        {
                            label: 'Дата окончая:',
                            control: new FormControl('', Validators.required)
                        },
                    ]
                });
                this.loader = false;
                this._ref.detectChanges();
            });
    }

    public open(): void {
        this.isPopupOpen = !this.isPopupOpen;
    }

    public close(isOpen: boolean): void {
        this.isPopupOpen = isOpen;
    }

    public add(): void {
        this.open();
    }
}
