import {
  Card, CardActionArea, CardContent, CardMedia, Grid,
  Modal, TextField, Typography, Fade, Button, Box
} from "@mui/material"
import { useEffect, useState } from "react"
import { Car, Enhancement, getCars, GetCarsResponse, getEnhancements } from "../../api"
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded'
import SensorDoorRoundedIcon from '@mui/icons-material/SensorDoorRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import AirlineSeatReclineExtraRoundedIcon from '@mui/icons-material/AirlineSeatReclineExtraRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'
import DirectionsCarFilledTwoToneIcon from '@mui/icons-material/DirectionsCarFilledTwoTone'
import { useParams } from "react-router-dom"
import { NoData } from "../../utils/NoData"
import Backdrop from '@mui/material/Backdrop'
import { EnhancedEncryption } from "@mui/icons-material"
import { Enhancements } from "../enhancements/Enhancements"
import { stringToColorWithString } from "../../utils/styleUtils"

export const Cars = () => {
  const { id } = useParams<{ id: string }>()
  const [cars, setCars] = useState<Car[]>()
  const [enhancements, setEnhancements] = useState<Enhancement[]>([])
  const [selectedEnh, setSelectedEnh] = useState<Enhancement[]>([])

  // Modal
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setSelectedEnh([])
    setOpen(false)
  }
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  useEffect(() => {
    getCarsList()
  }, [])

  useEffect(() => {
    getEnhancementsList()
  }, [])

  const getEnhancementsList = () => {
    getEnhancements()
      .then((res: any) => {
        setEnhancements(res)
      })
  }

  const handleChange = (value: any) => {
    const description = value.find((obj: any) => typeof obj === 'string')
    const enhancement: Enhancement = enhancements.find((e: Enhancement) => e?.description == description)!

    if (selectedEnh.find((e: Enhancement) => e?.description == description)) {
      const fiteredSelection = selectedEnh.filter(x => x.description != description)
      setSelectedEnh([...fiteredSelection])

    } else {
      setSelectedEnh([...selectedEnh, enhancement])

    }
  }

  const getCarsList = () => {
    getCars(id!)
      .then((response: GetCarsResponse) => {
        const { cars } = response
        setCars(cars)
      })
  }

  const stringToColor = () => {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16)
    return color;
  }

  return (
    <div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Enhancements enhancements={enhancements} selectedEnhancements={selectedEnh} handleChange={handleChange} />
              <Button onClick={() => console.log('rent')}>Add</Button>
            </Box>
          </Fade>
        </Modal>
      </div>
      <div>
        {cars!?.length > 0 ? (<Grid container spacing={1} mt={1}>
          {cars?.map((car: Car) => (
            <Grid item xs={12} sm={6} md={4} key={car.carId} >
              <Card >
                <CardActionArea onClick={handleOpen}>
                  <CardMedia sx={{ textAlign: 'center' }} component="div">
                    <DirectionsCarFilledTwoToneIcon sx={{
                      color: stringToColorWithString(`${car.brand[0]}${car.model[0]}`),
                      fontSize: 250
                    }} />
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
        </Grid>) : (<NoData message={`No cars available`} />)}
      </div>
    </div>
  )
}