import React from "react"
import DashboardContentLayout from "ui/layouts/DashboardContentLayout"

function layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardContentLayout title="Products">{children}</DashboardContentLayout>
  )
}

export default layout
