"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Eye, EyeOff, Mail, Lock, User, MapPin, ArrowRight, Facebook, Chrome, Phone } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"
import axios from "@/utils/axios"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    favoriteState: "",
    favoriteTeam: "",
  })
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ]

  const popularTeams = [
    "Lagos United",
    "Kano Pillars",
    "Rivers United",
    "Enyimba FC",
    "Plateau United",
    "Heartland FC",
    "Shooting Stars",
    "Lobi Stars",
    "Akwa United",
    "Nasarawa United",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleProfileUpdate = async (user: any, initialData: any) => {
    // TODO: Implement profile update logic with your chosen backend
    console.log("Profile update would be handled here:", { user, initialData })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      })
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { data } = await axios.post("/api/user/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        favoriteState: formData.favoriteState,
        favoriteTeam: formData.favoriteTeam,
      });

      toast({
        title: "Account Created!",
        description: "Your account has been created successfully.",
      });
      router.push("/login");
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "An error occurred during signup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleSocialSignup = async (provider: "google" | "facebook") => {
    setIsLoading(true)
    // TODO: Implement social authentication with your chosen provider
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Social Signup",
        description: `${provider} signup is not yet implemented.`,
        variant: "destructive",
      })
    } catch (error) {
      toast({
        title: `${provider} Signup Failed`,
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-gold mb-6">
              <Trophy className="h-10 w-10 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Join Football Hub</h1>
            <p className="text-gray-400">Create your account and start your premium football experience</p>
          </div>

          {/* Signup Card */}
          <Card className="card-black-gold">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-white">Create Account</CardTitle>
              <CardDescription className="text-center text-gray-400">
                Fill in your details to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social Signup */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full btn-black bg-transparent"
                  type="button"
                  onClick={() => handleSocialSignup("google")}
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Sign up with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full btn-black bg-transparent"
                  type="button"
                  onClick={() => handleSocialSignup("facebook")}
                >
                  <Facebook className="mr-2 h-4 w-4" />
                  Sign up with Facebook
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-yellow-400/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">Or create account with email</span>
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="pl-10 bg-gray-900 border-yellow-400/30 text-white placeholder:text-gray-400 focus:border-yellow-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="pl-10 bg-gray-900 border-yellow-400/30 text-white placeholder:text-gray-400 focus:border-yellow-400"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10 bg-gray-900 border-yellow-400/30 text-white placeholder:text-gray-400 focus:border-yellow-400"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-10 bg-gray-900 border-yellow-400/30 text-white placeholder:text-gray-400 focus:border-yellow-400"
                      required
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10 pr-10 bg-gray-900 border-yellow-400/30 text-white placeholder:text-gray-400 focus:border-yellow-400"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10 pr-10 bg-gray-900 border-yellow-400/30 text-white placeholder:text-gray-400 focus:border-yellow-400"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="favoriteState" className="text-white">
                      Favorite State
                    </Label>
                    <Select
                      value={formData.favoriteState}
                      onValueChange={(value) => handleInputChange("favoriteState", value)}
                    >
                      <SelectTrigger className="bg-gray-900 border-yellow-400/30 text-white">
                        <MapPin className="h-4 w-4 text-yellow-400 mr-2" />
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-yellow-400/20">
                        {nigerianStates.map((state) => (
                          <SelectItem key={state} value={state} className="text-yellow-400">
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="favoriteTeam" className="text-white">
                      Favorite Team
                    </Label>
                    <Select
                      value={formData.favoriteTeam}
                      onValueChange={(value) => handleInputChange("favoriteTeam", value)}
                    >
                      <SelectTrigger className="bg-gray-900 border-yellow-400/30 text-white">
                        <Trophy className="h-4 w-4 text-yellow-400 mr-2" />
                        <SelectValue placeholder="Select your team" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-yellow-400/20">
                        {popularTeams.map((team) => (
                          <SelectItem key={team} value={team} className="text-yellow-400">
                            {team}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                      className="border-yellow-400/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-black"
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-400">
                      I agree to the{" "}
                      <Link href="/terms" className="text-yellow-400 hover:text-yellow-300">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-yellow-400 hover:text-yellow-300">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={subscribeNewsletter}
                      onCheckedChange={(checked) => setSubscribeNewsletter(checked as boolean)}
                      className="border-yellow-400/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-black"
                    />
                    <Label htmlFor="newsletter" className="text-sm text-gray-400">
                      Subscribe to our newsletter for latest football updates
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full btn-gold" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Creating account...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}