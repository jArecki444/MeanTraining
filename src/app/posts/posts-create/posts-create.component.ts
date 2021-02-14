import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.scss'],
})
export class PostsCreateComponent {
  public enteredTitle = '';
  public enteredContent = '';

  constructor(private postService: PostsService) {}

  public onAddPost(form: NgForm): void {
    const post: Post = {
      title: form.value.title,
      content: form.value.content,
    };
    this.postService.addPost(post);
  }
}
