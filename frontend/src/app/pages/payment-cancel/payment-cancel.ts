import { Component } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-cancel',
  imports: [Footer, Header, RouterModule],
  templateUrl: './payment-cancel.html',
  styleUrl: './payment-cancel.scss'
})
export class PaymentCancel {}
