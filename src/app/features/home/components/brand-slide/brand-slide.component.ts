import { Component } from '@angular/core';
import {
  BrandsDataService,
  type IBrandData,
} from '../../services/brands-data/brands-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-slide',
  standalone: true,
  imports: [CommonModule],
  providers: [BrandsDataService],
  templateUrl: './brand-slide.component.html',
  styleUrl: './brand-slide.component.css',
})
export class BrandSlideComponent {
  brandsData: IBrandData[] = [];
  constructor(private brandsService: BrandsDataService) {
    this.brandsData = brandsService.getBrandsData();
    console.log(this.brandsData);
  }
}
