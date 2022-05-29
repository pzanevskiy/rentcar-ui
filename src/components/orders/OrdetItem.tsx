import { Paper, Grid, Typography } from "@mui/material"
import { DetailedOrder } from "../../api"
import { EnhancementDetails } from "../enhancements/EnhancementDetails"
import { CarImage } from "../rentCars/CarImage"
import { CarInfo } from "../rentCars/CarInfo"
import { OrderActions } from "./OrderActions"
import { OrderDetailedInfo } from "./OrderDatailedInfo"
import { PenaltyChip } from "./PenaltyChip"
import { StatusChip } from "./StatusChip"

export const OrderItem = (props: { order: DetailedOrder, onStatusUpdate?: (a: string, b: string) => void }) => {
  return (
    <Paper key={props.order.orderId}
      elevation={10}
      sx={{
        backgroundColor: '#eceff1',
        padding: '5px'
      }}>
      <Grid container p={1}>
        <Grid item xs={12} p={1}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PenaltyChip hasPenalties={props.order.hasPenalties} />
            <StatusChip orderState={props.order.statusName} />
          </div>
        </Grid>
        <Grid item xs={12} sm={4} md={4} p={1}>
          <Typography variant="h5" gutterBottom>Order info</Typography>
          <Paper elevation={5}
            sx={{
              minHeight: { sm: '400px' },
              height: { sm: '400px' },
              padding: '5px'
            }}>
            <OrderDetailedInfo info={props.order} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={4} p={1}>
          <Typography variant="h5" gutterBottom>Car info</Typography>
          <Paper elevation={5}
            sx={{
              minHeight: { sm: '400px' },
              height: { sm: '400px' },
              padding: '5px'
            }}>
            <div>
              <div style={{ margin: '0 auto' }}>
                <CarImage src={props.order.car.pictureLink!} alt={`${props.order.car.brand} ${props.order.car.model}`} />
              </div>
            </div>
            <CarInfo car={props.order.car} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={4} p={1}>
          <Typography variant="h5" gutterBottom>Extras info</Typography>
          <Paper elevation={5}
            sx={{
              minHeight: { sm: '400px' },
              height: { sm: '400px' },
              padding: '5px'
            }}>
            <EnhancementDetails enhancements={props.order.enhancements} />
          </Paper>
        </Grid>
        <Grid container p={1} mt={2}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ textAlign: 'end' }}>Total amount - {props.order.totalAmount}$</Typography>
          </Grid>
          <Grid item xs={12}>
            <OrderActions status={props.order.statusName} orderId={props.order.orderId} onClick={props.onStatusUpdate!} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}