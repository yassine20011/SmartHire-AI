import React from "react"
import { Toaster } from "~/components/ui/sonner"

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {children}
      <Toaster position="bottom-left" />
    </>
  )
}
