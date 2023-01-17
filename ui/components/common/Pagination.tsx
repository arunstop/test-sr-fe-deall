import React from "react"
import Button from "./Button"

const Pagination = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement> & {
    limit: number
    skip: number
    per: number
  }
>(({ limit, skip, per, children, className = "", ...props }, ref) => {
  const first = skip < per
  const last = limit-skip  <= per
  return (
    <aside
      className={`flex gap-2 sm:gap-4 items-center text-lg ${className}`}
      {...props}
    >
      {!first && <Button className="">Prev</Button>}
      {`Page ${skip} / ${limit}`}
      {!last && <Button className="">Next</Button>}
    </aside>
  )
})

export default Pagination
