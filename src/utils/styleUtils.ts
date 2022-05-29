import { OrderState } from "../types/OrderState";

export const stringToColor = () => {
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16)
  return color;
}

export const stringToColorWithString = (string: string) => {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export const chooseColorOnOrderState = (orderState: string): string => {
  switch (orderState) {
    case OrderState.Pending: return '#b0bec5'
    case OrderState.Canceled: return '#ffffa3'
    case OrderState.Rejected: return '#ffa199'
    case OrderState.Completed: return '#c7f7d4'
    case OrderState.InProgress: return '#99dfff'
    default: return 'white'
  }
}