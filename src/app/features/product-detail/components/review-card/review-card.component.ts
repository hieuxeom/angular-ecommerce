import { Component, Input, type OnChanges } from '@angular/core';
import type { IProductReview } from '../../../../shared/interfaces/product';
import { CommonModule } from '@angular/common';
import { formatDate } from '../../../../shared/utils/formatDate';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent implements OnChanges {
  @Input() reviewData: IProductReview | undefined;

  public userName: string = '';
  public reviewContent: string = '';
  public reviewStar: any[] = [];
  public _idReview: string = '';
  public postedOn: string = '';

  ngOnChanges() {
    console.log(this.reviewData);

    if (this.reviewData) {
      this._idReview = this.reviewData._id;
      this.userName = this.reviewData.userName;
      this.reviewContent = this.reviewData.reviewContent;
      this.reviewStar = Array(this.reviewData.reviewStar).fill('');
      this.postedOn = formatDate(this.reviewData.createdAt);
    }
  }
}
