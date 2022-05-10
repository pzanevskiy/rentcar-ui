export interface Country {
  countryId?: string,
  countryName?: string
}

export interface City {
  cityId?: string,
  cityName?: string,
  countryId?: string
}

export interface Address {
  orderAddressId?: string,
  orderAddressName?: string,
  cityId?: string
}

export interface Car {
  carId?: string,
  brand?: string,
  model?: string,
  type?: string,
  transmission?: string,
  doorsCount?: number
  seatsCount?: number,
  ac?: boolean,
  bagsCount?: number,
  price?: number,
  pictureLink?: string
}

export interface GetCarsResponse {
  cars: Car[]
}

export interface Brand {
  brandId?: string,
  brandName?: string
}

export interface Model {
  modelId?: string,
  modelName?: string,
  brandId?: string,
}

export interface Enhancement {
  enhancementId?: string,
  description?: string,
  price?: number
}

export interface CarType {
  carTypeId?: string,
  typeName?: string
}

export interface Order {
  carId: string,
  cityId?: string,
  pickUpAddressId?: string
  returnAddressId?: string,
  enhancements: string[],
  startDate?: Date | null,
  endDate?: Date | null,
  totalAmount?: number
}

export interface DetailedOrder {
  orderId: string,
  userId: string,
  statusName: string,
  startDate: Date | null,
  endDate: Date | null,
  totalAmount: number
  pickUpLocation: string,
  returnLocation: string,
  car: Car,
  enhancements: Enhancement[]
}