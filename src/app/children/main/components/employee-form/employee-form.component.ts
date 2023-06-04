import { ChangeDetectionStrategy,
    Component,
    EventEmitter, Inject,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { FormArray, FormGroup } from '@angular/forms';
import { EMPLOYEE_FORM_DATA_TOKEN } from '../../data/tokens/employee-form-data.token';
import { IEmployeeFormField } from '../../data/interfaces/employee-form-field.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeRequestModel } from '../../data/request-models/employee.request-model.interface';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { IEmployeeVacation } from '../../data/interfaces/employee-vacation.interface';
import { IEmployeeAchievement } from '../../data/interfaces/employee-achievement.interface';
import { IEmployeeEducation } from '../../data/interfaces/employee-education.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { UpdateDataService } from '../../services/update-data.service';

@Component({
    selector: 'employee-form',
    templateUrl: 'employee-form.component.html',
    styleUrls: ['./styles/employee-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
    @Output()
    public isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

    public employeeFormLabels!: string[];

    public employeeFormFieldsArray!: FormArray;

    public employeeFormControlTypes!: string[];

    public employeeForm!: FormGroup;

    public employeePhoto?: string;

    private _employeeId!: number;

    private _employeeFormSubscription!: Subscription;

    private _routeSubscription!: Subscription;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _route: ActivatedRoute,
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeeFormData$: BehaviorSubject<IEmployeeFormData>,
        private _updateDataService: UpdateDataService
    ) {
    }

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._employeeId = params['employeeId'];
        });

        this.employeeFormData$
            .subscribe((data: IEmployeeFormData) => {
                if (!this.employeeFormData$.getValue()) {
                    return;
                }
                this.employeeFormLabels = data.employeeFormFields.map((field: IEmployeeFormField) => field.label);
                this.employeeFormFieldsArray = new FormArray(
                    data.employeeFormFields.map((field: IEmployeeFormField) => field.control)
                );
                this.employeeFormControlTypes = data.employeeFormFields.map((field: IEmployeeFormField) => field.controlType);
                this.employeeForm = new FormGroup({
                    employeeFormFields: this.employeeFormFieldsArray
                });
                this.employeePhoto = data.photo;
            }
            );
    }


    public ngOnDestroy(): void {
        if (this._employeeFormSubscription) {
            this._employeeFormSubscription.unsubscribe();
        }

        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
    }

    public get employeeFormFields(): FormArray {
        return this.employeeForm.controls['employeeFormFields'] as FormArray;
    }

    public onSubmit(): void {
        if (this.employeeForm.invalid) {
            this.employeeForm.markAllAsTouched();

            return;
        }

        const data: string[] = this.employeeForm.value.employeeFormFields;
        const typeData: string = this._route.snapshot.url[1].path;

        if (typeData === 'personal') {
            this.submitPersonalData(data);
        } else if (typeData === 'condition') {
            this.submitConditionData(data);
        } else if (typeData === 'contacts') {
            this.submitContactsData(data);
        } else if (typeData === 'experience') {
            this.submitExperienceData(data);
        } else if (typeData === 'vacation') {
            this.submitVacationData(data);
        } else if (typeData === 'achievements') {
            this.submitAchievementsData(data);
        } else if (typeData === 'education') {
            this.submitEducationData(data);
        }

        this.close();
    }

    public close(): void {
        this.isOpen.emit(false);
    }

    public submitPersonalData(data: string[]): void {
        let updateEmployee!: IEmployeeRequestModel;
        this._employeeDataService.getEmployeeData(this._employeeId)
            .pipe(
                switchMap((currentEmployeeData: IEmployeeResponseModel) => {
                    updateEmployee = currentEmployeeData;
                    updateEmployee.lastName = data[0];
                    updateEmployee.firstName = data[1];
                    updateEmployee.patronymic = data[2];
                    updateEmployee.birthDate = data[3];

                    return this._employeeDataService.updateEmployeeData(this._employeeId, updateEmployee);
                })
            ).subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }

    public submitConditionData(data: string[]): void {
        let updateEmployee!: IEmployeeRequestModel;
        this._employeeDataService.getEmployeeData(this._employeeId)
            .pipe(
                switchMap((currentEmployeeData: IEmployeeResponseModel) => {
                    updateEmployee = currentEmployeeData;
                    updateEmployee.departmentName = data[0];
                    updateEmployee.post = data[1];
                    updateEmployee.salary = Number(data[2]);
                    updateEmployee.workFormat = data[3];

                    return this._employeeDataService.updateEmployeeData(this._employeeId, updateEmployee);
                })
            ).subscribe(() => this._updateDataService.callMethodOfPageComponent());

    }

    public submitContactsData(data: string[]): void {
        let updateEmployee!: IEmployeeRequestModel;
        this._employeeDataService.getEmployeeData(this._employeeId)
            .pipe(
                switchMap((currentEmployeeData: IEmployeeResponseModel) => {
                    updateEmployee = currentEmployeeData;
                    updateEmployee.phoneNumber = data[0];
                    updateEmployee.workEmail = data[1];
                    updateEmployee.personalEmail = data[2];

                    return this._employeeDataService.updateEmployeeData(this._employeeId, updateEmployee);
                })
            ).subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }

    public submitExperienceData(data: string[]): void {
        let updateEmployee!: IEmployeeRequestModel;
        this._employeeDataService.getEmployeeData(this._employeeId)
            .pipe(
                switchMap((currentEmployeeData: IEmployeeResponseModel) => {
                    updateEmployee = currentEmployeeData;
                    updateEmployee.interviewDate = data[0];
                    updateEmployee.employmentDate = data[1];
                    updateEmployee.firstWorkDayDate = data[2];

                    return this._employeeDataService.updateEmployeeData(this._employeeId, updateEmployee);
                })
            ).subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }

    public submitVacationData(data: string[]): void {
        const newVacation: IEmployeeVacation = {
            vacationId: Date.now(),
            type: data[0],
            startDate: data[1],
            endDate: data[2]
        };
        let updateEmployee!: IEmployeeRequestModel;
        this._employeeDataService.getEmployeeData(this._employeeId)
            .pipe(
                switchMap((currentEmployeeData: IEmployeeResponseModel) => {
                    updateEmployee = currentEmployeeData;
                    updateEmployee.vacationsList.push(newVacation);

                    return this._employeeDataService.updateEmployeeData(this._employeeId, updateEmployee);
                })
            ).subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }

    public submitAchievementsData(data: string[]): void {
        const newAchievement: IEmployeeAchievement = {
            achievementId: Date.now(),
            type: data[0],
            supportDocument: data[1],
            date: data[2]
        };
        let updateEmployee!: IEmployeeRequestModel;
        this._employeeDataService.getEmployeeData(this._employeeId)
            .pipe(
                switchMap((currentEmployeeData: IEmployeeResponseModel) => {
                    updateEmployee = currentEmployeeData;
                    updateEmployee.achievementsList.push(newAchievement);

                    return this._employeeDataService.updateEmployeeData(this._employeeId, updateEmployee);
                })
            ).subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }

    public submitEducationData(data: string[]): void {
        const newEducation: IEmployeeEducation = {
            educationId: Date.now(),
            type: data[0],
            educationalInstitution: data[1],
            endDate: data[2],
            qualification: data[3]
        };
        let updateEmployee!: IEmployeeRequestModel;
        this._employeeDataService.getEmployeeData(this._employeeId)
            .pipe(
                switchMap((currentEmployeeData: IEmployeeResponseModel) => {
                    updateEmployee = currentEmployeeData;
                    updateEmployee.education.push(newEducation);

                    return this._employeeDataService.updateEmployeeData(this._employeeId, updateEmployee);
                })
            ).subscribe(() => this._updateDataService.callMethodOfPageComponent());
    }
}
