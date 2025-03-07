"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function NotFound() {
  const [randomMeme, setRandomMeme] = useState<string>("/placeholder.svg?height=300&width=400&text=404")

  const memeTexts = [
    "404: Meme Not Found",
    "This is not the meme you're looking for",
    "Looks like this meme has gone viral... elsewhere",
    "Error 404: Humor.exe not found",
    "The meme you requested is in another castle",
  ]

  const [memeText, setMemeText] = useState(memeTexts[0])

  useEffect(() => {
    // Randomly select a meme text
    const randomIndex = Math.floor(Math.random() * memeTexts.length)
    setMemeText(memeTexts[randomIndex])

    // Simulate random meme image (in a real app, you'd use actual 404 meme images)
    setRandomMeme(`/placeholder.svg?height=300&width=400&text=404%20Meme%20${randomIndex + 1}`)
  }, [])

  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="relative mb-8 rounded-lg overflow-hidden border">
          <img src={randomMeme || "/placeholder.svg"} alt="404 Meme" className="w-full h-auto" />
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white text-center font-bold">
            {memeText}
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for has disappeared faster than a good meme on the internet.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/explore">Explore Memes</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

