import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpConfigService } from '../HttpConfig/http-config.service';
import type { IApiResponse } from '../../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  public API_URL = 'http://localhost:5000/api/products';

  constructor(
    private httpClient: HttpClient,
    private _httpConfig: HttpConfigService
  ) {}

  public createNewReview(
    productId: string,
    reviewBody: { reviewContent: string; reviewStar: number }
  ) {
    return this.httpClient.post<IApiResponse>(
      `${this.API_URL}/${productId}/reviews`,
      reviewBody,
      this._httpConfig.getHttpOptions()
    );
  }
}
