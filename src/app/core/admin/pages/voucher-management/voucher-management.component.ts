import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { VoucherItemComponent } from './components/voucher-item/voucher-item.component';
import { VoucherService } from '../../../../shared/services/VoucherServices/voucher.service';
import { IVoucher } from '../../../../shared/interfaces/voucher';
import { formatDate } from '../../../../shared/utils/formatDate';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-voucher-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    VoucherItemComponent,
  ],
  providers: [MessageService],
  templateUrl: './voucher-management.component.html',
  styleUrl: './voucher-management.component.css',
})
export class VoucherManagementComponent {
  public listVouchers: IVoucher[] = [];

  constructor(private voucherService: VoucherService) {
    this.getListVouchers();
  }

  public getListVouchers() {
    this.voucherService.getAllVouchers().subscribe((response) => {
      this.listVouchers = response.data.map((_v) => {
        return {
          ..._v,
          validFrom: formatDate(_v.validFrom),
          validTo: formatDate(_v.validTo),
          createdAt: formatDate(_v.createdAt),
          updatedAt: formatDate(_v.updatedAt),
        };
      });
      console.log(this.listVouchers);
    });
  }
}
