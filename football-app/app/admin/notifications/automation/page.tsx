"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Zap,
  Plus,
  Search,
  Pause,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Bell,
  Clock,
  Target,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

// Mock data for automation rules
const automationRules = [
  {
    id: 1,
    name: "Welcome New Users",
    description: "Send welcome notification to users after registration",
    trigger: {
      type: "user_registration",
      condition: "immediately",
      delay: 0,
    },
    action: {
      type: "send_notification",
      template: "welcome_message",
      audience: "new_users",
    },
    status: "active",
    created: "2024-01-10T09:00:00Z",
    lastTriggered: "2024-01-15T14:30:00Z",
    totalTriggers: 1250,
    successRate: 98.5,
    enabled: true,
  },
  {
    id: 2,
    name: "Match Reminder",
    description: "Remind users about upcoming matches they follow",
    trigger: {
      type: "match_starting",
      condition: "30_minutes_before",
      delay: 30,
    },
    action: {
      type: "send_notification",
      template: "match_reminder",
      audience: "match_followers",
    },
    status: "active",
    created: "2024-01-08T10:15:00Z",
    lastTriggered: "2024-01-15T16:00:00Z",
    totalTriggers: 8920,
    successRate: 94.2,
    enabled: true,
  },
  {
    id: 3,
    name: "Inactive User Re-engagement",
    description: "Re-engage users who haven't opened the app in 7 days",
    trigger: {
      type: "user_inactivity",
      condition: "7_days_inactive",
      delay: 7 * 24 * 60,
    },
    action: {
      type: "send_notification",
      template: "comeback_message",
      audience: "inactive_users",
    },
    status: "active",
    created: "2024-01-05T11:30:00Z",
    lastTriggered: "2024-01-14T09:45:00Z",
    totalTriggers: 450,
    successRate: 76.8,
    enabled: true,
  },
  {
    id: 4,
    name: "Goal Alert",
    description: "Instant notification when a goal is scored in followed matches",
    trigger: {
      type: "goal_scored",
      condition: "immediately",
      delay: 0,
    },
    action: {
      type: "send_notification",
      template: "goal_alert",
      audience: "match_followers",
    },
    status: "active",
    created: "2024-01-12T08:20:00Z",
    lastTriggered: "2024-01-15T17:22:00Z",
    totalTriggers: 2340,
    successRate: 99.1,
    enabled: true,
  },
  {
    id: 5,
    name: "Premium Trial Expiry",
    description: "Notify users 3 days before premium trial expires",
    trigger: {
      type: "trial_expiring",
      condition: "3_days_before",
      delay: 3 * 24 * 60,
    },
    action: {
      type: "send_notification",
      template: "trial_expiry_warning",
      audience: "trial_users",
    },
    status: "paused",
    created: "2024-01-03T15:45:00Z",
    lastTriggered: "2024-01-13T12:10:00Z",
    totalTriggers: 180,
    successRate: 85.6,
    enabled: false,
  },
  {
    id: 6,
    name: "Breaking News Alert",
    description: "Send notification when breaking news is published",
    trigger: {
      type: "news_published",
      condition: "breaking_news_tag",
      delay: 0,
    },
    action: {
      type: "send_notification",
      template: "breaking_news",
      audience: "news_readers",
    },
    status: "active",
    created: "2024-01-07T13:25:00Z",
    lastTriggered: "2024-01-15T11:15:00Z",
    totalTriggers: 67,
    successRate: 92.5,
    enabled: true,
  },
  {
    id: 7,
    name: "Team Victory Celebration",
    description: "Celebrate when user's favorite team wins a match",
    trigger: {
      type: "team_victory",
      condition: "match_ended",
      delay: 5,
    },
    action: {
      type: "send_notification",
      template: "team_victory",
      audience: "team_fans",
    },
    status: "draft",
    created: "2024-01-14T16:30:00Z",
    lastTriggered: null,
    totalTriggers: 0,
    successRate: 0,
    enabled: false,
  },
]

const stats = {
  totalAutomations: automationRules.length,
  activeAutomations: automationRules.filter((rule) => rule.status === "active").length,
  totalTriggers: automationRules.reduce((sum, rule) => sum + rule.totalTriggers, 0),
  averageSuccessRate: automationRules.reduce((sum, rule) => sum + rule.successRate, 0) / automationRules.length,
}

