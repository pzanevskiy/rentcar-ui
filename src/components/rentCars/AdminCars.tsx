import {
  Button, Dialog,
  DialogActions, DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput, Select, Switch
} from "@mui/material"
import {
  DataGrid, GridColDef, GridToolbarColumnsButton,
  GridToolbarContainer, GridToolbarDensitySelector,
  GridToolbarExport, GridToolbarFilterButton
} from "@mui/x-data-grid"
import { useState, useEffect } from "react"
import {
  Brand, Car, CarType, deleteCar, getAllCars,
  getBrands, getCarTypes, getModelsByBrandId, Model
} from "../../api"
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { NoData } from "../../utils/NoData"
import { addCar } from "../../api/responses"
import { CarImage } from "./CarImage"

const CustomNoRowsOverlay = () => {
  return (<><NoData message={`No cars available`} /></>)
}
const defaultCar: Car = {
  brand: '',
  model: '',
  type: '',
  transmission: '',
  doorsCount: 0,
  seatsCount: 0,
  bagsCount: 0,
  ac: false
}
export const AdminCars = () => {
  const [cars, setCars] = useState<Car[]>([])
  const [selectedCars, setSelectedCars] = useState<any>([])
  const [car, setCar] = useState<Car>(defaultCar)

  const [brands, setBrands] = useState<Brand[]>([])
  const [models, setModels] = useState<Model[]>([])
  const [types, setTypes] = useState<CarType[]>([])

  // Modal
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    getBrands()
      .then((res: Brand[]) => {
        setBrands(res)
      })

    getCarTypes()
      .then((res: CarType[]) => {
        setTypes(res)
      })

    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const handleAdd = () => {
    addCar(car)
      .then((r: any) => {
        getCarsList()
        setCar(defaultCar)
      })
      .catch((e: any) => {
        console.log('error while adding car')
      })
    setOpen(false)
  }

  useEffect(() => {
    getCarsList()
  }, [])

  const getCarsList = () => {
    getAllCars()
      .then((response: any) => {
        setCars(response)
      })
  }

  const CustomToolBar = () => {
    const remove = () => {
      console.log(selectedCars);
      // debugger
      if (selectedCars.length > 0) {
        selectedCars.map((id: string) => deleteCar(id)
          .then((res: any) => {
            getCarsList()
          })
          .catch((e: any) => {
            console.log(`no delete`)
          }))
      }
    }

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport csvOptions={{ fileName: 'Cars' }} />
        <Button size="small" onClick={handleOpen}>
          <AddRoundedIcon fontSize='medium' />Add
        </Button>
        <Button size="small" onClick={remove}>
          <ClearRoundedIcon fontSize='medium' />Delete
        </Button>
      </GridToolbarContainer>
    )
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'id',
      width: 300,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      width: 100
    },
    {
      field: 'model',
      headerName: 'Model',
      width: 100
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 100
    },
    {
      field: 'transmission',
      headerName: 'Transmission',
      width: 100
    },
    {
      field: 'doors',
      headerName: 'Doors',
      width: 75
    },
    {
      field: 'seats',
      headerName: 'Seats',
      width: 75
    },
    {
      field: 'ac',
      headerName: 'A/C',
      width: 50
    },
    {
      field: 'bags',
      headerName: 'Bags',
      width: 75
    },
    {
      field: 'pictureLink',
      headerName: 'Link',
      width: 100,
      renderCell: (val) => {
        return (
          <Link target='_blank' href={val.row['pictureLink']}>Picture</Link>
        )
      }
    },
    {
      field: 'picture',
      headerName: 'Picture',
      width: 100,
      renderCell: (val) => {
        return (
          <CarImage src={val.row['pictureLink']} alt={val.row['brand']} />
        )
      }
    }
  ]

  const handleBrandSelect = (brand: string) => {
    const brandId = brands.find((i: Brand) => i.brandName === brand)?.brandId
    setCar({ ...car, brand: brand })

    getModelsByBrandId(brandId!)
      .then((res: Model[]) => {
        setModels(res)
      })
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
        <DialogTitle>Add car</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item m={1} xs={12} textAlign='center'>
              <FormControl sx={{ minWidth: '75%' }} size="small">
                <InputLabel id="brand-label">Brand</InputLabel>
                <Select
                  labelId="brand-label"
                  id="brandId"
                  value={car?.brand}
                  label="Brand"
                  onChange={(e: any) => handleBrandSelect(e.target.value)}
                >
                  {brands.map((brand: Brand) =>
                    (<MenuItem key={brand.brandId} value={brand.brandName}>{brand.brandName}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item m={1} xs={12} textAlign='center'>
              <FormControl sx={{ minWidth: '75%' }} size="small">
                <InputLabel id="model-label">Model</InputLabel>
                <Select
                  labelId="model-label"
                  id="modelId"
                  value={car?.model}
                  label="Model"
                  onChange={(e: any) => setCar({ ...car, model: e.target.value })}
                >
                  {models.map((model: Model) =>
                    (<MenuItem key={model.modelId} value={model.modelName}>{model.modelName}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item m={1} xs={12} textAlign='center'>
              <FormControl sx={{ minWidth: '75%' }} size="small">
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  id="typeId"
                  value={car?.type}
                  label="Type"
                  onChange={(e: any) => setCar({ ...car, type: e.target.value })}
                >
                  {types.map((type: CarType) =>
                    (<MenuItem key={type.carTypeId} value={type.typeName}>{type.typeName}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item m={1} xs={12} textAlign='center'>
              <FormControl sx={{ minWidth: '75%' }} size="small">
                <InputLabel id="tr-label">Transmission</InputLabel>
                <Select
                  labelId="tr-label"
                  id="trId"
                  value={car?.transmission}
                  label="Transmission"
                  onChange={(e: any) => setCar({ ...car, transmission: e.target.value })}
                >
                  <MenuItem value={'Auto'}>Auto</MenuItem>
                  <MenuItem value={'Manual'}>Manual</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item m={1} xs={12} textAlign='center'>
              <FormControl sx={{ minWidth: '75%' }} size="small">
                <InputLabel id="doors-label">Doors</InputLabel>
                <OutlinedInput
                  id="doors-amount"
                  value={car.doorsCount}
                  onChange={(e: any) => setCar({ ...car, doorsCount: e.target.value })}
                  label="Doors"
                />
              </FormControl>
            </Grid>
            <Grid item m={1} xs={12} textAlign='center'>
              <FormControl sx={{ minWidth: '75%' }} size="small">
                <InputLabel id="seats-label">Seats</InputLabel>
                <OutlinedInput
                  id="seats-amount"
                  value={car.seatsCount}
                  onChange={(e: any) => setCar({ ...car, seatsCount: e.target.value })}
                  label="Seats"
                />
              </FormControl>
            </Grid>
            <Grid item m={1} xs={12} textAlign='center'>
              <FormControl sx={{ minWidth: '75%' }} size="small">
                <InputLabel id="bags-label">Bags</InputLabel>
                <OutlinedInput
                  id="bags-amount"
                  value={car.bagsCount}
                  onChange={(e: any) => setCar({ ...car, bagsCount: e.target.value })}
                  label="Bags"
                />
              </FormControl>
            </Grid>
            <Grid item m={1} xs={12} textAlign='center'>
              <FormControl sx={{ minWidth: '75%' }} size="small">
                <InputLabel id="picture-label">Link to the picture</InputLabel>
                <OutlinedInput
                  id="picture"
                  value={car.pictureLink}
                  onChange={(e: any) => setCar({ ...car, pictureLink: e.target.value })}
                  label="Link to the picture"
                />
              </FormControl>
            </Grid>
            <Grid item m={1} xs={12} textAlign='center'>
              <FormControlLabel
                control={
                  <Switch checked={car.ac} onChange={(e: any) => setCar({ ...car, ac: e.target.checked })} name="ac" />
                }
                label="A/C"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
      <div style={{ height: '700px', width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={cars?.map((car: Car) => ({
            id: car.carId,
            brand: car.brand,
            model: car.model,
            type: car.type,
            transmission: car.transmission,
            doors: car.doorsCount,
            seats: car.seatsCount,
            ac: car.ac,
            bags: car.bagsCount,
            pictureLink: car.pictureLink
          }))}
          pageSize={10}
          density="comfortable"
          checkboxSelection
          components={{ Toolbar: CustomToolBar, NoRowsOverlay: CustomNoRowsOverlay }}
          onSelectionModelChange={(i) => { setSelectedCars(i) }} />
      </div>
    </div>
  )
}