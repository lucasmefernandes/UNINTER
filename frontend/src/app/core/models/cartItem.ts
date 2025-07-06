import { InstitutionsDataRef } from "./institutions";
import { Product } from "./products";

export interface CartItem {
  institution: InstitutionsDataRef;
  products: Product[];
}
