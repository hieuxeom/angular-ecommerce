import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule, type RatingRateEvent } from 'primeng/rating';
@Component({
  selector: 'app-star-rate',
  standalone: true,
  imports: [FormsModule, RatingModule],
  templateUrl: './star-rate.component.html',
  styleUrl: './star-rate.component.css',
})
export class StarRateComponent {
  @Output() starChange = new EventEmitter<number>();
  public numsOfStar = 5;

  public handleStarChange(event: RatingRateEvent) {
    this.starChange.emit(this.numsOfStar);
  }

  public handleOnFocus(event: FocusEvent) {
    this.starChange.emit(this.numsOfStar);
    // return (this.numsOfStar = 1);
  }
}
