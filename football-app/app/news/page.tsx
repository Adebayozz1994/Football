"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, User, Eye, Clock, Share2, Bookmark, TrendingUp } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const newsArticles = [
    {
      id: 1,
      title: "Lagos United Breaks Transfer Record with ₦200M Signing",
      excerpt:
        "In a groundbreaking move that has sent shockwaves through Nigerian football, Lagos United has completed the signing of Super Eagles midfielder for a record-breaking ₦200 million...",
      category: "Transfer",
      author: "Adebayo Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      views: 15420,
      image: "/placeholder.svg?height=400&width=600",
      featured: true,
      trending: true,
    },
    {
      id: 2,
      title: "European Roundup: Premier League Title Race Reaches Fever Pitch",
      excerpt:
        "As the Premier League season enters its final stretch, Manchester City and Arsenal continue their intense battle for the title, with Liverpool lurking dangerously close behind...",
      category: "Europe",
      author: "Sarah Mitchell",
      date: "2024-01-14",
      readTime: "7 min read",
      views: 23100,
      image: "/placeholder.svg?height=400&width=600",
      trending: true,
    },
    {
      id: 3,
      title: "NPFL Season Analysis: Breakthrough Players to Watch",
      excerpt:
        "The current NPFL season has been a showcase of emerging talent. We analyze the young players who are making their mark and could be the next big stars...",
      category: "Analysis",
      author: "Emeka Okafor",
      date: "2024-01-14",
      readTime: "6 min read",
      views: 8750,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      title: "Rivers United Captain Suffers Season-Ending Injury",
      excerpt:
        "In a devastating blow to Rivers United's title aspirations, team captain and defensive stalwart will miss the remainder of the season following a serious knee injury...",
      category: "Injury",
      author: "Dr. Funmi Adeyemi",
      date: "2024-01-13",
      readTime: "3 min read",
      views: 12300,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 5,
      title: "Barcelona's New Signing Makes Spectacular Debut",
      excerpt:
        "The Catalan giants' latest acquisition announced his arrival in style, scoring a hat-trick in his first appearance and instantly becoming a fan favorite at Camp Nou...",
      category: "Europe",
      author: "Carlos Rodriguez",
      date: "2024-01-13",
      readTime: "4 min read",
      views: 18900,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 6,
      title: "Youth Development: Nigeria's Golden Generation Rising",
      excerpt:
        "A comprehensive look at the exceptional young talents emerging from Nigerian football academies and their potential impact on both local and international football...",
      category: "Youth",
      author: "Kemi Ogundimu",
      date: "2024-01-12",
      readTime: "8 min read",
      views: 6420,
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const categories = ["Transfer", "Europe", "Injury", "Analysis", "Youth", "Match Report", "International"]

  const localNews = newsArticles.filter((article) => !["Europe"].includes(article.category))
  const europeNews = newsArticles.filter((article) => article.category === "Europe")
  const trendingNews = newsArticles.filter((article) => article.trending)

  const NewsCard = ({ article, featured = false }: { article: any; featured?: boolean }) => (
    <Card
      className={`card-black-gold hover:scale-105 transition-all duration-300 group ${featured ? "md:col-span-2 lg:col-span-2" : ""}`}
    >
      <div className={`aspect-video relative overflow-hidden rounded-t-lg ${featured ? "md:aspect-[2/1]" : ""}`}>
        <img
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black-900/90 via-black-900/20 to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {featured && <Badge className="bg-gold-400 text-black-900 font-semibold">Featured</Badge>}
          {article.trending && (
            <Badge className="bg-red-500 text-white font-semibold animate-pulse">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>

        {/* Category Badge */}
        <Badge variant="outline" className="absolute top-4 right-4 bg-black-800/80 border-gold-400/50 text-gold-400">
          {article.category}
        </Badge>

        {/* Read Time */}
        <div className="absolute bottom-4 right-4 flex items-center text-white text-sm bg-black-800/80 px-2 py-1 rounded">
          <Clock className="h-3 w-3 mr-1" />
          {article.readTime}
        </div>
      </div>

      <CardHeader>
        <CardTitle
          className={`line-clamp-2 text-white group-hover:text-gold-400 transition-colors ${featured ? "text-2xl" : "text-lg"}`}
        >
          {article.title}
        </CardTitle>
        <CardDescription className={`line-clamp-3 text-gray-300 ${featured ? "text-base" : "text-sm"}`}>
          {article.excerpt}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
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
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1 text-gold-400" />
            {article.views.toLocaleString()}
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 btn-gold">Read Full Article</Button>
          <Button variant="outline" size="icon" className="btn-black bg-transparent">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="btn-black bg-transparent">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-black">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white font-playfair">
            <span className="text-gradient-gold">Football</span> News
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Stay updated with breaking football news, transfer updates, match reports, and exclusive insights from
            Nigeria and around the world
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <Card className="card-black-gold">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gold-400" />
                  <Input
                    placeholder="Search news articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48 bg-black-800 border-gold-400/30 text-white">
                    <SelectValue placeholder="Select Category" />
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
              </div>
            </CardContent>
          </Card>
        </div>

        {/* News Tabs */}
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-black-800 border border-gold-400/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
              All News
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900"
            >
              Trending
            </TabsTrigger>
            <TabsTrigger value="local" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
              Local News
            </TabsTrigger>
            <TabsTrigger value="europe" className="data-[state=active]:bg-gold-400 data-[state=active]:text-black-900">
              Europe News
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article, index) => (
                <NewsCard key={article.id} article={article} featured={index === 0} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="local">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {localNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="europe">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {europeNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Newsletter Signup */}
        <Card className="card-black-gold mt-16">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Never Miss a Story</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest football news and exclusive content
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
              />
              <Button className="btn-gold">Subscribe</Button>
            </div>
          </CardContent>
        </Card>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button size="lg" className="btn-black px-12">
            Load More Articles
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
