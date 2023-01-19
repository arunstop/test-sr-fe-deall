import React from "react"
import Button from "./Button"

const Pagination = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement> & {
    total: number
    skip: number
    limit: number
    onPrev?: () => void
    onNext?: () => void
  }
>(
  (
    { total, skip, limit, onPrev, onNext, children, className = "", ...props },
    ref
  ) => {
    const first = skip < limit
    const last = total - skip <= limit
    return (
      <aside
        className={`flex gap-2 sm:gap-4 items-center text-lg ${className}`}
        {...props}
      >
        {!first && (
          <Button className="" onClick={onPrev}>
            Prev
          </Button>
        )}
        {`Page ${Math.round(skip / limit+ 1) } / ${Math.round(total / limit)}`}
        {!last && (
          <Button className="" onClick={onNext}>
            Next
          </Button>
        )}
      </aside>
    )
  }
)

export default Pagination
