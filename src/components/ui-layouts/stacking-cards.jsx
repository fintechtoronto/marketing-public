'use client'

import { useEffect, useRef } from 'react'

// UI Layouts inspired Stacking Card component
export function StackingCards({ cards, className }) {
  const containerRef = useRef(null)
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const rect = container.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      
      const cardElements = container.querySelectorAll('.stacking-card')
      
      cardElements.forEach((card, index) => {
        const factor = (index + 1) * 0.01
        
        // Calculate the movement based on mouse position
        const moveX = (x - rect.width / 2) * factor
        const moveY = (y - rect.height / 2) * factor
        
        // Apply the transform
        card.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.05}deg)`
      })
    }
    
    const handleMouseLeave = () => {
      const cardElements = container.querySelectorAll('.stacking-card')
      
      cardElements.forEach(card => {
        card.style.transform = 'translate(0, 0) rotate(0deg)'
      })
    }
    
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className={`relative h-[400px] ${className || ''}`}
    >
      {cards.map((card, index) => (
        <div 
          key={index}
          className={`stacking-card absolute inset-0 rounded-xl bg-card border shadow-lg p-6 transition-transform duration-200 ease-out`}
          style={{
            zIndex: cards.length - index,
            top: `${index * 10}px`,
            left: `${index * 10}px`,
          }}
        >
          {card}
        </div>
      ))}
    </div>
  )
}
