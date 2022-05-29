import axiosProvider from "./axiosProvider"
import { Car, Enhancement, Model, Order, PenaltyInfo } from "./responseModels"

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
  return await axiosProvider.post('/Cars', car, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const addOrder = async (order: Order) => {
  return await axiosProvider.post('/Orders', order, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const addPenalty = async (penaltyInfo: PenaltyInfo) => {
  return await axiosProvider.post('Penalties', penaltyInfo, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}