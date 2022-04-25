import axiosProvider from "./axiosProvider"
import { Car, Enhancement, Model } from "./responseModels"

export const addEnhancement = async (enhancement?: Enhancement) => {
  const data = new FormData()
  data.append('Description', enhancement?.description!)
  data.append('Price', enhancement?.price?.toString()!)
  return await axiosProvider.post('/Enhancements', data)
}

export const addBrand = async (brand: string) => {
  const data = new FormData()
  data.append('BrandName', brand)
  return await axiosProvider.post('/Brands', data)
}

export const addModel = async (model: Model) => {
  const data = new FormData()
  data.append('ModelName', model.modelName!)
  data.append('BrandId', model.brandId!)
  return await axiosProvider.post('/Models', data)
}

export const addCarType = async (typeName: string) => {
  const data = new FormData()
  data.append('TypeName', typeName)
  return await axiosProvider.post('/CarTypes', data)
}

export const addCar = async (car: Car) => {
  const data = new FormData()
  data.append('Brand', car.brand!)
  data.append('Model', car.model!)
  data.append('Type', car.type!)
  data.append('Transmission', car.transmission!)
  data.append('DoorsCount', car.doorsCount?.toString()!)
  data.append('SeatsCount', car.seatsCount?.toString()!)
  data.append('BagsCount', car.bagsCount?.toString()!)
  data.append('Ac', car.ac ? 'true' : 'false')
  return await axiosProvider.post('/Cars', data)
}