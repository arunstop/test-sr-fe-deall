import { IPaging, ISearch } from "core/types/main"

export function repoProductGetAll(
  props?: Partial<IPaging & ISearch>,
  category?: string
) {
  const url = category
    ? `https://dummyjson.com/products/category/${category}`
    : "https://dummyjson.com/products"
  if (!props)
    return fetch(`${url}`, {
      method: "GET",
    })

  // removing falsy params
  const map = new Map<keyof Partial<IPaging & ISearch>, string | number>(
    Object.entries(props) as any
  )
  const params = Array.from(map).reduce((oldVal, currVal, idx) => {
    return `${oldVal}${idx > 0 ? "&" : ""}${currVal[0]}=${currVal[1]}`
  }, "?")

  return fetch(`${url}${!category ? "/search" : ""}` + params, {
    method: "GET",
  })
}

export async function repoProductGetOne(productId: number) {
  return fetch(`https://dummyjson.com/products/${productId}`, {
    method: "GET",
  })
}
