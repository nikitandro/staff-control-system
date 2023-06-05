import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { EMPLOYEE_FORM_DATA_TOKEN } from '../../data/tokens/employee-form-data.token';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { FormControl, Validators } from '@angular/forms';
import { IEmployeeAchievement } from '../../data/interfaces/employee-achievement.interface';
import { UpdateDataService } from '../../services/update-data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'employee-achievements-data',
    templateUrl: 'employee-achievements-data.page.web.component.html',
    styleUrls: ['./styles/employee-achievements-data.page.web.component.scss'],
})
export class EmployeeAchievementsDataPageWebComponent implements OnInit, OnDestroy {
    public isPopupOpen: boolean = false;

    public canAdd: boolean = true;
    public addTitle: string = 'Добавить достижение';

    public employeeAchievementsCardDataList: IEmployeeCardData[] = [];

    public loader: boolean = true;
    private _employeeId!: number;

    private _routeSubscription!: Subscription;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        private _route: ActivatedRoute,
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeeAchievementsFormData$: BehaviorSubject<IEmployeeFormData>,
        private _updateDataService: UpdateDataService
    ) {
        this._updateDataService.invokeEvent.subscribe((value: boolean) => {
            if (value) {
                this.getAchievementList();
            }
        });
    }

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._employeeId = params['employeeId'];
        });

        this.getAchievementList();
    }

    public ngOnDestroy(): void {
        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
    }

    public getAchievementList(): void {
        this.employeeAchievementsCardDataList = [];
        this._employeeDataService.getEmployeeData(this._employeeId)
            .subscribe((data: IEmployeeResponseModel) => {
                data.achievements.forEach((achievement: IEmployeeAchievement) => {
                    this.employeeAchievementsCardDataList.push(
                        {
                            id: achievement.achievementId,
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
                            control: new FormControl('', [
                                Validators.required
                            ]),
                            controlType: 'text'
                        },
                        {
                            label: 'Подтверждающий документ:',
                            control: new FormControl('', [
                                Validators.required
                            ]),
                            controlType: 'text'
                        },
                        {
                            label: 'Дата:',
                            control: new FormControl('', [
                                Validators.required
                            ]),
                            controlType: 'date'
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
