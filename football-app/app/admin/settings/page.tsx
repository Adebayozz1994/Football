"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { UploadCloud, Save, CheckCircle, KeyRound, RefreshCcw, Lock } from "lucide-react"
import axios from '@/utils/axios';

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    siteName: "Football Hub",
    siteDescription: "Your ultimate source for football news and updates.",
    siteUrl: "https://footballhub.com",
    adminEmail: "admin@footballhub.com",
    timezone: "Africa/Lagos",
    language: "en",
    maintenanceMode: false,
    allowRegistration: true,
    require2FA: false,
    sessionTimeout: "3600", 
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    primaryColor: "#FFD700",
    secondaryColor: "#1A1A1A",
    logoUrl: "/placeholder.svg?height=100&width=300",
    faviconUrl: "/placeholder.svg?height=32&width=32",
    apiRateLimit: "1000", 
    fileUploadLimit: "50", 
    cachingEnabled: true,
    compressionEnabled: true,
    cdnEnabled: true,
    backupFrequency: "daily",
    backupRetention: "7", 
  })
  const [isSaving, setIsSaving] = useState(false)

  // Security forms
  const [securityTab, setSecurityTab] = useState("change-password")
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  })
  const [isChangeLoading, setIsChangeLoading] = useState(false)
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: "",
  })
  const [isForgotLoading, setIsForgotLoading] = useState(false)
  const [resetPasswordForm, setResetPasswordForm] = useState({
    token: "",
    newPassword: "",
  })
  const [isResetLoading, setIsResetLoading] = useState(false)

  // Settings logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setSettings((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setSettings((prev) => ({ ...prev, [id]: value }))
  }

  const handleSwitchChange = (id: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: checked }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast({
      title: "Settings Saved",
      description: "Your application settings have been updated successfully.",
      action: <CheckCircle className="text-green-500" />,
    })
    setIsSaving(false)
  }

  const handleExportSettings = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "football_hub_settings.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
    toast({
      title: "Settings Exported",
      description: "Application settings have been exported as JSON.",
    })
  }

  // Security logic
  const handleChangePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePasswordForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleForgotPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotPasswordForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleResetPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetPasswordForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChangeLoading(true)
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null
      const res = await axios.put('/admin/change-password', changePasswordForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
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
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Change Password Failed",
          description: err.message || "Server error while changing password.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Change Password Failed",
          description: "An unknown error occurred.",
          variant: "destructive",
        })
      }
    } finally {
      setIsChangeLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsForgotLoading(true)
    try {
      const res = await axios.post('/admin/forgot-password', forgotPasswordForm);
      const data = res.data;
      if (!data.success) {
        toast({
          title: "Forgot Password Failed",
          description: data.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Check Your Email",
          description: "A password reset link has been sent to your email address. Please check your email and follow the instructions.",
          action: <CheckCircle className="text-green-500" />,
        })
        setForgotPasswordForm({ email: "" })
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Forgot Password Failed",
          description: err.message || "Server error while requesting password reset.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Forgot Password Failed",
          description: "An unknown error occurred.",
          variant: "destructive",
        })
      }
    } finally {
      setIsForgotLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsResetLoading(true)
    try {
      const { data } = await axios.post("/admin/reset-password", resetPasswordForm);
      if (!data.success) {
        toast({
          title: "Reset Password Failed",
          description: data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password Reset",
          description: "Your password has been reset successfully.",
          action: <CheckCircle className="text-green-500" />,
        });
        setResetPasswordForm({ token: "", newPassword: "" });
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Admin Settings</h1>
        <p className="text-gray-400 mb-8">Manage your Football Hub application settings.</p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 bg-gray-900 border border-yellow-400/20">
            <TabsTrigger value="general" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-yellow-400">General</TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-yellow-400">Security</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-yellow-400">Notifications</TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-yellow-400">Appearance</TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-yellow-400">System</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white">General Settings</CardTitle>
                <CardDescription className="text-gray-400">Configure basic site information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName" className="text-white">
                    Site Name
                  </Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-yellow-400/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription" className="text-white">
                    Site Description
                  </Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-yellow-400/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl" className="text-white">
                    Site URL
                  </Label>
                  <Input
                    id="siteUrl"
                    type="url"
                    value={settings.siteUrl}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-yellow-400/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail" className="text-white">
                    Admin Email
                  </Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-yellow-400/30 text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-white">
                      Timezone
                    </Label>
                    <Select value={settings.timezone} onValueChange={(val) => handleSelectChange("timezone", val)}>
                      <SelectTrigger className="bg-gray-900 border-yellow-400/30 text-white">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-yellow-400/20 text-yellow-400">
                        <SelectItem value="Africa/Lagos">Africa/Lagos</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-white">
                      Language
                    </Label>
                    <Select value={settings.language} onValueChange={(val) => handleSelectChange("language", val)}>
                      <SelectTrigger className="bg-gray-900 border-yellow-400/30 text-white">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-yellow-400/20 text-yellow-400">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
                <CardDescription className="text-gray-400">Manage application security features.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="maintenanceMode" className="text-white">
                    Maintenance Mode
                  </Label>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSwitchChange("maintenanceMode", checked)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="allowRegistration" className="text-white">
                    Allow User Registration
                  </Label>
                  <Switch
                    id="allowRegistration"
                    checked={settings.allowRegistration}
                    onCheckedChange={(checked) => handleSwitchChange("allowRegistration", checked)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="require2FA" className="text-white">
                    Require Two-Factor Authentication
                  </Label>
                  <Switch
                    id="require2FA"
                    checked={settings.require2FA}
                    onCheckedChange={(checked) => handleSwitchChange("require2FA", checked)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout" className="text-white">
                    Session Timeout (seconds)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-yellow-400/30 text-white"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white">Admin Password Management</CardTitle>
                <CardDescription className="text-gray-400">Change, reset, or recover your admin password.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={securityTab} onValueChange={setSecurityTab} className="w-full mb-6">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-900 border border-yellow-400/20 mb-4">
                    <TabsTrigger value="change-password" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-yellow-400">
                      <KeyRound className="h-4 w-4 mr-2 inline" /> Change Password
                    </TabsTrigger>
                    <TabsTrigger value="forgot-password" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-yellow-400">
                      <RefreshCcw className="h-4 w-4 mr-2 inline" /> Forgot Password
                    </TabsTrigger>
                  </TabsList>
                  {/* Change Password */}
                  <TabsContent value="change-password" className="mt-2">
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
                  </TabsContent>
                  {/* Forgot Password */}
                  <TabsContent value="forgot-password" className="mt-2">
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Admin Email</Label>
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
                            Send Reset Link
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white">Notification Settings</CardTitle>
                <CardDescription className="text-gray-400">Configure global notification preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="emailNotifications" className="text-white">
                    Email Notifications
                  </Label>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="pushNotifications" className="text-white">
                    Push Notifications
                  </Label>
                  <Switch
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("pushNotifications", checked)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="smsNotifications" className="text-white">
                    SMS Notifications
                  </Label>
                  <Switch
                    id="smsNotifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("smsNotifications", checked)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="mt-6">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white">Appearance Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Customize the look and feel of your application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor" className="text-white">
                      Primary Color
                    </Label>
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={handleInputChange}
                      className="h-10 w-full bg-gray-900 border-yellow-400/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor" className="text-white">
                      Secondary Color
                    </Label>
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={handleInputChange}
                      className="h-10 w-full bg-gray-900 border-yellow-400/30 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logoUrl" className="text-white">
                    Logo URL
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="logoUrl"
                      type="url"
                      value={settings.logoUrl}
                      onChange={handleInputChange}
                      className="flex-1 bg-gray-900 border-yellow-400/30 text-white"
                    />
                    <Button variant="outline" size="icon" className="btn-black bg-transparent">
                      <UploadCloud className="h-4 w-4" />
                    </Button>
                  </div>
                  {settings.logoUrl && (
                    <img
                      src={settings.logoUrl || "/placeholder.svg"}
                      alt="Site Logo"
                      className="mt-2 h-16 object-contain"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faviconUrl" className="text-white">
                    Favicon URL
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="faviconUrl"
                      type="url"
                      value={settings.faviconUrl}
                      onChange={handleInputChange}
                      className="flex-1 bg-gray-900 border-yellow-400/30 text-white"
                    />
                    <Button variant="outline" size="icon" className="btn-black bg-transparent">
                      <UploadCloud className="h-4 w-4" />
                    </Button>
                  </div>
                  {settings.faviconUrl && (
                    <img
                      src={settings.faviconUrl || "/placeholder.svg"}
                      alt="Favicon"
                      className="mt-2 h-8 w-8 object-contain"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="mt-6">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white">System Settings</CardTitle>
                <CardDescription className="text-gray-400">Configure backend and performance settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="apiRateLimit" className="text-white">
                    API Rate Limit (requests/minute)
                  </Label>
                  <Input
                    id="apiRateLimit"
                    type="number"
                    value={settings.apiRateLimit}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-yellow-400/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fileUploadLimit" className="text-white">
                    File Upload Limit (MB)
                  </Label>
                  <Input
                    id="fileUploadLimit"
                    type="number"
                    value={settings.fileUploadLimit}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-yellow-400/30 text-white"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="cachingEnabled" className="text-white">
                    Enable Caching
                  </Label>
                  <Switch
                    id="cachingEnabled"
                    checked={settings.cachingEnabled}
                    onCheckedChange={(checked) => handleSwitchChange("cachingEnabled", checked)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="compressionEnabled" className="text-white">
                    Enable Compression
                  </Label>
                  <Switch
                    id="compressionEnabled"
                    checked={settings.compressionEnabled}
                    onCheckedChange={(checked) => handleSwitchChange("compressionEnabled", checked)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="cdnEnabled" className="text-white">
                    Enable CDN
                  </Label>
                  <Switch
                    id="cdnEnabled"
                    checked={settings.cdnEnabled}
                    onCheckedChange={(checked) => handleSwitchChange("cdnEnabled", checked)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
                  />
                </div>
                <Separator className="bg-yellow-400/20" />
                <h3 className="text-lg font-semibold text-white">Backup & Restore</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency" className="text-white">
                      Backup Frequency
                    </Label>
                    <Select
                      value={settings.backupFrequency}
                      onValueChange={(val) => handleSelectChange("backupFrequency", val)}
                    >
                      <SelectTrigger className="bg-gray-900 border-yellow-400/30 text-white">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-yellow-400/20 text-yellow-400">
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backupRetention" className="text-white">
                      Backup Retention (days)
                    </Label>
                    <Input
                      id="backupRetention"
                      type="number"
                      value={settings.backupRetention}
                      onChange={handleInputChange}
                      className="bg-gray-900 border-yellow-400/30 text-white"
                    />
                  </div>
                </div>
                <Button variant="outline" className="w-full btn-black bg-transparent" onClick={handleExportSettings}>
                  <UploadCloud className="mr-2 h-4 w-4" /> Export All Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isSaving} className="btn-gold">
            {isSaving ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                Saving...
              </div>
            ) : (
              <div className="flex items-center">
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}