import React from "react"
import DashboardLayout from "../../ui/layouts/DashboardLayout"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body data-theme="light">
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  )
}
