import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private _zone: NgZone) {
    }

    public handleError(error: Error): void {
        this._zone.run(() => {
            alert(error.message);
        });
    }
}
