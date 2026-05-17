"use client"

import { useRef, useState,useEffect  } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

export function LoveMessageSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [opened, setOpened] = useState(false)
  useEffect(() => {
  if (!opened) return

  const handleScroll = () => {
    setOpened(false)
  }

  window.addEventListener("scroll", handleScroll)

  return () => {
    window.removeEventListener("scroll", handleScroll)
  }
}, [opened])

const blogPosts = [
  {
    emoji: "💫",
    title: "ငါတို့ဇာတ်လမ်း စတင်ခဲ့တဲ့နေ့",
    content:
      "မင်းကို ပထမဆုံးမြင်တဲ့အချိန်ကတည်းက ငါ့ရင်ထဲမှာ မင်းဟာ ထူးခြားတဲ့သူတစ်ယောက်လို့ ခံစားမိခဲ့တယ်။ နောက်ဆုံးမှာတော့ မင်းဟာ ငါ့ဘဝတစ်ခုလုံး ဖြစ်လာမယ်ဆိုတာ မသိခဲ့ဘူး။",
  },
  {
    emoji: "💕",
    title: "မင်းကိုပိုပိုချစ်လာခြင်း",
    content:
      "မင်းနဲ့အတူရှိတဲ့နေ့တိုင်းဟာ မနိုးချင်တဲ့ အိပ်မက်လှလှတစ်ခုလိုပဲ။ မင်းရဲ့အပြုံးတစ်ချက်က ငါ့ကမ္ဘာကို အလင်းရောင်တွေဖြာစေတယ် — စကားလုံးနဲ့မဖော်ပြနိုင်လောက်အောင်ပါပဲ။",
  },
  {
    emoji: "💚",
    title: "ငါ့နှလုံးသားက မင်းအတွက်ပါ",
    content:
      "ဘယ်လောက်ပဲ ပြောပြော၊ ဘယ်လိုပဲ ဖော်ပြဖော်ပြ… ငါမင်းကို ချစ်တာ မရပ်ဘူး။ မင်းက ငါ့ရဲ့ အမြဲတမ်းဖြစ်မယ့်သူပါ။",
  },
]

  return (
    <section ref={ref} id="love-message" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🌸 soft dreamy background */}
      <div className="absolute inset-0 " />

      {/* floating hearts */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300 text-lg"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -400, opacity: [0, 1, 0] }}
          transition={{
            duration: 6 + i * 0.2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-20px",
          }}
        >
          💖
        </motion.div>
      ))}

      <div className="relative z-10 text-center">

        {/* 💌 ENVELOPE */}
        <motion.div
          onClick={() => setOpened(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer relative"
        >

          {/* envelope body */}
          <div className="w-64 h-40 bg-pink-200 rounded-xl shadow-xl relative overflow-hidden">

            {/* flap */}
            <motion.div
              animate={opened ? { rotateX: 180, y: -20 } : { rotateX: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-0 w-full h-1/2 bg-pink-300 origin-top"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />

            {/* heart seal */}
            <div className="absolute inset-0 flex items-center justify-center text-3xl">
              💌
            </div>

          </div>

          <p className="mt-3 text-pink-500 font-medium">
            Tap to open my love letter 💕
          </p>
        </motion.div>

        {/* 💌 LETTER POPUP */}
       <AnimatePresence>
      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4 touch-none"
          onClick={() => setOpened(false)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >

          {/* MODAL */}
          <motion.div
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative max-w-xl w-full bg-white rounded-3xl p-8 shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            {/* 🌸 FLOWERS */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-300 text-xl pointer-events-none"
                initial={{ scale: 0, y: 0 }}
                animate={{ scale: [0, 1.5, 0], y: [0, -100] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: "80%",
                }}
              >
                🌸
              </motion.div>
            ))}

            {/* TITLE */}
            <h2 className="text-2xl font-serif text-center text-pink-500 mb-6">
              My Love Letter 💌
            </h2>

            {/* CONTENT */}
            <div className="space-y-6 text-left">
              {blogPosts.map((post, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-1">
                    <span>{post.emoji}</span>
                    <h3 className="font-semibold text-gray-800">
                      {post.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>

            {/* IMAGE */}
            <div className="mt-6 rounded-xl overflow-hidden shadow-md">
              <img
                src="/image1/image1.jpg"
                className="w-full h-48 object-cover"
                alt="love"
              />
            </div>

            {/* FOOTER */}
            <p className="text-center mt-4 text-pink-400 text-sm">
              Forever yours 💚💗
            </p>

            {/* BUTTON */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpened(false)}
                className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg"
              >
                Close
              </motion.button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

      </div>
    </section>
  )
}