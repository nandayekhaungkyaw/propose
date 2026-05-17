"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Petal {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  rotation: number
  colorIndex: number
}

export function HeroSection() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    // Use theme-aware colors that will change with theme
    const newPetals = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 8,
      size: 8 + Math.random() * 16,
      rotation: Math.random() * 360,
      colorIndex: Math.floor(Math.random() * 4),
    }))
    setPetals(newPetals)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background using theme colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-accent/15 to-background" />
      
      {/* Subtle radial glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Floating petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {petals.map((petal) => {
          const colorClasses = [
            "fill-primary/60",
            "fill-accent/60", 
            "fill-foreground/30",
            "fill-primary/40",
          ]
          return (
            <motion.div
              key={petal.id}
              initial={{ 
                x: `${petal.x}vw`,
                y: "-5vh",
                rotate: petal.rotation,
                opacity: 0
              }}
              animate={{ 
                y: "105vh",
                rotate: petal.rotation + 720,
                opacity: [0, 1, 1, 0],
                x: [`${petal.x}vw`, `${petal.x + (Math.random() - 0.5) * 20}vw`]
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute"
              style={{
                width: petal.size,
                height: petal.size * 1.3,
              }}
            >
              <svg viewBox="0 0 20 26" className={colorClasses[petal.colorIndex]}>
                <path d="M10 0C10 0 0 8 0 16C0 20 4 26 10 26C16 26 20 20 20 16C20 8 10 0 10 0Z" />
              </svg>
            </motion.div>
          )
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1 
            className="font-[var(--font-playfair)] text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            From the moment
            <br />
            <span className="text-primary">I met you...</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 text-xl md:text-2xl text-muted-foreground"
          >
            My heart knew 💚
          </motion.p>
        </motion.div>

        {/* Glowing particles around text */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary"
              style={{
                left: `${50 + Math.cos((i / 8) * Math.PI * 2) * 40}%`,
                top: `${50 + Math.sin((i / 8) * Math.PI * 2) * 40}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
