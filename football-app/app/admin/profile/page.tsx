"use client"

import { Skeleton } from "@/components/ui/skeleton"
import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import {
  User,
  Calendar,
  Clock,
  Edit,
  Save,
  XCircle,
  CheckCircle,
  Camera,
  Activity,
  LogIn,
  ShieldCheck,
  ListChecks,
  Newspaper,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function AdminProfilePage() {
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    timezone: "",
    avatar_url: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      // Get admin token from localStorage (or your auth context)
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null
      if (!token) {
        setIsLoading(false)
        setUser(null)
        return
      }
      try {
        const res = await fetch("http://localhost:5000/api/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        if (!res.ok || !data.success || !data.data?.admin) {
          setIsLoading(false)
          setUser(null)
          return
        }
        const admin = data.data.admin
        setUser({
          id: admin._id,
          email: admin.email,
          created_at: admin.createdAt,
          last_sign_in_at: admin.lastLogin,
        })
        setProfile({
          full_name: admin.firstName + " " + admin.lastName,
          phone: admin.phone || "",
          bio: admin.bio || "",
          location: admin.state || "",
          timezone: admin.timezone || "",
          avatar_url: admin.avatar || "",
          login_count: admin.login_count || 0
        })
        setFormData({
          full_name: admin.firstName + " " + admin.lastName,
          email: admin.email || "",
          phone: admin.phone || "",
          bio: admin.bio || "",
          location: admin.state || "",
          timezone: admin.timezone || "",
          avatar_url: admin.avatar || "",
        })
      } catch (error) {
        setUser(null)
      }
      setIsLoading(false)
    }

    fetchProfile()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    if (!user) return
    // TODO: Implement actual profile update with your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProfile((prev: any) => ({ ...prev, ...formData }))
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
        action: <CheckCircle className="text-green-500" />,
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
        action: <XCircle className="text-red-500" />,
      })
    }
    setIsSaving(false)
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        email: user?.email || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
        location: profile.location || "",
        timezone: profile.timezone || "",
        avatar_url: profile.avatar_url || "",
      })
    }
    setIsEditing(false)
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload.",
        variant: "destructive",
      })
      return
    }
    const file = event.target.files[0]
    setIsSaving(true)
    // TODO: Implement actual file upload with your chosen storage solution
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      // For now, just use a placeholder URL
      const mockUrl = "/placeholder-user.jpg"
      setProfile((prev: any) => ({ ...prev, avatar_url: mockUrl }))
      setFormData((prev) => ({ ...prev, avatar_url: mockUrl }))
      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated.",
        action: <CheckCircle className="text-green-500" />,
      })
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      })
    }
    setIsSaving(false)
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-8 bg-black text-yellow-400 min-h-screen">
        {/* ... unchanged skeleton style ... */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-10 w-64 bg-gray-800" />
            <Skeleton className="h-10 w-24 bg-gray-800" />
          </div>
          <Skeleton className="h-6 w-96 mb-8 bg-gray-800" />

          <Card className="card-black-gold">
            <CardHeader className="flex flex-col items-center">
              <Skeleton className="h-24 w-24 rounded-full mb-4 bg-gray-700" />
              <Skeleton className="h-8 w-48 mb-2 bg-gray-800" />
              <Skeleton className="h-5 w-32 bg-gray-800" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-6 w-20 bg-gray-700" />
                <Skeleton className="h-6 w-20 bg-gray-700" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-gray-800" />
                    <Skeleton className="h-10 w-full bg-gray-700" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-800" />
                <Skeleton className="h-24 w-full bg-gray-700" />
              </div>
              <Skeleton className="h-6 w-full bg-gray-800" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-gray-800" />
                    <Skeleton className="h-10 w-full bg-gray-700" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-6 w-full bg-gray-800" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
                    <Skeleton className="h-4 w-48 bg-gray-800" />
                    <Skeleton className="h-4 w-24 ml-auto bg-gray-800" />
                  </div>
                ))}
              </div>
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
          <Link href="/admin/login">
            <Button className="btn-gold">Go to Login</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 p-8 bg-black text-yellow-400 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* ... unchanged profile style ... */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Admin Profile</h1>
          {isEditing ? (
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={isSaving} className="btn-gold">
                {isSaving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleCancel} className="btn-black bg-transparent">
                <XCircle className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="btn-black bg-transparent">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
        <p className="text-gray-400 mb-8">View and manage your administrator profile information.</p>

        <Card className="card-black-gold">
          <CardHeader className="flex flex-col items-center">
            <div className="relative group mb-4">
              <Avatar className="h-24 w-24 border-2 border-yellow-400">
                <AvatarImage
                  src={formData.avatar_url || "/placeholder.svg?height=128&width=128&query=user+avatar"}
                  alt={formData.full_name || "User"}
                />
                <AvatarFallback className="bg-gray-800 text-yellow-400 text-4xl">
                  {formData.full_name ? formData.full_name.charAt(0).toUpperCase() : <User className="h-12 w-12" />}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="h-8 w-8 text-yellow-400" />
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={isSaving}
                  />
                  <span className="sr-only">Upload new avatar</span>
                </Label>
              )}
            </div>
            <CardTitle className="text-white text-2xl">{profile?.full_name || user.email}</CardTitle>
            <CardDescription className="text-gray-400">{user.email}</CardDescription>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="bg-yellow-400 text-black font-semibold">
                Administrator
              </Badge>
              <Badge variant="secondary" className="bg-gray-700 text-yellow-400">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Separator className="bg-yellow-400/20" />
            <h3 className="text-lg font-semibold text-white">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  disabled={!isEditing || isSaving}
                  className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing || isSaving}
                  className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing || isSaving}
                  className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-white">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-white">
                Timezone
              </Label>
              <Input
                id="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
              />
            </div>

            <Separator className="bg-yellow-400/20" />
            <h3 className="text-lg font-semibold text-white">Account Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900 border-yellow-400/20 text-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium">Joined On</span>
                </div>
                <p className="text-lg font-bold">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                </p>
              </Card>
              <Card className="bg-gray-900 border-yellow-400/20 text-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium">Last Login</span>
                </div>
                <p className="text-lg font-bold">
                  {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "N/A"}
                </p>
              </Card>
              <Card className="bg-gray-900 border-yellow-400/20 text-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <LogIn className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-medium">Login Count</span>
                </div>
                <p className="text-lg font-bold">{profile?.login_count || 0}</p>
              </Card>
            </div>

            <Separator className="bg-yellow-400/20" />
            <h3 className="text-lg font-semibold text-white">Permissions & Roles</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-medium">Assigned Roles:</span>
                <Badge variant="secondary" className="bg-yellow-400 text-black">
                  Admin
                </Badge>
                <Badge variant="secondary" className="bg-gray-700 text-yellow-400">
                  Moderator
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-medium">Key Permissions:</span>
                <Badge variant="secondary" className="bg-gray-700 text-yellow-400">
                  Manage Users
                </Badge>
                <Badge variant="secondary" className="bg-gray-700 text-yellow-400">
                  Edit Content
                </Badge>
                <Badge variant="secondary" className="bg-gray-700 text-yellow-400">
                  View Analytics
                </Badge>
              </div>
            </div>

            <Separator className="bg-yellow-400/20" />
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Activity className="h-4 w-4" />
                <span>Updated site settings</span>
                <span className="ml-auto text-xs">2 hours ago</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Newspaper className="h-4 w-4" />
                <span>Published new article "Matchday Highlights"</span>
                <span className="ml-auto text-xs">1 day ago</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="h-4 w-4" />
                <span>Reviewed user "John Doe" profile</span>
                <span className="ml-auto text-xs">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}