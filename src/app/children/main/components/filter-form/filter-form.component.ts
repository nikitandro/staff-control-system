import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FilterService} from '../../data/services/filter.service';
import {DepartmentsService} from '../../data/services/departments.service';
import {IDepartment} from '../../data/interfaces/department.interface';
import {PostsService} from '../../data/services/posts.service';
import {IPost} from '../../data/interfaces/post.interface';
import {SuccessStatus} from '../../data/interfaces/SuccessStatus.interface';
import {IRadioButton} from '../radio-button-group/radio-button-group.types';

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

    constructor(private filterService: FilterService,
                private departmentsService: DepartmentsService,
                private changeDetection: ChangeDetectorRef,
                private postsService: PostsService) {
    }

    public ngOnInit() {

        this.departmentsService.getDepartmentsList().subscribe((value) => {
            this.departments = value;
            this.changeDetection.detectChanges();
        });
        this.filterService.getActualSalaryBounds().subscribe((value) => {
            this.sliderOptions = {
                floor: value[0],
                ceil: value[1]
            };
            this.salaryBounds = value;
        });
        this.postsService.getPosts().subscribe((value) => {
            this.posts = value;
            this.changeDetection.detectChanges();
        });
    }

    public onIsFiredChange(value: boolean) {
        this.filterService.isFired$.next(value);
    }

    public onSelectedDepartmentsChange(value: number[]) {
        this.filterService.selectedDepartments$.next(value);
    }

    public onSelectedPostsChange(value: number[]) {
        this.filterService.selectedPosts$.next(value);
    }

    public onSalaryChange(value: [number, number]) {
        this.filterService.salary$.next(value);
    }

    public onSuccessStatusChange(value: number | null) {
        if (typeof value === 'number') {
            this.filterService.successStatus$.next(value);
            return;
        }
        this.filterService.successStatus$.next(SuccessStatus.NotStated);
    }

    public onFormTouchEnd(event: TouchEvent) {
        event.stopPropagation();
    }

    protected readonly console = console;
}
