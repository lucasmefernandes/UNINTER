import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public isAuth = false;
  private router = inject(Router)

  constructor() {
    this.checkAuth();
  }

  ngOnInit(): void {
    this.checkAuth();
  }

  private checkAuth(): void {
    const name = localStorage.getItem('name');
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    const isValid = !!name && !!id && !!token && !!email;
    this.isAuth = isValid;
  }

  logout(): void {
    localStorage.clear();
    this.isAuth = false;
    this.router.navigate(['/home'])
  }
}
