import { NextResponse } from 'next/server';
import { EventSchema } from '@/lib/schemas';
import eventsData from '@/data/events.json';

export async function GET(request: Request) {
  // Get the URL object
  const url = new URL(request.url);
  
  // Get the slug from the query parameters
  const slug = url.searchParams.get('slug');
  
  // If slug is provided, return the specific event
  if (slug) {
    const event = eventsData.find(event => event.slug === slug);
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Validate the data against our schema
    try {
      const validatedEvent = EventSchema.parse(event);
      return NextResponse.json(validatedEvent);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid event data format' },
        { status: 500 }
      );
    }
  }
  
  // Get featured parameter
  const featuredParam = url.searchParams.get('featured');
  
  // If featured is provided, filter accordingly
  if (featuredParam) {
    const featured = featuredParam === 'true';
    const filteredEvents = eventsData.filter(event => event.featured === featured);
    
    try {
      // Validate all events against our schema
      const validatedEvents = filteredEvents.map(event => EventSchema.parse(event));
      return NextResponse.json(validatedEvents);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid event data format' },
        { status: 500 }
      );
    }
  }
  
  // Otherwise, return all events
  try {
    // Validate all events against our schema
    const validatedEvents = eventsData.map(event => EventSchema.parse(event));
    return NextResponse.json(validatedEvents);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid event data format' },
      { status: 500 }
    );
  }
}
