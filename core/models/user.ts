export interface IUser {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: Date
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: IUserHair
  domain: string
  ip: string
  address: IUserAddress
  macAddress: string
  university: string
  bank: IUserBank
  company: IUserCompany
  ein: string
  ssn: string
  userAgent: string
}

export interface IUserAddress {
  address: string
  city: string
  coordinates: IUserCoordinates
  postalCode: string
  state: string
}

export interface IUserCoordinates {
  lat: number
  lng: number
}

export interface IUserBank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export interface IUserCompany {
  address: IUserAddress
  department: string
  name: string
  title: string
}

export interface IUserHair {
  color: string
  type: string
}
