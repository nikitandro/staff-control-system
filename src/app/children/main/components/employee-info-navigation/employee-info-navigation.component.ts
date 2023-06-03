import { Component } from '@angular/core';
import { IEmployeeNavigationButton } from '../../data/interfaces/employee-navigation-button.interface';

@Component({
    selector: 'employee-info-navigation',
    templateUrl: './employee-info-navigation.component.html',
    styleUrls: ['./styles/employee-info-navigation.component.scss']
})
export class EmployeeInfoNavigationComponent {
    public employeeNavigationButtons: IEmployeeNavigationButton[] = [
        {
            title: 'Личная информация',
            iconSrc: '/assets/images/icons/navigate-button-personal-info.svg',
            pageRoute: 'personal'
        },
        {
            title: 'Контакты',
            iconSrc: '/assets/images/icons/navigate-button-contacts.svg',
            pageRoute: 'contacts'
        },
        {
            title: 'Образование',
            iconSrc: '/assets/images/icons/navigate-button-education.svg',
            pageRoute: 'education'
        },
        {
            title: 'Условия работы',
            iconSrc: '/assets/images/icons/navigate-button-working-conditions.svg',
            pageRoute: 'condition'
        },
        {
            title: 'Отпуска сотрудника',
            iconSrc: '/assets/images/icons/navigate-button-work-experience.svg',
            pageRoute: 'experience'
        },
        {
            title: 'Стаж работы',
            iconSrc: '/assets/images/icons/navigate-button-vacation-history.svg',
            pageRoute: 'vacation'
        },
        {
            title: 'Достижения сотрудника',
            iconSrc: '/assets/images/icons/navigate-button-achievements.svg',
            pageRoute: 'achievements'
        },
    ];

}
