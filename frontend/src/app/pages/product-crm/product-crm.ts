import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApisService } from '../../core/services/api/apis.service';
import { Header } from "../../shared/header/header";
import { Footer } from "../../shared/footer/footer";
import { ProductList } from './product-list/product-list';
import { SalesReport } from './sales-report/sales-report';

@Component({
  selector: 'app-product-crm',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Footer, ProductList, SalesReport],
  templateUrl: './product-crm.html',
  styleUrl: './product-crm.scss',
})
export class ProductCrm {
  private api = inject(ApisService);

  name = '';
  price: number = 0;
  imageUrl = '';
  message = signal('');

  tab = signal<'add' | 'list' | 'sales'| ''>('');

  setTab(newTab: 'add' | 'list' | 'sales') {
    this.tab.set(newTab);
  }

  submit() {
    if (!this.name || !this.price) {
      this.message.set('Preencha os campos obrigatórios.');
      return;
    }

    const product = { name: this.name, price: this.price, imageUrl: this.imageUrl };

    this.api.addProduct(product).subscribe({
      next: () => {
        this.message.set('Produto adicionado com sucesso!');
        this.name = '';
        this.price = 0;
        this.imageUrl = '';
      },
      error: () => this.message.set('Erro ao adicionar produto.'),
    });
  }
}
