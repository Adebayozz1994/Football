"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Clock,
  MoreHorizontal,
  Trophy,
  Users,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function AdminMatchesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedState, setSelectedState] = useState("all")

  const matches = [
    {
      id: 1,
      homeTeam: "Lagos United",
      awayTeam: "Kano Pillars",
      homeScore: 2,
      awayScore: 1,
      state: "Lagos",
      date: "2024-01-15",
      time: "16:00",
      status: "finished",
      venue: "Teslim Balogun Stadium",
      attendance: 24000,
      referee: "John Adebayo",
      createdBy: "Admin User",
      lastUpdated: "2024-01-15 18:30",
    },
    {
      id: 2,
      homeTeam: "Rivers United",
      awayTeam: "Plateau United",
      homeScore: 1,
      awayScore: 1,
      state: "Rivers",
      date: "2024-01-15",
      time: "18:00",
      status: "live",
      venue: "Adokiye Amiesimaka Stadium",
      minute: 67,
      attendance: 18500,
      referee: "Mary Okafor",
      createdBy: "Match Admin",
      lastUpdated: "2024-01-15 19:07",
    },
    {
      id: 3,
      homeTeam: "Enyimba FC",
      awayTeam: "Heartland FC",
      state: "Abia",
      date: "2024-01-16",
      time: "16:00",
      status: "upcoming",
      venue: "Enyimba International Stadium",
      referee: "David Okonkwo",
      createdBy: "Admin User",
      lastUpdated: "2024-01-14 10:15",
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

  const liveMatches = matches.filter((match) => match.status === "live")
  const upcomingMatches = matches.filter((match) => match.status === "upcoming")
  const finishedMatches = matches.filter((match) => match.status === "finished")

  const MatchCard = ({ match }: { match: any }) => (
    <Card className="card-black-gold">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge
            variant={match.status === "live" ? "destructive" : match.status === "upcoming" ? "secondary" : "outline"}
            className={
              match.status === "live"
                ? "animate-pulse-gold bg-red-500 text-white"
                : match.status === "upcoming"
                  ? "bg-gold-400 text-black-900"
                  : "bg-green-600 text-white"
            }
          >
            {match.status === "live" ? (
              <div className="flex items-center">
                <div className="live-indicator w-2 h-2 mr-2"></div>
                LIVE {match.minute}'
              </div>
            ) : match.status === "upcoming" ? (
              "UPCOMING"
            ) : (
              "FINISHED"
            )}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-gold-400/10">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black-800 border-gold-400/20">
              <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                <Link href={`/admin/matches/${match.id}`} className="flex items-center text-gold-400">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                <Link href={`/admin/matches/${match.id}/edit`} className="flex items-center text-gold-400">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Match
                </Link>
              </DropdownMenuItem>
              {match.status === "live" && (
                <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                  <Link href={`/admin/matches/${match.id}/live`} className="flex items-center text-gold-400">
                    <Activity className="h-4 w-4 mr-2" />
                    Live Updates
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="hover:bg-red-500/10 text-red-400">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Match
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-gold rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-black-900" />
              </div>
              <div className="font-semibold text-white text-sm">{match.homeTeam}</div>
              <div className="text-xs text-gray-400">HOME</div>
            </div>
            <div className="text-center mx-4">
              <div className="text-3xl font-bold text-gold-400 mb-1">
                {match.status === "finished" || match.status === "live"
                  ? `${match.homeScore}-${match.awayScore}`
                  : "VS"}
              </div>
              {match.status === "live" && <div className="text-xs text-red-400 animate-pulse">LIVE</div>}
            </div>
            <div className="text-center flex-1">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-gold rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-black-900" />
              </div>
              <div className="font-semibold text-white text-sm">{match.awayTeam}</div>
              <div className="text-xs text-gray-400">AWAY</div>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs text-gray-400 mb-4">
          <div className="flex items-center justify-center">
            <Calendar className="h-3 w-3 mr-1" />
            {match.date} at {match.time}
          </div>
          <div className="flex items-center justify-center">
            <MapPin className="h-3 w-3 mr-1" />
            {match.venue}, {match.state}
          </div>
          <div className="text-center">Referee: {match.referee}</div>
          {match.attendance && (
            <div className="flex items-center justify-center">
              <Users className="h-3 w-3 mr-1" />
              {match.attendance.toLocaleString()} attendance
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 border-t border-gold-400/20 pt-3">
          <div>Created by: {match.createdBy}</div>
          <div>Last updated: {match.lastUpdated}</div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Match Management</h1>
          <p className="text-gray-400">Manage all football matches across Nigerian states</p>
        </div>
        <Button className="btn-gold" asChild>
          <Link href="/admin/matches/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Match
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-black-gold">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Activity className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Live Matches</p>
                <p className="text-2xl font-bold text-white">{liveMatches.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-black-gold">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gold-400/20 rounded-lg">
                <Clock className="h-6 w-6 text-gold-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Upcoming</p>
                <p className="text-2xl font-bold text-white">{upcomingMatches.length}</p>
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
                <p className="text-sm font-medium text-gray-400">Finished</p>
                <p className="text-2xl font-bold text-white">{finishedMatches.length}</p>
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
                <p className="text-sm font-medium text-gray-400">Total Matches</p>
                <p className="text-2xl font-bold text-white">{matches.length}</p>
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
                placeholder="Search matches, teams, or venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-48 bg-black-800 border-gold-400/30 text-white">
                <SelectValue placeholder="Match Status" />
              </SelectTrigger>
              <SelectContent className="bg-black-800 border-gold-400/20">
                <SelectItem value="all" className="text-gold-400">
                  All Status
                </SelectItem>
                <SelectItem value="live" className="text-gold-400">
                  Live
                </SelectItem>
                <SelectItem value="upcoming" className="text-gold-400">
                  Upcoming
                </SelectItem>
                <SelectItem value="finished" className="text-gold-400">
                  Finished
                </SelectItem>
              </SelectContent>
            </Select>
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
            <Button className="btn-gold">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Match Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-black-800 border border-gold-400/20">
          <TabsTrigger value="all" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
            All Matches ({matches.length})
          </TabsTrigger>
          <TabsTrigger value="live" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
            Live ({liveMatches.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
            Upcoming ({upcomingMatches.length})
          </TabsTrigger>
          <TabsTrigger value="finished" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
            Finished ({finishedMatches.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="finished">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {finishedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
