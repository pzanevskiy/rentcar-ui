export interface Country {
  countryId?: string,
  countryName?: string
}

export interface City {
  cityId?: string,
  cityName?: string,
  countryId?: string
}

export interface Car {
  carId: string,
  brand: string,
  model: string,
  type: string
  transmission: string,
  doorsCount: number
  seatsCount: number,
  ac: boolean,
  bagsCount: number,
  price: number
}

export interface GetCarsResponse {
  cars: Car[]
}