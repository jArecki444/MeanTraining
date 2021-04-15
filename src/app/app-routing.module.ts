import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';

const routes: Routes = [
  { path: 'posts', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: PostsCreateComponent, canActivate: [AuthGuard] },
  {
    path: 'edit/:postId',
    component: PostsCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
