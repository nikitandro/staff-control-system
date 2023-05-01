import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./styles/navigation-button.component.scss']
})
export class NavigationButtonComponent implements OnInit{

    @Input()
    public pageRout: string = 'personal';

    @Input()
    public Id: string = '';

    @Input()
    public name: string = '';
    @Input()
    public iconSrc: string = '';

    public routLink!: string;

    public ngOnInit() {
        this.routLink = `employee-info/${this.Id}/${this.pageRout}`;
    }
}
