import React, { ReactNode } from 'react'
import DashboardContentLayout from 'ui/layouts/DashboardContentLayout'

function CartLayout({children}:{children?:ReactNode}) {
  return (
    <DashboardContentLayout title="Carts">{children}</DashboardContentLayout>
  )
}

export default CartLayout