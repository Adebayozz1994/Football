"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Save, CheckCircle, KeyRound, RefreshCcw, Lock } from "lucide-react"
import axios from "@/utils/axios"

export default function UserSettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("change-password")
  // Change Password form
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  })
  const [isChangeLoading, setIsChangeLoading] = useState(false)

  // Forgot Password form
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: "",
  })
  const [isForgotLoading, setIsForgotLoading] = useState(false)
  const [resetToken, setResetToken] = useState("")

  // Reset Password form
  const [resetPasswordForm, setResetPasswordForm] = useState({
    token: "",
    newPassword: "",
  })
  const [isResetLoading, setIsResetLoading] = useState(false)

  // Handle form changes
  const handleChangePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePasswordForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleForgotPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotPasswordForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleResetPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetPasswordForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  // Submit handlers
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChangeLoading(true)
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      const { data } = await axios.put(
        "http://localhost:5000/api/user/change-password",
        changePasswordForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!data.success) {
        toast({
          title: "Change Password Failed",
          description: data.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Password Changed",
          description: "Your password has been successfully changed.",
          action: <CheckCircle className="text-green-500" />,
        })
        setChangePasswordForm({ currentPassword: "", newPassword: "" })
      }
    } catch (error) {
      toast({
        title: "Change Password Failed",
        description: "Server error while changing password.",
        variant: "destructive",
      })
    }
    setIsChangeLoading(false)
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsForgotLoading(true)
    try {
      const { data } = await axios.post(
        "/api/user/forgot-password",
        forgotPasswordForm
      )
      if (!data.success) {
        toast({
          title: "Forgot Password Failed",
          description: data.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Check Your Email",
          description: "A reset token has been sent to your email address.",
          action: <CheckCircle className="text-green-500" />,
        })
        setResetToken(data.resetToken || "")
      }
    } catch (error) {
      toast({
        title: "Forgot Password Failed",
        description: "Server error while requesting password reset.",
        variant: "destructive",
      })
    }
    setIsForgotLoading(false)
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsResetLoading(true)
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/reset-password",
        resetPasswordForm
      )
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
        setResetPasswordForm({ token: "", newPassword: "" })
      }
    } catch (error) {
      toast({
        title: "Reset Password Failed",
        description: "Server error while resetting password.",
        variant: "destructive",
      })
    }
    setIsResetLoading(false)
  }

  return (
    <div className="flex-1 p-8 bg-black text-yellow-400 min-h-screen">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
        <p className="text-gray-400 mb-8">Manage your Football Hub account security.</p>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900 border border-yellow-400/20 mb-8">
            <TabsTrigger
              value="change-password"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-yellow-400"
            >
              <KeyRound className="h-4 w-4 mr-2 inline" /> Change Password
            </TabsTrigger>
            <TabsTrigger
              value="forgot-password"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-yellow-400"
            >
              <RefreshCcw className="h-4 w-4 mr-2 inline" /> Forgot Password
            </TabsTrigger>
          </TabsList>
          {/* Change Password */}
          <TabsContent value="change-password" className="mt-2">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white">Change Password</CardTitle>
                <CardDescription className="text-gray-400">Update your Football Hub password securely.</CardDescription>
              </CardHeader>
              <Separator className="bg-yellow-400/20" />
              <CardContent className="space-y-6 mt-6">
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={changePasswordForm.currentPassword}
                      onChange={handleChangePasswordChange}
                      className="bg-gray-900 border-yellow-400/30 text-white"
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-white">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={changePasswordForm.newPassword}
                      onChange={handleChangePasswordChange}
                      className="bg-gray-900 border-yellow-400/30 text-white"
                      autoComplete="new-password"
                    />
                  </div>
                  <Button type="submit" className="btn-gold w-full" disabled={isChangeLoading}>
                    {isChangeLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                        Changing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        Change Password
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Forgot Password */}
          <TabsContent value="forgot-password" className="mt-2">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white">Forgot Password</CardTitle>
                <CardDescription className="text-gray-400">
                  Enter your email to receive a password reset token.
                </CardDescription>
              </CardHeader>
              <Separator className="bg-yellow-400/20" />
              <CardContent className="space-y-6 mt-6">
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={forgotPasswordForm.email}
                      onChange={handleForgotPasswordChange}
                      className="bg-gray-900 border-yellow-400/30 text-white"
                      autoComplete="email"
                    />
                  </div>
                  <Button type="submit" className="btn-gold w-full" disabled={isForgotLoading}>
                    {isForgotLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Send Reset Token
                      </div>
                    )}
                  </Button>
                </form>
                {resetToken && (
                  <div className="mt-4 p-2 bg-gray-900 border border-yellow-400 rounded text-yellow-400 text-xs">
                    <span className="font-bold">Reset Token (dev only):</span> {resetToken}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}