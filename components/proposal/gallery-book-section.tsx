"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  id: number
  src: string
  caption: string
}

const images: GalleryImage[] = [
  { id: 1, src: "/image1/image1.jpg", caption: "Our first memory together" },
  { id: 2, src: "/image1/image2.jpg", caption: "The day you made me smile endlessly" },
  { id: 3, src: "/image1/image3.jpg", caption: "Our adventure begins" },
  { id: 4, src: "/image1/image4.jpg", caption: "Every moment with you is magical" },
  { id: 5, src: "/image1/image2.jpg", caption: "You are my favorite hello" },
  { id: 6, src: "/image1/image3.jpg", caption: "And my hardest goodbye" },
]

export function GalleryBookSection() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)

  const total = Math.ceil(images.length / 2)

  const next = () => {
    if (page < total - 1) {
      setDirection(1)
      setPage(p => p + 1)
    }
  }

  const prev = () => {
    if (page > 0) {
      setDirection(-1)
      setPage(p => p - 1)
    }
  }

  const left = images[page * 2]
  const right = images[page * 2 + 1]

  return (
    <section id="memory-book" className="py-16 flex justify-center bg-primary-400">
      <div className="w-full max-w-5xl">

        {/* 📖 BOOK */}
        <div
          className="flex justify-center"
          style={{ perspective: "2000px" }}
        >
          <div className="flex w-full max-w-4xl">

            {/* LEFT PAGE */}
            <div className="w-1/2 aspect-[3/4] bg-white rounded-l-lg overflow-hidden shadow-inner relative">
              {left && (
                <>
                  <Image src={left.src} alt="" fill className="object-cover" />
                  <p className="absolute bottom-0 w-full text-center text-xs sm:text-sm bg-black/40 text-white py-1">
                    {left.caption}
                  </p>
                </>
              )}
            </div>

            {/* RIGHT PAGE (DRAG ENABLED) */}
            <div className="w-1/2 aspect-[3/4] relative">

              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -100) next()
                    if (info.offset.x > 100) prev()
                  }}
                  initial={{
                    rotateY: direction === 1 ? 90 : -90,
                    opacity: 0
                  }}
                  animate={{
                    rotateY: 0,
                    opacity: 1
                  }}
                  exit={{
                    rotateY: direction === 1 ? -90 : 90,
                    opacity: 0
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute w-full h-full origin-left cursor-grab active:cursor-grabbing"
                  style={{ transformStyle: "preserve-3d" }}
                >

                  {/* FRONT */}
                  <div className="absolute inset-0 bg-white rounded-r-lg overflow-hidden shadow-lg backface-hidden">
                    {right && (
                      <>
                        <Image src={right.src} alt="" fill className="object-cover" />
                        <p className="absolute bottom-0 w-full text-center text-xs sm:text-sm bg-black/40 text-white py-1">
                          {right.caption}
                        </p>
                      </>
                    )}
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 bg-stone-200 rounded-r-lg rotate-y-180 backface-hidden" />

                </motion.div>
              </AnimatePresence>

              {/* SHADOW */}
              <motion.div
                key={page}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent pointer-events-none"
              />

            </div>

          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-6">
          <button onClick={prev} className="p-2 bg-white rounded-full shadow">
            <ChevronLeft  className=" text-primary" />
          </button>
          <button onClick={next} className="p-2 bg-white rounded-full shadow">
            <ChevronRight className=" text-primary font-bold" />
          </button>
        </div>

      </div>
    </section>
  )
}