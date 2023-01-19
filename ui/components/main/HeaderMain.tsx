"use client"
import { Icon } from "@iconify-icon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Alert from "../common/Alert"
import Button from "../common/Button"
import MenuItem from "../common/MenuItem"

function HeaderMain() {
  const path = usePathname() || ""

  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(false)

    return () => {}
  }, [path])

  return (
    <>
      <nav className="sticky top-0 flex pointer-events-none [&>*]:pointer-events-auto p-2 sm:p-4 lg:hidden z-30 ">
        <Button onClick={() => setOpen((oldVal) => !oldVal)}>
          <Icon icon="mdi:menu" className="text-2xl sm:text-2xl" />
        </Button>
      </nav>

      <input
        type="checkbox"
        id="modal-mobile-nav"
        className="modal-toggle"
        checked={open}
      />
      <div className="modal modal-bottom sm:modal-middle ">
        <div
          className="modal-box p-2 sm:p-4 bg-transparent max-sm:bg-base-200 !shadow-none rounded-lg flex flex-col 
          !gap-2 sm:!gap-4 transition-all"
        >
          <div className="flex justify-center gap-2 sm:gap-4 items-center">
            <Alert className="!justify-center max-sm:p-2 rounded-lg">Menu</Alert>
          </div>
          <Link href="/products" className="bg-base-200 rounded-lg">
            <MenuItem
              className="bg-base-200"
              active={path.includes("/products") == true}
            >
              <Icon
                icon="mdi:package-variant-closed"
                className="text-xl sm:tex-2xl"
              />
              <span>Products</span>
            </MenuItem>
          </Link>
          <Link href="/carts" className="bg-base-200 rounded-lg">
            <MenuItem
              className="bg-base-200"
              active={path.includes("/carts") == true}
            >
              <Icon icon="mdi:cart" className="text-xl sm:tex-2xl" />
              <span>Carts</span>
            </MenuItem>
          </Link>
          <Button
            className="w-full"
            onClick={() => setOpen((oldVal) => !oldVal)}
          >
            Close
          </Button>
        </div>
      </div>
    </>
  )
}

export default HeaderMain
