'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { MeshGradientBackground } from '@/components/ui-layouts/mesh-gradient'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('blogs')
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    slug: '',
    author: '',
    excerpt: '',
    content: '',
    tags: '',
    featured: false
  })
  const [eventFormData, setEventFormData] = useState({
    title: '',
    slug: '',
    date: '',
    time: '',
    location: '',
    description: '',
    registrationLink: '',
    tags: '',
    featured: false
  })
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' })

  const handleBlogChange = (e) => {
    const { name, value, type, checked } = e.target
    setBlogFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleEventChange = (e) => {
    const { name, value, type, checked } = e.target
    setEventFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleBlogSubmit = (e) => {
    e.preventDefault()
    // In a real implementation, this would send data to the API
    console.log('Blog submitted:', blogFormData)
    setSubmitStatus({ success: true, message: 'Blog post created successfully!' })
    
    // Reset form after submission
    setTimeout(() => {
      setBlogFormData({
        title: '',
        slug: '',
        author: '',
        excerpt: '',
        content: '',
        tags: '',
        featured: false
      })
      setSubmitStatus({ success: false, message: '' })
    }, 3000)
  }

  const handleEventSubmit = (e) => {
    e.preventDefault()
    // In a real implementation, this would send data to the API
    console.log('Event submitted:', eventFormData)
    setSubmitStatus({ success: true, message: 'Event created successfully!' })
    
    // Reset form after submission
    setTimeout(() => {
      setEventFormData({
        title: '',
        slug: '',
        date: '',
        time: '',
        location: '',
        description: '',
        registrationLink: '',
        tags: '',
        featured: false
      })
      setSubmitStatus({ success: false, message: '' })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <MeshGradientBackground />
      
      <div className="container mx-auto py-10">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">FintechToronto Admin</CardTitle>
            <CardDescription>Manage your blog posts and events</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="blogs" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="blogs" className="mt-6">
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={blogFormData.title}
                      onChange={handleBlogChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input 
                      id="slug" 
                      name="slug" 
                      value={blogFormData.slug}
                      onChange={handleBlogChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input 
                      id="author" 
                      name="author" 
                      value={blogFormData.author}
                      onChange={handleBlogChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea 
                      id="excerpt" 
                      name="excerpt" 
                      value={blogFormData.excerpt}
                      onChange={handleBlogChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea 
                      id="content" 
                      name="content" 
                      value={blogFormData.content}
                      onChange={handleBlogChange}
                      required
                      rows={10}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input 
                      id="tags" 
                      name="tags" 
                      value={blogFormData.tags}
                      onChange={handleBlogChange}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={blogFormData.featured}
                      onChange={handleBlogChange}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="featured">Featured Post</Label>
                  </div>
                  
                  <Button type="submit" className="w-full">Create Blog Post</Button>
                </form>
              </TabsContent>
              
              <TabsContent value="events" className="mt-6">
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-title">Title</Label>
                    <Input 
                      id="event-title" 
                      name="title" 
                      value={eventFormData.title}
                      onChange={handleEventChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-slug">Slug</Label>
                    <Input 
                      id="event-slug" 
                      name="slug" 
                      value={eventFormData.slug}
                      onChange={handleEventChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input 
                        id="date" 
                        name="date" 
                        value={eventFormData.date}
                        onChange={handleEventChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input 
                        id="time" 
                        name="time" 
                        value={eventFormData.time}
                        onChange={handleEventChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={eventFormData.location}
                      onChange={handleEventChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={eventFormData.description}
                      onChange={handleEventChange}
                      required
                      rows={5}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registrationLink">Registration Link</Label>
                    <Input 
                      id="registrationLink" 
                      name="registrationLink" 
                      value={eventFormData.registrationLink}
                      onChange={handleEventChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-tags">Tags (comma separated)</Label>
                    <Input 
                      id="event-tags" 
                      name="tags" 
                      value={eventFormData.tags}
                      onChange={handleEventChange}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="event-featured"
                      name="featured"
                      checked={eventFormData.featured}
                      onChange={handleEventChange}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="event-featured">Featured Event</Label>
                  </div>
                  
                  <Button type="submit" className="w-full">Create Event</Button>
                </form>
              </TabsContent>
            </Tabs>
            
            {submitStatus.success && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md">
                {submitStatus.message}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
