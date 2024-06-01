import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressBoxComponent } from './address-box.component';

describe('AddressBoxComponent', () => {
  let component: AddressBoxComponent;
  let fixture: ComponentFixture<AddressBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