export default function AutomationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [triggerFilter, setTriggerFilter] = useState("all")

  const filteredRules = automationRules.filter((rule) => {
    const matchesSearch =
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || rule.status === statusFilter
    const matchesTrigger = triggerFilter === "all" || rule.trigger.type === triggerFilter

    return matchesSearch && matchesStatus && matchesTrigger
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-500" />
      case "draft":
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "paused":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "draft":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      case "error":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getTriggerTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      user_registration: "User Registration",
      match_starting: "Match Starting",
      user_inactivity: "User Inactivity",
      goal_scored: "Goal Scored",
      trial_expiring: "Trial Expiring",
      news_published: "News Published",
      team_victory: "Team Victory",
    }
    return labels[type] || type
  }

  const toggleAutomation = (id: number, enabled: boolean) => {
    console.log(`Toggling automation ${id} to ${enabled ? "enabled" : "disabled"}`)
    // Handle toggle automation
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Notification Automation
            </h1>
            <p className="text-gray-400 mt-1">Automate notifications based on user behavior and events</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/notifications">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                Back to Notifications
              </Button>
            </Link>
            <Link href="/admin/notifications/automation/create">
              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                Create Automation
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
                  <p className="text-gray-400 text-sm">Total Automations</p>
                  <p className="text-2xl font-bold text-white">{stats.totalAutomations}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Rules</p>
                  <p className="text-2xl font-bold text-white">{stats.activeAutomations}</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Activity className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Triggers</p>
                  <p className="text-2xl font-bold text-white">{stats.totalTriggers.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Bell className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-white">{stats.averageSuccessRate.toFixed(1)}%</p>
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
                  placeholder="Search automation rules..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              <Select value={triggerFilter} onValueChange={setTriggerFilter}>
                <SelectTrigger className="w-full sm:w-[200px] bg-black/50 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by trigger" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Triggers</SelectItem>
                  <SelectItem value="user_registration">User Registration</SelectItem>
                  <SelectItem value="match_starting">Match Starting</SelectItem>
                  <SelectItem value="user_inactivity">User Inactivity</SelectItem>
                  <SelectItem value="goal_scored">Goal Scored</SelectItem>
                  <SelectItem value="trial_expiring">Trial Expiring</SelectItem>
                  <SelectItem value="news_published">News Published</SelectItem>
                  <SelectItem value="team_victory">Team Victory</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Automation Rules List */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Automation Rules ({filteredRules.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredRules.map((rule, index) => (
                <div
                  key={rule.id}
                  className={`p-6 border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                    index === filteredRules.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-white text-lg">{rule.name}</h3>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(rule.status)}
                          <Badge className={`${getStatusColor(rule.status)} capitalize`}>{rule.status}</Badge>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            {getTriggerTypeLabel(rule.trigger.type)}
                          </Badge>
                        </div>
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={(enabled) => toggleAutomation(rule.id, enabled)}
                          className="ml-auto lg:ml-0"
                        />
                      </div>
                      <p className="text-gray-400">{rule.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Created: {new Date(rule.created).toLocaleDateString()}
                        </span>
                        {rule.lastTriggered && (
                          <span className="flex items-center gap-1">
                            <Activity className="h-4 w-4" />
                            Last triggered: {new Date(rule.lastTriggered).toLocaleDateString()}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          {rule.action.audience.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-400">Triggers</p>
                          <p className="font-semibold text-white">{rule.totalTriggers.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Success Rate</p>
                          <p className="font-semibold text-white">{rule.successRate.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Delay</p>
                          <p className="font-semibold text-white">
                            {rule.trigger.delay === 0
                              ? "Instant"
                              : rule.trigger.delay < 60
                                ? `${rule.trigger.delay}m`
                                : rule.trigger.delay < 1440
                                  ? `${Math.floor(rule.trigger.delay / 60)}h`
                                  : `${Math.floor(rule.trigger.delay / 1440)}d`}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/admin/notifications/automation/${rule.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/notifications/automation/${rule.id}/edit`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
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

        {filteredRules.length === 0 && (
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardContent className="p-12 text-center">
              <Zap className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No automation rules found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm
                  ? "No automation rules match your search criteria."
                  : "Create your first automation rule to get started."}
              </p>
              <Link href="/admin/notifications/automation/create">
                <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Automation
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
