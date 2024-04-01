import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodanieWycieczkiComponent } from './dodanie-wycieczki.component';

describe('DodanieWycieczkiComponent', () => {
  let component: DodanieWycieczkiComponent;
  let fixture: ComponentFixture<DodanieWycieczkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DodanieWycieczkiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DodanieWycieczkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
