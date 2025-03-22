'use client'

// UI Layouts inspired Mesh Gradient Background component
export function MeshGradientBackground({ className }) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className || ''}`}>
      <div 
        className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 via-secondary/20 to-background rounded-full blur-3xl opacity-50 transform -translate-y-1/2"
        style={{ width: '120%', left: '-10%' }}
      />
      <div 
        className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-gradient-to-tl from-primary/30 via-secondary/20 to-background rounded-full blur-3xl opacity-50"
      />
      <div 
        className="absolute top-1/2 left-1/3 h-[300px] w-[300px] bg-gradient-to-tr from-primary/20 via-background to-secondary/20 rounded-full blur-3xl opacity-40"
      />
    </div>
  )
}
