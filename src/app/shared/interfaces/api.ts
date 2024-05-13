export interface IApiResponse<T> {
  status: 'success' | 'failure' | 'error';
  message: string;
  data: T;
}
