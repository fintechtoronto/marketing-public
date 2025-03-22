'use client'

import { HeroSection } from '@/components/hero-section'
import { EventsSection } from '@/components/events-section'
import { BlogSection } from '@/components/blog-section'
import { ContactSection } from '@/components/contact-section'
import { Navbar } from '@/components/navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <EventsSection />
      <BlogSection />
      <ContactSection />
    </main>
  )
}
