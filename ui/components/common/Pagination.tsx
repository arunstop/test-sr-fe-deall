import { Icon } from "@iconify-icon/react"
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
        className={`flex gap-2 sm:gap-4 items-center max-sm:text-sm  ${className}`}
        {...props}
      >
        {!first && (
          <Button className="!gap-1 sm:!gap-2" onClick={onPrev}>
            <Icon icon="mdi:arrow-left" className="text-lg sm:text-xl "/>
            <span>Prev</span>
          </Button>
        )}
        {`Page ${Math.round(skip / limit + 1)} / ${Math.round(total / limit)}`}
        {!last && (
          <Button className="!gap-1 sm:!gap-2" onClick={onNext}>
            <span>Next</span>
            <Icon icon="mdi:arrow-right" className="text-lg sm:text-xl "/>
          </Button>
        )}
      </aside>
    )
  }
)

export default Pagination
