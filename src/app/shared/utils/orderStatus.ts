import { IListOrderStatus, OrderStatusType } from "../interfaces/order";

export const listOrderStatus: IListOrderStatus[] = [
  {
    label: 'Pending',
    value: 'pending',
    class: 'bg-warning/10 text-warning',
  },
  {
    label: 'Processing',
    value: 'processing',
    class: 'bg-secondary/10 text-secondary',
  },
  {
    label: 'Shipped',
    value: 'shipped',
    class: 'bg-secondary/10 text-secondary',
  },
  {
    label: 'Delivered',
    value: 'delivered',
    class: 'bg-success/10 text-success',
  },
  {
    label: 'Cancelled',
    value: 'cancelled',
    class: 'bg-danger/10 text-danger',
  },
  {
    label: 'Returned',
    value: 'returned',
    class: 'bg-purple-500/10 text-purple-500',
  },
];

export const OrderStatusMap: Record<OrderStatusType, string> = {
  pending: 'bg-warning/10 text-warning',
  processing: 'bg-secondary/10 text-secondary',
  shipped: 'bg-secondary/10 text-secondary',
  delivered: 'bg-success/10 text-success',
  cancelled: 'bg-danger/10 text-danger',
  returned: 'bg-purple-500/10 text-purple-500',
};
