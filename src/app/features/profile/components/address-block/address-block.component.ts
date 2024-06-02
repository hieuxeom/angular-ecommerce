import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IUserAddress } from '../../../../shared/interfaces/user';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'address-block',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './address-block.component.html',
  styleUrl: './address-block.component.css',
})
export class AddressBlockComponent {
  @Input() addressData!: IUserAddress;

  ngOnInit() {
    console.log(this.addressData);
  }
}
