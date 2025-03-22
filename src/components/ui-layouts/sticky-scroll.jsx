'use client'

import { useState, useEffect } from 'react'

// UI Layouts inspired Sticky Scroll component
export function StickyScroll({ children, className }) {
  const [activeSection, setActiveSection] = useState(0)
  const [sections, setSections] = useState([])

  useEffect(() => {
    // Find all sections within the component
    const sectionElements = document.querySelectorAll('[data-section]')
    setSections(Array.from(sectionElements))

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      // Find the current active section based on scroll position
      for (let i = 0; i < sectionElements.length; i++) {
        const section = sectionElements[i]
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`relative ${className || ''}`}>
      <div className="absolute right-0 top-1/4 hidden lg:block">
        <div className="flex flex-col gap-2 p-4">
          {sections.map((_, index) => (
            <div 
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === activeSection 
                  ? 'bg-primary scale-150' 
                  : 'bg-muted hover:bg-primary/50'
              }`}
              onClick={() => {
                if (sections[index]) {
                  sections[index].scrollIntoView({ behavior: 'smooth' })
                }
              }}
            />
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}
