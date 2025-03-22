'use client'

import { useState } from 'react'

// UI Layouts inspired Sparkles component
export function Sparkles({ children, className }) {
  const [sparkles, setSparkles] = useState([])
  
  const createSparkle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newSparkle = {
      id: Date.now(),
      x,
      y,
      size: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`,
    }
    
    setSparkles((prev) => [...prev, newSparkle])
    
    // Remove sparkle after animation
    setTimeout(() => {
      setSparkles((prev) => prev.filter((sparkle) => sparkle.id !== newSparkle.id))
    }, 700)
  }
  
  return (
    <div 
      className={`relative overflow-hidden ${className || ''}`}
      onMouseMove={createSparkle}
    >
      {children}
      
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-sparkle"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            borderRadius: '50%',
            opacity: 0,
            transform: 'scale(0)',
            animation: 'sparkle 700ms forwards',
          }}
        />
      ))}
    </div>
  )
}
