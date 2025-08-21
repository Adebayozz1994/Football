"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Search, Trophy, Users, Newspaper, Globe, User, Bell, LogOut, Shield, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [profileType, setProfileType] = useState<"user" | "admin" | null>(null)
  const [profile, setProfile] = useState<{ avatar?: string; name?: string; email?: string } | null>(null)
  const router = useRouter()

  // Navigation
  const navigation = [
    { name: "Matches", href: "/matches", icon: Trophy },
    { name: "Teams", href: "/teams", icon: Users },
    { name: "News", href: "/news", icon: Newspaper },
    { name: "Europe", href: "/europe", icon: Globe },
  ]

  useEffect(() => {
    // Detect and fetch profile for user/admin (based on token presence)
    const userToken = typeof window !== "undefined" ? localStorage.getItem("token") : null
    const adminToken = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null

    if (adminToken) {
      setProfileType("admin")
      fetch("http://localhost:5000/api/admin/profile", {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.admin) {
            setProfile({
              avatar: data.data.admin.avatar || "/placeholder-user.jpg",
              name: data.data.admin.firstName + " " + data.data.admin.lastName,
              email: data.data.admin.email
            })
          }
        })
        .catch(() => setProfile(null))
    } else if (userToken) {
      setProfileType("user")
      fetch("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${userToken}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.user) {
            setProfile({
              avatar: data.data.user.avatar || "/placeholder-user.jpg",
              name: data.data.user.firstName + " " + data.data.user.lastName,
              email: data.data.user.email
            })
          }
        })
        .catch(() => setProfile(null))
    } else {
      setProfileType(null)
      setProfile(null)
    }
  }, [])

  // Admin button navigation protection
  const handleAdminNavigate = (e: React.MouseEvent) => {
    e.preventDefault()
    const adminToken = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null
    if (adminToken) {
      router.push("/admin")
    } else {
      router.push("/admin/login")
    }
  }

  // Sign out handler
  const handleSignOut = () => {
    if (profileType === "admin") {
      localStorage.removeItem("admin_token")
    }
    if (profileType === "user") {
      localStorage.removeItem("token")
    }
    setProfileType(null)
    setProfile(null)
    router.push("/")
    router.refresh?.()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold-400/20 bg-black-900/95 backdrop-blur supports-[backdrop-filter]:bg-black-900/80">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Trophy className="h-10 w-10 text-gold-400 group-hover:text-gold-300 transition-colors" />
              <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-lg group-hover:bg-gold-400/30 transition-all"></div>
            </div>
            <div>
              <span className="font-bold text-2xl text-white font-playfair">Football Hub</span>
              <div className="text-xs text-gold-400 font-medium">PREMIUM</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-sm font-medium transition-all hover:text-gold-400 text-gray-300 hover:scale-105"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Admin Button for guests */}
            {!profileType && (
              <Button
                variant="outline"
                className="flex items-center text-gold-400 border-gold-400 hover:border-gold-300 hover:text-gold-300 font-bold"
                onClick={handleAdminNavigate}
              >
                <Shield className="h-5 w-5 mr-2" />
                Admin
              </Button>
            )}

            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden sm:flex hover:bg-gold-400/10 hover:text-gold-400"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hover:bg-gold-400/10 hover:text-gold-400 relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </Button>

            {/* User/Admin Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gold-400/10 hover:text-gold-400 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar || "/placeholder-user.jpg"} alt={profile?.name || "Profile"} />
                    <AvatarFallback className="bg-gray-800 text-gold-400 font-bold">
                      {(profile?.name ? profile.name.charAt(0) : <User className="h-5 w-5" />)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black-800 border-gold-400/20 min-w-[150px]">
                {/* User dropdown */}
                {profileType === "user" && (
                  <>
                    <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                      <Link href="/profile" className="text-gold-400">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                      <Link href="/settings" className="text-gold-400 flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="hover:bg-gold-400/10 cursor-pointer text-gold-400">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </>
                )}
                {/* Admin dropdown */}
                {profileType === "admin" && (
                  <>
                    <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                      <Link href="/admin" className="text-gold-400">
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                      <Link href="/admin/profile" className="text-gold-400">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="hover:bg-gold-400/10 cursor-pointer text-gold-400">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </>
                )}
                {/* No profile (guest) */}
                {!profileType && (
                  <>
                    <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                      <Link href="/login" className="text-gold-400">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                      <Link href="/signup" className="text-gold-400">
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-gold-400/10 hover:text-gold-400">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black-900 border-gold-400/20">
                <div className="flex flex-col space-y-6 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 text-lg font-medium text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      <item.icon className="h-6 w-6" />
                      <span>{item.name}</span>
                    </Link>
                  ))}

                  <div className="border-t border-gold-400/20 pt-6">
                    {/* Admin button for mobile */}
                    {!profileType && (
                      <button
                        onClick={handleAdminNavigate}
                        className="flex items-center mb-4 text-lg font-medium text-gold-400 hover:text-gold-300 w-full"
                      >
                        <Shield className="h-6 w-6 mr-2" />
                        Admin
                      </button>
                    )}
                    {/* Mobile dropdown: show all options for both user/admin */}
                    {profileType === "admin" && (
                      <>
                        <Link href="/admin" className="block text-lg font-medium text-gold-400 hover:text-gold-300 mb-4">
                          Admin Dashboard
                        </Link>
                        <Link href="/admin/profile" className="block text-lg font-medium text-gold-400 hover:text-gold-300 mb-4">
                          Profile
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block text-lg font-medium text-gold-400 hover:text-gold-300 mb-4 text-left w-full"
                        >
                          <LogOut className="inline-block mr-2 h-5 w-5" />
                          Sign out
                        </button>
                      </>
                    )}
                    {profileType === "user" && (
                      <>
                        <Link href="/profile" className="block text-lg font-medium text-gold-400 hover:text-gold-300 mb-4">
                          Profile
                        </Link>
                        <Link href="/settings" className="block text-lg font-medium text-gold-400 hover:text-gold-300 mb-4 flex items-center">
                          <Settings className="mr-2 h-5 w-5" />
                          Settings
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block text-lg font-medium text-gold-400 hover:text-gold-300 mb-4 text-left w-full"
                        >
                          <LogOut className="inline-block mr-2 h-5 w-5" />
                          Sign out
                        </button>
                      </>
                    )}
                    {!profileType && (
                      <>
                        <Link href="/login" className="block text-lg font-medium text-gold-400 hover:text-gold-300 mb-4">
                          Login
                        </Link>
                        <Link href="/signup" className="block text-lg font-medium text-gold-400 hover:text-gold-300 mb-4">
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gold-400" />
              <Input
                placeholder="Search matches, teams, players, or news..."
                className="pl-10 bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}