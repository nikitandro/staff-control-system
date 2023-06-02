import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { IEmployeeFormField } from '../../data/interfaces/employee-form-field.interface';
import { UpdateDataService } from '../../services/update-data.service';

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
        private _updateDataService: UpdateDataService
    ) {
        this._updateDataService.invokeEvent.subscribe((value: boolean) => {
            if (value) {
                this.onSubmit();
            }
        });
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
    }

    public ngOnDestroy(): void {
        if (this._employeeAddFormSubscription) {
            this._employeeAddFormSubscription.unsubscribe();
        }
    }

    public get employeeAddFormFields(): FormArray {
        return this.employeeAddForm.controls['employeeAddFormFields'] as FormArray;
    }

    public onSubmit(): any {
        this.data$.emit(this.employeeAddForm.value.employeeAddFormFields);
    }
}
