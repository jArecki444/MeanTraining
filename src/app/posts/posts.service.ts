import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post, PostResponse } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

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
              imagePath: post.imagePath,
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
  getPost(id: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(`http://localhost:3000/api/posts/${id}`);
  }
  addPost(post: Post): void {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    if (post.file) {
      postData.append('image', post.file, 'fileName');
    }
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', postData)
      .subscribe((res) => {
        console.log(res.message);
        // this.posts.push(post);
        // this.postUpdated.next([...this.posts]);
        this.getPosts();
        this.router.navigate(['/']);
      });
  }
  updatePost(postId: string, postTitle: string, postContent: string): void {
    const post: Post = { id: postId, title: postTitle, content: postContent };
    this.http
      .put(`http://localhost:3000/api/posts/${postId}`, post)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/']);
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
