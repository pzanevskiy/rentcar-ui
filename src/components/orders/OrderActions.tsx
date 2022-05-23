import { Button } from "@mui/material"
import { OrderState } from "../../types/OrderState"

export const OrderActions = (props: {
  status: string,
  orderId: string,
  onClick: (orderId: string, status: string) => void
}) => {
  return (
    <div>
      {props.status === OrderState.Pending && (
        <Button onClick={() => props.onClick(props.orderId, OrderState.Canceled)}>Cancel</Button>)}
      {props.status === OrderState.InProgress && (
        <Button onClick={() => props.onClick(props.orderId, OrderState.Completed)}>Complete</Button>)}
    </div>
  )
}