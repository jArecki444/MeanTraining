import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.scss'],
})
export class PostsCreateComponent implements OnInit {
  public enteredTitle = '';
  public enteredContent = '';
  public isLoading = false;
  public mode = 'create';
  public postId: string | null = null;
  public postToEdit: Post | undefined;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        if (this.postId) {
          this.isLoading = true;
          this.postService.getPost(this.postId).subscribe((res) => {
            this.postToEdit = {
              id: res._id,
              title: res.title,
              content: res.content,
            };
            this.isLoading = false;
          });
        }
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  public onSavePost(form: NgForm): void {
    const post: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content,
    };
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(post);
      form.resetForm();
    } else {
      if (this.postId) {
        this.postService.updatePost(this.postId, post.title, post.content);
      }
    }
  }
}
