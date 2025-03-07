"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-r from-blue-700 to-white transition-all duration-700">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">Welcome to MemeVerse</h1>
              <p className="max-w-[600px] text-gray-200 md:text-xl">Explore, create, and share the funniest memes on the internet. Join our community of meme enthusiasts and unleash your creativity.</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/explore">
                <Button size="lg" className="w-full min-[400px]:w-auto">Explore Memes</Button>
              </Link>
              <Link href="/upload">
                <Button variant="outline" size="lg" className="w-full min-[400px]:w-auto">Create a Meme</Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="mx-auto flex items-center justify-center aspect-square overflow-hidden rounded-full bg-gray-300 p-6 relative"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Central Meme */}
            <div className="relative w-56 h-56 overflow-hidden rounded-full border bg-muted shadow-lg">
              <img src="/97519326.jpg" alt="Central Meme" className="h-full w-full object-cover"/>
            </div>

            {/* Small Circles - Adjusted Positioning */}
            <div className="absolute top-6 left-9 w-16 h-16 rounded-full border bg-white flex items-center justify-center shadow-md">
              <img src="/da3ec8bf3b6cec4e6d8753225eb299ef.jpg" alt="Mini Meme 1" className="h-full w-full object-cover rounded-full"/>
            </div>
            
            <div className="absolute bottom-0 right-38 w-24 h-24 rounded-full border bg-white flex items-center justify-center shadow-md">
              <img src="/brahmanandam14.jpg" alt="Mini Meme 2" className="h-full w-full object-cover rounded-full"/>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
