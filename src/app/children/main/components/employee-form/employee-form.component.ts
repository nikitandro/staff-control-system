import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IEmployeeData } from '../../data/interfaces/employee-data.interface';
import { IEmployeeFormFieldInterface } from '../../data/interfaces/employee-form-field.interface';

@Component({
    selector: 'employee-form',
    templateUrl: 'employee-form.component.html',
    styleUrls: ['./styles/employee-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
    public employeeForm!: FormGroup;

    @Input()
    public employeeFormData!: IEmployeeData;

    @Output()
    public isClose: EventEmitter<boolean> = new EventEmitter<boolean>();

    public employeeFormFields!: IEmployeeFormFieldInterface[];

    public employeeFormLabels!: string[];

    public employeeFormControls!: FormControl[];

    public employeeFormPhoto?: string;

    private _employeeFormSubscription!: Subscription;

    public ngOnInit(): void {
        this.employeeFormFields = this.employeeFormData.employeeFormFields;
        this.employeeFormLabels = this.employeeFormFields.map((field: IEmployeeFormFieldInterface) => field.label);
        this.employeeFormControls = this.employeeFormFields.map((field: IEmployeeFormFieldInterface) => field.control);
        this.employeeFormPhoto = this.employeeFormData.photo;
        this.employeeForm = new FormGroup({
            fieldsEmployeeForm: new FormArray(this.employeeFormControls)
        });
    }

    public ngOnDestroy(): void {
        if (this._employeeFormSubscription) {
            this._employeeFormSubscription.unsubscribe();
        }
    }

    public getFormsControls() : FormArray{
        return this.employeeForm.controls['fieldsEmployeeForm'] as FormArray;
    }

    public onSubmit(): void {

    }

    public close(): void {
        this.isClose.emit(false);
    }
}
