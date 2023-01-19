import React, { ReactNode } from "react"

const Table = ({
  headers,
  children,
  className = "",
}: {
  headers: string[]
}&React.HtmlHTMLAttributes<HTMLTableElement>) => {
  return (
    <table className={`table max-sm:table-compact table-zebra w-full ${className}`}>
      <thead>
        <tr>
          {headers.map((e, idx) => {
            return (
              <th key={e + idx} className={`${idx > 0 ? "" : "!z-0"}`}>
                {e}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody className="">{children}</tbody>
    </table>
  )
}

export default Table
