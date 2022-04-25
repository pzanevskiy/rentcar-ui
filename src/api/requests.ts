import axiosProvider from "./axiosProvider"

export const getHello = async () => {
  return (await axiosProvider.get('/test/user')).data
}

export const getCountries = async () => {
  return (await axiosProvider.get('/Country')).data
}

export const getCities = async (countryId: string) => {
  return (await axiosProvider.get(`/Cities/country/${countryId}`)).data
}

export const getAddresses = async (cityId: string) => {
  return (await axiosProvider.get(`/Addresses/city/${cityId}`)).data
}

// Cars
export const getCars = async (cityId: string) => {
  return (await axiosProvider.get(`/Cars/city/${cityId}`)).data
}

export const getAllCars = async () => {
  return (await axiosProvider.get(`/Cars`)).data
}

export const deleteCar = async (carId: string) => {
  return (await axiosProvider.delete(`/Cars/${carId}`)).data
}

// Brands
export const getBrands = async () => {
  return (await axiosProvider.get('/Brands')).data
}

export const deleteBrand = async (brandId: string) => {
  return (await axiosProvider.delete(`/Brands/${brandId}`)).data
}

// Models
export const getModelsByBrandId = async (brandId: string) => {
  return (await axiosProvider.get(`/Models/brand/${brandId}`)).data
}

export const deleteModel = async (modelId: string) => {
  return (await axiosProvider.delete(`/Models/${modelId}`)).data
}

// CarTypes
export const getCarTypes = async () => {
  return (await axiosProvider.get(`/CarTypes`)).data
}

export const deleteCarType = async (carTypeId: string) => {
  return (await axiosProvider.delete(`/CarTypes/${carTypeId}`)).data
}

// Enhancements
export const getEnhancements = async () => {
  return (await axiosProvider.get('/Enhancements')).data
}

export const deleteEnhancement = async (enhancementId: string) => {
  return (await axiosProvider.delete(`/Enhancements/${enhancementId}`)).data
}