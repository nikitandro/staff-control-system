import { Component, OnInit } from '@angular/core';
import { IEmployeeNavigationButton } from '../../data/interfaces/employee-navigation-button.interface';

@Component({
    selector: 'employee-info-navigation',
    templateUrl: './employee-info-navigation.component.html',
    styleUrls: ['./styles/employee-info-navigation.component.scss']
})
export class EmployeeInfoNavigationComponent implements OnInit{

    public id!: number;

    public employeeNavigationButtons: IEmployeeNavigationButton[] = [];


    constructor() {
    }

    public ngOnInit(): void {
        this.id = Number(window.location.pathname.split('/')[3]);
        this.employeeNavigationButtons = [
            {
                title: 'Личная информация',
                iconSrc: '/assets/images/icons/navigate-button-personal-info.svg',
                pageRoute: `${this.id}/personal`
            },
            {
                title: 'Контакты',
                iconSrc: '/assets/images/icons/navigate-button-contacts.svg',
                pageRoute: `${this.id}/contacts`
            },
            {
                title: 'Образование',
                iconSrc: '/assets/images/icons/navigate-button-education.svg',
                pageRoute: `${this.id}/education`
            },
            {
                title: 'Условия работы',
                iconSrc: '/assets/images/icons/navigate-button-working-conditions.svg',
                pageRoute: `${this.id}/condition`
            },
            {
                title: 'Стаж работы',
                iconSrc: '/assets/images/icons/navigate-button-work-experience.svg',
                pageRoute: `${this.id}/experience`
            },
            {
                title: 'Отпуска сотрудника',
                iconSrc: '/assets/images/icons/navigate-button-vacation-history.svg',
                pageRoute: `${this.id}/vacation`
            },
            {
                title: 'Достижения сотрудника',
                iconSrc: '/assets/images/icons/navigate-button-achievements.svg',
                pageRoute: `${this.id}/achievements`
            },
        ];
    }

}
