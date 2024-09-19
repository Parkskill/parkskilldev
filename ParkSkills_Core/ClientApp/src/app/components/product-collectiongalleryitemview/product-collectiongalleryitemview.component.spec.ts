import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCollectiongalleryitemviewComponent } from './product-collectiongalleryitemview.component';

describe('ProductCollectiongalleryitemviewComponent', () => {
  let component: ProductCollectiongalleryitemviewComponent;
  let fixture: ComponentFixture<ProductCollectiongalleryitemviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCollectiongalleryitemviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCollectiongalleryitemviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
