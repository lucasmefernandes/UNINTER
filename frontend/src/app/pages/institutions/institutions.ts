import { Component, inject, signal, Signal } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';
import { RouterModule } from '@angular/router';
import { ApisService } from '../../core/services/api/apis.service';
import { InstitutionsDataRef } from '../../core/models/institutions';

@Component({
  selector: 'app-institutions',
  imports: [Footer, Header, RouterModule],
  templateUrl: './institutions.html',
  styleUrl: './institutions.scss',
})
export class Institutions {
  private readonly api = inject(ApisService);
  private readonly _institutions = signal<InstitutionsDataRef[]>([]);
  readonly institutions = this._institutions.asReadonly();
  readonly loading = this.api.loading;

  constructor() {
    this.api.getAllInstitutions().subscribe({
      next: (data) => this._institutions.set(data),
      error: (err) => console.error('Erro ao buscar instituições', err),
    });
  }
}
