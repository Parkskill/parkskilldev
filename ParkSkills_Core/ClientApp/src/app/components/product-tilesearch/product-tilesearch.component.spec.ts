import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTilesearchComponent } from './product-tilesearch.component';

describe('ProductTilesearchComponent', () => {
  let component: ProductTilesearchComponent;
  let fixture: ComponentFixture<ProductTilesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTilesearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTilesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
