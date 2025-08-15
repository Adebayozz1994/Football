"use client"

import { useState, useEffect } from "react"
import axios from "@/utils/axios"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Search, Filter, Eye, Users, Trophy } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Types
interface MatchEvent {
  minute: number
  type: "goal" | "yellow_card" | "red_card" | "substitution" | "penalty" | "var" | "injury"
  team: "home" | "away"
  player: string
  description?: string
  additionalInfo?: {
    assistedBy?: string
    replacedPlayer?: string 
    reason?: string
  }
}

interface Match {
  _id: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  status: "scheduled" | "live" | "finished"
  matchDate: string
  matchTime?: string
  venue?: string
  events?: MatchEvent[]
  bigChance?: {
    team: "home" | "away"
    description: string
    timestamp: number
  }
}

// Match Details Modal Component
const MatchDetailsModal = ({ match, onClose }: { match: Match | null; onClose: () => void }) => {
  if (!match) return null;

  const getEventIcon = (type: MatchEvent['type']) => {
    switch (type) {
      case 'goal':
        return '⚽'
      case 'yellow_card':
        return '🟨'
      case 'red_card':
        return '🟥'
      case 'substitution':
        return '🔄'
      case 'penalty':
        return '⚽'
      case 'var':
        return '📺'
      case 'injury':
        return '🤕'
      default:
        return '•'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-black to-zinc-900 border-2 border-gold-400/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl shadow-gold-400/10">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gold-400">Match Details</h2>
              <Badge
                className={`${
                  match.status === "live"
                    ? "bg-red-500 text-white animate-pulse"
                    : match.status === "scheduled"
                    ? "bg-gold-400 text-black"
                    : "bg-green-600 text-white"
                }`}
              >
                {match.status === "live" ? (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    LIVE NOW
                  </div>
                ) : match.status === "scheduled" ? (
                  "UPCOMING"
                ) : (
                  "FINISHED"
                )}
              </Badge>
            </div>
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="text-gold-400 hover:text-white hover:bg-gold-400/20 border-gold-400/50"
            >
              ✕
            </Button>
          </div>

          <div className="mb-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white bg-gradient-to-r from-transparent via-gold-400/10 to-transparent py-2">
                    {match.homeTeam}
                  </h3>
                </div>
                <div className="px-6 flex flex-col items-center">
                  <div className="relative">
                    <span className="text-6xl font-bold text-gold-400 mb-2">
                      {match.status !== "scheduled" ? `${match.homeScore}-${match.awayScore}` : "VS"}
                    </span>
                    {match.status === "live" && (
                      <>
                        <div className="text-xs text-red-400 animate-pulse mt-2">live</div>
                        {match.bigChance && (
                          <div className="mt-2 text-sm">
                            <div className="bg-yellow-500 text-black px-2 py-1 rounded animate-pulse font-bold">
                              big chance
                            </div>
                            <div className="text-xs mt-1 text-yellow-400">
                              {match.bigChance.team === "home" ? match.homeTeam : match.awayTeam}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white bg-gradient-to-r from-transparent via-gold-400/10 to-transparent py-2">
                    {match.awayTeam}
                  </h3>
                </div>
              </div>
              <div className="text-sm text-gold-400/80 space-y-1">
                {match.venue && (
                  <div className="flex items-center justify-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {match.venue}
                  </div>
                )}
                <div className="flex items-center justify-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {match.matchDate} {match.matchTime && (
                    <>
                      <Clock className="h-4 w-4 ml-2" />
                      {match.matchTime}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {match.events && match.events.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gold-400 mb-4 border-b border-gold-400/30 pb-2">Match Events</h3>
              <div className="space-y-2">
                {match.events.map((event, index) => (
                  <div 
                    key={index} 
                    className="flex items-center text-sm p-3 hover:bg-gold-400/5 rounded-lg border border-gold-400/10 transition-colors"
                  >
                    <span className="w-12 text-gold-400 font-semibold">{event.minute}'</span>
                    <span className="w-8 text-xl">{getEventIcon(event.type)}</span>
                    <div className="flex-1">
                      <span className="text-white font-medium">{event.player}</span>
                      {event.additionalInfo?.assistedBy && (
                        <span className="text-gold-400/80"> (assist: {event.additionalInfo.assistedBy})</span>
                      )}
                      {event.description && (
                        <div className="text-gold-400/60 text-xs mt-1">{event.description}</div>
                      )}
                    </div>
                    <span className="text-xs text-gold-400/80 font-medium">
                      {event.team === 'home' ? match.homeTeam : match.awayTeam}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gold-400/60 py-8">No events recorded yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)

  const fetchMatches = async (isPolling = false) => {
    if (isPolling) {
      setUpdating(true);
    }
    try {
      const params = new URLSearchParams();
      if (selectedDate !== 'all') {
        params.append('dateFilter', selectedDate);
      }
      if (selectedState !== 'all') {
        params.append('status', selectedState);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await axios.get(`/matches?${params.toString()}`);
      const newMatches = response.data as Match[];

      const updatedMatches: Match[] = newMatches.map((newMatch: Match) => {
        const oldMatch = matches.find(m => m._id === newMatch._id);
        if (oldMatch && newMatch.status === "live") {
          const scoreChange = newMatch.homeScore !== oldMatch.homeScore || 
                            newMatch.awayScore !== oldMatch.awayScore;

          if (scoreChange) {
            return {
              ...oldMatch,
              bigChance: {
                team: newMatch.homeScore !== oldMatch.homeScore ? "home" as const : "away" as const,
                description: "Potential goal!",
                timestamp: Date.now()
              }
            } as Match;
          }
        }
        return newMatch;
      });

      setMatches(updatedMatches);
      setError("");

      setTimeout(() => {
        setMatches(prev => 
          prev.map(match => {
            const newMatch = newMatches.find(m => m._id === match._id);
            if (newMatch && match.bigChance) {
              return {
                ...newMatch,
                bigChance: undefined
              };
            }
            return match;
          })
        );
      }, 5000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to load matches");
      } else {
        setError("An unknown error occurred");
      }
      console.error("Error fetching matches:", err);
    } finally {
      setLoading(false);
      if (isPolling) {
        setUpdating(false);
      }
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchMatches()
  }, [])

  useEffect(() => {
    const hasLiveMatches = matches.some(match => match.status === "live")
    
    if (hasLiveMatches) {
      const fastPollInterval = setInterval(() => {
        fetchMatches(true)
      }, 5000)

      let ws: WebSocket | null = null;

      try {
        //  WebSocket connection
        ws = new WebSocket('ws://localhost:5000/ws/matches');
        
        ws.onopen = () => {
          console.log('WebSocket Connected');
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data) as {
              type: string;
              matchId: string;
              team: "home" | "away";
              update?: Partial<Match>;
            };
            
            if (data.type === 'score_update') {
              setMatches(prev => prev.map(match => {
                if (match._id === data.matchId) {
                  return {
                    ...match,
                    bigChance: {
                      team: data.team,
                      description: "Potential goal!",
                      timestamp: Date.now()
                    }
                  };
                }
                return match;
              }));

              setTimeout(() => {
                setMatches(prev => prev.map(match => {
                  if (match._id === data.matchId) {
                    return {
                      ...match,
                      ...data.update,
                      bigChance: undefined
                    };
                  }
                  return match;
                }));
              }, 3000);
            }
          } catch (err) {
            console.log('Error processing WebSocket message:', err);
          }
        };

        ws.onerror = () => {
          console.log('WebSocket connection failed, falling back to polling');
          ws = null;
        };

        ws.onclose = () => {
          console.log('WebSocket connection closed');
          ws = null;
        };
      } catch (err) {
        console.log('WebSocket setup failed, using polling instead');
      }

      return () => {
        clearInterval(fastPollInterval);
        if (ws) {
          ws.close();
        }
      };
    }
  }, [matches])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    )
  }

  // Filter and sort matches based on their status
  const filteredMatches = matches.filter((match) => {
    const matchesSearch =
      match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by status
    const matchesStatus = selectedState === "all" || match.status === selectedState

    // Filter by date
    let matchesDate = true
    if (selectedDate !== "all") {
      // Ensure proper date parsing by converting YYYY-MM-DD to Date object
      const [year, month, day] = match.matchDate.split('-').map(num => parseInt(num))
      const matchDate = new Date(year, month - 1, day)
      
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      const weekEnd = new Date(today)
      weekEnd.setDate(weekEnd.getDate() + 7)

      // Format dates for comparison
      const matchDateStr = matchDate.toISOString().split('T')[0]
      const todayStr = today.toISOString().split('T')[0]
      const tomorrowStr = tomorrow.toISOString().split('T')[0]

      switch (selectedDate) {
        case "today":
          matchesDate = matchDateStr === todayStr
          break
        case "tomorrow":
          matchesDate = matchDateStr === tomorrowStr
          break
        case "week":
          matchesDate = matchDate >= today && matchDate <= weekEnd
          break
        default:
          matchesDate = true
      }
    }

    return matchesSearch && matchesStatus && matchesDate
  }).sort((a, b) => {
    // Custom sorting order: live -> scheduled -> finished
    const statusOrder = { live: 0, scheduled: 1, finished: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  })

  const liveMatches = filteredMatches.filter((match) => match.status === "live")
  const upcomingMatches = filteredMatches.filter((match) => match.status === "scheduled")
  const finishedMatches = filteredMatches.filter((match) => match.status === "finished")

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

  const MatchCard = ({ match }: { match: Match }) => (
    <Card 
      className="card-black-gold hover:scale-105 transition-all duration-300 group cursor-pointer"
      onClick={() => setSelectedMatch(match)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge
            variant={match.status === "live" ? "destructive" : match.status === "scheduled" ? "secondary" : "outline"}
            className={`${match.status === "live" ? "animate-pulse-gold" : ""} ${
              match.status === "live"
                ? "bg-red-500 text-white"
                : match.status === "scheduled"
                  ? "bg-gold-400 text-black-900"
                  : "bg-green-600 text-white"
            }`}
          >
            {match.status === "live" ? (
              <div className="flex items-center">
                <div className="live-indicator w-2 h-2 mr-2"></div>
                Live
              </div>
            ) : match.status === "scheduled" ? (
              "UPCOMING"
            ) : (
              "FINISHED"
            )}
          </Badge>
          {match.venue && (
            <div className="flex items-center text-sm text-gold-400">
              <MapPin className="h-4 w-4 mr-1" />
              {match.venue}
            </div>
          )}
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
                {match.status !== "scheduled" ? `${match.homeScore}-${match.awayScore}` : "VS"}
              </div>
              {match.status === "live" && (
                <>
                  <div className="text-xs text-red-400 animate-pulse">Live</div>
                  {match.bigChance && (
                    <div className="mt-2 text-sm">
                      <div className="text-xs text-red-500 px-1 py-1 rounded animate-pulse font-bold">
                        big chance
                      </div>
                      <div className="text-xs mt-1 text-yellow-400">
                        {match.bigChance.team === "home" ? match.homeTeam : match.awayTeam}
                      </div>
                    </div>
                  )}
                </>
              )}
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
            {match.matchDate}
            {match.matchTime && (
              <>
                <Clock className="h-4 w-4 ml-4 mr-2 text-gold-400" />
                {match.matchTime}
              </>
            )}
          </div>
          {match.venue && <div className="text-center font-medium text-gold-400">{match.venue}</div>}
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 btn-gold">
            {match.status === "live" ? "Watch Live" : match.status === "scheduled" ? "Get Tickets" : "Match Report"}
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white font-playfair">
            <span className="text-gradient-gold">Football</span> Matches
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Follow all live matches, upcoming fixtures, and results from Nigerian local leagues across all 36 states +
            OGBOMOSO
          </p>
        </div>

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
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-black-800 border-gold-400/20">
                    <SelectItem value="all" className="text-gold-400">
                      All Statuses
                    </SelectItem>
                    <SelectItem value="live" className="text-gold-400">
                      Live
                    </SelectItem>
                    <SelectItem value="scheduled" className="text-gold-400">
                      Upcoming
                    </SelectItem>
                    <SelectItem value="finished" className="text-gold-400">
                      Finished
                    </SelectItem>
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

        {updating && (
          <div className="text-center mb-4">
            <span className="inline-flex items-center text-sm text-gold-400">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gold-400 mr-2"></div>
              Updating live scores...
            </span>
          </div>
        )}
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-black-800 border border-gold-400/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
              All Matches ({filteredMatches.length})
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
              {filteredMatches.map((match) => (
                <MatchCard key={match._id} match={match} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live">
            {liveMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {liveMatches.map((match) => (
                  <MatchCard key={match._id} match={match} />
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
                <MatchCard key={match._id} match={match} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="finished">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {finishedMatches.map((match) => (
                <MatchCard key={match._id} match={match} />
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
      
      {selectedMatch && (
        <MatchDetailsModal 
          match={selectedMatch} 
          onClose={() => setSelectedMatch(null)} 
        />
      )}
    </div>
  )
}
