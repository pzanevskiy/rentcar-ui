import { Button } from "@mui/material"
import {
  DataGrid, GridColDef, GridToolbarColumnsButton,
  GridToolbarContainer, GridToolbarDensitySelector,
  GridToolbarExport, GridToolbarFilterButton
} from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { Brand, getBrands } from "../../api"
import { NoData } from "../../utils/NoData"
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

export const CustomNoRowsOverlay = () => {
  return (<><NoData message={`No brands available`} /></>)
}

export const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [selectedBrand, setSelectedBrand] = useState<any>([])

  useEffect((() => {
    getBrandsList()
  }), [])

  const getBrandsList = () => {
    getBrands()
      .then((response: Brand[]) => {
        setBrands(response)
      })
  }
  const CustomToolBar = () => {
    const remove = () => {
      console.log(selectedBrand);
      // if (selectedBrand.length > 0)
      // selectedBrand.map((id: string) => deleteCar(id)
      //     .then((res: any) => {
      //       getCarsList()
      //     }))
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
        <GridToolbarExport csvOptions={{ fileName: 'Brands' }} />
        <Button size="small" onClick={add}>
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
      width: 100,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      width: 100
    },
  ]
  return (
    <div style={{ height: 400, width: '75%' }}>
      <DataGrid
        columns={columns}
        rows={brands?.map((brand: Brand) => ({ id: brand.brandId, brand: brand.brandName }))}
        pageSize={5}
        rowsPerPageOptions={[5]}
        density="compact"
        checkboxSelection
        components={{ Toolbar: CustomToolBar, NoRowsOverlay: CustomNoRowsOverlay }}
        onSelectionModelChange={(i) => { setSelectedBrand(i) }} />
    </div>
  )
}