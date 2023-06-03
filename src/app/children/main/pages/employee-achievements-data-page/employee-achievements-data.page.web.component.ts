import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { EMPLOYEE_FORM_DATA_TOKEN } from '../../data/tokens/employee-form-data.token';
import { BehaviorSubject } from 'rxjs';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { FormControl, Validators } from '@angular/forms';
import { IEmployeeAchievement } from '../../data/interfaces/employee-achievement.interface';

@Component({
    selector: 'employee-achievements-data',
    templateUrl: 'employee-achievements-data.page.web.component.html',
    styleUrls: ['./styles/employee-achievements-data.page.web.component.scss'],
})
export class EmployeeAchievementsDataPageWebComponent implements OnInit {
    public isPopupOpen: boolean = false;

    public canAdd: boolean = true;
    public addTitle: string = 'Добавить достижение';

    public employeeAchievementsCardDataList: IEmployeeCardData[] = [];

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeeAchievementsFormData$: BehaviorSubject<IEmployeeFormData>
    ) {
    }

    public ngOnInit(): void {
        this._employeeDataService.getEmployeeData(2)
            .subscribe((data: IEmployeeResponseModel) => {
                data.achievements.forEach((achievement: IEmployeeAchievement) => {
                    this.employeeAchievementsCardDataList.push(
                        {
                            title: 'Достижения сотрудника',
                            employeeCardFields: [
                                {
                                    label: 'Вид:',
                                    data: achievement.type
                                },
                                {
                                    label: 'Подтверждающий документ:',
                                    data: achievement.supportDocument
                                },
                                {
                                    label: 'Дата:',
                                    data: new Date(achievement.date).toLocaleDateString()
                                },
                            ],
                            canEdit: false,
                            canDelete: true
                        }
                    );
                });

                this.employeeAchievementsFormData$.next({
                    employeeFormFields: [
                        {
                            label: 'Вид:',
                            control: new FormControl('', Validators.required)
                        },
                        {
                            label: 'Подтверждающий документ:',
                            control: new FormControl('', Validators.required)
                        },
                        {
                            label: 'Дата:',
                            control: new FormControl('', Validators.required)
                        },
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
