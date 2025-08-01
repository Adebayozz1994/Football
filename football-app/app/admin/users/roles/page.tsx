"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, MoreHorizontal, Edit, Trash2, Shield, Users, Crown, Key, UserCheck, Lock } from "lucide-react"

export default function AdminRolesPage() {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Super Admin",
      description: "Full system access with all permissions",
      userCount: 1,
      color: "#F59E0B",
      isActive: true,
      permissions: [
        "users.create",
        "users.read",
        "users.update",
        "users.delete",
        "news.create",
        "news.read",
        "news.update",
        "news.delete",
        "matches.create",
        "matches.read",
        "matches.update",
        "matches.delete",
        "teams.create",
        "teams.read",
        "teams.update",
        "teams.delete",
        "settings.read",
        "settings.update",
        "analytics.read",
      ],
    },
    {
      id: 2,
      name: "Editor",
      description: "Content management and editorial oversight",
      userCount: 3,
      color: "#3B82F6",
      isActive: true,
      permissions: [
        "news.create",
        "news.read",
        "news.update",
        "news.delete",
        "categories.create",
        "categories.read",
        "categories.update",
        "users.read",
      ],
    },
    {
      id: 3,
      name: "Match Manager",
      description: "Match and team management capabilities",
      userCount: 2,
      color: "#10B981",
      isActive: true,
      permissions: [
        "matches.create",
        "matches.read",
        "matches.update",
        "matches.delete",
        "teams.create",
        "teams.read",
        "teams.update",
        "teams.delete",
        "news.read",
      ],
    },
    {
      id: 4,
      name: "Content Writer",
      description: "Article creation and basic content management",
      userCount: 5,
      color: "#8B5CF6",
      isActive: true,
      permissions: ["news.create", "news.read", "news.update", "categories.read"],
    },
    {
      id: 5,
      name: "Moderator",
      description: "User moderation and comment management",
      userCount: 2,
      color: "#EF4444",
      isActive: true,
      permissions: ["users.read", "users.update", "comments.read", "comments.update", "comments.delete", "news.read"],
    },
  ])

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
    permissions: [] as string[],
  })

  const [editingRole, setEditingRole] = useState<any>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const allPermissions = [
    { id: "users.create", name: "Create Users", category: "Users" },
    { id: "users.read", name: "View Users", category: "Users" },
    { id: "users.update", name: "Edit Users", category: "Users" },
    { id: "users.delete", name: "Delete Users", category: "Users" },
    { id: "news.create", name: "Create Articles", category: "News" },
    { id: "news.read", name: "View Articles", category: "News" },
    { id: "news.update", name: "Edit Articles", category: "News" },
    { id: "news.delete", name: "Delete Articles", category: "News" },
    { id: "matches.create", name: "Create Matches", category: "Matches" },
    { id: "matches.read", name: "View Matches", category: "Matches" },
    { id: "matches.update", name: "Edit Matches", category: "Matches" },
    { id: "matches.delete", name: "Delete Matches", category: "Matches" },
    { id: "teams.create", name: "Create Teams", category: "Teams" },
    { id: "teams.read", name: "View Teams", category: "Teams" },
    { id: "teams.update", name: "Edit Teams", category: "Teams" },
    { id: "teams.delete", name: "Delete Teams", category: "Teams" },
    { id: "categories.create", name: "Create Categories", category: "Categories" },
    { id: "categories.read", name: "View Categories", category: "Categories" },
    { id: "categories.update", name: "Edit Categories", category: "Categories" },
    { id: "settings.read", name: "View Settings", category: "Settings" },
    { id: "settings.update", name: "Edit Settings", category: "Settings" },
    { id: "analytics.read", name: "View Analytics", category: "Analytics" },
    { id: "comments.read", name: "View Comments", category: "Comments" },
    { id: "comments.update", name: "Edit Comments", category: "Comments" },
    { id: "comments.delete", name: "Delete Comments", category: "Comments" },
  ]

  const permissionCategories = [...new Set(allPermissions.map((p) => p.category))]

  const handleCreateRole = () => {
    if (!newRole.name) return

    const role = {
      id: Date.now(),
      name: newRole.name,
      description: newRole.description,
      color: newRole.color,
      userCount: 0,
      isActive: true,
      permissions: newRole.permissions,
    }

    setRoles([...roles, role])
    setNewRole({ name: "", description: "", color: "#3B82F6", permissions: [] })
    setIsCreateOpen(false)
  }

  const handleEditRole = () => {
    if (!editingRole) return

    setRoles(roles.map((role) => (role.id === editingRole.id ? editingRole : role)))
    setEditingRole(null)
    setIsEditOpen(false)
  }

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id))
  }

  const togglePermission = (
    permissionId: string,
    rolePermissions: string[],
    setPermissions: (permissions: string[]) => void,
  ) => {
    if (rolePermissions.includes(permissionId)) {
      setPermissions(rolePermissions.filter((p) => p !== permissionId))
    } else {
      setPermissions([...rolePermissions, permissionId])
    }
  }

  const getRoleIcon = (roleName: string) => {
    switch (roleName) {
      case "Super Admin":
        return <Crown className="h-5 w-5" />
      case "Editor":
        return <Edit className="h-5 w-5" />
      case "Match Manager":
        return <Shield className="h-5 w-5" />
      case "Content Writer":
        return <Edit className="h-5 w-5" />
      case "Moderator":
        return <UserCheck className="h-5 w-5" />
      default:
        return <Users className="h-5 w-5" />
    }
  }

  const PermissionSelector = ({
    permissions,
    setPermissions,
  }: { permissions: string[]; setPermissions: (permissions: string[]) => void }) => (
    <div className="space-y-6">
      {permissionCategories.map((category) => (
        <div key={category}>
          <h4 className="text-white font-medium mb-3 flex items-center">
            <Key className="h-4 w-4 mr-2 text-gold-400" />
            {category}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {allPermissions
              .filter((p) => p.category === category)
              .map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission.id}
                    checked={permissions.includes(permission.id)}
                    onCheckedChange={() => togglePermission(permission.id, permissions, setPermissions)}
                    className="border-gold-400/50 data-[state=checked]:bg-gold-400 data-[state=checked]:border-gold-400"
                  />
                  <Label htmlFor={permission.id} className="text-sm text-gray-300 cursor-pointer">
                    {permission.name}
                  </Label>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-black p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white font-playfair">
              <span className="text-gradient-gold">Admin</span> Roles
            </h1>
            <p className="text-gray-400 mt-2">Manage user roles and permissions</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="btn-gold">
                <Plus className="h-4 w-4 mr-2" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black-800 border-gold-400/20 max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Role</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Define a new role with specific permissions
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Role Name *</Label>
                    <Input
                      value={newRole.name}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                      placeholder="e.g., Content Manager"
                      className="bg-black-700 border-gold-400/30 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={newRole.color}
                        onChange={(e) => setNewRole({ ...newRole, color: e.target.value })}
                        className="w-12 h-10 rounded border border-gold-400/30"
                      />
                      <Input
                        value={newRole.color}
                        onChange={(e) => setNewRole({ ...newRole, color: e.target.value })}
                        className="bg-black-700 border-gold-400/30 text-white"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-white">Description</Label>
                  <Textarea
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    placeholder="Brief description of this role..."
                    className="bg-black-700 border-gold-400/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white mb-4 block">Permissions</Label>
                  <PermissionSelector
                    permissions={newRole.permissions}
                    setPermissions={(permissions) => setNewRole({ ...newRole, permissions })}
                  />
                </div>
                <Button onClick={handleCreateRole} className="w-full btn-gold">
                  Create Role
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Roles</p>
                  <p className="text-3xl font-bold text-white">{roles.length}</p>
                </div>
                <Shield className="h-8 w-8 text-gold-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Roles</p>
                  <p className="text-3xl font-bold text-green-400">{roles.filter((r) => r.isActive).length}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {roles.reduce((sum, role) => sum + role.userCount, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card key={role.id} className="card-black-gold hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: role.color }}
                    >
                      {getRoleIcon(role.name)}
                    </div>
                    <div>
                      <CardTitle className="text-white">{role.name}</CardTitle>
                      <CardDescription className="text-gray-400">{role.userCount} users</CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black-800 border-gold-400/20">
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingRole(role)
                          setIsEditOpen(true)
                        }}
                        className="text-gold-400 hover:bg-gold-400/20"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteRole(role.id)}
                        className="text-red-400 hover:bg-red-400/20"
                        disabled={role.userCount > 0}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-400 text-sm line-clamp-2">{role.description}</p>

                <div className="flex items-center justify-between">
                  <Badge className={role.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
                    {role.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-400">
                    <Lock className="h-4 w-4 mr-1 text-gold-400" />
                    {role.permissions.length} permissions
                  </div>
                </div>

                {/* Permission Preview */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">Key Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map((permission, index) => (
                      <Badge key={index} variant="outline" className="border-gold-400/50 text-gold-400 text-xs">
                        {permission.split(".")[1]}
                      </Badge>
                    ))}
                    {role.permissions.length > 3 && (
                      <Badge variant="outline" className="border-gray-400/50 text-gray-400 text-xs">
                        +{role.permissions.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Role Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="bg-black-800 border-gold-400/20 max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Role</DialogTitle>
              <DialogDescription className="text-gray-400">Update role information and permissions</DialogDescription>
            </DialogHeader>
            {editingRole && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Role Name *</Label>
                    <Input
                      value={editingRole.name}
                      onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                      className="bg-black-700 border-gold-400/30 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={editingRole.color}
                        onChange={(e) => setEditingRole({ ...editingRole, color: e.target.value })}
                        className="w-12 h-10 rounded border border-gold-400/30"
                      />
                      <Input
                        value={editingRole.color}
                        onChange={(e) => setEditingRole({ ...editingRole, color: e.target.value })}
                        className="bg-black-700 border-gold-400/30 text-white"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-white">Description</Label>
                  <Textarea
                    value={editingRole.description}
                    onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                    className="bg-black-700 border-gold-400/30 text-white"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-white">Active Role</Label>
                  <Switch
                    checked={editingRole.isActive}
                    onCheckedChange={(checked) => setEditingRole({ ...editingRole, isActive: checked })}
                  />
                </div>
                <div>
                  <Label className="text-white mb-4 block">Permissions</Label>
                  <PermissionSelector
                    permissions={editingRole.permissions}
                    setPermissions={(permissions) => setEditingRole({ ...editingRole, permissions })}
                  />
                </div>
                <Button onClick={handleEditRole} className="w-full btn-gold">
                  Update Role
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
