"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Search, Trophy, Users, Newspaper, Globe, User, Bell } from "lucide-react"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navigation = [
    { name: "Matches", href: "/matches", icon: Trophy },
    { name: "Teams", href: "/teams", icon: Users },
    { name: "News", href: "/news", icon: Newspaper },
    { name: "Europe", href: "/europe", icon: Globe },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold-400/20 bg-black-900/95 backdrop-blur supports-[backdrop-filter]:bg-black-900/80">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Trophy className="h-10 w-10 text-gold-400 group-hover:text-gold-300 transition-colors" />
              <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-lg group-hover:bg-gold-400/30 transition-all"></div>
            </div>
            <div>
              <span className="font-bold text-2xl text-white font-playfair">Football Hub</span>
              <div className="text-xs text-gold-400 font-medium">PREMIUM</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-sm font-medium transition-all hover:text-gold-400 text-gray-300 hover:scale-105"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden sm:flex hover:bg-gold-400/10 hover:text-gold-400"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hover:bg-gold-400/10 hover:text-gold-400 relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gold-400/10 hover:text-gold-400">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black-800 border-gold-400/20">
                <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                  <Link href="/login" className="text-gold-400">
                    Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                  <Link href="/signup" className="text-gold-400">
                    Register
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                  <Link href="/admin" className="text-gold-400">
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-gold-400/10">
                  <Link href="/profile" className="text-gold-400">
                    Profile
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-gold-400/10 hover:text-gold-400">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black-900 border-gold-400/20">
                <div className="flex flex-col space-y-6 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 text-lg font-medium text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      <item.icon className="h-6 w-6" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  <div className="border-t border-gold-400/20 pt-6">
                    <Link href="/login" className="block text-lg font-medium text-gold-400 hover:text-gold-300 mb-4">
                      Login
                    </Link>
                    <Link href="/signup" className="block text-lg font-medium text-gold-400 hover:text-gold-300">
                      Register
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gold-400" />
              <Input
                placeholder="Search matches, teams, players, or news..."
                className="pl-10 bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
