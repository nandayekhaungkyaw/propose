"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

export function ProposeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [noClickCount, setNoClickCount] = useState(0)
  const [yesScale, setYesScale] = useState(1)
  const [noScale, setNoScale] = useState(1)
  const [showCatPopup, setShowCatPopup] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })

  const handleNoClick = () => {
    const newCount = noClickCount + 1
    setNoClickCount(newCount)

    setYesScale(1 + newCount * 0.2)
    setNoScale(Math.max(0.3, 1 - newCount * 0.15))

    if (newCount >= 3) {
      setNoPosition({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 100,
      })
    }
  }

  const handleYesClick = () => {
    setShowCatPopup(true)
      setNoClickCount(0)
  setYesScale(1)
  setNoScale(1)
  setNoPosition({ x: 0, y: 0 })
  
  }

  return (
    <section id="propose" ref={ref} className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/10 to-background" />

      <FloatingHearts />

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">

        {/* 💖 Heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-20 h-20 md:w-28 md:h-28 mx-auto text-primary" fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* 💌 Question (Myanmar Romantic) */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-12"
        > ကို့ကို ပြန်ချစ်မလား ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-lg md:text-xl mb-12"
        >
          ကျေးဇူးပြုပြီး Yes လို့ပဲ ပြောပေးပါနော် 💕
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >

          {/* YES */}
          <motion.button
            onClick={handleYesClick}
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.95 }}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg md:text-xl font-semibold shadow-lg shadow-primary/40"
          >
           ❤️ ကိုကို့ ကိုချစ်တယ်
          </motion.button>

          {/* NO */}
          <motion.button
            onClick={handleNoClick}
            animate={{
              scale: noScale,
              x: noPosition.x,
              y: noPosition.y,
            }}
            whileHover={{ scale: noScale * 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="px-6 py-3 bg-muted text-muted-foreground rounded-full text-base font-medium border border-border"
            style={{
              opacity: Math.max(0.4, noScale),
            }}
          >
            {noClickCount === 0 && "မဟုတ်ဘူး..."}
            {noClickCount === 1 && "သေချာလား?"}
            {noClickCount === 2 && "တကယ်လား?"}
            {noClickCount === 3 && "ပြန်စဉ်းစားပါနော်!"}
            {noClickCount >= 4 && "Yes လို့ပဲ နှိပ်ပါ 😭"}
          </motion.button>

        </motion.div>

        {/* Hint */}
        <AnimatePresence>
          {noClickCount > 0 && noClickCount < 4 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-muted-foreground/60 text-sm"
            >
              Hint: မှန်ကန်တဲ့အဖြေက တဖြည်းဖြည်းကြီးလာနေပြီ 💚
            </motion.p>
          )}
        </AnimatePresence>

      </div>

      {/* Popup unchanged */}
      <AnimatePresence>
        {showCatPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
            onClick={() => setShowCatPopup(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-2xl border border-border text-center max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <CelebrationBurst />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mb-6"
              >
                <img
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHJxdWFtYmZ5NmVjYzlwdWNlMTZ0NHk5YWRpY2RiZWs1dW9pdmlmdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriO0OEd9QIDdllqo/giphy.gif"
                  alt="Happy dancing cat"
                  className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-2xl object-cover"
                />
              </motion.div>

              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                ဟေးးးးးးးး!!! ❤️
              </h3>

              <p className="text-muted-foreground text-lg mb-6">
                မင်း Yes လို့ပြောတာနဲ့ ငါအရမ်းပျော်သွားတယ် 💕
                <br />
                ငါ့ဘဝရဲ့ အပျော်ဆုံးနေ့တစ်နေ့ပဲ ❤️
              </p>

              <p className="mt-6 text-muted-foreground/50 text-sm">
                (တစ်နေရာမဆို နှိပ်ပြီး ပိတ်နိုင်ပါတယ်)
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
function FloatingHearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 6,
    size: 12 + Math.random() * 20,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ 
            x: `${heart.x}vw`,
            y: "110%",
            opacity: 0.3,
          }}
          animate={{ 
            y: "-10%",
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-primary/20"
          style={{ fontSize: heart.size }}
        >
          <Heart fill="currentColor" />
        </motion.div>
      ))}
    </div>
  )
}

function CelebrationBurst() {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    colorClass: string
    size: number
    angle: number
  }>>([])

  useState(() => {
    const colorClasses = ["bg-primary", "bg-accent", "bg-primary/70", "bg-accent/70", "bg-foreground/50"]
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: 50,
      y: 30,
      colorClass: colorClasses[Math.floor(Math.random() * colorClasses.length)],
      size: 6 + Math.random() * 8,
      angle: (Math.PI * 2 * i) / 40,
    }))
    setParticles(newParticles)
  })

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            scale: 0,
          }}
          animate={{
            left: `${p.x + Math.cos(p.angle) * 40}%`,
            top: `${p.y + Math.sin(p.angle) * 40}%`,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className={`absolute rounded-full ${p.colorClass}`}
          style={{
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  )
}
