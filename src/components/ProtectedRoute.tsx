import { Navigate, useLocation } from "react-router-dom"
import type { ReactNode } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { ROUTE_LOGIN } from "@/constants/routes"

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to={ROUTE_LOGIN}
        replace
        state={{ redirectTo: location.pathname }}
      />
    )
  }

  return <>{children}</>
}

