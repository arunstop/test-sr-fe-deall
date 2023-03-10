"use client"
import { ICart } from "core/models/cart"
import { IProduct } from "core/models/product"
import { IUser } from "core/models/user"
import { repoCartGetOne } from "core/repos/cart"
import { repoProductGetOne } from "core/repos/product"
import { repoUserGetOne } from "core/repos/user"
import { useEffect, useState } from "react"
import Alert from "ui/components/common/Alert"
import Pagination from "ui/components/common/Pagination"
import Table from "ui/components/common/Table"
import DashboardContentLayout from "ui/layouts/DashboardContentLayout"

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
      const cart = await repoCartGetOne(details)
        ?.then(async (res) => (await res.json()) as ICart)
        .catch((err) => {
          console.error("Error when fetching data: ", err)
          return null
        })
      if (!cart) return
      const userPromise = repoUserGetOne(cart.userId).then((user) =>
        user.json()
      )
      const productsPromise = cart.products.map((product) =>
        repoProductGetOne(product.id).then((e) => e.json())
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

  useEffect(() => {
    getCartDetails()
    return () => {}
  }, [])

  return (
    <DashboardContentLayout title={`Cart ${details}`}>
      <div className="flex flex-col gap-i">
        <section className="flex flex-col gap-i">
          <header className="text-lg sm:text-xl font-bold">Details</header>
          <Alert
            className="border-1 sm:border-2 border-primary-focus bg-primary/50 grid grid-cols-1 sm:grid-cols-2 p-2 sm:p-4 
          gap-2 sm:gap-4 font-normal"
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
          </Alert>
        </section>
        <section className="flex flex-col gap-i">
          <article className="overflow-x-auto">
            <Table
              headers={["#", "Name", "Brand", "Price", "Stock", "Category"]}
            >
              {products?.map((e, idx) => (
                <tr
                  key={e.id}
                  className="group hover:z-20 hover:relative hover:-translate-y-2
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
                    {e.category.replaceAll("-", " ")}
                  </td>
                </tr>
              ))}
            </Table>
          </article>
          {!!products?.length && (
            <footer className="self-end">
              <Pagination total={products.length} skip={0} limit={products.length}></Pagination>
            </footer>
          )}
        </section>
      </div>
    </DashboardContentLayout>
  )
}

export default CartsDetailsPage
