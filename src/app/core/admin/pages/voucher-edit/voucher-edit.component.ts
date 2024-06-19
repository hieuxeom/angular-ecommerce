import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { VoucherService } from '../../../../shared/services/VoucherServices/voucher.service';
import { IVoucher } from '../../../../shared/interfaces/voucher';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { convertToInputFormat } from '../../../../shared/utils/formatDate';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-voucher-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './voucher-edit.component.html',
  styleUrl: './voucher-edit.component.css',
})
export class VoucherEditComponent {
  public voucherId: string = '';

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

  private voucherData: IVoucher | undefined;

  public editVoucherForm: FormGroup;

  constructor(
    private voucherService: VoucherService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService
  ) {
    this.editVoucherForm = this._formBuilder.group({
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

    this._route.paramMap.subscribe({
      next: (params) => {
        this.voucherId = params.get('voucherId') ?? '';

        if (this.voucherId) {
          this.getVoucherData();
        }
      },
    });
  }

  private getVoucherData() {
    if (this.voucherId) {
      this.voucherService.getVoucherData(this.voucherId).subscribe({
        next: (response) => {
          this.voucherData = response.data;
          this.voucherData = {
            ...this.voucherData,
            validFrom: convertToInputFormat(this.voucherData.validFrom),
            validTo: convertToInputFormat(this.voucherData.validTo),
          };

          console.log(this.editVoucherForm);

          this.editVoucherForm.patchValue({
            voucherCode: this.voucherData.voucherCode,
            discount: this.voucherData.discount,
            description: this.voucherData.description,
            validFrom: this.voucherData.validFrom,
            validTo: this.voucherData.validTo,
            minimumOrderValue: this.voucherData.minimumOrderValue,
            type: this.voucherData.type,
            maxUsage: this.voucherData.maxUsage,
            isActive: this.voucherData.isActive,
          });
        },
      });
    }
  }

  public handleEditVoucher() {
    this.voucherService
      .editVoucher(this.voucherId, this.editVoucherForm.value)
      .subscribe({
        next: (response) => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });

          setTimeout(() => {
            this._router.navigate(['/admin', 'vouchers']);
          }, 1500);
        },
      });
  }
}
