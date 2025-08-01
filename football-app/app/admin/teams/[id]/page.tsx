"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Edit,
  Users,
  Trophy,
  MapPin,
  Calendar,
  Globe,
  Mail,
  Phone,
  Star,
  Target,
  Activity,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function TeamDetailsPage({ params }: { params: { id: string } }) {
  // Mock team data - in real app, fetch based on params.id
  const team = {
    id: 1,
    name: "Lagos United",
    nickname: "The Lions",
    state: "Lagos",
    city: "Lagos",
    founded: 1995,
    stadium: "Teslim Balogun Stadium",
    capacity: 24000,
    logo: "/placeholder.svg?height=150&width=150",
    manager: "John Obuh",
    division: "NPFL",
    colors: ["Blue", "White"],
    description:
      "Lagos United FC is one of Nigeria's premier football clubs, founded in 1995. Known for their attacking style of play and strong youth development program.",
    website: "https://lagosunited.com",
    email: "info@lagosunited.com",
    phone: "+234 801 234 5678",
    isActive: true,
    featured: true,
    // Statistics
    wins: 15,
    draws: 3,
    losses: 2,
    points: 48,
    position: 1,
    goalsFor: 42,
    goalsAgainst: 18,
    form: ["W", "W", "D", "W", "W"],
    // Players
    players: [
      { id: 1, name: "Ahmed Musa", position: "Forward", age: 28, goals: 12, assists: 5 },
      { id: 2, name: "Chukwu Emeka", position: "Midfielder", age: 25, goals: 8, assists: 10 },
      { id: 3, name: "Okafor Daniel", position: "Defender", age: 30, goals: 2, assists: 1 },
      { id: 4, name: "Ibrahim Yusuf", position: "Goalkeeper", age: 27, goals: 0, assists: 0 },
    ],
    // Recent matches
    recentMatches: [
      { id: 1, opponent: "Kano Pillars", result: "W", score: "2-1", date: "2024-01-15", home: true },
      { id: 2, opponent: "Rivers United", result: "W", score: "3-0", date: "2024-01-08", home: false },
      { id: 3, opponent: "Enyimba FC", result: "D", score: "1-1", date: "2024-01-01", home: true },
      { id: 4, opponent: "Heartland FC", result: "W", score: "2-0", date: "2023-12-28", home: false },
      { id: 5, opponent: "Plateau United", result: "W", score: "1-0", date: "2023-12-21", home: true },
    ],
    // Upcoming matches
    upcomingMatches: [
      { id: 6, opponent: "Shooting Stars", date: "2024-01-22", time: "16:00", home: true },
      { id: 7, opponent: "Lobi Stars", date: "2024-01-29", time: "18:00", home: false },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="btn-black bg-transparent" asChild>
            <Link href="/admin/teams">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Team Details</h1>
            <p className="text-gray-400">Complete team information and statistics</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="btn-gold" asChild>
            <Link href={`/admin/teams/${team.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Team
            </Link>
          </Button>
        </div>
      </div>

      {/* Team Header */}
      <Card className="card-black-gold">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img
                src={team.logo || "/placeholder.svg"}
                alt={`${team.name} logo`}
                className="w-32 h-32 rounded-full object-cover border-4 border-gold-400"
              />
              <Badge variant="outline" className="absolute -top-2 -right-2 bg-gold-400 text-black-900 border-gold-400">
                #{team.position}
              </Badge>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                <h2 className="text-4xl font-bold text-white">{team.name}</h2>
                {team.featured && <Star className="h-6 w-6 text-gold-400" />}
              </div>
              <p className="text-xl text-gold-400 mb-4">"{team.nickname}"</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center md:text-left">
                  <div className="text-gray-400">Founded</div>
                  <div className="text-white font-semibold">{team.founded}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-gray-400">Division</div>
                  <Badge variant="outline" className="border-gold-400/30 text-gold-400">
                    {team.division}
                  </Badge>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-gray-400">Location</div>
                  <div className="text-white font-semibold flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {team.city}, {team.state}
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-gray-400">Manager</div>
                  <div className="text-white font-semibold">{team.manager}</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400 mb-1">{team.points}</div>
              <div className="text-gray-400 text-sm">Points</div>
              <div className="text-white text-sm mt-2">
                {team.wins}W {team.draws}D {team.losses}L
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-black-gold">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Trophy className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">League Position</p>
                <p className="text-2xl font-bold text-white">#{team.position}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-black-gold">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Squad Size</p>
                <p className="text-2xl font-bold text-white">{team.players.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-black-gold">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gold-400/20 rounded-lg">
                <Target className="h-6 w-6 text-gold-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Goals Scored</p>
                <p className="text-2xl font-bold text-white">{team.goalsFor}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-black-gold">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Activity className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Goals Conceded</p>
                <p className="text-2xl font-bold text-white">{team.goalsAgainst}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-black-800 border border-gold-400/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
            Overview
          </TabsTrigger>
          <TabsTrigger value="players" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
            Players
          </TabsTrigger>
          <TabsTrigger value="matches" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
            Matches
          </TabsTrigger>
          <TabsTrigger value="stadium" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
            Stadium
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white">Team Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{team.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Team Colors:</span>
                    <div className="flex space-x-2">
                      {team.colors.map((color, index) => (
                        <Badge key={index} variant="outline" className="border-gold-400/30 text-gold-400">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge className={team.isActive ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                      {team.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white">Recent Form</CardTitle>
                <CardDescription className="text-gray-400">Last 5 matches performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-4">
                  {team.form.map((result, index) => (
                    <div
                      key={index}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        result === "W"
                          ? "bg-green-600 text-white"
                          : result === "D"
                            ? "bg-yellow-600 text-white"
                            : "bg-red-600 text-white"
                      }`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Rate:</span>
                    <span className="text-green-400 font-semibold">
                      {Math.round((team.wins / (team.wins + team.draws + team.losses)) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Goal Difference:</span>
                    <span className="text-gold-400 font-semibold">+{team.goalsFor - team.goalsAgainst}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Points per Game:</span>
                    <span className="text-white font-semibold">
                      {(team.points / (team.wins + team.draws + team.losses)).toFixed(1)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="players">
          <Card className="card-black-gold">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Squad Players</CardTitle>
                  <CardDescription className="text-gray-400">Current team roster and player statistics</CardDescription>
                </div>
                <Button className="btn-gold" asChild>
                  <Link href={`/admin/teams/${team.id}/players/add`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Player
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-4 border border-gold-400/20 rounded-lg hover:border-gold-400/40 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-black-900" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{player.name}</div>
                        <div className="text-sm text-gray-400">
                          {player.position} • Age {player.age}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{player.goals} goals</div>
                      <div className="text-sm text-gray-400">{player.assists} assists</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white">Recent Matches</CardTitle>
                <CardDescription className="text-gray-400">Latest match results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {team.recentMatches.map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center justify-between p-3 border border-gold-400/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            match.result === "W"
                              ? "bg-green-600 text-white"
                              : match.result === "D"
                                ? "bg-yellow-600 text-white"
                                : "bg-red-600 text-white"
                          }`}
                        >
                          {match.result}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {match.home ? "vs" : "@"} {match.opponent}
                          </div>
                          <div className="text-sm text-gray-400">{match.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gold-400">{match.score}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Matches</CardTitle>
                <CardDescription className="text-gray-400">Next scheduled fixtures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {team.upcomingMatches.map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center justify-between p-3 border border-gold-400/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gold-400/20 rounded-full flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-gold-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {match.home ? "vs" : "@"} {match.opponent}
                          </div>
                          <div className="text-sm text-gray-400">{match.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gold-400">{match.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stadium">
          <Card className="card-black-gold">
            <CardHeader>
              <CardTitle className="text-white">Stadium Information</CardTitle>
              <CardDescription className="text-gray-400">Home ground details and specifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Stadium Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name:</span>
                        <span className="text-white">{team.stadium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Capacity:</span>
                        <span className="text-white">{team.capacity.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white">
                          {team.city}, {team.state}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Surface:</span>
                        <span className="text-white">Natural Grass</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="aspect-video bg-black-900/50 rounded-lg border border-gold-400/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto text-gold-400 mb-2" />
                    <p className="text-gray-400">Stadium Image</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card className="card-black-gold">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
              <CardDescription className="text-gray-400">Team contact details and communication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Globe className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Website</div>
                      <a href={team.website} className="text-white hover:text-gold-400 transition-colors">
                        {team.website}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Mail className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Email</div>
                      <a href={`mailto:${team.email}`} className="text-white hover:text-gold-400 transition-colors">
                        {team.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gold-400/20 rounded-lg">
                      <Phone className="h-5 w-5 text-gold-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Phone</div>
                      <a href={`tel:${team.phone}`} className="text-white hover:text-gold-400 transition-colors">
                        {team.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button className="w-full btn-gold" asChild>
                      <a href={`mailto:${team.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full btn-black bg-transparent" asChild>
                      <a href={team.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full btn-black bg-transparent" asChild>
                      <a href={`tel:${team.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Team
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
