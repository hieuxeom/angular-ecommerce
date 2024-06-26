import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherNewComponent } from './voucher-new.component';

describe('VoucherNewComponent', () => {
  let component: VoucherNewComponent;
  let fixture: ComponentFixture<VoucherNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoucherNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoucherNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
