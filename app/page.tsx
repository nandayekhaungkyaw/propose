"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { PasswordEntry } from "@/components/proposal/password-entry"
import { HeroSection } from "@/components/proposal/hero-section"
import { LoveMessageSection } from "@/components/proposal/love-message-section"
import { GalleryBookSection } from "@/components/proposal/gallery-book-section"
import { HeartPhotoSection } from "@/components/proposal/heart-photo-section"
import { CountdownTimer } from "@/components/proposal/countdown-timer"
import { ProposeSection } from "@/components/proposal/propose-section"
import { FloatingBackground } from "@/components/proposal/floating-background"
import { Navbar } from "@/components/proposal/navbar"

export default function ProposalPage() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<"green" | "blue" | "pink" | "purple">("green")
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Apply theme class to html element
  useEffect(() => {
    const html = document.documentElement
    html.classList.remove("theme-green", "theme-blue", "theme-pink","theme-purple")
    html.classList.add(`theme-${currentTheme}`)
  }, [currentTheme])

  const musicRef = useRef<HTMLAudioElement | null>(null)

useEffect(() => {
  const audio = new Audio("/love.mp3")
  audio.loop = true
  audio.volume = 0.5

  musicRef.current = audio
}, [])
  // Add floating heart on click
  const handleClick = useCallback((e: MouseEvent) => {
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    }
    setFloatingHearts((prev) => [...prev, newHeart])
    
    // Remove heart after animation
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
    }, 2000)
  }, [])

  useEffect(() => {
    if (isUnlocked) {
      window.addEventListener("click", handleClick)
      return () => window.removeEventListener("click", handleClick)
    }
  }, [isUnlocked, handleClick])

  // Relationship start date (customize this!)
  const relationshipStartDate = new Date("2018-10-29")

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Password entry overlay */}
      <AnimatePresence>
        {!isUnlocked && (
          <PasswordEntry 
            onUnlock={() => setIsUnlocked(true)} 
            correctPassword="iloveyou"
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Floating background with balloons, hearts, flowers */}
            <FloatingBackground />
            
            {/* Navigation bar with theme switcher */}
            <Navbar 
              isMusicPlaying={isMusicPlaying}
             onMusicToggle={() => {
  const music = musicRef.current
  if (!music) return

  if (isMusicPlaying) {
    music.pause()
  } else {
    music.play()
  }

  setIsMusicPlaying(!isMusicPlaying)
}}
              currentTheme={currentTheme}
              onThemeChange={setCurrentTheme}
            />

            {/* Sections - IDs are inside each component */}
            <HeroSection />
            <CountdownTimer startDate={relationshipStartDate} />
            <LoveMessageSection />
            <GalleryBookSection />
            
            <HeartPhotoSection />
            <ProposeSection />

            {/* Footer */}
            <footer className="py-12 text-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-sm"
              >
                Made with love, just for you
              </motion.p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click-generated floating hearts */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              x: heart.x - 12, 
              y: heart.y - 12, 
              scale: 0,
              opacity: 1 
            }}
            animate={{ 
              y: heart.y - 100,
              scale: [0, 1, 1.2, 0],
              opacity: [1, 1, 0.5, 0]
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute text-2xl text-primary"
          >
            &#10084;
          </motion.div>
        ))}
      </div>
    </main>
  )
}
