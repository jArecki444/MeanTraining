import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post, PostList, PostResponse } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient, private router: Router) {}

  getPosts(pageSize: number, currentPage: number): Observable<any> {
    const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
    return this.http
      .get<{ message: string; posts: any; totalPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        map((postData: any) => {
          return {
            posts: postData.posts.map((post: PostResponse) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
              };
            }),
            totalPosts: postData.totalPosts,
          };
        })
      );
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
        this.getPosts(10, 0);
        this.router.navigate(['/']);
      });
  }
  updatePost(
    postId: string,
    postTitle: string,
    postContent: string,
    postImage: File | string
  ): void {
    let postData: FormData | Post;
    if (typeof postImage === 'object') {
      postData = new FormData();
      postData.append('title', postTitle);
      postData.append('content', postContent);
      postData.append('image', postImage, 'fileName');
      postData.append('id', postId);
    } else {
      postData = {
        id: postId,
        title: postTitle,
        content: postContent,
        imagePath: postImage,
      };
    }
    this.http
      .put(`http://localhost:3000/api/posts/${postId}`, postData)
      .subscribe((res) => {
        console.log('updatePost', res);
        this.router.navigate(['/']);
      });
  }
  deletePost(postId: string): Observable<any> {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
  }
}
