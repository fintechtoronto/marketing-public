'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MeshGradientBackground } from '@/components/ui-layouts/mesh-gradient'
import { Sparkles } from '@/components/ui-layouts/sparkles'
import { MotionNumber } from '@/components/ui-layouts/motion-number'
import { ParallaxScroll } from '@/components/ui-layouts/parallax-scroll'

export function HeroSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address')
      return
    }
    
    // In a real app, this would send the email to a backend service
    console.log('Subscribing email:', email)
    setSubscribed(true)
    setError('')
    setEmail('')
    
    // Reset subscription status after 5 seconds
    setTimeout(() => {
      setSubscribed(false)
    }, 5000)
  }

  return (
    <ParallaxScroll className="relative min-h-[90vh] flex items-center">
      <MeshGradientBackground />
      
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6" data-parallax="0.1">
            <Sparkles>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Toronto's Fintech Community
              </h1>
            </Sparkles>
            
            <p className="text-xl text-muted-foreground max-w-xl">
              Connect with innovators, entrepreneurs, and industry leaders shaping the future of financial technology in Toronto.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full">
                View All Events
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Read Our Blog
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">
                  <MotionNumber value={500} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Community Members</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  <MotionNumber value={50} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Annual Events</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  <MotionNumber value={100} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Fintech Partners</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-lg" data-parallax="0.05">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Join Our Newsletter</h2>
              <p className="text-muted-foreground">
                Stay updated with the latest fintech news, events, and opportunities in Toronto.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg"
                  />
                  {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                </div>
                
                <Button type="submit" className="w-full rounded-lg">
                  Subscribe
                </Button>
              </form>
              
              {subscribed && (
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 p-3 rounded-lg text-sm">
                  Thank you for subscribing! You'll receive our next newsletter soon.
                </div>
              )}
              
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to receive emails from FintechToronto. We respect your privacy and will never share your information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ParallaxScroll>
  )
}
