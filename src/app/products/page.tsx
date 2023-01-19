"use client"
import { ICategory } from "core/models/category"
import { IProduct } from "core/models/product"
import { repoCategoryGetAll } from "core/repos/category"
import { repoProductGetAll } from "core/repos/product"
import { IPaging, ISearch } from "core/types/main"
import React, { useEffect, useMemo, useState } from "react"
import Alert from "ui/components/common/Alert"
import Pagination from "ui/components/common/Pagination"
import Table from "ui/components/common/Table"
import TextInput from "ui/components/common/TextInput"
import ProductFilterSection from "ui/components/product/ProductFilterSection"
import DashboardContentLayout from "ui/layouts/DashboardContentLayout"

type IProductsPagination = IPaging & ISearch

export type IProductList = { products: IProduct[] } & IProductsPagination

function ProductsPage() {
  const {
    products,
    categories,
    category,
    setCategory,
    productsPagination,
    getProducts,
    handleSearch,
    handleFilter,
  } = useProductsPageHook()
  return (
    <DashboardContentLayout title="Products">
      <div className="flex flex-col gap-i">
        <div className="flex max-sm:flex-col-reverse gap-i sm:justify-between max-sm:items-end">
          <ProductFilterSection
            className="max-sm:justify-end"
            category={{
              value: category,
              list: categories,
              set: (newVal) =>
                handleFilter({ category: newVal, ...productsPagination }),
            }}
          />

          <section className="flex gap-2 sm:gap-4 ">
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
        </div>
        {products?.total ? (
          <section className="flex flex-col gap-i">
            <article className="overflow-x-auto">
              <Table headers={["#", "Name", "Brand", "Price", "Stock"]}>
                {products?.products.map((e, idx) => (
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
                  </tr>
                ))}
              </Table>
            </article>
            {!!products?.products.length && (
              <footer className="self-end">
                <Pagination
                  total={products.total}
                  skip={products.skip}
                  limit={products.limit}
                  onPrev={() =>
                    getProducts({
                      ...productsPagination,
                      skip: products.skip - products.limit,
                    })
                  }
                  onNext={() =>
                    getProducts({
                      ...productsPagination,
                      skip: products.skip + products.limit,
                    })
                  }
                />
              </footer>
            )}
          </section>
        ) : (
          <Alert className="text-center">No data</Alert>
        )}
      </div>
    </DashboardContentLayout>
  )
}

const initPagination: Partial<IProductsPagination> = {
  q: "",
  limit: 10,
  skip: 0,
}

function useProductsPageHook() {
  const [products, setProducts] = useState<IProductList>()
  const [categories, setCategories] = useState<ICategory[]>([])
  const [category, setCategory] = useState("")

  const productsPagination: IProductsPagination = useMemo(
    () => ({
      q: products?.q || "",
      limit: products?.limit || 0,
      skip: products?.skip || 0,
      total: products?.total || 0,
    }),
    [products]
  )

  async function getCategories() {
    const newCategories = await repoCategoryGetAll()
      .then(async (res) => (await res.json()) as string[])
      .catch((err) => {
        console.error("Error when fetching data: ", err)
        return null
      })
    if (!newCategories) return
    setCategories(newCategories.map((e) => ({ name: e } as ICategory)))
  }

  async function getProducts(
    props?: Partial<IProductsPagination>,
    cat?: string
  ) {
    // if
    const products = await repoProductGetAll(props, cat)
      .then(async (res) => (await res.json()) as IProductList)
      .catch((err) => {
        console.error("Error when fetching data: ", err)
        return null
      })
    if (!products) return
    setProducts(products)
  }

  const handleSearch = React.useCallback(
    (q: string) => {
      getProducts({
        ...productsPagination,
        q: q,
      })
    },
    [productsPagination]
  )
  const handleFilter = React.useCallback(
    ({
      category: newCategory,
      ...filter
    }: { category: string } & IProductsPagination) => {
      if (newCategory === category) return
      setCategory(newCategory)
      getProducts(
        newCategory === "" ? initPagination : { ...filter },
        newCategory
      )
    },
    [category]
  )

  // init
  useEffect(() => {
    getProducts(initPagination)
    getCategories()
    return () => {}
  }, [])

  return {
    products,
    categories,
    productsPagination,
    category,
    setCategory,
    getProducts,
    handleSearch,
    handleFilter,
  }
}

export default ProductsPage
