import { InstitutionsDataRef } from "./institutions";

export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public description?: string,
    public imageUrl?: string,
    public unit?: number
  ) {}

  get formattedPrice(): string {
    return `R$ ${this.price.toFixed(2).replace('.', ',')}`;
  }
}

export class ProductReq {
  constructor(
    public products: Product[],
    public institution: InstitutionsDataRef
  ) {}
}
