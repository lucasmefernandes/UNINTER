import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../core/services/auth/auth';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, Header, Footer],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);
  readonly auth = inject(Auth);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    description: [''],
    imageUrl: [''],
  });

  submit() {
  if (this.form.invalid) return;
  const { name, email, password, description, imageUrl } = this.form.value;
  if (!name || !email || !password || !description || !imageUrl) return;

  const payload = {
    name,
    email,
    password,
    description,
    imageUrl,
  };

  this.auth.register(payload).subscribe({
    next: () => this.router.navigateByUrl('/login'),
  });
}

}
