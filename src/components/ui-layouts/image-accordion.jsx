'use client'

import { useEffect, useRef } from 'react'

// UI Layouts inspired Image Accordion component
export function ImageAccordion({ items, className }) {
  const accordionRef = useRef(null)
  
  useEffect(() => {
    const accordion = accordionRef.current
    if (!accordion) return
    
    const panels = accordion.querySelectorAll('.accordion-panel')
    
    panels.forEach(panel => {
      panel.addEventListener('mouseenter', () => {
        panels.forEach(p => p.classList.remove('active'))
        panel.classList.add('active')
      })
    })
    
    // Set first panel as active by default
    if (panels.length > 0) {
      panels[0].classList.add('active')
    }
    
    return () => {
      panels.forEach(panel => {
        panel.removeEventListener('mouseenter', () => {})
      })
    }
  }, [])
  
  return (
    <div 
      ref={accordionRef}
      className={`grid grid-cols-1 md:grid-cols-${items.length} h-[400px] md:h-[500px] ${className || ''}`}
    >
      {items.map((item, index) => (
        <div 
          key={index}
          className="accordion-panel relative overflow-hidden transition-all duration-500 ease-in-out flex-grow hover:flex-grow-[3] cursor-pointer"
          style={{
            flex: 1,
          }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-500" />
          </div>
          
          <div className="relative h-full flex flex-col justify-end p-4 md:p-6 text-white opacity-0 transition-opacity duration-300 accordion-panel-active:opacity-100">
            <h3 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm md:text-base">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
