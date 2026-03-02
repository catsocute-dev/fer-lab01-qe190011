import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"
import { ROUTE_LOGIN } from "@/constants/routes"
import {
  MESSAGE_AUTH_LOGIN_FAILED,
  MESSAGE_AUTH_REGISTER_FAILED,
} from "@/constants/messages"

interface AuthResult {
  success: boolean
  errorMessage?: string
}

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (email: string, password: string) => Promise<AuthResult>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const initSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (!isMounted) {
        return
      }

      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    }

    void initSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        errorMessage: MESSAGE_AUTH_LOGIN_FAILED,
      }
    }

    return { success: true }
  }

  const signUp = async (email: string, password: string): Promise<AuthResult> => {
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}${ROUTE_LOGIN}`
        : undefined

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: redirectTo ? { emailRedirectTo: redirectTo } : undefined,
    })

    if (error) {
      return {
        success: false,
        errorMessage: MESSAGE_AUTH_REGISTER_FAILED,
      }
    }

    return { success: true }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [loading, session, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return ctx
}

