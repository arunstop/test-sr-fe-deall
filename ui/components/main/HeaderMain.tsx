import { Icon } from "@iconify-icon/react"
import React from "react"
import Button from "../common/Button"

function HeaderMain() {
  return (
    <nav className="sticky top-0 flex pointer-events-none [&>*]:pointer-events-auto p-2 sm:p-4 p-hidden z-30">
      <Button>
        <Icon icon="mdi:menu" className="text-2xl sm:text-2xl" />
      </Button>
    </nav>
  )
}

export default HeaderMain
