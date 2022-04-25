import {
  Box, Modal, TextField,
  Typography, Fade, Button, Grid
} from "@mui/material"
import Backdrop from '@mui/material/Backdrop'
import {
  DataGrid, GridColDef, GridToolbarColumnsButton,
  GridToolbarContainer, GridToolbarDensitySelector,
  GridToolbarExport, GridToolbarFilterButton
} from "@mui/x-data-grid"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { Brand, deleteBrand, getBrands } from "../../api"
import { addBrand } from "../../api/responses"
import { NoData } from "../../utils/NoData"
import { AddButton } from "../buttons/AddButton"
import { DeleteButton } from "../buttons/DeleteButton"
import { Models } from "../models/Models"

export const CustomNoRowsOverlay = () => {
  return (<><NoData message={`No brands available`} /></>)
}

export const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [selectedBrand, setSelectedBrand] = useState<any>([])
  const [brand, setBrand] = useState<string>('')
  const [selectedBrandId, setSelectedBrandId] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(5)
  const { enqueueSnackbar } = useSnackbar()

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

  useEffect((() => {
    getBrandsList()
  }), [])

  const getBrandsList = () => {
    getBrands()
      .then((response: Brand[]) => {
        setBrands(response)
      })
  }

  const add = () => {
    addBrand(brand)
      .then((r: any) => {
        enqueueSnackbar(`New brand '${brand}' added!`, {
          variant: 'success',
        })
        handleClose()
        getBrandsList()
      })
  }

  const CustomToolBar = () => {
    const remove = () => {
      if (selectedBrand.length > 0) {
        selectedBrand.map((id: string) =>
          deleteBrand(id)
            .then((res: any) => {
              enqueueSnackbar('Deleted', {
                variant: 'success',
              })
              getBrandsList()
              setSelectedBrandId('')
            }))
      } else {
        enqueueSnackbar('No brands selected', {
          variant: 'warning',
        })
      }
    }
    const add = () => {
      handleOpen()
    }
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport csvOptions={{ fileName: 'Brands' }} />
        <AddButton onClick={add} />
        <DeleteButton onClick={remove} />
      </GridToolbarContainer>
    )
  }
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'id',
      width: 100,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      width: 100
    },
    {
      field: "View models",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={(event) => {
              event.stopPropagation()
              console.log(`selected button - ${cellValues.row['id']}`);

              setSelectedBrandId(cellValues.row['id'])
            }}
          >
            View models
          </Button>
        );
      }
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
              Add brand
            </Typography>
            <TextField id="brand" label="Brand" variant="outlined"
              onChange={(e: any) => setBrand(e.target.value)} />
            <Button onClick={add}>Add</Button>
          </Box>
        </Fade>
      </Modal>
      <Grid container>
        <Grid item xs={12} sm={9} md={6}>
          <div style={{ height: 500 }}>
            <DataGrid
              columns={columns}
              rows={brands?.map((brand: Brand) => ({ id: brand.brandId, brand: brand.brandName }))}
              density="compact"
              checkboxSelection
              components={{ Toolbar: CustomToolBar, NoRowsOverlay: CustomNoRowsOverlay }}
              onSelectionModelChange={(i) => { setSelectedBrand(i) }}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              pagination />
          </div>
        </Grid>
        <Grid item xs={12} sm={3} md={6}>
          {selectedBrandId !== '' &&
            <Typography>Models for {brands.find((b: Brand) => b.brandId == selectedBrandId)?.brandName}</Typography>}
          <Models brandId={selectedBrandId} />
        </Grid>
      </Grid>
    </div>
  )
}