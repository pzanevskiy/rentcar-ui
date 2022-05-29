import {
  Card, CardContent,
  CardMedia, Grid, Typography,
  Button, Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, InputLabel, Select,
  FormControl, MenuItem, Checkbox, TextField,
  Accordion, AccordionDetails, AccordionSummary,
  CardActions, FormControlLabel, OutlinedInput, Paper,
} from "@mui/material"
import { useEffect, useState } from "react"
import {
  Address,
  Car, Enhancement, getAddresses, getCars,
  GetCarsResponse, getEnhancements, Order
} from "../../api"
import { useParams } from "react-router-dom"
import { NoData } from "../../utils/NoData"
import { Enhancements } from "../enhancements/Enhancements"
import { addOrder } from "../../api/responses"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { add, differenceInDays, differenceInHours, differenceInMilliseconds } from "date-fns"
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers"
import { CarFilterOptions } from "../../types/CarFilterOptions"
import { CarInfo } from "./CarInfo"
import { CarImage } from "./CarImage"
import { useKeycloak } from "@react-keycloak/web"
import { KeycloakLoginOptions } from "keycloak-js"
import { useSnackbar } from "notistack"

const date = new Date()

const defaultOrder: Order = {
  carId: '',
  cityId: '',
  pickUpAddressId: '',
  returnAddressId: '',
  startDate: date,
  endDate: add(date, { days: 1 }),
  enhancements: [],
  totalAmount: 0
}

const defaultFilter: CarFilterOptions = {
  price: 'low',
  types: [],
  seats: 0
}

