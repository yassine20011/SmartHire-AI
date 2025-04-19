import type React from "react"
import { cn } from "~/lib/utils"
import { Link } from "lucide-react"

interface DashboardShellProps {
  children: React.ReactNode
  className?: string
  userType?: "candidate" | "recruiter"
}

export function DashboardShell({ children, className, userType = "candidate" }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="font-bold">SmartHire AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {userType === "candidate" ? (
            <>
              <Link href="/dashboard/candidate" className="text-sm font-medium hover:underline underline-offset-4">
                Tableau de bord
              </Link>
              <Link href="/jobs" className="text-sm font-medium hover:underline underline-offset-4">
                Offres
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard/recruiter" className="text-sm font-medium hover:underline underline-offset-4">
                Tableau de bord
              </Link>
              <Link href="/jobs/new" className="text-sm font-medium hover:underline underline-offset-4">
                Publier une offre
              </Link>
              <Link href="/candidates" className="text-sm font-medium hover:underline underline-offset-4">
                Candidats
              </Link>
            </>
          )}
          <Link href="/settings" className="text-sm font-medium hover:underline underline-offset-4">
            Paramètres
          </Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Déconnexion
          </Link>
        </nav>
      </header>
      <main className={cn("flex-1 space-y-4 p-4 pt-6 md:p-8 md:pt-10", className)}>{children}</main>
    </div>
  )
}

