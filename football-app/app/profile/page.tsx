"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Trophy, User, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      if (!token) {
        toast({
          title: "Not Authenticated",
          description: "Please log in to view your profile.",
          variant: "destructive",
        })
        router.push("/login")
        return
      }
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        if (!res.ok) {
          toast({
            title: "Profile Error",
            description: data.message || "Unable to retrieve profile.",
            variant: "destructive",
          })
          router.push("/login")
          return
        }
        setUser(data.data.user)
      } catch (error) {
        toast({
          title: "Profile Error",
          description: "Unable to retrieve profile. Please try again.",
          variant: "destructive",
        })
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="min-h-screen bg-black text-yellow-400">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-gold mb-6">
              <Trophy className="h-10 w-10 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-gray-400">Welcome to your Football Hub account</p>
          </div>
          <Card className="card-black-gold">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-white">Profile Information</CardTitle>
              <CardDescription className="text-center text-gray-400">
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                  <span className="ml-4 text-lg text-yellow-400">Loading profile...</span>
                </div>
              ) : user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-yellow-400 w-16 h-16 flex items-center justify-center">
                      <User className="h-8 w-8 text-black" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {user.firstName} {user.lastName}
                      </h2>
                      <p className="text-gray-400">{user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-yellow-400" />
                      <span className="text-white">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-yellow-400" />
                      <span className="text-white">{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-yellow-400" />
                      <span className="text-white">{user.followedStates && user.followedStates.length > 0 ? user.followedStates[0] : "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                      <span className="text-white">{user.followedTeams && user.followedTeams.length > 0 ? user.followedTeams[0].name || user.followedTeams[0] : "N/A"}</span>
                    </div>
                  </div>
                  {/* Followed Teams List */}
                  {user.followedTeams && user.followedTeams.length > 0 && (
                    <div>
                      <h3 className="text-lg text-yellow-400 mt-4 mb-2">Followed Teams</h3>
                      <ul className="space-y-2">
                        {user.followedTeams.map((team: any, i: number) => (
                          <li key={i} className="flex items-center gap-2">
                            {team.logo && (
                              <img src={team.logo} alt={team.name} className="w-6 h-6 rounded-full mr-2" />
                            )}
                            <span className="text-white font-medium">{team.name || team}</span>
                            {team.state && (
                              <span className="ml-2 text-gray-400 text-xs">{team.state}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Preferences */}
                  <div className="mt-6">
                    <h3 className="text-lg text-yellow-400 mb-2">Preferences</h3>
                    <ul className="space-y-1">
                      <li>
                        Dark Mode:{" "}
                        <span className="text-white">{user.preferences?.darkMode ? "Enabled" : "Disabled"}</span>
                      </li>
                      <li>
                        Match Notifications:{" "}
                        <span className="text-white">{user.preferences?.notifications?.matchUpdates ? "On" : "Off"}</span>
                      </li>
                      <li>
                        News Notifications:{" "}
                        <span className="text-white">{user.preferences?.notifications?.newsUpdates ? "On" : "Off"}</span>
                      </li>
                      <li>
                        Team Notifications:{" "}
                        <span className="text-white">{user.preferences?.notifications?.teamUpdates ? "On" : "Off"}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6 text-center">
                    <Button className="btn-gold" onClick={() => router.push("/edit-profile")}>
                      Edit Profile
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-400">No profile data available.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}