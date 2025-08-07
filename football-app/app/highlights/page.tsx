"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function EuropePage() {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("https://www.scorebat.com/video-api/v3/")
        const data = await res.json()
        // Log competitions to console for debug
        // console.log([...new Set(data.response.map((m: any) => m.competition))]);
        // Remove filter to show all highlights
        setVideos(data.response)
      } catch (e) {
        setError("Failed to load highlights")
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-gold-400">European Football Highlights</h1>
        {loading && <div className="text-yellow-400">Loading...</div>}
        {error && <div className="text-red-400">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video: any) => (
            <Card key={video.title} className="bg-gray-900 border-gold-400/30">
              <CardHeader>
                <CardTitle className="text-lg text-gold-400">{video.title}</CardTitle>
                <div className="text-sm text-gray-300">{video.competition}</div>
                <div className="text-xs text-gray-500">{new Date(video.date).toLocaleString()}</div>
              </CardHeader>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: video.videos[0]?.embed || "" }} />
                <div className="mt-2 text-xs text-gray-400">Source: Scorebat</div>
              </CardContent>
            </Card>
          ))}
        </div>
        {!loading && videos.length === 0 && <div className="text-gray-400">No highlights found.</div>}
      </div>
      <Footer />
    </div>
  )
}