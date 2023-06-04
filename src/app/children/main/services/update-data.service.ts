import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UpdateDataService {
    public invokeEvent: Subject<boolean> = new Subject();

    public callMethodOfPageComponent(): void {
        this.invokeEvent.next(true);
    }
}
