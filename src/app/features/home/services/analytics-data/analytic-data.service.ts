import { Injectable } from '@angular/core';

export interface IAnalyticData {
  metricNumber: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsDataService {
  constructor() {}

  public getAnalyticsData(): IAnalyticData[] {
    return [
      {
        metricNumber: '200',
        category: 'International Brands',
      },
      {
        metricNumber: '2,000',
        category: 'High-Quality Products',
      },
      {
        metricNumber: '30,000',
        category: 'Happy Customers',
      },
    ];
  }
}
