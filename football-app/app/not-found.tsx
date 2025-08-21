"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Trophy, Search, AlertTriangle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  // Auto redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleGoHome = () => {
    router.push("/")
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header />
      
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Hero Section */}
          <div className="mb-8">
            <div className="relative mb-6">
              <div className="text-9xl font-bold text-gold-400 opacity-20 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertTriangle className="h-24 w-24 text-gold-400 animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-playfair">
              Page <span className="text-gradient-gold">Not Found</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-6 max-w-lg mx-auto leading-relaxed">
              Oops! The page you're looking for seems to have been tackled and is nowhere to be found on the pitch.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="card-black-gold hover:scale-105 transition-all duration-300 cursor-pointer group" onClick={handleGoHome}>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-gold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Home className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Go Home</h3>
                <p className="text-gray-400 text-sm">Return to the main field</p>
              </CardContent>
            </Card>

            <Card className="card-black-gold hover:scale-105 transition-all duration-300 cursor-pointer group" onClick={handleGoBack}>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-gold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ArrowLeft className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Go Back</h3>
                <p className="text-gray-400 text-sm">Return to previous page</p>
              </CardContent>
            </Card>
          </div>

          {/* Auto Redirect Notice */}
          <div className="mb-8">
            <Card className="card-black-gold border-gold-400/40">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Trophy className="h-6 w-6 text-gold-400" />
                  <span className="text-lg font-semibold text-gold-400">Auto Redirect</span>
                </div>
                <p className="text-gray-300 mb-2">
                  You'll be automatically redirected to the home page in
                </p>
                <div className="text-3xl font-bold text-gold-400 animate-pulse">
                  {countdown}
                </div>
                <p className="text-sm text-gray-400 mt-2">seconds</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/matches">
                <Button variant="outline" className="btn-black bg-transparent">
                  <Trophy className="h-4 w-4 mr-2" />
                  Matches
                </Button>
              </Link>
              <Link href="/news">
                <Button variant="outline" className="btn-black bg-transparent">
                  <Search className="h-4 w-4 mr-2" />
                  News
                </Button>
              </Link>
              <Link href="/teams">
                <Button variant="outline" className="btn-black bg-transparent">
                  <Home className="h-4 w-4 mr-2" />
                  Teams
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gold-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <Footer />
    </div>
  )
}