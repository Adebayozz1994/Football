"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Zap, Save, Play, Eye, ArrowRight, Clock, Users, Bell, Target, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

const triggerTypes = [
  {
    id: "user_registration",
    name: "User Registration",
    description: "Trigger when a new user registers",
    icon: "👋",
    category: "User Events",
    conditions: [
      { id: "immediately", name: "Immediately", delay: 0 },
      { id: "after_5_minutes", name: "After 5 minutes", delay: 5 },
      { id: "after_1_hour", name: "After 1 hour", delay: 60 },
      { id: "after_24_hours", name: "After 24 hours", delay: 1440 },
    ],
  },
  {
    id: "user_inactivity",
    name: "User Inactivity",
    description: "Trigger when user hasn't been active",
    icon: "😴",
    category: "User Events",
    conditions: [
      { id: "3_days_inactive", name: "3 days inactive", delay: 3 * 24 * 60 },
      { id: "7_days_inactive", name: "7 days inactive", delay: 7 * 24 * 60 },
      { id: "14_days_inactive", name: "14 days inactive", delay: 14 * 24 * 60 },
      { id: "30_days_inactive", name: "30 days inactive", delay: 30 * 24 * 60 },
    ],
  },
  {
    id: "match_starting",
    name: "Match Starting",
    description: "Trigger before a match starts",
    icon: "⚽",
    category: "Match Events",
    conditions: [
      { id: "15_minutes_before", name: "15 minutes before", delay: 15 },
      { id: "30_minutes_before", name: "30 minutes before", delay: 30 },
      { id: "1_hour_before", name: "1 hour before", delay: 60 },
      { id: "2_hours_before", name: "2 hours before", delay: 120 },
    ],
  },
  {
    id: "goal_scored",
    name: "Goal Scored",
    description: "Trigger when a goal is scored",
    icon: "🥅",
    category: "Match Events",
    conditions: [
      { id: "immediately", name: "Immediately", delay: 0 },
      { id: "after_1_minute", name: "After 1 minute", delay: 1 },
    ],
  },
  {
    id: "match_ended",
    name: "Match Ended",
    description: "Trigger when a match ends",
    icon: "🏁",
    category: "Match Events",
    conditions: [
      { id: "immediately", name: "Immediately", delay: 0 },
      { id: "after_5_minutes", name: "After 5 minutes", delay: 5 },
      { id: "after_30_minutes", name: "After 30 minutes", delay: 30 },
    ],
  },
  {
    id: "news_published",
    name: "News Published",
    description: "Trigger when news is published",
    icon: "📰",
    category: "Content Events",
    conditions: [
      { id: "immediately", name: "Immediately", delay: 0 },
      { id: "breaking_news_only", name: "Breaking news only", delay: 0 },
      { id: "after_5_minutes", name: "After 5 minutes", delay: 5 },
    ],
  },
  {
    id: "trial_expiring",
    name: "Trial Expiring",
    description: "Trigger before trial expires",
    icon: "⏰",
    category: "Subscription Events",
    conditions: [
      { id: "1_day_before", name: "1 day before", delay: 24 * 60 },
      { id: "3_days_before", name: "3 days before", delay: 3 * 24 * 60 },
      { id: "7_days_before", name: "7 days before", delay: 7 * 24 * 60 },
    ],
  },
  {
    id: "team_victory",
    name: "Team Victory",
    description: "Trigger when user's favorite team wins",
    icon: "🏆",
    category: "Match Events",
    conditions: [
      { id: "immediately", name: "Immediately", delay: 0 },
      { id: "after_5_minutes", name: "After 5 minutes", delay: 5 },
    ],
  },
]

const notificationTemplates = [
  { id: "welcome_message", name: "Welcome Message", description: "Welcome new users to the platform" },
  { id: "match_reminder", name: "Match Reminder", description: "Remind users about upcoming matches" },
  { id: "goal_alert", name: "Goal Alert", description: "Alert users when goals are scored" },
  { id: "comeback_message", name: "Come Back Message", description: "Re-engage inactive users" },
  { id: "breaking_news", name: "Breaking News", description: "Alert users about breaking news" },
  { id: "trial_expiry_warning", name: "Trial Expiry Warning", description: "Warn users about trial expiration" },
  { id: "team_victory", name: "Team Victory", description: "Celebrate team victories with fans" },
  { id: "custom", name: "Custom Template", description: "Create a custom notification template" },
]

