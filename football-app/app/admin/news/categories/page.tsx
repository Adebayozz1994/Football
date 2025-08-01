"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Edit, Trash2, Tag, FileText, TrendingUp } from "lucide-react"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Transfer",
      slug: "transfer",
      description: "Player transfers and market news",
      color: "#10B981",
      articleCount: 45,
      isActive: true,
    },
    {
      id: 2,
      name: "Europe",
      slug: "europe",
      description: "European football leagues and competitions",
      color: "#3B82F6",
      articleCount: 78,
      isActive: true,
    },
    {
      id: 3,
      name: "Analysis",
      slug: "analysis",
      description: "In-depth tactical and performance analysis",
      color: "#8B5CF6",
      articleCount: 32,
      isActive: true,
    },
    {
      id: 4,
      name: "Injury",
      slug: "injury",
      description: "Player injuries and medical updates",
      color: "#EF4444",
      articleCount: 23,
      isActive: true,
    },
    {
      id: 5,
      name: "Youth",
      slug: "youth",
      description: "Youth development and academy news",
      color: "#F59E0B",
      articleCount: 19,
      isActive: true,
    },
    {
      id: 6,
      name: "International",
      slug: "international",
      description: "National team and international competitions",
      color: "#06B6D4",
      articleCount: 56,
      isActive: false,
    },
  ])

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    color: "#10B981",
  })

  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleCreateCategory = () => {
    if (!newCategory.name) return

    const category = {
      id: Date.now(),
      name: newCategory.name,
      slug: newCategory.name.toLowerCase().replace(/\s+/g, "-"),
      description: newCategory.description,
      color: newCategory.color,
      articleCount: 0,
      isActive: true,
    }

    setCategories([...categories, category])
    setNewCategory({ name: "", description: "", color: "#10B981" })
    setIsCreateOpen(false)
  }

  const handleEditCategory = () => {
    if (!editingCategory) return

    setCategories(categories.map((cat) => (cat.id === editingCategory.id ? editingCategory : cat)))
    setEditingCategory(null)
    setIsEditOpen(false)
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const totalArticles = categories.reduce((sum, cat) => sum + cat.articleCount, 0)
  const activeCategories = categories.filter((cat) => cat.isActive).length

  return (
    <div className="min-h-screen bg-gradient-black p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white font-playfair">
              <span className="text-gradient-gold">News</span> Categories
            </h1>
            <p className="text-gray-400 mt-2">Organize your content with categories</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="btn-gold">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black-800 border-gold-400/20">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Category</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Add a new category to organize your articles
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-white">Category Name *</Label>
                  <Input
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="e.g., Match Reports"
                    className="bg-black-700 border-gold-400/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Description</Label>
                  <Textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Brief description of this category..."
                    className="bg-black-700 border-gold-400/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Color</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={newCategory.color}
                      onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                      className="w-12 h-10 rounded border border-gold-400/30"
                    />
                    <Input
                      value={newCategory.color}
                      onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                      className="bg-black-700 border-gold-400/30 text-white"
                    />
                  </div>
                </div>
                <Button onClick={handleCreateCategory} className="w-full btn-gold">
                  Create Category
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
                  <p className="text-gray-400 text-sm">Total Categories</p>
                  <p className="text-3xl font-bold text-white">{categories.length}</p>
                </div>
                <Tag className="h-8 w-8 text-gold-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Categories</p>
                  <p className="text-3xl font-bold text-green-400">{activeCategories}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
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
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="card-black-gold hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                    <div>
                      <CardTitle className="text-white">{category.name}</CardTitle>
                      <CardDescription className="text-gray-400">/{category.slug}</CardDescription>
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
                          setEditingCategory(category)
                          setIsEditOpen(true)
                        }}
                        className="text-gold-400 hover:bg-gold-400/20"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-400 hover:bg-red-400/20"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{category.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <FileText className="h-4 w-4 mr-1 text-gold-400" />
                      {category.articleCount} articles
                    </div>
                  </div>
                  <Badge className={category.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
                    {category.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Category Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="bg-black-800 border-gold-400/20">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Category</DialogTitle>
              <DialogDescription className="text-gray-400">Update category information</DialogDescription>
            </DialogHeader>
            {editingCategory && (
              <div className="space-y-4">
                <div>
                  <Label className="text-white">Category Name *</Label>
                  <Input
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="bg-black-700 border-gold-400/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Description</Label>
                  <Textarea
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                    className="bg-black-700 border-gold-400/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Color</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={editingCategory.color}
                      onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                      className="w-12 h-10 rounded border border-gold-400/30"
                    />
                    <Input
                      value={editingCategory.color}
                      onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                      className="bg-black-700 border-gold-400/30 text-white"
                    />
                  </div>
                </div>
                <Button onClick={handleEditCategory} className="w-full btn-gold">
                  Update Category
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
