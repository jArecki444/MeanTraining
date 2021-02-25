import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public form: FormGroup;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)],
      }),
    });

    // Load post based on postId url parameter (edit mode)
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
            if (this.postToEdit) {
              this.form.setValue({
                title: this.postToEdit.title,
                content: this.postToEdit.content,
              });
            }
          });
        }
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  public onSavePost(): void {
    const post: Post = {
      id: null,
      title: this.form.value.title,
      content: this.form.value.content,
    };
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(post);
      this.form.reset();
    } else {
      if (this.postId) {
        this.postService.updatePost(this.postId, post.title, post.content);
      }
    }
  }
}
