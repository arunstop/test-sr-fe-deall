"use client"
import { IProduct } from "core/models/product"
import { useEffect, useState } from "react"
import Pagination from "ui/components/common/Pagination"
import DashboardContentLayout from "ui/layouts/DashboardContentLayout"
import { ICart } from "../page"

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

function CartsDetailsPage({
  params,
  searchParams,
}: {
  params: { details: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const [cart, setCart] = useState<ICart>()
  const [user, setUser] = useState<IUser>()
  const [products, setProducts] = useState<IProduct[]>()
  const { details } = params

  async function getCartDetails() {
    try {
      const cart = await fetch(`https://dummyjson.com/carts/${details}`, {
        method: "GET",
      })
        .then(async (res) => (await res.json()) as ICart)
        .catch((err) => console.error("Error when fetching data: ", err))
      if (!cart) return
      const userPromise = getUser(cart.userId).then((user) => user.json())
      const productsPromise = cart.products.map((product) =>
        getProduct(product.id).then((e) => e.json())
      )

      const newUser = (await userPromise) as IUser
      const newProducts: IProduct[] = []

      for (const p of productsPromise) {
        newProducts.push((await p) as IProduct)
      }
      console.log(newUser.firstName)

      if (!newUser) return
      setUser(newUser)

      console.log(newProducts)
      if (!newProducts) return
      setProducts(newProducts)
      setCart(cart)
    } catch (e) {
      console.error("Error: ", e)
    }
  }

  async function getUser(userId: number) {
    return fetch(`https://dummyjson.com/users/${userId}`, {
      method: "GET",
    })
  }

  async function getProduct(productId: number) {
    return fetch(`https://dummyjson.com/products/${productId}`, {
      method: "GET",
    })
  }

  useEffect(() => {
    getCartDetails()
    return () => {}
  }, [])

  return (
    <DashboardContentLayout title={`Cart ${details}`}>
      <div className="flex flex-col gap-i">
        <section className="flex flex-col gap-i">
          <header className="text-lg sm:text-xl font-bold">Details</header>
          <article
            className="border-1 sm:border-2 border-primary-focus bg-primary/50 grid grid-cols-1 sm:grid-cols-2 p-2 sm:p-4 
          gap-2 sm:gap-4"
          >
            <p>
              <span>User:</span>{" "}
              <span className="sm:text-lg font-bold">{`${user?.firstName} ${user?.lastName}`}</span>{" "}
            </p>
            <p>
              <span># of items:</span>{" "}
              <span className="sm:text-lg font-bold">
                {cart?.totalQuantity}
              </span>
            </p>
            <p>
              <span>Added ON:</span>{" "}
              <span className="sm:text-lg font-bold">22 January 2022</span>
            </p>
            <p>
              <span>Total Amout:</span>{" "}
              <span className="sm:text-lg font-bold">
                {cart?.discountedTotal}
              </span>
            </p>
          </article>
        </section>
        <section className="flex flex-col gap-i">
          <article className="overflow-x-auto">
            <table className="table table-zebra w-full ">
              <thead>
                <tr>
                  <th className="!z-0">#</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody className="">
                {products?.map((e, idx) => (
                  <tr
                    key={e.id}
                    className="group hover:z-20 hover:relative hover:-translate-y-2 cursor-pointer
                [&>*]:transition-all transition-all ease-in-out duration-300
                "
                  >
                    <th className="group-hover:text-primary group-hover:bg-primary/30">
                      {idx + 1}
                    </th>
                    <td className="group-hover:text-primary group-hover:bg-primary/30">
                      {e.title}
                    </td>
                    <td className="group-hover:text-primary group-hover:bg-primary/30">
                      {e.brand}
                    </td>
                    <td className="group-hover:text-primary group-hover:bg-primary/30">
                      {e.price}
                    </td>
                    <td className="group-hover:text-primary group-hover:bg-primary/30">
                      {e.stock}
                    </td>
                     <td className="group-hover:text-primary group-hover:bg-primary/30 capitalize">
                      {e.category.replaceAll("-"," ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
          <footer className="self-end">
            <Pagination limit={100} skip={10} per={10}></Pagination>
          </footer>
        </section>
      </div>
    </DashboardContentLayout>
  )
}

export default CartsDetailsPage
