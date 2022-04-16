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

export const getCars = async (cityId: string) => {
    return (await axiosProvider.get(`/Cars/city/${cityId}`)).data
}

export const getAllCars = async () => {
    return (await axiosProvider.get(`/Cars/all`)).data
}