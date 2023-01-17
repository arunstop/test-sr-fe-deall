import React, { ReactNode } from "react"
import SidebarMain from "ui/components/main/SidebarMain"

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex ">
      <SidebarMain />
      {children}
    </main>
  )
}

export default DashboardLayout
