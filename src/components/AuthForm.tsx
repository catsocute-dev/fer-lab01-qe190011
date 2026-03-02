import { useState } from "react"
import { useForm, type FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from "@/lib/validations"
import { useAuth } from "@/contexts/AuthContext"

type AuthMode = "login" | "register"

interface AuthFormProps {
  mode: AuthMode
  onSuccess?: () => void
}

export const AuthForm = ({ mode, onSuccess }: AuthFormProps) => {
  const { signIn, signUp } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isLogin = mode === "login"

  const form = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const handleAuthSubmit = async (
    data: LoginFormData | RegisterFormData,
  ) => {
    setSubmitting(true)
    setErrorMessage(null)

    try {
      if (isLogin) {
        const result = await signIn(data.email, data.password)

        if (!result.success) {
          setErrorMessage(result.errorMessage ?? null)
          return
        }
      } else {
        const result = await signUp(data.email, data.password)

        if (!result.success) {
          setErrorMessage(result.errorMessage ?? null)
          return
        }
      }

      if (onSuccess) {
        onSuccess()
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleAuthSubmit)}
      className="space-y-6"
      noValidate
    >
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        {isLogin ? "Login" : "Register"}
      </h1>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-blue-900 font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="username@gmail.com"
          className={`bg-white border-gray-300 ${
            errors.email ? "border-red-500" : ""
          }`}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email.message as string}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-blue-900 font-medium">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`bg-white border-gray-300 pr-10 ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">
            {errors.password.message as string}
          </p>
        )}
      </div>

      {/* Register-only fields */}
      {!isLogin && (
        <>
          {/*
            TypeScript không biết chắc chắn rằng errors có field name/confirmPassword
            khi form dùng union type, nên cần thu hẹp kiểu cho phần register-only.
          */}
          {(() => {
            const registerErrors = errors as FieldErrors<RegisterFormData>
            return (
              <>
          {/* Full name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-900 font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className={`bg-white border-gray-300 ${
                registerErrors.name ? "border-red-500" : ""
              }`}
              {...register("name")}
            />
            {registerErrors.name && (
              <p className="text-sm text-red-500">
                {registerErrors.name.message as string}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-blue-900 font-medium"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={`bg-white border-gray-300 pr-10 ${
                  registerErrors.confirmPassword ? "border-red-500" : ""
                }`}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {registerErrors.confirmPassword && (
              <p className="text-sm text-red-500">
                {registerErrors.confirmPassword.message as string}
              </p>
            )}
          </div>
              </>
            )
          })()}
        </>
      )}

      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-900 hover:bg-blue-800 text-white h-11 text-base"
        disabled={submitting}
      >
        {submitting ? "Please wait..." : isLogin ? "Sign in" : "Sign up"}
      </Button>
    </form>
  )
}