const audienceSegments = [
  { id: "all_users", name: "All Users", count: 25680 },
  { id: "new_users", name: "New Users", count: 1250 },
  { id: "active_users", name: "Active Users", count: 18950 },
  { id: "inactive_users", name: "Inactive Users", count: 3450 },
  { id: "premium_users", name: "Premium Users", count: 5420 },
  { id: "trial_users", name: "Trial Users", count: 890 },
  { id: "match_followers", name: "Match Followers", count: 12340 },
  { id: "news_readers", name: "News Readers", count: 15670 },
  { id: "team_fans", name: "Team Fans", count: 8920 },
]

export default function CreateAutomationPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [triggerType, setTriggerType] = useState("")
  const [triggerCondition, setTriggerCondition] = useState("")
  const [customDelay, setCustomDelay] = useState([0])
  const [useCustomDelay, setUseCustomDelay] = useState(false)
  const [template, setTemplate] = useState("")
  const [audience, setAudience] = useState("")
  const [enabled, setEnabled] = useState(true)
  const [priority, setPriority] = useState("normal")
  const [maxFrequency, setMaxFrequency] = useState("unlimited")
  const [customTitle, setCustomTitle] = useState("")
  const [customMessage, setCustomMessage] = useState("")

  const selectedTrigger = triggerTypes.find((t) => t.id === triggerType)
  const selectedCondition = selectedTrigger?.conditions.find((c) => c.id === triggerCondition)
  const selectedTemplate = notificationTemplates.find((t) => t.id === template)
  const selectedAudience = audienceSegments.find((a) => a.id === audience)

  const getDelayText = (minutes: number) => {
    if (minutes === 0) return "Instant"
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""}`
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hour${Math.floor(minutes / 60) > 1 ? "s" : ""}`
    return `${Math.floor(minutes / 1440)} day${Math.floor(minutes / 1440) > 1 ? "s" : ""}`
  }

  const handleSave = () => {
    console.log("Saving automation:", {
      name,
      description,
      triggerType,
      triggerCondition,
      delay: useCustomDelay ? customDelay[0] : selectedCondition?.delay,
      template,
      audience,
      enabled,
      priority,
      maxFrequency,
      customTitle: template === "custom" ? customTitle : undefined,
      customMessage: template === "custom" ? customMessage : undefined,
    })
  }

  const handleTest = () => {
    console.log("Testing automation...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Create Automation Rule
            </h1>
            <p className="text-gray-400 mt-1">Set up automated notifications based on user behavior</p>
          </div>
          <Link href="/admin/notifications/automation">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
              Back to Automation
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Automation Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                    <TabsTrigger
                      value="basic"
                      className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black"
                    >
                      Basic
                    </TabsTrigger>
                    <TabsTrigger
                      value="trigger"
                      className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black"
                    >
                      Trigger
                    </TabsTrigger>
                    <TabsTrigger
                      value="action"
                      className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black"
                    >
                      Action
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black"
                    >
                      Settings
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-6 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Rule Name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter automation rule name..."
                        className="bg-black/50 border-gray-700 text-white placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-white">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe what this automation does..."
                        className="bg-black/50 border-gray-700 text-white placeholder-gray-400 min-h-[100px]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Enable Rule</Label>
                        <p className="text-sm text-gray-400">Activate this automation rule</p>
                      </div>
                      <Switch checked={enabled} onCheckedChange={setEnabled} />
                    </div>
                  </TabsContent>

                  <TabsContent value="trigger" className="space-y-6 mt-6">
                    <div className="space-y-2">
                      <Label className="text-white">Trigger Event</Label>
                      <Select value={triggerType} onValueChange={setTriggerType}>
                        <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                          <SelectValue placeholder="Select trigger event" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          {Object.entries(
                            triggerTypes.reduce(
                              (acc, trigger) => {
                                if (!acc[trigger.category]) acc[trigger.category] = []
                                acc[trigger.category].push(trigger)
                                return acc
                              },
                              {} as Record<string, typeof triggerTypes>,
                            ),
                          ).map(([category, triggers]) => (
                            <div key={category}>
                              <div className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                {category}
                              </div>
                              {triggers.map((trigger) => (
                                <SelectItem key={trigger.id} value={trigger.id}>
                                  <div className="flex items-center gap-2">
                                    <span>{trigger.icon}</span>
                                    <div>
                                      <div>{trigger.name}</div>
                                      <div className="text-xs text-gray-400">{trigger.description}</div>
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedTrigger && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-white">Trigger Condition</Label>
                          <Select value={triggerCondition} onValueChange={setTriggerCondition}>
                            <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-gray-700">
                              {selectedTrigger.conditions.map((condition) => (
                                <SelectItem key={condition.id} value={condition.id}>
                                  {condition.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-white">Custom Delay</Label>
                              <p className="text-sm text-gray-400">Override the default delay</p>
                            </div>
                            <Switch checked={useCustomDelay} onCheckedChange={setUseCustomDelay} />
                          </div>

                          {useCustomDelay && (
                            <div className="space-y-2">
                              <Label className="text-white">Delay: {getDelayText(customDelay[0])}</Label>
                              <Slider
                                value={customDelay}
                                onValueChange={setCustomDelay}
                                max={10080} // 7 days in minutes
                                step={5}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-gray-400">
                                <span>Instant</span>
                                <span>7 days</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="action" className="space-y-6 mt-6">
                    <div className="space-y-2">
                      <Label className="text-white">Notification Template</Label>
                      <Select value={template} onValueChange={setTemplate}>
                        <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                          <SelectValue placeholder="Select notification template" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          {notificationTemplates.map((tmpl) => (
                            <SelectItem key={tmpl.id} value={tmpl.id}>
                              <div>
                                <div>{tmpl.name}</div>
                                <div className="text-xs text-gray-400">{tmpl.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {template === "custom" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="customTitle" className="text-white">
                            Custom Title
                          </Label>
                          <Input
                            id="customTitle"
                            value={customTitle}
                            onChange={(e) => setCustomTitle(e.target.value)}
                            placeholder="Enter notification title..."
                            className="bg-black/50 border-gray-700 text-white placeholder-gray-400"
                            maxLength={50}
                          />
                          <p className="text-xs text-gray-500">{customTitle.length}/50 characters</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="customMessage" className="text-white">
                            Custom Message
                          </Label>
                          <Textarea
                            id="customMessage"
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            placeholder="Enter notification message..."
                            className="bg-black/50 border-gray-700 text-white placeholder-gray-400 min-h-[100px]"
                            maxLength={200}
                          />
                          <p className="text-xs text-gray-500">{customMessage.length}/200 characters</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label className="text-white">Target Audience</Label>
                      <Select value={audience} onValueChange={setAudience}>
                        <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                          <SelectValue placeholder="Select target audience" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          {audienceSegments.map((segment) => (
                            <SelectItem key={segment.id} value={segment.id}>
                              <div className="flex justify-between items-center w-full">
                                <span>{segment.name}</span>
                                <span className="text-xs text-gray-400 ml-2">
                                  {segment.count.toLocaleString()} users
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedAudience && (
                        <div className="p-3 bg-gray-800/50 rounded-lg">
                          <p className="text-sm text-gray-300">
                            This automation will target {selectedAudience.count.toLocaleString()} users
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-6 mt-6">
                    <div className="space-y-2">
                      <Label className="text-white">Priority</Label>
                      <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="normal">Normal Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Frequency Limit</Label>
                      <Select value={maxFrequency} onValueChange={setMaxFrequency}>
                        <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                          <SelectItem value="once_per_hour">Once per hour</SelectItem>
                          <SelectItem value="once_per_day">Once per day</SelectItem>
                          <SelectItem value="once_per_week">Once per week</SelectItem>
                          <SelectItem value="once_per_month">Once per month</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-400">
                        Limit how often this automation can trigger for the same user
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            {/* Preview */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="h-5 w-5 text-yellow-400" />
                  Automation Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Flow Visualization */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Target className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Trigger</p>
                      <p className="text-xs text-gray-400">
                        {selectedTrigger ? selectedTrigger.name : "Select trigger"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-gray-500" />
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="h-4 w-4 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Delay</p>
                      <p className="text-xs text-gray-400">
                        {useCustomDelay
                          ? getDelayText(customDelay[0])
                          : selectedCondition
                            ? getDelayText(selectedCondition.delay)
                            : "No delay"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-gray-500" />
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Bell className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Action</p>
                      <p className="text-xs text-gray-400">
                        {selectedTemplate ? selectedTemplate.name : "Select template"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Audience Info */}
                {selectedAudience && (
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium text-white">Target Audience</span>
                    </div>
                    <p className="text-sm text-gray-300">{selectedAudience.name}</p>
                    <p className="text-xs text-gray-400">{selectedAudience.count.toLocaleString()} users</p>
                  </div>
                )}

                {/* Status */}
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    {enabled ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    )}
                    <span className="text-sm font-medium text-white">Status</span>
                  </div>
                  <Badge className={enabled ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"}>
                    {enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold"
                  disabled={!name || !triggerType || !template || !audience}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Automation
                </Button>

                <Button
                  onClick={handleTest}
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  disabled={!name || !triggerType || !template || !audience}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Test Automation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
