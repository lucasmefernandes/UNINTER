import { Component, inject } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';
import { CartService } from '../../core/services/cart/cartItem.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-success',
  imports: [Footer, Header, RouterModule],
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.scss',
})
export class PaymentSuccess {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private cartService = inject(CartService);

  ngOnInit(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    const cart = this.cartService.cart();

    if (sessionId && cart.length > 0) {
      const cartProducts = cart.flatMap((item) =>
        item.products.map((p) => ({
          ...p,
          institutionId: item.institution.id,
          institutionName: item.institution.name,
        }))
      );

      this.http
        .post('http://localhost:3000/api/users/confirm', {
          stripeSessionId: sessionId,
          cartProducts,
        })
        .subscribe({
          next: () => {
            this.cartService.clearCart();
          },
          error: (err) => {
            console.error('Erro ao confirmar pagamento:', err);
          },
        });
    }
  }
}
