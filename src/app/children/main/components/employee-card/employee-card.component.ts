import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { IEmployeeCardData } from '../../data/interfaces/employee-card-data.interface';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { IEmployeeEducation } from '../../data/interfaces/employee-education.interface';
import { IEmployeeRequestModel } from '../../data/request-models/employee.request-model.interface';
import { IEmployeeVacation } from '../../data/interfaces/employee-vacation.interface';
import { IEmployeeAchievement } from '../../data/interfaces/employee-achievement.interface';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'employee-card',
    templateUrl: 'employee-card.component.html',
    styleUrls: ['./styles/employee-card.component.scss'],
})
export class EmployeeCardComponent implements OnInit, OnDestroy {
    @Output()
    public isEdit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    @Output()
    public emitUpdateDataMethod: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    public isEditINP: boolean = false;

    @Input()
    public employeeCardData!: IEmployeeCardData;

    private _employeeId!: number;

    private _routeSubscription!: Subscription;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _route: ActivatedRoute
    ) {
    }

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._employeeId = params['employeeId'];
        });
    }

    public ngOnDestroy(): void {
        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
    }

    public edit(): void {
        this.isEdit$.next(!this.isEditINP);
    }

    public callUpdateDataMethod(): void {
        this.emitUpdateDataMethod.emit(true);
    }

    public delete(id: number | undefined): void {
        let employee!: IEmployeeRequestModel;
        const typeData: string = this._route.snapshot.url[1].path;
        this._employeeDataService.getEmployeeData(this._employeeId)
            .pipe(
                switchMap((data: IEmployeeResponseModel) => {
                    employee = data;
                    if (typeData === 'education') {
                        employee.education = employee.education.filter((education: IEmployeeEducation) => {
                            return education.educationId !== id;
                        });
                    } else if (typeData === 'vacation') {
                        employee.vacationsList = employee.vacationsList.filter((vacation: IEmployeeVacation) => {
                            return vacation.vacationId !== id;
                        });
                    } else if (typeData === 'achievements') {
                        employee.achievementsList = employee.achievementsList.filter((achievement: IEmployeeAchievement) => {
                            return achievement.achievementId !== id;
                        });
                    }

                    return this._employeeDataService.updateEmployeeData(this._employeeId, employee);
                })
            ).subscribe(() => this.callUpdateDataMethod());
    }
}
