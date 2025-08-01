"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Users,
  UserPlus,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Mail,
  Eye,
  Ban,
  CheckCircle,
  Clock,
  Crown,
  UserCheck,
} from "lucide-react"
import Link from "next/link"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const users = [
    {
      id: 1,
      name: "Adebayo Johnson",
      email: "adebayo.johnson@footballhub.com",
      role: "Super Admin",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2023-01-15",
      lastLogin: "2024-01-15 14:30",
      articlesWritten: 45,
      matchesManaged: 23,
      permissions: ["all"],
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      email: "sarah.mitchell@footballhub.com",
      role: "Editor",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2023-03-20",
      lastLogin: "2024-01-15 12:15",
      articlesWritten: 78,
      matchesManaged: 0,
      permissions: ["news", "categories"],
    },
    {
      id: 3,
      name: "Emeka Okafor",
      email: "emeka.okafor@footballhub.com",
      role: "Match Manager",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2023-05-10",
      lastLogin: "2024-01-15 09:45",
      articlesWritten: 12,
      matchesManaged: 67,
      permissions: ["matches", "teams"],
    },
    {
      id: 4,
      name: "Dr. Funmi Adeyemi",
      email: "funmi.adeyemi@footballhub.com",
      role: "Content Writer",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2023-07-22",
      lastLogin: "2024-01-14 16:20",
      articlesWritten: 34,
      matchesManaged: 0,
      permissions: ["news"],
    },
    {
      id: 5,
      name: "Kemi Ogundimu",
      email: "kemi.ogundimu@footballhub.com",
      role: "Moderator",
      status: "inactive",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2023-09-05",
      lastLogin: "2024-01-10 11:30",
      articlesWritten: 19,
      matchesManaged: 8,
      permissions: ["users", "comments"],
    },
    {
      id: 6,
      name: "Ibrahim Musa",
      email: "ibrahim.musa@footballhub.com",
      role: "Content Writer",
      status: "pending",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-01-12",
      lastLogin: "Never",
      articlesWritten: 0,
      matchesManaged: 0,
      permissions: ["news"],
    },
  ]

  const roles = ["Super Admin", "Editor", "Match Manager", "Content Writer", "Moderator"]
  const statuses = ["active", "inactive", "pending", "suspended"]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-gray-500 text-white">
            <Ban className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500 text-black">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "suspended":
        return (
          <Badge className="bg-red-500 text-white">
            <Ban className="h-3 w-3 mr-1" />
            Suspended
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Super Admin":
        return <Crown className="h-4 w-4 text-gold-400" />
      case "Editor":
        return <Edit className="h-4 w-4 text-blue-400" />
      case "Match Manager":
        return <Shield className="h-4 w-4 text-green-400" />
      case "Content Writer":
        return <Edit className="h-4 w-4 text-purple-400" />
      case "Moderator":
        return <UserCheck className="h-4 w-4 text-orange-400" />
      default:
        return <Users className="h-4 w-4 text-gray-400" />
    }
  }

  const activeUsers = users.filter((user) => user.status === "active").length
  const pendingUsers = users.filter((user) => user.status === "pending").length
  const totalArticles = users.reduce((sum, user) => sum + user.articlesWritten, 0)

  const UserCard = ({ user }: { user: any }) => (
    <Card className="card-black-gold hover:scale-105 transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-gold-400 text-black-900">
                {user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-white group-hover:text-gold-400 transition-colors">{user.name}</CardTitle>
              <CardDescription className="text-gray-400 flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                {user.email}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black-800 border-gold-400/20">
              <DropdownMenuItem className="text-gold-400 hover:bg-gold-400/20">
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gold-400 hover:bg-gold-400/20">
                <Edit className="h-4 w-4 mr-2" />
                Edit User
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:bg-red-400/20">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Role and Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getRoleIcon(user.role)}
            <span className="text-white font-medium">{user.role}</span>
          </div>
          {getStatusBadge(user.status)}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-black-800/50 rounded-lg">
            <p className="text-2xl font-bold text-gold-400">{user.articlesWritten}</p>
            <p className="text-xs text-gray-400">Articles</p>
          </div>
          <div className="text-center p-3 bg-black-800/50 rounded-lg">
            <p className="text-2xl font-bold text-blue-400">{user.matchesManaged}</p>
            <p className="text-xs text-gray-400">Matches</p>
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Joined:</span>
            <span className="text-white">{user.joinDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Last Login:</span>
            <span className="text-white">{user.lastLogin}</span>
          </div>
        </div>

        {/* Permissions */}
        <div>
          <p className="text-sm text-gray-400 mb-2">Permissions:</p>
          <div className="flex flex-wrap gap-1">
            {user.permissions.map((permission: string, index: number) => (
              <Badge key={index} variant="outline" className="border-gold-400/50 text-gold-400 text-xs">
                {permission}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white font-playfair">
              <span className="text-gradient-gold">User</span> Management
            </h1>
            <p className="text-gray-400 mt-2">Manage users, roles, and permissions</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/admin/users/roles">
              <Button
                variant="outline"
                className="border-gold-400/50 text-gold-400 hover:bg-gold-400/20 bg-transparent"
              >
                <Shield className="h-4 w-4 mr-2" />
                Manage Roles
              </Button>
            </Link>
            <Button className="btn-gold">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-white">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-gold-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Users</p>
                  <p className="text-3xl font-bold text-green-400">{activeUsers}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Users</p>
                  <p className="text-3xl font-bold text-yellow-400">{pendingUsers}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Articles</p>
                  <p className="text-3xl font-bold text-blue-400">{totalArticles}</p>
                </div>
                <Edit className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="card-black-gold">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gold-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                />
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full md:w-48 bg-black-800 border-gold-400/30 text-white">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent className="bg-black-800 border-gold-400/20">
                  <SelectItem value="all" className="text-gold-400">
                    All Roles
                  </SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role} className="text-gold-400">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48 bg-black-800 border-gold-400/30 text-white">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="bg-black-800 border-gold-400/20">
                  <SelectItem value="all" className="text-gold-400">
                    All Status
                  </SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status} className="text-gold-400">
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <Card className="card-black-gold">
            <CardContent className="text-center py-12">
              <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Users Found</h3>
              <p className="text-gray-400 mb-6">No users match your current filters</p>
              <Button className="btn-gold">
                <UserPlus className="h-4 w-4 mr-2" />
                Add First User
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
