export interface IVoucher {
  _id: string;
  voucherCode: string;
  discount: number;
  description: string;
  validFrom: string;
  validTo: string;
  minimumOrderValue: number;
  usedCount: number;
  maxUsage: number;
  type: 'bill' | 'ship';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
