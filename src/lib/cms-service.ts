import { Blog, Event } from '@/lib/schemas';

// Service to fetch blog posts
export async function getBlogs(featured?: boolean): Promise<Blog[]> {
  try {
    let url = '/api/blogs';
    if (featured !== undefined) {
      url += `?featured=${featured}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

// Service to fetch a single blog post by slug
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const response = await fetch(`/api/blogs?slug=${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// Service to fetch events
export async function getEvents(featured?: boolean): Promise<Event[]> {
  try {
    let url = '/api/events';
    if (featured !== undefined) {
      url += `?featured=${featured}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Service to fetch a single event by slug
export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const response = await fetch(`/api/events?slug=${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch event');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}
