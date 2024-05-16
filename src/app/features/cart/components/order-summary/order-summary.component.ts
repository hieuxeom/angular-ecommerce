import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HrComponent } from '../../../../shared/components/hr/hr.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, RouterLink, HrComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
  public isVoucher: boolean = true;
  public isHaveShipFee: boolean = false;
}
