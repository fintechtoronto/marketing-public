'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// UI Layouts inspired Image Ripple Effect component
export function ImageRippleEffect({ src, alt, className }) {
  const [ripples, setRipples] = useState([])
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      x,
      y,
      id: Date.now(),
    }
    
    setRipples((prev) => [...prev, newRipple])
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 1000)
  }
  
  return (
    <div 
      className={`relative overflow-hidden ${className || ''}`}
      onMouseMove={handleMouseMove}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{ 
            left: ripple.x, 
            top: ripple.y,
            translateX: '-50%',
            translateY: '-50%'
          }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
