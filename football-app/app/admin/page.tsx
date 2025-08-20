"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Newspaper, TrendingUp, Calendar, MapPin, Bell, Activity } from "lucide-react"
import axios from "@/utils/axios"

interface Match {
  _id: string
  homeTeam: string
  awayTeam: string
  state: string
  competition: string
  status: "live" | "upcoming" | "finished"
  score?: string
  time?: string
}

interface NewsArticle {
  _id: string
  title: string
  author: string
  date: string
  status: "published" | "draft"
}

export default function AdminDashboard() {
  // dummy stats for now
  const stats = [
    {
      title: "Total Matches",
      value: "1,234",
      change: "+12%",
      icon: Trophy,
      color: "text-blue-600",
    },
    {
      title: "Active Teams",
      value: "456",
      change: "+5%",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "News Articles",
      value: "789",
      change: "+18%",
      icon: Newspaper,
      color: "text-purple-600",
    },
    {
      title: "Total Users",
      value: "12,345",
      change: "+23%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const [recentMatches, setRecentMatches] = useState<Match[]>([])
  const [recentNews, setRecentNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError("")
      try {
        // Fetch any live match (or fallback to any match)
        let matches: Match[] = []
        try {
          const matchRes = await axios.get("/matches", { params: { status: "live", limit: 1 } })
          matches = matchRes.data.length ? matchRes.data : []
        } catch {
          const fallbackRes = await axios.get("/matches", { params: { limit: 1 } })
          matches = fallbackRes.data
        }

        // Fetch any recent news article (published or any)
        const newsRes = await axios.get("/news", { params: { limit: 1, sort: "-date" } })
        const news = newsRes.data.length ? newsRes.data : []

        setRecentMatches(matches)
        setRecentNews(
          news.map((n: any) => ({
            _id: n._id,
            title: n.title,
            author: n.author,
            date: n.date?.slice(0, 10),
            status: n.status || "published",
          }))
        )
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch data.")
        } else {
          setError("An unknown error occurred.")
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your football platform.</p>
      </div>

      {error && <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>}
      {loading && <div className="text-center py-8 text-xl">Loading...</div>}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Matches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Recent Match
            </CardTitle>
            <CardDescription>Latest match update (showing any live match or any match)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMatches.length === 0 && <div className="text-gray-400 text-center">No match found.</div>}
              {recentMatches.map((match) => (
                <div key={match._id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant={match.status === "live" ? "destructive" : "secondary"}>
                      {match.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                      {match.state}
                    </Badge>
                    <div>
                      <div className="font-medium">
                        {match.homeTeam} vs {match.awayTeam}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {match.competition}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{match.score || match.time || "-"}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Matches
            </Button>
          </CardContent>
        </Card>

        {/* Recent News */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Newspaper className="h-5 w-5 mr-2" />
              Recent News
            </CardTitle>
            <CardDescription>Latest news article (showing any news)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNews.length === 0 && <div className="text-gray-400 text-center">No news article found.</div>}
              {recentNews.map((article) => (
                <div key={article._id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium line-clamp-1">{article.title}</div>
                    <div className="text-sm text-muted-foreground">
                      By {article.author} • {article.date}
                    </div>
                  </div>
                  <Badge variant={article.status === "published" ? "default" : "secondary"}>{article.status}</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All News
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="flex flex-col h-20 bg-transparent">
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-xs">Create Match</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20 bg-transparent">
              <Users className="h-5 w-5 mb-1" />
              <span className="text-xs">Add Team</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20 bg-transparent">
              <Newspaper className="h-5 w-5 mb-1" />
              <span className="text-xs">Write News</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20 bg-transparent">
              <Bell className="h-5 w-5 mb-1" />
              <span className="text-xs">Send Notification</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20 bg-transparent">
              <MapPin className="h-5 w-5 mb-1" />
              <span className="text-xs">Manage States</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20 bg-transparent">
              <Activity className="h-5 w-5 mb-1" />
              <span className="text-xs">Live Updates</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}