"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  Edit,
  Play,
  Pause,
  Trash2,
  ArrowRight,
  Clock,
  Bell,
  Target,
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for automation details
const automationDetails = {
  id: 1,
  name: "Welcome New Users",
  description: "Send welcome notification to users after registration",
  trigger: {
    type: "user_registration",
    typeName: "User Registration",
    condition: "immediately",
    conditionName: "Immediately",
    delay: 0,
  },
  action: {
    type: "send_notification",
    template: "welcome_message",
    templateName: "Welcome Message",
    audience: "new_users",
    audienceName: "New Users",
    audienceCount: 1250,
  },
  status: "active",
  created: "2024-01-10T09:00:00Z",
  lastTriggered: "2024-01-15T14:30:00Z",
  lastModified: "2024-01-12T16:45:00Z",
  totalTriggers: 1250,
  successRate: 98.5,
  enabled: true,
  priority: "normal",
  maxFrequency: "unlimited",
  settings: {
    sound: "default",
    vibration: true,
    customTitle: "Welcome to Football App! ⚽",
    customMessage: "Get ready for the ultimate football experience with live scores, news, and more!",
  },
}

// Mock analytics data
const analyticsData = {
  triggers: [
    { date: "2024-01-09", count: 45 },
    { date: "2024-01-10", count: 67 },
    { date: "2024-01-11", count: 89 },
    { date: "2024-01-12", count: 123 },
    { date: "2024-01-13", count: 156 },
    { date: "2024-01-14", count: 234 },
    { date: "2024-01-15", count: 189 },
  ],
  performance: {
    delivered: 1230,
    opened: 1012,
    clicked: 456,
    deliveryRate: 98.4,
    openRate: 82.3,
    clickRate: 45.1,
  },
  recentTriggers: [
    {
      id: 1,
      userId: "user_123",
      userName: "John Doe",
      triggeredAt: "2024-01-15T14:30:00Z",
      status: "delivered",
      opened: true,
      clicked: false,
    },
    {
      id: 2,
      userId: "user_456",
      userName: "Jane Smith",
      triggeredAt: "2024-01-15T14:25:00Z",
      status: "delivered",
      opened: true,
      clicked: true,
    },
    {
      id: 3,
      userId: "user_789",
      userName: "Mike Johnson",
      triggeredAt: "2024-01-15T14:20:00Z",
      status: "delivered",
      opened: false,
      clicked: false,
    },
    {
      id: 4,
      userId: "user_101",
      userName: "Sarah Wilson",
      triggeredAt: "2024-01-15T14:15:00Z",
      status: "failed",
      opened: false,
      clicked: false,
    },
    {
      id: 5,
      userId: "user_112",
      userName: "David Brown",
      triggeredAt: "2024-01-15T14:10:00Z",
      status: "delivered",
      opened: true,
      clicked: true,
    },
  ],
}

