import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.scss'],
})
export class PostsCreateComponent {
  public enteredTitle = '';
  public enteredContent = '';
  @Output() postCreated = new EventEmitter<Post>();

  constructor() {}

  public onAddPost(): void {
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent,
    };
    this.postCreated.emit(post);
  }
}
