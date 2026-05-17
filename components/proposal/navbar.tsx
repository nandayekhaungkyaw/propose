"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Palette, Heart, BookOpen, Clock, ImageIcon, HelpCircle, Volume2, VolumeX, Menu, X } from "lucide-react"

interface NavbarProps {
  isMusicPlaying: boolean
  onMusicToggle: () => void
  currentTheme: "green" | "blue" | "pink" | "purple"
  onThemeChange: (theme: "green" | "blue" | "pink" | "purple") => void
}

const sections = [
  { id: "hero", label: "Home", icon: Heart },
  { id: "love-message", label: "Our Story", icon: BookOpen },
  { id: "memory-book", label: "Memories", icon: ImageIcon },
  { id: "countdown", label: "Together", icon: Clock },
  { id: "heart-photos", label: "Gallery", icon: Heart },
  { id: "propose", label: "Question", icon: HelpCircle },
]

const themes = [
  {
    id: "green",
    primary: "#00ff88",
    tailwind: "emerald",
    label: "Green"
  },
  {
    id: "blue",
    primary: "#00a8ff",
    tailwind: "sky",
    label: "Blue"
  },
  {
    id: "pink" as const,
    primary: "#ff6b9d",
    tailwind: "pink",
    label: "Pink"
  },
  { id: "purple" as const, primary: "#a855f7", tailwind: "violet", label: "Purple" },
]

export function Navbar({ isMusicPlaying, onMusicToggle, currentTheme, onThemeChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [showThemePicker, setShowThemePicker] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Find active section
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      })).filter(s => s.element)

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i]
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-card/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo / Title */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary fill-primary" />
              <span className="font-serif text-base sm:text-lg text-foreground hidden sm:inline">Our Love Story</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <motion.button
                    key={section.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{section.label}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-2 sm:gap-3 ">
              {/* Theme picker */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowThemePicker(!showThemePicker)}
                  className="p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border text-foreground hover:bg-secondary transition-all"
                  aria-label="Change theme"
                >
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>

                <AnimatePresence>
                  {showThemePicker && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      className="absolute right-0 top-full mt-2 bg-card/95 backdrop-blur-md rounded-xl border border-border p-2 shadow-xl"
                    >
                      <div className="flex gap-2">
                        {themes.map((theme) => (
                          <motion.button
                            key={theme.id}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                           onClick={() => {
  onThemeChange(theme.id as "green" | "blue" | "pink" | "purple")
  setShowThemePicker(false)
}}
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all ${
                              currentTheme === theme.id
                                ? "border-foreground scale-110"
                                : "border-transparent hover:border-muted-foreground"
                            }`}
                            style={{ backgroundColor: theme.primary }}
                            aria-label={`Switch to ${theme.label} theme`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Music toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onMusicToggle}
                className="p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border text-foreground hover:bg-secondary transition-all"
                aria-label={isMusicPlaying ? "Mute music" : "Play music"}
              >
                {isMusicPlaying ? (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border text-foreground hover:bg-secondary transition-all"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-b border-border md:hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <motion.button
                    key={section.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
