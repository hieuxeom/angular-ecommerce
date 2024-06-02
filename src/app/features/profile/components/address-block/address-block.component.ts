import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
  @Output() onDelete = new EventEmitter<string>();

  @ViewChild('parentElement') parentElement!: ElementRef;
  ngOnInit() {
    console.log(this.addressData);
  }

  public onDeleteButton() {
    this.parentElement.nativeElement.remove();
    return this.onDelete.emit(this.addressData._id);
  }
}
