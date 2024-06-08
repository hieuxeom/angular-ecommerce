export interface IOrderItem {
  productId: string;
  productVariant: string;
  quantity: number;
}

export interface ICustomerInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  fullAddress: string;
}

export type OrderStatusType =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface IListOrderStatus {
  label: string;
  value: string;
  class: string;
}

export interface IOrder {
  _id: string;
  customerId: string;
  orderItems: IOrderItem[];
  totalPrice: number;
  subTotalPrice: number;
  discountPrice: number;
  deliveryFee: number;
  orderDate: string;
  voucherCode: string;
  customerInfo: ICustomerInfo;
  createdAt: string;
  updatedAt: string;
  orderStatus: OrderStatusType;
}
