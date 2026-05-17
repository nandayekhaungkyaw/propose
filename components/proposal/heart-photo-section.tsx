"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

const heartPhotoPositions = [
  // Top of heart (two bumps)
  { x: 30, y: 25 }, { x: 40, y: 18 }, { x: 50, y: 22 },
  { x: 60, y: 18 }, { x: 70, y: 25 },
  // Left curve
  { x: 20, y: 35 }, { x: 15, y: 48 }, { x: 20, y: 60 },
  // Right curve  
  { x: 80, y: 35 }, { x: 85, y: 48 }, { x: 80, y: 60 },
  // Middle sections
  { x: 30, y: 45 }, { x: 50, y: 40 }, { x: 70, y: 45 },
  { x: 35, y: 58 }, { x: 65, y: 58 },
  // Bottom converging to point
  { x: 28, y: 70 }, { x: 72, y: 70 },
  { x: 35, y: 78 }, { x: 65, y: 78 },
  { x: 42, y: 85 }, { x: 58, y: 85 },
  { x: 50, y: 92 }, // Bottom point
]

const placeholderPhotos = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23"
]

const photos=[
  "/image/image1.jpg",
  "/image/image2.jpg",
  "/image/image3.jpg",
  "/image/image4.jpg",
  "/image/image5.jpg",
  "/image/image6.jpg",
  "/image/image7.jpg",
  "/image/image8.jpg",
  "/image/image9.jpg",    
  "/image/image10.jpg",
  "/image/image11.jpg",
  "/image/image12.jpg", 
  "/image/image13.jpg",
  "/image/image14.jpg",
  "/image/image15.jpg",
  "/image/image16.jpg",
  "/image/image17.jpg",
  "/image/image18.jpg",
  "/image/image19.jpg",
  "/image/image20.jpg",
  "/image/image21.jpg",
  "/image/image22.jpg",
  "/image/image23.jpg"
]

export function HeartPhotoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowConfetti(true)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <section id="heart-photos" ref={ref} className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      {/* Radial glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[600px] w-[600px] md:h-[800px] md:w-[800px] rounded-full bg-primary/5 blur-3xl" />
      </motion.div>

      {/* Confetti */}
      {showConfetti && <Confetti />}

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-center text-foreground mb-10 leading-relaxed md:leading-[1.6]"
        >
        ကိုကို ဘ၀ရဲ့  <span className="text-primary">လမ်းပြကြယ်လေး</span> အမြဲဖြစ်ပေးမလား။
        </motion.h2>

        {/* Heart shape container made of photos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, type: "spring" }}
          className="relative w-full max-w-sm md:max-w-md mx-auto aspect-square"
        >
          {heartPhotoPositions.map((pos, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1,
              } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.5 + index * 0.08,
                type: "spring",
                stiffness: 200
              }}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                animate={isInView ? {
                  y: [0, -3, 0],
                  rotate: [0, index % 2 === 0 ? 2 : -2, 0],
                } : {}}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: index * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-10 h-10 md:w-14 md:h-14 rounded-lg overflow-hidden shadow-lg border-2 border-primary/30 bg-secondary"
              >
                {/* Photo placeholder with number */}
               {/* Photo or fallback */}
{photos[index] ? (
  <img
    src={photos[index]}
    alt="love memory"
    className="w-full h-full object-cover"
  />
) : (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500/20 via-rose-400/20 to-purple-400/20 text-white/70 font-semibold text-xs md:text-sm">
    
    {/* decorative glow background */}
    <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />

    {/* number */}
    <span className="relative z-10">
      {index + 1}
    </span>
  </div>
)}
              </motion.div>
            </motion.div>
          ))}

          {/* Center pulsing heart */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 2.5, duration: 0.5, type: "spring" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-4xl md:text-5xl"
            >
              <span className="text-primary">&#10084;</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 3 }}
          className="text-center text-lg md:text-xl text-muted-foreground mt-8"
        >
          You are my everything
        </motion.p>
      </div>
    </section>
  )
}

function Confetti() {
  const [confetti, setConfetti] = useState<Array<{
    id: number
    x: number
    colorClass: string
    delay: number
    size: number
  }>>([])

  useEffect(() => {
    // Use CSS variable colors - these will be theme-aware
    const newConfetti = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      colorClass: ["bg-primary", "bg-accent", "bg-primary/70", "bg-accent/70", "bg-foreground/50"][Math.floor(Math.random() * 5)],
      delay: Math.random() * 2,
      size: 4 + Math.random() * 8,
    }))
    setConfetti(newConfetti)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ 
            x: `${piece.x}vw`,
            y: "-5%",
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            y: "105%",
            rotate: 720,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: piece.delay,
            ease: "linear"
          }}
          className={`absolute ${piece.colorClass}`}
          style={{
            width: piece.size,
            height: piece.size,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  )
}
