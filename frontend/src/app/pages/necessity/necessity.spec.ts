import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Necessity } from './necessity';

describe('Necessity', () => {
  let component: Necessity;
  let fixture: ComponentFixture<Necessity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Necessity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Necessity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
