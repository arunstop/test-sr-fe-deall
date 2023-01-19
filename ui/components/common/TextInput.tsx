import React from "react"

const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={`input max-sm:select-sm input-bordered ${className || ""}`} {...props}></input>
))

export default TextInput
