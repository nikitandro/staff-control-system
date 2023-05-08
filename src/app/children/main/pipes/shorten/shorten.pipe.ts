import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shorten'})
export class ShortenPipe implements PipeTransform{
    public transform(value: string, by: number): string {
        return `${value.slice(0, by)}${value.length > by ? '...' : ''}`
    }

}
