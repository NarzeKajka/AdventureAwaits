import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaWycieczekComponent } from './lista-wycieczek.component';

describe('ListaWycieczekComponent', () => {
  let component: ListaWycieczekComponent;
  let fixture: ComponentFixture<ListaWycieczekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaWycieczekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaWycieczekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
