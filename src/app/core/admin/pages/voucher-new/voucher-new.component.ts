import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { VoucherService } from '../../../../shared/services/VoucherServices/voucher.service';

@Component({
  selector: 'app-voucher-new',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule,
  ],
  providers: [MessageService],
  templateUrl: './voucher-new.component.html',
  styleUrl: './voucher-new.component.css',
})
export class VoucherNewComponent {
  public voucherType = [
    {
      label: 'Shipping',
      value: 'ship',
    },
    {
      label: 'Billing',
      value: 'bill',
    },
  ];

  public newVoucherForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private voucherService: VoucherService,
    private _messageService: MessageService,
    private _router: Router
  ) {
    this.newVoucherForm = this._formBuilder.group({
      voucherCode: ['', Validators.required],
      discount: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      description: ['', Validators.required],
      validFrom: ['', Validators.required],
      validTo: ['', Validators.required],
      minimumOrderValue: [1, [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      maxUsage: [1, [Validators.required, Validators.min(1)]],
      isActive: [true, Validators.required],
    });
  }

  public handleCreateVoucher() {
    this.voucherService
      .createVoucher(this.newVoucherForm.value)
      .subscribe((response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });

        setTimeout(() => {
          this._router.navigate(['/admin', 'vouchers']);
        }, 1500);
      });
  }
}
