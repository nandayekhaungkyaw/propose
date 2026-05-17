"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CountdownTimerProps {
  startDate: Date
}

export function CountdownTimer({ startDate }: CountdownTimerProps) {
  const [timeTogether, setTimeTogether] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()
      
      const seconds = Math.floor(diff / 1000) % 60
      const minutes = Math.floor(diff / (1000 * 60)) % 60
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24
      const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30
      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) % 12
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))

      setTimeTogether({ years, months, days, hours, minutes, seconds })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [startDate])

  const timeUnits = [
    { label: "Years", value: timeTogether.years },
    { label: "Months", value: timeTogether.months },
    { label: "Days", value: timeTogether.days },
    { label: "Hours", value: timeTogether.hours },
    { label: "Minutes", value: timeTogether.minutes },
    { label: "Seconds", value: timeTogether.seconds },
  ]

  return (
    <section id="countdown" className="relative py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[var(--font-playfair)] text-2xl md:text-3xl text-foreground mb-8"
        >
          ကိုယ့်ဘ၀ထဲ မင်းစတင်၀င်ရောက်လာတယ့်အချိန်💚
        </motion.h3>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl p-4 border border-border"
            >
              <motion.div
                key={unit.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-2xl md:text-3xl font-bold text-primary"
              >
                {unit.value.toString().padStart(2, "0")}
              </motion.div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
