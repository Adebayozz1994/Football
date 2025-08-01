import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Newspaper, TrendingUp, Calendar, MapPin, Bell, Activity } from "lucide-react"

export default function AdminDashboard() {
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

  const recentMatches = [
    {
      id: 1,
      homeTeam: "Lagos United",
      awayTeam: "Kano Pillars",
      state: "Lagos",
      status: "live",
      score: "2-1",
    },
    {
      id: 2,
      homeTeam: "Rivers United",
      awayTeam: "Plateau United",
      state: "Rivers",
      status: "upcoming",
      time: "16:00",
    },
  ]

  const recentNews = [
    {
      id: 1,
      title: "Lagos United Signs New Striker",
      author: "Admin User",
      date: "2024-01-14",
      status: "published",
    },
    {
      id: 2,
      title: "European Roundup: Premier League Weekend",
      author: "News Admin",
      date: "2024-01-14",
      status: "draft",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your football platform.</p>
      </div>

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
              Recent Matches
            </CardTitle>
            <CardDescription>Latest match updates and live games</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMatches.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant={match.status === "live" ? "destructive" : "secondary"}>
                      {match.status === "live" ? "LIVE" : "UPCOMING"}
                    </Badge>
                    <div>
                      <div className="font-medium">
                        {match.homeTeam} vs {match.awayTeam}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {match.state}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{match.score || match.time}</div>
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
            <CardDescription>Latest news articles and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNews.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-3 border rounded-lg">
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
