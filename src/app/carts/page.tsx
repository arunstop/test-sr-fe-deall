"use client"
import { Icon } from "@iconify-icon/react"
import { useEffect, useState } from "react"
import Pagination from "ui/components/common/Pagination"
import TextInput from "ui/components/common/TextInput"
import { IPaging } from "../products/page"

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

export type ICardList = { carts: ICart[] } & IPaging

function CartsPage() {
  const [carts, setCarts] = useState<ICardList>()

  async function getProducts() {
    console.log("getting yoy")
    const products = await fetch("https://dummyjson.com/carts", {
      method: "GET",
    })
      .then(async (res) => (await res.json()) as ICardList)
      .catch((err) => console.error("Error when fetching data: ", err))
    if (!products) return
    setCarts(products)
  }
  useEffect(() => {
    getProducts()
    return () => {}
  }, [])
  return (
    <div className="flex flex-col gap-i">
      <section className="self-end">
        <TextInput
          className=" valid:outline-primary transition-all duration-300"
          placeholder="Search Product..."
          type="search"
          minLength={2}
        />
      </section>
      <section className="flex flex-col gap-i">
        <article className="overflow-x-auto">
          <table className="table table-zebra w-full ">
            <thead>
              <tr>
                <th className="!z-0">#</th>
                <th>User</th>
                <th>Total Product</th>
                <th>Total Qty</th>
                <th>Total/Discount </th>
              </tr>
            </thead>
            <tbody className="">
              {carts?.carts.map((e, idx) => (
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
                    {e.userId}
                  </td>
                  <td className="group-hover:text-primary group-hover:bg-primary/30">
                    {e.totalProducts}
                  </td>
                  <td className="group-hover:text-primary group-hover:bg-primary/30">
                    {e.totalQuantity}
                  </td>
                  <td className="group-hover:text-primary group-hover:bg-primary/30 flex gap-1 sm:gap-2 items-center">
                    <span className="">{e.total}</span>
                    <Icon icon="mdi:arrow-right-thin" />
                    <span className="text-red-500 font-bold">
                      {e.discountedTotal}
                    </span>
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
  )
}

export default CartsPage
