import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type {
  IApiAddressResponse,
  IDistrict,
  IProvince,
  IWard,
} from '../../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  public API_PROVINCES = 'https://vapi.vnappmob.com/api/province';
  public API_DISTRICTS = 'https://vapi.vnappmob.com/api/province/district';
  public API_WARDS = 'https://vapi.vnappmob.com/api/province/ward';

  constructor(private httpClient: HttpClient) {}
  public getListProvinces() {
    return this.httpClient.get<IApiAddressResponse<IProvince>>(
      `${this.API_PROVINCES}`
    );
  }

  public getListDistricts(provinceId: string) {
    return this.httpClient.get<IApiAddressResponse<IDistrict>>(
      `${this.API_DISTRICTS}/${provinceId}`
    );
  }

  public getListWards(districtId: string) {
    return this.httpClient.get<IApiAddressResponse<IWard>>(
      `${this.API_WARDS}/${districtId}`
    );
  }
}
