import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public totalPosts: number;
  public postsPerPage = 2;
  public currentPage = 1;
  public postsSubscription: Subscription | null = null;
  public pageSizeOptions = [1, 2, 5, 10];

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  ngOnDestroy(): void {
    this.postsSubscription?.unsubscribe();
  }

  loadPosts(): void {
    this.postsService
      .getPosts(this.postsPerPage, this.currentPage)
      .subscribe((res) => {
        console.log('res', res);
        this.posts = res.posts;
        this.totalPosts = res.totalPosts;
      });
  }
  onPageChange(pageData: PageEvent): void {
    console.log('page data', pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.loadPosts();
  }

  onDelete(id: string | null): void {
    if (id) {
      this.postsService.deletePost(id).subscribe(() => this.loadPosts());
    }
  }
}
