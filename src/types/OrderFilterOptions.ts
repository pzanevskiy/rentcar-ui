import { OrderState } from "./OrderState";

export interface OrderFilterOptions {
  date: 'asc' | 'desc',
  price?: 'low' | 'high',
  orderState?: OrderState
}