"use client"

import { Skeleton } from "@/components/ui/skeleton"
import type React from "react"
import { useState, useEffect, useRef } from "react"
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
  Newspaper,
  Users,
} from "lucide-react"
import Link from "next/link"
import axios from "@/utils/axios"

export default function UserProfilePage() {
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
    birthdate: "",
    avatar_url: "",
    gender: "",
    address: "",
    theme: "",
    language: "",
    achievements: "",
    badges: "",
    favoritePlayers: "",
    favoriteLeagues: "",
    coverPhoto: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const avatarFileRef = useRef<File | null>(null)
  const previewUrlRef = useRef<string | null>(null)

  // Cleanup function for object URLs
  const cleanupPreviewUrl = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupPreviewUrl()
    }
  }, [])

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      if (!token) {
        setIsLoading(false)
        setUser(null)
        return
      }
      try {
        const res = await axios.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = res.data
        if (!data.success || !data.data?.user) {
          setIsLoading(false)
          setUser(null)
          return
        }
        const userData = data.data.user
        setUser({
          id: userData._id,
          email: userData.email,
          created_at: userData.createdAt,
          last_sign_in_at: userData.lastLogin,
          role: userData.role,
        })
        setProfile({
          full_name: userData.firstName + " " + userData.lastName,
          phone: userData.phone || "",
          bio: userData.bio || "",
          location: userData.location || "",
          birthdate: userData.birthdate ? userData.birthdate.slice(0, 10) : "",
          avatar_url: userData.avatar || "",
          gender: userData.gender || "",
          address: userData.address || "",
          theme: userData.theme || "",
          language: userData.language || "",
          achievements: (userData.achievements && userData.achievements.join(", ")) || "",
          badges: (userData.badges && userData.badges.join(", ")) || "",
          favoritePlayers: (userData.favoritePlayers && userData.favoritePlayers.join(", ")) || "",
          favoriteLeagues: (userData.favoriteLeagues && userData.favoriteLeagues.join(", ")) || "",
          coverPhoto: userData.coverPhoto || "",
        })
        setFormData({
          full_name: userData.firstName + " " + userData.lastName,
          email: userData.email || "",
          phone: userData.phone || "",
          bio: userData.bio || "",
          location: userData.location || "",
          birthdate: userData.birthdate ? userData.birthdate.slice(0, 10) : "",
          avatar_url: userData.avatar || "",
          gender: userData.gender || "",
          address: userData.address || "",
          theme: userData.theme || "",
          language: userData.language || "en",
          achievements: (userData.achievements && userData.achievements.join(", ")) || "",
          badges: (userData.badges && userData.badges.join(", ")) || "",
          favoritePlayers: (userData.favoritePlayers && userData.favoritePlayers.join(", ")) || "",
          favoriteLeagues: (userData.favoriteLeagues && userData.favoriteLeagues.join(", ")) || "",
          coverPhoto: userData.coverPhoto || "",
        })
      } catch (error) {
        setUser(null)
      }
      setIsLoading(false)
    }

    fetchProfile()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    if (!user) return
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      const fd = new FormData()
      fd.append("firstName", formData.full_name.split(" ")[0])
      fd.append("lastName", formData.full_name.split(" ").slice(1).join(" "))
      fd.append("phone", formData.phone)
      fd.append("bio", formData.bio)
      fd.append("location", formData.location)
      fd.append("birthdate", formData.birthdate)
      fd.append("gender", formData.gender)
      fd.append("address", formData.address)
      fd.append("theme", formData.theme)
      fd.append("language", formData.language)
      fd.append("achievements", formData.achievements)
      fd.append("badges", formData.badges)
      fd.append("favoritePlayers", formData.favoritePlayers)
      fd.append("favoriteLeagues", formData.favoriteLeagues)
      fd.append("coverPhoto", formData.coverPhoto)
      if (avatarFileRef.current) {
        fd.append("avatar", avatarFileRef.current)
      }

      const res = await axios.put("/user/profile", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = res.data
      if (!data.success) {
        toast({
          title: "Update Failed",
          description: data.message || "Failed to update profile. Please try again.",
          variant: "destructive",
          action: <XCircle className="text-red-500" />,
        })
      } else {
        setProfile((prev: any) => ({
          ...prev,
          ...formData,
          avatar_url: data.data.user.avatar || formData.avatar_url,
        }))
        setFormData((prev) => ({
          ...prev,
          avatar_url: data.data.user.avatar || prev.avatar_url,
        }))
        avatarFileRef.current = null
        cleanupPreviewUrl() // Clean up preview URL after successful save
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
          action: <CheckCircle className="text-green-500" />,
        })
        setIsEditing(false)
      }
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
      setFormData({ ...profile, email: user?.email || "" })
      avatarFileRef.current = null
      cleanupPreviewUrl() // Clean up preview URL on cancel
    }
    setIsEditing(false)
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload.",
        variant: "destructive",
      })
      return
    }

    const file = files[0]
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, GIF, etc.).",
        variant: "destructive",
      })
      return
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      })
      return
    }

    avatarFileRef.current = file
    cleanupPreviewUrl() // Clean up previous preview URL
    const previewUrl = URL.createObjectURL(file)
    previewUrlRef.current = previewUrl
    
    setFormData((prev) => ({
      ...prev,
      avatar_url: previewUrl,
    }))

    toast({
      title: "Image selected",
      description: "Click 'Save Changes' to upload your new profile picture.",
    })
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-8 bg-black text-yellow-400 min-h-screen">
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">User Profile</h1>
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
        <p className="text-gray-400 mb-8">View and manage your Football Hub profile information.</p>

        <Card className="card-black-gold">
          <CardHeader className="flex flex-col items-center">
            <div className="relative group mb-4">
              <Avatar className="h-24 w-24 border-2 border-yellow-400">
                <AvatarImage
                  src={formData.avatar_url || "/placeholder-user.jpg"}
                  alt={formData.full_name || "User"}
                />
                <AvatarFallback className="bg-gray-800 text-yellow-400 text-4xl">
                  {formData.full_name ? formData.full_name.charAt(0).toUpperCase() : <User className="h-12 w-12" />}
                </AvatarFallback>
              </Avatar>
              {avatarFileRef.current && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-semibold">
                  Preview
                </div>
              )}
              {avatarFileRef.current && isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    avatarFileRef.current = null
                    cleanupPreviewUrl() // Clean up the preview URL
                    setFormData(prev => ({
                      ...prev,
                      avatar_url: profile?.avatar_url || "/placeholder-user.jpg"
                    }))
                    toast({
                      title: "Preview cleared",
                      description: "Reverted to your current profile picture.",
                    })
                  }}
                  className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  title="Clear preview"
                >
                  ×
                </button>
              )}
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
                {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User"}
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
              <div className="space-y-2">
                <Label htmlFor="address" className="text-white">
                  Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing || isSaving}
                  className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthdate" className="text-white">
                  Birthdate
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  disabled={!isEditing || isSaving}
                  className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-white">
                  Gender
                </Label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing || isSaving}
                  className="bg-gray-900 border-yellow-400/30 text-white p-2 rounded disabled:opacity-70"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
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
              <Label htmlFor="theme" className="text-white">
                Theme
              </Label>
              <select
                id="theme"
                value={formData.theme}
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                className="bg-gray-900 border-yellow-400/30 text-white p-2 rounded disabled:opacity-70"
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language" className="text-white">
                Language
              </Label>
              <Input
                id="language"
                value={formData.language}
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverPhoto" className="text-white">
                Cover Photo URL
              </Label>
              <Input
                id="coverPhoto"
                value={formData.coverPhoto}
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
              />
            </div>

            <Separator className="bg-yellow-400/20" />
            <h3 className="text-lg font-semibold text-white">Achievements, Badges & Favourites</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="achievements" className="text-white">
                  Achievements
                </Label>
                <Input
                  id="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  disabled={!isEditing || isSaving}
                  placeholder="Comma separated"
                  className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badges" className="text-white">
                  Badges
                </Label>
                <Input
                  id="badges"
                  value={formData.badges}
                  onChange={handleInputChange}
                  disabled={!isEditing || isSaving}
                  placeholder="Comma separated"
                  className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="favoritePlayers" className="text-white">
                  Favorite Players
                </Label>
                <Input
                  id="favoritePlayers"
                  value={formData.favoritePlayers}
                  onChange={handleInputChange}
                  disabled={!isEditing || isSaving}
                  placeholder="Comma separated"
                  className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="favoriteLeagues" className="text-white">
                  Favorite Leagues
                </Label>
                <Input
                  id="favoriteLeagues"
                  value={formData.favoriteLeagues}
                  onChange={handleInputChange}
                  disabled={!isEditing || isSaving}
                  placeholder="Comma separated"
                  className="bg-gray-900 border-yellow-400/30 text-white disabled:opacity-70"
                />
              </div>
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
                  <span className="text-sm font-medium">Role</span>
                </div>
                <p className="text-lg font-bold">{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User"}</p>
              </Card>
            </div>

            <Separator className="bg-yellow-400/20" />
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Activity className="h-4 w-4" />
                <span>Updated profile info</span>
                <span className="ml-auto text-xs">2 hours ago</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Newspaper className="h-4 w-4" />
                <span>Joined "Premier League" Fan Group</span>
                <span className="ml-auto text-xs">1 day ago</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="h-4 w-4" />
                <span>Followed team "Manchester United"</span>
                <span className="ml-auto text-xs">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}