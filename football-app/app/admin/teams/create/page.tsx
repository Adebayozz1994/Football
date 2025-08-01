"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusCircle, XCircle } from "lucide-react"

export default function CreateTeamPage() {
  const [teamName, setTeamName] = useState("")
  const [shortName, setShortName] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [stadium, setStadium] = useState("")
  const [foundedYear, setFoundedYear] = useState("")
  const [coach, setCoach] = useState("")
  const [description, setDescription] = useState("")
  const [players, setPlayers] = useState([{ name: "", position: "", jerseyNumber: "" }])
  const [achievements, setAchievements] = useState([{ title: "", year: "" }])

  const handleAddPlayer = () => {
    setPlayers([...players, { name: "", position: "", jerseyNumber: "" }])
  }

  const handleRemovePlayer = (index: number) => {
    const newPlayers = players.filter((_, i) => i !== index)
    setPlayers(newPlayers)
  }

  const handlePlayerChange = (index: number, field: string, value: string) => {
    const newPlayers = [...players]
    // @ts-ignore
    newPlayers[index][field] = value
    setPlayers(newPlayers)
  }

  const handleAddAchievement = () => {
    setAchievements([...achievements, { title: "", year: "" }])
  }

  const handleRemoveAchievement = (index: number) => {
    const newAchievements = achievements.filter((_, i) => i !== index)
    setAchievements(newAchievements)
  }

  const handleAchievementChange = (index: number, field: string, value: string) => {
    const newAchievements = [...achievements]
    // @ts-ignore
    newAchievements[index][field] = value
    setAchievements(newAchievements)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({
      teamName,
      shortName,
      country,
      city,
      stadium,
      foundedYear,
      coach,
      description,
      players,
      achievements,
    })
    // Reset form or show success message
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Team</h1>
        <p className="text-muted-foreground">Enter the details to add a new football team to the platform.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Information</CardTitle>
            <CardDescription>Basic details about the team.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                placeholder="e.g., Lagos United"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortName">Short Name (e.g., LGU)</Label>
              <Input
                id="shortName"
                placeholder="e.g., LGU"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="e.g., Nigeria"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="e.g., Lagos"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stadium">Stadium</Label>
              <Input
                id="stadium"
                placeholder="e.g., Teslim Balogun Stadium"
                value={stadium}
                onChange={(e) => setStadium(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="foundedYear">Founded Year</Label>
              <Input
                id="foundedYear"
                type="number"
                placeholder="e.g., 1970"
                value={foundedYear}
                onChange={(e) => setFoundedYear(e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="coach">Current Coach</Label>
              <Input
                id="coach"
                placeholder="e.g., Coach Sunday Oliseh"
                value={coach}
                onChange={(e) => setCoach(e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a brief history or description of the team."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Players</CardTitle>
            <CardDescription>Add players to the team roster.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {players.map((player, index) => (
              <div key={index} className="flex items-end gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`player-name-${index}`}>Player Name</Label>
                  <Input
                    id={`player-name-${index}`}
                    placeholder="Player Name"
                    value={player.name}
                    onChange={(e) => handlePlayerChange(index, "name", e.target.value)}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`player-position-${index}`}>Position</Label>
                  <Input
                    id={`player-position-${index}`}
                    placeholder="e.g., Forward, Goalkeeper"
                    value={player.position}
                    onChange={(e) => handlePlayerChange(index, "position", e.target.value)}
                  />
                </div>
                <div className="w-24 space-y-2">
                  <Label htmlFor={`player-jersey-${index}`}>Jersey #</Label>
                  <Input
                    id={`player-jersey-${index}`}
                    type="number"
                    placeholder="e.g., 10"
                    value={player.jerseyNumber}
                    onChange={(e) => handlePlayerChange(index, "jerseyNumber", e.target.value)}
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemovePlayer(index)}>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="sr-only">Remove player</span>
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddPlayer}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Player
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>List major titles or achievements of the team.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-end gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`achievement-title-${index}`}>Title</Label>
                  <Input
                    id={`achievement-title-${index}`}
                    placeholder="e.g., Premier League Title"
                    value={achievement.title}
                    onChange={(e) => handleAchievementChange(index, "title", e.target.value)}
                  />
                </div>
                <div className="w-24 space-y-2">
                  <Label htmlFor={`achievement-year-${index}`}>Year</Label>
                  <Input
                    id={`achievement-year-${index}`}
                    type="number"
                    placeholder="e.g., 2023"
                    value={achievement.year}
                    onChange={(e) => handleAchievementChange(index, "year", e.target.value)}
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveAchievement(index)}>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="sr-only">Remove achievement</span>
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddAchievement}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Achievement
            </Button>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Create Team</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
