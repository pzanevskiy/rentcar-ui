import { Box, Modal, TextField, Typography, Fade, Button } from "@mui/material"
import {
  DataGrid, GridColDef, GridToolbarColumnsButton,
  GridToolbarContainer, GridToolbarDensitySelector,
  GridToolbarExport, GridToolbarFilterButton
} from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { deleteEnhancement, Enhancement, getEnhancements } from "../../api"
import { NoData } from "../../utils/NoData"
import { AddButton } from "../buttons/AddButton"
import { DeleteButton } from "../buttons/DeleteButton"
import Backdrop from '@mui/material/Backdrop'
import { addEnhancement } from "../../api/responses"

export const AdminEnhancements = () => {
  const [enhancements, setEnhancements] = useState<Enhancement[]>([])
  const [selectedEnh, setSelectedEnh] = useState<any>([])
  const [enhancemnt, setEnhancement] = useState<Enhancement>()

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
    getEnhancementsList()
  }, [])

  const getEnhancementsList = () => {
    getEnhancements()
      .then((res: any) => {
        setEnhancements(res)
      })
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'id',
      width: 100,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100
    },
  ]
  const CustomToolBar = () => {
    const remove = () => {
      console.log(selectedEnh);
      if (selectedEnh.length > 0)
        selectedEnh.map((id: string) => deleteEnhancement(id)
          .then((res: any) => {
            getEnhancementsList()
          }))
    }
    const add = () => {
      handleOpen()
    }
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport csvOptions={{ fileName: 'Cars' }} />
        <AddButton onClick={add} />
        <DeleteButton onClick={remove} />
      </GridToolbarContainer>
    )
  }

  const CustomNoRowsOverlay = () => {
    return (<><NoData message={`No enhancements available`} /></>)
  }

  const add = () => {
    console.log(enhancemnt)
    addEnhancement(enhancemnt)
      .then((res: any) => {
        console.log('added');
        getEnhancementsList()
        handleClose()
      })
  }
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
              Add enhancement
            </Typography>
            <TextField id="description" label="Description" variant="outlined"
              onChange={(e: any) => setEnhancement({ ...enhancemnt, description: e.target.value })} />
            <TextField id="price" label="Price" variant="outlined"
              onChange={(e: any) => setEnhancement({ ...enhancemnt, price: e.target.value })} />
            <Button onClick={add}>Add</Button>
          </Box>
        </Fade>
      </Modal>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={enhancements?.map((enh: Enhancement) => ({
            id: enh.enhancementId,
            description: enh.description,
            price: enh.price
          }))}
          pageSize={5}
          rowsPerPageOptions={[5]}
          density="compact"
          checkboxSelection
          components={{ Toolbar: CustomToolBar, NoRowsOverlay: CustomNoRowsOverlay }}
          onSelectionModelChange={(i) => { setSelectedEnh(i) }} />

      </div>
    </div>
  )
}