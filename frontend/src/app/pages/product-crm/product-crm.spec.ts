import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCrm } from './product-crm';

describe('ProductCrm', () => {
  let component: ProductCrm;
  let fixture: ComponentFixture<ProductCrm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCrm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCrm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
