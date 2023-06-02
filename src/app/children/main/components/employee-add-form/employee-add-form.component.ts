import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { IEmployeeFormField } from '../../data/interfaces/employee-form-field.interface';
import { EMPLOYEE_ADD_TOKEN } from '../../data/tokens/employee-add.token';

@Component({
    selector: 'employee-add-form',
    templateUrl: './employee-add-form.component.html',
    styleUrls: ['./styles/employee-add-form.component.scss']
})
export class EmployeeAddFormComponent implements OnInit, OnDestroy {
    public employeeAddForm!: FormGroup;

    public employeeAddFormLabels!: string[];

    public employeeAddFormFieldsArray!: FormArray;

    public employeeAddPhoto?: string;

    @Input()
    public employeeAddFormData!: IEmployeeFormData;

    @Output()
    public data$: EventEmitter<string[]> = new EventEmitter<string[]>();

    private _employeeAddFormSubscription!: Subscription;

    constructor(
        @Inject(EMPLOYEE_ADD_TOKEN) public employeeAdd$: Subject<boolean>
    ) {
    }

    public ngOnInit(): void {
        if (!this.employeeAddFormData) {
            return;
        }
        this.employeeAddFormLabels = this.employeeAddFormData.employeeFormFields.map((field: IEmployeeFormField) => field.label);
        this.employeeAddFormFieldsArray = new FormArray(
            this.employeeAddFormData.employeeFormFields.map((field: IEmployeeFormField) => field.control)
        );
        this.employeeAddForm = new FormGroup({
            employeeAddFormFields: this.employeeAddFormFieldsArray
        });
        this.employeeAddPhoto = this.employeeAddFormData.photo;

        //Подписываемся при инциализации
        //this.employeeAdd$.subscribe(this.getData());
    }

    public ngOnDestroy(): void {
        if (this._employeeAddFormSubscription) {
            this._employeeAddFormSubscription.unsubscribe();
        }
    }

    public get employeeAddFormFields(): FormArray {
        return this.employeeAddForm.controls['employeeAddFormFields'] as FormArray;
    }

    public getData(): any {
        this.data$.emit(this.employeeAddForm.value.employeeAddFormFields);
        //console.log(this.employeeAddForm.value.employeeAddFormFields);
    }
}
