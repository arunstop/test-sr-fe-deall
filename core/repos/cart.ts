import { IPaging, ISearch } from "core/types/main"

export function repoCartGetAll(props?: Partial<IPaging & ISearch>) {
  if (!props)
    return fetch("https://dummyjson.com/carts", {
      method: "GET",
    })

  const map = new Map<keyof Partial<IPaging & ISearch>, string | number>(
    Object.entries(props) as any
  )

  const params = Array.from(map).reduce((oldVal, currVal, idx) => {
    return `${oldVal}${idx > 0 ? "&" : ""}${currVal[0]}=${currVal[1]}`
  }, "?")

  return fetch("https://dummyjson.com/carts" + params, {
    method: "GET",
  })
}

export function repoCartGetOne(id: string) {
  if (!id.trim().length) return
  return fetch(`https://dummyjson.com/carts/${id}`, {
    method: "GET",
  })
}
