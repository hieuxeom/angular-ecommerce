import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { PaginatorModule, type PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommonModule, CommentCardComponent, PaginatorModule],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css',
})
export class CommentsSectionComponent {
  public first: number = 0;
  public rows: number = 4;
  public totalRecords: number = 16;

  public onPageChange(event: PaginatorState) {
    console.log(event);
  }
}
