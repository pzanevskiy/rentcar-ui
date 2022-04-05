import axios from "axios"
import keycloak from "../services/keycloak"

const options = {
  baseURL: "https://localhost:9001/api",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const axiosProvider = axios.create(options)
axiosProvider.interceptors.request.use(
  requestConfig => {
    requestConfig.headers = {
      Authorization: `Bearer ${keycloak?.token}`
    }
    return requestConfig
  },
  error => {
    console.log('Request error', { ...error })
    return Promise.reject(error)
  }
)

axiosProvider.interceptors.response.use(
  response => response,
  error => {
    console.log('Response error', { ...error })
    return Promise.reject(error)
  }
)

export default axiosProvider