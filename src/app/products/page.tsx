"use client"
import React, { useEffect, useState } from "react"
import Pagination from "ui/components/common/Pagination"
import TextInput from "ui/components/common/TextInput"
import DashboardContentLayout from "ui/layouts/DashboardContentLayout"

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

export interface IPaging {
  limit: number
  skip: number
  total: number
}

export type IProductList = { products: IProduct[] } & IPaging

function ProductsPage() {
  const [products, setProducts] = useState<IProductList>()

  async function getProducts() {
    console.log("getting yoy")
    const products = await fetch(
      "https://dummyjson.com/products?limit=10&skip=0",
      {
        method: "GET",
      }
    )
      .then(async (res) => (await res.json()) as IProductList)
      .catch((err) => console.error("Error when fetching data: ", err))
    if (!products) return
    setProducts(products)
  }
  useEffect(() => {
    getProducts()
    return () => {}
  }, [])

  return (
    <DashboardContentLayout title="Products">
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
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody className="">
                {products?.products.map((e, idx) => (
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

export default ProductsPage
