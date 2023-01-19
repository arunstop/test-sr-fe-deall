export async function repoCategoryGetAll() {
  return fetch("https://dummyjson.com/products/categories", { method: "GET" })
}

export async function repoCategoryGetOne(name: string) {
  return fetch(`https://dummyjson.com/products/category/${name}`, {
    method: "GET",
  })
}
