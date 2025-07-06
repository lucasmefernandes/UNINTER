import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginPayload, LoginResponse } from '../../models/login';
import { RegisterPayload } from '../../models/register';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly API_URL = 'http://localhost:3000/api/users';

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<LoginResponse> {
    this.loading.set(true);
    this.error.set(null);

    return new Observable((observer) => {
      this.http.post<LoginResponse>(this.API_URL + '/login', payload).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          observer.next(res);
          observer.complete();
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err?.error?.message || 'Erro ao fazer login');
          observer.error(err);
          this.loading.set(false);
        },
      });
    });
  }

  register(payload: RegisterPayload): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    return new Observable(observer => {
      this.http.post<any>(this.API_URL + '/register', payload).subscribe({
        next: (res) => {
          observer.next(res);
          observer.complete();
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err?.error?.message || 'Erro ao registrar');
          observer.error(err);
          this.loading.set(false);
        }
      });
    });
  }
}
