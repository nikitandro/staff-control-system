import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { FormControl, Validators } from '@angular/forms';
import { UpdateDataService } from '../../services/update-data.service';
import { IEmployeeRequestModel } from '../../data/request-models/employee.request-model.interface';
import { IEmployeePersonal } from '../../data/interfaces/employee-personal.interface';
import { IEmployeeContacts } from '../../data/interfaces/employee-contacts.inteface';
import { IEmployeeEducation } from '../../data/interfaces/employee-education.interface';
import { IEmployeeCondition } from '../../data/interfaces/employee-condition.inteface';
import { IEmployeeExperience } from '../../data/interfaces/employee-experience.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'employee-add',
    templateUrl: './employee-add.page.web.component.html',
    styleUrls: ['./styles/employee-add.page.web.component.scss']
})
export class EmployeeAddPageWebComponent implements OnInit {
    public employeeAddFormDataList!: IEmployeeFormData[];

    public personalData!: IEmployeePersonal;
    public contactsData!: IEmployeeContacts;
    public educationData!: IEmployeeEducation;
    public conditionData!: IEmployeeCondition;
    public experienceData!: IEmployeeExperience;

    constructor(
        private _ref: ChangeDetectorRef,
        private _router: Router,
        private _updateDataService: UpdateDataService,
        private _employeeDataService: EmployeeDataService
    ) {
    }

    public ngOnInit(): void {
        this.employeeAddFormDataList = [
            {
                employeeFormFields: [
                    {
                        label: 'Фамилия:',
                        control: new FormControl('', [
                            Validators.required,
                            Validators.pattern(/^[а-я]+$/i)
                        ]),
                        controlType: 'text'
                    },
                    {
                        label: 'Имя:',
                        control: new FormControl('', [
                            Validators.required,
                            Validators.pattern(/^[а-я]+$/i)
                        ]),
                        controlType: 'text'
                    },
                    {
                        label: 'Отчество:',
                        control: new FormControl('', [
                            Validators.required,
                            Validators.pattern(/^[а-я]+$/i)
                        ]),
                        controlType: 'text'
                    },
                    {
                        label: 'Дата рождения',
                        control: new FormControl('', [
                            Validators.required
                        ]),
                        controlType: 'date'
                    }
                ]
            },
            {
                employeeFormFields: [
                    {
                        label: 'Номер телефона:',
                        control: new FormControl('', [
                            Validators.required
                        ]),
                        controlType: 'tel'
                    },
                    {
                        label: 'Рабочая почта:',
                        control: new FormControl('', [
                            Validators.required,
                            Validators.email
                        ]),
                        controlType: 'email'
                    },
                    {
                        label: 'Личная почта:',
                        control: new FormControl('', [
                            Validators.required,
                            Validators.email
                        ]),
                        controlType: 'email'
                    }
                ]
            },
            {
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
            },
            {
                employeeFormFields: [
                    {
                        label: 'Отдел:',
                        control: new FormControl('', [
                            Validators.required
                        ]),
                        controlType: 'text'
                    },
                    {
                        label: 'Должность:',
                        control: new FormControl('', [
                            Validators.required
                        ]),
                        controlType: 'text'
                    },
                    {
                        label: 'Заработная плата (в рублях):',
                        control: new FormControl('', [
                            Validators.required
                        ]),
                        controlType: 'number'
                    },
                    {
                        label: 'Формат работы:',
                        control: new FormControl('', [
                            Validators.required
                        ]),
                        controlType: 'text'
                    }
                ]
            },
            {
                employeeFormFields: [
                    {
                        label: 'Дата собеседования:',
                        control: new FormControl('', [
                            Validators.required
                        ]),
                        controlType: 'date'
                    },
                    {
                        label: 'Дата подтверждения оффера:',
                        control: new FormControl('', [
                            Validators.required
                        ]),
                        controlType: 'date'
                    },
                    {
                        label: 'Дата первого рабочего дня:',
                        control: new FormControl('', [
                            Validators.required
                        ]),
                        controlType: 'date'
                    }
                ]
            }
        ];

        this._ref.detectChanges();
    }

    public addEmployee(): void {
        this._updateDataService.callMethodOfPageComponent();
        if (!this.personalData && !this.contactsData && !this.conditionData && !this.experienceData && !this.educationData) {
            return;
        }
        const newEmployee: IEmployeeRequestModel = {
            id: Date.now(),
            firstName: this.personalData.firstName,
            lastName: this.personalData.lastName,
            patronymic: this.personalData.patronymic,
            birthDate: this.personalData.birthDate,
            phoneNumber: this.contactsData.phoneNumber,
            workEmail: this.contactsData.workEmail,
            personalEmail: this.contactsData.personalEmail,
            departmentName: this.conditionData.departmentName,
            post: this.conditionData.post,
            salary: this.conditionData.salary,
            workFormat: this.conditionData.workFormat,
            achievementsList: [],
            interviewDate: this.experienceData.interviewDate,
            employmentDate: this.experienceData.employmentDate,
            firstWorkDayDate: this.experienceData.firstWorkDayDate,
            departmentId: '',
            postId: '',
            successRate: '',
            isFired: true,
            vacationsList: [],
            salaryIncreaseList: [],
            education: [
                {
                    educationId: this.educationData.educationId,
                    type: this.educationData.type,
                    educationalInstitution: this.educationData.educationalInstitution,
                    endDate: this.educationData.endDate,
                    qualification: this.educationData.qualification
                }
            ],
            salaryHistory: [],
            firingDate: ''
        };

        this._employeeDataService.addEmployee(newEmployee)
            .subscribe(() => {
                alert('Сотрудник успешно добавлен');
                this._router.navigate(['/cabinet']);
            });
    }

    public getPersonalData(addPersonalData: string[]): void {
        this.personalData = {
            lastName: addPersonalData[0],
            firstName: addPersonalData[1],
            patronymic: addPersonalData[2],
            birthDate: addPersonalData[3],
        };
    }

    public getContactsData(addContactsData: string[]): void {
        this.contactsData = {
            phoneNumber: addContactsData[0],
            workEmail: addContactsData[1],
            personalEmail: addContactsData[2]
        };
    }

    public getEducationData(addEducationData: string[]): void {
        this.educationData = {
            educationId: Date.now(),
            type: addEducationData[0],
            educationalInstitution: addEducationData[1],
            endDate: addEducationData[2],
            qualification: addEducationData[3]
        };
    }

    public getConditionData(addConditionData: string[]): void {
        this.conditionData = {
            departmentName: addConditionData[0],
            post: addConditionData[1],
            salary: Number(addConditionData[2]),
            workFormat: addConditionData[3]
        };
    }

    public getExperienceData(addExperienceData: string[]): void {
        this.experienceData = {
            interviewDate: addExperienceData[0],
            employmentDate: addExperienceData[1],
            firstWorkDayDate: addExperienceData[2]
        };
    }
}
