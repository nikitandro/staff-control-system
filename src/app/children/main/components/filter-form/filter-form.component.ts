import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FilterService } from '../../data/services/filter.service';
import { DepartmentsService } from '../../data/services/departments.service';
import { IDepartment } from '../../data/interfaces/department.interface';
import { PostsService } from '../../data/services/posts.service';
import { IPost } from '../../data/interfaces/post.interface';
import { SuccessStatus } from '../../data/interfaces/SuccessStatus.interface';
import { IRadioButton } from '../radio-button-group/radio-button-group.types';

@Component({
    selector: 'filter-form',
    templateUrl: './filter-form.component.html',
    styleUrls: ['./styles/filter-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterFormComponent implements OnInit {

    public departments: IDepartment[] = [];
    public posts: IPost[] = [];
    public sliderOptions: { floor: number, ceil: number } = {
        floor: 0,
        ceil: 0
    };
    public salaryBounds: [number, number] = [0, 0];
    public successStatusRadioButtons: IRadioButton[] = [
        {
            id: SuccessStatus.Successful,
            text: 'Успешные'
        },
        {
            id: SuccessStatus.Unsuccessful,
            text: 'Неуспешные'
        },
        {
            id: SuccessStatus.Zero,
            text: 'Без оценки'
        }
    ];

    constructor(private _filterService: FilterService,
                private _departmentsService: DepartmentsService,
                private _changeDetection: ChangeDetectorRef,
                private _postsService: PostsService) {
    }

    public ngOnInit(): void {

        this._departmentsService.getDepartmentsList().subscribe((value: IDepartment[]) => {
            this.departments = value;
            this._changeDetection.detectChanges();
        });
        this._filterService.getActualSalaryBounds().subscribe((value: [number, number]) => {
            this.sliderOptions = {
                floor: value[0],
                ceil: value[1]
            };
            this.salaryBounds = value;
        });
        this._postsService.getPosts().subscribe((value: IPost[]) => {
            this.posts = value;
            this._changeDetection.detectChanges();
        });
    }

    public onIsFiredChange(value: boolean): void {
        this._filterService.isFired$.next(value);
    }

    public onSelectedDepartmentsChange(value: number[]): void {
        this._filterService.selectedDepartments$.next(value);
    }

    public onSelectedPostsChange(value: number[]): void {
        this._filterService.selectedPosts$.next(value);
    }

    public onSalaryChange(value: [number, number]): void {
        this._filterService.salary$.next(value);
    }

    public onSuccessStatusChange(value: number | null): void {
        if (typeof value === 'number') {
            this._filterService.successStatus$.next(value);

            return;
        }
        this._filterService.successStatus$.next(SuccessStatus.NotStated);
    }

    public onFormTouchEnd(event: TouchEvent): void {
        event.stopPropagation();
    }
}
