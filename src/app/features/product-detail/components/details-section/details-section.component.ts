import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HrComponent } from '../../../../shared/components/hr/hr.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-details-section',
  standalone: true,
  imports: [CommonModule, FormsModule, HrComponent, InputNumberModule],
  templateUrl: './details-section.component.html',
  styleUrl: './details-section.component.css',
})
export class DetailsSectionComponent {
  public selectedSize: string = 'S';
  public quantity: number = 1;

  public onSelectSize(event: MouseEvent) {
    const element = event.target as HTMLButtonElement;
    return (this.selectedSize = element.getAttribute('data-size') || 'S');
  }
}
