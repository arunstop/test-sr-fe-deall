import React, { ReactNode } from "react"
import HeaderMain from "ui/components/main/HeaderMain"
import SidebarMain from "ui/components/main/SidebarMain"

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex max-sm:flex-col relative ">
      <SidebarMain />
      <HeaderMain/>
      {children}
    </main>
  )
}

export default DashboardLayout
