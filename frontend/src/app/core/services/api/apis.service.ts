import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { Product, ProductReq } from '../../models/products';
import { Institutions, InstitutionsDataRef } from '../../models/institutions';

@Injectable({
  providedIn: 'root',
})
export class ApisService {
  private readonly baseUrl = `assets/jsons/produtcs.json`;
  private readonly API_URL = 'https://uninter-jtes.onrender.com/api/users';

  readonly products = signal<Product[]>([]);
  readonly institution = signal<InstitutionsDataRef>(
    new InstitutionsDataRef('', '')
  );
  readonly loading = signal(false);

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  getAll(idProduct: string): Observable<ProductReq> {
     this.loading.set(true);
    return this.http
      .get<ProductReq>(`${this.API_URL}/products/${idProduct}`)
      .pipe(finalize(() => this.loading.set(false)));
  }

  loadProducts(idProduct: string) {
    this.loading.set(true);
    this.getAll(idProduct).subscribe({
      next: (data) => {
        console.log(data)
        this.products.set(data.products);
        this.institution.set(data.institution);
        this.loading.set(false);

      },
      error: (err) => {
        this.loading.set(false);
        console.error('Erro ao carregar produtos', err);
      },
    });
  }

  getAllInstitutions(): Observable<InstitutionsDataRef[]> {
    this.loading.set(true);
    return this.http
      .get<InstitutionsDataRef[]>(`${this.API_URL}/institutions`)
      .pipe(finalize(() => this.loading.set(false)));
  }

  addProduct(product: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.API_URL}/add`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createCheckoutSession(products: any[]) {
    return this.http.post<{ url: string }>(`${this.API_URL}/create-checkout-session`, { products });
  }
}
