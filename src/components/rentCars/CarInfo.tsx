import { Grid, Tooltip, Typography } from "@mui/material"
import { Car } from "../../api"
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded'
import SensorDoorRoundedIcon from '@mui/icons-material/SensorDoorRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import AirlineSeatReclineExtraRoundedIcon from '@mui/icons-material/AirlineSeatReclineExtraRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'

export const CarInfo = (props: { car: Car }) => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} textAlign='center'>
          <Typography variant="h5" gutterBottom>{props.car?.brand} {props.car?.model}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" gutterBottom><Tooltip title='Сar body type'><DirectionsCarRoundedIcon /></Tooltip>  {props.car?.type}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" gutterBottom><Tooltip title='Type of transmission'><SettingsRoundedIcon /></Tooltip> {props.car?.transmission}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" gutterBottom><Tooltip title='Doors count'><SensorDoorRoundedIcon /></Tooltip> {props.car?.doorsCount}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" gutterBottom><Tooltip title='Seats count'><AirlineSeatReclineExtraRoundedIcon /></Tooltip> {props.car?.seatsCount}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" gutterBottom><Tooltip title='Bags capacity'><WorkRoundedIcon /></Tooltip> {props.car?.bagsCount}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" gutterBottom><Tooltip title='Air conditioning'><AcUnitRoundedIcon /></Tooltip> {props.car?.ac ? 'A/C' : 'No A/C'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom><Tooltip title='Price per one day'><AttachMoneyRoundedIcon /></Tooltip> {props.car?.price}$ | day</Typography>
        </Grid>
      </Grid>
    </div>
  )
}