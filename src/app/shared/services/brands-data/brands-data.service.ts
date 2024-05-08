import { Injectable } from '@angular/core';

export interface IBrandData {
  brandName: string;
  brandImagePath: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrandsDataService {
  constructor() {}

  public getBrandsData(): IBrandData[] {
    return [
      {
        brandName: 'versace',
        brandImagePath: 'assets/brands-logo/versace.png',
      },
      {
        brandName: 'calvinklein',
        brandImagePath: 'assets/brands-logo/calvinklein.png',
      },
      {
        brandName: 'gucci',
        brandImagePath: 'assets/brands-logo/gucci.png',
      },
      {
        brandName: 'zara',
        brandImagePath: 'assets/brands-logo/zara.png',
      },
    ];
  }
}
