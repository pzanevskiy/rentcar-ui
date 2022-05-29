import { List, ListItem, ListItemText, Typography } from "@mui/material"
import dayjs from "dayjs"
import { DetailedOrder } from "../../api"
import { OrderState } from "../../types/OrderState"

export const OrderDetailedInfo = (props: { info: DetailedOrder }) => {
  return (
    <div>
      <List disablePadding dense>
        <ListItem>
          <ListItemText primary="Pick up location" secondary={props.info.pickUpLocation} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Return location" secondary={props.info.returnLocation} />
        </ListItem>
        <ListItem>
          <ListItemText primary="From" secondary={dayjs(props.info.startDate).format('DD.MM.YYYY HH:mm')} />
        </ListItem>
        <ListItem>
          <ListItemText primary="To" secondary={dayjs(props.info.endDate).format('DD.MM.YYYY HH:mm')} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Created at" secondary={dayjs(props.info.dateTimeCreated).format('DD.MM.YYYY HH:mm')} />
        </ListItem>
        {(props.info.statusName === OrderState.Completed ||
          props.info.statusName === OrderState.Canceled ||
          props.info.statusName === OrderState.Rejected)
          &&
          <ListItem>
            <ListItemText primary="Finished at" secondary={dayjs(props.info.dateTimeFinished).format('DD.MM.YYYY HH:mm')} />
          </ListItem>
        }
      </List>
      {/* <Typography variant="body1">Pick up location: </Typography>
      <Typography variant="subtitle2">{props.info.pickUpLocation}</Typography>

      <Typography variant="body1">Return location: </Typography>
      <Typography variant="subtitle2">{props.info.returnLocation}</Typography>

      <Typography variant="body1">From </Typography>
      <Typography variant="subtitle2">{dayjs(props.info.startDate).format('DD.MM.YYYY HH:mm')}</Typography>

      <Typography variant="body1">To </Typography>
      <Typography variant="subtitle2">{dayjs(props.info.endDate).format('DD.MM.YYYY HH:mm')}</Typography>

      <Typography variant="body1">Created at </Typography>
      <Typography variant="subtitle2">{dayjs(props.info.dateTimeCreated).format('DD.MM.YYYY HH:mm')}</Typography>

      {(props.info.statusName === OrderState.Completed ||
        props.info.statusName === OrderState.Canceled ||
        props.info.statusName === OrderState.Rejected)
        && <Typography variant="body2">Finished at - {dayjs(props.info.dateTimeFinished).format('DD.MM.YYYY HH:mm')}</Typography>} */}
    </div>
  )
}