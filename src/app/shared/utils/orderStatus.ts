import { IListOrderStatus, OrderStatusType } from '../interfaces/order';

export const listOrderStatus: IListOrderStatus[] = [
  {
    label: 'Pending',
    value: 'pending',
    class: 'bg-warning/10 text-warning',
    active: 'bg-warning text-white',
  },
  {
    label: 'Processing',
    value: 'processing',
    class: 'bg-secondary/10 text-secondary',
    active: 'bg-secondary text-white',
  },
  {
    label: 'Shipped',
    value: 'shipped',
    class: 'bg-secondary/10 text-secondary',
    active: 'bg-secondary text-white',
  },
  {
    label: 'Delivered',
    value: 'delivered',
    class: 'bg-success/10 text-success',
    active: 'bg-success text-white',
  },
  {
    label: 'Cancelled',
    value: 'cancelled',
    class: 'bg-danger/10 text-danger',
    active: 'bg-danger text-white',
  },
  {
    label: 'Returned',
    value: 'returned',
    class: 'bg-purple-500/10 text-purple-500',
    active: 'bg-purple-500 text-white',
  },
];

export const OrderStatusClassMap: Record<OrderStatusType, string> = {
  pending: 'bg-warning/10 text-warning',
  processing: 'bg-secondary/10 text-secondary',
  shipped: 'bg-secondary/10 text-secondary',
  delivered: 'bg-success/10 text-success',
  cancelled: 'bg-danger/10 text-danger',
  returned: 'bg-purple-500/10 text-purple-500',
};
