import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzczegolyWycieczkiComponent } from './szczegoly-wycieczki.component';

describe('SzczegolyWycieczkiComponent', () => {
  let component: SzczegolyWycieczkiComponent;
  let fixture: ComponentFixture<SzczegolyWycieczkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SzczegolyWycieczkiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SzczegolyWycieczkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
