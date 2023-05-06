import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IEmployeeFormData } from '../../data/interfaces/employee-form-data.interface';
import { FormArray, FormGroup } from '@angular/forms';
import { IEmployeeFormField } from '../../data/interfaces/employee-form-field.interface';

@Component({
    selector: 'employee-form',
    templateUrl: 'employee-form.component.html',
    styleUrls: ['./styles/employee-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
    @Input()
    public employeeFormData!: IEmployeeFormData;

    @Output()
    public isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

    public employeeFormLabels!: string[];

    public employeeFormFieldsArray!: FormArray;

    public employeeForm!: FormGroup;

    private _employeeFormSubscription!: Subscription;

    public ngOnInit(): void {
        console.log(this.employeeFormData);
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

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public show: boolean = false;
    public showForm(): void {
        this.show = !this.show;
        this.employeeFormLabels = this.employeeFormData.employeeFormFields.map((field: IEmployeeFormField) => field.label);
        this.employeeFormFieldsArray = new FormArray(
            this.employeeFormData.employeeFormFields.map((field: IEmployeeFormField) => field.control)
        );
        this.employeeForm = new FormGroup({
            employeeFormFields: this.employeeFormFieldsArray
        });
    }
}

// Просто чтоб каждый раз не заполнять поля оставил это тут (если что можно смело удалять)
// @Input()
// public employeeFormData: IEmployeeFormData = {
//         employeeFormFields: [
//             {
//                 label: 'Фамилия',
//                 control: new FormControl('Иванов', Validators.required)
//             },
//             {
//                 label: 'Имя',
//                 control: new FormControl('Иван', Validators.required)
//             },
//             {
//                 label: 'Отчество',
//                 control: new FormControl('Иваныч', Validators.required)
//             },
//             {
//                 label: 'Дата рождения',
//                 control: new FormControl(new Date('1223-02-23').toLocaleDateString(), Validators.required)
//             }
//         ],
//     };
