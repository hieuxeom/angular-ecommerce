import { Injectable } from '@angular/core';

export interface IProduct {
  productName: string;
  productPrice: number;
  productImage: string;
  isDiscount: boolean;
  discountPercents: number;
  productRating: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {
  constructor() {}

  public getAllProducts(): IProduct[] {
    return [
      {
        productName: 'Product 1',
        productPrice: 100,
        productImage: 'assets/product/test-2.png',
        isDiscount: false,
        discountPercents: 0,
        productRating: 4.5,
      },
      {
        productName: 'Product 2',
        productPrice: 400,
        productImage: 'assets/product/test-1.png',
        isDiscount: true,
        discountPercents: 12,
        productRating: 4.3,
      },
      {
        productName: 'Product 3',
        productPrice: 100,
        productImage: 'assets/product/test-2.png',
        isDiscount: false,
        discountPercents: 0,
        productRating: 4.5,
      },
      {
        productName: 'Product 4',
        productPrice: 1200,
        productImage: 'assets/product/test-1.png',
        isDiscount: true,
        discountPercents: 10,
        productRating: 3.5,
      },
    ];
  }
}
