export interface OrderFilterOptions {
  date: 'asc' | 'desc',
  price?: 'low' | 'high' | '',
  orderState?: string
}