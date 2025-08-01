"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import Link from "next/link"

import { Skeleton } from "@/components/ui/skeleton"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import {
  Lock,
  Eye,
  EyeOff,
  Save,
  XCircle,
  CheckCircle,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  LogOut,
  ShieldCheck,
  Mail,
  MessageSquare,
  BellRing,
  Clock,
  Activity,
  User,
} from "lucide-react"

export default function AdminAccountPage() {
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Password state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  // Notification preferences
  const [notificationSettings, setNotificationSettings] = useState({
    emailUpdates: true,
    pushUpdates: true,
    smsUpdates: false,
    systemAlerts: true,
  })

  // Display preferences
  const [displaySettings, setDisplaySettings] = useState({
    theme: "system", // light, dark, system
    language: "en",
    timezone: "Africa/Lagos",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
  })

  // Privacy controls
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public", // public, private
    activityTracking: true,
    dataCollection: true,
  })

  // Session management (mock data)
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 1,
      device: "Chrome on Windows",
      location: "Lagos, Nigeria",
      ip: "192.168.1.100",
      lastActivity: "Just now",
      type: "Laptop",
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "Abuja, Nigeria",
      ip: "10.0.0.5",
      lastActivity: "2 hours ago",
      type: "Smartphone",
    },
    {
      id: 3,
      device: "Firefox on Android",
      location: "Port Harcourt, Nigeria",
      ip: "172.16.0.20",
      lastActivity: "1 day ago",
      type: "Tablet",
    },
  ])

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      
      // TODO: Replace with your authentication logic
      // Mock user data for now
      const mockUser = {
        id: "1",
        email: "admin@example.com",
        created_at: "2024-01-01T00:00:00Z"
      }
      
      setUser(mockUser)
      setIsLoading(false)
    }
    fetchUser()
  }, [])

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      })
      return
    }
    if (!newPassword) {
      toast({
        title: "Invalid Password",
        description: "New password cannot be empty.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    
    // TODO: Implement actual password change with your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
        action: <CheckCircle className="text-green-500" />,
      })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
    } catch (error) {
      toast({
        title: "Password Change Failed",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
        action: <XCircle className="text-red-500" />,
      })
    }
    setIsSaving(false)
  }

  const handleToggle2FA = async () => {
    setIsSaving(true)
    // Simulate API call for 2FA toggle
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setTwoFactorEnabled((prev) => !prev)
    toast({
      title: "2FA Status Updated",
      description: `Two-Factor Authentication is now ${twoFactorEnabled ? "disabled" : "enabled"}.`,
      action: <CheckCircle className="text-green-500" />,
    })
    setIsSaving(false)
  }

  const handleNotificationSwitch = (id: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [id]: checked }))
  }

  const handleDisplaySelect = (id: string, value: string) => {
    setDisplaySettings((prev) => ({ ...prev, [id]: value }))
  }

  const handlePrivacySwitch = (id: string, checked: boolean) => {
    setPrivacySettings((prev) => ({ ...prev, [id]: checked }))
  }

  const handleRevokeSession = (sessionId: number) => {
    setActiveSessions((prev) => prev.filter((session) => session.id !== sessionId))
    toast({
      title: "Session Revoked",
      description: "The selected session has been terminated.",
      action: <CheckCircle className="text-green-500" />,
    })
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-8 bg-black text-yellow-400 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-64 mb-6 bg-gray-800" />
          <Skeleton className="h-6 w-96 mb-8 bg-gray-800" />

          <Card className="card-black-gold mb-8">
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2 bg-gray-800" />
              <Skeleton className="h-4 w-64 bg-gray-800" />
            </CardHeader>
            <CardContent className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-800" />
                  <Skeleton className="h-10 w-full bg-gray-700" />
                </div>
              ))}
              <Skeleton className="h-10 w-full bg-gray-700" />
            </CardContent>
          </Card>

          <Card className="card-black-gold mb-8">
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2 bg-gray-800" />
              <Skeleton className="h-4 w-64 bg-gray-800" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-48 bg-gray-800" />
                <Skeleton className="h-6 w-12 rounded-full bg-gray-700" />
              </div>
              <Skeleton className="h-4 w-full bg-gray-800" />
              <Skeleton className="h-10 w-full bg-gray-700" />
            </CardContent>
          </Card>

          <Card className="card-black-gold mb-8">
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2 bg-gray-800" />
              <Skeleton className="h-4 w-64 bg-gray-800" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-48 bg-gray-800" />
                  <Skeleton className="h-6 w-12 rounded-full bg-gray-700" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex-1 p-8 bg-black text-yellow-400 min-h-screen flex items-center justify-center">
        <Card className="card-black-gold max-w-md text-center p-8">
          <CardTitle className="text-white mb-4">Access Denied</CardTitle>
          <CardDescription className="text-gray-400 mb-6">You must be logged in to view this page.</CardDescription>
          <Link href="/login">
            <Button className="btn-gold">Go to Login</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 p-8 bg-black text-yellow-400 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Account Settings</h1>
        <p className="text-gray-400 mb-8">Manage your account security, preferences, and privacy.</p>

        {/* Change Password */}
        <Card className="card-black-gold mb-8">
          <CardHeader>
            <CardTitle className="text-white">Change Password</CardTitle>
            <CardDescription className="text-gray-400">Update your account password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-white">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pr-10 bg-gray-900 border-yellow-400/30 text-white placeholder:text-gray-400 focus:border-yellow-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-white">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10 bg-gray-900 border-yellow-400/30 text-white placeholder:text-gray-400 focus:border-yellow-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword" className="text-white">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmNewPassword"
                  type={showConfirmNewPassword ? "text" : "password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="pr-10 bg-gray-900 border-yellow-400/30 text-white placeholder:text-gray-400 focus:border-yellow-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                >
                  {showConfirmNewPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            <Button onClick={handleChangePassword} disabled={isSaving} className="btn-gold">
              {isSaving ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Updating...
                </div>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Update Password
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card className="card-black-gold mb-8">
          <CardHeader>
            <CardTitle className="text-white">Two-Factor Authentication (2FA)</CardTitle>
            <CardDescription className="text-gray-400">Add an extra layer of security to your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="twoFactorEnabled" className="text-white">
                Enable 2FA
              </Label>
              <Switch
                id="twoFactorEnabled"
                checked={twoFactorEnabled}
                onCheckedChange={handleToggle2FA}
                disabled={isSaving}
                className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
              />
            </div>
            <p className="text-sm text-gray-500">
              {twoFactorEnabled
                ? "2FA is currently enabled. You will be prompted for a code from your authenticator app upon login."
                : "2FA is currently disabled. Enable it for enhanced account security."}
            </p>
            {!twoFactorEnabled && (
              <Button
                variant="outline"
                onClick={handleToggle2FA}
                disabled={isSaving}
                className="btn-black bg-transparent"
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Set up 2FA
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Session Management */}
        <Card className="card-black-gold mb-8">
          <CardHeader>
            <CardTitle className="text-white">Active Sessions</CardTitle>
            <CardDescription className="text-gray-400">
              Review devices currently logged into your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeSessions.length === 0 ? (
              <p className="text-gray-500">No active sessions found.</p>
            ) : (
              activeSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 bg-gray-900 rounded-md border border-yellow-400/10"
                >
                  <div className="flex items-center gap-3">
                    {session.type === "Laptop" && <Laptop className="h-5 w-5 text-yellow-400" />}
                    {session.type === "Smartphone" && <Smartphone className="h-5 w-5 text-yellow-400" />}
                    {session.type === "Tablet" && <Tablet className="h-5 w-5 text-yellow-400" />}
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{session.device}</span>
                      <span className="text-xs text-gray-500">
                        {session.location} ({session.ip})
                      </span>
                      <span className="text-xs text-gray-500">Last activity: {session.lastActivity}</span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRevokeSession(session.id)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Revoke
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="card-black-gold mb-8">
          <CardHeader>
            <CardTitle className="text-white">Notification Preferences</CardTitle>
            <CardDescription className="text-gray-400">Choose how you receive updates and alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="emailUpdates" className="text-white flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email Updates
              </Label>
              <Switch
                id="emailUpdates"
                checked={notificationSettings.emailUpdates}
                onCheckedChange={(checked) => handleNotificationSwitch("emailUpdates", checked)}
                className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="pushUpdates" className="text-white flex items-center gap-2">
                <BellRing className="h-4 w-4" /> Push Notifications
              </Label>
              <Switch
                id="pushUpdates"
                checked={notificationSettings.pushUpdates}
                onCheckedChange={(checked) => handleNotificationSwitch("pushUpdates", checked)}
                className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="smsUpdates" className="text-white flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> SMS Notifications
              </Label>
              <Switch
                id="smsUpdates"
                checked={notificationSettings.smsUpdates}
                onCheckedChange={(checked) => handleNotificationSwitch("smsUpdates", checked)}
                className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="systemAlerts" className="text-white flex items-center gap-2">
                <Activity className="h-4 w-4" /> System Alerts
              </Label>
              <Switch
                id="systemAlerts"
                checked={notificationSettings.systemAlerts}
                onCheckedChange={(checked) => handleNotificationSwitch("systemAlerts", checked)}
                className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
              />
            </div>
          </CardContent>
        </Card>

        {/* Display Preferences */}
        <Card className="card-black-gold mb-8">
          <CardHeader>
            <CardTitle className="text-white">Display Preferences</CardTitle>
            <CardDescription className="text-gray-400">
              Customize the application's appearance and localization.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-white">
                Theme
              </Label>
              <Select value={displaySettings.theme} onValueChange={(val) => handleDisplaySelect("theme", val)}>
                <SelectTrigger className="bg-gray-900 border-yellow-400/30 text-white">
                  <Monitor className="h-4 w-4 text-yellow-400 mr-2" />
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-yellow-400/20 text-yellow-400">
                  <SelectItem value="system">System Default</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language" className="text-white">
                Language
              </Label>
              <Select value={displaySettings.language} onValueChange={(val) => handleDisplaySelect("language", val)}>
                <SelectTrigger className="bg-gray-900 border-yellow-400/30 text-white">
                  <Globe className="h-4 w-4 text-yellow-400 mr-2" />
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-yellow-400/20 text-yellow-400">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-white">
                Timezone
              </Label>
              <Select value={displaySettings.timezone} onValueChange={(val) => handleDisplaySelect("timezone", val)}>
                <SelectTrigger className="bg-gray-900 border-yellow-400/30 text-white">
                  <Clock className="h-4 w-4 text-yellow-400 mr-2" />
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-yellow-400/20 text-yellow-400">
                  <SelectItem value="Africa/Lagos">Africa/Lagos</SelectItem>
                  <SelectItem value="America/New_York">America/New York</SelectItem>
                  <SelectItem value="Europe/London">Europe/London</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateFormat" className="text-white">
                  Date Format
                </Label>
                <Select
                  value={displaySettings.dateFormat}
                  onValueChange={(val) => handleDisplaySelect("dateFormat", val)}
                >
                  <SelectTrigger className="bg-gray-900 border-yellow-400/30 text-white">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-yellow-400/20 text-yellow-400">
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeFormat" className="text-white">
                  Time Format
                </Label>
                <Select
                  value={displaySettings.timeFormat}
                  onValueChange={(val) => handleDisplaySelect("timeFormat", val)}
                >
                  <SelectTrigger className="bg-gray-900 border-yellow-400/30 text-white">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-yellow-400/20 text-yellow-400">
                    <SelectItem value="24h">24-hour (e.g., 14:30)</SelectItem>
                    <SelectItem value="12h">12-hour (e.g., 02:30 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Controls */}
        <Card className="card-black-gold mb-8">
          <CardHeader>
            <CardTitle className="text-white">Privacy Controls</CardTitle>
            <CardDescription className="text-gray-400">
              Manage your data privacy and visibility settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileVisibility" className="text-white">
                Profile Visibility
              </Label>
              <Select
                value={privacySettings.profileVisibility}
                onValueChange={(val) => handleDisplaySelect("profileVisibility", val)}
              >
                <SelectTrigger className="bg-gray-900 border-yellow-400/30 text-white">
                  <User className="h-4 w-4 text-yellow-400 mr-2" />
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-yellow-400/20 text-yellow-400">
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="activityTracking" className="text-white">
                Enable Activity Tracking
              </Label>
              <Switch
                id="activityTracking"
                checked={privacySettings.activityTracking}
                onCheckedChange={(checked) => handlePrivacySwitch("activityTracking", checked)}
                className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="dataCollection" className="text-white">
                Allow Data Collection
              </Label>
              <Switch
                id="dataCollection"
                checked={privacySettings.dataCollection}
                onCheckedChange={(checked) => handlePrivacySwitch("dataCollection", checked)}
                className="data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-700"
              />
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={() =>
              toast({
                title: "Settings Saved",
                description: "Account preferences updated.",
                action: <CheckCircle className="text-green-500" />,
              })
            }
            className="btn-gold"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  )
}
