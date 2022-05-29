import { Chip } from "@mui/material"
import { OrderState } from "../../types/OrderState"
import { chooseColorOnOrderState } from "../../utils/styleUtils"

export const StatusChip = (props: { orderState: string }) => {

  const mapText = (orderState: string): string => {
    if (orderState === OrderState.InProgress) {
      return 'In progress'
    }
    return orderState
  }

  return (
    <div>
      <Chip label={mapText(props.orderState)}
        sx={{
          width: '100px',
          backgroundColor: chooseColorOnOrderState(props.orderState)
        }} />
    </div>
  )
}