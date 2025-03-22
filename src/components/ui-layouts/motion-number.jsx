'use client'

import { useState } from 'react'

// UI Layouts inspired Motion Number component
export function MotionNumber({ value, prefix = '', suffix = '', duration = 1000 }) {
  const [displayValue, setDisplayValue] = useState(0)
  
  // Animate the number on component mount
  useState(() => {
    let startTime
    let animationFrame
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      
      // Calculate the current value based on progress
      const percentage = Math.min(progress / duration, 1)
      const currentValue = Math.floor(percentage * value)
      
      setDisplayValue(currentValue)
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration])
  
  return (
    <div className="inline-block font-bold">
      <span className="text-primary">{prefix}</span>
      <span className="transition-all">{displayValue}</span>
      <span className="text-primary">{suffix}</span>
    </div>
  )
}
