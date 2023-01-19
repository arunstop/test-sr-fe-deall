export async function repoUserGetOne(userId: number) {
  return fetch(`https://dummyjson.com/users/${userId}`, {
    method: "GET",
  })
}
