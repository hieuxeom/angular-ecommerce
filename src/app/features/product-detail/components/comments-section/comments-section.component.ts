import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  type OnChanges,
  type SimpleChanges,
} from '@angular/core';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { PaginatorModule, type PaginatorState } from 'primeng/paginator';
import type { IProductComment } from '../../../../shared/interfaces/product';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommonModule, CommentCardComponent, PaginatorModule],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css',
})
export class CommentsSectionComponent implements OnChanges {
  @Input() productComments: IProductComment[] | undefined;

  public first: number = 0;
  public rows: number = 4;
  public totalRecords: number = 16;

  ngOnChanges(changes: SimpleChanges): void {}

  public onPageChange(event: PaginatorState) {}
}
