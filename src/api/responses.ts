import axiosProvider from "./axiosProvider"
import { Enhancement } from "./responseModels"

export const addEnhancement = async (enhancement?: Enhancement) => {
  const resp = JSON.stringify(enhancement)
  const data = new FormData()
  data.append('Description', enhancement?.description!)
  data.append('Price', enhancement?.price?.toString()!)
  return await axiosProvider.post('/Enhancements', data)
}