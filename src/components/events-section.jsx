'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ImageRippleEffect } from '@/components/ui-layouts/image-ripple-effect'
import { HoverCard } from '@/components/ui-layouts/hover-card'
import { ImageAccordion } from '@/components/ui-layouts/image-accordion'
import { getEvents } from '@/lib/cms-service'

export function EventsSection() {
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [allEvents, setAllEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      try {
        // Get featured events
        const featured = await getEvents(true)
        setFeaturedEvents(featured)
        
        // Get all events
        const all = await getEvents()
        setAllEvents(all)
      } catch (error) {
        console.error('Error loading events:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadEvents()
  }, [])

  // Prepare data for image accordion
  const accordionItems = featuredEvents.map(event => ({
    title: event.title,
    description: event.date,
    image: event.image || '/images/events/default.jpg'
  }))

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with Toronto's fintech community at our upcoming events, workshops, and networking opportunities.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Featured Events Accordion */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold mb-6">Featured Events</h3>
              {featuredEvents.length > 0 ? (
                <ImageAccordion items={accordionItems} className="rounded-xl overflow-hidden" />
              ) : (
                <p>No featured events at this time.</p>
              )}
            </div>
            
            {/* All Events Grid */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">All Events</h3>
                <Button variant="outline" className="rounded-full">View Calendar</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allEvents.map(event => (
                  <HoverCard key={event.id} className="h-full flex flex-col">
                    <div className="h-48 mb-4 overflow-hidden rounded-lg">
                      <ImageRippleEffect 
                        src={event.image || '/images/events/default.jpg'} 
                        alt={event.title}
                        className="h-full w-full"
                      />
                    </div>
                    
                    <CardHeader className="p-0 pb-2">
                      <div className="flex gap-2 mb-2 flex-wrap">
                        {event.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-0 pb-4 flex-grow">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      <p className="text-sm line-clamp-3">{event.description}</p>
                    </CardContent>
                    
                    <CardFooter className="p-0 pt-2">
                      <Button className="w-full" asChild>
                        <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                          Register Now
                        </a>
                      </Button>
                    </CardFooter>
                  </HoverCard>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Button size="lg" className="rounded-full">
                  View All Events
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
