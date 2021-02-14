import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  getPostUpdateListener(): Observable<Post[]> {
    return this.postUpdated.asObservable();
  }
  addPost(post: Post): void {
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
}
