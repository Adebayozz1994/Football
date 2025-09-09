'use client'

import axios from '@/utils/axios';
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  AdminFormSkeleton, 
  AdminTableSkeleton 
} from "@/components/ui/skeletons"

type Match = {
  _id: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  status: string
  state: string
  competition: string
  matchDate: string
  matchTime?: string
  venue?: string
  events?: {
    minute: number
    type: string
    team: string
    player?: string
    description?: string
  }[]
}

// All Nigerian states
const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara"
]

const COMPETITIONS = [
  "Orumogege Football Competition",
  "Olufem Presenter Football Competition",
  "U17 Friendly Tournament",
  "UNICEF Awareness Tournament",
  "Twindad Cup",
  "Jodelapo Football Competition",
  "Solmed Foundation Sunday Set Competition",
  "Club Friendly",
  "Vocational Football Tournament"
]

// Helper to get token from localStorage
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("admin_token");
  }
  return null;
};

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    homeTeam: "",
    awayTeam: "",
    matchDate: "",
    matchTime: "",
    venue: "",
    state: "Oyo",
    competition: "Orumogege Football Competition"
  })
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [eventForm, setEventForm] = useState({
    minute: "",
    type: "",
    team: "",
    player: "",
    description: ""
  })

  // Fetch all matches
  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/matches`);
      setMatches(res.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Error fetching matches");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMatches()
  }, []);

  // Create a match
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const token = getToken()
      if (!token) {
        setError("Admin token is required")
        return
      }
      await axios.post(`/matches`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setForm({ homeTeam: "", awayTeam: "", matchDate: "", matchTime: "", venue: "", state: "Oyo", competition: "NPFL" })
      fetchMatches()
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating match")
    }
  }

  // Select a match to view/edit
  const selectMatch = async (id: string) => {
    setError("")
    setSelectedMatch(null)
    try {
      const res = await axios.get(`/matches/${id}`)
      setSelectedMatch(res.data)
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching match")
    }
  }

  // Update score
  const handleScoreUpdate = async (id: string, homeScore: number, awayScore: number) => {
    setError("")
    try {
      const token = getToken()
      if (!token) {
        setError("Admin token is required")
        return
      }

      // Validate scores
      if (isNaN(homeScore) || isNaN(awayScore)) {
        setError("Please enter valid scores")
        return
      }

      if (homeScore < 0 || awayScore < 0) {
        setError("Scores cannot be negative")
        return
      }

      if (!Number.isInteger(homeScore) || !Number.isInteger(awayScore)) {
        setError("Scores must be whole numbers")
        return
      }

      await axios.patch(`/matches/${id}/score`, 
        { homeScore, awayScore },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          timeout: 5000,
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          }
        }
      )
      
      await selectMatch(id)
      await fetchMatches()
    } catch (err: any) {
      console.error("Score update error:", err)
      setError(err.response?.data?.message || "Error updating score")
    }
  }

  // Mark as live/scheduled/finished
  const handleStatus = async (id: string, status: "live" | "scheduled" | "finished") => {
    setError("")
    try {
      const token = getToken()
      if (!token) {
        setError("Admin token is required")
        return
      }
      const endpoint = status === "live" ? "live" : 
                      status === "scheduled" ? "schedule" : 
                      "finish";
      await axios.patch(`/matches/${id}/${endpoint}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      selectMatch(id)
      fetchMatches()
    } catch (err: any) {
      console.error("Status update error:", err)
      setError(err.response?.data?.message || `Error marking as ${status}`)
    }
  }

  // Add event
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMatch) return
    setError("")
    try {
      const token = getToken()
      if (!token) {
        setError("Admin token is required")
        return
      }
      const body = {
        minute: Number(eventForm.minute),
        type: eventForm.type,
        team: eventForm.team,
        player: eventForm.player,
        description: eventForm.description
      }
      await axios.post(`/matches/${selectedMatch._id}/events`, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      selectMatch(selectedMatch._id)
      setEventForm({ minute: "", type: "", team: "", player: "", description: "" })
    } catch (err: any) {
      setError(err.response?.data?.message || "Error adding event")
    }
  }

  // Delete event
  const handleDeleteEvent = async (index: number) => {
    if (!selectedMatch) return
    setError("")
    try {
      const token = getToken()
      if (!token) {
        setError("Admin token is required")
        return
      }
      await axios.delete(`/matches/${selectedMatch._id}/events/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      selectMatch(selectedMatch._id)
    } catch (err: any) {
      setError(err.response?.data?.message || "Error deleting event")
    }
  }

  // Delete match
  const handleDeleteMatch = async (id: string) => {
    setError("")
    try {
      const token = getToken()
      if (!token) {
        setError("Admin token is required")
        return
      }
      await axios.delete(`/matches/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      fetchMatches()
      setSelectedMatch(null)
    } catch (err: any) {
      setError(err.response?.data?.message || "Error deleting match")
    }
  }

  return (
    <div className="container max-w-5xl py-6 space-y-6">
      {loading && !matches.length ? (
        // Skeleton Loading State for initial load
        <>
          <div className="flex justify-between items-center">
            <div className="h-9 w-48 bg-gray-700 rounded animate-pulse"></div>
          </div>
          <AdminFormSkeleton />
          <AdminTableSkeleton />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Match Management</h1>
          </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Match</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Home Team"
                value={form.homeTeam}
                onChange={e => setForm({ ...form, homeTeam: e.target.value })}
                required
              />
              <Input
                placeholder="Away Team"
                value={form.awayTeam}
                onChange={e => setForm({ ...form, awayTeam: e.target.value })}
                required
              />
              <Input
                type="date"
                value={form.matchDate}
                onChange={e => setForm({ ...form, matchDate: e.target.value })}
                required
              />
              <Input
                type="time"
                value={form.matchTime}
                onChange={e => setForm({ ...form, matchTime: e.target.value })}
              />
              <Input
                className="col-span-2"
                placeholder="Venue"
                value={form.venue}
                onChange={e => setForm({ ...form, venue: e.target.value })}
              />
              <Select
                value={form.state}
                onValueChange={value => setForm({ ...form, state: value })}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {NIGERIAN_STATES.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={form.competition}
                onValueChange={value => setForm({ ...form, competition: value })}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Competition" />
                </SelectTrigger>
                <SelectContent>
                  {COMPETITIONS.map(competition => (
                    <SelectItem key={competition} value={competition}>{competition}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full md:w-auto">Create Match</Button>
          </form>
        </CardContent>
      </Card>

      {error && <div className="bg-destructive/15 text-destructive p-3 rounded-md">{error}</div>}

      <Card>
        <CardHeader>
          <CardTitle>All Matches</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-muted-foreground">Loading...</div>
          ) : (
            <div className="space-y-2">
              {matches.map(match => (
                <div key={match._id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <div className="font-semibold">
                      {match.homeTeam} vs {match.awayTeam}
                    </div>
                    <div className="text-sm text-muted-foreground space-x-2">
                      <Badge variant={
                        match.status === 'live' ? 'default' :
                        match.status === 'finished' ? 'secondary' :
                        'outline'
                      }>
                        {match.status}
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {match.state}
                      </Badge>
                      <span>{match.matchDate?.slice(0,10)} {match.matchTime}</span>
                      {match.venue && <span>• {match.venue}</span>}
                      <span>• {match.competition}</span>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="secondary"
                      onClick={() => selectMatch(match._id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteMatch(match._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedMatch && (
        <Card>
          <CardHeader>
            <CardTitle>Match Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="text-xl font-semibold">
                {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
              </div>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <Badge variant={
                  selectedMatch.status === 'live' ? 'default' :
                  selectedMatch.status === 'finished' ? 'secondary' :
                  'outline'
                }>
                  {selectedMatch.status}
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {selectedMatch.state}
                </Badge>
                <span>{selectedMatch.matchDate?.slice(0,10)} {selectedMatch.matchTime}</span>
                {selectedMatch.venue && <span>• {selectedMatch.venue}</span>}
                <span>• {selectedMatch.competition}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Match Status</h3>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    onClick={() => handleStatus(selectedMatch._id, "live")}
                  >
                    Mark Live
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleStatus(selectedMatch._id, "scheduled")}
                  >
                    Mark Scheduled
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleStatus(selectedMatch._id, "finished")}
                  >
                    Mark Finished
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Score</h3>
              <form className="flex items-center gap-2" onSubmit={e => {
                e.preventDefault()
                handleScoreUpdate(
                  selectedMatch._id,
                  Number((e.currentTarget.elements.namedItem("homeScore") as HTMLInputElement).value),
                  Number((e.currentTarget.elements.namedItem("awayScore") as HTMLInputElement).value)
                )
              }}>
                <Input
                  type="number"
                  name="homeScore"
                  className="w-20"
                  defaultValue={selectedMatch.homeScore}
                />
                <span className="text-lg font-bold">-</span>
                <Input
                  type="number"
                  name="awayScore"
                  className="w-20"
                  defaultValue={selectedMatch.awayScore}
                />
                <Button type="submit">Update Score</Button>
              </form>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Match Events</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  {selectedMatch.events?.map((ev, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="w-12 justify-center">
                          {ev.minute}'
                        </Badge>
                        <span className="font-medium">{ev.type}</span>
                        <span className="text-muted-foreground">
                          {ev.team}
                          {ev.player && <> • {ev.player}</>}
                          {ev.description && <> • {ev.description}</>}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEvent(idx)}
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>

                <form className="grid grid-cols-2 md:flex gap-2 items-start" onSubmit={handleAddEvent}>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Min"
                    className="w-20"
                    value={eventForm.minute}
                    onChange={e => setEventForm({ ...eventForm, minute: e.target.value })}
                    required
                  />
                  <Select
                    value={eventForm.type}
                    onValueChange={(value) => setEventForm({ ...eventForm, type: value })}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="goal">Goal</SelectItem>
                      <SelectItem value="own_goal">Own Goal</SelectItem>
                      <SelectItem value="yellow_card">Yellow Card</SelectItem>
                      <SelectItem value="red_card">Red Card</SelectItem>
                      <SelectItem value="substitution">Substitution</SelectItem>
                      <SelectItem value="penalty">Penalty</SelectItem>
                      <SelectItem value="assist">Assist</SelectItem>
                      <SelectItem value="injury">Injury</SelectItem>
                      <SelectItem value="start">Start</SelectItem>
                      <SelectItem value="end">End</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={eventForm.team}
                    onValueChange={(value) => setEventForm({ ...eventForm, team: value })}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="away">Away</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Player"
                    value={eventForm.player}
                    onChange={e => setEventForm({ ...eventForm, player: e.target.value })}
                  />
                  <Input
                    placeholder="Description"
                    value={eventForm.description}
                    onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
                  />
                  <Button type="submit">Add Event</Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
        </>
      )}
    </div>
  )
}