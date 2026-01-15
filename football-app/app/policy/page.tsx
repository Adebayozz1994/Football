"use client"

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-black-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-gray-400 leading-relaxed">
            <p>Your privacy is important to Nigeria Football Hub. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <ul className="list-disc pl-6">
              <li><strong>Personal Data:</strong> Information you provide directly, such as name, email, and message content when contacting us.</li>
              <li><strong>Usage Data:</strong> Automatically collected data about your interactions, including IP address, browser type, pages visited, and timestamps.</li>
              <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance functionality, remember your preferences, and analyze site traffic.</li>
            </ul>
            <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6">
              <li><strong>Provide & Maintain Service:</strong> To deliver match scores, news updates, and other features.</li>
              <li><strong>Communication:</strong> To respond to inquiries, send newsletters, and notifications.</li>
              <li><strong>Analytics:</strong> To understand usage patterns, improve the site, and diagnose technical issues.</li>
              <li><strong>Security:</strong> To protect against fraud and unauthorized access.</li>
            </ul>
            <h2 className="text-xl font-semibold">3. Information Sharing</h2>
            <p>We do not sell or rent your personal data. We may share data with:</p>
            <ul className="list-disc pl-6">
              <li><strong>Service Providers:</strong> Third-party vendors who assist with site operations (e.g., hosting, analytics).</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
            </ul>
            <h2 className="text-xl font-semibold">4. Cookies & Tracking Technologies</h2>
            <p>We use cookies, local storage, and similar technologies. You can manage cookie preferences through your browser settings.</p>
            <h2 className="text-xl font-semibold">5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information. However, no method of transmission over the Internet is completely secure.</p>
            <h2 className="text-xl font-semibold">6. Data Retention</h2>
            <p>We retain personal data only as long as necessary for the purposes outlined. Usage data may be kept for analytics purposes.</p>
            <h2 className="text-xl font-semibold">7. Children’s Privacy</h2>
            <p>Our Service is not directed to individuals under 13. We do not knowingly collect personal data from children under 13. If you become aware of such data, please contact us.</p>
            <h2 className="text-xl font-semibold">8. Third-Party Links</h2>
            <p>Our site may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their policies.</p>
            <h2 className="text-xl font-semibold">9. Changes to this Policy</h2>
            <p>We may update this policy. We will post any changes on this page with a revised "Last updated" date.</p>
            <p><strong>Last updated:</strong> September 11, 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
