"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bell,
  Plus,
  Search,
  Send,
  Users,
  Eye,
  Trash2,
  Edit,
  Calendar,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Mock data for notifications
const notifications = [
  {
    id: 1,
    title: "Match Alert: Nigeria vs Ghana",
    message: "Don't miss the big match starting in 30 minutes!",
    type: "match",
    status: "sent",
    audience: "All Users",
    sentAt: "2024-01-15T14:30:00Z",
    delivered: 15420,
    opened: 8750,
    clicked: 2340,
    scheduled: false,
  },
  {
    id: 2,
    title: "Breaking: New Transfer News",
    message: "Victor Osimhen linked with Premier League move",
    type: "news",
    status: "scheduled",
    audience: "Premium Users",
    sentAt: "2024-01-16T09:00:00Z",
    delivered: 0,
    opened: 0,
    clicked: 0,
    scheduled: true,
  },
  {
    id: 3,
    title: "Weekly Roundup",
    message: "Your weekly football digest is ready",
    type: "digest",
    status: "draft",
    audience: "Active Users",
    sentAt: null,
    delivered: 0,
    opened: 0,
    clicked: 0,
    scheduled: false,
  },
  {
    id: 4,
    title: "Goal Alert: Super Eagles Score!",
    message: "Nigeria takes the lead with a brilliant goal!",
    type: "live",
    status: "sent",
    audience: "Match Followers",
    sentAt: "2024-01-14T16:45:00Z",
    delivered: 8920,
    opened: 7650,
    clicked: 1200,
    scheduled: false,
  },
]

const stats = {
  totalSent: 45680,
  totalDelivered: 43250,
  averageOpenRate: 68.5,
  averageClickRate: 15.2,
}

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter
    const matchesType = typeFilter === "all" || notification.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "draft":
        return <AlertCircle className="h-4 w-4 text-gray-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "scheduled":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "draft":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      case "failed":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "match":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "news":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "digest":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "live":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Notifications Management
            </h1>
            <p className="text-gray-400 mt-1">Create, manage and track your push notifications</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/notifications/audience">
              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold">
                <Target className="h-4 w-4 mr-2" />
                Manage Audience
              </Button>
            </Link>
            <Link href="/admin/notifications/create">
              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                Create Notification
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Sent</p>
                  <p className="text-2xl font-bold text-white">{stats.totalSent.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Send className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Delivered</p>
                  <p className="text-2xl font-bold text-white">{stats.totalDelivered.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Open Rate</p>
                  <p className="text-2xl font-bold text-white">{stats.averageOpenRate}%</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Eye className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Click Rate</p>
                  <p className="text-2xl font-bold text-white">{stats.averageClickRate}%</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
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
                  placeholder="Search notifications..."
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
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-black/50 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="match">Match</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="digest">Digest</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-400" />
              Notifications ({filteredNotifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-6 border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                    index === filteredNotifications.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-white text-lg">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(notification.status)}
                          <Badge className={`${getStatusColor(notification.status)} capitalize`}>
                            {notification.status}
                          </Badge>
                          <Badge className={`${getTypeColor(notification.type)} capitalize`}>{notification.type}</Badge>
                        </div>
                      </div>
                      <p className="text-gray-400">{notification.message}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {notification.audience}
                        </span>
                        {notification.sentAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(notification.sentAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                      {notification.status === "sent" && (
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-sm text-gray-400">Delivered</p>
                            <p className="font-semibold text-white">{notification.delivered.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Opened</p>
                            <p className="font-semibold text-white">{notification.opened.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Clicked</p>
                            <p className="font-semibold text-white">{notification.clicked.toLocaleString()}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
