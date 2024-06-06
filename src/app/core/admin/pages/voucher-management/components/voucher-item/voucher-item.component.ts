import { Component, Input, SimpleChanges } from '@angular/core';
import { IVoucher } from '../../../../../../shared/interfaces/voucher';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-voucher-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './voucher-item.component.html',
  styleUrl: './voucher-item.component.css',
})
export class VoucherItemComponent {
  @Input() voucherData: IVoucher | undefined;

  public VoucherType: Record<string, string> = {
    ship: 'Shipping Voucher',
    bill: 'Billing Voucher',
    '': '',
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}
}
