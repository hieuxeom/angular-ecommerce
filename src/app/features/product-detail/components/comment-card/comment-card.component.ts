import {
  Component,
  Input,
  type OnChanges,
  type SimpleChanges,
} from '@angular/core';
import type { IProductComment } from '../../../../shared/interfaces/product';
import { formatDate } from '../../../../shared/utils/formatDate';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
})
export class CommentCardComponent implements OnChanges {
  @Input() commentData: IProductComment | undefined;

  public userName: string = '';
  public commentContent: string = '';
  public _idComment: string = '';
  public postedOn: string = '';

  ngOnChanges() {
    if (this.commentData) {
      this._idComment = this.commentData._id;
      this.userName = this.commentData.userName;
      this.commentContent = this.commentData.commentContent;
      this.postedOn = formatDate(this.commentData.createdAt);
    }
  }
}
