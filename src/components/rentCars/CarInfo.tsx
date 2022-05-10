import { Tooltip, Typography } from "@mui/material"
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
      <Typography>{props.car?.brand} {props.car?.model}</Typography>
      <Typography><Tooltip title='Сar body type'><DirectionsCarRoundedIcon /></Tooltip>  {props.car?.type}</Typography>
      <Typography><Tooltip title='Type of transmission'><SettingsRoundedIcon /></Tooltip> {props.car?.transmission}</Typography>
      <Typography><Tooltip title='Doors count'><SensorDoorRoundedIcon /></Tooltip> {props.car?.doorsCount}</Typography>
      <Typography><Tooltip title='Seats count'><AirlineSeatReclineExtraRoundedIcon /></Tooltip> {props.car?.seatsCount}</Typography>
      <Typography><Tooltip title='Bags capacity'><WorkRoundedIcon /></Tooltip> {props.car?.bagsCount}</Typography>
      <Typography><Tooltip title='Air conditioning'><AcUnitRoundedIcon /></Tooltip> {props.car?.ac ? 'A/C' : 'No A/C'}</Typography>
      <Typography><Tooltip title='Price per one day'><AttachMoneyRoundedIcon /></Tooltip> {props.car?.price}$ | day</Typography>
    </div>
  )
}