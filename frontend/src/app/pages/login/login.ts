import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../../core/services/auth/auth';
import { Router, RouterModule } from '@angular/router';
import { Footer } from "../../shared/footer/footer";
import { Header } from "../../shared/header/header";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, Footer, Header],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  readonly auth = inject(Auth);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  submit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    if (!email || !password) return;

    this.auth.login({ email, password }).subscribe({
      next: (x) => {
        localStorage.setItem('token', x.token)
        localStorage.setItem('email', x.user.email)
        localStorage.setItem('name', x.user.name)
        localStorage.setItem('id', x.user.id)
        this.router.navigateByUrl('/add-product');
      },
      error: () => {
        console.warn('Erro de login');
      },
    });
  }
}
