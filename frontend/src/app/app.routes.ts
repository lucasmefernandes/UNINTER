import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: 'necessity/:id',
    loadComponent: () =>
      import('./pages/necessity/necessity').then((m) => m.Necessity),
  },
  {
    path: 'institutions',
    loadComponent: () =>
      import('./pages/institutions/institutions').then((m) => m.Institutions),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
  },
  {
    path: 'add-product',
    loadComponent: () =>
      import('./pages/product-crm/product-crm').then((m) => m.ProductCrm),
  },
  {
    path: 'payment/success',
    loadComponent: () =>
      import('./pages/payment-success/payment-success').then(
        (m) => m.PaymentSuccess
      ),
  },
  {
    path: 'payment/cancel',
    loadComponent: () =>
      import('./pages/payment-cancel/payment-cancel').then(
        (m) => m.PaymentCancel
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
