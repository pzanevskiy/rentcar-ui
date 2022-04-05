import axiosProvider from "./axiosProvider"

export const getHello = async () => {
    return (await axiosProvider.get('/test/user')).data
}