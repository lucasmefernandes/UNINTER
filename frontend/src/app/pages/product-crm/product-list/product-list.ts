import { Component, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
 private http = inject(HttpClient);

  readonly products = signal<any[]>([]);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.loading.set(true);
    const token = localStorage.getItem('token');

    this.http.get('https://uninter-jtes.onrender.com/api/users/product/my', {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    }).subscribe({
      next: (data: any) => {
        this.products.set(data.products);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
        this.loading.set(false);
      },
    });
  }
}
