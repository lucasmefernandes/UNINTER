import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-sales-report',
  imports: [],
  templateUrl: './sales-report.html',
  styleUrl: './sales-report.scss'
})
export class SalesReport {
private http = inject(HttpClient);

  readonly sales = signal<any[]>([]);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.loading.set(true);
    const token = localStorage.getItem('token');

    this.http.get('https://uninter-jtes.onrender.com/api/users/sales/my', {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    }).subscribe({
      next: (data: any) => {
        this.sales.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar vendas:', err);
        this.loading.set(false);
      },
    });
  }
}
