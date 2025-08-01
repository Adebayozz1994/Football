"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Trophy, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("all")

  const teams = [
    {
      id: 1,
      name: "Lagos United",
      state: "Lagos",
      founded: 1995,
      stadium: "Teslim Balogun Stadium",
      capacity: 24000,
      logo: "/placeholder.svg?height=100&width=100",
      players: 25,
      wins: 15,
      draws: 3,
      losses: 2,
      points: 48,
      position: 1,
      goalsFor: 42,
      goalsAgainst: 18,
      form: ["W", "W", "D", "W", "W"],
      manager: "John Obuh",
      founded_year: 1995,
      colors: ["Blue", "White"],
      nickname: "The Lions",
    },
    {
      id: 2,
      name: "Kano Pillars",
      state: "Kano",
      founded: 1990,
      stadium: "Sani Abacha Stadium",
      capacity: 18000,
      logo: "/placeholder.svg?height=100&width=100",
      players: 28,
      wins: 12,
      draws: 5,
      losses: 3,
      points: 41,
      position: 2,
      goalsFor: 35,
      goalsAgainst: 22,
      form: ["W", "D", "W", "L", "W"],
      manager: "Ibrahim Musa",
      founded_year: 1990,
      colors: ["Red", "White"],
      nickname: "Sai Masu Gida",
    },
    {
      id: 3,
      name: "Rivers United",
      state: "Rivers",
      founded: 2016,
      stadium: "Adokiye Amiesimaka Stadium",
      capacity: 38000,
      logo: "/placeholder.svg?height=100&width=100",
      players: 26,
      wins: 11,
      draws: 5,
      losses: 4,
      points: 38,
      position: 3,
      goalsFor: 33,
      goalsAgainst: 25,
      form: ["D", "W", "W", "D", "L"],
      manager: "Stanley Eguma",
      founded_year: 2016,
      colors: ["Blue", "Yellow"],
      nickname: "The Pride of Rivers",
    },
    {
      id: 4,
      name: "Enyimba FC",
      state: "Abia",
      founded: 1976,
      stadium: "Enyimba International Stadium",
      capacity: 25000,
      logo: "/placeholder.svg?height=100&width=100",
      players: 27,
      wins: 10,
      draws: 6,
      losses: 4,
      points: 36,
      position: 4,
      goalsFor: 28,
      goalsAgainst: 20,
      form: ["W", "D", "D", "W", "L"],
      manager: "Finidi George",
      founded_year: 1976,
      colors: ["Blue", "White"],
      nickname: "The People's Elephant",
    },
  ]

  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ]

  const TeamCard = ({ team }: { team: any }) => (
    <Card className="card-black-gold hover:scale-105 transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={team.logo || "/placeholder.svg"}
              alt={`${team.name} logo`}
              className="w-20 h-20 rounded-full object-cover border-2 border-gold-400/30 group-hover:border-gold-400 transition-colors"
            />
            <Badge variant="outline" className="absolute -top-2 -right-2 bg-gold-400 text-black-900 border-gold-400">
              #{team.position}
            </Badge>
          </div>
          <div className="flex-1">
            <CardTitle className="text-white group-hover:text-gold-400 transition-colors text-xl">
              {team.name}
            </CardTitle>
            <CardDescription className="flex items-center text-gold-400">
              <MapPin className="h-4 w-4 mr-1" />
              {team.state} State
            </CardDescription>
            <div className="text-sm text-gray-400 mt-1">"{team.nickname}"</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Team Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Founded:</span>
                <span className="font-medium text-white">{team.founded_year}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Players:</span>
                <span className="font-medium text-white">{team.players}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Manager:</span>
                <span className="font-medium text-white text-xs">{team.manager}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Points:</span>
                <span className="font-bold text-gold-400 text-lg">{team.points}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Goals:</span>
                <span className="font-medium text-green-400">
                  {team.goalsFor}:{team.goalsAgainst}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">W-D-L:</span>
                <span className="font-medium text-white text-xs">
                  {team.wins}-{team.draws}-{team.losses}
                </span>
              </div>
            </div>
          </div>

          {/* Stadium Info */}
          <div className="bg-black-900/50 rounded-lg p-4 border border-gold-400/10">
            <div className="text-sm text-gray-400 mb-1">Home Stadium</div>
            <div className="font-medium text-white">{team.stadium}</div>
            <div className="text-xs text-gold-400">Capacity: {team.capacity.toLocaleString()}</div>
          </div>

          {/* Form */}
          <div>
            <div className="text-sm text-gray-400 mb-2">Recent Form</div>
            <div className="flex space-x-2">
              {team.form.map((result: string, index: number) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
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
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-gold-400/20">
            <Button className="flex-1 btn-gold">View Team</Button>
            <Button variant="outline" className="btn-black bg-transparent">
              <Star className="h-4 w-4" />
            </Button>
          </div>
        </div>
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
            <span className="text-gradient-gold">Football</span> Teams
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore teams from all Nigerian states with comprehensive statistics, squad information, and performance
            analytics
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gold-400" />
                  <Input
                    placeholder="Search teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                  />
                </div>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-full md:w-48 bg-black-800 border-gold-400/30 text-white">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="bg-black-800 border-gold-400/20">
                    <SelectItem value="all" className="text-gold-400">
                      All States
                    </SelectItem>
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase()} className="text-gold-400">
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="teams" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-black-800 border border-gold-400/20">
            <TabsTrigger value="teams" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
              All Teams
            </TabsTrigger>
            <TabsTrigger
              value="standings"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900"
            >
              League Table
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teams">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="standings">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-2xl">
                  <Trophy className="h-6 w-6 mr-3 text-gold-400" />
                  NPFL League Standings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Current positions in the Nigerian Professional Football League 2024 season
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teams
                    .sort((a, b) => a.position - b.position)
                    .map((team, index) => (
                      <div
                        key={team.id}
                        className="flex items-center justify-between p-4 border border-gold-400/20 rounded-lg hover:border-gold-400/40 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Badge
                            variant={team.position <= 3 ? "default" : "secondary"}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              team.position === 1
                                ? "bg-gold-400 text-black-900"
                                : team.position === 2
                                  ? "bg-gray-400 text-black-900"
                                  : team.position === 3
                                    ? "bg-amber-600 text-white"
                                    : "bg-gray-600 text-white"
                            }`}
                          >
                            {team.position}
                          </Badge>
                          <img
                            src={team.logo || "/placeholder.svg"}
                            alt={`${team.name} logo`}
                            className="w-10 h-10 rounded-full border border-gold-400/30"
                          />
                          <div>
                            <div className="font-medium text-white">{team.name}</div>
                            <div className="text-sm text-gray-400">{team.state}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gold-400 text-lg">{team.points} pts</div>
                          <div className="text-sm text-gray-400">
                            {team.wins}W {team.draws}D {team.losses}L
                          </div>
                          <div className="text-xs text-green-400">GD: +{team.goalsFor - team.goalsAgainst}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button size="lg" className="btn-black px-12">
            Load More Teams
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
