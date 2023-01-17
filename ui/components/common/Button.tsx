import React from "react"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className="",children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`btn min-w-[4rem] hover:-translate-y-2 active:!scale-90 active:translate-y-0 ${
        className
      }`}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
