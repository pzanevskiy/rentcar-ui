import {
  Box, Modal, TextField,
  Typography, Fade, Button, Grid
} from "@mui/material"
import Backdrop from '@mui/material/Backdrop'
import { GridToolbarContainer, DataGrid, GridColDef } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { CarType, deleteCarType, getCarTypes } from "../../api"
import { addCarType } from "../../api/responses"
import { NoData } from "../../utils/NoData"
import { AddButton } from "../buttons/AddButton"
import { DeleteButton } from "../buttons/DeleteButton"

export const CarTypes = () => {
  const [carTypes, setCarTypes] = useState<CarType[]>([])
  const [selectedType, setSelectedType] = useState<any>([])
  const [typeName, setTypeName] = useState<string>('')
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
    getCarTypesList()
  }, [])

  const getCarTypesList = () => {
    getCarTypes()
      .then((res: CarType[]) => {
        setCarTypes(res)
      })
      .catch((e: any) => {
        console.log('Error while fetching car types')
      })
  }

  const add = () => {
    console.log(typeName)
    addCarType(typeName)
      .then((res: any) => {
        console.log('added');
        getCarTypesList()
        handleClose()
      })
  }
  const CustomToolBar = () => {
    const remove = () => {
      console.log(selectedType);
      if (selectedType.length > 0)
        selectedType.map((id: string) => deleteCarType(id)
          .then((res: any) => {
            getCarTypesList()
          }))
    }
    const add = () => {
      handleOpen()
    }
    return (
      <GridToolbarContainer>
        <AddButton onClick={add} />
        <DeleteButton onClick={remove} />
      </GridToolbarContainer>
    )
  }

  const CustomNoRowsOverlay = () => {
    return (<><NoData message={`No car types available`} /></>)
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'id',
      width: 100,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 200
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
              Add car type
            </Typography>
            <TextField id="carType" label="Type" variant="outlined"
              onChange={(e: any) => setTypeName(e.target.value)} />
            <Button onClick={add}>Add</Button>
          </Box>
        </Fade>
      </Modal>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={carTypes?.map((type: CarType) => ({ id: type.carTypeId, type: type.typeName }))}
          pageSize={5}
          rowsPerPageOptions={[5]}
          density="compact"
          checkboxSelection
          components={{ Toolbar: CustomToolBar, NoRowsOverlay: CustomNoRowsOverlay }}
          onSelectionModelChange={(i) => { setSelectedType(i) }} />
      </div>
    </div>
  )
}