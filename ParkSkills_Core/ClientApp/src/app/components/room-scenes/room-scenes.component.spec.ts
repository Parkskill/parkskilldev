import { RoomScenesComponent } from './room-scenes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('SideNavComponent', () => {
  let component: RoomScenesComponent;
  let fixture: ComponentFixture<RoomScenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomScenesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
