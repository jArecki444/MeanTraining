import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthData } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null;
  // private tokenTimer: NodeJS.Timer;
  private tokenTimer: any;
  private userId: string;
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
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }
  setToken(token: string, expiresIn: number): void {
    this.token = token;
    this.tokenTimer = setTimeout(() => {
      this.logout();
      console.log('Token has been expired!');
    }, expiresIn * 1000);

    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
    console.log('token expirationDate', expirationDate);
    this.saveAuthData(token, expirationDate);
  }
  getToken(): string | null {
    return this.token;
  }
  getUserId() {
    return this.userId;
  }
  setUserId(id: string) {
    this.userId = id;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }
  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
  getAuthData(): { token: string; expirationDate: Date } | null {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return null;
    } else {
      return { token: token, expirationDate: new Date(expirationDate) };
    }
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    console.log('autoAuthUser', authInfo);
    if (authInfo) {
      this.token = authInfo.token;
    }
    console.log('token in auth service?', this.token);
  }
}
