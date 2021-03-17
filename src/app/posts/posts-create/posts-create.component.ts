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
  public imagePreview: string;

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
      image: new FormControl(null, { validators: [Validators.required] }),
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
              file: res.imagePath,
            };
            this.isLoading = false;
            if (this.postToEdit) {
              this.form.setValue({
                title: this.postToEdit.title,
                content: this.postToEdit.content,
                image: this.postToEdit.imagePath
                  ? this.postToEdit.imagePath
                  : '',
              });
              if (res.imagePath) {
                this.imagePreview = res.imagePath;
              }
            }
          });
        }
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  public onImagePicked(event: any): void {
    if (event.target) {
      const file = event.target.files[0];
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  public onSavePost(): void {
    const post: Post = {
      id: null,
      title: this.form.value.title,
      content: this.form.value.content,
      file: this.form.value.image,
    };

    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(post);
      this.form.reset();
    } else {
      if (this.postId && post.file) {
        this.postService.updatePost(
          this.postId,
          post.title,
          post.content,
          post.file
        );
      }
    }
  }
}
