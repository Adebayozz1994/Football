"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import axios from "@/utils/axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const response = await axios.post("/contact", formData);
      if (response.data.success) {
        setStatus("Your message has been sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus(
          response.data.message ||
            "Failed to send message. Please try again later."
        );
      }
    } catch (err) {
      setStatus("An unexpected error occurred. Please try again.");
    } finally {
      // Clear status message after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-black-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Get in Touch</h2>
              <p className="text-gray-400">
                Have questions or feedback? Send us a message and we'll get back
                to you shortly.
              </p>
              <div className="flex items-center space-x-2">
                <Mail className="text-gold-400" />
                <span>ogunladeadebayopeter@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-gold-400" />
                <span>+234 816 622 3968</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="text-gold-400" />
                <span>Ogbomoso, Nigeria</span>
              </div>
              {/* Social Media Links */}
              <div className="flex space-x-4 mt-4">
                {[
                  {
                    Icon: Facebook,
                    href: "https://web.facebook.com/Adebayozz",
                  },
                  { Icon: Twitter, href: "https://x.com/Adebayozz1" },
                  {
                    Icon: Linkedin,
                    href: "https://www.linkedin.com/in/ogunlade-adebayo-2a1786294/",
                  },
                  { Icon: Github, href: "https://github.com/Adebayozz1994" },
                ].map(({ Icon, href }, i) => (
                  <Link
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    <Icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-black-800 border-gold-400/30 text-white focus:border-gold-400"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-black-800 border-gold-400/30 text-white focus:border-gold-400"
                />
              </div>
              <div>
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-black-800 border-gold-400/30 text-white focus:border-gold-400"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-black-800 border-gold-400/30 text-white focus:border-gold-400 h-32"
                />
              </div>
              <Button type="submit" className="w-full btn-gold">
                Send Message
              </Button>
              {status && (
                <p className="mt-2 text-center text-green-400">{status}</p>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
