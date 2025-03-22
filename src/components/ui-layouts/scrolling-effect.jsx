'use client'

// UI Layouts inspired Scrolling Effect component
export function ScrollingEffect({ children, className }) {
  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background z-10 pointer-events-none" />
      <div className="overflow-auto max-h-[500px] scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent pr-4">
        {children}
      </div>
    </div>
  )
}
