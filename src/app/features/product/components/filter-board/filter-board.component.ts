import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SliderModule, type SliderChangeEvent } from 'primeng/slider';

import { HrComponent } from '../../../../shared/components/hr/hr.component';
@Component({
  selector: 'app-filter-board',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SliderModule, HrComponent],
  templateUrl: './filter-board.component.html',
  styleUrl: './filter-board.component.css',
})
export class FilterBoardComponent {
  public minValue: number = 0;
  public maxValue: number = 10000;
  public currentValue: number[] = [50, 1000];
  public demoColor = Array.from({ length: 10 });

  public constructor() {}

  public onChangeValue(event: SliderChangeEvent) {
    this.currentValue = event.values || [];
  }
}
