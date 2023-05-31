import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { FormControl, Validators } from '@angular/forms';

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

    constructor(private _ref: ChangeDetectorRef) {
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

        this._ref.detectChanges();
    }

    public addEmployee(): void {

    }
}
