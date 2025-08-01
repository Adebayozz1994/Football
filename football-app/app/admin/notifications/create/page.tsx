"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, ClockIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export default function CreateNotificationPage() {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [type, setType] = useState("info") // 'info', 'warning', 'success', 'error'
  const [channel, setChannel] = useState("in-app") // 'in-app', 'email', 'push', 'sms'
  const [audience, setAudience] = useState("all") // 'all', 'segments', 'individual'
  const [segment, setSegment] = useState("")
  const [individualUser, setIndividualUser] = useState("")
  const [scheduleType, setScheduleType] = useState("now") // 'now', 'scheduled'
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(new Date())
  const [scheduledTime, setScheduledTime] = useState("")
  const [requiresAction, setRequiresAction] = useState(false)
  const [actionText, setActionText] = useState("")
  const [actionUrl, setActionUrl] = useState("")
  const [expiryDate, setExpiryDate] = useState<Date | undefined>()
  const [expiryTime, setExpiryTime] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({
      title,
      message,
      type,
      channel,
      audience,
      segment,
      individualUser,
      scheduleType,
      scheduledDate,
      scheduledTime,
      requiresAction,
      actionText,
      actionUrl,
      expiryDate,
      expiryTime,
    })
    // Reset form or show success message
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Notification</h1>
        <p className="text-muted-foreground">Compose and send notifications to your users.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Content</CardTitle>
            <CardDescription>Define the message and type of your notification.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter notification title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your notification message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Notification Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="channel">Delivery Channel</Label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger id="channel">
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-app">In-App</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="push">Push Notification</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Target Audience</CardTitle>
            <CardDescription>Choose who will receive this notification.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={audience} onValueChange={setAudience} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="audience-all" />
                <Label htmlFor="audience-all">All Users</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="segments" id="audience-segments" />
                <Label htmlFor="audience-segments">Specific Segments</Label>
              </div>
              {audience === "segments" && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="segment">Select Segment</Label>
                  <Select value={segment} onValueChange={setSegment}>
                    <SelectTrigger id="segment">
                      <SelectValue placeholder="Select a user segment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premium">Premium Users</SelectItem>
                      <SelectItem value="active">Active Users</SelectItem>
                      <SelectItem value="new">New Signups</SelectItem>
                      <SelectItem value="inactive">Inactive Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="audience-individual" />
                <Label htmlFor="audience-individual">Individual User</Label>
              </div>
              {audience === "individual" && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="individualUser">User ID or Email</Label>
                  <Input
                    id="individualUser"
                    placeholder="Enter user ID or email"
                    value={individualUser}
                    onChange={(e) => setIndividualUser(e.target.value)}
                  />
                </div>
              )}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduling & Expiry</CardTitle>
            <CardDescription>Decide when to send and when the notification should expire.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label>Send Time</Label>
              <RadioGroup value={scheduleType} onValueChange={setScheduleType} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="now" id="schedule-now" />
                  <Label htmlFor="schedule-now">Send Now</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scheduled" id="schedule-scheduled" />
                  <Label htmlFor="schedule-scheduled">Schedule for Later</Label>
                </div>
              </RadioGroup>
            </div>
            {scheduleType === "scheduled" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate">Scheduled Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !scheduledDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={scheduledDate} onSelect={setScheduledDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduledTime">Scheduled Time</Label>
                  <div className="relative">
                    <Input
                      id="scheduledTime"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="pr-8"
                    />
                    <ClockIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center space-x-2 md:col-span-2">
              <Switch id="requiresAction" checked={requiresAction} onCheckedChange={setRequiresAction} />
              <Label htmlFor="requiresAction">Requires User Action (Call to Action)</Label>
            </div>
            {requiresAction && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="actionText">Action Button Text</Label>
                  <Input
                    id="actionText"
                    placeholder="e.g., View Details"
                    value={actionText}
                    onChange={(e) => setActionText(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actionUrl">Action URL</Label>
                  <Input
                    id="actionUrl"
                    type="url"
                    placeholder="e.g., https://your-app.com/details"
                    value={actionUrl}
                    onChange={(e) => setActionUrl(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !expiryDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expiryDate ? format(expiryDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={expiryDate} onSelect={setExpiryDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryTime">Expiry Time (Optional)</Label>
              <div className="relative">
                <Input
                  id="expiryTime"
                  type="time"
                  value={expiryTime}
                  onChange={(e) => setExpiryTime(e.target.value)}
                  className="pr-8"
                />
                <ClockIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Create Notification</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
