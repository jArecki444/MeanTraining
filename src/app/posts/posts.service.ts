import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post, PostResponse } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts(): void {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData: any) => {
          return postData.posts.map((post: PostResponse) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }
  // getPosts(): void {
  //   this.http
  //     .get<{ message: string; posts: Post[] }>(
  //       'http://localhost:3000/api/posts'
  //     )
  //     .subscribe((postData) => {
  //       this.posts = postData.posts;
  //       this.postUpdated.next([...this.posts]);
  //     });
  // }

  getPostUpdateListener(): Observable<Post[]> {
    return this.postUpdated.asObservable();
  }
  getPost(id: string): Post | undefined {
    const selectedPost: Post | undefined = this.posts.find(
      (post) => post.id === id
    );
    return selectedPost;
  }
  addPost(post: Post): void {
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((res) => {
        console.log(res.message);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.getPosts();
      });
  }
  updatePost(postId: string, postTitle: string, postContent: string): void {
    const post: Post = { id: postId, title: postTitle, content: postContent };
    this.http
      .put(`http://localhost:3000/api/posts/${postId}`, post)
      .subscribe((res) => {
        console.log(res);
      });
  }
  deletePost(postId: string): void {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        this.getPosts();
      });
  }
}
