import { IPaging, ISearch } from "core/models/product"

export function repoProductGet(props?: Partial<IPaging & ISearch>) {
  if (!props)
    return fetch("https://dummyjson.com/products", {
      method: "GET",
    })

  const map = new Map<keyof Partial<IPaging & ISearch>, string | number>(
    Object.entries(props) as any
  )

  const params = Array.from(map).reduce((oldVal, currVal, idx) => {
    return `${oldVal}${idx > 0 ? "&" : ""}${currVal[0]}=${currVal[1]}`
  }, "?")

  return fetch("https://dummyjson.com/products/search" + params, {
    method: "GET",
  })
}
