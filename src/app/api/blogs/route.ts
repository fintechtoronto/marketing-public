import { NextResponse } from 'next/server';
import { BlogSchema } from '@/lib/schemas';
import blogData from '@/data/blogs.json';

export async function GET(request: Request) {
  // Get the URL object
  const url = new URL(request.url);
  
  // Get the slug from the query parameters
  const slug = url.searchParams.get('slug');
  
  // If slug is provided, return the specific blog post
  if (slug) {
    const post = blogData.find(post => post.slug === slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Validate the data against our schema
    try {
      const validatedPost = BlogSchema.parse(post);
      return NextResponse.json(validatedPost);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid blog data format' },
        { status: 500 }
      );
    }
  }
  
  // Get featured parameter
  const featuredParam = url.searchParams.get('featured');
  
  // If featured is provided, filter accordingly
  if (featuredParam) {
    const featured = featuredParam === 'true';
    const filteredPosts = blogData.filter(post => post.featured === featured);
    
    try {
      // Validate all posts against our schema
      const validatedPosts = filteredPosts.map(post => BlogSchema.parse(post));
      return NextResponse.json(validatedPosts);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid blog data format' },
        { status: 500 }
      );
    }
  }
  
  // Otherwise, return all blog posts
  try {
    // Validate all posts against our schema
    const validatedPosts = blogData.map(post => BlogSchema.parse(post));
    return NextResponse.json(validatedPosts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid blog data format' },
      { status: 500 }
    );
  }
}
