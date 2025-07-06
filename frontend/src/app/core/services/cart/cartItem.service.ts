import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../models/products';
import { CartItem } from '../../models/cartItem';
import { InstitutionsDataRef } from '../../models/institutions';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<CartItem[]>(this.loadCart());

  readonly cart = computed(() => this.cartItems());

  addProduct(institutionId: InstitutionsDataRef, product: Product) {
    const current = this.cartItems();
    const index = current.findIndex(
      (c) => c.institution.id === institutionId.id
    );

    console.log(current);
    console.log(index);

    if (index === -1) {
      const cartItem: CartItem = {
        institution: {
          id: institutionId.id,
          name: institutionId.name,
        },
        products: [product],
      };

      console.log([...current, cartItem]);
      this.cartItems.set([...current, cartItem]);
      this.saveCart();
    } else {
      const updated = [...current];
      const existing = updated[index];

      const productExists = existing.products.some((p) => p.id === product.id);

      if (!productExists) {
        updated[index] = {
          ...existing,
          products: [...existing.products, product],
        };
        this.cartItems.set(updated);
        this.saveCart();
      }

      if (productExists) {
        const updatedProducts = existing.products.map((p) => {
          if (p.id === product.id) {
            const unit = (p.unit ?? 1) + 1;
            return new Product(
              p.id,
              p.name,
              p.price,
              p.description,
              p.imageUrl,
              unit
            );
          }
          return p;
        });

        updated[index] = {
          ...existing,
          products: updatedProducts,
        };

        this.cartItems.set(updated);
        this.saveCart();
      }
    }

    console.log(this.cart());
  }

  removeProduct(
    institutionId: InstitutionsDataRef,
    productId: string,
    removeAll: boolean = false
  ) {
    const current = this.cartItems()
      .map((item) => {
        if (item.institution.id !== institutionId.id) return item;

        const updatedProducts = item.products
          .map((p) => {
            if (p.id !== productId) return p;

            if (!removeAll) {
              const newUnit = (p.unit ?? 1) - 1;

              if (newUnit > 0) {
                return new Product(
                  p.id,
                  p.name,
                  p.price,
                  p.description,
                  p.imageUrl,
                  newUnit
                );
              }

              return null;
            }

            return null;
          })
          .filter((p): p is Product => p !== null);

        return { ...item, products: updatedProducts };
      })
      .filter((item) => item.products.length > 0);

    this.cartItems.set(current);
    this.saveCart();
  }

  clearInstitution(institutionId: InstitutionsDataRef) {
    this.cartItems.set(
      this.cartItems().filter(
        (item) => item.institution.id !== institutionId.id
      )
    );
    this.saveCart();
  }

  clearCart() {
    this.cartItems.set([]);
    this.saveCart();
  }

  private loadCart(): CartItem[] {
    try {
      const data = localStorage.getItem('doabem_cart');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveCart(): void {
    localStorage.setItem('doabem_cart', JSON.stringify(this.cartItems()));
  }
}
