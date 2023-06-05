import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPost } from '../interfaces/post.interface';
import { apiUrl } from '../api/api';
import { Observable } from 'rxjs';

@Injectable()
export class PostsService {
    constructor(private _http: HttpClient) {
    }

    public getPosts(): Observable<IPost[]> {
        return this._http.get<IPost[]>(`${apiUrl}/posts`);
    }
}
