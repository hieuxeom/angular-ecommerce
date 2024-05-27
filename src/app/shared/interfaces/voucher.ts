export interface IVoucher {
  voucherCode: string;
  discount: number;
  description: string;
  validFrom: string;
  validTo: string;
  minimumOrderValue: number;
  usedCount: number;
  type: 'bill' | 'ship';
  isActive: boolean;
}
