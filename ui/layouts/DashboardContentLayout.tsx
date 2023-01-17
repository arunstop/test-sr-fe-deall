import React, { ReactNode } from "react"

function DashboardContentLayout({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col p-2 sm:p-4 w-full flex-1 gap-2 sm:gap-4">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
      </header>
      {children}
    </section>
  )
}

export default DashboardContentLayout
