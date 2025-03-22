'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HoverCard } from '@/components/ui-layouts/hover-card'
import { StackingCards } from '@/components/ui-layouts/stacking-cards'
import { ScrollingEffect } from '@/components/ui-layouts/scrolling-effect'
import { getBlogs } from '@/lib/cms-service'

export function BlogSection() {
  const [featuredBlogs, setFeaturedBlogs] = useState([])
  const [allBlogs, setAllBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBlogs() {
      try {
        // Get featured blogs
        const featured = await getBlogs(true)
        setFeaturedBlogs(featured)
        
        // Get all blogs
        const all = await getBlogs()
        setAllBlogs(all)
      } catch (error) {
        console.error('Error loading blogs:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadBlogs()
  }, [])

  // Prepare featured blog cards for stacking component
  const featuredBlogCards = featuredBlogs.map(blog => (
    <div key={blog.id} className="p-6">
      <div className="flex gap-2 mb-2 flex-wrap">
        {blog.tags.map((tag, index) => (
          <Badge key={index} variant="secondary">{tag}</Badge>
        ))}
      </div>
      <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <span>{blog.date}</span>
        <span>•</span>
        <span>{blog.author}</span>
      </div>
      <p className="text-sm line-clamp-3 mb-4">{blog.excerpt}</p>
      <Button variant="outline" size="sm" className="mt-auto">Read Article</Button>
    </div>
  ))

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, news, and insights from Toronto's fintech ecosystem.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Featured Blogs Stacking Cards */}
            {featuredBlogs.length > 0 && (
              <div className="mb-16">
                <h3 className="text-xl font-semibold mb-6">Featured Articles</h3>
                <StackingCards cards={featuredBlogCards} className="max-w-2xl mx-auto" />
              </div>
            )}
            
            {/* All Blogs Grid */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">All Articles</h3>
                <Button variant="outline" className="rounded-full">Categories</Button>
              </div>
              
              <ScrollingEffect className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allBlogs.map(blog => (
                  <HoverCard key={blog.id} className="h-full flex flex-col">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex gap-2 mb-2 flex-wrap">
                        {blog.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <CardTitle className="text-xl">{blog.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.author}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-4 pt-2 pb-4 flex-grow">
                      <p className="text-sm line-clamp-3">{blog.excerpt}</p>
                    </CardContent>
                    
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        Read More
                      </Button>
                    </CardFooter>
                  </HoverCard>
                ))}
              </ScrollingEffect>
              
              <div className="mt-12 text-center">
                <Button size="lg" className="rounded-full">
                  View All Articles
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
