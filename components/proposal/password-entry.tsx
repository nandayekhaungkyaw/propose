"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Lock } from "lucide-react"

interface PasswordEntryProps {
  onUnlock: () => void
  correctPassword?: string
}

export function PasswordEntry({ onUnlock, correctPassword = "iloveyou" }: PasswordEntryProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [showFlowerBurst, setShowFlowerBurst] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.toLowerCase() === correctPassword.toLowerCase()) {
      setIsUnlocking(true)
      setShowFlowerBurst(true)
      setTimeout(() => {
        onUnlock()
      }, 2500)
    } else {
      setError(true)
      setTimeout(() => setError(false), 500)
    }
  }

  return (
    <AnimatePresence>
      {!isUnlocking ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
            <FloatingParticles />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10 flex flex-col items-center gap-8 px-6"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm"
            >
              <Lock className="h-10 w-10 text-primary" />
            </motion.div>

            <div className="text-center">
              <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
                A Secret Awaits
              </h1>
              <p className="mt-2 text-muted-foreground">
                Enter our special code to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-sm">
              <div className="relative">
                <motion.input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter our secret code"
                  className={`w-full rounded-xl border-2 bg-card px-6 py-4 text-center text-lg text-card-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 ${
                    error
                      ? "border-destructive"
                      : "border-border focus:border-primary"
                  }`}
                  animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                <Heart className="h-5 w-5" />
                Unlock Our Story
              </motion.button>
            </form>

            <p className="text-sm text-muted-foreground/60">
              Hint: What do I always tell you?
            </p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.5, delay: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
        >
          {/* Massive flower burst */}
          {showFlowerBurst && <FlowerBurst />}
          
          {/* Center heart */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.5, 2, 0] }}
            transition={{ duration: 2 }}
          >
            <Heart className="h-20 w-20 text-primary" fill="currentColor" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; size: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 4 + 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: `${particle.x}vw`, 
            y: "110vh",
            opacity: 0.3 
          }}
          animate={{ 
            y: "-10vh",
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  )
}

function FlowerBurst() {
  const [flowers, setFlowers] = useState<Array<{
    id: number
    x: number
    y: number
    angle: number
    distance: number
    rotation: number
    size: number
    type: string
    delay: number
  }>>([])

  useEffect(() => {
    const flowerTypes = ["🌸", "🌺", "🌷", "🌹", "🌼", "💐", "🪻", "🌻"]
    const centerX = 50
    const centerY = 50
    
    const newFlowers = Array.from({ length: 100 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 100 + Math.random() * 0.5
      const distance = 30 + Math.random() * 70
      return {
        id: i,
        x: centerX,
        y: centerY,
        angle,
        distance,
        rotation: Math.random() * 720 - 360,
        size: 20 + Math.random() * 30,
        type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
        delay: Math.random() * 0.3,
      }
    })
    setFlowers(newFlowers)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          initial={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            scale: 0,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            left: `${flower.x + Math.cos(flower.angle) * flower.distance}%`,
            top: `${flower.y + Math.sin(flower.angle) * flower.distance}%`,
            scale: [0, 1.5, 1],
            rotate: flower.rotation,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: flower.delay,
            ease: "easeOut",
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ fontSize: flower.size }}
        >
          {flower.type}
        </motion.div>
      ))}
    </div>
  )
}
