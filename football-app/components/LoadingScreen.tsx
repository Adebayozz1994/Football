"use client"

import { motion as Motion } from "framer-motion"
import Image from "next/image"
import { Loader2 } from "lucide-react"

const LoadingScreen = () => {
  return (
    <Motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black text-yellow-400 z-[9999]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Display logo image */}
      {/* <div className="mb-6">
        <Image
          src="/WhatsApp.jpg"
          alt="Nigeria Football Hub Logo"
          width={120}
          height={120}
          className="rounded"
          priority
        />
      </div> */}
      <Motion.div
        className="text-3xl font-bold text-yellow-400 mb-8"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {"Nigeria Football Hub".split('').map((char, index) => (
          <Motion.span
            key={index}
            className="inline-block mx-1"
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: 1,
              y: [0, -20, 0],
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            {char}
          </Motion.span>
        ))}
      </Motion.div>
      <Motion.div
        className="flex items-center gap-3 text-yellow-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-lg">Loading Nigeria Football Hub...</span>
      </Motion.div>
      <p className="mt-4 text-sm text-yellow-400">Created by Adebayo Peter</p>
    </Motion.div>
  )
}

export default LoadingScreen
