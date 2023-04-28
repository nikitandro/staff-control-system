import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IEmployeePersonalData } from '../../data/interfaces/employee-personal-data.interface';

@Component({
    selector: 'employee-form',
    templateUrl: 'employee-form.component.html',
    styleUrls: ['./styles/employee-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
    public employeeForm!: FormGroup;

    @Input()
    public employeeData!: IEmployeePersonalData;

    @Output()
    public isClose: EventEmitter<boolean> = new EventEmitter<boolean>();

    public employeeFormLabels!: string[];

    public employeeFormControls!: FormControl[];

    public employeeFormPhoto?: string;

    private _employeeFormSubscription!: Subscription;

    public ngOnInit(): void {
        this.employeeFormLabels = this.employeeData.labels;
        this.employeeFormControls = this.employeeData.controls;
        this.employeeFormPhoto = this.employeeData.photo;
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
