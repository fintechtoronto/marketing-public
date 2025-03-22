'use client'

// UI Layouts inspired Hover Card component
export function HoverCard({ children, className }) {
  return (
    <div 
      className={`group relative overflow-hidden rounded-lg bg-background p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className || ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
