"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Trophy, Users, Newspaper, Globe, Play, Star, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import axios from "@/utils/axios"
import { 
  MatchCardSkeleton, 
  NewsCardSkeleton, 
  PageHeaderSkeleton 
} from "@/components/ui/skeletons"

interface Match {
  _id?: string
  id?: string | number
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  state?: string
  matchDate?: string
  date?: string
  matchTime?: string
  time?: string
  venue?: string
  status: "live" | "scheduled" | "finished"
  minute?: number
  competition?: string
  bigChance?: {
    team: "home" | "away"
    description: string
    timestamp: number
  }
}

interface News {
  id: number | string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image?: string
  featured?: boolean
}

export default function HomePage() {
  const [featuredMatches, setFeaturedMatches] = useState<Match[]>([])
  const [latestNews, setLatestNews] = useState<News[]>([])
  const [loadingMatches, setLoadingMatches] = useState(true)
  const [loadingNews, setLoadingNews] = useState(true)

  // --- For live update and big chance effect ---
  // This state stores last scores to compare for big chance highlight
  const [lastScores, setLastScores] = useState<Record<string, {home: number, away: number}>>({})

  // Shared fetch function for matches
  const fetchAndSetMatches = useCallback(async () => {
    try {
      const response = await axios.get("/matches?limit=3")
      const data = response.data
      if (Array.isArray(data)) {
        // Sort: live > scheduled > finished
        const sorted = [
          ...data.filter((m: Match) => m.status === "live"),
          ...data.filter((m: Match) => m.status === "scheduled"),
          ...data.filter((m: Match) => m.status === "finished"),
        ]
        // Merge bigChance logic
        const updated: Match[] = sorted.slice(0,3).map((m: any) => {
          const matchId = m._id || m.id
          const prev = lastScores[matchId]
          if (prev && m.status === "live") {
            if (prev.home !== (m.homeScore || 0) || prev.away !== (m.awayScore || 0)) {
              return {
                ...m,
                _id: matchId,
                bigChance: {
                  team: (prev.home !== (m.homeScore || 0) ? "home" : "away") as "home" | "away",
                  description: "Potential goal!",
                  timestamp: Date.now()
                }
              } as Match
            }
          }
          return {
            ...m,
            _id: matchId
          } as Match
        })
        setFeaturedMatches(updated)
        // Save the latest score for next compare
        setLastScores(
          Object.fromEntries(
            updated.map(m => [m._id || m.id, {home: m.homeScore || 0, away: m.awayScore || 0}])
          )
        )
      }
      setLoadingMatches(false)
    } catch {
      setLoadingMatches(false)
    }
  }, [lastScores])

  // Initial fetch
  useEffect(() => {
    setLoadingMatches(true)
    fetchAndSetMatches()
  }, [])

  // Live updates effect - matches the user matches page exactly
  useEffect(() => {
    const hasLiveMatches = featuredMatches.some(match => match.status === "live")
    if (hasLiveMatches) {
      const fastPollInterval = setInterval(() => {
        fetchAndSetMatches()
      }, 5000)
      
      let ws: WebSocket | null = null
      try {
        ws = new WebSocket('ws://https://football-7jrz.onrender.com/ws/matches')
        ws.onopen = () => { console.log('WebSocket Connected') }
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data) as {
              type: string;
              matchId: string;
              team: "home" | "away";
              update?: Partial<Match>;
            }
            if (data.type === 'score_update') {
              setFeaturedMatches(prev => prev.map(match => {
                if ((match._id || match.id) === data.matchId) {
                  return {
                    ...match,
                    bigChance: {
                      team: data.team,
                      description: "Potential goal!",
                      timestamp: Date.now()
                    }
                  }
                }
                return match
              }))
              setTimeout(() => {
                setFeaturedMatches(prev => prev.map(match => {
                  if ((match._id || match.id) === data.matchId) {
                    return {
                      ...match,
                      ...data.update,
                      bigChance: undefined
                    }
                  }
                  return match
                }))
              }, 3000)
            }
          } catch (err) {
            console.log('Error processing WebSocket message:', err)
          }
        }
        ws.onerror = () => {
          console.log('WebSocket connection failed, falling back to polling')
          ws = null
        }
        ws.onclose = () => {
          console.log('WebSocket connection closed')
          ws = null
        }
      } catch (err) {
        console.log('WebSocket connection failed:', err)
        ws = null
      }

      return () => {
        clearInterval(fastPollInterval)
        if (ws) {
          ws.close()
        }
      }
    }
  }, [featuredMatches])

  // Remove bigChance highlight after 5 seconds on card update
  useEffect(() => {
    if (featuredMatches.some(m => m.bigChance)) {
      const timer = setTimeout(() => {
        setFeaturedMatches(prev =>
          prev.map(m => m.bigChance ? { ...m, bigChance: undefined } : m)
        )
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [featuredMatches])

  // Fetch News
  useEffect(() => {
    setLoadingNews(true)
    axios
      .get("/news?limit=3")
      .then((response) => {
        const data = response.data
        if (Array.isArray(data)) {
          setLatestNews(data.slice(0, 3))
        }
        setLoadingNews(false)
      })
      .catch(() => setLoadingNews(false))
  }, [])

  const stats = [
    { label: "Active Teams", value: "100", icon: Users },
    { label: "Matches Played", value: "500", icon: Trophy },
    { label: "News Articles", value: "70", icon: Newspaper },
    { label: "Active Users", value: "1.5K", icon: TrendingUp },
  ]

  // -- Match Card for landing page (styled like your match card, with bigChance effect) --
  const LandingMatchCard = ({ match }: { match: Match }) => (
    <Card className="card-black-gold hover:scale-105 transition-all duration-300 group cursor-pointer">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2">
            <Badge
              variant={match.status === "live" ? "destructive" : match.status === "scheduled" ? "secondary" : "outline"}
              className={match.status === "live" ? "animate-pulse-gold" : ""}
            >
              {match.status === "live" ? (
                <div className="flex items-center">
                  <div className="live-indicator w-2 h-2 mr-2"></div>
                  Live {match.minute ? `${match.minute}'` : ""}
                </div>
              ) : match.status === "scheduled" ? (
                "UPCOMING"
              ) : (
                "FINISHED"
              )}
            </Badge>
          </div>
          {match.venue && (
            <div className="flex items-center text-sm text-yellow-400">
              <MapPin className="h-4 w-4 mr-1" />
              {match.venue}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Badge 
            variant="outline" 
            className="bg-gold-400/20 text-gold-400 border-gold-400 px-3 py-1 text-sm font-semibold flex items-center"
          >
            <MapPin className="h-4 w-4 mr-1" />
            {match.state}
          </Badge>
          <Badge 
            variant="outline" 
            className="bg-blue-500/20 text-blue-300 border-blue-400 px-3 py-1 text-sm font-semibold flex items-center"
          >
            <Trophy className="h-4 w-4 mr-1" />
            {match.competition}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-gold rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-black-900" />
              </div>
              <div className="font-semibold text-white text-lg">{match.homeTeam}</div>
              <div className="text-xs text-gray-400 mt-1">HOME</div>
            </div>
            <div className="text-center mx-6 relative">
              <div className={`text-5xl font-bold text-gold-400 mb-2 transition-all duration-300 
                ${match.bigChance ? "scale-125 drop-shadow-lg text-yellow-400 animate-blink-chance" : ""}`}>
                {match.status !== "scheduled" ? `${match.homeScore}-${match.awayScore}` : "VS"}
              </div>
              {match.status === "live" && (
                <>
                  <div className="text-xs text-red-400 animate-pulse">Live</div>
                  {match.bigChance && (
                    <div className="mt-2 text-sm">
                      <div className="text-xs text-red-500 px-1 py-1 rounded animate-blink-chance font-bold">
                        big chance
                      </div>
                      <div className="text-xs mt-1 text-yellow-400">
                        {match.bigChance.team === "home" ? match.homeTeam : match.awayTeam}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-gold rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-black-900" />
              </div>
              <div className="font-semibold text-white text-lg">{match.awayTeam}</div>
              <div className="text-xs text-gray-400 mt-1">AWAY</div>
            </div>
          </div>
        </div>
        <div className="space-y-3 text-sm text-gray-400 mb-6">
          <div className="flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2 text-gold-400" />
            {match.matchDate}
            {match.matchTime && (
              <>
                <Clock className="h-4 w-4 ml-4 mr-2 text-gold-400" />
                {match.matchTime}
              </>
            )}
          </div>
          {match.venue && <div className="text-center font-medium text-gold-400">{match.venue}</div>}
        </div>
        <Button className="w-full btn-gold">
          {match.status === "live" ? "Watch Live" : "View Details"}
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-black text-yellow-400">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black" />
        <div className="relative container mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-8">
            <Star className="h-4 w-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 text-sm font-medium">Premium Football Experience</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient-gold">Nigerian Football</span>
            <br />
            <span className="text-white">Hub</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed">
            Experience the ultimate destination for Nigerian local football and European leagues coverage with
            real-time updates, comprehensive statistics, and premium content.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="btn-gold text-lg px-8 py-4" asChild>
              <Link href="/matches">
                <Play className="mr-2 h-5 w-5" />
                Watch Live Matches
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-black text-lg px-8 py-4 bg-transparent" asChild>
              <Link href="/news">
                <Newspaper className="mr-2 h-5 w-5" />
                Latest News
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-4">
                  <stat.icon className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Matches */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Featured Matches</h2>
              <p className="text-gray-400 text-lg">Live, scheduled and finished matches from across Nigeria</p>
            </div>
            <Button variant="outline" className="btn-black bg-transparent" asChild>
              <Link href="/matches">View All Matches</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingMatches ? (
              Array.from({ length: 3 }).map((_, i) => (
                <MatchCardSkeleton key={i} />
              ))
            ) : featuredMatches.length === 0 ? (
              <div className="col-span-full text-center text-gray-300">No matches found.</div>
            ) : (
              featuredMatches.map((match) => (
                <LandingMatchCard key={match._id} match={match} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Latest News</h2>
              <p className="text-gray-400 text-lg">Stay updated with breaking football news</p>
            </div>
            <Button variant="outline" className="btn-black bg-transparent" asChild>
              <Link href="/news">View All News</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingNews ? (
              Array.from({ length: 3 }).map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))
            ) : latestNews.length === 0 ? (
              <div className="col-span-full text-center text-gray-300">No news found.</div>
            ) : (
              latestNews.map((article, index) => (
                <Card key={article.id || `article-${index}`} className="card-black-gold hover:scale-105 transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                    />
                    {article.featured && (
                      <Badge className="absolute top-4 left-4 bg-yellow-400 text-black">Featured</Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="border-yellow-400/30 text-yellow-400">
                        {article.category}
                      </Badge>
                      <span className="text-sm text-gray-400">{article.readTime}</span>
                    </div>
                    <CardTitle className="line-clamp-2 text-white hover:text-yellow-400 transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-gray-300">{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {article.date}
                      </div>
                    </div>
                    <Button className="w-full btn-black">Read More</Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Quick Access</h2>
          <p className="text-center text-gray-400 text-lg mb-16">Explore all features of our premium platform</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                id: "local-matches",
                title: "Local Matches",
                description: "Browse matches from all 36 Nigerian states + FCT",
                icon: Trophy,
                href: "/matches",
              },
              {
                id: "teams",
                title: "Teams",
                description: "Explore team profiles, stats, and fixtures",
                icon: Users,
                href: "/",
              },
              {
                id: "european-football",
                title: "European Football",
                description: "Live scores and news from top European leagues",
                icon: Globe,
                href: "/europe",
              },
              {
                id: "news-updates",
                title: "News & Updates",
                description: "Latest football news and match reports",
                icon: Newspaper,
                href: "/news",
              },
            ].map((item) => (
              <Link key={item.id} href={item.href}>
                <Card className="card-black-gold text-center hover:scale-105 transition-all duration-300 cursor-pointer group h-full">
                  <CardHeader className="pb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-gold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-10 w-10 text-black" />
                    </div>
                    <CardTitle className="text-white group-hover:text-yellow-400 transition-colors text-xl">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 leading-relaxed">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}