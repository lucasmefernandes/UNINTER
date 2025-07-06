import { Component, computed, inject, signal } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';
import { ApisService } from '../../core/services/api/apis.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart/cartItem.service';
import { Product } from '../../core/models/products';
import { InstitutionsDataRef } from '../../core/models/institutions';

@Component({
  selector: 'app-necessity',
  imports: [Footer, Header, RouterModule],
  templateUrl: './necessity.html',
  styleUrl: './necessity.scss',
})
export class Necessity {
  private api = inject(ApisService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  readonly cart = inject(CartService);
  public products = this.api.products;
  public loading = this.api.loading;
  public institutionId: string;
  public institution = this.api.institution;

  constructor() {
    this.institutionId = this.route.snapshot.params['id'] || '';
    if (this.institutionId) {
      console.log("entrou")
      this.api.loadProducts(this.institutionId);
    } else {
      this.router.navigate(['/institutions']);
    }
  }

  addToCart(product: Product, institution: InstitutionsDataRef) {
    console.log(product, institution);
    if (!institution) return;
    product.unit = 1
    this.cart.addProduct(institution, product);
  }
}
