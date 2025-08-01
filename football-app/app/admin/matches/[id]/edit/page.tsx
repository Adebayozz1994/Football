"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  Clock,
  MapPin,
  Users,
  Trophy,
  Save,
  ArrowLeft,
  Plus,
  Minus,
  Activity,
  AlertTriangle,
} from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

export default function EditMatchPage({ params }: { params: { id: string } }) {
  const [matchDate, setMatchDate] = useState<Date>()
  const [formData, setFormData] = useState({
    homeTeam: "Lagos United",
    awayTeam: "Kano Pillars",
    venue: "Teslim Balogun Stadium",
    state: "Lagos",
    time: "16:00",
    referee: "John Adebayo",
    ticketPrice: "₦2,000 - ₦10,000",
    capacity: "24000",
    description: "NPFL Matchday 15 - Lagos United vs Kano Pillars",
    isLive: false,
    allowBetting: true,
    featured: true,
    status: "upcoming",
  })

  const [homeScore, setHomeScore] = useState(2)
  const [awayScore, setAwayScore] = useState(1)
  const [currentMinute, setCurrentMinute] = useState(78)

  useEffect(() => {
    // Simulate loading existing match data
    setMatchDate(new Date("2024-01-15"))
    if (params.id === "2") {
      setFormData((prev) => ({ ...prev, isLive: true, status: "live" }))
    }
  }, [params.id])

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

  const popularTeams = [
    "Lagos United",
    "Kano Pillars",
    "Rivers United",
    "Enyimba FC",
    "Plateau United",
    "Heartland FC",
    "Shooting Stars",
    "Lobi Stars",
    "Akwa United",
    "Nasarawa United",
    "Kwara United",
    "Sunshine Stars",
    "Remo Stars",
    "Abia Warriors",
    "Niger Tornadoes",
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updating match:", {
      ...formData,
      date: matchDate,
      homeScore: formData.isLive ? homeScore : null,
      awayScore: formData.isLive ? awayScore : null,
      currentMinute: formData.isLive ? currentMinute : null,
    })
    // Handle form submission
  }

  const handleStatusChange = (newStatus: string) => {
    setFormData((prev) => ({
      ...prev,
      status: newStatus,
      isLive: newStatus === "live",
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="btn-black bg-transparent" asChild>
            <Link href="/admin/matches">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Match</h1>
            <p className="text-gray-400">Update match details and settings</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant={
              formData.status === "live" ? "destructive" : formData.status === "upcoming" ? "secondary" : "outline"
            }
            className={
              formData.status === "live"
                ? "animate-pulse-gold bg-red-500 text-white"
                : formData.status === "upcoming"
                  ? "bg-gold-400 text-black-900"
                  : "bg-green-600 text-white"
            }
          >
            {formData.status === "live" ? (
              <div className="flex items-center">
                <div className="live-indicator w-2 h-2 mr-2"></div>
                LIVE
              </div>
            ) : formData.status === "upcoming" ? (
              "UPCOMING"
            ) : (
              "FINISHED"
            )}
          </Badge>
        </div>
      </div>

      {/* Status Control */}
      <Card className="card-black-gold">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-5 w-5 mr-2 text-gold-400" />
            Match Status Control
          </CardTitle>
          <CardDescription className="text-gray-400">Change match status and manage live updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={formData.status === "upcoming" ? "default" : "outline"}
              className={formData.status === "upcoming" ? "btn-gold" : "btn-black bg-transparent"}
              onClick={() => handleStatusChange("upcoming")}
            >
              <Clock className="h-4 w-4 mr-2" />
              Set as Upcoming
            </Button>
            <Button
              variant={formData.status === "live" ? "destructive" : "outline"}
              className={formData.status === "live" ? "bg-red-500 text-white" : "btn-black bg-transparent"}
              onClick={() => handleStatusChange("live")}
            >
              <Activity className="h-4 w-4 mr-2" />
              Start Live Match
            </Button>
            <Button
              variant={formData.status === "finished" ? "default" : "outline"}
              className={formData.status === "finished" ? "bg-green-600 text-white" : "btn-black bg-transparent"}
              onClick={() => handleStatusChange("finished")}
            >
              <Trophy className="h-4 w-4 mr-2" />
              Mark as Finished
            </Button>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Match Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-gold-400" />
                  Match Details
                </CardTitle>
                <CardDescription className="text-gray-400">Basic information about the match</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="homeTeam" className="text-white">
                      Home Team
                    </Label>
                    <Select value={formData.homeTeam} onValueChange={(value) => handleInputChange("homeTeam", value)}>
                      <SelectTrigger className="bg-black-800 border-gold-400/30 text-white">
                        <SelectValue placeholder="Select home team" />
                      </SelectTrigger>
                      <SelectContent className="bg-black-800 border-gold-400/20">
                        {popularTeams.map((team) => (
                          <SelectItem key={team} value={team} className="text-gold-400">
                            {team}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="awayTeam" className="text-white">
                      Away Team
                    </Label>
                    <Select value={formData.awayTeam} onValueChange={(value) => handleInputChange("awayTeam", value)}>
                      <SelectTrigger className="bg-black-800 border-gold-400/30 text-white">
                        <SelectValue placeholder="Select away team" />
                      </SelectTrigger>
                      <SelectContent className="bg-black-800 border-gold-400/20">
                        {popularTeams.map((team) => (
                          <SelectItem key={team} value={team} className="text-gold-400">
                            {team}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.isLive && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-medium flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-red-400" />
                        Live Match Control
                      </h4>
                      <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Home Score</Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="btn-black bg-transparent"
                            onClick={() => setHomeScore(Math.max(0, homeScore - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={homeScore}
                            onChange={(e) => setHomeScore(Number.parseInt(e.target.value) || 0)}
                            className="text-center bg-black-800 border-gold-400/30 text-white"
                            min="0"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="btn-black bg-transparent"
                            onClick={() => setHomeScore(homeScore + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Current Minute</Label>
                        <Input
                          type="number"
                          value={currentMinute}
                          onChange={(e) => setCurrentMinute(Number.parseInt(e.target.value) || 0)}
                          className="text-center bg-black-800 border-gold-400/30 text-white"
                          min="0"
                          max="120"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Away Score</Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="btn-black bg-transparent"
                            onClick={() => setAwayScore(Math.max(0, awayScore - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={awayScore}
                            onChange={(e) => setAwayScore(Number.parseInt(e.target.value) || 0)}
                            className="text-center bg-black-800 border-gold-400/30 text-white"
                            min="0"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="btn-black bg-transparent"
                            onClick={() => setAwayScore(awayScore + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm">
                        Live updates will be broadcast to all users in real-time
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Match Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter match description or notes..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gold-400" />
                  Venue & Location
                </CardTitle>
                <CardDescription className="text-gray-400">Match venue and location details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="venue" className="text-white">
                      Venue
                    </Label>
                    <Input
                      id="venue"
                      placeholder="Enter stadium name"
                      value={formData.venue}
                      onChange={(e) => handleInputChange("venue", e.target.value)}
                      className="bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-white">
                      State
                    </Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger className="bg-black-800 border-gold-400/30 text-white">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent className="bg-black-800 border-gold-400/20">
                        {nigerianStates.map((state) => (
                          <SelectItem key={state} value={state} className="text-gold-400">
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity" className="text-white">
                      Stadium Capacity
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="Enter capacity"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange("capacity", e.target.value)}
                      className="bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ticketPrice" className="text-white">
                      Ticket Price Range
                    </Label>
                    <Input
                      id="ticketPrice"
                      placeholder="e.g., ₦2,000 - ₦10,000"
                      value={formData.ticketPrice}
                      onChange={(e) => handleInputChange("ticketPrice", e.target.value)}
                      className="bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Schedule & Settings */}
          <div className="space-y-6">
            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-gold-400" />
                  Schedule
                </CardTitle>
                <CardDescription className="text-gray-400">Match date and time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Match Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal btn-black bg-transparent"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {matchDate ? format(matchDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-black-800 border-gold-400/20">
                      <Calendar
                        mode="single"
                        selected={matchDate}
                        onSelect={setMatchDate}
                        initialFocus
                        className="text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-white">
                    Match Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="bg-black-800 border-gold-400/30 text-white focus:border-gold-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referee" className="text-white">
                    Referee
                  </Label>
                  <Input
                    id="referee"
                    placeholder="Enter referee name"
                    value={formData.referee}
                    onChange={(e) => handleInputChange("referee", e.target.value)}
                    className="bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="card-black-gold">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-gold-400" />
                  Match Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Additional match configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange("featured", checked as boolean)}
                    className="border-gold-400/30 data-[state=checked]:bg-gold-400 data-[state=checked]:text-black"
                  />
                  <Label htmlFor="featured" className="text-white">
                    Featured Match
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowBetting"
                    checked={formData.allowBetting}
                    onCheckedChange={(checked) => handleInputChange("allowBetting", checked as boolean)}
                    className="border-gold-400/30 data-[state=checked]:bg-gold-400 data-[state=checked]:text-black"
                  />
                  <Label htmlFor="allowBetting" className="text-white">
                    Allow Betting
                  </Label>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1 btn-gold">
                <Save className="h-4 w-4 mr-2" />
                Update Match
              </Button>
              <Button type="button" variant="outline" className="btn-black bg-transparent" asChild>
                <Link href="/admin/matches">Cancel</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
