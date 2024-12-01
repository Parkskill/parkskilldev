import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcyByCategoryComponent } from './searcy-by-category.component';

describe('SearcyByCategoryComponent', () => {
  let component: SearcyByCategoryComponent;
  let fixture: ComponentFixture<SearcyByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearcyByCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearcyByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
