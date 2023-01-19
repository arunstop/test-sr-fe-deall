import React from "react"

const SelectInput = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ children, className = "", ...props }, ref) => {
  return (
    <select ref={ref} className={`select max-sm:select-sm select-bordered   ${className}`} {...props}>
      {children}
    </select>
  )
})

export default SelectInput
