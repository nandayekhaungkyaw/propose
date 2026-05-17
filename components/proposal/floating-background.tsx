"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FloatingItem {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  type: "balloon" | "heart" | "flower"
  colorIndex: number
}

export function FloatingBackground() {
  const [items, setItems] = useState<FloatingItem[]>([])

  useEffect(() => {
    const newItems: FloatingItem[] = []
    
    // Add balloons
    for (let i = 0; i < 8; i++) {
      newItems.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 10,
        size: 30 + Math.random() * 20,
        type: "balloon",
        colorIndex: Math.floor(Math.random() * 6),
      })
    }
    
    // Add hearts
    for (let i = 8; i < 20; i++) {
      newItems.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 8,
        size: 15 + Math.random() * 15,
        type: "heart",
        colorIndex: Math.floor(Math.random() * 4),
      })
    }
    
    // Add flowers
    for (let i = 20; i < 35; i++) {
      newItems.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 8,
        size: 20 + Math.random() * 15,
        type: "flower",
        colorIndex: Math.floor(Math.random() * 5),
      })
    }
    
    setItems(newItems)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ 
            x: `${item.x}vw`,
            y: "110vh",
            rotate: 0,
            opacity: 0
          }}
          animate={{ 
            y: "-10vh",
            rotate: item.type === "flower" ? 360 : 0,
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute"
          style={{
            width: item.size,
            height: item.size,
          }}
        >
          {item.type === "balloon" && <Balloon colorIndex={item.colorIndex} />}
          {item.type === "heart" && <Heart colorIndex={item.colorIndex} />}
          {item.type === "flower" && <Flower colorIndex={item.colorIndex} />}
        </motion.div>
      ))}
    </div>
  )
}

function Balloon({ colorIndex }: { colorIndex: number }) {
  // Use theme-aware colors with Tailwind classes
  const colorClasses = [
    "fill-primary",
    "fill-accent", 
    "fill-primary/80",
    "fill-accent/80",
    "fill-primary/60",
    "fill-accent/60",
  ]
  
  return (
    <svg viewBox="0 0 50 70" className={`w-full h-full ${colorClasses[colorIndex]}`}>
      <ellipse cx="25" cy="22" rx="20" ry="22" />
      <ellipse cx="25" cy="22" rx="20" ry="22" fill="white" fillOpacity="0.2" />
      <path d="M25 44 L23 50 L27 50 Z" />
      <path d="M25 50 Q 20 55 25 70" className="stroke-current" strokeWidth="1" fill="none" />
      <ellipse cx="18" cy="15" rx="5" ry="3" fill="white" fillOpacity="0.3" />
    </svg>
  )
}

function Heart({ colorIndex }: { colorIndex: number }) {
  const colorClasses = [
    "fill-primary",
    "fill-accent",
    "fill-primary/70",
    "fill-accent/70",
  ]
  
  return (
    <svg viewBox="0 0 100 100" className={`w-full h-full ${colorClasses[colorIndex]}`}>
      <path d="M50 88 C20 60 5 40 5 25 C5 10 20 0 35 0 C42 0 48 3 50 8 C52 3 58 0 65 0 C80 0 95 10 95 25 C95 40 80 60 50 88Z" />
    </svg>
  )
}

function Flower({ colorIndex }: { colorIndex: number }) {
  const colorClasses = [
    "fill-primary/60",
    "fill-accent/60",
    "fill-primary/40",
    "fill-accent/40",
    "fill-primary/50",
  ]
  
  return (
    <svg viewBox="0 0 50 50" className={`w-full h-full`}>
      {/* Petals */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse
          key={i}
          cx="25"
          cy="12"
          rx="8"
          ry="12"
          className={colorClasses[colorIndex]}
          transform={`rotate(${angle} 25 25)`}
        />
      ))}
      {/* Center */}
      <circle cx="25" cy="25" r="8" className="fill-accent" />
      <circle cx="25" cy="25" r="5" className="fill-primary" />
    </svg>
  )
}
