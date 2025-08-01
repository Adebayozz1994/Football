"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  Key,
  Shield,
  Users,
  Settings,
  Lock,
  Unlock,
  Eye,
  Edit,
  Trash2,
  Plus,
  FileText,
  Trophy,
  UserCheck,
  MessageSquare,
} from "lucide-react"

export default function PermissionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const permissions = [
    {
      id: "users.create",
      name: "Create Users",
      description: "Ability to create new user accounts",
      category: "Users",
      type: "create",
      isActive: true,
      rolesCount: 1,
      usersCount: 1,
      roles: ["Super Admin"],
    },
    {
      id: "users.read",
      name: "View Users",
      description: "Ability to view user profiles and information",
      category: "Users",
      type: "read",
      isActive: true,
      rolesCount: 3,
      usersCount: 6,
      roles: ["Super Admin", "Editor", "Moderator"],
    },
    {
      id: "users.update",
      name: "Edit Users",
      description: "Ability to modify user accounts and profiles",
      category: "Users",
      type: "update",
      isActive: true,
      rolesCount: 2,
      usersCount: 3,
      roles: ["Super Admin", "Moderator"],
    },
    {
      id: "users.delete",
      name: "Delete Users",
      description: "Ability to permanently delete user accounts",
      category: "Users",
      type: "delete",
      isActive: true,
      rolesCount: 1,
      usersCount: 1,
      roles: ["Super Admin"],
    },
    {
      id: "news.create",
      name: "Create Articles",
      description: "Ability to create and publish news articles",
      category: "News",
      type: "create",
      isActive: true,
      rolesCount: 3,
      usersCount: 9,
      roles: ["Super Admin", "Editor", "Content Writer"],
    },
    {
      id: "news.read",
      name: "View Articles",
      description: "Ability to view and read news articles",
      category: "News",
      type: "read",
      isActive: true,
      rolesCount: 5,
      usersCount: 13,
      roles: ["Super Admin", "Editor", "Match Manager", "Content Writer", "Moderator"],
    },
    {
      id: "news.update",
      name: "Edit Articles",
      description: "Ability to modify existing news articles",
      category: "News",
      type: "update",
      isActive: true,
      rolesCount: 3,
      usersCount: 9,
      roles: ["Super Admin", "Editor", "Content Writer"],
    },
    {
      id: "news.delete",
      name: "Delete Articles",
      description: "Ability to permanently delete news articles",
      category: "News",
      type: "delete",
      isActive: true,
      rolesCount: 2,
      usersCount: 4,
      roles: ["Super Admin", "Editor"],
    },
    {
      id: "matches.create",
      name: "Create Matches",
      description: "Ability to create new match fixtures",
      category: "Matches",
      type: "create",
      isActive: true,
      rolesCount: 2,
      usersCount: 3,
      roles: ["Super Admin", "Match Manager"],
    },
    {
      id: "matches.read",
      name: "View Matches",
      description: "Ability to view match information and results",
      category: "Matches",
      type: "read",
      isActive: true,
      rolesCount: 2,
      usersCount: 3,
      roles: ["Super Admin", "Match Manager"],
    },
    {
      id: "matches.update",
      name: "Edit Matches",
      description: "Ability to modify match details and scores",
      category: "Matches",
      type: "update",
      isActive: true,
      rolesCount: 2,
      usersCount: 3,
      roles: ["Super Admin", "Match Manager"],
    },
    {
      id: "matches.delete",
      name: "Delete Matches",
      description: "Ability to permanently delete match records",
      category: "Matches",
      type: "delete",
      isActive: true,
      rolesCount: 2,
      usersCount: 3,
      roles: ["Super Admin", "Match Manager"],
    },
    {
      id: "teams.create",
      name: "Create Teams",
      description: "Ability to create new team profiles",
      category: "Teams",
      type: "create",
      isActive: true,
      rolesCount: 2,
      usersCount: 3,
      roles: ["Super Admin", "Match Manager"],
    },
    {
      id: "teams.read",
      name: "View Teams",
      description: "Ability to view team information and statistics",
      category: "Teams",
      type: "read",
      isActive: true,
      rolesCount: 2,
      usersCount: 3,
      roles: ["Super Admin", "Match Manager"],
    },
    {
      id: "settings.read",
      name: "View Settings",
      description: "Ability to view system configuration",
      category: "Settings",
      type: "read",
      isActive: true,
      rolesCount: 1,
      usersCount: 1,
      roles: ["Super Admin"],
    },
    {
      id: "settings.update",
      name: "Edit Settings",
      description: "Ability to modify system configuration",
      category: "Settings",
      type: "update",
      isActive: true,
      rolesCount: 1,
      usersCount: 1,
      roles: ["Super Admin"],
    },
    {
      id: "analytics.read",
      name: "View Analytics",
      description: "Ability to view system analytics and reports",
      category: "Analytics",
      type: "read",
      isActive: true,
      rolesCount: 1,
      usersCount: 1,
      roles: ["Super Admin"],
    },
    {
      id: "comments.read",
      name: "View Comments",
      description: "Ability to view user comments and discussions",
      category: "Comments",
      type: "read",
      isActive: true,
      rolesCount: 1,
      usersCount: 2,
      roles: ["Moderator"],
    },
    {
      id: "comments.update",
      name: "Edit Comments",
      description: "Ability to moderate and edit user comments",
      category: "Comments",
      type: "update",
      isActive: true,
      rolesCount: 1,
      usersCount: 2,
      roles: ["Moderator"],
    },
    {
      id: "comments.delete",
      name: "Delete Comments",
      description: "Ability to remove inappropriate comments",
      category: "Comments",
      type: "delete",
      isActive: true,
      rolesCount: 1,
      usersCount: 2,
      roles: ["Moderator"],
    },
  ]

  const categories = ["Users", "News", "Matches", "Teams", "Settings", "Analytics", "Comments"]
  const types = ["create", "read", "update", "delete"]

  const filteredPermissions = permissions.filter((permission) => {
    const matchesSearch =
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || permission.category === selectedCategory
    const matchesType = selectedType === "all" || permission.type === selectedType

    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "create":
        return <Plus className="h-4 w-4 text-green-500" />
      case "read":
        return <Eye className="h-4 w-4 text-blue-500" />
      case "update":
        return <Edit className="h-4 w-4 text-yellow-500" />
      case "delete":
        return <Trash2 className="h-4 w-4 text-red-500" />
      default:
        return <Key className="h-4 w-4 text-gray-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Users":
        return <Users className="h-5 w-5 text-blue-400" />
      case "News":
        return <FileText className="h-5 w-5 text-green-400" />
      case "Matches":
        return <Trophy className="h-5 w-5 text-yellow-400" />
      case "Teams":
        return <Shield className="h-5 w-5 text-purple-400" />
      case "Settings":
        return <Settings className="h-5 w-5 text-gray-400" />
      case "Analytics":
        return <Eye className="h-5 w-5 text-orange-400" />
      case "Comments":
        return <MessageSquare className="h-5 w-5 text-pink-400" />
      default:
        return <Key className="h-5 w-5 text-gray-400" />
    }
  }

  const togglePermission = (permissionId: string) => {
    // In a real app, this would make an API call
    console.log("Toggling permission:", permissionId)
  }

  const totalPermissions = permissions.length
  const activePermissions = permissions.filter((p) => p.isActive).length
  const totalRoles = [...new Set(permissions.flatMap((p) => p.roles))].length

  const PermissionCard = ({ permission }: { permission: any }) => (
    <Card className="card-black-gold hover:scale-105 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getTypeIcon(permission.type)}
            <div>
              <CardTitle className="text-white text-lg">{permission.name}</CardTitle>
              <CardDescription className="text-gray-400">{permission.id}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch checked={permission.isActive} onCheckedChange={() => togglePermission(permission.id)} />
            {permission.isActive ? (
              <Unlock className="h-4 w-4 text-green-500" />
            ) : (
              <Lock className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-400 text-sm">{permission.description}</p>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="border-gold-400/50 text-gold-400">
            {permission.category}
          </Badge>
          <Badge className={permission.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
            {permission.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-black-800/50 rounded-lg">
            <p className="text-2xl font-bold text-gold-400">{permission.rolesCount}</p>
            <p className="text-xs text-gray-400">Roles</p>
          </div>
          <div className="text-center p-3 bg-black-800/50 rounded-lg">
            <p className="text-2xl font-bold text-blue-400">{permission.usersCount}</p>
            <p className="text-xs text-gray-400">Users</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-2">Assigned Roles:</p>
          <div className="flex flex-wrap gap-1">
            {permission.roles.map((role: string, index: number) => (
              <Badge key={index} variant="outline" className="border-gold-400/50 text-gold-400 text-xs">
                {role}
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
              <span className="text-gradient-gold">Permissions</span> Management
            </h1>
            <p className="text-gray-400 mt-2">Manage system permissions and access control</p>
          </div>
          <Button className="btn-gold">
            <Plus className="h-4 w-4 mr-2" />
            Add Permission
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Permissions</p>
                  <p className="text-3xl font-bold text-white">{totalPermissions}</p>
                </div>
                <Key className="h-8 w-8 text-gold-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Permissions</p>
                  <p className="text-3xl font-bold text-green-400">{activePermissions}</p>
                </div>
                <Unlock className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Categories</p>
                  <p className="text-3xl font-bold text-blue-400">{categories.length}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Roles Using</p>
                  <p className="text-3xl font-bold text-purple-400">{totalRoles}</p>
                </div>
                <UserCheck className="h-8 w-8 text-purple-400" />
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
                  placeholder="Search permissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 bg-black-800 border-gold-400/30 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-black-800 border-gold-400/20">
                  <SelectItem value="all" className="text-gold-400">
                    All Categories
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-gold-400">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48 bg-black-800 border-gold-400/30 text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-black-800 border-gold-400/20">
                  <SelectItem value="all" className="text-gold-400">
                    All Types
                  </SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type} className="text-gold-400">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Permissions Tabs */}
        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-black-800 border border-gold-400/20 max-w-md">
            <TabsTrigger value="grid" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
              Grid View
            </TabsTrigger>
            <TabsTrigger
              value="category"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900"
            >
              By Category
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPermissions.map((permission) => (
                <PermissionCard key={permission.id} permission={permission} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="category" className="space-y-8">
            {categories.map((category) => {
              const categoryPermissions = filteredPermissions.filter((p) => p.category === category)
              if (categoryPermissions.length === 0) return null

              return (
                <div key={category}>
                  <div className="flex items-center space-x-3 mb-6">
                    {getCategoryIcon(category)}
                    <h2 className="text-2xl font-bold text-white">{category}</h2>
                    <Badge variant="outline" className="border-gold-400/50 text-gold-400">
                      {categoryPermissions.length} permissions
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryPermissions.map((permission) => (
                      <PermissionCard key={permission.id} permission={permission} />
                    ))}
                  </div>
                </div>
              )
            })}
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredPermissions.length === 0 && (
          <Card className="card-black-gold">
            <CardContent className="text-center py-12">
              <Key className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Permissions Found</h3>
              <p className="text-gray-400 mb-6">No permissions match your current filters</p>
              <Button className="btn-gold">Clear Filters</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
