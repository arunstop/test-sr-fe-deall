"use client"
import { Icon } from "@iconify-icon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import MenuItem from "../common/MenuItem"

function SidebarMain() {
  const path = usePathname() || ""
  return (
    <nav className="p-2 sm:p-4 w-80 bg-base-200  flex-col hidden lg:flex
    ">
      <Link href="/products" >
        <MenuItem active={path.includes("/products") == true}>
        <Icon icon="mdi:package-variant-closed"  className="text-xl sm:tex-2xl"/>
        <span>Products</span>
        </MenuItem>
      </Link>
      <Link href="/carts" >
        <MenuItem active={path.includes("/carts") == true}>
        <Icon icon="mdi:cart"  className="text-xl sm:tex-2xl"/>
        <span>Carts</span>
        </MenuItem>
      </Link>
    </nav>
  )
}

export default SidebarMain
