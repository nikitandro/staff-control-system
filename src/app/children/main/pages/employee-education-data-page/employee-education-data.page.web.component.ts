import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { IEmployeeEducation } from '../../data/interfaces/employee-education.interface';
import { EMPLOYEE_FORM_DATA_TOKEN } from '../../data/tokens/employee-form-data.token';
import { BehaviorSubject } from 'rxjs';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'employee-education-data',
    templateUrl: 'employee-education-data.page.web.component.html',
    styleUrls: ['./styles/employee-education-data.page.web.component.scss'],
})
export class EmployeeEducationDataPageWebComponent implements OnInit {
    public isPopupOpen: boolean = false;

    public canAdd: boolean = true;
    public addTitle: string = 'Добавить образование';

    public employeeEducationCardDataList: IEmployeeCardData[] = [];

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeeEducationFormData$: BehaviorSubject<IEmployeeFormData>
    ) {
    }

    public ngOnInit(): void {
        this._employeeDataService.getEmployeeData(2)
            .subscribe((data: IEmployeeResponseModel) => {
                data.education.forEach((educationItem: IEmployeeEducation) => {
                    this.employeeEducationCardDataList.push(
                        {
                            title: 'Образованние',
                            employeeCardFields: [
                                {
                                    label: 'Вид:',
                                    data: educationItem.type
                                },
                                {
                                    label: 'Учебное заведение:',
                                    data: educationItem.educationalInstitution
                                },
                                {
                                    label: 'Дата окончания:',
                                    data: new Date(educationItem.endDate).toLocaleDateString()
                                },
                                {
                                    label: 'Квалификация по выпуску:',
                                    data: educationItem.qualification
                                }
                            ],
                            canEdit: false,
                            canDelete: true
                        }
                    );
                });

                this.employeeEducationFormData$.next({
                    employeeFormFields: [
                        {
                            label: 'Вид:',
                            control: new FormControl('', Validators.required)
                        },
                        {
                            label: 'Учебное заведение:',
                            control: new FormControl('', Validators.required)
                        },
                        {
                            label: 'Дата окончания:',
                            control: new FormControl('', Validators.required)
                        },
                        {
                            label: 'Квалификация по выпуску:',
                            control: new FormControl('', Validators.required)
                        }
                    ]
                });

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
        //TODO: Реализовать добавление карточки
    }

    public delete(): void {
        //TODO: Реализовать удаление карточки
    }
}
