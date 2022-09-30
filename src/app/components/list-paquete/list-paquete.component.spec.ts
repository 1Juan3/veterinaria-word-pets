import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaqueteComponent } from './list-paquete.component';

describe('ListPaqueteComponent', () => {
  let component: ListPaqueteComponent;
  let fixture: ComponentFixture<ListPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPaqueteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
