import { ChangeDetectionStrategy,
    Component,
    EventEmitter, Inject,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { FormArray, FormGroup } from '@angular/forms';
import { EMPLOYEE_FORM_DATA_TOKEN } from '../../data/tokens/employee-form-data.token';
import { IEmployeeFormField } from '../../data/interfaces/employee-form-field.interface';

@Component({
    selector: 'employee-form',
    templateUrl: 'employee-form.component.html',
    styleUrls: ['./styles/employee-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
    @Output()
    public isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

    public employeeFormLabels!: string[];

    public employeeFormFieldsArray!: FormArray;

    public employeeForm!: FormGroup;

    public employeePhoto?: string;

    private _employeeFormSubscription!: Subscription;

    constructor(
        @Inject(EMPLOYEE_FORM_DATA_TOKEN) public employeeFormData$: BehaviorSubject<IEmployeeFormData>
    ) {
    }

    public ngOnInit(): void {
        this.employeeFormData$
            .subscribe((data: IEmployeeFormData) => {
                if (!this.employeeFormData$.getValue()) {
                    return;
                }
                this.employeeFormLabels = data.employeeFormFields.map((field: IEmployeeFormField) => field.label);
                this.employeeFormFieldsArray = new FormArray(
                    data.employeeFormFields.map((field: IEmployeeFormField) => field.control)
                );
                this.employeeForm = new FormGroup({
                    employeeFormFields: this.employeeFormFieldsArray
                });
                this.employeePhoto = data.photo;
            }
            );
    }


    public ngOnDestroy(): void {
        if (this._employeeFormSubscription) {
            this._employeeFormSubscription.unsubscribe();
        }
    }

    public get employeeFormFields(): FormArray {
        return this.employeeForm.controls['employeeFormFields'] as FormArray;
    }

    public onSubmit(): void {

    }

    public close(): void {
        this.isOpen.emit(false);
    }
}
