import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseSectionComponent } from './browse-section.component';

describe('BrowseSectionComponent', () => {
  let component: BrowseSectionComponent;
  let fixture: ComponentFixture<BrowseSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
