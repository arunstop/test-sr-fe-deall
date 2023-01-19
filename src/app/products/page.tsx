"use client"
import { IProduct } from "core/models/product"
import { repoProductGet } from "core/repos/product"
import { IPaging, ISearch } from "core/types/main"
import React, { useEffect, useState } from "react"
import Pagination from "ui/components/common/Pagination"
import TextInput from "ui/components/common/TextInput"
import DashboardContentLayout from "ui/layouts/DashboardContentLayout"

export type IProductList = { products: IProduct[] } & IPaging&ISearch

function ProductsPage() {
  const [products, setProducts] = useState<IProductList>()

  async function getProducts(props?: Partial<IPaging & ISearch>) {
    // if
    const products = await repoProductGet(props)
      .then(async (res) => (await res.json()) as IProductList)
      .catch((err) => console.error("Error when fetching data: ", err))
    if (!products) return
    setProducts(products)
  }

  useEffect(() => {
    getProducts({
      q: "",
      limit: 10,
      skip: 0,
    })
    return () => {}
  }, [])

  const handleSearch = React.useCallback(
    (q: string) => {
      getProducts({
        q: q,
        limit: products?.limit,
        skip: products?.skip,
        total: products?.total,
      })
    },
    [products]
  )

  return (
    <DashboardContentLayout title="Products">
      <div className="flex flex-col gap-i">
        <section className="self-end">
          <form
            onSubmit={(ev) => {
              ev.preventDefault()
              handleSearch((ev.target as HTMLFormElement).q.value)
              // handleSearch(ev.target as HTMLFormElement)
            }}
          >
            <TextInput
              className=" valid:outline-primary transition-all duration-300"
              placeholder="Search Product..."
              type="search"
              name="q"
              minLength={2}
            />
          </form>
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
          {!!products && (
            <footer className="self-end">
              <Pagination
                total={products.total}
                skip={products.skip}
                limit={products.limit}
                onPrev={() =>
                  getProducts({
                    q: products.q,
                    limit: products.limit,
                    skip: products.skip - products.limit,
                    total: products.total,
                  })
                }
                onNext={() =>
                  getProducts({
                    q: products.q,
                    limit: products.limit,
                    skip: products.skip + products.limit,
                    total: products.total,
                  })
                }
              ></Pagination>
            </footer>
          )}
        </section>
      </div>
    </DashboardContentLayout>
  )
}

export default ProductsPage
