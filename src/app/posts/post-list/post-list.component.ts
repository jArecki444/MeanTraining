import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  // public posts = [
  //   { title: 'First post', content: 'First post content' },
  //   { title: 'Second post', content: 'Second post content' },
  //   { title: 'Third post', content: 'Third post content' },
  // ];
  @Input() posts: Post[] = [];

  constructor() {}

  ngOnInit(): void {}
}
