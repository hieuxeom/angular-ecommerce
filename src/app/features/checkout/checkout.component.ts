import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { MenuItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { StepsModule } from 'primeng/steps';
import { HrComponent } from '../../shared/components/hr/hr.component';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StepsModule,
    DropdownModule,
    HrComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  public step: number = 3;
  public stepItems: MenuItem[] = [
    { label: 'Billing Address' },
    { label: 'Confirm Payment' },
  ];

  public provinces = [
    { label: 'Hà Nội', value: 'most-popular' },
    { label: 'Hồ Chí Minh', value: 'price-asc' },
    { label: 'Cần Thơ', value: 'price-desc' },
    { label: 'Ninh Thuận', value: 'rating-asc' },
    { label: 'Khánh Hòa', value: 'rating-desc' },
  ];
  public selectedProvince: string = '';
  public cites: string[] = [];
  public selectedCity: string = '';

  public nextStep() {
    return (this.step += 1);
  }
}
