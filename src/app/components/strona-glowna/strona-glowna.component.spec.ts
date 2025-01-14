import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StronaGlownaComponent } from './strona-glowna.component';

describe('StronaGlownaComponent', () => {
  let component: StronaGlownaComponent;
  let fixture: ComponentFixture<StronaGlownaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StronaGlownaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StronaGlownaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
