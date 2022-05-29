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
  orderId?: string,
  carId: string,
  cityId?: string,
  statusName?: string,
  pickUpAddressId?: string
  returnAddressId?: string,
  enhancements: string[],
  startDate?: Date | null,
  endDate?: Date | null,
  totalAmount?: number,
  dateTimeCreated?: Date | null,
  dateTimeFinished?: Date | null
  hasPenalties?: boolean
}

export interface DetailedOrder {
  orderId: string,
  user: User,
  statusName: string,
  startDate: Date | null,
  endDate: Date | null,
  dateTimeCreated?: Date | null,
  dateTimeFinished?: Date | null
  totalAmount: number
  pickUpLocation: string,
  returnLocation: string,
  car: Car,
  enhancements: Enhancement[],
  hasPenalties: boolean
}

export interface User {
  userId: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  loyalty?: LoayaltyProgram
}

export interface LoayaltyProgram {
  loyaltyId: string,
  loyaltyName: string,
  discount: number
}

export interface AdminOrder {
  order: Order,
  user: User,
}


// Penalties
export interface PrePenaltyOrderInfo {
  orderId: string,
  expirationDiff: number,
  car: Car,
  user: User,
  enhancements: Enhancement[]
}

export interface PenaltyInfo {
  orderId?: string,
  description?: string,
  expirationCost: number,
  additionalCost?: number
}