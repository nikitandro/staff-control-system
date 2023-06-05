import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EmployeeDataService } from '../../data/services/employee-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UpdateDataService } from '../../services/update-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRadioButton } from '../radio-button-group/radio-button-group.types';
import { DepartmentsService } from '../../data/services/departments.service';
import { PostsService } from '../../data/services/posts.service';
import { IDepartment } from '../../data/interfaces/department.interface';
import { IPost } from '../../data/interfaces/post.interface';
import { EMPLOYEE_CONDITION_FORM_DATA_TOKEN } from '../../data/tokens/employee-condition-form.data.token';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { IEmployeeConditionFormData } from '../../data/interfaces/employee-condition-form-data.interface';
import { IEmployeeRequestModel } from '../../data/request-models/employee.request-model.interface';
import { IEmployeeResponseModel } from '../../data/response-models/employee.response-model.interface';
import { IEmployeeCondition } from '../../data/interfaces/employee-condition.inteface';

@Component({
    selector: 'employee-condition-form',
    templateUrl: './employee-condition-form.html',
    styleUrls: ['./styles/employee-condition-form.scss']
})
export class EmployeeConditionForm implements OnInit, OnDestroy {
    @Input()
    public isAddForm: boolean = false;

    @Output()
    public isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    public data$: EventEmitter<IEmployeeCondition> = new EventEmitter<IEmployeeCondition>();

    public employeeConditionForm!: FormGroup;

    public loadDepartments: boolean = true;
    public loadPosts: boolean = true;

    public departmentId!: number;
    public postId!: number;

    public radioButtonsDepartment: IRadioButton[] = [];
    public radioButtonsPost: IRadioButton[] = [];

    private _employeeId!: number;

    private _routeSubscription!: Subscription;

    constructor(
        private _employeeDataService: EmployeeDataService,
        private _route: ActivatedRoute,
        private _updateDataService: UpdateDataService,
        private _departmentsService: DepartmentsService,
        private _postsService: PostsService,
        @Inject(EMPLOYEE_CONDITION_FORM_DATA_TOKEN) public employeeConditionFormData$: BehaviorSubject<IEmployeeConditionFormData>
    ) {
        this._updateDataService.invokeEvent.subscribe((value: boolean) => {
            if (value) {
                this.onSubmit();
            }
        });
    }

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe((params: Params) => {
            this._employeeId = params['employeeId'];
        });

        this.employeeConditionFormData$.subscribe((data: IEmployeeConditionFormData) => {
            if (!this.employeeConditionFormData$.getValue()) {
                return;
            }

            this.employeeConditionForm = new FormGroup({
                salary: new FormControl(data.salary, [
                    Validators.required
                ]),
                workFormat: new FormControl(data.workFormat, [
                    Validators.required
                ])
            });
        });

        this._departmentsService.getDepartmentsList().subscribe((departments: IDepartment[]) =>  {
            departments.forEach((department: IDepartment) => {
                this.radioButtonsDepartment.push({
                    id: department.id,
                    text: department.title
                });
            });

            this.loadDepartments = false;
        });

        this._postsService.getPosts().subscribe((posts: IPost[]) => {
            posts.forEach((post: IPost) => {
                this.radioButtonsPost.push({
                    id: post.id,
                    text: post.title
                });
            });

            this.loadPosts = false;
        });
    }

    public ngOnDestroy(): void {
        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
    }

    public onSubmit(): void {
        if (this.employeeConditionForm.invalid) {
            this.employeeConditionForm.markAllAsTouched();

            return;
        }

        const employeeConditionData: IEmployeeCondition = {
            departmentId: this.departmentId,
            postId: this.postId,
            salary: this.employeeConditionForm.value.salary,
            workFormat: this.employeeConditionForm.value.workFormat
        };

        if (this.isAddForm) {
            this.data$.emit(employeeConditionData);

            return;
        }

        this.submitConditionData(employeeConditionData);

        this.close();
    }

    public submitConditionData(data: IEmployeeCondition): void {
        let updateEmployee!: IEmployeeRequestModel;
        this._employeeDataService.getEmployeeData(this._employeeId)
            .pipe(
                switchMap((currentEmployeeData: IEmployeeResponseModel) => {
                    updateEmployee = currentEmployeeData;
                    updateEmployee.departmentId = data.departmentId;
                    updateEmployee.postId = data.postId;
                    updateEmployee.salary = data.salary;
                    updateEmployee.workFormat = data.workFormat;

                    return this._employeeDataService.updateEmployeeData(this._employeeId, updateEmployee);
                })
            ).subscribe(() => this._updateDataService.callMethodOfPageComponent());

    }

    public onDepartmentChange(value: number | null): void {
        if (typeof value === 'number') {
            this.departmentId = value;

            return;
        }
    }

    public onPostChange(value: number | null): void {
        if (typeof value === 'number') {
            this.postId = value;

            return;
        }
    }

    public close(): void {
        this.isOpen.emit(false);
    }
}
