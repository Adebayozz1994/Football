"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Trophy, Clock, Plus, Minus, RefreshCw, Send, MessageSquare, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MatchEvent {
  id: string
  time: string
  type: "goal" | "card" | "substitution" | "commentary" | "penalty"
  description: string
  team?: string
  player?: string
  cardType?: "yellow" | "red"
  inPlayer?: string
  outPlayer?: string
}

interface LiveMatch {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  status: "live" | "half-time" | "full-time" | "paused"
  minute: number
  events: MatchEvent[]
}

export default function LiveMatchUpdatesPage() {
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([
    {
      id: "match-1",
      homeTeam: "Lagos United",
      awayTeam: "Kano Pillars",
      homeScore: 1,
      awayScore: 0,
      status: "live",
      minute: 45,
      events: [
        {
          id: "e1",
          time: "15'",
          type: "goal",
          description: "Goal by John Doe (Lagos United)",
          team: "Lagos United",
          player: "John Doe",
        },
        {
          id: "e2",
          time: "30'",
          type: "card",
          description: "Yellow card for Peter Obi (Kano Pillars)",
          team: "Kano Pillars",
          player: "Peter Obi",
          cardType: "yellow",
        },
        { id: "e3", time: "40'", type: "commentary", description: "Lagos United dominating possession in midfield." },
      ],
    },
    {
      id: "match-2",
      homeTeam: "Rivers United",
      awayTeam: "Plateau United",
      homeScore: 0,
      awayScore: 0,
      status: "upcoming",
      minute: 0,
      events: [],
    },
  ])

  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(liveMatches[0]?.id || null)
  const selectedMatch = liveMatches.find((match) => match.id === selectedMatchId)

  const [newEventTime, setNewEventTime] = useState("")
  const [newEventType, setNewEventType] = useState<MatchEvent["type"]>("commentary")
  const [newEventDescription, setNewEventDescription] = useState("")
  const [newEventTeam, setNewEventTeam] = useState("")
  const [newEventPlayer, setNewEventPlayer] = useState("")
  const [newEventCardType, setNewEventCardType] = useState<"yellow" | "red">("yellow")
  const [newEventInPlayer, setNewEventInPlayer] = useState("")
  const [newEventOutPlayer, setNewEventOutPlayer] = useState("")

  useEffect(() => {
    if (!selectedMatchId && liveMatches.length > 0) {
      setSelectedMatchId(liveMatches[0].id)
    }
  }, [liveMatches, selectedMatchId])

  const handleScoreChange = (team: "home" | "away", value: number) => {
    if (!selectedMatch) return
    setLiveMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.id === selectedMatch.id
          ? { ...match, [team === "home" ? "homeScore" : "awayScore"]: Math.max(0, value) }
          : match,
      ),
    )
  }

  const handleStatusChange = (status: LiveMatch["status"]) => {
    if (!selectedMatch) return
    setLiveMatches((prevMatches) =>
      prevMatches.map((match) => (match.id === selectedMatch.id ? { ...match, status } : match)),
    )
  }

  const handleMinuteChange = (value: number) => {
    if (!selectedMatch) return
    setLiveMatches((prevMatches) =>
      prevMatches.map((match) => (match.id === selectedMatch.id ? { ...match, minute: Math.max(0, value) } : match)),
    )
  }

  const handleAddEvent = () => {
    if (!selectedMatch || !newEventTime || !newEventDescription) return

    const newEvent: MatchEvent = {
      id: `e${selectedMatch.events.length + 1}`,
      time: newEventTime,
      type: newEventType,
      description: newEventDescription,
    }

    if (newEventTeam) newEvent.team = newEventTeam
    if (newEventPlayer) newEvent.player = newEventPlayer
    if (newEventCardType) newEvent.cardType = newEventCardType
    if (newEventInPlayer) newEvent.inPlayer = newEventInPlayer
    if (newEventOutPlayer) newEvent.outPlayer = newEventOutPlayer

    setLiveMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.id === selectedMatch.id ? { ...match, events: [...match.events, newEvent] } : match,
      ),
    )

    // Clear event form
    setNewEventTime("")
    setNewEventType("commentary")
    setNewEventDescription("")
    setNewEventTeam("")
    setNewEventPlayer("")
    setNewEventCardType("yellow")
    setNewEventInPlayer("")
    setNewEventOutPlayer("")
  }

  const getEventIcon = (type: MatchEvent["type"]) => {
    switch (type) {
      case "goal":
        return <Trophy className="h-4 w-4 text-yellow-500" />
      case "card":
        return (
          <Badge
            variant="outline"
            className={`h-4 w-4 p-0 rounded-sm ${newEventCardType === "yellow" ? "bg-yellow-400" : "bg-red-500"}`}
          />
        )
      case "substitution":
        return <RefreshCw className="h-4 w-4 text-blue-500" />
      case "commentary":
        return <MessageSquare className="h-4 w-4 text-gray-500" />
      case "penalty":
        return <Bell className="h-4 w-4 text-orange-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Live Match Updates</h1>
        <p className="text-muted-foreground">Manage real-time scores, events, and match status.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Match Selection & Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Select Match</CardTitle>
            <CardDescription>Choose a match to update its live status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedMatchId || ""} onValueChange={setSelectedMatchId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a match" />
              </SelectTrigger>
              <SelectContent>
                {liveMatches.map((match) => (
                  <SelectItem key={match.id} value={match.id}>
                    {match.homeTeam} vs {match.awayTeam} ({match.status})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedMatch ? (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
                  </h3>
                  <Badge variant={selectedMatch.status === "live" ? "destructive" : "secondary"}>
                    {selectedMatch.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-2xl font-bold">
                  <span>
                    {selectedMatch.homeScore} - {selectedMatch.awayScore}
                  </span>
                  <div className="flex items-center text-muted-foreground text-lg">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{selectedMatch.minute}'</span>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="homeScore">Home Score</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleScoreChange("home", selectedMatch.homeScore - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="homeScore"
                        type="number"
                        value={selectedMatch.homeScore}
                        onChange={(e) => handleScoreChange("home", Number.parseInt(e.target.value))}
                        className="text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleScoreChange("home", selectedMatch.homeScore + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="awayScore">Away Score</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleScoreChange("away", selectedMatch.awayScore - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="awayScore"
                        type="number"
                        value={selectedMatch.awayScore}
                        onChange={(e) => handleScoreChange("away", Number.parseInt(e.target.value))}
                        className="text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleScoreChange("away", selectedMatch.awayScore + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matchStatus">Match Status</Label>
                  <Select
                    value={selectedMatch.status}
                    onValueChange={(value) => handleStatusChange(value as LiveMatch["status"])}
                  >
                    <SelectTrigger id="matchStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="half-time">Half-Time</SelectItem>
                      <SelectItem value="full-time">Full-Time</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matchMinute">Match Minute</Label>
                  <Input
                    id="matchMinute"
                    type="number"
                    value={selectedMatch.minute}
                    onChange={(e) => handleMinuteChange(Number.parseInt(e.target.value))}
                  />
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center">No match selected.</p>
            )}
          </CardContent>
        </Card>

        {/* Event Feed & Add Event */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Match Events</CardTitle>
            <CardDescription>Add new events to the live match feed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Event Feed</h3>
              <ScrollArea className="h-[300px] border rounded-md p-4">
                {selectedMatch?.events.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No events yet.</p>
                )}
                {selectedMatch?.events.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 mb-3">
                    <div className="flex-shrink-0 pt-1">{getEventIcon(event.type)}</div>
                    <div className="flex-1">
                      <div className="font-medium">
                        {event.time} - {event.description}
                      </div>
                      {event.player && (
                        <p className="text-sm text-muted-foreground">
                          Player: {event.player} {event.team && `(${event.team})`}
                        </p>
                      )}
                      {event.inPlayer && event.outPlayer && (
                        <p className="text-sm text-muted-foreground">
                          Sub: {event.outPlayer} out, {event.inPlayer} in
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Add New Event</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventTime">Time (e.g., 45+2&apos;)</Label>
                  <Input
                    id="eventTime"
                    placeholder="e.g., 45'"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <Select value={newEventType} onValueChange={(value) => setNewEventType(value as MatchEvent["type"])}>
                    <SelectTrigger id="eventType">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commentary">Commentary</SelectItem>
                      <SelectItem value="goal">Goal</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="substitution">Substitution</SelectItem>
                      <SelectItem value="penalty">Penalty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(newEventType === "goal" || newEventType === "card" || newEventType === "substitution") && (
                  <div className="space-y-2">
                    <Label htmlFor="eventTeam">Team</Label>
                    <Select value={newEventTeam} onValueChange={setNewEventTeam}>
                      <SelectTrigger id="eventTeam">
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedMatch && (
                          <>
                            <SelectItem value={selectedMatch.homeTeam}>{selectedMatch.homeTeam}</SelectItem>
                            <SelectItem value={selectedMatch.awayTeam}>{selectedMatch.awayTeam}</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {(newEventType === "goal" || newEventType === "card") && (
                  <div className="space-y-2">
                    <Label htmlFor="eventPlayer">Player Name</Label>
                    <Input
                      id="eventPlayer"
                      placeholder="e.g., John Doe"
                      value={newEventPlayer}
                      onChange={(e) => setNewEventPlayer(e.target.value)}
                    />
                  </div>
                )}
                {newEventType === "card" && (
                  <div className="space-y-2">
                    <Label htmlFor="cardType">Card Type</Label>
                    <Select value={newEventCardType} onValueChange={setNewEventCardType}>
                      <SelectTrigger id="cardType">
                        <SelectValue placeholder="Select card type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yellow">Yellow</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {newEventType === "substitution" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="outPlayer">Player Out</Label>
                      <Input
                        id="outPlayer"
                        placeholder="e.g., Player A"
                        value={newEventOutPlayer}
                        onChange={(e) => setNewEventOutPlayer(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inPlayer">Player In</Label>
                      <Input
                        id="inPlayer"
                        placeholder="e.g., Player B"
                        value={newEventInPlayer}
                        onChange={(e) => setNewEventInPlayer(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="eventDescription">Description</Label>
                  <Textarea
                    id="eventDescription"
                    placeholder="Enter event description (e.g., 'Corner kick for Home Team')"
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <Button onClick={handleAddEvent} className="w-full" disabled={!selectedMatch}>
                <Send className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
