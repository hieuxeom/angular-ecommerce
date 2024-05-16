import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  type OnChanges,
  type SimpleChanges,
} from '@angular/core';
import type { IProductReview } from '../../../../shared/interfaces/product';
import { ReviewCardComponent } from '../review-card/review-card.component';

@Component({
  selector: 'app-reviews-section',
  standalone: true,
  imports: [CommonModule, ReviewCardComponent],
  templateUrl: './reviews-section.component.html',
  styleUrl: './reviews-section.component.css',
})
export class ReviewsSectionComponent implements OnChanges {
  @Input() productReviews: IProductReview[] | undefined;
  ngOnChanges(changes: SimpleChanges): void {}
}
