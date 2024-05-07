import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSlideComponent } from './brand-slide.component';

describe('BrandSlideComponent', () => {
  let component: BrandSlideComponent;
  let fixture: ComponentFixture<BrandSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandSlideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrandSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