export const Cars = () => {
  const { id } = useParams<{ id: string }>()
  const { keycloak } = useKeycloak()
  const [cars, setCars] = useState<Car[]>()
  const [selectedCar, setSelectedCar] = useState<Car>({})
  const [addresses, setAddresses] = useState<Address[]>([])
  const [enhancements, setEnhancements] = useState<Enhancement[]>([])
  const [selectedEnh, setSelectedEnh] = useState<Enhancement[]>([])
  const [order, setOrder] = useState<Order>({
    ...defaultOrder,
    cityId: id,
    enhancements: []
  })
  const [filterValues, setFilterValues] = useState({
    allowedTypes: [] as any,
    allowedSeats: [0] as any
  })
  const [filter, setFilter] = useState<CarFilterOptions>({ ...defaultFilter })

  const [expanded, setExpanded] = useState<string | false>(false)

  const [isSame, setIsSame] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar()

  // Modal
  const [open, setOpen] = useState(false)
  const handleOpen = (carId: string) => {
    if (keycloak.authenticated) {
      setOrder({ ...order, carId: carId })
      setSelectedCar(cars?.find(v => v.carId === carId)!)
      setOpen(true)
    } else {
      const options: KeycloakLoginOptions = {
        redirectUri: `http://localhost:3000/cars/${id}`
      }
      keycloak.login(options)
    }
  }
  const handleClose = () => {
    setOrder({ ...defaultOrder, cityId: id, enhancements: [], totalAmount: 0 })
    setSelectedEnh([])
    setIsSame(true)
    setOpen(false)
  }

  useEffect(() => {
    getCarsList()
    getEnhancementsList()
    getAddressesList()
  }, [])

  useEffect(() => {
    calculateTotalAmount()
  }, [order.startDate, order.endDate, order.enhancements, order.carId])

  const getEnhancementsList = () => {
    getEnhancements()
      .then((res: any) => {
        setEnhancements(res)
      })
  }

  const handleOrder = () => {
    const o = order
    const returnId = order.pickUpAddressId
    if (isSame) {
      o.returnAddressId = returnId
      setOrder({ ...order, returnAddressId: returnId })
    }
    handleClose()

    addOrder(order)
      .then((r: any) => {
        enqueueSnackbar('Car has been rented!', { variant: 'success' })
        handleClose()
      })
      .catch((e: any) => {
        enqueueSnackbar('Rent operation failed! Try again later.', { variant: 'error' })
        console.log('rent fail')
      })
  }

  const handleChange = (value: any) => {
    const description = value.find((obj: any) => typeof obj === 'string')
    const enhancement: Enhancement = enhancements.find((e: Enhancement) => e?.description === description)!

    if (selectedEnh.find((e: Enhancement) => e?.description === description)) {
      const fiteredSelection = selectedEnh.filter(x => x.description !== description)
      setOrder({ ...order, enhancements: [...fiteredSelection.map((v: Enhancement) => v.enhancementId!)] })
      setSelectedEnh([...fiteredSelection])
    } else {
      setOrder({
        ...order, enhancements: [...order.enhancements, enhancement.enhancementId!]
      })
      setSelectedEnh([...selectedEnh, enhancement])
    }
  }

  const calculateTotalAmount = () => {
    const carPrice: number = selectedCar.price!
    const totalExtras = selectedEnh.reduce((acc: number, enh: Enhancement) => {
      return acc + enh?.price!
    }, carPrice!)
    const diff = differenceInMilliseconds(order.endDate!, order.startDate!)
    const dayDiff: number = Math.ceil(diff / (1000 * 60 * 60 * 24))

    const totalAmount: number = dayDiff >= 0 ? parseFloat((totalExtras * dayDiff).toFixed(2)) : 0

    setOrder({ ...order, totalAmount: totalAmount })
  }

  const getCarsList = () => {
    getCars(id!)
      .then((response: GetCarsResponse) => {
        const { cars } = response
        setCars(cars)
        setFilterValues({
          ...filterValues,
          allowedTypes: cars?.map((car: Car) => car.type).filter((v, i, a) => a.indexOf(v) === i),
          allowedSeats: [0, ...cars?.map((car: Car) => car.seatsCount).filter((v, i, a) => a.indexOf(v) === i)]
        })
      })
      .catch(e => {
        enqueueSnackbar('Load cars error! Try again later.', { variant: 'error' })
        console.log({ ...e })
      })
  }

  const getAddressesList = () => {
    getAddresses(id!)
      .then((response: Address[]) => {
        setAddresses(response)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }
  const handleExpand = (panel: string) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const carFilter = () => {
    const filteredCarsInternal: Car[] = cars?.filter((car: Car) => {
      if (filter.types.length > 0) {
        if (filter.types.some(v => car.type === v)) {
          return car
        }
        return null
      }
      return car
    }).filter((car: Car) => car.seatsCount! >= filter.seats)!

    if (filter.price === 'low') {
      return filteredCarsInternal.sort((a, b) => a.price! - b.price!)
    }

    return filteredCarsInternal.sort((a, b) => a.price! - b.price!).reverse()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='md'>
        <DialogTitle>Rent car</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} sm={6} pr={3}>
              <DialogContentText mb={1}>Car Info</DialogContentText>
              <Paper elevation={3} sx={{ m: 1 }}>
                <CarImage src={selectedCar?.pictureLink!} alt={`${selectedCar?.brand} ${selectedCar?.model}`} />
              </Paper>
              <CarInfo car={selectedCar} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12} my={1} mr={2}>
                <DialogContentText mb={1}>Pick up address</DialogContentText>
                <FormControl sx={{ m: '1', width: '100%' }}>
                  <InputLabel id="puAddress-label">Select address</InputLabel>
                  <Select
                    label='Select address'
                    labelId="puAddress-label"
                    id="puAddress"
                    value={order.pickUpAddressId}
                    onChange={(e: any) => setOrder({ ...order, pickUpAddressId: e.target.value })}
                  >
                    {addresses.map((address: Address) => (
                      <MenuItem key={address.orderAddressId} value={address.orderAddressId}>
                        {address.orderAddressName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {!isSame &&
                <Grid item xs={12} my={1} mr={2}>
                  <DialogContentText mb={1}>Return address</DialogContentText>
                  <FormControl sx={{ m: '1', width: '100%' }}>
                    <InputLabel id="returnAddress-label">Select address</InputLabel>
                    <Select
                      labelId="returnAddress-label"
                      label='Select address'
                      id="returnAddress"
                      value={order.returnAddressId}
                      onChange={(e: any) => setOrder({ ...order, returnAddressId: e.target.value })}
                    >
                      {addresses.map((address: Address) => (
                        <MenuItem key={address.orderAddressId} value={address.orderAddressId}>
                          {address.orderAddressName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>}
              <Grid item xs={12}>
                <FormControlLabel
                  sx={{ m: 1 }}
                  labelPlacement="start"
                  label="Return at pick-up location"
                  control={<Checkbox checked={isSame}
                    onChange={(e: any) => setIsSame(e.target.checked)} />}
                />
              </Grid>
              <Grid item xs={12}>
                <DialogContentText my={2}>Choose period</DialogContentText>
              </Grid>
              <Grid item xs={12} alignItems='center' my={1} mr={2}>
                <FormControl sx={{ m: '1', width: '100%' }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(params) => <TextField {...params} />}
                      label="From"
                      value={order.startDate}
                      onChange={(newValue) => {
                        setOrder({ ...order, startDate: newValue })
                      }}
                      minDate={date}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} alignItems='center' my={1} mr={2}>
                <FormControl sx={{ m: '1', width: '100%' }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(params) => <TextField {...params} />}
                      label="To"
                      value={order.endDate}
                      onChange={(newValue) => {
                        setOrder({ ...order, endDate: newValue })
                      }}
                      minDate={date}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <DialogContentText my={2}>Extras</DialogContentText>
              </Grid>
              <Grid item xs={12} mr={2}>
                <Enhancements enhancements={enhancements}
                  selectedEnhancements={selectedEnh}
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Typography>Total amount: {order.totalAmount}$</Typography>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOrder}>Rent car</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Grid container p={2} spacing={1}>
          <Grid item height={'100%'} xs={12} sm={3} md={3}>
            <Grid item xs={12} my={1}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="types-filter-label">Types</InputLabel>
                <Select
                  labelId="types-filter-label"
                  id="types-filter-name"
                  multiple
                  value={filter.types}
                  onChange={(e: any) => {
                    const value = e.target.value
                    setFilter({ ...filter, types: typeof value === 'string' ? value.split(',') : value })
                  }}
                  input={<OutlinedInput label="Types" />}
                  MenuProps={MenuProps}
                >
                  {filterValues.allowedTypes.map((type: string) => (<MenuItem key={type} value={type}>{type}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} my={1}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="seats-label">Seats count</InputLabel>
                <Select
                  label='Seats count'
                  labelId="Seats-label"
                  id="Seats"
                  value={filter.seats}
                  onChange={(e: any) => setFilter({ ...filter, seats: e.target.value })}
                >
                  {filterValues.allowedSeats.map((seat: number) => (<MenuItem key={seat} value={seat}>{`${seat}+`}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} my={1}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="sorPrice-label">Sort by price</InputLabel>
                <Select
                  label='Sort by price'
                  labelId="sorPrice-label"
                  id="sorPrice"
                  value={filter.price}
                  onChange={(e: any) => setFilter({ ...filter, price: e.target.value })}
                >
                  <MenuItem key={'low'} value={'low'}>Lowest first</MenuItem>
                  <MenuItem key={'high'} value={'high'}>Highest first</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item my={1}>
              <Button onClick={() => { setFilter({ ...defaultFilter }) }}>Reset filters</Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={9} md={9}>
            {cars!?.length > 0 ? (<Grid container spacing={1}>
              {carFilter().map((car: Car) => (
                <Grid item xs={12} sm={6} md={4} key={car.carId}>
                  <Card>
                    <Accordion expanded={expanded === car.carId} onChange={handleExpand(car.carId!)}>
                      <AccordionSummary
                        aria-controls={`${car.carId}-content`}
                        id={`${car.carId}-header`}
                      >
                        <Grid container>
                          {expanded !== car.carId &&
                            <Grid item xs={12}>
                              <Typography variant="h5" align="center">{car.brand} {car.model}</Typography>
                              <Typography variant="h5" align="center">{car.price}$</Typography>
                            </Grid>}
                          <Grid item xs={12}>
                            <CardMedia
                              sx={{ minHeight: '125px', maxHeight: '100%', maxWidth: '100%', display: 'block' }}
                              component="img"
                              image={car.pictureLink}
                              loading='lazy'
                              alt={`${car.brand} ${car.model}`} />
                          </Grid>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails>
                        <CardContent>
                          <CarInfo car={car} />
                        </CardContent>
                        <CardActions>
                          <Button onClick={() => handleOpen(car.carId!)}>
                            <Typography>Rent</Typography>
                          </Button>
                        </CardActions>
                      </AccordionDetails>
                    </Accordion>
                  </Card>
                </Grid>
              ))}
            </Grid>) : (<NoData message={`No cars available`} />)}
          </Grid>
        </Grid>
      </div>
    </div>
  )
}