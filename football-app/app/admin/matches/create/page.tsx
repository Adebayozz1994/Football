"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon, PlusCircle, XCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export default function CreateMatchPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [homeTeam, setHomeTeam] = useState("")
  const [awayTeam, setAwayTeam] = useState("")
  const [venue, setVenue] = useState("")
  const [state, setState] = useState("")
  const [time, setTime] = useState("")
  const [referee, setReferee] = useState("")
  const [description, setDescription] = useState("")
  const [lineups, setLineups] = useState([{ team: "home", player: "", position: "" }])
  const [officials, setOfficials] = useState([{ role: "", name: "" }])

  const handleAddLineup = (team: "home" | "away") => {
    setLineups([...lineups, { team, player: "", position: "" }])
  }

  const handleRemoveLineup = (index: number) => {
    const newLineups = lineups.filter((_, i) => i !== index)
    setLineups(newLineups)
  }

  const handleLineupChange = (index: number, field: string, value: string) => {
    const newLineups = [...lineups]
    // @ts-ignore
    newLineups[index][field] = value
    setLineups(newLineups)
  }

  const handleAddOfficial = () => {
    setOfficials([...officials, { role: "", name: "" }])
  }

  const handleRemoveOfficial = (index: number) => {
    const newOfficials = officials.filter((_, i) => i !== index)
    setOfficials(newOfficials)
  }

  const handleOfficialChange = (index: number, field: string, value: string) => {
    const newOfficials = [...officials]
    // @ts-ignore
    newOfficials[index][field] = value
    setOfficials(newOfficials)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({
      date,
      homeTeam,
      awayTeam,
      venue,
      state,
      time,
      referee,
      description,
      lineups,
      officials,
    })
    // Reset form or show success message
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Match</h1>
        <p className="text-muted-foreground">Fill in the details to schedule a new football match.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Match Details</CardTitle>
            <CardDescription>Basic information about the match.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="homeTeam">Home Team</Label>
              <Input
                id="homeTeam"
                placeholder="Enter home team name"
                value={homeTeam}
                onChange={(e) => setHomeTeam(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="awayTeam">Away Team</Label>
              <Input
                id="awayTeam"
                placeholder="Enter away team name"
                value={awayTeam}
                onChange={(e) => setAwayTeam(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                placeholder="Enter match venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="pr-8"
                />
                <ClockIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="referee">Referee</Label>
              <Input
                id="referee"
                placeholder="Enter referee name"
                value={referee}
                onChange={(e) => setReferee(e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add a brief description of the match"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lineups</CardTitle>
            <CardDescription>Specify the starting lineups for both teams.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-semibold">Home Team Lineup</h3>
            {lineups
              .filter((p) => p.team === "home")
              .map((player, index) => (
                <div key={`home-${index}`} className="flex items-end gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`home-player-${index}`}>Player Name</Label>
                    <Input
                      id={`home-player-${index}`}
                      placeholder="Player Name"
                      value={player.player}
                      onChange={(e) => handleLineupChange(index, "player", e.target.value)}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`home-position-${index}`}>Position</Label>
                    <Input
                      id={`home-position-${index}`}
                      placeholder="Position (e.g., Forward, Midfielder)"
                      value={player.position}
                      onChange={(e) => handleLineupChange(index, "position", e.target.value)}
                    />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveLineup(index)}>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="sr-only">Remove player</span>
                  </Button>
                </div>
              ))}
            <Button type="button" variant="outline" onClick={() => handleAddLineup("home")}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Home Player
            </Button>

            <h3 className="text-lg font-semibold mt-6">Away Team Lineup</h3>
            {lineups
              .filter((p) => p.team === "away")
              .map((player, index) => (
                <div key={`away-${index}`} className="flex items-end gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`away-player-${index}`}>Player Name</Label>
                    <Input
                      id={`away-player-${index}`}
                      placeholder="Player Name"
                      value={player.player}
                      onChange={(e) => handleLineupChange(index, "player", e.target.value)}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`away-position-${index}`}>Position</Label>
                    <Input
                      id={`away-position-${index}`}
                      placeholder="Position (e.g., Forward, Midfielder)"
                      value={player.position}
                      onChange={(e) => handleLineupChange(index, "position", e.target.value)}
                    />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveLineup(index)}>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="sr-only">Remove player</span>
                  </Button>
                </div>
              ))}
            <Button type="button" variant="outline" onClick={() => handleAddLineup("away")}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Away Player
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Match Officials</CardTitle>
            <CardDescription>
              Add other officials for the match (e.g., Assistant Referees, Fourth Official).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {officials.map((official, index) => (
              <div key={index} className="flex items-end gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`official-role-${index}`}>Role</Label>
                  <Input
                    id={`official-role-${index}`}
                    placeholder="Role (e.g., Assistant Referee)"
                    value={official.role}
                    onChange={(e) => handleOfficialChange(index, "role", e.target.value)}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`official-name-${index}`}>Name</Label>
                  <Input
                    id={`official-name-${index}`}
                    placeholder="Official Name"
                    value={official.name}
                    onChange={(e) => handleOfficialChange(index, "name", e.target.value)}
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveOfficial(index)}>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="sr-only">Remove official</span>
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddOfficial}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Official
            </Button>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Create Match</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
