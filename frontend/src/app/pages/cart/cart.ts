import { Component, Signal, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../core/models/cartItem';
import { CartService } from '../../core/services/cart/cartItem.service';
import { Product } from '../../core/models/products';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { InstitutionsDataRef } from '../../core/models/institutions';
import { ApisService } from '../../core/services/api/apis.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, Header, Footer],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private readonly cartService = inject(CartService);
  private readonly api = inject(ApisService);
  readonly cart: Signal<CartItem[]> = this.cartService.cart;

  readonly totalCart = computed(() =>
    this.cart().reduce((totalInstitutions, item) => {
      return (
        totalInstitutions +
        item.products.reduce((totalProducts, p) => {
          const qty = p.unit ?? 1;
          return totalProducts + p.price * qty;
        }, 0)
      );
    }, 0)
  );

  getTotalProduct(p: Product): number {
    return (p.unit ?? 1) * p.price;
  }

  getInstitutionTotal(products: Product[]): number {
    return products.reduce((sum, p) => sum + (p.unit ?? 1) * p.price, 0);
  }

  removeProduct(institutionId: InstitutionsDataRef, productId: string, removeAll?: boolean) {
    this.cartService.removeProduct(institutionId, productId, removeAll);
  }

  clearInstitution(institutionId: InstitutionsDataRef) {
    this.cartService.clearInstitution(institutionId);
  }

  clearAll() {
    this.cartService.clearCart();
  }

  goPay() {
    const products = this.cart().flatMap(item =>
      item.products.map(p => ({
        name: p.name,
        imageUrl: p.imageUrl,
        price: p.price,
        unit: p.unit || 1
      }))
    );

    this.api.createCheckoutSession(products).subscribe({
      next: ({ url }) => window.location.href = url,
      error: (err) => console.error('Erro ao redirecionar para o Stripe', err)
    });
  }
}
