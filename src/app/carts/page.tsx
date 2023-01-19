"use client"
import { Icon } from "@iconify-icon/react"
import { ICart } from "core/models/cart"
import { repoCartGetAll } from "core/repos/cart"
import { IPaging, ISearch } from "core/types/main"
import Link from "next/link"
import { useEffect, useState } from "react"
import Button from "ui/components/common/Button"
import Pagination from "ui/components/common/Pagination"
import TextInput from "ui/components/common/TextInput"
import DashboardContentLayout from "ui/layouts/DashboardContentLayout"

export type ICardList = { carts: ICart[] } & IPaging & ISearch

function CartsPage() {
  const [carts, setCarts] = useState<ICardList>()

  async function getCarts(props?: Partial<IPaging>) {
    const newCarts = await repoCartGetAll(props)
      .then(async (res) => (await res.json()) as ICardList)
      .catch((err) => console.error("Error when fetching data: ", err))
    if (!newCarts) return
    setCarts(newCarts)
  }

  useEffect(() => {
    getCarts({ limit: 10, skip: 0 })
    return () => {}
  }, [])

  return (
    <DashboardContentLayout title="Carts">
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
                  <th>Total/Discount</th>
                  <th></th>
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
                    <td className="group-hover:text-primary group-hover:bg-primary/30">
                      <div className="flex gap-1 sm:gap-2 items-center h-full">
                        <span className="">{e.total}</span>
                        <Icon icon="mdi:arrow-right-thin" />
                        <span className="text-red-500 font-bold">
                          {e.discountedTotal}
                        </span>
                      </div>
                    </td>
                    <td className="group-hover:text-primary group-hover:bg-primary/30">
                      <Link href={`/carts/${e.id}`}>
                        <Button>
                          <Icon
                            icon="mdi:dots-vertical-circle-outline"
                            className="text-lg sm:text-xl"
                          />
                          <span>Detail</span>
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
          {!!carts && (
            <footer className="self-end">
              <Pagination
                total={carts.total}
                skip={carts.skip}
                limit={carts.limit}
                onPrev={() =>
                  getCarts({
                    limit: carts.limit,
                    skip: carts.skip - carts.limit,
                    total: carts.total,
                  })
                }
                onNext={() =>
                  getCarts({
                    limit: carts.limit,
                    skip: carts.skip + carts.limit,
                    total: carts.total,
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

export default CartsPage
