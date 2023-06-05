import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { FormControl, Validators } from '@angular/forms';
import { EMPLOYEE_ADD_TOKEN } from '../../data/tokens/employee-add.token';
import { Subject } from 'rxjs';

@Component({
    selector: 'employee-add',
    templateUrl: './employee-add.page.web.component.html',
    styleUrls: ['./styles/employee-add.page.web.component.scss']
})
export class EmployeeAddPageWebComponent implements OnInit {
    public employeeAddFormDataList!: IEmployeeFormData[];

    public titleList: string[] = [
        'Личная информация',
        'Контакты',
        'Образование',
        'Условия работы',
        'Стаж работы'
    ];

    public loader: boolean = true;

    constructor(
        private _ref: ChangeDetectorRef,
        @Inject(EMPLOYEE_ADD_TOKEN) public employeeAdd$: Subject<boolean>
    ) {
    }

    public ngOnInit(): void {
        this.employeeAddFormDataList = [
            {
                employeeFormFields: [
                    {
                        label: 'Фамилия:',
                        control: new FormControl('', Validators.required)
                    },
                    {
                        label: 'Имя:',
                        control: new FormControl('', Validators.required)
                    },
                    {
                        label: 'Отчество:',
                        control: new FormControl('', Validators.required)
                    },
                    {
                        label: 'Дата рождения',
                        control: new FormControl('', Validators.required)
                    }
                ]
            },
            {
                employeeFormFields: [
                    {
                        label: 'Номер телефона:',
                        control: new FormControl('', Validators.required)
                    },
                    {
                        label: 'Рабочая почта:',
                        control: new FormControl('', Validators.required)
                    },
                    {
                        label: 'Личная почта:',
                        control: new FormControl('', Validators.required)
                    }
                ]
            },
            {
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
            },
            {
                employeeFormFields: [
                    {
                        label: 'Отдел:',
                        control: new FormControl('', Validators.required)
                    },
                    {
                        label: 'Должность:',
                        control: new FormControl('', Validators.required)
                    },
                    {
                        label: 'Заработная плата (в рублях):',
                        control: new FormControl('', Validators.required)
                    },
                    {
                        label: 'Формат работы:',
                        control: new FormControl('', Validators.required)
                    }
                ]
            },
            {
                employeeFormFields: [
                    {
                        label: 'Дата собеседования:',
                        control: new FormControl('', Validators.required)
                    },
                    {
                        label: 'Дата подтверждения оффера:',
                        control: new FormControl('', Validators.required)
                    },
                    {
                        label: 'Дата первого рабочего дня:',
                        control: new FormControl('', Validators.required)
                    }
                ]
            }
        ];
        this.loader = false;
        this._ref.detectChanges();
    }

    public personalData!: string[];
    public contactsData!: string[];

    public addEmployee(): void {
        //... дернуть методы в формах
        this.employeeAdd$.next(true);
    }

    public getPersonalData(pD: string[]): void {
        this.personalData = pD;
        console.log(this.personalData);
    }

    public getContactsData(cD: string[]): void {
        this.contactsData = cD;
        console.log(this.contactsData);
    }
}
