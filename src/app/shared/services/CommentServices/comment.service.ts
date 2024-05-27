import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfigService } from '../HttpConfig/http-config.service';
import type { IApiResponse } from '../../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  public API_URL = 'http://localhost:5000/api/products';

  constructor(
    private httpClient: HttpClient,
    private _httpOptions: HttpConfigService
  ) {}

  public createNewComment(productId: string, commentContent: string) {
    return this.httpClient.post<IApiResponse>(
      `${this.API_URL}/${productId}/comments`,
      {
        commentContent,
      },
      this._httpOptions.getHttpOptions()
    );
  }
}
