import React, { ReactNode } from "react"
import HeaderMain from "ui/components/main/HeaderMain"
import SidebarMain from "ui/components/main/SidebarMain"

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex max-lg:flex-col relative ">
      <NavSection />
      {children}
    </main>
  )
}

function NavSection() {
  return (
    <>
      <SidebarMain />
      <HeaderMain />
    </>
  )
}

export default DashboardLayout
