export interface ICart {
    id: number
    products: IProductInCart[]
    total: number
    discountedTotal: number
    userId: number
    totalProducts: number
    totalQuantity: number
  }
  
  export interface IProductInCart {
    id: number
    title: string
    price: number
    quantity: number
    total: number
    discountPercentage: number
    discountedPrice: number
  }