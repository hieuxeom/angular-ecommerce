import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import {
  AnalyticsDataService,
  type IAnalyticData,
} from './services/analytics-data/analytic-data.service';
import { BrandSlideComponent } from './components/brand-slide/brand-slide.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ArrivalsSectionComponent } from './components/arrivals-section/arrivals-section.component';
import { TopSellingComponent } from './components/top-selling/top-selling.component';
import { BrowseSectionComponent } from './components/browse-section/browse-section.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    SliderModule,
    FormsModule,
    BrandSlideComponent,
    HeroSectionComponent,
    ArrivalsSectionComponent,
    TopSellingComponent,
    BrowseSectionComponent,
  ],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
