import React, { ReactNode } from "react"
import HeaderMain from "ui/components/main/HeaderMain"
import SidebarMain from "ui/components/main/SidebarMain"

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex max-lg:flex-col relative ">
      <SidebarMain />
      <section className="max-h-screen overflow-auto w-full">
        <HeaderMain />

        {children}
      </section>
    </main>
  )
}

export default DashboardLayout
