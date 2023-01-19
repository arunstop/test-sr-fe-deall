export interface IProduct {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
  }
  
  export interface ISearch {
    q: string
  }
  
  export interface IPaging {
    limit: number
    skip: number
    total: number
  }