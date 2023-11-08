import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasroomsComponent } from './classrooms.component';

describe('ClasroomsComponent', () => {
  let component: ClasroomsComponent;
  let fixture: ComponentFixture<ClasroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
