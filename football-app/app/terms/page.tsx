"use client"

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-black-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="space-y-6 text-gray-400 leading-relaxed">
            <p>Welcome to Nigeria Football Hub ("we," "us," "our"). These Terms of Service govern your access to and use of our website and related services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.</p>
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p>You must be at least 13 years old to use the Service. By accessing or using the Service, you represent and warrant that you have read, understood, and agree to be bound by these Terms.</p>
            <h2 className="text-xl font-semibold">2. Changes to Terms</h2>
            <p>We may modify these Terms at any time. We will notify you by posting the updated Terms on the Site and updating the “Last updated” date. Your continued use after such changes constitutes your acceptance of the new Terms.</p>
            <h2 className="text-xl font-semibold">3. Use of the Service</h2>
            <p>The Service provides real-time and scheduled football match scores, news updates, and related content. You agree to use the Service only for lawful purposes and in compliance with all applicable laws, and you will not:</p>
            <ul className="list-disc pl-6">
              <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with any person or entity.</li>
              <li>Use the Service for any unauthorized commercial purpose.</li>
              <li>Interfere with or disrupt the Service or servers, networks, or content.</li>
            </ul>
            <h2 className="text-xl font-semibold">4. User Content</h2>
            <p>When you submit content to the Service (e.g., comments, feedback), you grant us a worldwide, royalty-free, non-exclusive license to use, reproduce, modify, and distribute that content in connection with the Service.</p>
            <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
            <p>All content, features, and functionality of the Service, including text, graphics, logos, and software, are owned by us or our licensors and are protected by copyright, trademark, and other laws. You may not copy, reproduce, or redistribute any portion without our express written consent.</p>
            <h2 className="text-xl font-semibold">6. Disclaimers and Limitation of Liability</h2>
            <p>The Service is provided “as is” and “as available.” We do not guarantee uninterrupted or error-free operation. We disclaim all warranties, express or implied, including fitness for a particular purpose. In no event will we be liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>
            <h2 className="text-xl font-semibold">7. Governing Law</h2>
            <p>These Terms are governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.</p>
            <p><strong>Last updated:</strong> September 11, 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
