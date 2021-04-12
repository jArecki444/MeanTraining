import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';

const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: 'create', component: PostsCreateComponent },
  { path: 'edit/:postId', component: PostsCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
