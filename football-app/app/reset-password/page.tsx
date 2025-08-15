"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Lock, CheckCircle } from "lucide-react"
import axios from "@/utils/axios"

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token") || ""

  const { toast } = useToast()
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await axios.post("/user/reset-password", { token, newPassword })
      const data = res.data
      if (!data.success) {
        toast({
          title: "Reset Password Failed",
          description: data.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Password Reset",
          description: "Your password has been reset successfully.",
          action: <CheckCircle className="text-green-500" />,
        })
        setNewPassword("")
        setTimeout(() => {
          router.push("/login")
        }, 1800)
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Reset Password Failed",
          description: err.message || "Server error while resetting password.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Reset Password Failed",
          description: "An unknown error occurred.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 p-8 bg-black text-yellow-400 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="card-black-gold">
          <CardHeader>
            <CardTitle className="text-white">Reset Password</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your new password below to reset your account password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!token && (
                <div className="text-red-500 text-sm mb-2">
                  Invalid or missing reset token in URL.
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-white">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="bg-gray-900 border-yellow-400/30 text-white"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  disabled={!token}
                />
              </div>
              <Button
                type="submit"
                className="btn-gold w-full"
                disabled={isLoading || !token || !newPassword}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></span>
                    Resetting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Lock className="mr-2 h-4 w-4" />
                    Reset Password
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function UserResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}