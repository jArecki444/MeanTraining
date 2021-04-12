import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  submit(): void {
    this.authService
      .loginUser(this.form.value.email, this.form.value.password)
      .subscribe((res) => {
        console.log('login res', res);
        this.authService.setToken(res.token);
        this.authService.authStatusListener.next(true);
        this.router.navigate(['/posts']);
      });
  }
}