export default function AutomationDetailsPage() {
  const params = useParams()
  const [enabled, setEnabled] = useState(automationDetails.enabled)

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

  const getDelayText = (minutes: number) => {
    if (minutes === 0) return "Instant"
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""}`
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hour${Math.floor(minutes / 60) > 1 ? "s" : ""}`
    return `${Math.floor(minutes / 1440)} day${Math.floor(minutes / 1440) > 1 ? "s" : ""}`
  }

  const getTriggerStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const toggleAutomation = (enabled: boolean) => {
    setEnabled(enabled)
    console.log(`Toggling automation to ${enabled ? "enabled" : "disabled"}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              {automationDetails.name}
            </h1>
            <p className="text-gray-400 mt-1">{automationDetails.description}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/notifications/automation">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                Back to Automation
              </Button>
            </Link>
            <Link href={`/admin/notifications/automation/${params.id}/edit`}>
              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold">
                <Edit className="h-4 w-4 mr-2" />
                Edit Rule
              </Button>
            </Link>
          </div>
        </div>

        {/* Status and Controls */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(automationDetails.status)}
                  <Badge className={`${getStatusColor(automationDetails.status)} capitalize`}>
                    {automationDetails.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">Enable Rule:</span>
                  <Switch checked={enabled} onCheckedChange={toggleAutomation} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Test Rule
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black"
                >
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      Automation Flow
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Flow Visualization */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Target className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">Trigger Event</h3>
                          <p className="text-gray-400">{automationDetails.trigger.typeName}</p>
                          <p className="text-sm text-gray-500">Condition: {automationDetails.trigger.conditionName}</p>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <ArrowRight className="h-6 w-6 text-gray-500" />
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                          <Clock className="h-6 w-6 text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">Delay</h3>
                          <p className="text-gray-400">{getDelayText(automationDetails.trigger.delay)}</p>
                          <p className="text-sm text-gray-500">
                            Priority: {automationDetails.priority} | Frequency: {automationDetails.maxFrequency}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <ArrowRight className="h-6 w-6 text-gray-500" />
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Bell className="h-6 w-6 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">Send Notification</h3>
                          <p className="text-gray-400">{automationDetails.action.templateName}</p>
                          <p className="text-sm text-gray-500">
                            To: {automationDetails.action.audienceName} (
                            {automationDetails.action.audienceCount.toLocaleString()} users)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Notification Preview */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">Notification Preview</h4>
                      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center text-black font-bold text-sm">
                            FA
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-white font-medium text-sm">Football App</p>
                              <p className="text-gray-400 text-xs">now</p>
                            </div>
                            <p className="text-white font-semibold text-sm mb-1">
                              {automationDetails.settings.customTitle}
                            </p>
                            <p className="text-gray-300 text-sm">{automationDetails.settings.customMessage}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="space-y-6">
                  {/* Performance Metrics */}
                  <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-yellow-400" />
                        Performance Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-white">{analyticsData.performance.delivered}</p>
                          <p className="text-sm text-gray-400">Delivered</p>
                          <p className="text-xs text-green-400">{analyticsData.performance.deliveryRate}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-white">{analyticsData.performance.opened}</p>
                          <p className="text-sm text-gray-400">Opened</p>
                          <p className="text-xs text-blue-400">{analyticsData.performance.openRate}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-white">{analyticsData.performance.clicked}</p>
                          <p className="text-sm text-gray-400">Clicked</p>
                          <p className="text-xs text-purple-400">{analyticsData.performance.clickRate}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-white">{automationDetails.totalTriggers}</p>
                          <p className="text-sm text-gray-400">Total Triggers</p>
                          <p className="text-xs text-yellow-400">{automationDetails.successRate}% success</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trigger Chart */}
                  <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-yellow-400" />
                        Trigger Activity (Last 7 Days)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analyticsData.triggers.map((day, index) => (
                          <div key={day.date} className="flex items-center gap-4">
                            <div className="w-20 text-sm text-gray-400">
                              {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </div>
                            <div className="flex-1 bg-gray-800 rounded-full h-2 relative">
                              <div
                                className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-2 rounded-full"
                                style={{
                                  width: `${(day.count / Math.max(...analyticsData.triggers.map((d) => d.count))) * 100}%`,
                                }}
                              />
                            </div>
                            <div className="w-12 text-sm text-white font-medium text-right">{day.count}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="h-5 w-5 text-yellow-400" />
                      Recent Triggers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {analyticsData.recentTriggers.map((trigger, index) => (
                        <div
                          key={trigger.id}
                          className={`p-4 border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                            index === analyticsData.recentTriggers.length - 1 ? "border-b-0" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {getTriggerStatusIcon(trigger.status)}
                              <div>
                                <p className="font-medium text-white">{trigger.userName}</p>
                                <p className="text-sm text-gray-400">
                                  {new Date(trigger.triggeredAt).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">Opened:</span>
                                <Badge
                                  className={
                                    trigger.opened ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"
                                  }
                                >
                                  {trigger.opened ? "Yes" : "No"}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">Clicked:</span>
                                <Badge
                                  className={
                                    trigger.clicked ? "bg-blue-500/20 text-blue-300" : "bg-gray-500/20 text-gray-300"
                                  }
                                >
                                  {trigger.clicked ? "Yes" : "No"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Triggers</span>
                  <span className="font-semibold text-white">{automationDetails.totalTriggers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="font-semibold text-white">{automationDetails.successRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Target Audience</span>
                  <span className="font-semibold text-white">
                    {automationDetails.action.audienceCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Priority</span>
                  <Badge className="bg-blue-500/20 text-blue-300 capitalize">{automationDetails.priority}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-yellow-400" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-white">Created</p>
                    <p className="text-xs text-gray-400">{new Date(automationDetails.created).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-white">Last Modified</p>
                    <p className="text-xs text-gray-400">
                      {new Date(automationDetails.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-white">Last Triggered</p>
                    <p className="text-xs text-gray-400">
                      {new Date(automationDetails.lastTriggered).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settings Summary */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-yellow-400" />
                  Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-white">Trigger Type</p>
                  <p className="text-xs text-gray-400">{automationDetails.trigger.typeName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Condition</p>
                  <p className="text-xs text-gray-400">{automationDetails.trigger.conditionName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Template</p>
                  <p className="text-xs text-gray-400">{automationDetails.action.templateName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Frequency Limit</p>
                  <p className="text-xs text-gray-400 capitalize">{automationDetails.maxFrequency.replace("_", " ")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
