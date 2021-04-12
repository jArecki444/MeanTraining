import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthData } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null;
  public authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  createUser(userEmail: string, userPassword: string): Observable<any> {
    const authData: AuthData = { email: userEmail, password: userPassword };
    return this.http.post('http://localhost:3000/api/user/signup', authData);
  }
  loginUser(userEmail: string, userPassword: string): Observable<any> {
    const authData: AuthData = { email: userEmail, password: userPassword };
    return this.http.post('http://localhost:3000/api/user/login', authData);
  }
  logout() {
    this.token = null;
    this.authStatusListener.next(false);
  }
  setToken(token: string): void {
    this.token = token;
  }
  getToken(): string | null {
    return this.token;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
}
