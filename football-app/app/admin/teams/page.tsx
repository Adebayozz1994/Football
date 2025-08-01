"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Plus, Edit, Trash2, Eye, MapPin, MoreHorizontal, Trophy, Users, Star } from "lucide-react"
import Link from "next/link"

export default function AdminTeamsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedDivision, setSelectedDivision] = useState("all")

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
      colors: ["Blue", "White"],
      nickname: "The Lions",
      division: "NPFL",
      status: "active",
      lastUpdated: "2024-01-14 15:30",
      createdBy: "Admin User",
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
      colors: ["Red", "White"],
      nickname: "Sai Masu Gida",
      division: "NPFL",
      status: "active",
      lastUpdated: "2024-01-13 10:15",
      createdBy: "Team Admin",
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
      colors: ["Blue", "Yellow"],
      nickname: "The Pride of Rivers",
      division: "NPFL",
      status: "active",
      lastUpdated: "2024-01-12 14:20",
      createdBy: "Admin User",
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
      colors: ["Blue", "White"],
      nickname: "The People's Elephant",
      division: "NPFL",
      status: "active",
      lastUpdated: "2024-01-11 16:45",
      createdBy: "Team Admin",
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

  const divisions = ["NPFL", "NNL", "NLO", "State League"]

  const activeTeams = teams.filter((team) => team.status === "active")
  const topPerformers = teams.filter((team) => team.position <= 5)

  const TeamCard = ({ team }: { team: any }) => (
    <Card className="card-black-gold hover:scale-105 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={team.logo || "/placeholder.svg"}
                alt={`${team.name} logo`}
                className="w-12 h-12 rounded-full object-cover border-2 border-gold-400/30"
              />
              <Badge
                variant="outline"
                className="absolute -top-2 -right-2 bg-gold-400 text-black-900 border-gold-400 text-xs"
              >
                #{team.position}
              </Badge>
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">{team.name}</h3>
              <p className="text-gold-400 text-sm">"{team.nickname}"</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-gold-400/10">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black-800 border-gold-400/20">
              <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                <Link href={`/admin/teams/${team.id}`} className="flex items-center text-gold-400">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                <Link href={`/admin/teams/${team.id}/edit`} className="flex items-center text-gold-400">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Team
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                <Link href={`/admin/teams/${team.id}/players`} className="flex items-center text-gold-400">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Players
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-red-500/10 text-red-400">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Team Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">State:</span>
                <span className="text-white flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {team.state}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Founded:</span>
                <span className="text-white">{team.founded}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Division:</span>
                <Badge variant="outline" className="border-gold-400/30 text-gold-400 text-xs">
                  {team.division}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Players:</span>
                <span className="text-white">{team.players}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Points:</span>
                <span className="font-bold text-gold-400">{team.points}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Manager:</span>
                <span className="text-white text-xs">{team.manager}</span>
              </div>
            </div>
          </div>

          {/* Stadium Info */}
          <div className="bg-black-900/50 rounded-lg p-3 border border-gold-400/10">
            <div className="text-xs text-gray-400 mb-1">Home Stadium</div>
            <div className="font-medium text-white text-sm">{team.stadium}</div>
            <div className="text-xs text-gold-400">Capacity: {team.capacity.toLocaleString()}</div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-green-600/20 rounded p-2">
              <div className="font-bold text-green-400">{team.wins}</div>
              <div className="text-gray-400">Wins</div>
            </div>
            <div className="bg-yellow-600/20 rounded p-2">
              <div className="font-bold text-yellow-400">{team.draws}</div>
              <div className="text-gray-400">Draws</div>
            </div>
            <div className="bg-red-600/20 rounded p-2">
              <div className="font-bold text-red-400">{team.losses}</div>
              <div className="text-gray-400">Losses</div>
            </div>
          </div>

          {/* Recent Form */}
          <div>
            <div className="text-xs text-gray-400 mb-2">Recent Form</div>
            <div className="flex space-x-1">
              {team.form.map((result: string, index: number) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
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

          {/* Admin Info */}
          <div className="text-xs text-gray-500 border-t border-gold-400/20 pt-3">
            <div>Created by: {team.createdBy}</div>
            <div>Last updated: {team.lastUpdated}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Management</h1>
          <p className="text-gray-400">Manage all football teams across Nigerian states</p>
        </div>
        <Button className="btn-gold" asChild>
          <Link href="/admin/teams/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-black-gold">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Teams</p>
                <p className="text-2xl font-bold text-white">{teams.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-black-gold">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Trophy className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Active Teams</p>
                <p className="text-2xl font-bold text-white">{activeTeams.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-black-gold">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gold-400/20 rounded-lg">
                <Star className="h-6 w-6 text-gold-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Top 5 Teams</p>
                <p className="text-2xl font-bold text-white">{topPerformers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-black-gold">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">States Covered</p>
                <p className="text-2xl font-bold text-white">{new Set(teams.map((t) => t.state)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-black-gold">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gold-400" />
              <Input
                placeholder="Search teams, managers, or stadiums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
              />
            </div>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full lg:w-48 bg-black-800 border-gold-400/30 text-white">
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
            <Select value={selectedDivision} onValueChange={setSelectedDivision}>
              <SelectTrigger className="w-full lg:w-48 bg-black-800 border-gold-400/30 text-white">
                <SelectValue placeholder="Select Division" />
              </SelectTrigger>
              <SelectContent className="bg-black-800 border-gold-400/20">
                <SelectItem value="all" className="text-gold-400">
                  All Divisions
                </SelectItem>
                {divisions.map((division) => (
                  <SelectItem key={division} value={division.toLowerCase()} className="text-gold-400">
                    {division}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="btn-gold">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-black-800 border border-gold-400/20">
          <TabsTrigger value="all" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
            All Teams ({teams.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
            Active ({activeTeams.length})
          </TabsTrigger>
          <TabsTrigger value="standings" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
            League Table
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTeams.map((team) => (
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
              <CardDescription className="text-gray-400">Current positions and team statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teams
                  .sort((a, b) => a.position - b.position)
                  .map((team) => (
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
    </div>
  )
}
