import { Icon } from "@iconify-icon/react"
import { ICategory } from "core/models/category"
import { repoCategoryGetAll } from "core/repos/category"
import React, { useEffect, useState } from "react"
import Button from "../common/Button"
import SelectInput from "../common/SelectInput"

export interface IProductFilterSectionProps {
  category: {
    value: string
    list: ICategory[]
    set: (newVal: string) => void
  }
  //   brands: [string[], (newVal: string) => void]
  //   priceRange: [string[], (newVal: string) => void]
  //   product: [string[], (newVal: string) => void]
}
function ProductFilterSection({
  category,
  className = "",
  ...props
}: //   brands,
//   priceRange,
//   product,
IProductFilterSectionProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={`flex gap-2 sm:gap-4 w-full ${className} items-center`}
      {...props}
    >
      <SelectInput
        className="valid:outline-primary transition-all duration-300 capitalize invalid:text-gray-400 
            [&>option:not(:first-child)]:text-black"
        value={category.value}
        onChange={(ev) => category.set(ev.target.value)}
        required
      >
        <option value="" disabled>
          By category
        </option>
        {category.list.map((e, idx) => (
          <option key={idx} value={e.name} className="capitalize">
            {e.name.replaceAll("-", " ")}
          </option>
        ))}
      </SelectInput>
      {!!category.value && (
        <Button className="btn-outline" onClick={() => category.set("")}>
          <Icon icon="mdi:close-thick" className="text-lg sm:text-xl" />
          <span>Clear Filter</span>
        </Button>
      )}
    </section>
  )
}

export default ProductFilterSection
