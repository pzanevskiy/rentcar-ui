import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material"
import {
  DataGrid, GridColDef, GridToolbarColumnsButton,
  GridToolbarContainer, GridToolbarDensitySelector,
  GridToolbarExport, GridToolbarFilterButton
} from "@mui/x-data-grid"
import { useState, useEffect } from "react"
import { Car, deleteCar, getAllCars } from "../../api"
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { NoData } from "../../utils/NoData"
import Backdrop from '@mui/material/Backdrop'

const CustomNoRowsOverlay = () => {
  return (<><NoData message={`No cars available`} /></>)
}

export const AdminCars = () => {
  const [cars, setCars] = useState<Car[]>([])
  const [selectedCars, setSelectedCars] = useState<any>([])

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  const getCarsList = () => {
    getAllCars()
      .then((response: any) => {
        setCars(response)
      })
  }
  const CustomToolBar = () => {
    const remove = () => {
      console.log(selectedCars);
      if (selectedCars.length > 0)
        selectedCars.map((id: string) => deleteCar(id)
          .then((res: any) => {
            getCarsList()
          }))
      console.log(`no delete`)
    }
    const add = () => {
      console.log('added');

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
      width: 200,
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
    }
  ]
  
  return (
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          </Box>
        </Fade>
      </Modal>
      <div style={{ height: 400, width: '100%' }}>
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
            bags: car.bagsCount
          }))}
          pageSize={5}
          rowsPerPageOptions={[5]}
          density="compact"
          checkboxSelection
          components={{ Toolbar: CustomToolBar, NoRowsOverlay: CustomNoRowsOverlay }}
          onSelectionModelChange={(i) => { setSelectedCars(i) }} />
      </div>
    </div>
  )
}