"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Plus,
  Search,
  Filter,
  Target,
  Edit,
  Trash2,
  Eye,
  MapPin,
  TrendingUp,
  UserCheck,
  UserX,
  Star,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Mock data for audience segments
const audienceSegments = [
  {
    id: 1,
    name: "All Users",
    description: "All registered users on the platform",
    count: 25680,
    active: true,
    criteria: {
      registration: "any",
      activity: "any",
      location: "any",
      subscription: "any",
    },
    growth: "+12.5%",
    lastUpdated: "2024-01-15T10:30:00Z",
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  {
    id: 2,
    name: "Premium Users",
    description: "Users with active premium subscriptions",
    count: 5420,
    active: true,
    criteria: {
      registration: "any",
      activity: "any",
      location: "any",
      subscription: "premium",
    },
    growth: "+8.3%",
    lastUpdated: "2024-01-15T09:15:00Z",
    color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  },
  {
    id: 3,
    name: "Active Users",
    description: "Users active in the last 30 days",
    count: 18950,
    active: true,
    criteria: {
      registration: "any",
      activity: "last_30_days",
      location: "any",
      subscription: "any",
    },
    growth: "+15.7%",
    lastUpdated: "2024-01-15T08:45:00Z",
    color: "bg-green-500/20 text-green-300 border-green-500/30",
  },
  {
    id: 4,
    name: "Match Followers",
    description: "Users who actively follow live matches",
    count: 12340,
    active: true,
    criteria: {
      registration: "any",
      activity: "match_engagement",
      location: "any",
      subscription: "any",
    },
    growth: "+22.1%",
    lastUpdated: "2024-01-15T07:20:00Z",
    color: "bg-red-500/20 text-red-300 border-red-500/30",
  },
  {
    id: 5,
    name: "News Readers",
    description: "Users who regularly read news articles",
    count: 15670,
    active: true,
    criteria: {
      registration: "any",
      activity: "news_engagement",
      location: "any",
      subscription: "any",
    },
    growth: "+9.4%",
    lastUpdated: "2024-01-15T06:10:00Z",
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  {
    id: 6,
    name: "Lagos Users",
    description: "Users located in Lagos State",
    count: 8920,
    active: true,
    criteria: {
      registration: "any",
      activity: "any",
      location: "lagos",
      subscription: "any",
    },
    growth: "+5.2%",
    lastUpdated: "2024-01-15T05:30:00Z",
    color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  },
  {
    id: 7,
    name: "Inactive Users",
    description: "Users who haven't been active in 60+ days",
    count: 3450,
    active: false,
    criteria: {
      registration: "any",
      activity: "inactive_60_days",
      location: "any",
      subscription: "any",
    },
    growth: "-18.3%",
    lastUpdated: "2024-01-14T15:20:00Z",
    color: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  },
]

const locations = [
  "Lagos",
  "Abuja",
  "Kano",
  "Ibadan",
  "Port Harcourt",
  "Benin City",
  "Kaduna",
  "Jos",
  "Ilorin",
  "Enugu",
]

const deviceTypes = ["All Devices", "Android", "iOS", "Web Browser", "Mobile App"]

export default function AudiencePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Create form state
  const [newSegmentName, setNewSegmentName] = useState("")
  const [newSegmentDescription, setNewSegmentDescription] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("any")
  const [selectedDevice, setSelectedDevice] = useState("any")
  const [selectedSubscription, setSelectedSubscription] = useState("any")
  const [selectedActivity, setSelectedActivity] = useState("any")
  const [isActive, setIsActive] = useState(true)

  const filteredSegments = audienceSegments.filter((segment) => {
    const matchesSearch =
      segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      segment.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && segment.active) ||
      (statusFilter === "inactive" && !segment.active)

    return matchesSearch && matchesStatus
  })

  const totalUsers = audienceSegments.reduce((sum, segment) => sum + segment.count, 0)
  const activeSegments = audienceSegments.filter((segment) => segment.active).length
  const averageGrowth =
    audienceSegments.reduce((sum, segment) => {
      const growth = Number.parseFloat(segment.growth.replace("%", ""))
      return sum + growth
    }, 0) / audienceSegments.length

  const handleCreateSegment = () => {
    console.log("Creating new segment:", {
      name: newSegmentName,
      description: newSegmentDescription,
      location: selectedLocation,
      device: selectedDevice,
      subscription: selectedSubscription,
      activity: selectedActivity,
      active: isActive,
    })
    setShowCreateForm(false)
    // Reset form
    setNewSegmentName("")
    setNewSegmentDescription("")
    setSelectedLocation("any")
    setSelectedDevice("any")
    setSelectedSubscription("any")
    setSelectedActivity("any")
    setIsActive(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Target Audience Management
            </h1>
            <p className="text-gray-400 mt-1">Create and manage audience segments for targeted notifications</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/notifications">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                Back to Notifications
              </Button>
            </Link>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Segment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{totalUsers.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Segments</p>
                  <p className="text-2xl font-bold text-white">{activeSegments}</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Target className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Growth</p>
                  <p className="text-2xl font-bold text-white">{averageGrowth.toFixed(1)}%</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Segments</p>
                  <p className="text-2xl font-bold text-white">{audienceSegments.length}</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Filter className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search audience segments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/50 border-gray-700 text-white placeholder-gray-400"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-black/50 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Segments</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Create Segment Form */}
        {showCreateForm && (
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-yellow-400" />
                Create New Audience Segment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="segmentName" className="text-white">
                      Segment Name
                    </Label>
                    <Input
                      id="segmentName"
                      value={newSegmentName}
                      onChange={(e) => setNewSegmentName(e.target.value)}
                      placeholder="Enter segment name..."
                      className="bg-black/50 border-gray-700 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="segmentDescription" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="segmentDescription"
                      value={newSegmentDescription}
                      onChange={(e) => setNewSegmentDescription(e.target.value)}
                      placeholder="Describe this audience segment..."
                      className="bg-black/50 border-gray-700 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Active Segment</Label>
                      <p className="text-sm text-gray-400">Enable this segment for targeting</p>
                    </div>
                    <Switch checked={isActive} onCheckedChange={setIsActive} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Location</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="any">Any Location</SelectItem>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location.toLowerCase()}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Device Type</Label>
                    <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                      <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="any">Any Device</SelectItem>
                        {deviceTypes.slice(1).map((device) => (
                          <SelectItem key={device} value={device.toLowerCase().replace(" ", "_")}>
                            {device}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Subscription Type</Label>
                    <Select value={selectedSubscription} onValueChange={setSelectedSubscription}>
                      <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="any">Any Subscription</SelectItem>
                        <SelectItem value="free">Free Users</SelectItem>
                        <SelectItem value="premium">Premium Users</SelectItem>
                        <SelectItem value="trial">Trial Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Activity Level</Label>
                    <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                      <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="any">Any Activity</SelectItem>
                        <SelectItem value="last_7_days">Active in last 7 days</SelectItem>
                        <SelectItem value="last_30_days">Active in last 30 days</SelectItem>
                        <SelectItem value="match_engagement">Match Followers</SelectItem>
                        <SelectItem value="news_engagement">News Readers</SelectItem>
                        <SelectItem value="inactive_60_days">Inactive 60+ days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleCreateSegment}
                  className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold"
                  disabled={!newSegmentName || !newSegmentDescription}
                >
                  Create Segment
                </Button>
                <Button
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Audience Segments List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSegments.map((segment) => (
            <Card
              key={segment.id}
              className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      {segment.name}
                      {segment.active ? (
                        <UserCheck className="h-4 w-4 text-green-400" />
                      ) : (
                        <UserX className="h-4 w-4 text-red-400" />
                      )}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-1">{segment.description}</CardDescription>
                  </div>
                  <Badge className={segment.color}>{segment.active ? "Active" : "Inactive"}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-2xl font-bold text-white">{segment.count.toLocaleString()}</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      segment.growth.startsWith("+") ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    <TrendingUp className="h-3 w-3" />
                    {segment.growth}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="h-3 w-3" />
                    <span>Location: {segment.criteria.location === "any" ? "All" : segment.criteria.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Star className="h-3 w-3" />
                    <span>
                      Subscription: {segment.criteria.subscription === "any" ? "All" : segment.criteria.subscription}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>Updated: {new Date(segment.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSegments.length === 0 && (
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardContent className="p-12 text-center">
              <Target className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No segments found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm
                  ? "No segments match your search criteria."
                  : "Create your first audience segment to get started."}
              </p>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Segment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
