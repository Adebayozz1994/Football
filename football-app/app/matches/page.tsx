"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Search, Filter, Eye, Users, Trophy } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function MatchesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")

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
      events: [
        { type: "goal", player: "Ahmed Musa", team: "home", minute: 23 },
        { type: "goal", player: "Ibrahim Yusuf", team: "away", minute: 45 },
        { type: "goal", player: "Chukwu Emeka", team: "home", minute: 78 },
      ],
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
      ticketPrice: "₦2,000 - ₦10,000",
    },
    {
      id: 4,
      homeTeam: "Shooting Stars",
      awayTeam: "3SC Ibadan",
      homeScore: 0,
      awayScore: 2,
      state: "Oyo",
      date: "2024-01-14",
      time: "15:30",
      status: "finished",
      venue: "Lekan Salami Stadium",
      attendance: 15000,
      referee: "Samuel Adeyemi",
    },
  ]

  const liveMatches = matches.filter((match) => match.status === "live")
  const upcomingMatches = matches.filter((match) => match.status === "upcoming")
  const finishedMatches = matches.filter((match) => match.status === "finished")

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

  const MatchCard = ({ match }: { match: any }) => (
    <Card className="card-black-gold hover:scale-105 transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge
            variant={match.status === "live" ? "destructive" : match.status === "upcoming" ? "secondary" : "outline"}
            className={`${match.status === "live" ? "animate-pulse-gold" : ""} ${
              match.status === "live"
                ? "bg-red-500 text-white"
                : match.status === "upcoming"
                  ? "bg-gold-400 text-black-900"
                  : "bg-green-600 text-white"
            }`}
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
          <div className="flex items-center text-sm text-gold-400">
            <MapPin className="h-4 w-4 mr-1" />
            {match.state}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-gold rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-black-900" />
              </div>
              <div className="font-semibold text-white text-lg">{match.homeTeam}</div>
              <div className="text-xs text-gray-400 mt-1">HOME</div>
            </div>
            <div className="text-center mx-6">
              <div className="text-5xl font-bold text-gold-400 mb-2">
                {match.status === "finished" || match.status === "live"
                  ? `${match.homeScore}-${match.awayScore}`
                  : "VS"}
              </div>
              {match.status === "live" && <div className="text-xs text-red-400 animate-pulse">LIVE</div>}
            </div>
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-gold rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-black-900" />
              </div>
              <div className="font-semibold text-white text-lg">{match.awayTeam}</div>
              <div className="text-xs text-gray-400 mt-1">AWAY</div>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-400 mb-6">
          <div className="flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2 text-gold-400" />
            {match.date}
            <Clock className="h-4 w-4 ml-4 mr-2 text-gold-400" />
            {match.time}
          </div>
          <div className="text-center font-medium text-gold-400">{match.venue}</div>
          {match.attendance && (
            <div className="flex items-center justify-center text-xs">
              <Users className="h-3 w-3 mr-1" />
              {match.attendance.toLocaleString()} attendance
            </div>
          )}
          {match.ticketPrice && <div className="text-center text-xs text-gold-400">Tickets: {match.ticketPrice}</div>}
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 btn-gold">
            {match.status === "live" ? "Watch Live" : match.status === "upcoming" ? "Get Tickets" : "Match Report"}
          </Button>
          <Button variant="outline" size="icon" className="btn-black bg-transparent">
            <Eye className="h-4 w-4" />
          </Button>
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
            <span className="text-gradient-gold">Football</span> Matches
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Follow all live matches, upcoming fixtures, and results from Nigerian local leagues across all 36 states +
            FCT
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gold-400" />
                  <Input
                    placeholder="Search teams or matches..."
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
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger className="w-full lg:w-48 bg-black-800 border-gold-400/30 text-white">
                    <SelectValue placeholder="Select Date" />
                  </SelectTrigger>
                  <SelectContent className="bg-black-800 border-gold-400/20">
                    <SelectItem value="all" className="text-gold-400">
                      All Dates
                    </SelectItem>
                    <SelectItem value="today" className="text-gold-400">
                      Today
                    </SelectItem>
                    <SelectItem value="tomorrow" className="text-gold-400">
                      Tomorrow
                    </SelectItem>
                    <SelectItem value="week" className="text-gold-400">
                      This Week
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button className="btn-gold">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Match Tabs */}
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-black-800 border border-gold-400/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
              All Matches ({matches.length})
            </TabsTrigger>
            <TabsTrigger value="live" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
              Live ({liveMatches.length})
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900"
            >
              Upcoming ({upcomingMatches.length})
            </TabsTrigger>
            <TabsTrigger
              value="finished"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900"
            >
              Finished ({finishedMatches.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live">
            {liveMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {liveMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <Card className="card-black-gold text-center py-16">
                <CardContent>
                  <Trophy className="h-16 w-16 text-gold-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">No Live Matches</h3>
                  <p className="text-gray-400">Check back later for live match updates</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="finished">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {finishedMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button size="lg" className="btn-black px-12">
            Load More Matches
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
