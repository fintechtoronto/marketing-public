'use client'

import { useEffect, useRef } from 'react'

// UI Layouts inspired Parallax Scroll component
export function ParallaxScroll({ children, className }) {
  const containerRef = useRef(null)
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const parallaxElements = container.querySelectorAll('[data-parallax]')
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.1
        const yPos = -(scrollY * speed)
        
        element.style.transform = `translate3d(0, ${yPos}px, 0)`
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className || ''}`}
    >
      {children}
    </div>
  )
}
