import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { useState, useEffect } from "react"
import { Car, Country, getAllCars, GetCarsResponse, getCountries } from "../../api"

export const AdminCars = () => {
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    getCarsList()
  }, [])

  const getCarsList = () => {
    getAllCars()
      .then((response: any) => {
        setCars(response)
      })
  }
  
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'id',
      width: 300,
      editable: true,
    },
    {
      field: 'doorsCount',
      headerName: 'Doors',
      width: 100
    },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={cars.map((car: Car) => ({ id: car.carId, doorsCount: car.doorsCount }))}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(i)=>{
          console.log(i)
        }} />
    </div>
  )
}