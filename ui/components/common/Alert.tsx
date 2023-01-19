import React from "react"

const Alert = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`alert max-sm:text-sm !text-lg sm:!text-xl font-bold ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Alert
