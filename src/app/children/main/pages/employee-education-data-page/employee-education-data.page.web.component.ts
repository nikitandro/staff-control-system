import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { IEmployeeEducation } from '../../data/interfaces/employee-education.interface';
import { EMPLOYEE_FORM_DATA_TOKEN } from '../../data/tokens/employee-form-data.token';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { FormControl, Validators } from '@angular/forms';
import { UpdateDataService } from '../../services/update-data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'employee-education-data',
    templateUrl: 'employee-education-data.page.web.component.html',
    styleUrls: ['./styles/employee-education-data.page.web.component.scss'],
})
export class EmployeeEducationDataPageWebComponent implements OnInit, OnDestroy {
    public isPopupOpen: boolean = false;

    public canAdd: boolean = true;
    public addTitle: string = 'Добавить образование';

    public employeeEducationCardDataList: IEmployeeCardData[] = [];
    public loader: boolean = true;

    private _employeeId!: number;

    private _routeSubscription!: Subscription;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _ref: ChangeDetectorRef,
        private _route: ActivatedRoute,
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeeEducationFormData$: BehaviorSubject<IEmployeeFormData>,
        private _updateDataService: UpdateDataService
    ) {
        this._updateDataService.invokeEvent.subscribe((value: boolean) => {
            if (value) {
                this.getEducationList();
            }
        });
    }

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._employeeId = params['employeeId'];
        });

        this.getEducationList();
    }

    public ngOnDestroy(): void {
        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
    }

    public getEducationList(): void {
        this.employeeEducationCardDataList = [];
        this._employeeDataService.getEmployeeData(this._employeeId)
            .subscribe((data: IEmployeeResponseModel) => {
                data.education.forEach((educationItem: IEmployeeEducation) => {
                    this.employeeEducationCardDataList.push(
                        {
                            id: educationItem.educationId,
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
                            control: new FormControl('', [
                                Validators.required
                            ]),
                            controlType: 'text'
                        },
                        {
                            label: 'Учебное заведение:',
                            control: new FormControl('', [
                                Validators.required
                            ]),
                            controlType: 'text'
                        },
                        {
                            label: 'Дата окончания:',
                            control: new FormControl('', [
                                Validators.required
                            ]),
                            controlType: 'date'
                        },
                        {
                            label: 'Квалификация по выпуску:',
                            control: new FormControl('', [
                                Validators.required
                            ]),
                            controlType: 'text'
                        }
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
