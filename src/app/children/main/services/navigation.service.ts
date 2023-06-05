import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
    private _id!: number;
    constructor() { }

    public setId(id: number):void {
        this._id = id;
    }

    public getId(): number {
        return this._id
    }
}
