import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IPost} from '../interfaces/post.interface';

@Injectable()
export class PostsService {
    constructor(private _http: HttpClient) {
    }

    public getPosts() {
        return this._http.get<IPost[]>('http://localhost:3000/posts');
    }
}
