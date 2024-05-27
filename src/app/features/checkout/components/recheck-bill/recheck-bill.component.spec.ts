import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecheckBillComponent } from './recheck-bill.component';

describe('RecheckBillComponent', () => {
  let component: RecheckBillComponent;
  let fixture: ComponentFixture<RecheckBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecheckBillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecheckBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
