import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCollectiongallerysearchComponent } from './product-collectiongallerysearch.component';

describe('ProductCollectiongallerysearchComponent', () => {
  let component: ProductCollectiongallerysearchComponent;
  let fixture: ComponentFixture<ProductCollectiongallerysearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCollectiongallerysearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCollectiongallerysearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
