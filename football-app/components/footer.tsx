import Link from "next/link"
import { Trophy, Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-black-900 border-t border-gold-400/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <Trophy className="h-10 w-10 text-gold-400" />
              <div>
                <span className="font-bold text-2xl text-white font-playfair">Football Hub</span>
                <div className="text-xs text-gold-400 font-medium">PREMIUM</div>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              The ultimate destination for Nigerian local football and European leagues coverage with premium features
              and real-time updates.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: 'https://web.facebook.com/Adebayozz' },
                { Icon: Twitter, href: 'https://x.com/Adebayozz1' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/ogunlade-adebayo-2a1786294/' },
                { Icon: Github, href: 'https://github.com/Adebayozz1994' },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  <social.Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-6 text-white text-lg">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Live Matches", href: "/matches" },
                { name: "Teams", href: "/teams" },
                { name: "Latest News", href: "/news" },
                { name: "European Football", href: "/europe" },
                { name: "Statistics", href: "/stats" },
                { name: "Fixtures", href: "/fixtures" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-gold-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nigerian States */}
          <div>
            <h3 className="font-semibold mb-6 text-white text-lg">Popular States</h3>
            <ul className="space-y-4">
              {[
                { name: "Lagos State", href: "/states/lagos" },
                { name: "Kano State", href: "/states/kano" },
                { name: "Rivers State", href: "/states/rivers" },
                { name: "Oyo State", href: "/states/oyo" },
                { name: "Abia State", href: "/states/abia" },
                { name: "FCT Abuja", href: "/states/fct" },
              ].map((state) => (
                <li key={state.name}>
                  <Link href={state.href} className="text-gray-400 hover:text-gold-400 transition-colors">
                    {state.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="font-semibold mb-6 text-white text-lg">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to get the latest football news and match updates.</p>
            <div className="space-y-4 mb-6">
              <Input
                placeholder="Enter your email"
                className="bg-black-800 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
              />
              <Button className="w-full btn-gold">Subscribe</Button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2 text-gold-400" />
                ogunladeadebayopeter@gmail.com
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2 text-gold-400" />
                +234 816622 3968
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2 text-gold-400" />
                Ogbomoso, Nigeria
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gold-400/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2025 Nigeria Football Hub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/policy" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
