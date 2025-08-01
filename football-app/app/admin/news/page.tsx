"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  TrendingUp,
  FileText,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function AdminNewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const newsArticles = [
    {
      id: 1,
      title: "Lagos United Breaks Transfer Record with ₦200M Signing",
      excerpt: "In a groundbreaking move that has sent shockwaves through Nigerian football...",
      category: "Transfer",
      status: "published",
      author: "Adebayo Johnson",
      date: "2024-01-15",
      views: 15420,
      featured: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "European Roundup: Premier League Title Race Reaches Fever Pitch",
      excerpt: "As the Premier League season enters its final stretch, Manchester City and Arsenal...",
      category: "Europe",
      status: "published",
      author: "Sarah Mitchell",
      date: "2024-01-14",
      views: 23100,
      featured: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "NPFL Season Analysis: Breakthrough Players to Watch",
      excerpt: "The current NPFL season has been a showcase of emerging talent...",
      category: "Analysis",
      status: "draft",
      author: "Emeka Okafor",
      date: "2024-01-14",
      views: 0,
      featured: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Rivers United Captain Suffers Season-Ending Injury",
      excerpt: "In a devastating blow to Rivers United's title aspirations...",
      category: "Injury",
      status: "published",
      author: "Dr. Funmi Adeyemi",
      date: "2024-01-13",
      views: 12300,
      featured: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Youth Development: Nigeria's Golden Generation Rising",
      excerpt: "A comprehensive look at the exceptional young talents emerging...",
      category: "Youth",
      status: "scheduled",
      author: "Kemi Ogundimu",
      date: "2024-01-16",
      views: 0,
      featured: true,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const categories = ["Transfer", "Europe", "Analysis", "Injury", "Youth", "Match Report", "International"]
  const statuses = ["published", "draft", "scheduled", "archived"]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500 text-white">Published</Badge>
      case "draft":
        return <Badge className="bg-yellow-500 text-black">Draft</Badge>
      case "scheduled":
        return <Badge className="bg-blue-500 text-white">Scheduled</Badge>
      case "archived":
        return <Badge className="bg-gray-500 text-white">Archived</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category.toLowerCase() === selectedCategory
    const matchesStatus = selectedStatus === "all" || article.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const publishedArticles = filteredArticles.filter((article) => article.status === "published")
  const draftArticles = filteredArticles.filter((article) => article.status === "draft")
  const scheduledArticles = filteredArticles.filter((article) => article.status === "scheduled")

  const NewsCard = ({ article }: { article: any }) => (
    <Card className="card-black-gold hover:scale-105 transition-all duration-300 group">
      <div className="flex">
        <div className="w-48 h-32 relative overflow-hidden rounded-l-lg">
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          {article.featured && (
            <Badge className="absolute top-2 left-2 bg-gold-400 text-black-900">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-gold-400/50 text-gold-400">
                {article.category}
              </Badge>
              {getStatusBadge(article.status)}
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
                  View
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gold-400 hover:bg-gold-400/20">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 hover:bg-red-400/20">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-gold-400 transition-colors">
            {article.title}
          </h3>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1 text-gold-400" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gold-400" />
                {article.date}
              </div>
            </div>
            {article.status === "published" && (
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1 text-gold-400" />
                {article.views.toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white font-playfair">
              <span className="text-gradient-gold">News</span> Management
            </h1>
            <p className="text-gray-400 mt-2">Manage articles, categories, and content</p>
          </div>
          <Link href="/admin/news/create">
            <Button className="btn-gold">
              <Plus className="h-4 w-4 mr-2" />
              Create Article
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Articles</p>
                  <p className="text-3xl font-bold text-white">{newsArticles.length}</p>
                </div>
                <FileText className="h-8 w-8 text-gold-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Published</p>
                  <p className="text-3xl font-bold text-green-400">{publishedArticles.length}</p>
                </div>
                <Eye className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Drafts</p>
                  <p className="text-3xl font-bold text-yellow-400">{draftArticles.length}</p>
                </div>
                <Edit className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Views</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {publishedArticles.reduce((total, article) => total + article.views, 0).toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-400" />
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
                  placeholder="Search articles..."
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
                    <SelectItem key={category} value={category.toLowerCase()} className="text-gold-400">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48 bg-black-800 border-gold-400/30 text-white">
                  <SelectValue placeholder="Status" />
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

        {/* Articles Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black-800 border border-gold-400/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
              All Articles ({filteredArticles.length})
            </TabsTrigger>
            <TabsTrigger
              value="published"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900"
            >
              Published ({publishedArticles.length})
            </TabsTrigger>
            <TabsTrigger value="drafts" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
              Drafts ({draftArticles.length})
            </TabsTrigger>
            <TabsTrigger
              value="scheduled"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900"
            >
              Scheduled ({scheduledArticles.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {filteredArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </TabsContent>

          <TabsContent value="published" className="space-y-6">
            {publishedArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </TabsContent>

          <TabsContent value="drafts" className="space-y-6">
            {draftArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            {scheduledArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <Card className="card-black-gold">
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Articles Found</h3>
              <p className="text-gray-400 mb-6">No articles match your current filters</p>
              <Link href="/admin/news/create">
                <Button className="btn-gold">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Article
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
