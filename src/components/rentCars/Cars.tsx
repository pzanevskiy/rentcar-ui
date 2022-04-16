import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Car, getCars, GetCarsResponse } from "../../api"
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded'
import SensorDoorRoundedIcon from '@mui/icons-material/SensorDoorRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import AirlineSeatReclineExtraRoundedIcon from '@mui/icons-material/AirlineSeatReclineExtraRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'
import DirectionsCarFilledTwoToneIcon from '@mui/icons-material/DirectionsCarFilledTwoTone'
import { useParams } from "react-router-dom"

export const Cars = () => {
  const { id } = useParams<{ id: string }>()
  const [cars, setCars] = useState<Car[]>()

  useEffect(() => {
    getCarsList()
  }, [])

  const getCarsList = () => {
    getCars(id!)
      .then((response: GetCarsResponse) => {
        const { cars } = response
        setCars(cars)
        console.log(cars);

      })
  }

  const stringToColor = () => {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16)
    return color;
  }

  return (
    <div>
      <Grid container spacing={1} mt={1}>
        {cars?.map((car: Car) => (
          <Grid item xs={12} sm={6} md={4} key={car.carId} >
            <Card >
              <CardActionArea onClick={() => alert(`rent ${car.carId}`)}>
                <CardMedia sx={{ textAlign: 'center' }}
                  component="div"
                >
                  <DirectionsCarFilledTwoToneIcon htmlColor={stringToColor()} sx={{ fontSize: 250 }} />
                </CardMedia>
                <CardContent>
                  <Typography>{car.brand} {car.model}</Typography>
                  <Typography><DirectionsCarRoundedIcon /> {car.type}</Typography>
                  <Typography><SettingsRoundedIcon /> {car.transmission}</Typography>
                  <Typography><SensorDoorRoundedIcon /> {car.doorsCount}</Typography>
                  <Typography><AirlineSeatReclineExtraRoundedIcon /> {car.seatsCount}</Typography>
                  <Typography><WorkRoundedIcon /> {car.bagsCount}</Typography>
                  <Typography><AcUnitRoundedIcon /> {car.ac ? 'A/C' : 'No A/C'}</Typography>
                  <Typography><AttachMoneyRoundedIcon /> {car.price}$ | day</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}