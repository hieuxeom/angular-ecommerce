import { Component } from '@angular/core';
import {
  AnalyticsDataService,
  type IAnalyticData,
} from '../../services/analytics-data/analytic-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  providers: [AnalyticsDataService],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {
  analyticsData: IAnalyticData[] = [];

  constructor(private analyticsService: AnalyticsDataService) {
    this.analyticsData = analyticsService.getAnalyticsData();
  }
}
