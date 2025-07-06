import { Product } from "./products";

export class Institutions {
  constructor(
    public id: string,
    public name: string,
    public products: Product[],
  ) {}
}

export class InstitutionsDataRef {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
    public imageUrl?: string
  ) {}
}
