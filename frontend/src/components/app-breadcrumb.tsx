import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from 'react'
import { Link } from "react-router";

interface AppBreadcrumbnProps {
  items: {
    label: string
    url?: string
  }[]
}

export function AppBreadcrumb({ items }: AppBreadcrumbnProps) {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {
            items.map((item, i) => {
              if (item.url) {
                return (
                  <React.Fragment key={i}>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={`/${item.url}`}>{item.label}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </React.Fragment>
                )
              }

              return <BreadcrumbPage key={i}>{item.label}</BreadcrumbPage>
            })
          }
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}
