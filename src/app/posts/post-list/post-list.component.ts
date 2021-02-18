import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // public posts = [
  //   { title: 'First post', content: 'First post content' },
  //   { title: 'Second post', content: 'Second post content' },
  //   { title: 'Third post', content: 'Third post content' },
  // ];
  public posts: Post[] = [];
  public postsSubscription: Subscription | null = null;

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSubscription = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
  ngOnDestroy(): void {
    this.postsSubscription?.unsubscribe();
  }

  onDelete(id: string | null): void {
    console.log('id', id);
    if (id) {
      this.postsService.deletePost(id);
    }
  }
}
