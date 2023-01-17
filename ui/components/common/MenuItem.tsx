import React from "react"

const MenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { active?: boolean }
>(({ children, className, active, ...props }, ref) => (
  <div
    ref={ref}
    className={`px-2  sm:px-4 py-1.5 sm:py-3  hover:bg-base-300/50 transition-all rounded-md sm:rounded-lg
    active:text-base-content active:scale-90 text-base sm:text-lg font-bold cursor-pointer
    ${active ? "border-l-2 sm:border-l-4 border-primary-focus bg-primary-focus/10 !rounded-l-none" : ""}
    ${className}`}
    {...props}
  >
    {children}
  </div>
))

export default MenuItem
