import { Component, Input } from '@angular/core';

@Component({
    selector: 'navigation-button',
    templateUrl: './navigation-button.component.html',
    styleUrls: ['./styles/navigation-button.component.scss']
})
export class NavigationButtonComponent{

    @Input()
    public pageRout: string = 'personal';

    @Input()
    public name: string = '';
    @Input()
    public iconSrc: string = '';
}
