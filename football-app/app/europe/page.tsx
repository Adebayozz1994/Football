"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Clock, Calendar, Users, Target } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function EuropePage() {
  const [selectedLeague, setSelectedLeague] = useState("premier-league")

  const leagues = [
    {
      id: "premier-league",
      name: "Premier League",
      country: "England",
      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      color: "from-purple-600 to-pink-600",
    },
    { id: "la-liga", name: "La Liga", country: "Spain", flag: "🇪🇸", color: "from-red-600 to-yellow-600" },
    { id: "serie-a", name: "Serie A", country: "Italy", flag: "🇮🇹", color: "from-green-600 to-red-600" },
    { id: "bundesliga", name: "Bundesliga", country: "Germany", flag: "🇩🇪", color: "from-red-600 to-yellow-500" },
    { id: "ligue-1", name: "Ligue 1", country: "France", flag: "🇫🇷", color: "from-blue-600 to-red-600" },
  ]

  const liveMatches = [
    {
      id: 1,
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      homeScore: 2,
      awayScore: 1,
      minute: 78,
      league: "Premier League",
      status: "live",
      stadium: "Etihad Stadium",
    },
    {
      id: 2,
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      homeScore: 1,
      awayScore: 1,
      minute: 65,
      league: "La Liga",
      status: "live",
      stadium: "Camp Nou",
    },
  ]

  const upcomingMatches = [
    {
      id: 3,
      homeTeam: "Chelsea",
      awayTeam: "Arsenal",
      date: "2024-01-16",
      time: "17:30",
      league: "Premier League",
      status: "upcoming",
      stadium: "Stamford Bridge",
    },
    {
      id: 4,
      homeTeam: "Juventus",
      awayTeam: "AC Milan",
      date: "2024-01-16",
      time: "20:45",
      league: "Serie A",
      status: "upcoming",
      stadium: "Allianz Stadium",
    },
  ]

  const standings = [
    { position: 1, team: "Manchester City", played: 20, points: 50, wins: 16, draws: 2, losses: 2, gf: 52, ga: 18 },
    { position: 2, team: "Liverpool", played: 20, points: 45, wins: 14, draws: 3, losses: 3, gf: 48, ga: 22 },
    { position: 3, team: "Arsenal", played: 20, points: 43, wins: 13, draws: 4, losses: 3, gf: 42, ga: 25 },
    { position: 4, team: "Chelsea", played: 20, points: 38, wins: 11, draws: 5, losses: 4, gf: 35, ga: 28 },
    { position: 5, team: "Newcastle", played: 20, points: 35, wins: 10, draws: 5, losses: 5, gf: 38, ga: 30 },
  ]

  const topScorers = [
    { name: "Erling Haaland", team: "Manchester City", goals: 18, assists: 3, matches: 20 },
    { name: "Mohamed Salah", team: "Liverpool", goals: 15, assists: 8, matches: 19 },
    { name: "Harry Kane", team: "Tottenham", goals: 14, assists: 2, matches: 20 },
    { name: "Marcus Rashford", team: "Manchester United", goals: 12, assists: 4, matches: 18 },
    { name: "Adebayo Galaxy", team: "Liverpool", goals: 11, assists: 3, matches: 17 },

  ]

  const MatchCard = ({ match }: { match: any }) => (
    <Card className="card-black-gold hover:scale-105 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge
            variant={match.status === "live" ? "destructive" : "secondary"}
            className={
              match.status === "live" ? "animate-pulse-gold bg-red-500 text-white" : "bg-gold-400 text-black-900"
            }
          >
            {match.status === "live" ? (
              <div className="flex items-center">
                <div className="live-indicator w-2 h-2 mr-2"></div>
                LIVE {match.minute}'
              </div>
            ) : (
              "UPCOMING"
            )}
          </Badge>
          <span className="text-sm text-gold-400 font-medium">{match.league}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-gold rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-black-900" />
              </div>
              <div className="font-semibold text-white">{match.homeTeam}</div>
              <div className="text-xs text-gray-400 mt-1">HOME</div>
            </div>
            <div className="text-center mx-4">
              <div className="text-4xl font-bold text-gold-400 mb-2">
                {match.status === "live" ? `${match.homeScore}-${match.awayScore}` : "VS"}
              </div>
              {match.status === "live" && <div className="text-xs text-red-400 animate-pulse">LIVE</div>}
            </div>
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-gold rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-black-900" />
              </div>
              <div className="font-semibold text-white">{match.awayTeam}</div>
              <div className="text-xs text-gray-400 mt-1">AWAY</div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mb-4">
          <div className="font-medium text-gold-400">{match.stadium}</div>
          {match.status === "upcoming" && (
            <div className="flex items-center justify-center mt-2">
              <Calendar className="h-4 w-4 mr-1" />
              {match.date} at {match.time}
            </div>
          )}
        </div>

        <Button className="w-full btn-gold">{match.status === "live" ? "Watch Live" : "Set Reminder"}</Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-black">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white font-playfair">
            <span className="text-gradient-gold">European</span> Football
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Live scores, standings, statistics, and breaking news from Europe's top football leagues
          </p>
        </div>

        {/* League Selector */}
        <div className="mb-12">
          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {leagues.map((league) => (
                  <Button
                    key={league.id}
                    variant={selectedLeague === league.id ? "default" : "outline"}
                    className={`h-20 flex flex-col items-center justify-center ${
                      selectedLeague === league.id ? "btn-gold" : "btn-black"
                    }`}
                    onClick={() => setSelectedLeague(league.id)}
                  >
                    <div className="text-2xl mb-1">{league.flag}</div>
                    <div className="text-xs font-medium">{league.name}</div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="matches" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-black-800 border border-gold-400/20">
            <TabsTrigger value="matches" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
              Matches
            </TabsTrigger>
            <TabsTrigger
              value="standings"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900"
            >
              Standings
            </TabsTrigger>
            <TabsTrigger value="scorers" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
              Top Scorers
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
              News
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-8">
            {/* Live Matches */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white flex items-center font-playfair">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                Live Matches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>

            {/* Upcoming Matches */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white flex items-center font-playfair">
                <Clock className="h-6 w-6 mr-3 text-gold-400" />
                Upcoming Matches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="standings">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-2xl">
                  <Trophy className="h-6 w-6 mr-3 text-gold-400" />
                  Premier League Table 2023/24
                </CardTitle>
                <CardDescription className="text-gray-400">Current standings and team statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gold-400/20">
                        <th className="text-left py-3 text-gold-400">Pos</th>
                        <th className="text-left py-3 text-gold-400">Team</th>
                        <th className="text-center py-3 text-gold-400">P</th>
                        <th className="text-center py-3 text-gold-400">W</th>
                        <th className="text-center py-3 text-gold-400">D</th>
                        <th className="text-center py-3 text-gold-400">L</th>
                        <th className="text-center py-3 text-gold-400">GF</th>
                        <th className="text-center py-3 text-gold-400">GA</th>
                        <th className="text-center py-3 text-gold-400">GD</th>
                        <th className="text-center py-3 text-gold-400">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((team) => (
                        <tr
                          key={team.position}
                          className="border-b border-gold-400/10 hover:bg-gold-400/5 transition-colors"
                        >
                          <td className="py-4">
                            <Badge
                              variant={team.position <= 4 ? "default" : "secondary"}
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                team.position === 1
                                  ? "bg-gold-400 text-black-900"
                                  : team.position <= 4
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-600 text-white"
                              }`}
                            >
                              {team.position}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
                                <Trophy className="h-4 w-4 text-black-900" />
                              </div>
                              <span className="font-medium text-white">{team.team}</span>
                            </div>
                          </td>
                          <td className="text-center py-4 text-gray-400">{team.played}</td>
                          <td className="text-center py-4 text-green-400">{team.wins}</td>
                          <td className="text-center py-4 text-yellow-400">{team.draws}</td>
                          <td className="text-center py-4 text-red-400">{team.losses}</td>
                          <td className="text-center py-4 text-gray-400">{team.gf}</td>
                          <td className="text-center py-4 text-gray-400">{team.ga}</td>
                          <td className="text-center py-4 text-gray-400">+{team.gf - team.ga}</td>
                          <td className="text-center py-4">
                            <span className="font-bold text-gold-400 text-lg">{team.points}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scorers">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-2xl">
                  <Target className="h-6 w-6 mr-3 text-gold-400" />
                  Top Scorers
                </CardTitle>
                <CardDescription className="text-gray-400">Leading goal scorers in the Premier League</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topScorers.map((player, index) => (
                    <div
                      key={player.name}
                      className="flex items-center justify-between p-4 border border-gold-400/20 rounded-lg hover:border-gold-400/40 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={index === 0 ? "default" : "secondary"}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index === 0 ? "bg-gold-400 text-black-900" : "bg-gray-600 text-white"
                          }`}
                        >
                          {index + 1}
                        </Badge>
                        <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-black-900" />
                        </div>
                        <div>
                          <div className="font-medium text-white text-lg">{player.name}</div>
                          <div className="text-sm text-gray-400">{player.team}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gold-400 text-2xl">{player.goals}</div>
                        <div className="text-sm text-gray-400">{player.assists} assists</div>
                        <div className="text-xs text-gray-500">{player.matches} matches</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="card-black-gold hover:scale-105 transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={`/placeholder.svg?height=200&width=400&text=European News ${i}`}
                      alt="European Football News"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black-900/80 to-transparent"></div>
                  </div>
                  <CardHeader>
                    <Badge variant="outline" className="w-fit border-gold-400/30 text-gold-400">
                      {i % 2 === 0 ? "Transfer News" : "Match Report"}
                    </Badge>
                    <CardTitle className="line-clamp-2 text-white hover:text-gold-400 transition-colors">
                      {i === 1 && "Manchester City Completes Record-Breaking Signing"}
                      {i === 2 && "Liverpool vs Arsenal: Classic Encounter Ends in Thriller"}
                      {i === 3 && "Barcelona's New Formation Proves Successful"}
                      {i === 4 && "Real Madrid Eyes Summer Transfer Window"}
                      {i === 5 && "Premier League Title Race Heats Up"}
                      {i === 6 && "Champions League Quarter-Finals Preview"}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-gray-300">
                      Latest developments from Europe's top football leagues with comprehensive analysis and expert
                      insights...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full btn-gold">Read More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
