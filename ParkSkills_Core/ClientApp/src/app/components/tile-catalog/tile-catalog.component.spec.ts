import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileCatalogComponent } from './tile-catalog.component';

describe('TopHeaderComponent', () => {
  let component: TileCatalogComponent;
  let fixture: ComponentFixture<TileCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TileCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
