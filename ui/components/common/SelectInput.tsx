import React from "react"

const SelectInput = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ children, className = "", ...props }, ref) => {
  return (
    <select ref={ref} className={`select select-bordered   ${className}`} {...props}>
      {children}
    </select>
  )
})

export default SelectInput
